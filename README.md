# Telegram Bot API 代理服务 / Telegram Bot API Proxy

一个轻量级的 Telegram Bot API 代理服务，可以部署到多个云平台，帮助无法直接访问 Telegram API 的用户通过自定义域名中转访问。

A lightweight Telegram Bot API proxy service that can be deployed to multiple cloud platforms, helping users who cannot directly access Telegram API to access it through a custom domain.

## 项目简介 / Project Introduction

Telegram Bot API 代理服务，使用边缘函数将 Telegram Bot API 免费中转到国内。部署后绑定自定义域名，即可用此域名替代 `api.telegram.org`，让国内用户无障碍地使用 Telegram Bot API。

A Telegram Bot API proxy service using edge functions to forward Telegram Bot API calls. After deployment, bind a custom domain to replace `api.telegram.org` for seamless access.

## 功能特点 / Features

- ✅ 支持所有 Telegram Bot API 方法 / Support all Telegram Bot API methods
- ✅ 支持文件上传下载 / Support file upload/download
- ✅ 多平台部署支持 / Multi-platform deployment support
- ✅ 自定义域名绑定 / Custom domain binding
- ✅ 完全免费 / Completely free
- ✅ 低延迟全球 CDN / Low latency global CDN

## 部署指南 / Deployment Guide

### Vercel 部署（推荐 / Recommended）

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/telegram-bot-balance)

1. 点击上方部署按钮，一键部署到 Vercel
   Click the deploy button above for one-click deployment to Vercel

2. 部署成功后，配置自定义域名（国内访问必需）
   After deployment, configure a custom domain (required for domestic access)
   
   <details>
   <summary>配置自定义域名 / Configure Custom Domain</summary>
   
   进入项目设置 → Domains → 添加你的域名
   Go to Project Settings → Domains → Add your domain
   
   </details>

3. 使用代理域名访问 Telegram Bot API
   Use the proxy domain to access Telegram Bot API

### Cloudflare Workers 部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/telegram-bot-balance)

1. 点击部署按钮 / Click the deploy button
2. 登录 Cloudflare 账号 / Login to your Cloudflare account
3. 关联 GitHub 账户并部署 / Link GitHub account and deploy
4. 配置自定义域名（可选）/ Configure custom domain (optional)

**注意 / Note:** Cloudflare 可能会分配香港节点，如遇问题请使用其他平台。
Cloudflare may assign Hong Kong nodes, use other platforms if issues occur.

### Deno Deploy 部署

1. Fork 本项目 / Fork this project
2. 登录 [Deno Deploy](https://dash.deno.com/)
3. 创建新项目并选择你 fork 的仓库
   Create a new project and select your forked repository
4. Entrypoint 填写: `src/deno_index.ts`
5. 点击 Deploy Project
6. 获取分配的域名或配置自定义域名
   Get the assigned domain or configure a custom domain

### Netlify 部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/telegram-bot-balance)

1. 点击部署按钮 / Click the deploy button
2. 登录 GitHub 账户 / Login to your GitHub account
3. 部署完成后获取域名 / Get the domain after deployment

## 使用方法 / Usage

部署完成后，将你的代理域名替代 `api.telegram.org` 即可。

After deployment, replace `api.telegram.org` with your proxy domain.

### 示例 / Examples

**原始 API 调用 / Original API Call:**
```bash
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe
```

**通过代理调用 / Call via Proxy:**
```bash
curl https://<YOUR_PROXY_DOMAIN>/bot<YOUR_BOT_TOKEN>/getMe
```

### 发送消息 / Send Message

```bash
curl -X POST https://<YOUR_PROXY_DOMAIN>/bot<YOUR_BOT_TOKEN>/sendMessage \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "<CHAT_ID>",
    "text": "Hello from proxy!"
  }'
```

### 发送图片 / Send Photo

```bash
curl -X POST https://<YOUR_PROXY_DOMAIN>/bot<YOUR_BOT_TOKEN>/sendPhoto \
  -F "chat_id=<CHAT_ID>" \
  -F "photo=@/path/to/image.jpg"
```

### 设置 Webhook

```bash
curl -X POST https://<YOUR_PROXY_DOMAIN>/bot<YOUR_BOT_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-webhook-url.com/webhook"
  }'
```

## 在代码中使用 / Use in Code

### Python (python-telegram-bot)

```python
from telegram import Bot

# 使用代理域名
bot = Bot(token="YOUR_BOT_TOKEN", base_url="https://<YOUR_PROXY_DOMAIN>/bot")

# 获取机器人信息
print(bot.get_me())
```

### Node.js (node-telegram-bot-api)

```javascript
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('YOUR_BOT_TOKEN', {
  baseApiUrl: 'https://<YOUR_PROXY_DOMAIN>/bot'
});

bot.getMe().then(info => {
  console.log(info);
});
```

### Go (telegram-bot-api)

```go
package main

import (
    "log"
    tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func main() {
    bot, err := tgbotapi.NewBotAPIWithAPIEndpoint(
        "YOUR_BOT_TOKEN",
        "https://<YOUR_PROXY_DOMAIN>/bot%s/%s",
    )
    if err != nil {
        log.Panic(err)
    }
    
    log.Printf("Authorized on account %s", bot.Self.UserName)
}
```

## 本地开发 / Local Development

```bash
# 安装 Vercel CLI
npm install -g vercel

# 克隆项目
git clone https://github.com/your-username/telegram-bot-balance.git
cd telegram-bot-balance

# 本地运行
vercel dev
```

## 支持的平台 / Supported Platforms

- ✅ Vercel (推荐 / Recommended)
- ✅ Cloudflare Workers
- ✅ Netlify
- ✅ Deno Deploy

## 注意事项 / Notes

1. 部署后请务必配置自定义域名，因为默认域名在国内可能无法访问
   Please configure a custom domain after deployment, as the default domain may not be accessible domestically

2. 所有 Telegram Bot API 的功能都支持，包括文件上传下载
   All Telegram Bot API features are supported, including file upload/download

3. 代理服务完全无状态，不会存储任何数据
   The proxy service is completely stateless and does not store any data

4. 建议使用 HTTPS 域名以确保安全
   It is recommended to use HTTPS domain for security

## 故障排除 / Troubleshooting

**问题：无法访问代理域名**
- 检查 DNS 解析是否正确
- 确认域名已在平台上正确配置
- 尝试使用其他部署平台

**问题：Bot 无法接收消息**
- 确认 Bot Token 正确
- 检查 Webhook URL 设置
- 查看平台日志排查错误

## 许可证 / License

MIT License

## 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

Issues and Pull Requests are welcome!

## 相关项目 / Related Projects

- [gemini-balance-lite](https://github.com/tech-shrimp/gemini-balance-lite) - Gemini API 代理服务

## 免责声明 / Disclaimer

本项目仅供学习交流使用，请遵守当地法律法规。

This project is for learning and communication purposes only. Please comply with local laws and regulations.
