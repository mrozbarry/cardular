import React from 'react'

const { object, func } = React.PropTypes

export default React.createClass({
  propTypes: {
    card: object.isRequired,
    moveCard: func.isRequired,
    flipCard: func.isRequired
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

  onDragStart: function (e) {
    if (this.props.beginDrag(this.props.card.uuid) === false) {
      e.preventDefault()
      return
    }

    let bounds = e.target.getBoundingClientRect()

    this.dragOffset = {
      x: e.pageX - bounds.left,
      y: e.pageY - bounds.top
    }

    e.target.style.opacity = '0.4'

    e.dataTransfer.effectAllowed = 'move'
  },

  onDragEnd: function (e) {
    // TODO: Firefox does not do the right thing here.
    e.persist()
    console.log('drag end', e)
    const eventX = e.clientX
    const eventY = e.clientY
    const x = eventX - this.dragOffset.x
    const y = eventY - this.dragOffset.y
    // console.log('onDragEnd offset', {
    //   offset: this.dragOffset,
    //   event: { x: eventX, y: eventY },
    //   corrected: { x: x, y: y }
    // })
    e.target.style.opacity = '1.0'
    console.log('drag end', x, y)
    this.props.moveCard(this.props.card.uuid, x, y)
    this.props.endAllDrags()
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

  onMouseOver: function (e) {
    this.cancelTouch()
    this.touchTimeout = setTimeout(() => {
      this.props.touchCard(this.props.card.uuid)
    }, 500)
  },

  onMouseOut: function (e) {
    this.cancelTouch()
  },

  componentDidMount: function () {
    this.touchTimeout = null

    this.dragOffset = {
      x: 0,
      y: 0
    }
  },

  render: function () {
    const { card } = this.props
    const href = card.flipped ? card.front : card.back

    return (
      <img
        className='card'
        src={ href }
        alt={ card.text }
        title={ card.text }
        style={ { transform: `rotateZ(${card.rotation}deg)`, left: card.x, top: card.y } }
        onDragStart={ this.onDragStart }
        onDragEnd={ this.onDragEnd }
        onDoubleClick={ this.onDoubleClick }
        onMouseOver={ this.onMouseOver }
        onMouseOut={ this.onMouseOut }
        draggable
        />
    )
  }
})
