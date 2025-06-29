import React from 'react'

interface Props {
  className?: string
}

const Play: React.FC<Props> = (props) => (
  <svg viewBox="0 0 1.25 1.25" display="block" {...props}>
    <path fill="currentColor" d="M.25.125l1 .5-1 .5z" />
  </svg>
)

export default Play 