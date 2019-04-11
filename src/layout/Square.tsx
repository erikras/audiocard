import * as React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  children: JSX.Element
}
export function Square({ className, children }: Props) {
  return (
    <Container className={className}>
      <InnerContainer>
        <Content>{children}</Content>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div``
const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`
const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
