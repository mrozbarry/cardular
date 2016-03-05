import React from 'react'

const { bool } = React.PropTypes

const ContextMenu = React.createClass({
  propTypes: {
    show: bool.isRequired
  },

  getClassName: function () {
    if (this.props.show) {
      return 'context-menu up'
    }

    return 'context-menu'
  },

  render: function () {
    return (
      <ul className={ this.getClassName() }>
        <li className='heading'>King of Spades</li>
        <li className='sub-heading'>Move card to</li>
        <li>
          <select>
            <option>The Board</option>
            <option>My Hand</option>
            <option>Stack</option>
          </select>
        </li>
        <li>Lock card</li>
        <li className='sub-heading'>Stack</li>
        <li>Create Stack (Facing Down)</li>
        <li>Create Stack (Facing Up)</li>
        <li>Shuffle Stack</li>
        <li>Cut Stack</li>
      </ul>
    )
  }
})

export default ContextMenu
