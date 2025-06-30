import React from 'react'
import AudioCard from '../src'

// Server Component Example
export function ServerComponentExample() {
  return (
    <div>
      <h2>AudioCard Example</h2>

      {/* Static AudioCard - no interactivity */}
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Sample Audio Track"
        art="https://picsum.photos/225/225?random=3"
        duration={180} // 3 minutes
        currentTime={0}
        color="#333"
        background="#f5f5f5"
        width={600}
      />

      <h2>AudioCard (Different Style)</h2>

      {/* Another AudioCard with different styling */}
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Interactive Audio Track"
        art="https://picsum.photos/225/225?random=4"
        duration={180}
        currentTime={60}
        color="#666"
        background="#fff"
        width={600}
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
