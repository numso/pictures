import ReactDOM from 'react-dom'

window.require = name => {
  if (name === 'react-dom') return ReactDOM
  throw new Error('require is not actually defined')
}
