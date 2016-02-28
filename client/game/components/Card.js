import React from 'react'

const { object, func } = React.PropTypes

export default React.createClass({
  propTypes: {
    me: object.isRequired,
    card: object.isRequired,
    flipCard: func.isRequired,
    touchCard: func.isRequired,
    drag: object
  },

  transformString: function (name, params) {
    return [
      name,
      '(',
      params.join(','),
      ')'
    ].join('')
  },

  getTransform: function () {
    const { card } = this.props
    return [
      this.transformString('rotateZ', [card.rotation])
    ].join(' ')
  },

  onDoubleClick: function (e) {
    this.props.flipCard(this.props.card.uuid)
  },

  cancelTouch: function () {
    if (this.touchTimeout) {
      clearTimeout(this.touchTimeout)
    }
    this.touchTimeout = null
  },

  onMouseDown: function (e) {
    console.log('Card -> mouse down')
  },

  onMouseOver: function (e) {
    this.cancelTouch()
    this.touchTimeout = setTimeout(() => {
      this.props.touchCard(this.props.card.uuid)
    }, 500)
  },

  onMouseOut: function (e) {
    this.cancelTouch()
  },

  onClick: function (e) {
    console.log(' -- What do you want to do with this card')
  },

  componentDidMount: function () {
    this.touchTimeout = null
  },

  rgbToCssString: function (rgb, alpha) {
    alpha = alpha || 1
    return `rgba(${ rgb.r }, ${ rgb.g }, ${ rgb.b }, ${ alpha })`
  },

  // getCardStyles: function () {
  //   if (this.props.drag) {
  //     return {
  //       boxShadow: `0 0 30px ${  }, inset 0 0 30px rgba(81, 203, 238, 0.5)`
  //     }
  //   }
  //   return null
  // },

  render: function () {
    const { card } = this.props
    const cardImage = card.flipped ? card.front : card.back

    return (
      <image
        className={ 'card' }
        xlinkHref={ cardImage }
        x={ card.x }
        y={ card.y }
        width={ card.size[0] }
        height={ card.size[1] }
        onMouseOver={ this.onMouseOver }
        onMouseOut={ this.onMouseOut }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        />
    )
  }
})
