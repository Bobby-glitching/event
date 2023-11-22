import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';

function Home (){
    const location=useLocation()

    return (
        <div>
      <h1>Hello {location.state.id} and welcome to the home</h1>

      <div className="sidenav">
        <a href="/orghome" id="home">HOME</a>
        <a href="/orgvenue" id="venue">Venue</a>
        <a href="#" id="bookings">Bookings</a>
        <a href="#" id="newevent">New Event</a>
        <a href="#" id="profile">Profile</a>
      </div>

      <div className="container">
        <br /><br />

        <button className="dropbtn" style={{ float: 'right' }}>Logout</button>

        <div className="dropdown" style={{ float: 'left' }}>
          <button className="dropbtn">Venue</button>
          <div className="dropdown-content">
            <a href="#">Venue 1</a>
            <a href="#">Venue 2</a>
            <a href="#">Venue 3</a>
          </div>
        </div>

        <div className="content">
          <br /><br />
          <br /><br />

          <form>
            <label htmlFor="venue"><b>VENUE DETAILS:</b></label>
            <input type="text" id="venue" required />
            <br /><br /><br />

            <label htmlFor="food"><b>FOOD:</b></label>
            <input type="text" id="food" required />
            <br /><br /><br />

            {/* Add other input fields similarly */}

            <button className="dropbtn">Update</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default Home