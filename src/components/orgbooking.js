import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function OrgHome() {
    const history = useNavigate();
    const location = useLocation();
    const username = location.state.id;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post("https://violetapi.onrender.com/orghome", {
                username,
            });

            if (response.data.success) {
                console.log("Login successful");
                setData(response.data.check);
            } else if (response.data === "notexist") {
                alert("No Events");
            } else {
                console.log("Login failed");
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log("Updated Data:", data);
    }, [data]);

    async function oevent(username) {
        history("/orgnewevent", { state: { id: username } });
    }

    async function ohome(username) {
        history("/orghome", { state: { id: username } });
    }

    async function obook(username) {
        history("/orgbooking", { state: { id: username } });
    }

    async function oprofile(username) {
        history("/orgprofile", { state: { id: username } });
    }

    async function ologout() {
        history("/");
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };
    const selectevent = (eventname) => {
        setSelectedEvent(eventname);
    };

    const handlecancel = async () => {

        try {

            const response = await axios.post("https://violetapi.onrender.com/ocanceltickets", {
                username,
                selectedEvent,
            });

            if (response.data === "exist") {
                console.log("Tickets deleted successfully");
                setSelectedEvent(null); // Reset selected event after updating tickets // Reset ticketsRequired input
                fetchData(); // Refetch data to update UI

            } else if (response.data === "notexist") {
                console.log("Failed to cancel tickets");
            }
        } catch (error) {
            console.error("Error cancel tickets:", error);
        }
    };
    return (
        <div>
            <img style={{ width: "200px" }} src="./images/logo.jpg" alt="A hoe" />
            <h1 className="orgneweventhref" >Hello {location.state.id} and welcome to the Bookings tab</h1>

            <div className="orghomesidenav">
                <button onClick={() => ohome(username)}>Home</button>
                <button onClick={() => oevent(username)}>New Event</button>
                <button onClick={() => obook(username)}>Bookings</button>
                <button onClick={() => oprofile(username)}>Profile</button>
                <button onClick={() => ologout()}>Logout</button>
            </div>
            <h2 className="orgneweventhref">Upcoming Events</h2>
            <div className="orghomecontainer">
                
                {data.map((item) => (
                    <div key={item._id}>
                        <button onClick={() => selectevent(item.eventname, item.booked, item.capacity)}>
                            <p>Event Name            : {item.eventname}</p>
                            <p>Date of Event         : {formatDate(item.date)}</p>
                            <p>No of seats booked    : {item.booked}</p>
                            <p>Capacity of the Venue : {item.capacity}</p>
                            <p>Percentage Filled     : {item.booked / item.capacity * 100}</p>
                            <p>Amount collected      : {item.booked * item.price}</p>
                            </button>


                    </div>
                ))}
                {data.length === 0 && <p>No data available</p>}
                {selectedEvent && (
                    <div className="modal">

                        <button onClick={handlecancel}>
                            Cancel Selected Booking?
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default OrgHome;
