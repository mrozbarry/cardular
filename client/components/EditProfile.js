import React from 'react'
import _ from 'lodash'
import ColorPicker from 'react-color'

const { func, object, bool } = React.PropTypes

const EditProfile = React.createClass({
  propTypes: {
    onCloseProfile: func.isRequired,
    updateAttribute: func.isRequired,
    getStyle: func.isRequired,
    user: object.isRequired
  },

  getInitialState: function () {
    return {
      photoState: 'good'
    }
  },

  onNameChange: function (e) {
    const input = e.target
    const name = input.value

    this.props.updateAttribute('name', name)
      .catch((err) => {
        input.setCustomValidity('There was an error:' + err)
      })
  },

  onPhotoChange: function (e) {
    const input = e.target
    const photoUrl = input.value

    if (this.image) {
      delete this.image
    }

    this.setState({
      photoState: 'loading'
    }, () => {
      this.image = new Image()
      this.image.src = photoUrl

      this.image.addEventListener('load', () => {
        this.props.updateAttribute('photoUrl', photoUrl)
        this.setState({ photoState: 'good' })
      })

      this.image.addEventListener('error', () => {
        this.setState({ photoState: 'error' })
      })
    })
  },

  onUpdateColour: function (colour) {
    this.props.updateAttribute('colour', colour.rgb)
  },

  componentDidMount: function () {
    this.refs.userInput.focus()
  },

  render: function () {
    const { user } = this.props

    return (
      <div className='profile-edit card'>
        <div className='right-align'>
          <br />
          <a className='black-text' href='#' onClick={ this.props.onCloseProfile }>
            <i className='material-icons'>close</i>
          </a>
        </div>

        <h4>You ({ user.name })</h4>
        <p>
          All your user fields are editable, including the colour picker.
        </p>
        <div className='divider' />

        <div className='center-align'>
          <br />
          <img
            className='circle'
            src={ user.photoUrl || 'http://placehold.it/128x128' }
            style={ Object.assign({}, this.props.getStyle(user), { width: 128, height: 128 }) }
            />
          <br />
          <br />
        </div>

        <div className='divider' />

        <div className='section'>
          <div className='row'>
            <div className='col m12 l6'>
              <div>
                <label>Display Name</label>
                <input
                  ref='userInput'
                  value={ user.name }
                  onChange={ this.onNameChange }
                  maxLength={ 24 }
                  />
              </div>
              <div>
                <label>Photo URL</label>
                <input
                  style={ {
                    borderColor: this.state.photoState === 'error' ? 'red' : 'inherit'
                  } }
                  defaultValue={ user.photoUrl }
                  onChange={ _.throttle(this.onPhotoChange) }
                  onBlur={ this.onPhotoChange }
                  />
                { this.renderImageLoading() }
                <small>
                  The image url you enter should be a valid image and will be scaled into a square, so make sure it is square-ish.<br />
                  If you have a file on your computer, try uploading it to <a href='http://imgur.com/' target='_blank'>Imgur</a> or any other publically available image hosting website, and paste the url to the image in the input box above.
                </small>
              </div>
            </div>
            <div className='col m12 l6'>
              <label>Outline Colour</label>
              <div className='profile-edit__colour'>
                <ColorPicker
                  color={ user.colour }
                  onChangeComplete={ this.onUpdateColour }
                  />
              </div>
            </div>
            <div className='col s12'>
            </div>
          </div>
        </div>

        <div className='divider' />
        <div className='row'>
          <div className='col s12'>
            <br />
            <a href='#' className='btn green right' onClick={ this.props.onCloseProfile }>
              Save and Close
            </a>
          </div>
        </div>


        <h4>Game History</h4>
        <div className='divider' />

        <div className='section'>
          <div className='row'>
            <div className='col s12'>
              <ul className='collection'>
                <li className='collection-item'>
                  Joined <strong>Server Name</strong> { 1 } hour ago
                  <a className='secondary-content' href='#'>
                    <i className='material-icons'>send</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },

  renderImageLoading: function () {
    const { photoState } = this.state

    if (photoState !== 'loading') {
      return null
    }

    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    )
  }
})

export default EditProfile
