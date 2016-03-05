import request from 'superagent'

const SetLoaderMixin = {
  loadSet: function (hostPath, success) {
    request
      .get([hostPath, 'set.json'].join('/'))
      .set('Accept', 'application/json')
      .end((err, result) => {
        if (err) {
          throw err
        }
        let set = result.body
        set.decks = Object.keys(result.body.decks).reduce(function (decks, deckName) {
          const deck = result.body.decks[deckName]
          let cards = deck.cards

          decks[deckName] = Object.assign({}, deck, {
            back: [hostPath, deck.back].join('/'),
            cards: Object.keys(cards).reduce(function (pathedCards, cardKey) {
              let nextCard = {}
              nextCard[cardKey] = [hostPath, cards[cardKey]].join('/')
              return Object.assign({}, pathedCards, nextCard)
            }, cards)
          })

          return decks
        }, result.body.decks)
        const nextSets = this.state.sets.concat(set)
        this.setState({sets: nextSets}, function () {
          success(set)
        })
      })
  }
}

export default SetLoaderMixin
