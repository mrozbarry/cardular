import React from 'react'
import _ from 'lodash'

import PulloutProfile from '../components/PulloutProfile'
import EditProfile from '../components/EditProfile'

const { func, object, bool } = React.PropTypes

const ProfileIcon = React.createClass({
  propTypes: {
    signOut: func.isRequired,
    database: object.isRequired,
    isSignedIn: bool.isRequired,
    user: object
  },

  getInitialState: function () {
    return {
      showProfile: false,
      photoState: 'good'
    }
  },

  onProfile: function (e) {
    e.preventDefault()
    this.setState({ showProfile: true })
  },

  onCloseProfile: function (e) {
    e.preventDefault()
    this.setState({ showProfile: false })
  },

  updateAttribute: function (attr, value) {
    return this.props.database
      .child(`/users/${ this.props.user.id }/${ attr }`)
      .set(value)
  },

  onNameChange: function (e) {
    const input = e.target
    const name = input.value

    this.updateAttribute('name', name)
      .catch((err) => {
        input.setCustomValidity('There was an error:' + err)
      })
  },

  onPhotoChange: function (e) {
    const input = e.target
    const photoUrl = input.value

    if (this.image) {
      delete this.image
    }

    this.setState({
      photoState: 'loading'
    }, () => {
      this.image = new Image()
      this.image.src = photoUrl

      this.image.addEventListener('load', () => {
        this.updateAttribute('photoUrl', photoUrl)
          .then(() => {
            this.setState({ photoState: 'good' })
          })
      })

      this.image.addEventListener('error', () => {
        this.setState({ photoState: 'error' })
      })
    })
  },

  onUpdateColour: function (colour) {
    this.updateAttribute('colour', colour.rgb)
  },

  getRgbaStringOf: function (rgba) {
    return [
      'rgba(',
      [rgba.r, rgba.g, rgba.b, rgba.a].join(', '),
      ')'
    ].join('')
  },

  getStyle: function (user) {
    const rgbString = this.getRgbaStringOf(user.colour)

    return {
      boxShadow: `0 0 10px 5px ${ rgbString },
                  inset 0 0 10px 5px ${ rgbString }`
    }
  },

  render: function () {
    const { signOut, isSignedIn, user } = this.props

    if (!isSignedIn || !user) {
      return null
    }

    return (
      <div>

        <PulloutProfile
          onProfile={ this.onProfile }
          signOut={ this.props.signOut }
          getStyle={ this.getStyle }
          user={ user }
          />

        { this.renderEditProfile() }

      </div>
    )
  },

  renderEditProfile: function () {
    if (!this.state.showProfile) {
      return null
    }

    return (
      <EditProfile
        onCloseProfile={ this.onCloseProfile }
        updateAttribute={ this.updateAttribute }
        getStyle={ this.getStyle }
        user={ this.props.user }
        />
    )
  }
})

export default ProfileIcon
