// 与善同行 - 首页（门脸页：项目介绍 + 基本用法 + 2 个入口大卡片）
// 首页只做"门面"：介绍 + 导航门，不承载逻辑线
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Users,
  ShieldAlert,
  Lock,
  Sparkles,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ListChecks,
  MousePointerClick,
  Compass,
  Repeat,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useRole, type Role } from '@/contexts/RoleContext'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const navigate = useNavigate()
  const { setRole } = useRole()

  // 点击入口 = 切角色 + 跳 hub 页面（白话：选哪个门就进哪个房间，并把钥匙挂上）
  const handleEnter = (role: Role, path: string) => {
    setRole(role)
    navigate(path)
  }

  return (
    <div className="space-y-16">
      {/* ===== 1. Hero 顶部 ===== */}
      <section className="relative pt-8 pb-4 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>由 TRAE AI 构建 · 社工智能工作台</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-text md:text-6xl animate-fade-in">
            <span className="glow-text">与善同行</span>
            <span className="block text-xl md:text-2xl text-text-dim mt-3 font-normal">
              让基层社会服务更清楚、更连续、更安全
            </span>
          </h1>
        </div>
      </section>

      {/* ===== 2. 项目介绍 ===== */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-3">
            <span className="glow-text">项目介绍</span>
          </h2>
          <p className="text-text-dim max-w-3xl mx-auto leading-relaxed">
            「与善同行」是面向<strong className="text-text">社工群体</strong>的双角色智能助手 Demo。
            <br />
            一端服务<strong className="text-primary">备考中的考生</strong>，一端服务<strong className="text-accent-light">一线在岗的社工</strong>，
            覆盖"学习 + 实务"两条主线，让社会工作更专业、更高效。
          </p>
        </div>
      </section>

      {/* ===== 3. 基本用法 ===== */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-3">
            <span className="glow-text">基本用法</span>
          </h2>
          <p className="text-text-dim">4 步上手，按顺序操作即可</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <UsageStep
            num={1}
            icon={<MousePointerClick className="h-5 w-5" />}
            title="选入口"
            desc="在下方 2 个大卡片中选一个（考生 or 社工）"
            color="primary"
          />
          <UsageStep
            num={2}
            icon={<Compass className="h-5 w-5" />}
            title="进 Hub"
            desc="进入对应 Hub 页面，查看 5 步逻辑线"
            color="primary"
          />
          <UsageStep
            num={3}
            icon={<ListChecks className="h-5 w-5" />}
            title="走流程"
            desc="按流程图节点，依次点入功能子页面"
            color="accent"
          />
          <UsageStep
            num={4}
            icon={<Repeat className="h-5 w-5" />}
            title="随时换"
            desc="顶栏随时切换角色，状态自动持久化"
            color="accent"
          />
        </div>
      </section>

      {/* ===== 4. 四大核心能力 ===== */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-3">
            <span className="glow-text">四大核心能力</span>
          </h2>
          <p className="text-text-dim">从备考到实务，从一线到管理，全方位支撑社会工作专业服务</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CoreFeature
            icon={<BookOpen className="h-6 w-6" />}
            title="AI 智能学习"
            desc="50 道精选真题 · 5 维 AI 解析"
            color="primary"
          />
          <CoreFeature
            icon={<Users className="h-6 w-6" />}
            title="个案服务管理"
            desc="6 阶段流程 · 看板式管理"
            color="accent"
          />
          <CoreFeature
            icon={<ShieldAlert className="h-6 w-6" />}
            title="风险智能提醒"
            desc="自动识别 · 多维度预警"
            color="warning"
          />
          <CoreFeature
            icon={<Lock className="h-6 w-6" />}
            title="隐私分级保护"
            desc="敏感档案 · 操作全程留痕"
            color="success"
          />
        </div>
      </section>

      {/* ===== 5. 2 个入口大卡片（核心：点击 = 切角色 + 跳 Hub） ===== */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-3">
            <span className="glow-text">选择您的入口</span>
          </h2>
          <p className="text-text-dim">不同入口看到不同的功能界面和逻辑路径</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <EntryCard
            onClick={() => handleEnter('student', '/student')}
            icon={<GraduationCap className="h-10 w-10" />}
            title="考生入口"
            subtitle="学习 + 备考"
            description="5 步搞定社工备考：AI 题库 → 错题本 → 模拟考试 → 学习计划"
            color="primary"
            features={['50 道真题 + 5 维 AI 解析', '智能错题本 + 练习记录', '3 套模拟试卷 + 倒计时', '30 天学习计划']}
          />
          <EntryCard
            onClick={() => handleEnter('socialWorker', '/social-worker')}
            icon={<Briefcase className="h-10 w-10" />}
            title="社工入口"
            subtitle="实务 + 管理"
            description="5 步走完每日实务：工作台 → 个案看板 → AI 建议 → 风险提醒"
            color="accent"
            features={['4 区数据看板 + 待办总览', '12 个个案 + 6 阶段 Kanban', '6 条 AI 建议 + 置信度', '8 条风险提醒 + 4 级筛选']}
          />
        </div>
      </section>
    </div>
  )
}

// ===== 核心能力卡片 =====
function CoreFeature({ icon, title, desc, color }: {
  icon: React.ReactNode
  title: string
  desc: string
  color: 'primary' | 'accent' | 'warning' | 'success'
}) {
  // 不同能力对应不同颜色（白话：让卡片看起来不单调）
  const colorMap = {
    primary: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30', glow: 'shadow-glow-primary' },
    accent: { text: 'text-accent-light', bg: 'bg-accent/10', border: 'border-accent/30', glow: 'shadow-glow-accent' },
    warning: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', glow: '' },
    success: { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', glow: '' },
  }
  const c = colorMap[color]
  return (
    <Card className={cn('group hover:scale-105 transition-all', c.border, c.glow)}>
      <CardContent className="pt-6 text-center">
        <div className={cn('flex h-14 w-14 items-center justify-center rounded-xl mx-auto mb-3', c.bg, c.text, 'group-hover:scale-110 transition-transform')}>
          {icon}
        </div>
        <h3 className={cn('text-lg font-bold mb-1', c.text)}>{title}</h3>
        <p className="text-xs text-text-dim leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  )
}

// ===== 使用步骤卡片 =====
function UsageStep({ num, icon, title, desc, color }: {
  num: number
  icon: React.ReactNode
  title: string
  desc: string
  color: 'primary' | 'accent'
}) {
  const colorMap = {
    primary: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
    accent: { text: 'text-accent-light', bg: 'bg-accent/10', border: 'border-accent/30' },
  }
  const c = colorMap[color]
  return (
    <Card className={cn('relative h-full', c.border)}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', c.bg, c.text)}>
            {icon}
          </div>
          <span className={cn('text-3xl font-bold opacity-30', c.text)}>0{num}</span>
        </div>
        <h3 className="text-base font-bold text-text mb-1">{title}</h3>
        <p className="text-xs text-text-dim leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  )
}

// ===== 入口大卡片 =====
function EntryCard({
  onClick,
  icon,
  title,
  subtitle,
  description,
  color,
  features,
}: {
  onClick: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  color: 'primary' | 'accent'
  features: string[]
}) {
  // 两种入口两种主色（白话：考生=蓝，社工=紫）
  const colorMap = {
    primary: {
      text: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/40 hover:border-primary',
      glow: 'hover:shadow-glow-primary',
      btn: 'bg-primary text-bg hover:bg-primary/90',
      check: 'text-primary',
    },
    accent: {
      text: 'text-accent-light',
      bg: 'bg-accent/10',
      border: 'border-accent/40 hover:border-accent',
      glow: 'hover:shadow-glow-accent',
      btn: 'bg-accent text-white hover:bg-accent/90',
      check: 'text-accent-light',
    },
  }
  const c = colorMap[color]
  return (
    <button
      onClick={onClick}
      className={cn(
        'group text-left p-6 rounded-2xl border-2 bg-card-gradient transition-all hover:scale-[1.02]',
        c.border,
        c.glow
      )}
    >
      {/* 顶部：图标 + 标题 */}
      <div className="flex items-center gap-4 mb-4">
        <div className={cn('flex h-16 w-16 items-center justify-center rounded-2xl', c.bg, c.text, 'group-hover:scale-110 transition-transform')}>
          {icon}
        </div>
        <div className="flex-1">
          <div className={cn('text-2xl font-bold mb-0.5', c.text, 'glow-text')}>
            {title}
          </div>
          <div className="text-sm text-text-dim">{subtitle}</div>
        </div>
      </div>

      {/* 描述 */}
      <p className="text-sm text-text-dim leading-relaxed mb-4">
        {description}
      </p>

      {/* 功能清单 */}
      <ul className="space-y-1.5 mb-4">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-text-dim">
            <span className={cn('mt-0.5', c.check)}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA 按钮 */}
      <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all group-hover:translate-x-1', c.btn)}>
        <span>进入</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  )
}
