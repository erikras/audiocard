import * as React from 'react'
import AudioCard from '../src'

export default function WithSkipButtons() {
  return (
    <AudioCard
      art="https://seekjustice.fm/art300.jpg"
      source="https://seekjustice.fm/media/001.mp3"
      skipBackSeconds={10}
      skipForwardSeconds={30}
      color="orange"
      preload="auto"
      background="black"
      progressBarBackground="darkorange"
      progressBarCompleteBackground="darkGray"
    />
  )
}
