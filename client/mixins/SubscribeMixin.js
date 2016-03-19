const SubscribeMixin = {
  componentWillMount: function () {
    this.unsubscribeCallbacks = []
  },

  componentWillUnmount: function () {
    this.unsubscribeAll()
  },

  subscribe: function (ref, event, callback) {
    ref.on(event, callback)

    this.unsubscribeCallbacks.push(() => {
      ref.off(event, callback)
    })
  },

  unsubscribeAll: function () {
    this.unsubscribeCallbacks.forEach((callback) => {
      callback()
    })
  }
}

export default SubscribeMixin
