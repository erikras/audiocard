import './story.css'
import { storiesOf, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import React from 'react'

addDecorator(withInfo)

const names = require
  .context('../examples', true, /.*\.tsx/)
  .keys()
  .map(filename => /\.\/(.+)\.tsx/.exec(filename)[1])

const docs = names.reduce((result, name) => {
  try {
    result[name] = require(`!!raw-loader!../examples/${name}.md`)
  } catch (e) {}
  return result
}, {})

const addInfo = story =>
  withInfo({
    inline: true,
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline'
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0
        },
        h2: {
          display: 'inline',
          color: '#999'
        }
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2'
      }
    }
  })(story)

const stories = storiesOf('Examples', module).addParameters({
  info: {
    inline: true,
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline'
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0
        },
        h2: {
          display: 'inline',
          color: '#999'
        }
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2'
      }
    }
  }
})
names.forEach(name => {
  stories.add(name, require(`../examples/${name}`).default, {
    info: {
      text:
        docs[name] &&
        `## Documentation
    
${docs[name]}`
    }
  })
})
