import React from 'react'
import _ from 'lodash'
import Card from './Card'

const { array, func } = React.PropTypes

export default React.createClass({
  propTypes: {
    cards: array.isRequired
  },

  getSvgStyle: function () {
    return {
      backgroundColor: '#f0f0f0',
      position: 'absolute'
    }
  },

  render: function () {
    return (
      <svg width='100%' height='100%' viewPort='0 0 1920 1080' version='1.1' style={this.getSvgStyle()}>
        {this.renderCards(this.props.cards)}
      </svg>
    )
  },

  renderCards: function(cards) {
    return cards.map((card, idx) => {
      return <Card key={card.uuid} card={card} />
    })
  }
})
