# AudioCard Server Component

This library has been converted to support React Server Components, making it compatible with Next.js 13+ App Router and other React Server Component frameworks.

## What Changed

### Removed Dependencies

- `styled-components` - Replaced with inline styles for server-side rendering
- `howler` - Audio playback moved to client-side enhancement
- `react-use-dimensions` - Responsive sizing handled differently
- `raf` - Animation frame handling moved to client

### New Components

#### `AudioCardServer` (Default Export)

A pure Server Component that renders a static audio player interface. No client-side JavaScript required.

```tsx
import { AudioCardServer } from 'audiocard'

// In a Server Component
export default function Page() {
  return (
    <AudioCardServer
      source="https://example.com/audio.mp3"
      title="My Audio Track"
      art="https://example.com/artwork.jpg"
      duration={180} // Required for server component
      currentTime={0} // Optional, defaults to 0
      width={750} // Optional, defaults to 750
      color="#333"
      background="#f5f5f5"
    />
  )
}
```

#### `AudioCardClient`

A Client Component that provides audio playback functionality. Use this to wrap `AudioCardServer` for interactive features.

```tsx
'use client'
import { AudioCardServer, AudioCardClient } from 'audiocard'

export default function InteractiveAudioCard() {
  return (
    <AudioCardClient
      source="https://example.com/audio.mp3"
      autoplay={false}
      preload={true}
      skipBackSeconds={10}
      skipForwardSeconds={30}
      onPlayStateChange={(playing) => console.log('Playing:', playing)}
      onTimeChange={(time) => console.log('Time:', time)}
      onDurationChange={(duration) => console.log('Duration:', duration)}
    >
      <AudioCardServer
        source="https://example.com/audio.mp3"
        title="Interactive Audio Track"
        art="https://example.com/artwork.jpg"
        duration={180}
        currentTime={0}
        color="#333"
        background="#f5f5f5"
      />
    </AudioCardClient>
  )
}
```

#### `AudioCard` (Legacy)

The original client-side component is still available for backward compatibility.

## Key Differences

### Server Component Requirements

- **`duration`** is now required (was optional before)
- **`currentTime`** is now a prop (was managed by state before)
- **`width`** is now a prop (was responsive before)

### Styling

- Replaced styled-components with inline styles
- All styling is now done via `React.CSSProperties`
- No CSS-in-JS runtime dependencies

### Audio Playback

- Server Component is static - no audio playback
- Audio playback requires the `AudioCardClient` wrapper
- Howler.js is only loaded on the client side

## Migration Guide

### From v1.x to v2.x

1. **Replace the default import:**

   ```tsx
   // Before
   import AudioCard from 'audiocard'

   // After
   import { AudioCardServer } from 'audiocard'
   ```

2. **Add required duration prop:**

   ```tsx
   // Before
   <AudioCard source="audio.mp3" title="Track" />

   // After
   <AudioCardServer source="audio.mp3" title="Track" duration={180} />
   ```

3. **For interactive features, wrap with AudioCardClient:**

   ```tsx
   // Before
   <AudioCard source="audio.mp3" title="Track" autoplay={true} />

   // After
   <AudioCardClient source="audio.mp3" autoplay={true}>
     <AudioCardServer source="audio.mp3" title="Track" duration={180} />
   </AudioCardClient>
   ```

## Next.js App Router Usage

### Server Component (app/page.tsx)

```tsx
import { AudioCardServer } from 'audiocard'

export default function Page() {
  return (
    <div>
      <h1>My Audio Page</h1>
      <AudioCardServer
        source="https://example.com/audio.mp3"
        title="Server Rendered Audio"
        duration={240}
        width={600}
      />
    </div>
  )
}
```

### Client Component with Interactivity

```tsx
'use client'
import { AudioCardServer, AudioCardClient } from 'audiocard'

export default function InteractiveAudio() {
  return (
    <AudioCardClient
      source="https://example.com/audio.mp3"
      preload={true}
      skipBackSeconds={10}
      skipForwardSeconds={30}
    >
      <AudioCardServer
        source="https://example.com/audio.mp3"
        title="Interactive Audio"
        duration={240}
        width={600}
      />
    </AudioCardClient>
  )
}
```

## Benefits

1. **Server-Side Rendering**: Audio cards can be rendered on the server for better SEO and performance
2. **Smaller Bundle Size**: No client-side dependencies unless audio playback is needed
3. **Better Performance**: Static rendering is faster than client-side rendering
4. **SEO Friendly**: Content is available to search engines and social media crawlers
5. **Progressive Enhancement**: Start with static content, add interactivity as needed

## Limitations

1. **Duration Required**: You must know the audio duration upfront
2. **No Responsive Sizing**: Width must be specified as a prop
3. **Static Interface**: Server Component cannot respond to user interactions
4. **Client Enhancement Required**: Audio playback requires additional client-side code

## Package Size

The Server Component version is significantly smaller:

- **v1.x**: ~6kB (with all dependencies)
- **v2.x Server Component**: ~2kB (static only)
- **v2.x with Client Enhancement**: ~4kB (when audio playback is needed)
