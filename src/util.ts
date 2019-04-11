export function preventDefault(fn: () => void) {
  return (event: React.SyntheticEvent<any>) => {
    event.preventDefault()
    fn()
  }
}
