const SubscribeMixin = {
  componentWillMount: function () {
    this.unsubscribeCallbacks = []
  },

  componentWillUnmount: function () {
    this.unsubscribeAll()
  },

  subscribe: function (ref, event, callback) {
    ref.on(event, callback)

    const cancel = () => {
      ref.off(event, callback)
    }

    this.unsubscribeCallbacks.push(cancel)

    // Return a wrapped version of cancel that also removes it from the
    // callback array.
    return () => {
      cancel()
      this.unsubscribeCallbacks = _.omit(this.unsubscribeCallbacks, cancel)
    }
  },

  unsubscribeAll: function () {
    this.unsubscribeCallbacks.forEach((callback) => {
      callback()
    })
  }
}

export default SubscribeMixin
