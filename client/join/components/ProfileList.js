import React from 'react'
import Please from 'pleasejs'

const { array, func, string } = React.PropTypes

const ProfileList = React.createClass({
  propTypes: {
    profiles: array.isRequired,
    addProfile: func.isRequired,
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

  addProfile: function (e) {
    e.preventDefault()
    this.props.addProfile()
  },

  render: function () {
    return (
      <div className='row'>
        <div className='col s12'>
          <a
            className='btn-large'
            href='#addProfile'
            onClick={ this.addProfile }>Add Profile</a>
        </div>
        { this.renderProfiles(this.props.profiles) }
      </div>
    )
  },

  renderProfiles: function (profiles) {
    return profiles.map((profile) => {
      const editProfile = (e) => {
        this.props.updateProfile(Object.assign(
          {}, profile,
          { name: e.target.value }
        ))
      }

      const useProfile = () => {
        this.props.selectProfile(profile)
      }

      const changeColour = () => {
        this.props.updateProfile(Object.assign(
          {}, profile,
          { colour: Please.make_color({ format: 'rgb' })[0] }
        ))
      }

      const removeProfile = () => {
        this.props.removeProfile(profile)
      }

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
                  onChange={ editProfile }
                  />
              </span>
              <p>
                You have created 0 and played { profile.gameIdHistory.length } games with this profile.
              </p>
            </div>
            <div className='card-action'>
              <a href='#' onClick={ useProfile }><i className='material-icons'>person_pin</i></a>
              <a href='#' onClick={ changeColour }><i className='material-icons'>invert_colors</i></a>
              <a href='#' onClick={ removeProfile }><i className='material-icons'>delete</i></a>
            </div>
          </div>
        </div>
      )
    })
  }
})

export default ProfileList
