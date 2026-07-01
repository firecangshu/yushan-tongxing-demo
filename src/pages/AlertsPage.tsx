// 与善同行 - 风险提醒页
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Bell,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { alerts, getCaseById, type RiskAlert, type RiskLevel } from '@/data/socialWorker'
import { cn } from '@/lib/utils'

const typeLabel = {
  overdue: { label: '跟进超期', icon: '⏰', color: 'yellow' },
  high_risk: { label: '高风险', icon: '⚠️', color: 'red' },
  incomplete: { label: '档案不全', icon: '📋', color: 'blue' },
  emergency: { label: '紧急事件', icon: '🚨', color: 'red' },
} as const

export default function AlertsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('active')

  const filtered = alerts.filter((a) => {
    if (filter === 'active') return !a.resolved
    if (filter === 'resolved') return a.resolved
    return true
  })

  const stats = {
    total: alerts.length,
    active: alerts.filter((a) => !a.resolved).length,
    resolved: alerts.filter((a) => a.resolved).length,
    high: alerts.filter((a) => !a.resolved && a.level === 'high').length,
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
            <Bell className="h-6 w-6 text-red-400" />
            风险提醒
          </h1>
          <p className="text-sm text-text-dim mt-1">智能识别高风险个案和异常情况</p>
        </div>
      </div>

      {/* 概览统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="总提醒数" value={stats.total} color="primary" />
        <StatCard label="待处理" value={stats.active} color="yellow" />
        <StatCard label="高风险" value={stats.high} color="red" />
        <StatCard label="已处理" value={stats.resolved} color="green" />
      </div>

      {/* 筛选 */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-text-dim" />
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} label={`全部 (${stats.total})`} />
        <FilterChip active={filter === 'active'} onClick={() => setFilter('active')} label={`待处理 (${stats.active})`} color="yellow" />
        <FilterChip active={filter === 'resolved'} onClick={() => setFilter('resolved')} label={`已处理 (${stats.resolved})`} color="green" />
      </div>

      {/* 提醒列表 */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-text mb-2">
              {filter === 'active' ? '没有待处理提醒' : '暂无提醒'}
            </h3>
            <p className="text-sm text-text-dim">
              {filter === 'active' ? '所有风险都已处理完毕，太棒了！' : '还没有风险提醒记录'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <AlertCard key={a.id} alert={a} />
          ))}
        </div>
      )}
    </div>
  )
}

function AlertCard({ alert }: { alert: RiskAlert }) {
  const c = getCaseById(alert.caseId)
  const t = typeLabel[alert.type]

  return (
    <Card
      className={cn(
        'border-l-4 transition-all',
        alert.level === 'high'
          ? 'border-l-red-500 hover:border-red-500/60'
          : 'border-l-yellow-500 hover:border-yellow-500/60',
        alert.resolved && 'opacity-60'
      )}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0',
              alert.level === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
            )}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={cn(
                'text-xs px-2 py-0.5 rounded border',
                alert.level === 'high' ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
              )}>
                {t.icon} {t.label}
              </span>
              <span className="text-sm font-semibold text-text">{alert.clientName}</span>
              <span className="text-xs text-text-dim ml-auto flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {alert.triggeredAt}
              </span>
            </div>
            <h3 className="text-base font-semibold text-text mb-1">{alert.title}</h3>
            <p className="text-sm text-text-dim mb-3">{alert.description}</p>

            <div className="rounded-lg bg-primary/5 border border-primary/10 p-3 mb-3">
              <div className="text-xs font-semibold text-primary mb-1">建议措施</div>
              <p className="text-sm text-text-dim">{alert.suggestion}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {c && (
                <Link to={`/cases/${c.id}`}>
                  <Button size="sm">
                    查看个案
                  </Button>
                </Link>
              )}
              {!alert.resolved ? (
                <>
                  <Button size="sm" variant="outline">
                    <CheckCircle2 className="h-3 w-3" />
                    标记已处理
                  </Button>
                  <Button size="sm" variant="ghost">
                    转为待办
                  </Button>
                </>
              ) : (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  已处理
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'primary' | 'yellow' | 'red' | 'green' }) {
  const colorMap = {
    primary: 'text-primary',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    green: 'text-green-400',
  }
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <div className={cn('text-3xl font-bold glow-text', colorMap[color])}>{value}</div>
        <div className="text-sm text-text-dim mt-1">{label}</div>
      </CardContent>
    </Card>
  )
}

function FilterChip({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color?: 'yellow' | 'green' }) {
  const colorMap = {
    yellow: 'border-yellow-500/30 text-yellow-400',
    green: 'border-green-500/30 text-green-400',
  } as const
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs rounded-full border transition-all',
        active
          ? 'bg-primary text-bg border-primary'
          : color
          ? colorMap[color]
          : 'border-primary/20 text-text-dim hover:border-primary/40'
      )}
    >
      {label}
    </button>
  )
}
