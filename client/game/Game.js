import React from 'react'
import SetLoaderMixin from './mixins/SetLoaderMixin'
import Board from './components/Board'
import ContextMenu from './components/ContextMenu'
import uuid from 'uuid'
import _ from 'lodash'

import CardMixin from './mixins/CardMixin'

const { array, object } = React.PropTypes

export default React.createClass({
  propTypes: {
    sets: array.isRequired,
    database: object.isRequired
  },

  mixins: [
    SetLoaderMixin,
    CardMixin
  ],

  getInitialState: function () {
    return {
      sets: [],
      cards: [],
      stacks: [],
      interactions: [],
      players: [],
      me: {
        uuid: null
      }
    }
  },

  componentDidMount: function () {
    this.loadSet('/assets/sets/standard52', (set) => {
      const cards = _.reduce(['c', 's', 'h', 'd'], (cards, suit, suitIdx) => {
        return cards.concat(_.map(['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'], (card, cardIdx) => {
          const cardNumber = (suitIdx * 13) + cardIdx
          const cardName = [suit, card].join('')
          return this.newCard(set, 'standard52', cardName, { x: 0, y: 0 })
        }))
      }, [])
      const startStack = this.newStack('Initial Deck', { x: 50, y: 600 }, cards)
      this.setState({ stacks: [startStack] })
    })

    this.initializePlayer()
  },

  render: function () {
    const { players, cards, interactions } = this.state
    return (
      <div>
        <Board
          cards={ cards }
          players={ players }
          interactions={ interactions }
          />
        <ContextMenu
          show={ false }
          />
      </div>
    )
  }
})
