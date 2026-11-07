/* Email sign-in adapter. Remains inactive until public project configuration exists. */
(function () {
  "use strict";
  const config = window.IELTS_QUEST_AUTH_CONFIG || {};
  if (!config.supabaseUrl || !config.publishableKey) return;

  const form = document.getElementById("loginForm");
  const email = document.getElementById("loginEmail");
  const submit = document.getElementById("sendLoginLink");
  const otpForm = document.getElementById("otpForm");
  const otp = document.getElementById("loginOtp");
  const verify = document.getElementById("verifyLoginCode");
  const changeEmail = document.getElementById("changeLoginEmail");
  const message = document.getElementById("accountMessage");
  const noticeTitle = document.getElementById("accountNoticeTitle");
  const noticeDetail = document.getElementById("accountNoticeDetail");
  const description = document.getElementById("accountDescription");
  const logout = document.getElementById("signOutButton");
  if (!form || !email || !submit || !message) return;

  let client;
  let cooldownUntil = 0;
  let pendingEmail = "";
  function status(text) { message.textContent = text; }
  function renderUser(user) {
    form.classList.toggle("hidden", Boolean(user));
    otpForm?.classList.add("hidden");
    logout.classList.toggle("hidden", !user);
    noticeTitle.textContent = user ? "邮箱已登录" : "邮箱登录";
    noticeDetail.textContent = user ? user.email : "邮箱验证码或一次性安全链接，无需设置密码";
    description.textContent = user
      ? "学习进度已绑定当前账号，并保留本设备副本。"
      : "输入邮箱后，用邮件中的验证码直接登录；若邮件仍显示安全链接，点击一次即可完成登录。";
    const label = document.getElementById("openLogin");
    if (label) label.textContent = user ? "我的账号" : "登录 / 注册";
  }

  async function init() {
    try {
      const url = new URL(config.supabaseUrl);
      if (url.protocol !== "https:" || url.username || url.password || /^sb_secret_/i.test(config.publishableKey)) {
        throw new Error("invalid_public_config");
      }
      client = await window.IELTS_QUEST_AUTH.getClient();
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      renderUser(data.session?.user || null);
      window.dispatchEvent(new CustomEvent("ieltsquest:auth-change", { detail: { user: data.session?.user || null } }));
      email.disabled = false;
      submit.disabled = false;
      submit.textContent = "发送验证码";
      client.auth.onAuthStateChange((event, session) => {
        const user = session?.user || null;
        renderUser(user);
        if (event === "SIGNED_IN" && user) status("登录成功，学习进度正在同步。");
        window.dispatchEvent(new CustomEvent("ieltsquest:auth-change", { detail: { user } }));
      });
    } catch (error) {
      noticeTitle.textContent = "登录服务暂不可用";
      noticeDetail.textContent = "请稍后重试，可继续以访客身份学习";
      status("服务配置或网络连接尚未就绪；本地学习记录不受影响。");
    }
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!client || !form.reportValidity()) return;
    if (Date.now() < cooldownUntil) {
      status("登录邮件刚刚发送，请稍候再试。");
      return;
    }
    submit.disabled = true;
      status("正在发送登录验证码…");
    try {
      const redirect = new URL("index.html", window.location.href);
      pendingEmail = email.value.trim();
      const { error } = await client.auth.signInWithOtp({
        email: pendingEmail,
        options: { emailRedirectTo: redirect.href, shouldCreateUser: true }
      });
      if (error) throw error;
      cooldownUntil = Date.now() + 60000;
      form.classList.add("hidden");
      otpForm?.classList.remove("hidden");
      otp?.focus();
      status("邮件已发送。请输入邮件中的验证码；若邮件中显示安全链接，点击一次也可以完成登录。");
    } catch (error) {
      status("暂时无法发送邮件，请检查邮箱或稍后重试。首次接入时需确认邮件服务和回调地址已配置。");
    } finally { submit.disabled = false; }
  });
  otpForm?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!client || !pendingEmail || !otpForm.reportValidity()) return;
    verify.disabled = true;
    status("正在验证…");
    try {
      const { data, error } = await client.auth.verifyOtp({
        email: pendingEmail,
        token: otp.value.trim(),
        type: "email"
      });
      if (error) throw error;
      renderUser(data.user || data.session?.user || null);
      status("登录成功，学习进度正在同步。");
    } catch (error) {
      status("验证码无效或已过期，请检查后重试。需要新验证码时，请更换邮箱后重新发送。");
    } finally { verify.disabled = false; }
  });
  changeEmail?.addEventListener("click", () => {
    otpForm.classList.add("hidden");
    form.classList.remove("hidden");
    otp.value = "";
    status("");
    email.focus();
  });
  logout.addEventListener("click", async () => {
    if (!client) return;
    logout.disabled = true;
    try {
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
      renderUser(null);
      status("已退出当前设备的账号，学习记录仍保存在本设备。");
    } catch (error) { status("退出暂未成功，请稍后重试。"); }
    finally { logout.disabled = false; }
  });
  init();
})();
