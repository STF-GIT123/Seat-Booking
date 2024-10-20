// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

import { AppComponent } from './app.component';
import { SeatReservationComponent } from './seat-reservation/seat-reservation.component';

@NgModule({
  declarations: [AppComponent, SeatReservationComponent],
  imports: [BrowserModule, FormsModule],  // Add FormsModule to imports
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}