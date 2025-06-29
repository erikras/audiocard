import React from 'react'
import { render } from '@testing-library/react'
import { AudioCard } from '../src/AudioCard'

describe('AudioCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Test Audio"
        duration={180}
        width={750}
      />,
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with artwork', () => {
    const { getByAltText } = render(
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Test Audio"
        art="https://example.com/artwork.jpg"
        duration={180}
        width={750}
      />,
    )

    const img = getByAltText('Test Audio')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/artwork.jpg')
  })

  it('renders with custom styling', () => {
    const { container } = render(
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Test Audio"
        duration={180}
        width={600}
        color="#ff0000"
        background="#000000"
      />,
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveStyle({
      color: '#ff0000',
      backgroundColor: '#000000',
    })
  })

  it('calculates progress correctly', () => {
    const { container } = render(
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Test Audio"
        duration={100}
        currentTime={50}
        width={750}
      />,
    )

    // The progress fill should be 50% width
    const progressFill = container.querySelector('[style*="width: 50%"]')
    expect(progressFill).toBeInTheDocument()
  })

  it('formats time correctly', () => {
    const { container } = render(
      <AudioCard
        source="https://example.com/audio.mp3"
        title="Test Audio"
        duration={125} // 2:05
        currentTime={65} // 1:05
        width={750}
      />,
    )

    // Should display formatted times
    expect(container.textContent).toContain('1:05')
    expect(container.textContent).toContain('2:05')
  })
})
