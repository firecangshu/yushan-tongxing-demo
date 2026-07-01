// 与善同行 - 自动化截图脚本
// 白话：用 Playwright 启动一个无头浏览器（没界面的 Chrome），模拟手机尺寸访问 5 个页面，自动截图保存
import { chromium } from 'playwright'
import fs from 'node:fs'

// 配置区
const BASE_URL = 'http://127.0.0.1:5173'  // Vite dev 服务地址
const OUT_DIR = 'screenshots'             // 截图输出目录
const VIEWPORT = { width: 393, height: 852 }  // iPhone 14 Pro 尺寸
const DPR = 2                              // 设备像素比（白话：让截图更清晰）

// 5 个截图任务（白话：要截哪几个页面）
const tasks = [
  { url: '/',            file: '01-homepage.png',       name: '首页（门脸）' },
  { url: '/quiz',        file: '02-quiz.png',           name: 'AI 题库答题' },
  { url: '/workbench',   file: '03-workbench.png',      name: '社工工作台' },
  { url: '/cases',       file: '04-cases-kanban.png',   name: '个案看板 Kanban' },
  { url: '/alerts',      file: '05-alerts.png',         name: '风险提醒' },
]

async function main() {
  console.log('🚀 启动 Playwright 无头浏览器...')

  // 启动 Chromium 无头模式（白话：没界面的 Chrome，更快更轻）
  // 指定 executablePath 用完整版 chromium（白话：避免 playwright 默认的精简版 headless_shell 找不到）
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\User\\AppData\\Local\\ms-playwright\\chromium-1217\\chrome-win64\\chrome.exe',
  })

  // 创建移动端尺寸的"视口"（白话：浏览器窗口大小）
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DPR,
  })
  const page = await context.newPage()

  // 确保输出目录存在
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
  }

  // 依次访问 + 截图
  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i]
    console.log(`\n[${i + 1}/${tasks.length}] 截图：${t.name} (${t.url})`)

    // 访问页面，等网络空闲
    await page.goto(BASE_URL + t.url, { waitUntil: 'networkidle', timeout: 15000 })
    // 多等 1.5s 让动画/字体/暗色渐变稳定下来
    await page.waitForTimeout(1500)

    // 整页截图（白话：把整个页面完整截下来，包括滚动条下面的内容）
    const outPath = `${OUT_DIR}/${t.file}`
    await page.screenshot({ path: outPath, fullPage: true })

    const stat = fs.statSync(outPath)
    console.log(`  ✅ 已保存 ${outPath}（${(stat.size / 1024).toFixed(1)} KB）`)
  }

  await browser.close()
  console.log('\n🎉 5 张截图全部完成！')
}

main().catch((e) => {
  console.error('\n❌ 截图失败:', e)
  process.exit(1)
})
