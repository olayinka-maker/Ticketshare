"use client";

import React, { useEffect, useState } from "react";
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
  Info,
  Wallet2Icon,
  X,
  Check,
  Ticket,
  Tickets,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useTickets } from "../_components/TicketContext";

const tickets = [
  {
    theme: "Live Concert Night",
    venue: "Madison Square Garden, NY",
    date: "April 15, 2025",
    time: "8:00 PM",
    section: "A3",
    row: "12",
    startingSeatNumber: "24",
    numberOfTickets: "4",
    generalAdmission: false,
    eventImage: test,
  },
];

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
  console.log(addTicket);
  console.log(tickets);

  const {} = addTicket;

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
    <div className="relative w-full h-full bg-white max-w-md mx-auto">
      <div
        className={`fixed inset-x-0 bottom-0 bg-white z-50 transition-transform rounded-t-xl h-[80vh] ${
          showTransfer ? "translate-y-0" : "translate-y-full"
        } transform`}>
        <div className="w-full h-full flex flex-col overflow-auto">
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => setShowTransfer(false)}
                className="text-gray-500">
                <X size={24} />
              </button>
              <p className="text-black text-lg font-medium">
                SELECT TICKETS TO TRANSFER
              </p>
              <div className="w-6"></div>
            </div>
          </div>
          <div className="flex gap-2 border border-gray-500 rounded-md w-[95%] mx-auto p-3 mt-4">
            <FontAwesomeIcon icon={faCircleInfo} className="text-gray-400" />
            <p className="text-black text-sm">
              Only transfer tickets to people you know and trust to ensure
              everyone stays safe.
            </p>
          </div>

          <div className="text-gray-500 flex justify-between gap-x-4 w-[95%] mx-auto px-2 mt-4 whitespace-nowrap items-center">
            <p className="">Sec GA, Row General Admission</p>
            <div className="flex items-center gap-1 text-sm">
              <Ticket size={16} />
              <p>{selectedSeats.length} tickets</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6 px-4">
            {[1, 2, 3, 4].map((seat, index) => (
              <label
                key={index}
                className={`bg-white rounded-lg w-20 text-center cursor-pointer border ${
                  selectedSeats.includes(seat)
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}>
                <p className="bg-blue-600 text-white rounded-t-md py-1 text-sm">
                  SEAT {seat}
                </p>

                <div className="w-full h-12 flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedSeats.includes(seat)}
                    onChange={() => handleSeatToggle(seat)}
                  />
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      selectedSeats.includes(seat)
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300"
                    }`}>
                    {selectedSeats.includes(seat) && (
                      <Check className="text-white" size={16} />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="sticky bottom-0 left-0 right-0 px-4 py-4 bg-white border-t border-gray-200 mt-auto">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">{selectedSeats.length} Tickets</p>
              <button
                onClick={() => {
                  if (selectedSeats.length > 0) {
                    setShowTransferForm(true);
                    setShowTransfer(false);
                  }
                }}
                disabled={selectedSeats.length === 0}
                className="flex items-center text-blue-600 font-medium disabled:text-gray-400">
                <span>Transfer to</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white z-50 transition-transform ${
          showTransferForm ? "translate-y-0" : "translate-y-full"
        } transform`}>
        <div className="w-full h-full flex flex-col overflow-auto">
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => {
                  setShowTransferForm(false);
                  setShowTransfer(true);
                }}
                className="text-gray-500">
                <ChevronLeft size={24} />
              </button>
              <p className="text-black text-lg font-medium">TRANSFER TICKETS</p>
              <div className="w-6"></div>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <p className="text-gray-800 font-medium mb-2">
                {selectedSeats.length} Tickets Selected
              </p>
              <div className="flex text-sm text-gray-500 space-x-4">
                <div>
                  <p className="mb-1">Sec</p>
                  <p>{tickets[tickets.length - 1].section}</p>
                </div>
                <div>
                  <p className="mb-1">Row</p>
                  <p>{tickets[tickets.length - 1].row}</p>
                </div>
                <div>
                  <p className="mb-1">Seat</p>
                  <p>{selectedSeats.length}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <Input
                  className="w-full border-gray-300 rounded"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <Input
                  className="w-full border-gray-300 rounded"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Email or Mobile Number
                </label>
                <Input
                  className="w-full border-gray-300 rounded"
                  placeholder="Email or Mobile Number"
                />
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              Note: The recipient will need a Ticketmaster account to accept
              these tickets. They'll receive instructions via email.
            </p>
          </div>

          <div className="sticky flex items-center justify-between bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 mt-auto">
            <button
              onClick={() => {
                setShowTransferForm(false);
                setShowTransfer(true);
              }}
              className=" flex gap-x-2 text-blue-500">
              <ChevronLeft size={24} />
              <p>BACK</p>
            </button>
            <Button
              className=" bg-blue-600 text-white py-6"
              onClick={() => {
                setShowTransferForm(false);
              }}>
              Transfer {selectedSeats.length} Tickets
            </Button>
          </div>
        </div>
      </div>

      <div className="relative">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={16}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          modules={[Pagination]}
          className="w-full pb-10">
          {tickets.map((ticket, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className=" w-80 rounded-4xl mx-auto my-4">
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
                      {ticket.generalAdmission
                        ? "General Admission"
                        : ticket.row}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs">SEAT</p>
                    <p className="font-bold">
                      {ticket.startingSeatNumber || "-"}
                    </p>
                  </div>
                </div>

                <div className="relative w-full h-48">
                  <Image
                    src={ticket.eventImage || test}
                    alt="Event Image"
                    width={200}
                    height={200}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 w-full text-center p-4 text-white">
                    <h2 className="text-lg font-bold">{ticket.theme}</h2>
                    {/* <p>
                      {ticket.date
                        ? ticket.date.toDateString()
                        : "No date selected"}
                    </p> */}
                    <p className="text-sm">
                      {ticket.date &&
                        new Date(ticket.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                      •{" "}
                      {ticket.date &&
                        new Date(ticket.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                                  
                    </p>
                    <p className="text-sm">{ticket.venue}</p>
                  </div>
                </div>

                <div className="mx-auto w-[85%] my-6 text-center bg-blue-600 flex gap-3 p-2 justify-center items-center">
                  <BarcodeIcon />
                  <p>View Barcode</p>
                </div>

                <p className="text-blue-600 text-center my-6 font-bold">
                  Ticket Details
                </p>

                <div className="text-white gap-1.5 bg-blue-600 flex items-center justify-center py-1 rounded-b-md">
                  <Tickets />
                  <p>ticketmaster.verified</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-pagination flex justify-center w-full mb-4"></div>
      </div>

      <div className="flex justify-center w-80 my-7 gap-4 mx-auto">
        <Button
          onClick={handleTransferTo}
          className="flex-1 bg-blue-600 text-white">
          Transfer
        </Button>
        <Button className="flex-1 bg-blue-600 text-white">Sell</Button>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative;
          bottom: 0;
          margin-top: 8px;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
          background: #d1d5db;
          margin: 0 4px;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default TicketCardSlider;
