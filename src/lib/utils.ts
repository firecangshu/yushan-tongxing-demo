// 通用工具函数
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 className（白话：智能合并样式名，去重+处理冲突）
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
