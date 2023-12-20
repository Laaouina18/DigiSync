import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faChartBar, faUser,  faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import {useNavigate} from "react-router-dom";

const Sidebar = () => {
	const navigate=useNavigate();
	const logout =()=>{
		if(window.confirm("vous voulez deconnecter")){
     localStorage.removeItem('user');
	 navigate('/login');}
	}
  const location = useLocation();
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between">
        <Link
          to="/dashboardclient"
          className={`m-4 flex flex-row rounded-[8.08px] w-full h-[32px] ${location.pathname === "/dashboardclient" ? "bg-white" : ""}`}
        >
          <div className={`${location.pathname === "/dashboardclient" ? "bg-blue-600" : "bg-white"}
 rounded-[8.08px]`}>
            <FontAwesomeIcon icon={faChartBar} className= {`flex justify-center p-2 w-[30px]${location.pathname==="/dashboardclient"?"text-white":"text-blue-600"}`} />
          </div>
          <div className={`  font-family:'Poppings-SemiBold',Helvetica] ${location.pathname === "/dashboardclient" ? "font-semibold" : "text-gray-400"} text-[16.2px] ml-4 flex justify-center `}>
            Dashboard
          </div>
        </Link>

        <Link to="/dashboard" className={`m-4 flex flex-row rounded-[8.08px] w-full h-[32px] ${location.pathname === "/dashboard" ? "lg:bg-white" : ""}`}>
          <div className={`${location.pathname === "/dashboard" ? "bg-blue-600" : "bg-white"}
 rounded-[8.08px]`}>
            <FontAwesomeIcon icon={faHome} className=" flex justify-center p-2 w-[30px]" />
          </div>
          <div className={`  text-[16.2px] font-family:'Poppings-SemiBold',Helvetica] ${location.pathname==="dashboard"? "font-semibold" : "text-gray-400"}text-[16.2px] w-[63px] ml-4`}>
            Appartements
          </div>
        </Link>
      </div>

      <div>
        <h1 className="font-family:'Poppings-SemiBold',Helvetica] font-semibold text-[16.2px] ml-4 mt-8  ">ACCOUNT PAGES</h1>
        <div className="flex flex-col">
          <div className="m-4 flex flex-row rounded-[15px] w-[255px] h-[32px]">
            <div className="bg-white rounded-[8.08px]">
              <FontAwesomeIcon icon={faUser} className="w-[30px] text-blue-600 flex justify-center p-2" />
            </div>
            <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-400 text-[16.2px] w-[63px] ml-4  ">Profile</div>
          </div>

          <div className="m-4 flex flex-row rounded-[15px] w-[255px] h-[32px]" onClick={logout}>
  <div className="bg-white rounded-[8.08px]">
    <FontAwesomeIcon icon={faSignOutAlt} className="w-[30px] text-blue-600 flex justify-center p-2" />
  </div>
  <div className="font-family:'Poppings-SemiBold',Helvetica] text-gray-400 text-[16.2px] ml-4">Logout</div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
