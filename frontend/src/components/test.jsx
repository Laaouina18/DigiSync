import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons';

// Import your components
import Sidebar from './Sidebar';
import Cart from './Cart';
import Appartement from './Appartement';
import Form from './Form';

const YourComponent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col p-4 xl:w-full lg:w-full h-screen bg-gray-100">
      <div className="p-4">
        <img className="p-5 w-[200px]" src={logo} alt="Logo" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[20% 80%] lg:grid-cols-[20% 80%] gap-4">
        <Sidebar />
        <div className="flex flex-col p-4">
          <Cart numAPP={Apps.length} />
          <Appartement handlClick={() => setStatus(true)} supprimer={supprimer} update={handleupdate} />
        </div>
        <Form type={type} update={update} status={status} clear={Clear} setStatus={setStatus} formData={FormData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default YourComponent;
