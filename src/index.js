import React from 'react'
import ReactDOM from 'react-dom'

const container = document.getElementById('root')

// const element = <h1 id="foo">Hello</h1>
// const element = React.createElement('h1', { id: 'foo' }, 'Hello')
const element = {
  type: 'h1',
  props: {
    id: 'foo',
    children: 'Hello'
  }
}

// ReactDOM.render(element, container)
const node = document.createElement(element.type)
node.id = element.props.id
const text = document.createTextNode('')
text.nodeValue = element.props.children
node.appendChild(text)
container.appendChild(node)
