# ⏯️ AudioCard

⏯️ AudioCard is an opinionated, responsive, audio player for React, designed to be compatible with [Twitter Player Cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/player-card.html). Now with **React Server Component** support!

![Screenshot](screenshot.jpg)

## 🚀 New in v2.0: Server Component Support

AudioCard now supports React Server Components, making it perfect for Next.js 13+ App Router and other modern React frameworks. The library provides both static server-rendered components and interactive client-side enhancements.

### Quick Start

```bash
yarn add audiocard
```

#### Server Component (Static)

```jsx
import AudioCard from 'audiocard'

// In a Server Component
<AudioCard
  source="https://example.com/audio.mp3"
  title="My Audio Track"
  art="https://example.com/artwork.jpg"
  duration={180} // Required for server component
  width={750}
/>
```

#### Interactive Client Component

```jsx
'use client'
import { AudioCardServer, AudioCardClient } from 'audiocard'

<AudioCardClient source="https://example.com/audio.mp3" preload={true}>
  <AudioCardServer
    source="https://example.com/audio.mp3"
    title="Interactive Audio"
    duration={180}
    width={750}
  />
</AudioCardClient>
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
