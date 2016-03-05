import React from 'react'
import _ from 'lodash'

const { func, object } = React.PropTypes

const SignIn = React.createClass({
  propTypes: {
    signIn: func.isRequired,
    database: object.isRequired,
    auth: object,
    authError: object // { name: 'Error', message: 'The thing youdid wrong'}
  },

  signInAnonymously: function (database, signIn, e) {
    e.preventDefault()

    database.authAnonymously(signIn, {
      remember: 'sessionOnly'
    })
  },

  render: function () {
    const { signIn, database, auth, authError } = this.props

    if (auth) {
      return null
    }

    return (
      <div>
        <a className='btn' href='#' onClick={ _.partial(this.signInAnonymously, database, signIn) }>Sign In Anonymously</a>
        { this.renderAuthError(authError) }
      </div>
    )
  },

  renderAuthError: function (err) {
    if (!err) {
      return null
    }

    return (
      <span>
        <strong>{ err.name }: </strong>
        { err.message }
      </span>
    )
  }
})

export default SignIn
