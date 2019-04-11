import * as React from 'react'

export interface Listenable {
  addEventListener: (eventName: string, listener: EventListener) => void
  removeEventListener: (eventName: string, listener: EventListener) => void
}

function useListener(
  element: React.RefObject<Listenable>,
  eventName: string,
  listener: EventListener
) {
  const savedListener = React.useRef<EventListener>()
  React.useEffect(() => {
    savedListener.current = listener
  }, [listener])

  React.useEffect(() => {
    const eventListener: EventListener = event =>
      savedListener.current && savedListener.current(event)
    if (element.current) {
      element.current.addEventListener(eventName, eventListener)
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener(eventName, eventListener)
      }
    }
  }, [eventName, element.current])
}

export function useListeners(
  element: React.RefObject<Listenable>,
  listeners: Record<string, EventListener>
) {
  Object.keys(listeners).forEach(eventName =>
    useListener(element, eventName, listeners[eventName])
  )
}
