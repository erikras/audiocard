import React from 'react'
import AudioCard from '../src/AudioCard'

// Server Component Example
export function ServerComponentExample() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AudioCard RSC Example</h1>
      <p>This example demonstrates that AudioCard works properly in React Server Components.</p>
      
      <AudioCard
        source="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        title="Sample Audio in Server Component"
        duration={120}
        currentTime={30}
        width={750}
      />
      
      <h2>With Artwork</h2>
      <AudioCard
        source="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        title="Audio with Artwork"
        art="https://picsum.photos/225/225?random=1"
        duration={180}
        currentTime={60}
        width={750}
      />
      
      <h2>Custom Colors</h2>
      <AudioCard
        source="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        title="Custom Colored Audio"
        color="#ff6b6b"
        background="#2c3e50"
        progressBarBackground="#34495e"
        progressBarCompleteBackground="#e74c3c"
        duration={240}
        currentTime={120}
        width={750}
      />
    </div>
  )
}

// Next.js App Router Example
export function NextJSExample() {
  return (
    <div>
      <h2>Next.js App Router Usage</h2>

      {/* In a Server Component (app/page.tsx) */}
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Server Rendered Audio Card"
        duration={240}
        currentTime={0}
        width={750}
      />

      {/* Another AudioCard example */}
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Interactive Audio Card"
        duration={240}
        currentTime={120}
        width={750}
      />
    </div>
  )
}
