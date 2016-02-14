import React from 'react'

const { object } = React.PropTypes

export default React.createClass({
  propTypes: {
    card: object.isRequired
  },

  svgFunc: function (name, params) {
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
      this.svgFunc('translate', [card.x, card.y]),
      this.svgFunc('rotate', [card.rotation, 90, 140])
    ].join(' ')
  },

  onMouseDown: function (e) {
    console.log('mouse down', e.clientX, e.clientY, e.screenX, e.screenY, e.target)
  },

  render: function () {
    return (
      <g transform={this.getTransform()}>
        <rect
          width='180'
          height='280'
          fill='white'
          stroke='black'
          title={this.props.card.text}
          draggable='true'
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onMouseDown={this.onMouseDown}
          />
      </g>
    )
  }
})
