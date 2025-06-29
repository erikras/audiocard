import * as React from 'react'
import { Howl } from 'howler'
import raf from 'raf' // requestAnimationFrame polyfill
import { preventDefault } from '../util'

interface Config {
  preload?: boolean
  autoplay?: boolean
  onPlay?: () => void
  onEnd?: () => void
}

export function useHowl(src: string, config: Config) {
  const howlRef = React.useRef<Howl>()
  const rafRef = React.useRef<number>()
  const [playing, setPlaying] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  const [time, setTime] = React.useState(0)

  const start = () => {
    setPlaying(true)
    rafRef.current = raf(() => {
      if (howlRef.current) {
        setTime(howlRef.current.seek() as number)
      }
    })
  }
  const stop = () => {
    setPlaying(false)
    if (rafRef.current !== undefined) {
      raf.cancel(rafRef.current)
    }
  }
  React.useEffect(() => {
    const howl = new Howl({
      src,
      preload: config.preload,
      autoplay: config.autoplay,
      html5: true,
      onload: () => {
        setDuration(howl.duration())
      },
      onplay: () => {
        start()
        if (config.onPlay) {
          config.onPlay()
        }
      },
      onplayerror: function() {
        howl.once('unlock', function() {
          howl.play()
        })
      },
      onpause: () => stop,
      onend: () => {
        stop()
        if (config.onEnd) {
          config.onEnd()
        }
      }
    })
    howlRef.current = howl
    return () => {
      howl.unload()
      howl.stop()
      howl.unload()
    }
  }, [src, config])
  return {
    playing,
    duration,
    time,
    play: preventDefault(() => {
      if (howlRef.current) {
        howlRef.current.play()
      }
    }),
    pause: preventDefault(() => {
      if (howlRef.current) {
        howlRef.current.pause()
      }
    }),
    seek: (time: number) =>
      howlRef.current &&
      howlRef.current.seek(time < 0 ? 0 : Math.min(time, duration)),
    skipForward: (amount: number) =>
      howlRef.current &&
      howlRef.current.seek(Math.min(time + amount, duration)),
    skipBack: (amount: number) =>
      howlRef.current && howlRef.current.seek(Math.max(time - amount, 0))
  }
}
