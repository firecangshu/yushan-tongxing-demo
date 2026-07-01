// 与善同行 - 社工端 Hub 页面
// 承载社工 5 步逻辑线：社工端 → 工作台 → 个案看板 → AI 建议 → 风险提醒
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Target,
  Activity,
  Wand2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Users,
  FileText,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 5 步逻辑线（白话：从进社工门开始，到风险管控的 5 步）
const steps = [
  { icon: <Briefcase className="h-5 w-5" />, label: '社工端', desc: '当前所在', path: '/social-worker', current: true },
  { icon: <Target className="h-5 w-5" />, label: '工作台', desc: '今日工作总览', path: '/workbench' },
  { icon: <Activity className="h-5 w-5" />, label: '个案看板', desc: '6 阶段流程管理', path: '/cases' },
  { icon: <Wand2 className="h-5 w-5" />, label: 'AI 建议', desc: '智能辅助决策', path: '/ai-advice' },
  { icon: <AlertTriangle className="h-5 w-5" />, label: '风险提醒', desc: '智能预警 · 及时介入', path: '/alerts' },
]

// 4 个核心功能卡片（白话：社工日常要做的 6 件事，挑 4 个最常用的）
const quickCards = [
  {
    to: '/workbench',
    icon: <Target className="h-6 w-6" />,
    title: '工作台',
    desc: '4 区数据看板：待跟进个案 + 风险提醒 + AI 建议 + 隐私保护一屏掌握',
    color: 'primary' as const,
    badge: '数据总览',
  },
  {
    to: '/cases',
    icon: <Activity className="h-6 w-6" />,
    title: '个案看板',
    desc: '6 阶段 Kanban（接案→预估→计划→介入→评估→结案），12 个真实模拟个案',
    color: 'accent' as const,
    badge: '12 个案',
  },
  {
    to: '/ai-advice',
    icon: <Wand2 className="h-6 w-6" />,
    title: 'AI 建议',
    desc: '6 条智能建议，含「关键点 + 资源链接 + 置信度」，让 AI 决策不再是黑盒',
    color: 'warning' as const,
    badge: '6 条',
  },
  {
    to: '/alerts',
    icon: <AlertTriangle className="h-6 w-6" />,
    title: '风险提醒',
    desc: '8 条预警按 4 级筛选（紧急/高危/逾期/资料不全），不漏掉任何一个高风险信号',
    color: 'success' as const,
    badge: '8 预警',
  },
]

// 2 个补充入口（白话：日常用得少的 2 个）
const extraCards = [
  {
    to: '/clients',
    icon: <Users className="h-6 w-6" />,
    title: '客户管理',
    desc: '12 位服务对象档案，支持类型/风险/隐私多维筛选',
    color: 'primary' as const,
  },
  {
    to: '/cases',
    icon: <FileText className="h-6 w-6" />,
    title: '个案详情',
    desc: '流程进度时间线 + 基本信息 + AI 建议 + 风险 + 隐私一站看完',
    color: 'accent' as const,
  },
]

