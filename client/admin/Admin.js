import React from 'react'
import Router from 'react-mini-router'

export default React.createClass({
  mixins: [
    Router.Mixin
  ],

  routes: {
    '/admin': 'admin'
  },


  admin: function () {
    return (
      <div>
        <ol>
          <li><a href="/admin/players"></a></li>
          <li><a href="/admin/decks"></a></li>
          <li><a href="/admin/board"></a></li>
        </ol>
      </div>
    )
  },


  notFound: function (path) {
    return (
      <div>
        <h1>404</h1>
        Well that sucks.  What about trying to <a href="/admin">go here</a>.
      </div>
    )
  },


  render: function () {
    return (
      <div>
        { this.currentRoute() }
      </div>
    )
  }
})
