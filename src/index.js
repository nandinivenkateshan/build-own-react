import React from 'react'
import ReactDOM from 'react-dom'

const container = document.getElementById('root')

// JSX
// const element = <h1 id="foo">Hello</h1>

// Babel converts JSX to React.createElement()
// const element = React.createElement('h1', { id: 'foo' }, 'Hello')

// React.creatElements() create object from it's argument with type and props as a properties
// const element = {
//   type: 'h1',
//   props: {
//     id: 'foo',
//     children: 'Hello'
//   }
// }

// render() where react changes the DOM
// ReactDOM.render(element, container)

// const node = document.createElement(element.type)
// node.id = element.props.id
// const text = document.createTextNode('')
// text.nodeValue = element.props.children
// node.appendChild(text)
// container.appendChild(node)

/* Step:1
createElement function
*/

// JSX
// const element = (
//   <div id='foo'>
//     <a>bar</a>
//     <b />
//   </div>
// )

// How Babel converts above JSX

// const element = React.createElements(
//   'div',
//   {
//     id: 'foo'
//   },
//   React.createElement('a', null, 'bar'),
//   React.createElement('b')
// )

// React.createElement() create an object from it's arguments

// function createElement (type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children
//     }
//   }
// }

function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  }
}

function createTextElement (text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

// creating the render()

function render (element, container) {
  const dom =
  element.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(element.type)

  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  element.props.children.forEach(child => render(child, dom))
  container.appendChild(dom)
}

const Didact = {
  createElement,
  render
}

// This comment helps Babel to use our own Didact.createElement to transpile Jsx
/** @jsx Didact.createElement */

const element = (
  <div id='foo'>
    <a>bar</a>
    <b />
  </div>
)

Didact.render(element, container)
