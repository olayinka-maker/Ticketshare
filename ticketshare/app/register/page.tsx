import React from "react";
import TicketGenerationForm from "../_components/RegisterData";

const page = () => {
  return (
    <div className=" bg-white">
      <div className="text-white py-3 text-center w-full text-3xl bg-blue-800">
        TicketMaster       
      </div>
      <TicketGenerationForm />
    </div>
  );
};

export default page;
