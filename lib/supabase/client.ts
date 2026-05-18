import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

let browserClient: ReturnType<typeof createClient> | undefined;
let hasLoggedSupabaseConfig = false;

function getBrowserFetch() {
  const nativeFetch =
    typeof window !== "undefined" ? window.fetch.bind(window) : fetch;

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const requestUrl = typeof input === "string" ? input : input.toString();

    try {
      const response = await nativeFetch(input, init);

      if (!response.ok && requestUrl.startsWith(supabaseUrl)) {
        console.error("[Supabase Debug] Non-OK response", {
          url: requestUrl,
          status: response.status,
          statusText: response.statusText,
        });
      }

      return response;
    } catch (error) {
      if (requestUrl.startsWith(supabaseUrl)) {
        console.error("[Supabase Debug] Fetch failed", {
          url: requestUrl,
          error,
        });
      }

      throw error;
    }
  };
}

export function getSupabaseClient() {
  if (!browserClient) {
    if (typeof window !== "undefined" && !hasLoggedSupabaseConfig) {
      hasLoggedSupabaseConfig = true;

      console.info("[Supabase Debug] Browser URL", supabaseUrl);
      console.info(
        "[Supabase Debug] Expected login endpoint",
        `${supabaseUrl}/auth/v1/token?grant_type=password`,
      );

      if (supabaseUrl.includes("/rest/v1")) {
        console.error(
          "[Supabase Debug] Invalid NEXT_PUBLIC_SUPABASE_URL. Remove /rest/v1 from the value.",
        );
      }
    }

    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: getBrowserFetch(),
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
  }

  return browserClient;
}
