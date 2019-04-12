import * as React from 'react'
import AudioCard from '../src'

export default function WithSkipBack() {
  return (
    <AudioCard
      art="https://seekjustice.fm/art300.jpg"
      source="https://dts.podtrac.com/redirect.mp3/seekjustice.fm/media/001.mp3"
      skipBackSeconds={10}
    />
  )
}
