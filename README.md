# ⏯️ AudioCard

⏯️ AudioCard is an opinionated, responsive, audio player for React, designed to be compatible with [Twitter Player Cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/player-card.html).

![Screenshot](screenshot.jpg)

## 🚀 Quick Start

```bash
npm install audiocard
# or
yarn add audiocard
# or
pnpm add audiocard
```

### Basic Usage

```jsx
import AudioCard from 'audiocard'

<AudioCard
  source="https://example.com/audio.mp3"
  title="My Audio Track"
  art="https://example.com/artwork.jpg"
  duration={180}
  width={750}
/>
```

### Interactive Usage

```jsx
import AudioCard from 'audiocard'

<AudioCard
  source="https://example.com/audio.mp3"
  title="Interactive Audio"
  duration={180}
  width={750}
  autoplay={true}
  preload={true}
/>
```

## 🎯 React Server Components (RSC) Support

AudioCard is fully compatible with React Server Components and Next.js App Router. The component includes the `'use client'` directive, so it can be imported and used directly in server components without any additional configuration.

```jsx
// This works in a Next.js server component
import AudioCard from 'audiocard'

export default function MyServerComponent() {
  return (
    <AudioCard
      source="https://example.com/audio.mp3"
      title="Server Component Audio"
      duration={180}
      width={750}
    />
  )
}
```

## Examples

See the other options on the [⏯️ AudioCard Storybook](https://erikras.github.io/audiocard/).

## Acknowledgements

The design was heavily influenced by the Twitter card for [Overcast.fm](https://overcast.fm).

```jsx
import AudioCard from 'audiocard'

<AudioCard
  art="https://seekjustice.fm/art300.jpg"
  source="https://dts.podtrac.com/redirect.mp3/seekjustice.fm/media/001.mp3"
  title="Seek Justice Podcast"
  duration={180}
  currentTime={0}
  color="#333"
  background="#f5f5f5"
  width={600}
/>
```
