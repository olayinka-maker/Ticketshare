"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import test from "../../public/test.jpg";
import { BarcodeIcon, MessageCircleWarning, Rows3Icon, TicketIcon, Wallet2Icon } from "lucide-react";

const tickets = [
  {
    theme: "Live Concert Night",
    venue: "Madison Square Garden, NY",
    date: "April 15, 2025",
    time: "8:00 PM",
    section: "A3",
    row: "12",
    startingSeatNumber: "24",
    numberOfTickets: "2",
    generalAdmission: false,
    eventImage: test,
  },
  {
    theme: "Oasis Live",
    venue: "Heaton Park, Manchester",
    date: "July 11, 2025",
    time: "3:30 PM",
    section: "B1",
    row: "5",
    startingSeatNumber: "10",
    numberOfTickets: "1",
    generalAdmission: true,
    eventImage: test,
  },
  {
    theme: "Rock Fest",
    venue: "Wembley Stadium, London",
    date: "August 20, 2025",
    time: "6:00 PM",
    section: "C2",
    row: "7",
    startingSeatNumber: "15",
    numberOfTickets: "3",
    generalAdmission: false,
    eventImage: test,
  },
];

const TicketCardSlider: React.FC = () => {
  const [showTransfer, setShowTransfer] = useState(false);

  return (
    <div className=" relative w-full bg-white max-w-md mx-auto">
      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          slidesPerView={1.1}
          centeredSlides={true}
          spaceBetween={0}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          modules={[Pagination]}
          className="w-full pb-10" // Added padding at bottom for pagination
        >
          {tickets.map((ticket, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="border-2 w-80 rounded-2xl mx-auto my-4">
                <div className="bg-blue-600 text-white rounded-t-sm text-center py-2">
                  <p className="text-sm font-medium">Standard Ticket</p>
                </div>

                <div className="flex justify-between px-4 py-2 h-16 bg-blue-500 text-white">
                  <div className="text-center">
                    <p className="text-xs font-medium">SEC</p>
                    <p className="font-bold">{ticket.section || "GA"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs">ROW</p>
                    <p className="font-bold">
                      {ticket.generalAdmission ? "General Admission" : ticket.row}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs">SEAT</p>
                    <p className="font-bold">{ticket.startingSeatNumber || "-"}</p>
                  </div>
                </div>

                {/* Event Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={ticket.eventImage}
                    alt="Event"
                    layout="fill"
                    objectFit="cover"
                    className="grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 w-full text-center p-4 text-white">
                    <h2 className="text-lg font-bold">{ticket.theme}</h2>
                    <p className="text-sm">{ticket.date} • {ticket.time}</p>
                    <p className="text-sm">{ticket.venue}</p>
                  </div>
                </div>

                {/* View Barcode Button */}
                <div className="mx-auto w-[85%] my-6 text-center bg-blue-600 flex gap-3 p-2 justify-center items-center">
                  <BarcodeIcon />
                  <p>View Barcode</p>
                </div>

                <p className="text-blue-600 text-center my-6 font-bold">Ticket Details</p>

                <div className="text-white gap-1.5 bg-blue-600 flex items-center justify-center py-1 rounded-b-md">
                  <Wallet2Icon />
                  <p>ticketmaster.verified</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Pagination container */}
        <div className="swiper-pagination absolute flex items-center justify-center w-full bottom-[-25px] left-1/2 transform -translate-x-1/2 "></div>
       <div className="bg-black mb-0 absolute h-[70%]">
       <div className="w-ful">
          <p className=" items-center mx-auto flex justify-center border-b py-2">SELECT TICKETS TO TRANSFER</p>
          <div className="flex items-center gap-2  border rounded-md w-[90%] mx-auto p-2 mt-2">
            <MessageCircleWarning />
            <p>only transfer tickets to people you know and trust to ensure everyone stays safe and socially distanced.</p>
          </div>
          <div className=" flex justify-between ">
            <p>Sec GA, Row General Admission</p>
            <div className="flex">
              <TicketIcon />
              <p>4 tickets</p>
            </div>
          </div>
          <div className=" flex justify-center gap-4 mt-4">
  {[1, 2, 3, 4].map((seat, index) => (
    <label
      key={index}
      className="bg-white rounded-lg w-20 text-center cursor-pointer border border-blue-600"
    >
      <p className="bg-blue-600 text-white rounded-t-md py-1">SEAT -</p>
      
      {/* Checkbox Container */}
      <div className="w-full h-8 flex items-center justify-center">
        <input
          type="checkbox"
          className="hidden peer"
        />
        <div className="w-6 h-6 rounded-full border border-blue-600 flex items-center justify-center peer-checked:bg-blue-600">
        </div>
      </div>
    </label>
  ))}
</div>
       </div>

        </div>

      </div>

      {/* Buttons Below Swiper */}
      <div className="flex justify-center w-80 my-7 gap-4 mx-auto">
  <Button onClick={() => setShowTransfer(true)} className="flex-1 bg-blue-600 text-white">Tickets</Button>
  <Button className="flex-1 bg-blue-600 text-white">Sell</Button>
</div>
</div>
  );
};

export default TicketCardSlider;