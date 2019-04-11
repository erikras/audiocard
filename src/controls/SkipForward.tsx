import React from 'react'

interface Props {
  seconds: number
  className?: string
}

export const SkipForward = ({ seconds, ...rest }: Props) => (
  <svg viewBox="0 0 71 71" {...rest}>
    <defs>
      <clipPath id="prefix__a">
        <path d="M.5 71.5V.5h71v71z" />
      </clipPath>
    </defs>
    <g clipPath="url(#prefix__a)">
      <path
        d="M61.5 35.5c0 7-2 14-8 20-10 11-28 11-39 0-10-11-10-28 0-39 6-6 14-8 21-8h1"
        fill="none"
        strokeWidth={3}
        stroke="currentColor"
        strokeLinecap="square"
      />
      <path
        d="M61.5 35.5h-6M12.5 35.5h-6M34.5 57.5v6"
        fill="none"
        strokeWidth={3}
        stroke="currentColor"
      />
      <path
        d="M34 1l11 7-11 7v-1V0zM45 1l12 7-12 7v-1V0z"
        fill="currentColor"
      />
    </g>
    <text
      x={22}
      y={44}
      fontSize={23}
      fill="currentColor"
      className="prefix__svgcentertext"
    >
      {seconds}
    </text>
  </svg>
)
