import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  // eslint-disable-next-line
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/bookings?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [loggedInUser.email]);
  return (
    <div>
      <h2>You have {bookings.length} Bookings</h2>
      {bookings.map((book) => (
        <li key={book._id}>
          {book.name}, email: {book.email}, from:{" "}
          {new Date(book.checkIn).toDateString("dd-mm-yyyy")}, to:{" "}
          {new Date(book.checkOut).toDateString("dd-mm-yyyy")}{" "}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
