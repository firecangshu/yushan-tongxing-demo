// 与善同行 - 角色管理 Context
// 用于在考生端和社工端之间切换
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Role = 'student' | 'socialWorker'

interface RoleContextValue {
  role: Role
  setRole: (role: Role) => void
  toggleRole: () => void
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

const STORAGE_KEY = 'yushan_role'

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    // 从 localStorage 读取，避免刷新丢失
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'student' || stored === 'socialWorker') return stored
    } catch (e) {
      console.warn('读取角色失败', e)
    }
    return 'student' // 默认考生端
  })

  // 持久化
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, role)
    } catch (e) {
      console.warn('保存角色失败', e)
    }
  }, [role])

  const setRole = (newRole: Role) => setRoleState(newRole)
  const toggleRole = () => setRoleState((r) => (r === 'student' ? 'socialWorker' : 'student'))

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole 必须在 RoleProvider 内使用')
  return ctx
}
