import React from 'react'

import SubscribeMixin from 'mixins/SubscribeMixin'

import CreateGame from 'components/CreateGame'
import JoinGame from 'components/JoinGame'

const { object, bool } = React.PropTypes

const Join = React.createClass({
  propTypes: {
    database: object.isRequired,
    isSignedIn: bool.isRequired,
    user: object
  },

  mixins: [
    SubscribeMixin
  ],

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

  componentWillMount: function () {
    const { database } = this.props
  },

  componentWillUnmount: function () {
  },

  render: function () {
    const { isSignedIn } = this.props
    const { games } = this.state

    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <h1>Welcome to Cardular</h1>
            <p>
              Feel free to join or create a server
            </p>
          </div>
        </div>
        { this.renderActions(games, isSignedIn) }
      </div>
    )
  },

  renderActions: function (games, isSignedIn) {
    return (
      <div className='row'>
        <div className='col m12 l6'>
          <JoinGame
            games={ games }
            isSignedIn={ isSignedIn }
            />
        </div>

        <div className='col m12 l6'>
          <CreateGame
            emptyGame={ this.emptyGame }
            createAdmin={ this.createAdmin }
            isSignedIn={ isSignedIn }
            />
        </div>
      </div>
    )
  }
})

export default Join
