"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import test from "../../public/test.jpg";
import {
  BarcodeIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Ticket,
  Tickets,
  WarehouseIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTickets } from "../_components/TicketContext";
import Link from "next/link";

interface Ticket {
  theme: string;
  venue: string;
  date: string;
  time: string;
  section: string;
  row: string;
  generalAdmission: boolean;
  startingSeatNumber: string;
  numberOfTickets: string;
  eventImage: string | null;
}

const TicketCardSliider: React.FC = () => {
  const [showTransfer, setShowTransfer] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const { tickets, addTicket } = useTickets();

  const handleSeatToggle = (seatKey: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatKey)
        ? prevSeats.filter((seat) => seat !== seatKey)
        : [...prevSeats, seatKey]
    );
  };

  const handleTransferTo = () => {
    if (selectedSeats.length > 0) {
      setShowTransferForm(true);
    } else {
      setShowTransfer(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-white max-w-md mx-auto">
      {/* Rest of the code remains the same until the seat selection section */}
      <div className="flex justify-center gap-4 mt-6 px-4">
        {tickets.map((ticket, ticketIndex) => {
          const startingSeat = Number(ticket.startingSeatNumber);

          // Create unique seats for each ticket
          const uniqueSeats = Array.from(
            { length: Number(ticket.numberOfTickets) },
            (_, i) => ({
              key: `ticket-${ticketIndex}-seat-${startingSeat + i}`,
              number: startingSeat + i,
            })
          );

          return uniqueSeats.map((seat) => (
            <label
              key={seat.key}
              className={`bg-white rounded-lg w-20 text-center cursor-pointer border ${
                selectedSeats.includes(seat.key)
                  ? "border-blue-600"
                  : "border-gray-300"
              }`}>
              <p className="bg-blue-600 text-white rounded-t-md py-1 text-sm">
                SEAT {seat.number}
              </p>

              <div className="w-full h-12 flex items-center justify-center">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedSeats.includes(seat.key)}
                  onChange={() => handleSeatToggle(seat.key)}
                />
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    selectedSeats.includes(seat.key)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                  }`}>
                  {selectedSeats.includes(seat.key) && (
                    <Check className="text-white" size={16} />
                  )}
                </div>
              </div>
            </label>
          ));
        })}
      </div>

      {/* The rest of the code remains the same */}
    </div>
  );
};

export default TicketCardSliider;
