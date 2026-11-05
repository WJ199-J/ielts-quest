/* Shared Supabase browser client used by account and progress modules. */
(function () {
  "use strict";
  if (window.IELTS_QUEST_AUTH) return;

  let clientPromise;
  function validate(config) {
    const url = new URL(config.supabaseUrl);
    if (url.protocol !== "https:" || url.username || url.password ||
        !/^sb_publishable_/i.test(config.publishableKey) ||
        /^sb_secret_/i.test(config.publishableKey)) {
      throw new Error("invalid_public_config");
    }
  }

  async function getClient() {
    if (clientPromise) return clientPromise;
    clientPromise = (async () => {
      const config = window.IELTS_QUEST_AUTH_CONFIG || {};
      validate(config);
      const sdk = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
      return sdk.createClient(config.supabaseUrl, config.publishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: "ieltsQuestAuthSession"
        }
      });
    })();
    return clientPromise;
  }

  window.IELTS_QUEST_AUTH = Object.freeze({ getClient });
})();
