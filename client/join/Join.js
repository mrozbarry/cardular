import React from 'react'
import _ from 'lodash'

import CreateGame from './components/CreateGame'
import JoinGame from './components/JoinGame'

const { object, array, string } = React.PropTypes

const Join = React.createClass({
  propTypes: {
    database: object.isRequired,
    profiles: array.isRequired,
    profileId: string
  },

  getInitialState: function () {
    return {
      games: []
    }
  },

  emptyGame: function () {
    return this.props.database
      .child('games')
      .push()
  },

  createAdmin: function (gameId, profileId) {
    return this.props.database
      .child('admins')
      .push({
        profileId: profileId,
        gameId: gameId
      })
  },

  profileNameStyle: function (profile) {
    return {
      color: [
        'rgb(',
        [profile.colour.r, profile.colour.g, profile.colour.b].join(', '),
        ')'
      ].join('')
    }
  },

  render: function () {
    const { profiles, profileId } = this.props
    const { games } = this.state

    return (
      <div className='container'>
        { this.renderGreeting(profiles, profileId) }
        { this.renderActions(games, profiles, profileId) }
      </div>
    )
  },

  renderGreeting: function (profiles, profileId) {
    const profile = _.find(profiles, { id: profileId })

    if (!profile) {
      return (
        <div>
          <h1>Hello Stranger!</h1>
          <p>
            Looks like you're new here, so why don't you start by <a href='/profiles'>making a profile</a>!
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Hello <span style={ this.profileNameStyle(profile) }>{ profile.name }</span> <a href='/profiles' title='Edit or Change Profile'><i className='material-icons'>contacts</i></a></h1>
        </div>
      )
    }
  },

  renderActions: function (games, profiles, profileId) {
    const profile = _.find(profiles, { id: profileId })
    if (!profile) {
      return null
    }

    return (
      <div className='row'>
        <div className='col m12 l6'>
          <JoinGame
            games={ games }
            />
        </div>

        <div className='col m12 l6'>
          <CreateGame
            emptyGame={ this.emptyGame }
            createAdmin={ this.createAdmin }
            profile={ profile }
            />
        </div>
      </div>
    )
  }
})

export default Join
