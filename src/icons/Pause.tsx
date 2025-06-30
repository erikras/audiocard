import React from 'react'

interface Props {
  className?: string
}

const Pause: React.FC<Props> = (props) => (
  <svg viewBox="0 0 1 1" display="block" {...props}>
    <g fill="currentColor">
      <path d="M.15.15h.262v.7H.15zM.588.15H.85v.7H.588z" />
    </g>
  </svg>
)

export default Pause 