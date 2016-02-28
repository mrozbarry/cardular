import React from 'react'
import ReactMiniRouter from 'react-mini-router'
import uuid from 'uuid'
import Please from 'pleasejs'
import _ from 'lodash'

import Join from '../join/Join'
// import Game from '../game/Game'
// import Admin from '../admin/Admin'

const { object } = React.PropTypes

export default React.createClass({
  propTypes: {
    database: object.isRequired
  },

  mixins: [
    ReactMiniRouter.RouterMixin
  ],

  getInitialState: function () {
    const profiles = JSON.parse(window.localStorage.cardularProfiles || '[]')
    return {
      profiles: profiles instanceof Array ? profiles : [],
      profileId: profiles instanceof Array ? profiles[0].id : null
    }
  },

  routes: {
    '': 'renderJoin',
    '/game/:id': 'renderGame',
    '/admin/game/:id': 'renderAdmin'
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

  syncProfiles: function (profiles) {
    profiles = profiles || this.state.profiles
    window.localStorage.cardularProfiles = JSON.stringify(this.state.profiles)
    console.log('cardularProfiles =', window.localStorage.cardularProfiles)
  },

  renderJoin: function () {
    return (
      <Join
        database={ this.props.database }
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
    return (
      <div>TODO: Admin Game</div>
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
