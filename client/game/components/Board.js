import React from 'react'
import Card from './Card'

const { array, func } = React.PropTypes

export default React.createClass({
  propTypes: {
    cards: array.isRequired,
    moveCard: func.isRequired,
    flipCard: func.isRequired,
    touchCard: func.isRequired,
    beginDrag: func.isRequired,
    endAllDrags: func.isRequired
  },

  getSvgStyle: function () {
    return {
      backgroundColor: '#f0f0f0',
      position: 'absolute'
    }
  },

  onDragOver: function (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  },

  render: function () {
    return (
      <div
        width='100%'
        height='100%'
        style={ this.getSvgStyle() }
        onDragOver={ this.onDragOver }>
        { this.renderCards(this.props.cards) }
      </div>
    )
  },

  renderCards: function(cards) {
    return cards.map((card, idx) => {
      return (
        <Card
          key={ card.uuid }
          card={ card }
          moveCard={ this.props.moveCard }
          flipCard={ this.props.flipCard }
          touchCard={ this.props.touchCard }
          beginDrag={ this.props.beginDrag }
          endAllDrags={ this.props.endAllDrags }
          />
      )
    })
  }
})
