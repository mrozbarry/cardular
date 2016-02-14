import React from 'react'
import SetLoaderMixin from './mixins/SetLoaderMixin'
import Board from './components/Board'
import uuid from 'uuid'

export default React.createClass({
  mixins: [
    SetLoaderMixin
  ],

  getInitialState: function () {
    return {
      sets: [],
      cards: [],
      drags: [],
      me: {
        uuid: "player"
      }
    }
  },

  beginDrag: function (cardUuid, playerUuid) {
  },

  addCard: function (text, x, y, rotation) {
    this.setState({
      cards: this.state.cards.concat({
        text: text,
        position: {
          x: x,
          y: y
        },
        rotation: rotation
      })
    })
  },

  importCard: function (set, deckName, cardName, position, rotation, isFrontUp) {
    position = position || {}
    rotation = rotation || 0
    isFrontUp = isFrontUp || true

    const deck = set.decks[deckName]
    console.info('importCard', set, deckName)
    const card = deck.cards[cardName]


    const cardUuid = uuid.v4()

    this.setState({
      cards: this.state.cards.concat({
        uuid: cardUuid,
        parents: {
          setUuid: set.uuid,
          deckUuid: deck.uuid
        },
        back: deck.back,
        front: card,
        x: position.x || 100,
        y: position.y || 100,
        rotation: 0,
        flipped: isFrontUp
      })
    }, () => {
      // TODO move to correct position
      // This will be to enable animations
    })
  },

  componentDidMount: function () {
    this.loadSet('/assets/sets/demo', (set) => {
      this.importCard(set, 'main', 'a')
      this.importCard(set, 'main', 'a')
    })
  },

  render: function () {
    return (
      <div>
        <Board cards={this.state.cards} />
      </div>
    )
  }
})
