require('./styles/index.css')

import React from 'react'
import ReactMiniRouter from 'react-mini-router'
import Firebase from 'firebase'
import uuid from 'uuid'
import Please from 'pleasejs'
import _ from 'lodash'

import Join from '../join/Join'
import Profiles from '../profiles/Profiles'
// import Game from '../game/Game'
import Admin from '../admin/Admin'

const { object } = React.PropTypes

export default React.createClass({
  propTypes: {
    config: object.isRequired
  },

  mixins: [
    ReactMiniRouter.RouterMixin
  ],

  routes: {
    '': 'renderJoin',
    '/': 'renderJoin',
    '/profiles': 'renderProfiles',
    '/games/:id': 'renderGame',
    '/games/:id/admin': 'renderAdmin'
  },

  getInitialState: function () {
    const profiles = JSON.parse(window.localStorage.cardularProfiles || '[]')
    const profileId = window.localStorage.cardularProfileId || null

    return {
      profiles: profiles,
      profileId: profileId
    }
  },

  componentWillMount: function () {
    this.database = new Firebase([
      'https://',
      this.props.config.firebase,
      '.firebaseio.com'
    ].join(''))
  },

  addProfile: function () {
    const id = uuid.v4()
    this.setState({
      profiles: this.state.profiles.concat({
        id: id,
        name: `Profile ${ id }`,
        colour: Please.make_color({ format: 'rgb' })[0],
        gameIdHistory: []
      })
    }, this.syncProfiles)
  },

  updateProfile: function (newProfile) {
    this.setState({
      profiles: this.state.profiles.map((profile) => {
        if (newProfile.id === profile.id) {
          return newProfile
        }

        return profile
      })
    }, this.syncProfiles)
  },

  selectProfile: function (profile) {
    this.setState({
      profileId: profile.id || null
    }, this.syncProfiles)
  },

  removeProfile: function (profile) {
    if (window.confirm('Are you sure you want to delete this profile?\nThis will also orphan all the games you have created, and remove all your game history!')) {
      this.setState({
        profiles: _.reject(this.state.profiles, (oldProfile) => {
          return oldProfile.id === profile.id
        })
      }, this.syncProfiles)
    }
  },

  syncProfiles: function (profiles, profileId) {
    profiles = profiles || this.state.profiles
    profileId = profileId || this.state.profileId
    window.localStorage.cardularProfiles = JSON.stringify(this.state.profiles)
    window.localStorage.cardularProfileId = profileId
  },

  renderJoin: function () {
    return (
      <Join
        database={ this.database }
        profiles={ this.state.profiles }
        profileId={ this.state.profileId }
        />
    )
  },

  renderProfiles: function () {
    return (
      <Profiles
        database={ this.database }
        profiles={ this.state.profiles }
        profileId={ this.state.profileId }
        addProfile={ this.addProfile }
        updateProfile={ this.updateProfile }
        selectProfile={ this.selectProfile }
        removeProfile={ this.removeProfile }
        />
    )
  },

  renderGame: function (gameId) {
    return (
      <div>TODO: Show a Game</div>
    )
  },

  renderAdmin: function (gameId) {
    const profile = _.find(this.state.profiles, {
      id: this.state.profileId
    })

    if (!profile) {
      return (
        <div>Cannot render admin without an associated profile!</div>
      )
    }

    return (
      <Admin
        database={ this.database }
        gameId={ gameId }
        profile={ profile }
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
      </div>
    )
  }
})
