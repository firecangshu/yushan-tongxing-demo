@echo off
chcp 65001 > nul
REM ============================================
REM 与善同行 - 一键 push 脚本（参考 IRY-skill 格式）
REM 白话：本地改完后，双击这个文件，按提示输入 commit 信息和 PAT 就推上 GitHub
REM ============================================

cd /d C:\Users\User\projects\yushan-tongxing-demo

echo.
echo === 第 1 步：检查改动 ===
git add .
git status --short
echo.
set /p CHANGED="有改动需要 commit + push 吗？(y/n): "
if /i not "%CHANGED%"=="y" (
  echo 已取消
  pause
  exit /b 0
)

echo.
set /p MSG="请输入 commit message: "
if "%MSG%"=="" (
  echo 未输入 commit message，退出
  pause
  exit /b 1
)

echo.
echo === 第 2 步：commit ===
git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo commit 失败（可能没有改动）
  pause
  exit /b 1
)

echo.
echo === 第 3 步：push 到 GitHub ===
echo 提示：去 https://github.com/settings/tokens 生成 PAT，权限选 repo
echo.
set /p GH_TOKEN="请输入 GitHub PAT（ghp_xxx）: "
if "%GH_TOKEN%"=="" (
  echo 未输入 PAT，退出
  pause
  exit /b 1
)

git push -u https://firecangshu:%GH_TOKEN%@github.com/firecangshu/yushan-tongxing-demo.git main
if errorlevel 1 (
  echo.
  echo push 失败，可能原因：
  echo   1. PAT 错
  echo   2. 远程有冲突
  echo   3. 网络问题
  pause
  exit /b 1
)

echo.
echo === push 成功 ===
pause