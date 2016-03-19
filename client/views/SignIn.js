import React from 'react'
import _ from 'lodash'

const { func, object } = React.PropTypes

const SignIn = React.createClass({
  propTypes: {
    signIn: func.isRequired,
    database: object.isRequired,
    auth: object,
    authError: object
  },

  signInWithFacebook: function (database, signIn, e) {
    e.preventDefault()

    database.authWithOAuthPopup('facebook', signIn)
  },

  signInWithGoogle: function (database, signIn, e) {
    e.preventDefault()

    database.authWithOAuthPopup('google', signIn)
  },

  render: function () {
    const { signIn, database, auth, authError } = this.props

    if (auth) {
      return null
    }

    return this.renderSignIn(signIn, database, auth, authError)
  },

  renderSignIn: function (signIn, database, auth, authError) {
    return (
      <div className='sign-in__overlay'>
        <div className='sign-in'>
          <div className='container'>
            <div className='row'>
              <div className='col s12'>
                <h3>Sign in to Play</h3>
              </div>
              { this.renderAuthOption(
                signIn,
                'Sign-in with Google',
                'red darken-1 white-text',
                this.signInWithGoogle,
                database
              ) }
              { this.renderAuthOption(
                signIn,
                'Sign-in with Facebook',
                'indigo white-text',
                this.signInWithFacebook,
                database
              ) }
              <div className='col s12'>
                { this.renderAuthError(authError) }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  renderAuthOption: function (signIn, text, btnStyle, click, database) {
    const onClick = _.partial(click, database, signIn)

    return (
      <div className='col s12 m6'>
        <a
          className={ ['btn'].concat(btnStyle).join(' ') }
          href='#'
          onClick={ onClick }
          >
          { text }
        </a>
      </div>
    )
  },

  renderAuthError: function (err) {
    if (!err) {
      return null
    }

    return (
      <div>
        <hr />
        <span>
          <strong>{ err.name }: </strong>
          { err.message }
        </span>
      </div>
    )
  }
})

export default SignIn
