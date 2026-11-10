import { daysLeft } from '../hooks/useTodos'
import type { TodoItem } from '../types'

interface Props {
  todos: TodoItem[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onSetDue: (id: string, due: string) => void
}

function DueBadge({ due }: { due?: string }) {
  const left = daysLeft(due)
  if (left === null) return null

  const label = left < 0 ? `逾期 ${-left} 天` : left === 0 ? '今天截止' : `还剩 ${left} 天`
  const tone =
    left < 0
      ? 'bg-rose-50 text-rose-600'
      : left <= 2
        ? 'bg-amber-50 text-amber-700'
        : 'bg-slate-100 text-slate-500'

  return <span className={`rounded-md px-1.5 py-0.5 text-[11px] ${tone}`}>{label}</span>
}

export function TodoPanel({ todos, onToggle, onRemove, onSetDue }: Props) {
  const pending = todos.filter((t) => !t.done).length

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
        <p className="text-sm text-slate-500">还没有待办</p>
        <p className="mt-1 text-xs text-slate-400">在行动卡上点「加入我的待办」，之后就能在这里跟踪</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="px-1 text-xs text-slate-500">
        共 {todos.length} 条，未完成 {pending} 条
      </p>
      <ul className="space-y-2">
        {[...todos]
          .sort((a, b) => Number(a.done) - Number(b.done) || (a.due ?? '9999').localeCompare(b.due ?? '9999'))
          .map((todo) => (
            <li
              key={todo.id}
              className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-slate-200"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                aria-label={`标记 ${todo.title}`}
                className="mt-0.5 h-5 w-5 shrink-0 accent-teal-600"
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[14px] leading-snug ${
                    todo.done ? 'text-slate-400 line-through' : 'text-slate-800'
                  }`}
                >
                  {todo.title}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    type="date"
                    value={todo.due ?? ''}
                    onChange={(e) => onSetDue(todo.id, e.target.value)}
                    aria-label="设置截止日期"
                    className="rounded-md bg-slate-50 px-1.5 py-1 text-[11px] text-slate-600 outline-none"
                  />
                  <DueBadge due={todo.due} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(todo.id)}
                aria-label={`删除 ${todo.title}`}
                className="shrink-0 px-1 text-slate-300 transition hover:text-rose-500"
              >
                ×
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
