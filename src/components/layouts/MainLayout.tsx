// 与善同行 - 主布局（带角色切换 + 角色相关导航）
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { Brain, Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRole, type Role } from '@/contexts/RoleContext'
import { RoleSwitcherCompact } from '@/components/common/RoleSwitcher'

// 考生端导航
const studentNav: { path: string; label: string }[] = [
  { path: '/', label: '首页' },
  { path: '/student', label: '考生中心' },
  { path: '/quiz', label: 'AI 题库' },
  { path: '/exam', label: '模拟试卷' },
  { path: '/wrong-book', label: '错题本' },
  { path: '/study-plan', label: '学习计划' },
]

// 社工端导航
const socialWorkerNav: { path: string; label: string }[] = [
  { path: '/', label: '首页' },
  { path: '/social-worker', label: '社工中心' },
  { path: '/workbench', label: '工作台' },
  { path: '/clients', label: '客户管理' },
  { path: '/cases', label: '个案看板' },
  { path: '/ai-advice', label: 'AI 建议' },
  { path: '/alerts', label: '风险提醒' },
]

export default function MainLayout() {
  const location = useLocation()
  const { role } = useRole()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = role === 'student' ? studentNav : socialWorkerNav

  return (
    <div className="min-h-screen bg-gradient-tech">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b border-primary/20 bg-bg-deep/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-glow rounded-lg" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-bg">
                <Brain className="h-5 w-5" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-text glow-text">与善同行</span>
              <span className="text-[10px] text-text-dim">社工智能工作台</span>
            </div>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all',
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-text-dim hover:text-text hover:bg-bg-card'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 右侧：角色切换器 + AI 标识 */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <RoleSwitcherCompact />
            <div className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs text-primary">AI</span>
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 text-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary/20 bg-bg-deep animate-fade-in">
            <div className="p-4 flex justify-center">
              <RoleSwitcherCompact />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-6 py-3 text-sm font-medium',
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-text-dim'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* 主内容区 */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="mt-16 border-t border-primary/20 bg-bg-deep/50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-text-dim">
            © 2026 与善同行 · 社工智能工作台 · 由 TRAE AI 构建
          </p>
        </div>
      </footer>
    </div>
  )
}
