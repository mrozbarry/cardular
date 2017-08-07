import React from 'react'

import SideBar from '../components/SideBar'

import SubscribeMixin from '../mixins/SubscribeMixin'

const { object, string } = React.PropTypes

const Game = React.createClass({
  propTypes: {
    database: object.isRequired,
    gameId: string.isRequired,
    user: object
  },

  mixins: [
    SubscribeMixin
  ],

  getInitialState: function () {
    return {
      game: null,
      users: [],
      messages: [],
      playerPath: null
    }
  },

  onUserValue: function (userSnapshot) {
    const { users } = this.state
    const user = userSnapshot.val()

    const nextUsers = _.reject(users, { id: userSnapshot.key() })

    if (user) {
      this.setState({
        users: nextUsers.concat(user)
      })
    } else {
      this.setState({
        users: nextUsers
      })
    }
  },

  getPlayersOfGame: function (game) {
    if (!game || !game.players) {
      return []
    }

    return _.values(game.players)
  },

  onGameValue: function (gameSnapshot) {
    const { database, user } = this.props
    const oldGame = this.state.game
    const game = gameSnapshot.val()

    this.setState({
      game: game
    }, () => {
      const oldGamePlayers = this.getPlayersOfGame(oldGame)
      const newGamePlayers = this.getPlayersOfGame(game)

      const additionalPlayers = oldGame ?
        _.intersection([oldGamePlayers, newGamePlayers]) :
        newGamePlayers

      const removePlayers = _.difference(
        newGamePlayers,
        additionalPlayers
      )

      _.each(additionalPlayers, (player) => {
        if (!this.userSubscriptions[player.userId]) {
          const userRef = database.child(`/users/${ player.userId }`)
          this.userSubscriptions[player.userId] =
            this.subscribe(userRef, 'value', this.onUserValue)
        }
      })

      _.each(removePlayers, (player) => {
        const unsubscribeFromUser = this.userSubscriptions[player.userId]
        if (unsubscribeFromUser) {
          unsubscribeFromUser()
        }
      })
    })

  },

  onMessageAdded: function (messageSnapshot) {
    const { messages } = this.state
    const message = messageSnapshot.val()

    this.setState({
      messages: messages.concat(message)
    })
  },

  componentWillMount: function () {
    this.userSubscriptions = {}
  },

  componentDidMount: function () {
    const { database, gameId, user } = this.props

    const gameRef = database
      .child(`/games/${ gameId }`)

    this.subscribe(gameRef, 'value', this.onGameValue)

    const messagesRef = database
      .child(`/messages/${ gameId }`)

    this.subscribe(messagesRef, 'child_added', this.onMessageAdded)

    // Write user as a player
    const playerRef = gameRef.child('/players').push()
    const playerId = playerRef.key()
    playerRef
      .set(user.id)
      .then(() => {
        this.setState({
          playerPath: `/games/${ gameId }/players/${ playerId }`
        })
      })
      .catch((err) => {
        console.warn('--- FIREBASE ERROR ---')
        console.info(err)
        throw err
      })
  },

  componentWillUnmount: function () {
    const { database } = this.props
    const { playerPath } = this.state

    if (playerPath) {
      database
        .child(playerPath)
        .set(null)
    }
  },

  render: function () {
    const { game } = this.state

    if (!this.props.user || !game) {
      return this.renderLoading()
    }

    return (
      <div>
        Game { game ? game.name : '???' }

        <SideBar players={ this.state.players } />
      </div>
    )
  },

  renderLoading: function () {
    return (
      <div>
        <h5>Loading user data and game</h5>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Game
