import React from 'react'
import _ from 'lodash'

import ProfileTile from './ProfileTile'

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
    const { profiles, updateProfile, selectProfile, removeProfile, profileId } = this.props

    return (
      <div className='row'>
        { this.renderProfiles(
          profiles,
          profileId,
          updateProfile,
          selectProfile,
          removeProfile
        ) }
      </div>
    )
  },

  renderProfiles: function (profiles, profileId, updateProfile, selectProfile, removeProfile) {
    return profiles.map((profile) => {
      return (
        <ProfileTile
          profile={ profile }
          isActive={ profile.id === profileId }
          updateProfile={ _.partial(updateProfile, profile) }
          selectProfile={ _.partial(selectProfile, profile) }
          removeProfile={ _.partial(removeProfile, profile) }
          />
      )
    })
  }
})

export default ProfileList
