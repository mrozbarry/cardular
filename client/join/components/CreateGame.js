import React from 'react'
import ReactMiniRouter from 'react-mini-router'

import { newGame } from 'modules/GameModule'

const { func, object } = React.PropTypes

const CreateGame = React.createClass({
  propTypes: {
    emptyGame: func.isRequired,
    createAdmin: func.isRequired,
    profile: object.isRequired
  },

  createGame: function (e) {
    e.preventDefault()

    const { profile } = this.props

    const ref = this.props.emptyGame()
    const id = ref.key()

    const game = newGame(id, profile)
    ref.set(game).then(() => {
      this.props.createAdmin(id, profile.id)
    })

    setTimeout(() => {
      ReactMiniRouter.navigate(`/games/${ id }/admin`)
    }, 1)
  },

  render: function () {
    return (
      <div className='card'>
        <div className='card-content'>
          <span className='card-title'>Create a Game</span>
          <p>
            Creating a game will send you to the administration page, where you can import sets,
            and manage your game/players.  You can join your own game from your administration page,
            or by selecting the game in the Join Game panel in a new tab/window.
          </p>
        </div>
        <div className='card-action'>
          <a href='#' onClick={ this.createGame }>Create custom game</a>
        </div>
      </div>
    )
  }
})

export default CreateGame
