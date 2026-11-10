import { useCallback, useEffect, useState } from 'react'
import type { TodoItem } from '../types'

const STORAGE_KEY = 'campus-guide.todos.v1'

function load(): TodoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as TodoItem[]) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>(() => load())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const add = useCallback((item: Omit<TodoItem, 'id' | 'done' | 'createdAt'>) => {
    setTodos((prev) => {
      // 同一条目同一天不重复添加
      if (prev.some((t) => t.cardId === item.cardId && t.due === item.due && !t.done)) return prev
      return [
        ...prev,
        {
          ...item,
          id: `${item.cardId}-${Date.now()}`,
          done: false,
          createdAt: Date.now()
        }
      ]
    })
  }, [])

  const toggle = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }, [])

  const remove = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const setDue = useCallback((id: string, due: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, due: due || undefined } : t)))
  }, [])

  return { todos, add, toggle, remove, setDue }
}

/** 剩余天数，用于 DDL 紧迫度着色 */
export function daysLeft(due?: string): number | null {
  if (!due) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${due}T00:00:00`)
  if (Number.isNaN(target.getTime())) return null
  return Math.round((target.getTime() - today.getTime()) / 86_400_000)
}
