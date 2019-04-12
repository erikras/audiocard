import * as React from 'react'

interface Props {
  className?: string
  value: number | void
}
export function Time({ className, value }: Props) {
  return <div className={className}>{secondsToHHMMSS(value)}</div>
}

function secondsToHHMMSS(t: number | void) {
  if (t === undefined || isNaN(t)) return '-:--'
  var h = Math.floor(t / 3600)
  var m = Math.floor(t / 60) % 60
  var s = Math.floor(t % 60)
  return `${h ? h + ':' : ''}${h ? ('0' + m).slice(-2) : m}:${('0' + s).slice(
    -2
  )}`
}
