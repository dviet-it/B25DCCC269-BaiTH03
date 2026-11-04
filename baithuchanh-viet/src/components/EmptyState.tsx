import type { ReactNode } from 'react'
import { PackageSearch } from 'lucide-react'

interface Props {
  title: string
  children?: ReactNode
}

export default function EmptyState({ title, children }: Props) {
  return (
    <div className="empty">
      <div className="empty-img">
        <PackageSearch size={64} strokeWidth={1.2} />
      </div>
      <p className="empty-title">{title}</p>
      {children}
    </div>
  )
}
