import React from 'react'

const { func, object } = React.PropTypes

const PulloutProfile = React.createClass({
  propTypes: {
    onProfile: func.isRequired,
    signOut: func.isRequired,
    getStyle: func.isRequired,
    user: object
  },

  onSignOut: function (signOut, e) {
    e.preventDefault()
    this.props.signOut()
  },

  render: function () {
    const { user } = this.props

    return (
      <div className='profile-mini'>
        <img className='profile-mini__profile-pic' style={ this.props.getStyle(user) } src={ user.photoUrl } />
        <span className='profile-mini__name truncate'>
          { user.name }
        </span>
        <div className='profile-mini__actions'>
          <a href='#' className='btn-flat' onClick={ this.props.onProfile }>
            Profile
          </a>
          <a href='#' className='btn-flat' onClick={ this.onSignOut }>
            Log Out
          </a>
        </div>
      </div>
    )
  }
})

export default PulloutProfile
