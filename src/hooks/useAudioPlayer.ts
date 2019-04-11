import * as React from 'react'
import { useListeners } from './useListeners'
import { preventDefault } from '../util'

export function useAudioPlayer() {
  const [playing, setPlaying] = React.useState(false)
  const [duration, setDuration] = React.useState<number | void>()
  const [time, setTime] = React.useState(0)
  const player = React.useRef<HTMLAudioElement>(null)

  const updateDuration = () =>
    setDuration(player.current ? player.current.duration : undefined)
  const updateTime = () =>
    setTime(player.current ? player.current.currentTime : 0)

  useListeners(player, {
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    ended: () => setPlaying(false),
    durationchange: updateDuration,
    seeked: updateTime,
    timeupdate: updateTime,
    loadedmetadata: updateDuration
  })

  return {
    playerRef: player,
    playing,
    time,
    duration,
    play: preventDefault(() => player.current && player.current.play()),
    pause: preventDefault(() => player.current && player.current.pause()),
    seek: (time: number) =>
      player.current &&
      (player.current.currentTime =
        time < 0 ? 0 : Math.min(time, player.current.duration)),
    skipForward: (amount: number) =>
      player.current &&
      (player.current.currentTime = Math.min(
        player.current.currentTime + amount,
        player.current.duration
      )),
    skipBack: (amount: number) =>
      player.current &&
      (player.current.currentTime = Math.max(
        player.current.currentTime - amount,
        0
      ))
  }
}
