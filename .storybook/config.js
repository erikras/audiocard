import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    title: 'CAT',
    name: '⏯️ AudioCard',
    showPanel: false,
    isToolshown: false,
    githubLink: 'https://www.google.com'
  }
})

function loadStories() {
  require('./example.stories')
}

configure(loadStories, module)
