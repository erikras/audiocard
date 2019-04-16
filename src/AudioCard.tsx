import * as React from 'react'
import styled from 'styled-components'
import { Play, Pause, SkipBack, SkipForward } from './controls'
import { ProgressBar, Time } from './components'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { preventDefault } from './util'
import useDimensions from 'react-use-dimensions'

export interface AudioCardProps {
  /** Optional artwork for the song or podcast episode */
  art?: string
  /** Optional title of the song or podcast episode */
  title?: string
  /** URL of the MP3 file to play */
  source: string
  /**
   * Primary color for controls
   *
   * @default '#666'
   **/
  color?: string
  /** Background color for entire card */
  background?: string
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
   * Whether or not to preload the MP3 file.
   *
   * @default 'none'
   **/
  preload?: 'auto' | 'metadata' | 'none'
  /**
   * Optional number of seconds to skip forward when the "skip forward"
   * control is activated. If not provided, the "skip forward" button
   * will not be rendered.  */
  skipForwardSeconds?: number
  /**
   * Optional number of seconds to skip back when the "skip back"
   * control is activated. If not provided, the "skip back" button
   * will not be rendered. */
  skipBackSeconds?: number
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
}

const canonicalWidth = 750
const canonicalHeight = 225
const aspectRatio = canonicalWidth / canonicalHeight

/**
 * TODO: Every element needs to be sized with the size of the entire card.
 * With some sort of useSize() hook or something.
 */

export function AudioCard({
  art,
  title,
  source,
  color = '#666',
  background,
  progressBarBackground = '#ddd',
  progressBarCompleteBackground = '#aaa',
  preload = 'none',
  skipForwardSeconds,
  skipBackSeconds,
  link,
  linkText
}: AudioCardProps) {
  const {
    playerRef,
    playing,
    time,
    duration,
    play,
    pause,
    seek,
    skipForward,
    skipBack
  } = useAudioPlayer()
  const [ref, { width }] = useDimensions()
  const height = width / aspectRatio
  const h = (value: number) => (value * height) / canonicalHeight
  const w = (value: number) => (value * width) / canonicalWidth
  return (
    <Container
      ref={ref}
      background={background}
      color={color}
      style={{ height }}
    >
      <audio
        src={source}
        ref={playerRef}
        style={{ display: 'none' }}
        preload={preload}
      />
      {art && (
        <Art
          src={art}
          style={{ height, width: height, minHeight: height, minWidth: height }}
        />
      )}
      <Content>
        {title && (
          <Title
            style={{
              fontSize: h(24),
              width: w(canonicalWidth - (art ? canonicalHeight : 0) - 20),
              margin: `${h(12)}px ${w(10)}px ${h(12)}px ${w(10)}px`,
              minHeight: h(30)
            }}
          >
            {title}
          </Title>
        )}
        <Controls style={{ fontSize: h(16) }}>
          {skipBackSeconds === undefined ? (
            <Control as="div" />
          ) : (
            <Control onClick={preventDefault(() => skipBack(skipBackSeconds))}>
              <SkipBack seconds={skipBackSeconds} />
            </Control>
          )}
          {!playing && (
            <Control onClick={play}>
              <Play />
            </Control>
          )}
          {playing && (
            <Control onClick={pause}>
              <Pause />
            </Control>
          )}
          {skipForwardSeconds === undefined ? (
            <Control as="div" />
          ) : (
            <Control
              onClick={preventDefault(() => skipForward(skipForwardSeconds))}
            >
              <SkipForward seconds={skipForwardSeconds} />
            </Control>
          )}
        </Controls>
        {link && linkText && <Link href={link}>{linkText}</Link>}
        <Times style={{ fontSize: h(16) }}>
          <Time value={time} />
          <Time value={duration} />
        </Times>
        <ProgressBar
          value={time}
          total={duration}
          color={color}
          background={progressBarBackground}
          completeBackground={progressBarCompleteBackground}
          seek={seek}
          size={h(20)}
        />
      </Content>
    </Container>
  )
}

interface ContainerProps {
  background?: string
  color: string
}
const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-flow: row nowrap;
  ${({ background }) => background && `background-color: ${background};`}
  color: ${({ color }) => color};
  a {
    color: ${({ color }) => color};
    text-decoration: none;
    &:active {
      color: ${({ color }) => color};
    }
  }
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
`

const Controls = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`

const Times = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 0 5px 5px 5px;
`

const Control = styled.a.attrs({ href: '#' })`
  text-decoration: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 5px;
  width: 15%;
`

const Art = styled.img``

const Title = styled.div`
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Link = styled.a.attrs({ target: '_blank' })`
  display: block;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`
