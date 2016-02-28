import React from 'react'

import ProfileList from './components/ProfileList'

const { object, array, func, string } = React.PropTypes

const Join = React.createClass({
  propTypes: {
    database: object.isRequired,
    profiles: array.isRequired,
    addProfile: func.isRequired,
    updateProfile: func.isRequired,
    selectProfile: func.isRequired,
    removeProfile: func.isRequired,
    profileId: string
  },

  getInitialState: function () {
    return {
      games: []
    }
  },

  render: function () {
    // const { games } = this.state

    return (
      <div className='container'>
        <ProfileList
          profiles={ this.props.profiles }
          profileId={ this.props.profileId }
          addProfile={ this.props.addProfile }
          updateProfile={ this.props.updateProfile }
          selectProfile={ this.props.selectProfile }
          removeProfile={ this.props.removeProfile }
          />
        <div>Join game in list</div>
        <div>Join game with direct id</div>
      </div>
    )
  }
})

export default Join
