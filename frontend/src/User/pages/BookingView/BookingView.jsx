import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";

const BookingView = () => {
  const [bookingData, setBooking] = useState([]);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleViewClick = () => {
    navigate("/User");
  };

  const fetchBooking = () => {
    axios
      .get(`http://localhost:5000/Slot`)
      .then((response) => {
        console.log(response.data.slots);
        setBooking(response.data.slots);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  function BookingConfirmation({ bookingData }) {
    return (
      <div className="featured-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Slot successfully booked!</DialogTitle>
          <DialogContent>
            {bookingData && bookingData.map((slotBookView, key) => (
              <p key={key}>{`Hi, ${slotBookView.name}, your date is ${slotBookView.bookslot} confirmed.`}</p>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleViewClick} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return <BookingConfirmation bookingData={bookingData} />;
};

export default BookingView;
