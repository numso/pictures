import { component } from 'omniscient-tools'

export default component('CreateTag', function ({ onClick }) {
  return (
    <div>
      <span onClick={this.props.onClick} className='tag --create'>
        {this.props.children}
      </span>
    </div>
  )
})
