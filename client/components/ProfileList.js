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

  render: function () {
    const { profiles, profileId } = this.props

    return (
      <div className='row'>
        { this.renderProfiles(
          profiles,
          profileId
        ) }
      </div>
    )
  },

  renderProfiles: function (profiles, profileId) {
    return profiles.map((profile) => {
      return (
        <ProfileTile
          profile={ profile }
          isActive={ profile.id === profileId }
          updateProfile={ _.partial( updateProfile, profile ) }
          selectProfile={ _.partial( selectProfile, profile ) }
          removeProfile={ _.partial( removeProfile, profile ) }
          />
      )
    })
  }
})

export default ProfileList
