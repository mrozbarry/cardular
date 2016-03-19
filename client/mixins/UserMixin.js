const UserMixin = {
  getIdFromAuth: function (auth) {
    return auth.uid
  },

  getNameFromAuth: function (auth) {
    return auth[auth.provider].displayName ||
      'Unknown'
  },

  getPhotoFromAuth: function (auth) {
    return auth[auth.provider].profileImageURL ||
      'http://placehold.it/64x64'
  },

  getEmailFromAuth: function (auth) {
    return auth[auth.provider].email
  }
}

export default UserMixin
