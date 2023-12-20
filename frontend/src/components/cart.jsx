import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ numAPP }) => {
  return (
    <div className="w-full m-2 p-4 flex flex-row justify-between p-2 ">
      <div className="flex flex-row justify-between w-3/12 p-2 bg-white rounded-[8.08px] h-[60px] ">
        <div className="flex flex-col justify-between">
          <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
            Appartement
          </div>
          <div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
            {numAPP}
          </div>
        </div>
        <div className="bg-blue-400 w-[30px] rounded-[8.08px]">
          <FontAwesomeIcon icon={faHome} className="flex text-white justify-center ml-[5px] mt-[11px]" />
        </div>
      </div>

      <div className="flex flex-row justify-between w-3/12 p-2 bg-white rounded-[8.08px] h-[60px]">
        <div className="flex flex-col justify-between">
          <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
            Utilisateurs
          </div>
          <div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
            2
          </div>
        </div>
        <div className="bg-blue-400 w-[30px] rounded-[8.08px]">
          <FontAwesomeIcon icon={faUsers} className="text-white flex justify-center ml-[5px] mt-[11px]" />
        </div>
      </div>
      <div className="flex flex-row justify-between w-3/12 p-2 bg-white rounded-[8.08px] h-[60px]">
        <div className="flex flex-col justify-between">
          <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-300 font-semibold text-[16.2px]">
            Total argent
          </div>
          <div className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px]">
            2
          </div>
        </div>
        <div className="w-[30px] bg-blue-400 rounded-[8.08px]">
          <FontAwesomeIcon icon={faMoneyBillAlt} className="text-white flex justify-center ml-[5px] mt-[11px]" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
