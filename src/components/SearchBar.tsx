import { useState } from 'react'

const EXAMPLES = [
  '寝室没水了怎么办',
  '电费欠费了去哪交',
  '这学期阳光长跑要跑几次',
  '补考怎么报名',
  '校园卡丢了'
]

interface Props {
  onSubmit: (query: string) => void
  loading: boolean
}

export function SearchBar({ onSubmit, loading }: Props) {
  const [value, setValue] = useState('')

  function submit(text: string) {
    const q = text.trim()
    if (!q || loading) return
    onSubmit(q)
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
          setValue('')
        }}
        className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-teal-500"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="说出你要办的事，例如：寝室没水了"
          maxLength={200}
          aria-label="描述你要办的事"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="shrink-0 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 active:scale-95"
        >
          {loading ? '查询中' : '查一下'}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => submit(ex)}
            disabled={loading}
            className="rounded-full bg-white px-3 py-1.5 text-xs text-slate-600 ring-1 ring-slate-200 transition active:scale-95 disabled:opacity-50"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
