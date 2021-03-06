require('./styles/index')

import React from 'react'
import ReactMiniRouter from 'react-mini-router'
import Firebase from 'firebase'
import _ from 'lodash'
import Please from 'pleasejs'

import SubscribeMixin from 'mixins/SubscribeMixin.js'
import UserMixin from 'mixins/UserMixin'

import Home from 'views/Home'
import ProfileIcon from 'views/ProfileIcon'
import Game from 'views/Game'
import Admin from 'views/Admin'
import SignIn from 'views/SignIn'

const { object } = React.PropTypes

export default React.createClass({
  propTypes: {
    config: object.isRequired
  },

  mixins: [
    ReactMiniRouter.RouterMixin,
    SubscribeMixin,
    UserMixin
  ],

  routes: {
    '': 'renderHome',
    '/': 'renderHome',
    '/games/:id': 'renderGame',
    '/games/:id/admin': 'renderAdmin'
  },

  getInitialState: function () {
    return {
      auth: null,
      authError: null,
      user: null
    }
  },

  onUserValue: function (auth, userSnapshot) {
    const user = userSnapshot.val()

    if (!user) {
      const newUser = {
        id: userSnapshot.key(),
        name: this.getNameFromAuth(auth),
        photoUrl: this.getPhotoFromAuth(auth),
        colour: Object.assign({}, Please.make_color({format: 'rgb'})[0], { a: 1 })
      }
      userSnapshot.ref().set(newUser).catch((err) => {
        console.log('------------- ERROR', err)
      })
    } else {
      this.setState({ user: user })
    }
  },

  onAuth: function (auth) {
    this.setState({ auth: auth, user: null }, () => {
      if (auth) {
        const id = this.getIdFromAuth(auth)
        const callback = _.partial(this.onUserValue, auth)
        this.subscribe(
          this.database.child(`/users/${ id }`),
          'value',
          callback
        )
      } else {
        this.unsubscribeAll()
      }
    })
  },

  signIn: function (err, auth) {
    if (err) {
      this.setState({ auth: null, authError: err })
    }
  },

  signOut: function () {
    this.database.unauth()
  },

  componentWillMount: function () {
    this.database = new Firebase([
      'https://',
      this.props.config.firebase,
      '.firebaseio.com'
    ].join(''))

    this.database.onAuth(this.onAuth)
  },


  renderHome: function () {
    const { auth, user } = this.state

    if (user === null) {
      return null
    }

    return (
      <Home
        database={ this.database }
        isSignedIn={ auth !== null }
        user={ user }
        />
    )
  },

  renderGame: function (gameId) {
    const { user } = this.state

    if (!user) {
      return null
    }

    return (
      <Game
        database={ this.database }
        gameId={ gameId }
        user={ user }
        />
    )
  },

  renderAdmin: function (gameId) {
    return (
      <Admin
        database={ this.database }
        gameId={ gameId }
        />
    )
  },

  renderSignInOverlay: function () {
    const { auth, authError } = this.state

    return (
      <SignIn
        signIn={ this.signIn }
        database={ this.database }
        auth={ auth }
        authError={ authError }
        />
    )
  },

  renderProfileIcon: function () {
    const { auth, user } = this.state

    return (
      <ProfileIcon
        signOut={ this.signOut }
        database={ this.database }
        isSignedIn={ auth !== null }
        user={ user }
        />
    )
  },

  notFound: function (path) {
    console.warn('404 not found', path)

    return this.renderJoin()
  },

  render: function () {
    return (
      <div>
        { this.renderCurrentRoute() }
        { this.renderSignInOverlay() }
        { this.renderProfileIcon() }
      </div>
    )
  }
})
