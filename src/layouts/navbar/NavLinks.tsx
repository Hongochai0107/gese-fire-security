import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/navigation'

export function NavLinks() {
  return (
    <ul className="hidden items-center gap-8 md:flex">
      {navItems.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'text-sm font-medium transition-colors duration-200',
                isActive ? 'text-primary' : 'text-muted hover:text-white',
              )
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
