import { Link } from 'react-router-dom'
import { GeseLogoMark } from '@/components/icons/GeseLogo'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <GeseLogoMark className="h-10 w-auto shrink-0" />
      <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:block">
        Fire &amp; Security
      </span>
    </Link>
  )
}
