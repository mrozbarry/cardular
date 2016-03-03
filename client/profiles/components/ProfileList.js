import React from 'react'
import Please from 'pleasejs'
import ReactMiniRouter from 'react-mini-router'
import _ from 'lodash'

const { array, func, string } = React.PropTypes

const ProfileList = React.createClass({
  propTypes: {
    profiles: array.isRequired,
    updateProfile: func.isRequired,
    selectProfile: func.isRequired,
    removeProfile: func.isRequired,
    profileId: string
  },

  profileCardStyle: function (profile) {
    const { colour } = profile
    return {
      backgroundColor: `rgb(${colour.r}, ${colour.g}, ${colour.b})`
    }
  },

  editProfile: function (profile, e) {
    this.props.updateProfile(Object.assign(
      {}, profile,
      { name: e.target.value }
    ))
  },

  useProfile: function (profile, e) {
    e.preventDefault()

    this.props.selectProfile(profile)

    ReactMiniRouter.navigate('/')
  },

  changeColour: function (profile, e) {
    e.preventDefault()

    this.props.updateProfile(Object.assign(
      {}, profile,
      { colour: Please.make_color({ format: 'rgb' })[0] }
    ))
  },

  removeProfile: function (profile, e) {
    e.preventDefault()

    this.props.removeProfile(profile)
  },

  render: function () {
    return (
      <div className='row'>
        { this.renderProfiles(this.props.profiles) }
      </div>
    )
  },

  renderProfiles: function (profiles) {
    return profiles.map((profile) => {
      const renderUse = () => {
        if (profile.id === this.props.profileId) {
          return (
            <i className='material-icons prefix'>done</i>
          )
        }

        return null
      }

      return (
        <div key={ profile.id } className='col l4 m6 s12' style={ { transition: 'all 0.3s ease-in-out' } }>
          <div className='card' style={ this.profileCardStyle(profile) }>
            <div className='card-content white-text'>
              <span className='card-title input-field'>
                { renderUse() }
                <input
                  type='text'
                  value={ profile.name }
                  onChange={ _.partial(this.editProfile, profile) }
                  />
              </span>
              <p>
                You have created 0 and played { profile.gameIdHistory.length } games with this profile.
              </p>
            </div>

            <div className='card-action'>
              <a href='/' onClick={ _.partial(this.useProfile, profile) } title='Select Profile'>
                <i className='material-icons'>perm_identity</i>
              </a>
              <a href='/profiles' onClick={ _.partial(this.changeColour, profile) } title='Change Profile Colour'>
                <i className='material-icons'>invert_colors</i>
              </a>
              <a href='/profiles' onClick={ _.partial(this.removeProfile, profile) } title='Delete Profile'>
                <i className='material-icons'>delete</i>
              </a>
            </div>
          </div>
        </div>
      )
    })
  }
})

export default ProfileList
