# 与善同行 · 社工智能工作台

> 一个面向社工群体的双角色智能助手 Demo · TRAE AI 创造力大赛参赛作品

## ✨ 项目介绍

「与善同行」覆盖**学习 + 实务**两条主线：

- 🎓 **考生端**：5 步搞定社工备考
- 💼 **社工端**：5 步走完每日实务

## 🎯 5 步逻辑线

| 端 | 步骤 |
|---|---|
| **考生端** | 选择角色 → AI 题库 → 错题本 → 模拟考试 → 学习计划 |
| **社工端** | 选择角色 → 工作台 → 个案看板 → AI 建议 → 风险提醒 |

## 🛠️ 4 大核心能力

1. **AI 智能学习**：50 道精选真题，每题配 5 维 AI 解析（答案/知识点/真实案例/常见误区/关联点）
2. **个案服务管理**：6 阶段 Kanban（接案→预估→计划→介入→评估→结案），12 个真实模拟个案
3. **风险智能提醒**：8 条预警按 4 级筛选（紧急/高危/逾期/资料不全）
4. **隐私分级保护**：3 级隐私保护标记（L1/L2/L3），操作全程留痕

## 📁 项目结构

12 页面 SPA（单页应用）：

```
src/
├── pages/                  12 个页面
│   ├── HomePage.tsx                门脸页
│   ├── StudentHubPage.tsx          考生入口
│   ├── SocialWorkerHubPage.tsx     社工入口
│   ├── QuizPage.tsx                AI 题库
│   ├── ExamPage.tsx                模拟考试
│   ├── WrongBookPage.tsx           错题本
│   ├── StudyPlanPage.tsx           学习计划
│   ├── WorkbenchPage.tsx           工作台
│   ├── ClientsPage.tsx             客户管理
│   ├── CaseKanbanPage.tsx          个案看板
│   ├── CaseDetailPage.tsx          个案详情
│   ├── AIAdvicePage.tsx            AI 建议
│   └── AlertsPage.tsx              风险提醒
├── components/             组件（布局、UI、角色切换器）
├── contexts/               React Context（角色管理）
├── data/                   静态数据（题库、社工数据）
└── types/                  TypeScript 类型定义
```

## 🧪 技术栈

- React 18.3 + Vite 5.4 + TypeScript 5.6
- Tailwind CSS 3.4（暗色科技风：背景 `#1A1A2E` / 主色 `#00D4FF` / 紫色点缀 `#8B5CF6`）
- React Router 6.26（SPA 路由）
- lucide-react 图标库
- 纯前端实现：静态数据 + localStorage 持久化

## 🚀 本地开发

```bash
npm install
npm run dev
# 浏览器打开 http://127.0.0.1:5173
```

## 📦 构建

```bash
npm run build
# 产出在 dist/ 目录
```

## 🌐 部署（Vercel）

1. 把项目推到 GitHub
2. 打开 https://vercel.com/new，用 GitHub 登录
3. 选本仓库，点 Import
4. Framework Preset 自动识别为 Vite
5. 点 Deploy，等 1-2 分钟
6. 拿到 `https://xxx.vercel.app` 链接

## 📊 数据规模

| 类型 | 数量 | 备注 |
|---|---|---|
| 考试真题 | 50 道 | 每题 5 维 AI 解析 |
| 服务对象档案 | 12 位 | 7 类（老人/儿童/青年/家庭/残障/精神/社区） |
| 模拟个案 | 12 个 | 6 阶段分布 |
| 风险提醒 | 8 条 | 4 种类型 |
| AI 建议 | 6 条 | 含置信度 |

## 🎬 制作

由 **TRAE AI** 全程辅助开发（Vibe Coding 实践）：
- 业务理解：参考 `F:\社工之光软件核心代码` 项目
- 数据生成：50 道真题、12 客户、12 个案、6 AI 建议、8 风险提醒
- 代码实现：12 页面 SPA + 暗色科技风 UI
- 测试验证：4 类 Review 修复 + 12 页面 build 0 错误

## 📝 License

MIT