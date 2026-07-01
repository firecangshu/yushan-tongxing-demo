@echo off
chcp 65001 > nul
REM ============================================
REM 与善同行 - Vercel 一键部署脚本
REM 白话：双击这个文件，按提示操作就出公网链接
REM ============================================

echo.
echo === 与善同行 - Vercel 一键部署 ===
echo.
echo [第 1 步] 登录 Vercel
echo   跑完后会自动打开浏览器，请用 GitHub 账号 firecangshu 授权
echo.

npx vercel login
if errorlevel 1 (
  echo.
  echo 登录失败，请重试或改用 Vercel Web 方式：https://vercel.com/new
  pause
  exit /b 1
)

echo.
echo [第 2 步] 部署到生产环境（Vercel 会自动跑 build）
echo.

npx vercel --prod --yes
if errorlevel 1 (
  echo.
  echo 部署失败，把上面的错误信息发我排查
  pause
  exit /b 1
)

echo.
echo === 部署完成 ===
echo 请把上面输出的 "Production: https://xxx.vercel.app" 链接复制发我
echo.
pause
