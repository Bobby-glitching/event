import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick2 = () => {
    // You can replace "/new-route" with the desired route/path
    navigate("/userlogin");
  };

  const handleButtonClick1 = () => {
    // You can replace "/new-route" with the desired route/path
    navigate("/orglogin");
  };

  return (
    <div >
      {/* Navigation Bar */}
      <nav className="homepagenavbar">
        <img style={{ width: "200px" }} src="./images/logo.jpg" alt="A hoe" />

        <ul style={{ listStyleType: "none" }}>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About us</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="homepagecontainer">
        <img
          src="./images/homepg2.jpg"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
            minWidth: "900px",
          }}
          alt="Main Content"
        />

        {/* Login Block */}
        <div className="homepageloginblock1">
          <img
            src="./images/homepg3.jpg"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              maxWidth: "29%", //600px
              paddingLeft: "6%", //100px
            }}
            alt="Login Block"
          />
          <p>
            Secure your spot at the event of a lifetime!<br />
            Click here to book your tickets now and<br />
            join us for an unforgettable experience
          </p>
          <button id="homepagebooknow" onClick={handleButtonClick2}>Book now</button>
        </div>

        {/* Organizer Block */}
        <div className="homepageorganizer">
          <img
            src="./images/homepg4.jpg"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              maxWidth: "29%",//600px
              paddingRight: "8%",//10px
            }}
            align="right"
            alt="Organizer Block"
          />
          <p>
            Organizers, manage your events with ease!<br />
            Log in now to access powerful tools and<br />
            streamline your event planning process
          </p>
          <button id="homepagebooknow2" onClick={handleButtonClick1}>Login here</button>
        </div>
      </main>

      {/* Banner */}
      
    
   </div>
  );
}

export default Home;
