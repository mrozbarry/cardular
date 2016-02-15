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

  canDrag: function (cardUuid, playerUuid) {
    return this.state.drags.every((drag) => {
      return (drag.cardUuid !== cardUuid) && (drag.playerUuid !== this.state.me.uuid)
    })
  },

  beginDrag: function (cardUuid) {
    if (!this.canDrag(cardUuid)) {
      return false
    }

    this.setState({
      drags: this.state.drags.concat({
        playerUuid: this.state.me.uuid,
        cardUuid: cardUuid
      })
    })

    return true
  },

  endAllDrags: function () {
    this.setState({
      drags: this.state.drags.reduce((drags, drag) => {
        if (drag.playerUuid === this.state.me.uuid) {
          return drags
        }

        return drags.concat(drag)
      }, [])
    })
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

  importCard: function (cards, set, deckName, cardName, position, rotation, isFrontUp) {
    position = position || {}
    rotation = rotation || 0
    isFrontUp = isFrontUp || true

    let deck = set.decks[deckName]
    let card = deck.cards[cardName]


    let cardUuid = uuid.v4()

    return cards.concat({
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
  },

  mutateCard: function (cardUuid, callback) {
    let newCard = null
    let result = this.state.cards.reduce(function (cards, card, idx) {
      if (card.uuid !== cardUuid) {
        return cards.concat(card)
      } else {
        newCard = callback(card)
      }
      return cards
    }, [])

    if (newCard) {
      result = result.concat(newCard)
    }

    return result
  },

  touchCard: function (cardUuid) {
    this.setState({
      cards: this.mutateCard(cardUuid, function (card) { return card })
    })
  },

  moveCard: function (cardUuid, x, y) {
    this.setState({
      cards: this.mutateCard(cardUuid, function (card) {
        return Object.assign({}, card, { x: x, y: y })
      })
    })
  },

  flipCard: function (cardUuid) {
    this.setState({
      cards: this.mutateCard(cardUuid, function (card) {
        return Object.assign({}, card, { flipped: !card.flipped })
      })
    })
  },

  componentDidMount: function () {
    this.loadSet('/assets/sets/demo', (set) => {
      let cards = this.state.cards
      cards = this.importCard(cards, set, 'main', 'a', { x: 100, y: 100 })
      cards = this.importCard(cards, set, 'main', 'b', { x: 101, y: 101 })
      cards = this.importCard(cards, set, 'main', 'a', { x: 102, y: 102 })
      this.setState({ cards: cards })
    })
  },

  render: function () {
    return (
      <div>
        <Board
          cards={ this.state.cards }
          moveCard={ this.moveCard }
          flipCard={ this.flipCard }
          touchCard={ this.touchCard }
          beginDrag={ this.beginDrag }
          endAllDrags={ this.endAllDrags }
          />
      </div>
    )
  }
})
