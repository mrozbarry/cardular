import uuid from 'uuid'

const CardMixin = {
  newCard: function (set, deckName, cardName, position, rotation, isFrontUp) {
    position = position || {}
    rotation = rotation || 0
    isFrontUp = isFrontUp || true

    const deck = set.decks[deckName]
    const card = deck.cards[cardName]

    return {
      uuid: uuid.v4(),
      parents: {
        setUuid: set.uuid,
        deckUuid: deck.uuid
      },
      size: deck.size,
      back: deck.back,
      front: card,
      x: position.x || 100,
      y: position.y || 100,
      rotation: 0,
      flipped: isFrontUp,
      isLocked: false
    }
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

  flipCard: function (cardUuid) {
    this.setState({
      cards: this.mutateCard(cardUuid, function (card) {
        return Object.assign({}, card, { flipped: !card.flipped })
      })
    })
  },

}

export default CardMixin
