import React from 'react'

const JoinGame = React.createClass({
  getInitialState: function () {
    return {
      gameId: ''
    }
  },

  onGameIdChange: function (e) {
    this.setState({
      gameId: e.target.value
    })
  },

  joinGame: function (e) {
    e.preventDefault()
    console.log('STUB: Join game')
  },

  render: function () {
    return (
      <div className='card'>
        <div className='card-content'>
          <span className='card-title'>Join a Game</span>
          <p>
            Join a pre-existing game.  If the game does not exist, you will be bumped back to this screen.
          </p>
          <div className='row'>
            <div className='col s12 m3'>
              <h5>
                Game ID
              </h5>
            </div>
            <div className='col s12 m9'>
              <input
                type='text'
                placeholder='-JRHTHaIs-jNPLXOQivY'
                value={ this.state.gameId }
                onChange={ this.onGameIdChange }
                />
            </div>
          </div>
        </div>
        <div className='card-action'>
          <a href='#' onClick={ this.joinGame }>Join Game</a>
        </div>
      </div>
    )
  }
})

export default JoinGame
