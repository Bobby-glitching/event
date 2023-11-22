import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function OrgHome() {
    const history = useNavigate();
    const location = useLocation();
    const username = location.state.id;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedBook, setSelectedBook] = useState(0);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post("https://violetapi.onrender.com/userbooking" ,{username,});

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

    

    async function uhome(username) {
        history("/userhome", { state: { id: username } });
    }

    async function ubook(username) {
        history("/userbooking", { state: { id: username } });
    }

    async function uprofile(username) {
        history("/userprofile", { state: { id: username } });
    }

    async function ulogout() {
        history("/");
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const selectevent = (eventname,booked) => {
        setSelectedEvent(eventname);
        setSelectedBook(booked);
    };

    const handlecancel = async () => {
        
        try {
            
            const response = await axios.post("https://violetapi.onrender.com/ucanceltickets", {
                username,
                selectedEvent,selectedBook,
            });
            
            if(response.data==="exist") {
                console.log("Tickets deleted successfully");
                setSelectedEvent(null); // Reset selected event after updating tickets // Reset ticketsRequired input
                fetchData(); // Refetch data to update UI

            } else if(response.data==="notexist")  {
                console.log("Failed to cancel tickets");
            }
        } catch (error) {
            console.error("Error cancel tickets:", error);
        }
    };

    return (
        <div>
            <img style={{ width: "200px" }} src="./images/logo.jpg" alt="A hoe" />
            <h1 className="orgneweventhref">Hello {location.state.id} and welcome to the home</h1>

            <div className="orghomesidenav">
                <button onClick={() => uhome(username)}>Home</button>
                <button onClick={() => ubook(username)}>Bookings</button>
                <button onClick={() => uprofile(username)}>Profile</button>
                <button onClick={() => ulogout()}>Logout</button>
            </div>
            <h2 className="orgneweventhref">Upcoming Booked Events</h2>
            <div className="orghomecontainer">
                
                {data.map((item) => (
                    <div key={item._id}>
                        <button onClick={() => selectevent(item.eventname, item.booked)}>
                        <p>Name: {item.eventname}</p>
                        <p>Tickets Booked:{item.booked}</p>
                        </button>
                    </div>
                ))}
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
