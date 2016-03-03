import React from 'react'

const Admin = React.createClass({
  getInitialState: function () {
    return {
      admin: null,
      game: null
    }
  },

  render: function () {
    return (
      <div>
        <div className='row'>
          <div className='col s12 m10'>
            <input
              type='text'
              placeholder='Name of your Game'
              />
          </div>

          <div className='col s12 m2'>
            <a className='btn-large'>Open Game <i className='material-icons'>keyboard_arrow_right</i></a>
          </div>

          <div className='col m4 s12'>
            <h4>Players</h4>
            <hr />
            <p>
              Use the checkboxes to enable a user to interact with the board.
            </p>

            <ul className='collection'>
              <li className='collection-item'>
                <input type='checkbox' id='somePlayer' />
                <label htmlFor='somePlayer'>Some Name</label>
                <i className='material-icons secondary-content'>signal_wifi_4_bar</i>
              </li>
              <li className='collection-item'>
                <input type='checkbox' id='otherPlayer' />
                <label htmlFor='otherPlayer'>Some Name</label>
                <i className='material-icons secondary-content'>signal_wifi_off</i>
              </li>
            </ul>

          </div>

          <div className='col m4 s12'>
            <h4>Settings</h4>
            <hr />
            <p>
              General game configuration
            </p>

            <ul className='collection with-header'>
              <li className='collection-header'><h4>General</h4></li>
              <li className='collection-item'>
                Some Setting
                <div className='secondary-content'>
                  <input type='checkbox' id='setting0' />
                  <label htmlFor='setting0'></label>
                </div>
              </li>
              <li className='collection-header'><h4>Players</h4></li>
              <li className='collection-item'>
                Some Other Setting
                <div className='secondary-content'>
                  <input type='checkbox' id='setting1' />
                  <label htmlFor='setting1'></label>
                </div>
              </li>
            </ul>
          </div>

          <div className='col m4 s12'>
            <h4>Cards</h4>
            <hr />
            <p>
              Specify card sets via url.  This will hot-link to all clients, so be careful!
            </p>
            <ul className='collection'>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>cloud</i>
                <span className='title'>Some Card Set</span>
                <p>
                  http://some.com/url/to/cards<br />
                  <a href='#'>View set.json</a>
                </p>
                <a href='#' className='secondary-content'><i className='material-icons secondary-content'>clear</i></a>
              </li>
            </ul>
            <div className='row'>
              <div className='col s8'>
                <input type='text' placeholder='Enter url of card deck' />
              </div>
              <div className='col s4'>
                <a className='btn'>Add Card Set</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})

export default Admin
