"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { useTickets } from "../_components/TicketContext";
import TicketGenerationForm from "../_components/RegisterData";

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

const TicketCardSlider: React.FC = () => {
  const [showTransfer, setShowTransfer] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const { tickets, addTicket } = useTickets();

  const handleSeatToggle = (seatNumber: number) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber]
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Responsive Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden 
                       transform transition-all duration-300 
                       hover:scale-105 hover:shadow-xl">
            {/* Responsive Image */}
            {ticket.eventImage && (
              <div className="relative w-full aspect-video">
                <Image
                  src={ticket.eventImage}
                  alt={ticket.theme}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Ticket Details */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold text-gray-800 truncate">
                {ticket.theme}
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <WarehouseIcon className="inline-block mr-2 w-4 h-4" />
                  {ticket.venue}
                </p>
                <p>
                  <Ticket className="inline-block mr-2 w-4 h-4" />
                  {ticket.date} | {ticket.time}
                </p>
                <p>
                  <Tickets className="inline-block mr-2 w-4 h-4" />
                  Section: {ticket.section}, Row: {ticket.row}
                </p>
              </div>

              {/* Responsive Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => handleTransferTo()}>
                  Transfer Tickets
                </Button>
                <Button variant="default" className="w-full sm:w-auto">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback for No Tickets */}
      {tickets.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            No tickets available. Generate a ticket to get started!
          </p>
        </div>
      )}

      <TicketGenerationForm />
    </div>
  );
};

export default TicketCardSlider;
