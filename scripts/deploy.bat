@echo off
chcp 65001 > nul
REM ============================================
REM 与善同行 - 一键部署脚本（GitHub + Vercel）
REM 白话：把项目推到 GitHub，然后去 Vercel 网页导入自动部署
REM ============================================

echo.
echo === 第 1 步：检查是否已是 git 仓库 ===
if not exist ".git" (
  echo 初始化 git 仓库...
  git init
  git branch -M main
) else (
  echo 已经是 git 仓库，跳过初始化
)

echo.
echo === 第 2 步：检查远程仓库 ===
git remote get-url origin > nul 2>&1
if errorlevel 1 (
  echo.
  set /p REPO_URL="请输入 GitHub 仓库 URL (例如 https://github.com/yourname/yushan-tongxing-demo.git): "
  if "%REPO_URL%"=="" (
    echo 错误：未输入 URL，退出
    pause
    exit /b 1
  )
  git remote add origin %REPO_URL%
) else (
  echo 已有远程仓库：
  git remote get-url origin
  set /p CHANGE="是否更换远程仓库 URL? (y/n，默认 n): "
  if /i "%CHANGE%"=="y" (
    set /p REPO_URL="请输入新的 GitHub 仓库 URL: "
    git remote set-url origin %REPO_URL%
  )
)

echo.
echo === 第 3 步：添加 + 提交 ===
git add .
echo.
echo 当前待提交文件：
git status --short
echo.
set /p CONFIRM="确认提交以上文件? (y/n): "
if /i not "%CONFIRM%"=="y" (
  echo 已取消
  pause
  exit /b 0
)

git commit -m "feat: 与善同行 Demo 完整版 (12 页面 + 4 大能力 + 5 步逻辑线)"

echo.
echo === 第 4 步：推送到 GitHub ===
git push -u origin main
if errorlevel 1 (
  echo.
  echo 推送失败，请检查：
  echo   1. GitHub 仓库是否已创建（必须在 GitHub 网页先建空仓库）
  echo   2. 仓库 URL 是否正确
  echo   3. 是否有 GitHub 登录权限（第一次可能弹窗要你登录）
  pause
  exit /b 1
)

echo.
echo === 🎉 推送完成！ ===
echo.
echo 接下来去 Vercel 部署（5 分钟出公网链接）：
echo   1. 打开 https://vercel.com/new
echo   2. 用 GitHub 账号登录
echo   3. 选刚才推的仓库，点 Import
echo   4. Framework Preset 选 Vite（自动识别）
echo   5. 点 Deploy，等 1-2 分钟
echo   6. 部署完会给你一个 xxx.vercel.app 链接
echo.
echo 拿到链接后发我，我替换参赛帖的占位符出终稿！
echo.
pause
