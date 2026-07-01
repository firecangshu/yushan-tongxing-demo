// 与善同行 - 角色切换器（顶栏 + 首页）
import { useRole } from '@/contexts/RoleContext'
import { GraduationCap, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

/** 顶栏用：紧凑的角色切换器 */
export function RoleSwitcherCompact() {
  const { role, setRole } = useRole()

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-bg-deep/50 p-1">
      <button
        onClick={() => setRole('student')}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
          role === 'student'
            ? 'bg-primary text-bg shadow-glow-primary'
            : 'text-text-dim hover:text-text'
        )}
      >
        <GraduationCap className="h-3.5 w-3.5" />
        考生端
      </button>
      <button
        onClick={() => setRole('socialWorker')}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
          role === 'socialWorker'
            ? 'bg-accent text-white shadow-glow-accent'
            : 'text-text-dim hover:text-text'
        )}
      >
        <Briefcase className="h-3.5 w-3.5" />
        社工端
      </button>
    </div>
  )
}

/** 首页用：大型角色入口卡片 */
export function RoleSwitcherLarge() {
  const { role, setRole } = useRole()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RoleCard
        active={role === 'student'}
        onClick={() => setRole('student')}
        icon={<GraduationCap className="h-8 w-8" />}
        title="考生端"
        subtitle="学习 + 备考"
        description="50 道精选真题 · AI 智能解析 · 错题本 · 学习计划"
        color="primary"
      />
      <RoleCard
        active={role === 'socialWorker'}
        onClick={() => setRole('socialWorker')}
        icon={<Briefcase className="h-8 w-8" />}
        title="社工端"
        subtitle="实务 + 管理"
        description="工作台 · 客户管理 · 个案看板 · AI 个案建议 · 风险提醒"
        color="accent"
      />
    </div>
  )
}

function RoleCard({
  active,
  onClick,
  icon,
  title,
  subtitle,
  description,
  color,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  color: 'primary' | 'accent'
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group text-left p-6 rounded-2xl border-2 transition-all',
        active
          ? color === 'primary'
            ? 'border-primary bg-primary/10 shadow-glow-primary'
            : 'border-accent bg-accent/10 shadow-glow-accent'
          : 'border-primary/20 bg-card-gradient hover:border-primary/40'
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-all',
            active
              ? color === 'primary'
                ? 'bg-primary text-bg'
                : 'bg-accent text-white'
              : 'bg-bg-card text-text-dim group-hover:text-text'
          )}
        >
          {icon}
        </div>
        <div>
          <div className={cn('text-lg font-bold', active ? (color === 'primary' ? 'text-primary glow-text' : 'text-accent-light glow-text-accent') : 'text-text')}>
            {title}
          </div>
          <div className="text-xs text-text-dim">{subtitle}</div>
        </div>
      </div>
      <p className="text-sm text-text-dim leading-relaxed">{description}</p>
      {active && (
        <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
          <span>✓ 当前使用</span>
        </div>
      )}
    </button>
  )
}
