import React from 'react'
import Card from './Card'
import _ from 'lodash'

const { object, array, func } = React.PropTypes

export default React.createClass({
  propTypes: {
    cards: array.isRequired,
    players: array.isRequired,
    interactions: array.isRequired
  },

  render: function () {
    const { cards, players, interactions } = this.props

    return (
      <svg
        width='900px'
        height='900px'
        className='board'
        viewBox='0 0 1920 900'
        >
        <g>
          { this.renderCards(cards, players, interactions) }
        </g>
        <g>
          <text>TODO: Cards in hand</text>
        </g>
        <g>
          <text>TODO: Cards somewhere</text>
        </g>
      </svg>
    )
  },

  renderCards: function (cards, players, interactions) {
    return cards.map((card, idx) => {
      const interaction = _.find(interactions, { cardUuid: card.uuid })
      return (
        <Card
          key={ card.uuid }
          heldBy={
            interaction
              ? _.find(players, { id: interaction.playerUuid })
              : undefined
          }
          card={ card }
          />
      )
    })
  }
})
