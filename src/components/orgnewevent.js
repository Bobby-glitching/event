import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"

import axios from "axios"
import '../../src/App.css'

function OrgNewEvent() {
    const history = useNavigate();
    const location = useLocation();
    const username = location.state.id;
    const [eventName, setEventName] = useState('');
    const [venue, setVenue] = useState('');
    const [price, setPrice] = useState(0); // Assuming price is a number
    const [capacity, setCapacity] = useState(0); // Assuming capacity is a number
    const [booked, setBooked] = useState(0); // Assuming booked is a number
    const [aboutEvent, setAboutEvent] = useState('');
    const [date, setDate] = useState('');

    async function oevent(username) {
        history("/orgnewevent", { state: { id: username } })
    }

    async function ohome(username) {
        history("/orghome", { state: { id: username } })
    }

    async function obook(username) {
        history("/orgbooking", { state: { id: username } })
    }

    async function oprofile(username) {
        history("/orgprofile", { state: { id: username } })
    }
    
    async function ologout() {
        history("/");
    }
    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post("https://violetapi.onrender.com/orgnewevent", {
                username, eventName, venue,date, price, capacity, booked, aboutEvent
            })
                .then(res => {
                    if (res.data == "exist") {
                        alert("Event already exists")
                    }
                    else{
                        alert("Event Registered Successfully!!!")
                        history("/orghome", { state: { id: username } })
                    }

                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }


    return (
        <div>
            <img style={{ width: "200px" }} src="./images/logo.jpg" alt="A hoe" />
            <h1 className="orgneweventhref">Hello {location.state.id} and welcome to the New Event page</h1>
            <div className="centerdiv">
            
            <div className="orgneweventsidenav">
                
                <button onClick={() => ohome(username)}>Home</button>
                <button onClick={() => oevent(username)}>New Event</button>
                <button onClick={() => obook(username)}>Bookings</button>
                <button onClick={() => oprofile(username)}>Profile</button>
                <button onClick={() => ologout()}>Logout</button>
            </div>

            
            

            <form className="letscenter" action='POST'>

                <label htmlFor="eventname"><b>Event Name</b></label>
                <input type="text" onChange={(e) => setEventName(e.target.value)} id="eventname" required />
                <br /><br /><br />

                <label htmlFor="venue"><b>Venue</b></label>
                <input type="text" onChange={(e) => setVenue(e.target.value)} id="venue" required />
                <br /><br /><br />

                <label htmlFor="date"><b>Date</b></label>
                <input type="date" onChange={(e) => setDate(e.target.value)} id="venue" required />
                <br /><br /><br />

                <label htmlFor="price"><b>Price</b></label>
                <input type="number" onChange={(e) => setPrice(Number(e.target.value))} id="price" required />
                <br /><br /><br />

                <label htmlFor="capacity"><b>Capacity</b></label>
                <input type="number" onChange={(e) => setCapacity(Number(e.target.value))} id="capacity" required />
                <br /><br /><br />

                <label htmlFor="booked"><b>No of tickets to block </b></label>
                <input type="number" onChange={(e) => setBooked(Number(e.target.value))} id="booked" required />
                <br /><br /><br />

                <label htmlFor="aboutevent"><b>About event</b></label>
                <input type="text" onChange={(e) => setAboutEvent(e.target.value)} id="aboutevent" required />
                <br /><br /><br />

                <input className="orgneweventforform" type="submit" onClick={submit} />
            </form>
        </div></div>
    );
}

export default OrgNewEvent;
