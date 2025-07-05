import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AudioCard from '../src/AudioCard'

describe('AudioCard Skip Functionality', () => {
  it('renders skip back button when skipBackSeconds is provided', () => {
    render(
      <AudioCard
        source="https://example.com/audio.mp3"
        duration={120}
        skipBackSeconds={10}
      />
    )
    
    // Check that the skip back button is rendered
    const skipBackButton = screen.getByTitle('Skip Back 10s')
    expect(skipBackButton).toBeInTheDocument()
  })

  it('renders skip forward button when skipForwardSeconds is provided', () => {
    render(
      <AudioCard
        source="https://example.com/audio.mp3"
        duration={120}
        skipForwardSeconds={30}
      />
    )
    
    // Check that the skip forward button is rendered
    const skipForwardButton = screen.getByTitle('Skip Forward 30s')
    expect(skipForwardButton).toBeInTheDocument()
  })

  it('renders both skip buttons when both props are provided', () => {
    render(
      <AudioCard
        source="https://example.com/audio.mp3"
        duration={120}
        skipBackSeconds={10}
        skipForwardSeconds={30}
      />
    )
    
    // Check that both skip buttons are rendered
    const skipBackButton = screen.getByTitle('Skip Back 10s')
    const skipForwardButton = screen.getByTitle('Skip Forward 30s')
    expect(skipBackButton).toBeInTheDocument()
    expect(skipForwardButton).toBeInTheDocument()
  })

  it('does not render skip buttons when props are not provided', () => {
    render(
      <AudioCard
        source="https://example.com/audio.mp3"
        duration={120}
      />
    )
    
    // Check that skip buttons are not rendered
    expect(screen.queryByTitle(/Skip Back/)).not.toBeInTheDocument()
    expect(screen.queryByTitle(/Skip Forward/)).not.toBeInTheDocument()
  })

  it('renders skip buttons with zero values', () => {
    render(
      <AudioCard
        source="https://example.com/audio.mp3"
        duration={120}
        skipBackSeconds={0}
        skipForwardSeconds={0}
      />
    )
    
    // Check that skip buttons are rendered even with zero values
    const skipBackButton = screen.getByTitle('Skip Back 0s')
    const skipForwardButton = screen.getByTitle('Skip Forward 0s')
    expect(skipBackButton).toBeInTheDocument()
    expect(skipForwardButton).toBeInTheDocument()
  })
}) 