export default function SocialWorkerHubPage() {
  return (
    <div className="space-y-12">
      {/* ===== 1. Hub Hero ===== */}
      <section className="relative pt-4 pb-2 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/10 via-transparent to-transparent" />
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-accent-light">
            <Briefcase className="h-4 w-4" />
            <span>社工端 · 一线实务中心</span>
          </div>
          <h1 className="mb-3 text-3xl font-bold leading-tight text-text md:text-5xl">
            <span className="glow-text-accent">5 步走完每日实务</span>
          </h1>
          <p className="text-sm md:text-base text-text-dim">
            从工作台总览到风险管控，一线社工的智能助手
          </p>
        </div>
      </section>

      {/* ===== 2. 5 步逻辑线（流程图） ===== */}
      <section>
        <Card className="bg-gradient-to-r from-accent/5 via-transparent to-accent/5 border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <Link
                    to={s.path}
                    className={cn('group', s.current && 'pointer-events-none')}
                  >
                    <div className="flex flex-col items-center min-w-[100px]">
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all',
                          s.current
                            ? 'bg-accent text-white border-accent shadow-glow-accent'
                            : 'bg-accent/20 text-accent-light border-accent/40 group-hover:bg-accent group-hover:text-white group-hover:scale-110'
                        )}
                      >
                        {s.current ? <CheckCircle2 className="h-5 w-5" /> : s.icon}
                      </div>
                      <div className="text-xs font-semibold text-text mt-2 whitespace-nowrap">
                        {s.label}
                      </div>
                      <div className="text-[10px] text-text-dim mt-0.5 whitespace-nowrap">
                        {s.desc}
                      </div>
                    </div>
                  </Link>
                  {i < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-accent/40 mx-1 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== 3. 4 个核心功能 QuickCard ===== */}
      <section>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text mb-2">
            <span className="glow-text-accent">核心功能</span>
          </h2>
          <p className="text-sm text-text-dim">点击任意卡片直接进入对应功能</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((card) => (
            <QuickCard key={card.to} {...card} />
          ))}
        </div>
      </section>

      {/* ===== 4. 2 个补充入口 ===== */}
      <section>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-text-dim">辅助工具</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {extraCards.map((card) => (
            <QuickCardSimple key={card.to} {...card} />
          ))}
        </div>
      </section>

      {/* ===== 5. 快速开始 CTA ===== */}
      <section className="text-center pb-8">
        <Link to="/workbench">
          <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-white shadow-glow-accent">
            <Sparkles className="h-5 w-5" />
            从工作台开始
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <p className="text-xs text-text-dim mt-3">建议从「工作台」起步，逐项处理今日待办</p>
      </section>
    </div>
  )
}

// ===== QuickCard 组件（4 个核心卡片用） =====
function QuickCard({
  to,
  icon,
  title,
  desc,
  color,
  badge,
}: {
  to: string
  icon: React.ReactNode
  title: string
  desc: string
  color: 'primary' | 'accent' | 'warning' | 'success'
  badge: string
}) {
  // 不同颜色对应不同边框 + 文字（白话：让卡片看起来不单调）
  const colorMap = {
    primary: { text: 'text-primary', border: 'border-primary/30', glow: 'shadow-glow-primary' },
    accent: { text: 'text-accent-light', border: 'border-accent/30', glow: 'shadow-glow-accent' },
    warning: { text: 'text-yellow-400', border: 'border-yellow-400/30', glow: '' },
    success: { text: 'text-green-400', border: 'border-green-400/30', glow: '' },
  }
  const c = colorMap[color]
  return (
    <Link to={to} className="group block h-full">
      <Card className={cn('h-full cursor-pointer transition-all hover:scale-[1.03]', c.border, c.glow)}>
        <CardContent className="pt-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className={cn('flex h-11 w-11 items-center justify-center rounded-lg bg-bg-card/50', c.text)}>
              {icon}
            </div>
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full border', c.border, c.text)}>
              {badge}
            </span>
          </div>
          <h3 className={cn('text-base font-bold mb-1.5', c.text)}>{title}</h3>
          <p className="text-xs text-text-dim leading-relaxed flex-1">{desc}</p>
          <div className={cn('mt-3 flex items-center gap-1 text-xs font-medium', c.text)}>
            <span>立即开始</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// ===== QuickCardSimple 组件（2 个辅助卡片用） =====
function QuickCardSimple({
  to,
  icon,
  title,
  desc,
  color,
}: {
  to: string
  icon: React.ReactNode
  title: string
  desc: string
  color: 'primary' | 'accent'
}) {
  const colorMap = {
    primary: { text: 'text-primary', border: 'border-primary/30' },
    accent: { text: 'text-accent-light', border: 'border-accent/30' },
  }
  const c = colorMap[color]
  return (
    <Link to={to} className="group block h-full">
      <Card className={cn('h-full cursor-pointer transition-all hover:scale-[1.02]', c.border)}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-bg-card/50', c.text)}>
              {icon}
            </div>
            <h3 className="font-semibold text-text">{title}</h3>
          </div>
          <p className="text-sm text-text-dim">{desc}</p>
          <ArrowRight className="h-4 w-4 text-text-dim mt-3 group-hover:translate-x-1 transition-transform" />
        </CardContent>
      </Card>
    </Link>
  )
}
