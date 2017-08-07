import React from 'react'
import Firebase from 'firebase'

import SubscribeMixin from 'mixins/SubscribeMixin'

import CreateGame from 'components/CreateGame'
import JoinGame from 'components/JoinGame'

const { object, bool } = React.PropTypes

const Home = React.createClass({
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
      recentGames: [],
      adminGames: [],
      otherUsers: []
    }
  },

  createGame: function () {
    const { user } = this.props

    const ref = this.props.database
      .child('games')
      .push()

    const game = {
      id: ref.key(),
      userId: user.id,
      name: `${user.name}'s Game`,
      createdAt: (new Date()).toISOString()
    }

    return ref.set(game).then(() => {
      return game
    })
  },

  onUserValue: function (userSnapshot) {
    const { otherUsers } = this.state

    const userId = userSnapshot.key()
    const userVal = userSnapshot.val()

    this.setState({
      otherUsers: _.reject(otherUsers, { id: userId }).concat(userVal)
    })
  },

  subscribeToUserFromPlayer: function (userId) {
    const user = _.find(this.state.otherUsers, { id: userId })

    if (user) {
      return
    }

    this.subscribe(
      this.props.database.child(`/users/${ userId }`),
      'value',
      this.onUserValue
    )
  },

  onRecentGameAdded: function (gameSnapshot) {
    const { recentGames } = this.state
    const game = gameSnapshot.val()

    _.each(game.players, (userId) => {
      this.subscribeToUserFromPlayer(userId)
    })

    this.setState({
      recentGames: [game].concat(recentGames)
    })
  },

  onRecentGameRemoved: function (gameSnapshot) {
    const { recentGames } = this.state
    const gameId = gameSnpashot.key()

    this.setState({
      recentGames: _.reject(recentGames, { id: gameId })
    })
  },

  onAdminGameAdded: function (gameSnapshot) {
    const { adminGames } = this.state
    const game = gameSnapshot.val()

    this.setState({
      adminGames: [game].concat(adminGames)
    })
  },

  componentDidMount: function () {
    const { database, user } = this.props

    const gamesRef = database
      .child('/games')

    const recentGamesQuery = gamesRef
      .orderByChild('createdAt')
      .limitToFirst(20)

    this.subscribe(recentGamesQuery, 'child_added', this.onRecentGameAdded)
    this.subscribe(recentGamesQuery, 'child_removed', this.onRecentGameRemoved)

    console.log('Loading my games', user)

    this.subscribe(
      gamesRef.orderByChild('userId').equalTo(user.id),
      'child_added',
      this.onAdminGameAdded
    )
  },

  render: function () {
    const { recentGames, adminGames } = this.state
    const { isSignedIn } = this.props

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
        <div className='row'>
          <div className='col m12 l6'>
            <JoinGame
              isSignedIn={ isSignedIn }
              />
            { this.renderCollection(recentGames) }
          </div>

          <div className='col m12 l6'>
            <CreateGame
              createGame={ this.createGame }
              createAdmin={ this.createAdmin }
              isSignedIn={ isSignedIn }
              />
            { this.renderCollection(adminGames) }
          </div>
        </div>
      </div>
    )
  },

  renderCollection: function (collection) {
    if (collection.length === 0) {
      return null
    }

    return (
      <ul className='collection'>
        { this.mapGames(collection) }
      </ul>
    )
  },

  mapGames: function (collection) {
    console.log(_.map(collection, 'id'))
    return collection.map((game, idx) => {
      console.info(game.id)

      return (
        <li key={ game.id } className='collection-item'>
          <a href={ `#!/games/${ game.id }` }>
            { game.name }
          </a>
          &nbsp;

          { this.renderPlayerCollection(_.values(game.players)) }

          { this.renderAdmin(game) }

        </li>
      )
    })
  },

  renderPlayerCollection: function (players) {

    return _.map(_.uniq(players), (userId) => {
      const user = _.find(this.state.otherUsers, { id: userId })

      const source = user ? user.photoUrl : 'http://placehold.it/16x16'

      return (
        <img
          key={ userId }
          src={ source }
          className='circle'
          style={ {
            marginRight: '-8px',
            width: '16px',
            height: '16px'
          } }
          />
      )
    })
  },

  renderAdmin: function (game) {
    const isGameOwner = game.userId === this.props.user.id

    if (!isGameOwner) {
      return null
    }

    return (
      <a href={ `#!/games/${ game.id }/admin` } className='secondary-content'>
        Admin
      </a>
    )
  }
})

export default Home
