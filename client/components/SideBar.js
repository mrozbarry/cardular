import React from 'react'

const { array } = React.PropTypes

const SideBar = React.createClass({
  propTypes: {
    players: array.isRequired
  },

  render: function () {
    return (
      <div className='side-bar'>
      </div>
    )
  }
})

export default SideBar
