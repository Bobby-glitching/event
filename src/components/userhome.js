import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function OrgHome() {
    const history = useNavigate();
    const location = useLocation();
    const username = location.state.id;
    const [data, setData] = useState([]);
    const [ticketsRequired, setTicketsRequired] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedcapacity,setSelectedcapacity]=useState(0);
    const [selectedbooked,setSelectedbooked]=useState(0);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post("https://violetapi.onrender.com/userhome");

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

    const selectevent = (eventname,booked,capacity) => {
        if(booked<capacity)
        {setSelectedEvent(eventname);
            setSelectedcapacity(booked);
            console.log("booked:" , booked)
            }
        else{
            alert("soldout")
        }
        
    };

    const handleTicketsRequiredChange = (e) => {
        setTicketsRequired(Number(e.target.value));
        
    };

    const handleUpdateTickets = async () => {
        
        try {
            
            const response = await axios.post("https://violetapi.onrender.com/updateTickets", {
                username,
                selectedEvent,
                ticketsRequired,selectedcapacity,
            });
            
            if(response.data==="exist") {
                console.log("Tickets updated successfully");
                setSelectedEvent(null); // Reset selected event after updating tickets
                setTicketsRequired(0);
                setSelectedbooked(0);
                setSelectedcapacity(0); // Reset ticketsRequired input
                fetchData(); // Refetch data to update UI
            } else if(response.data==="notexist")  {
                console.log("Failed to update tickets");
            }
        } catch (error) {
            console.error("Error updating tickets:", error);
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
            <h2 className="orgneweventhref">Upcoming Events</h2>
            <div className="orghomecontainer">
                
                {data.map((item) => (
                    <div key={item._id}>
                        <button onClick={() => selectevent(item.eventname,item.booked,item.capacity)}>
                        <p>Name: {item.eventname}</p>
                        <p>Date:{formatDate(item.date)}</p>
                        <p>Description: {item.aboutevent}</p></button>
                    </div>
                ))}
                {data.length === 0 && <p>No data available</p>}
                {selectedEvent && (
                    <div className="modal">
                        <label htmlFor="ticketsRequired">
                            Tickets Required:
                        </label>
                        <input
                            type="number"
                            id="ticketsRequired"
                            value={ticketsRequired}
                            onChange={handleTicketsRequiredChange}
                        />

                        <button onClick={handleUpdateTickets}>
                            Update Tickets
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrgHome;
