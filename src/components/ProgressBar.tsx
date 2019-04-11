import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
  total: number | void
  value: number
  color: string
  background: string
  completeBackground: string
  seek: (value: number) => void
}

export const ProgressBar = ({
  background,
  completeBackground,
  color,
  seek,
  total,
  value
}: Props) => {
  const element = React.useRef<HTMLDivElement>(null)

  return (
    <Container ref={element} color={background}>
      <Progress
        value={value}
        max={total || 0}
        background={background}
        completeBackground={completeBackground}
      />
      <Slider
        value={value}
        max={total || 0}
        color={color}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          seek(Number(event.target.value))
        }
      />
    </Container>
  )
}

interface ContainerProps {
  color: string
}
const Container = styled.div<ContainerProps>`
  position: relative;
  height: 20px;
`

const fullWidth = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

interface ProgressProps {
  background: string
  completeBackground: string
}
const progressStyles = ({ completeBackground }: ProgressProps) => css`
  background-color: ${completeBackground};
`
const Progress = styled.progress<ProgressProps>`
  ${fullWidth}
  background-color: ${props => props.background};
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.3);
  &[value]::-webkit-progress-value {
    ${progressStyles}
  }
  &[value]::-moz-progress-value {
    ${progressStyles}
  }
  &[value]::-webkit-progress-bar {
    background-color: ${props => props.background};
  }
`

interface SliderProps {
  color: string
}
const thumbStyles = ({ color }: SliderProps) => css`
  background-color: ${color};
  height: 20px;
  width: 10px;
  appearance: none;
  cursor: grab;
`
const rangeStyles = css`
  ${fullWidth}
  background-color: transparent;
  border: 0;
  margin: 0;
  appearance: none;
`
const Slider = styled.input.attrs({ type: 'range' })<SliderProps>`
  &:focus {
    outline: none;
  }
  ${rangeStyles}
  &[value]::-moz-range-track {
    ${rangeStyles}
  }
  &[value]::-webkit-slider-thumb {
    ${thumbStyles}
  }
  &[value]::-moz-slider-thumb {
    ${thumbStyles}
  }
`
