# IELTS Quest 邮箱登录接入准备

状态：接入代码已准备；项目参数为空，真实邮件登录未启用、未验收。

## 已实现的代码路径

- `assets/auth-config.js`：只允许放公开的 Supabase Project URL 和 Publishable Key；不可放 Secret、service_role、数据库密码或 SMTP 密码。
- `assets/account.js`：邮箱 Magic Link、回调会话恢复、当前设备退出、发送失败提示。没有配置时不加载外部 SDK、不发送邮箱。
- 当前学习记录继续使用浏览器 `ieltsQuestV1`；账号登录不等于跨设备进度同步。

## 需要项目所有人完成

1. 在 Supabase 官网创建账号和一个项目。数据库密码自行保管，不需要发给助手。
2. 在项目的 Connect / API 配置中取得 **Project URL** 与 **Publishable Key**（或旧版 anon public key）。这两个是前端公开参数。
3. Authentication → URL Configuration：Site URL 设置为 `https://wj199-j.github.io/ielts-quest/`；Redirect URLs 加入 `https://wj199-j.github.io/ielts-quest/index.html`。
4. 确认 Email provider 启用。默认邮件服务只适合受限测试，先用项目团队成员邮箱验证；向其他用户开放前要配置自有 SMTP。
5. 将第2步的两个公开参数交给助手。助手填写配置、提交部署并安排收信/回调/退出验收。验证码、登录邮件链接、Secret Key、service_role、数据库和SMTP密码不在聊天中发送。

## 验收与下一节点

真实验收需要：发送邮件、收信、链接回到本站、显示邮箱身份、刷新保留登录、退出账号、无效/过期链接与发送频率错误处理。用户本人点击邮件完成身份验证。

云端进度同步另列任务：建立按用户隔离的进度表及RLS，合并访客记录，处理离线重试、多设备冲突和账号切换，再验证同账号跨设备恢复。此文档不将其记为已完成。

## 官方资料

- https://supabase.com/docs/guides/auth/auth-email-passwordless
- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/database/postgres/row-level-security
