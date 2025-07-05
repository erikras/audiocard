'use client'
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
  /**
   * Optional number of seconds to skip back when the "skip back"
   * control is activated. If not provided, the "skip back" button
   * will not be rendered.
   **/
  skipBackSeconds?: number
  /**
   * Optional number of seconds to skip forward when the "skip forward"
   * control is activated. If not provided, the "skip forward" button
   * will not be rendered.
   **/
  skipForwardSeconds?: number
  /** URL of the MP3 file to play */
  source: string
  /** Optional title of the song or podcast episode */
  title?: string
  /** Duration in seconds - defaults to 0 for server component */
  duration?:number
  /** Current time in seconds - defaults to 0 for server component */
  currentTime?: number
  /** Width of the component - defaults to 750px */
  width?: number
  autoplay?: boolean
  preload?: boolean | 'auto' | 'metadata' | 'none'
}

const canonicalWidth = 750
const canonicalHeight = 225
const aspectRatio = canonicalWidth / canonicalHeight

function AudioCard({
  art,
  background,
  className,
  color = '#666',
  link,
  linkText,
  progressBarBackground = '#ddd',
  progressBarCompleteBackground = '#aaa',
  skipBackSeconds,
  skipForwardSeconds,
  source,
  title,
  duration = 0,
  currentTime: initialCurrentTime = 0,
  width = canonicalWidth,
  autoplay = false,
  preload = 'auto',
}: AudioCardProps) {
  const height = width / aspectRatio
  const h = (value: number) => (value * height) / canonicalHeight
  const w = (value: number) => (value * width) / canonicalWidth

  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(initialCurrentTime)
  const [internalDuration, setInternalDuration] = React.useState(duration || 0)

  React.useEffect(() => {
    setCurrentTime(initialCurrentTime)
  }, [initialCurrentTime, setCurrentTime])

  React.useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current.play()
    }
  }, [autoplay])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min((internalDuration || duration || 0), audio.currentTime + seconds))
  }

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleAudioPlay = () => setIsPlaying(true)
  const handleAudioPause = () => setIsPlaying(false)
  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setInternalDuration(audioRef.current.duration)
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    const seekTime = percent * (internalDuration || duration || 0)
    audio.currentTime = seekTime
  }

  const progressPercentage = (internalDuration || duration || 0) > 0
    ? Math.min(100, Math.max(0, (currentTime / (internalDuration || duration || 0)) * 100))
    : 0

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, sans-serif",
    lineHeight: '1em',
    height: height,
    color: color,
    userSelect: 'none',
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
    cursor: 'pointer',
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
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
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
        <audio
          ref={audioRef}
          src={source}
          preload={String(preload)}
          autoPlay={autoplay}
          onTimeUpdate={handleAudioTimeUpdate}
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
          onLoadedMetadata={handleAudioLoadedMetadata}
          style={{ display: 'none' }}
        />
        <div style={controlsStyle}>
          {skipBackSeconds !== undefined ? (
            <div style={controlStyle} onClick={() => handleSkip(-skipBackSeconds)} title={`Skip Back ${skipBackSeconds}s`}>
              <SkipBack seconds={skipBackSeconds} />
            </div>
          ) : (
            <div style={controlStyle} />
          )}
          <div style={controlStyle} onClick={handlePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Pause /> : <Play />}
          </div>
          {skipForwardSeconds !== undefined ? (
            <div style={controlStyle} onClick={() => handleSkip(skipForwardSeconds)} title={`Skip Forward ${skipForwardSeconds}s`}>
              <SkipForward seconds={skipForwardSeconds} />
            </div>
          ) : (
            <div style={controlStyle} />
          )}
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
          <span>
            {Number.isFinite(currentTime) && currentTime >= 0 && Number.isFinite(internalDuration || duration || 0) && (internalDuration || duration || 0) > 0
              ? formatTime(currentTime)
              : <span style={{ visibility: 'hidden' }}>0:00</span>}
          </span>
          <span>
            {Number.isFinite(internalDuration || duration || 0) && (internalDuration || duration || 0) > 0
              ? formatTime(internalDuration || duration || 0)
              : <span style={{ visibility: 'hidden' }}>0:00</span>}
          </span>
        </div>
        <div style={progressContainerStyle} onClick={handleProgressBarClick}>
          <div style={progressBarStyle}>
            <div style={progressFillStyle} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioCard
