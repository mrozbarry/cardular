import React from 'react'
import Please from 'pleasejs'

const { object, array, func, bool } = React.PropTypes

const ProfileTile = React.createClass({
  propTypes: {
    profile: object.isRequired,
    updateProfile: func.isRequired,
    selectProfile: func.isRequired,
    removeProfile: func.isRequired,
    isActive: bool.isRequired
  },

  profileCardStyle: function (profile) {
    const { colour } = profile
    return {
      backgroundColor: `rgb(${colour.r}, ${colour.g}, ${colour.b})`
    }
  },

  composeChangeColour: function (updateProfile) {
    return (profile, e) => {
      const newColour = Please.make_color({ format: 'rgb' })[0]
      updateProfile(
        Object.assign({}, profile, { colour: newColour }),
        e
      )
    }
  },

  composeEditName: function (updateProfile) {
    return (profile, e) => {
      updateProfile(
        Object.assign({}, profile, { name: e.target.value }),
        e
      )
    }
  },

  render: function () {
    const { profile, updateProfile, selectProfile, removeProfile, isActive } = this.props

    const editName = this.composeEditName(updateProfile)
    const changeColour = this.composeChangeColour(updateProfile)

    return (
      <div key={ profile.id } className='col l4 m6 s12' style={ { transition: 'all 0.3s ease-in-out' } }>
        <div className='card' style={ this.profileCardStyle(profile) }>
          <div className='card-content white-text'>
            <span className='card-title input-field'>
              { this.renderUse(profile, profileId) }
              <input
                type='text'
                value={ profile.name }
                onChange={ editName }
                />
            </span>
            <p>
              You have created 0 and played { profile.gameIdHistory.length } games with this profile.
            </p>
          </div>

          <div className='card-action'>
            <a href='/' onClick={ selectProfile } title='Select Profile'>
              <i className='material-icons'>perm_identity</i>
            </a>
            <a href='/profiles' onClick={ changeColour } title='Change Profile Colour'>
              <i className='material-icons'>invert_colors</i>
            </a>
            <a href='/profiles' onClick={ removeProfile } title='Delete Profile'>
              <i className='material-icons'>delete</i>
            </a>
          </div>
        </div>
      </div>
    )
  },

  renderUse: function (profile, profileId) {
    if (profile.id === profileId) {
      return (
        <i className='material-icons prefix'>done</i>
      )
    }

    return null
  }
})

export default ProfileTile
