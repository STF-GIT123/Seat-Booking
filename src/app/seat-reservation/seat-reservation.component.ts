// src/app/seat-reservation/seat-reservation.component.ts
import { Component } from '@angular/core';
import { Seat } from '../seat.model';  // Import the Seat model

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent {
  seats: Seat[] = [];
  rowLength: number = 7;
  lastRowLength: number = 3;
  totalSeats: number = 80;
  bookingMessage: string = '';
  requestedSeats: number = 1; // Variable to bind input

  constructor() {
    // Initialize seats array with 80 seats
    for (let i = 1; i <= this.totalSeats; i++) {
      this.seats.push({
        seatNumber: i,
        isBooked: false
      });
    }
  }

  // Method to book seats
  bookSeats(numSeats: number) {
    if (numSeats > 7) {
      this.bookingMessage = 'You can only book up to 7 seats at a time.';
      return;
    }

    const availableSeats = this.seats.filter(seat => !seat.isBooked);
    if (availableSeats.length < numSeats) {
      this.bookingMessage = 'Not enough seats available!';
      return;
    }

    let bookedSeats: Seat[] = [];

    // Try booking in the same row
    for (let i = 0; i < this.seats.length; i += this.rowLength) {
      const row = this.seats.slice(i, i + this.rowLength);
      const availableSeatsInRow = row.filter(seat => !seat.isBooked);
      if (availableSeatsInRow.length >= numSeats) {
        bookedSeats = availableSeatsInRow.slice(0, numSeats);
        break;
      }
    }

    // If no row has enough space, book nearby seats
    if (bookedSeats.length === 0) {
      bookedSeats = availableSeats.slice(0, numSeats);
    }

    // Mark the selected seats as booked
    bookedSeats.forEach(seat => (seat.isBooked = true));

    this.bookingMessage = `Seats booked: ${bookedSeats
      .map(seat => seat.seatNumber)
      .join(', ')}`;
  }
}