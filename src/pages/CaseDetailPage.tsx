// 与善同行 - 个案详情页
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  User,
  Calendar,
  AlertTriangle,
  Lock,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  Activity,
  Wand2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  getCaseById,
  getClientById,
  getAlertsByCaseId,
  aiAdvices,
  type CaseStage,
} from '@/data/socialWorker'
import { cn } from '@/lib/utils'

const stageLabel: Record<CaseStage, string> = {
  intake: '接案',
  assessment: '预估',
  planning: '计划',
  intervention: '介入',
  evaluation: '评估',
  closure: '结案',
}

const stageOrder: CaseStage[] = ['intake', 'assessment', 'planning', 'intervention', 'evaluation', 'closure']

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const c = id ? getCaseById(id) : undefined
  if (!c) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-text mb-4">未找到该个案</h2>
        <Link to="/cases">
          <Button>返回看板</Button>
        </Link>
      </div>
    )
  }

  const client = getClientById(c.clientId)
  const caseAlerts = getAlertsByCaseId(c.id)
  const caseAdvices = aiAdvices.filter((a) => a.caseId === c.id)
  const currentStageIdx = stageOrder.indexOf(c.stage)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link to="/cases" className="inline-flex items-center gap-1 text-sm text-text-dim hover:text-text">
        <ArrowLeft className="h-4 w-4" />
        返回看板
      </Link>

      {/* 顶部信息 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs text-text-dim font-mono">{c.caseNo}</span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded',
                  c.riskLevel === 'high' ? 'bg-red-500/10 text-red-400' :
                  c.riskLevel === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-green-500/10 text-green-400'
                )}>
                  {c.riskLevel === 'high' ? '高风险' : c.riskLevel === 'medium' ? '中风险' : '低风险'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                  {stageLabel[c.stage]}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-text glow-text mb-3">{c.title}</h1>
              <p className="text-text-dim leading-relaxed">{c.summary}</p>
            </div>
            {client && (
              <div className="md:w-64 bg-bg-deep/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-semibold">
                    {client.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-text">{client.name}</div>
                    <div className="text-xs text-text-dim">{client.gender} · {client.age}岁</div>
                  </div>
                </div>
                {client.privacyLevel >= 2 && (
                  <div className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span>{client.privacyLevel === 3 ? '高度敏感档案' : '敏感档案'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：流程进度 + 详情 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 流程进度 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                服务流程
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                {stageOrder.map((stage, i) => {
                  const isCompleted = i < currentStageIdx
                  const isCurrent = i === currentStageIdx
                  return (
                    <div key={stage} className="flex-1 flex flex-col items-center relative">
                      <div
                        className={cn(
                          'h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold z-10',
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isCurrent
                            ? 'bg-primary text-bg ring-4 ring-primary/20'
                            : 'bg-bg-card text-text-dim border border-primary/20'
                        )}
                      >
                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                      </div>
                      <div className={cn(
                        'text-xs mt-2',
                        isCurrent ? 'text-primary font-semibold' : isCompleted ? 'text-green-400' : 'text-text-dim'
                      )}>
                        {stageLabel[stage]}
                      </div>
                      {i < stageOrder.length - 1 && (
                        <div
                          className={cn(
                            'absolute top-4 left-1/2 w-full h-0.5',
                            isCompleted ? 'bg-green-500' : 'bg-primary/20'
                          )}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-text-dim mb-1">
                  <span>计划完成度</span>
                  <span className="text-primary font-semibold">{c.progress}%</span>
                </div>
                <div className="h-2 bg-bg-deep rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 案例详情 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">基本信息</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <InfoBlock label="负责社工" value={c.socialWorker} />
              <InfoBlock label="负责督导" value={c.supervisor} />
              <InfoBlock label="接案日期" value={c.openedAt} />
              <InfoBlock label="最近跟进" value={c.lastFollowUp} />
              <InfoBlock label="跟进次数" value={String(c.followUpCount)} />
              <InfoBlock label="距上次" value={
                <span className={cn(
                  c.daysSinceLastFollowUp > 14 ? 'text-red-400' :
                  c.daysSinceLastFollowUp > 7 ? 'text-yellow-400' : 'text-green-400'
                )}>
                  {c.daysSinceLastFollowUp} 天
                </span>
              } />
            </CardContent>
          </Card>

          {/* AI 建议 */}
          {caseAdvices.length > 0 && (
            <Card className="border-accent/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-accent-light" />
                  AI 个案建议
                  <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent-light">
                    {caseAdvices.length} 条
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {caseAdvices.map((a) => (
                  <div key={a.id} className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text">{a.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent-light">
                        置信度 {a.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-text-dim leading-relaxed mb-3">{a.content}</p>
                    <div className="space-y-1">
                      {a.keyPoints.slice(0, 3).map((p, i) => (
                        <div key={i} className="text-xs text-text-dim flex items-start gap-2">
                          <span className="text-accent-light mt-0.5">▸</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧：提醒 + 操作 */}
        <div className="space-y-6">
          {caseAlerts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  风险提醒
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {caseAlerts.map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      'p-3 rounded-lg border text-sm',
                      a.level === 'high' ? 'border-red-500/30 bg-red-500/5' : 'border-yellow-500/30 bg-yellow-500/5'
                    )}
                  >
                    <div className="font-semibold text-text mb-1">{a.title}</div>
                    <p className="text-xs text-text-dim mb-2">{a.description}</p>
                    <div className="text-xs text-primary">
                      <strong>建议：</strong>{a.suggestion}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <FileText className="h-4 w-4" />
                写跟进记录
              </Button>
              <Button variant="outline" className="w-full">
                <Wand2 className="h-4 w-4" />
                生成 AI 建议
              </Button>
              <Button variant="outline" className="w-full">
                <TrendingUp className="h-4 w-4" />
                推进到下一阶段
              </Button>
              {c.stage !== 'closure' && (
                <Button variant="ghost" className="w-full text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  申请结案
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/5 to-primary/5 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-green-400" />
                <span className="text-sm font-semibold text-text">隐私保护</span>
              </div>
              <p className="text-xs text-text-dim leading-relaxed">
                本档案为{client?.privacyLevel === 3 ? '高度敏感' : client?.privacyLevel === 2 ? '敏感' : '普通'}级别，
                所有查看和编辑已记录到审计日志。
              </p>
              <div className="mt-2 text-xs text-text-dim">
                <div>累计查看：<span className="text-text">17</span> 次</div>
                <div>最近查看：<span className="text-text">今天 14:23</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function InfoBlock({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-text-dim mb-1">{label}</div>
      <div className="text-text">{value}</div>
    </div>
  )
}
