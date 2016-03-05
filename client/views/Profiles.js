import React from 'react'

import ProfileList from 'components/ProfileList'

const { object, array, func, string } = React.PropTypes

const Profiles = React.createClass({
  propTypes: {
    database: object.isRequired,
    profiles: array.isRequired,
    addProfile: func.isRequired,
    updateProfile: func.isRequired,
    selectProfile: func.isRequired,
    removeProfile: func.isRequired,
    profileId: string
  },

  addProfile: function (e) {
    e.preventDefault()
    this.props.addProfile()
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

    if (window.confirm('Are you sure you want to remove this profile?\nThis will also make lose admin access to any of your games!')) {
      this.props.removeProfile(profile)
    }
  },


  render: function () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s6'>
            <a className='waves-effect waves-teal btn-flat' href='/'>Back</a>
          </div>
          <div className='col s6 right-align'>
            <a className='waves-effect waves-teal btn-large' onClick={ this.addProfile }>Add Profile</a>
          </div>
        </div>
        <hr />
        <ProfileList
          profiles={ this.props.profiles }
          profileId={ this.props.profileId }
          updateProfile={ this.props.updateProfile }
          selectProfile={ this.props.selectProfile }
          removeProfile={ this.props.removeProfile }
          />
      </div>
    )
  }
})

export default Profiles
