import * as React from 'react'
import styled from 'styled-components'
import { Play, Pause, SkipBack, SkipForward } from './controls'
import { ProgressBar, Time } from './components'
import { Square } from './layout'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { preventDefault } from './util'

export interface AudioCardProps {
  art?: string
  title?: string
  source: string
  color?: string
  background?: string
  progressBarBackground?: string
  progressBarCompleteBackground?: string
  preload?: 'auto' | 'metadata' | 'none'
  skipForwardSeconds?: number
  skipBackSeconds?: number
  link?: string
  linkText?: string
}

export function AudioCard({
  art,
  title,
  source,
  color = '#666',
  background,
  progressBarBackground = '#ddd',
  progressBarCompleteBackground = '#aaa',
  preload = 'auto',
  skipForwardSeconds = 30,
  skipBackSeconds = 10,
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
  return (
    <Container background={background} color={color}>
      <audio
        src={source}
        ref={playerRef}
        style={{ display: 'none' }}
        preload={preload}
      />
      {art && (
        <ArtContainer>
          <Art src={art} />
        </ArtContainer>
      )}
      <Content>
        {title && <Title>{title}</Title>}
        <Controls>
          <Control onClick={preventDefault(() => skipBack(skipBackSeconds))}>
            <SkipBack seconds={skipBackSeconds} />
          </Control>
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
          <Control
            onClick={preventDefault(() => skipForward(skipForwardSeconds))}
          >
            <SkipForward seconds={skipForwardSeconds} />
          </Control>
        </Controls>
        {link && linkText && <Link href={link}>{linkText}</Link>}
        <Times>
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
  padding: 1.5% 1.5% 0 1.5%;
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
  margin-bottom: 5px;
`

const Control = styled.a.attrs({ href: '#' })`
  text-decoration: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 5px 10px;
  width: 15%;
`

const ArtContainer = styled(Square)`
  width: 30%;
  min-width: 30%;
`

const Art = styled.img`
  width: 100%;
`

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin: 0.5rem 0;
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
