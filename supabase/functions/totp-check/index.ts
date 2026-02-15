import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const MIN_RESPONSE_TIME = 150; // Normalize timing to prevent enumeration

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      await normalizeTime(startTime, MIN_RESPONSE_TIME);
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use getUserByEmail instead of listing all users
    const { data: { user: targetUser }, error } = await supabaseAdmin.auth.admin.getUserByEmail(email);

    if (error || !targetUser) {
      await normalizeTime(startTime, MIN_RESPONSE_TIME);
      return new Response(JSON.stringify({ required: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: totp } = await supabaseAdmin
      .from("user_totp")
      .select("is_enabled")
      .eq("user_id", targetUser.id)
      .single();

    await normalizeTime(startTime, MIN_RESPONSE_TIME);
    return new Response(JSON.stringify({ required: totp?.is_enabled ?? false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("totp-check error:", err);
    await normalizeTime(startTime, MIN_RESPONSE_TIME);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function normalizeTime(startTime: number, minMs: number) {
  const elapsed = Date.now() - startTime;
  if (elapsed < minMs) {
    await new Promise(resolve => setTimeout(resolve, minMs - elapsed));
  }
}
