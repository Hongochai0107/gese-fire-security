import { useId } from 'react'
import type { SVGProps } from 'react'

export function GeseLogoMark(props: SVGProps<SVGSVGElement>) {
  const clipId = `gese-pill-${useId().replace(/:/g, '')}`

  return (
    <svg viewBox="0 0 200 92" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <defs>
        <clipPath id={clipId}>
          <rect width="200" height="92" rx="46" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="200" height="92" fill="#1B5E3C" />
        <rect x="48" width="3" height="92" fill="#ffffff" opacity="0.18" />
        <rect x="98" width="3" height="92" fill="#ffffff" opacity="0.18" />
        <rect x="148" width="3" height="92" fill="#ffffff" opacity="0.18" />
        <rect y="78" width="200" height="3" fill="#ffffff" opacity="0.12" />
      </g>
      <text x="25" y="64" textAnchor="middle" fontSize="50" fontWeight="800" fill="#FBEAE3" fontFamily="Arial, sans-serif">
        G
      </text>
      <text x="75" y="64" textAnchor="middle" fontSize="50" fontWeight="800" fill="#ffffff" fontFamily="Arial, sans-serif">
        E
      </text>
      <text x="125" y="64" textAnchor="middle" fontSize="50" fontWeight="800" fill="#ffffff" fontFamily="Arial, sans-serif">
        S
      </text>
      <text x="175" y="64" textAnchor="middle" fontSize="50" fontWeight="800" fill="#ffffff" fontFamily="Arial, sans-serif">
        E
      </text>
    </svg>
  )
}
