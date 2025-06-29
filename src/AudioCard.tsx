import * as React from 'react'
import SkipBack from './icons/SkipBack'
import SkipForward from './icons/SkipForward'
import Play from './icons/Play'
import Pause from './icons/Pause'

export interface AudioCardProps {
  /** Optional artwork for the song or podcast episode */
  art?: string
  /** Background color for entire card */
  background?: string
  /** Optional class name to apply to the resulting container element */
  className?: string
  /**
   * Primary color for controls
   *
   * @default '#666'
   **/
  color?: string
  /**
   * Optional url for a hyperlink to be rendered. Will only render if
   * you include both link and linkText.
   **/
  link?: string
  /**
   * Optional text for a hyperlink to be rendered. Will only render if
   * you include both link and linkText.
   **/
  linkText?: string
  /**
   * Background for entire progress bar.
   *
   * @default '#DDD'
   **/
  progressBarBackground?: string
  /**
   * Background for the part to the left of the scrubber handle
   *
   * @default '#AAA'
   **/
  progressBarCompleteBackground?: string
  /** URL of the MP3 file to play */
  source: string
  /** Optional title of the song or podcast episode */
  title?: string
  /** Duration in seconds - required for server component */
  duration: number
  /** Current time in seconds - defaults to 0 for server component */
  currentTime?: number
  /** Width of the component - defaults to 750px */
  width?: number
}

const canonicalWidth = 750
const canonicalHeight = 225
const aspectRatio = canonicalWidth / canonicalHeight

export function AudioCard({
  art,
  background,
  className,
  color = '#666',
  link,
  linkText,
  progressBarBackground = '#ddd',
  progressBarCompleteBackground = '#aaa',
  title,
  duration,
  currentTime = 0,
  width = canonicalWidth,
}: AudioCardProps) {
  const height = width / aspectRatio
  const h = (value: number) => (value * height) / canonicalHeight
  const w = (value: number) => (value * width) / canonicalWidth

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, sans-serif",
    lineHeight: '1em',
    height: height,
    color: color,
  }

  if (background) {
    containerStyle.backgroundColor = background
  }

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: 0,
  }

  const controlsStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    fontSize: h(16),
  }

  const timesStyle: React.CSSProperties = {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    margin: '0 5px 5px 5px',
    fontSize: h(16),
  }

  const controlStyle: React.CSSProperties = {
    textDecoration: 'none',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    margin: '5px',
    width: '15%',
    color: color,
    cursor: 'pointer',
  }

  const artStyle: React.CSSProperties = {
    height: height,
    width: height,
    minHeight: height,
    minWidth: height,
  }

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: h(24),
    width: w(canonicalWidth - (art ? canonicalHeight : 0) - 20),
    margin: h(12) + 'px ' + w(10) + 'px ' + h(12) + 'px ' + w(10) + 'px',
    minHeight: h(30),
  }

  const linkStyle: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    fontSize: h(20),
    color: color,
    textDecoration: 'none',
  }

  const progressContainerStyle: React.CSSProperties = {
    position: 'relative',
    height: h(20),
    minHeight: h(20),
  }

  const progressBarStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: progressBarBackground,
    boxShadow: 'inset 1px 1px 2px rgba(0, 0, 0, 0.3)',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  }

  const progressFillStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: progressPercentage + '%',
    backgroundColor: progressBarCompleteBackground,
    transition: 'width 0.1s ease',
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const secsStr = secs < 10 ? '0' + secs : String(secs)
    return mins + ':' + secsStr
  }

  return (
    <div className={className} style={containerStyle}>
      {art && <img src={art} alt={title || 'Audio artwork'} style={artStyle} />}
      <div style={contentStyle}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={controlsStyle}>
          <div style={controlStyle}>
            <SkipBack seconds={10} />
          </div>
          <div style={controlStyle}>
            <Play />
          </div>
          <div style={controlStyle}>
            <SkipForward seconds={10} />
          </div>
        </div>
        {link && linkText && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {linkText}
          </a>
        )}
        <div style={timesStyle}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div style={progressContainerStyle}>
          <div style={progressBarStyle}>
            <div style={progressFillStyle} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioCard
