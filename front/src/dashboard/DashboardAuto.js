// DashboardAutoPage.js

import React, { useState } from "react";
import Sidebar from "../components/SideNavigation";
import DashboardHome from "./Home"; // Check the import statement for DashboardHome
import PaymentPage from "./PaymentPage"; // Check the import statement for PaymentPage
import { FaBars } from "react-icons/fa";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51NRF6LBHkhDIYYSvZevZHSy53ptC51mLinwuQDIQnMxY2N0jHFHHPuHgJsGIy0Txk8FnK9MgWjv2Ntn1ASHZ7R0a00len8pfxq');

const DashboardAutoPage = () => {
  const [page, setPage] = useState("home");
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = () => {
    setToggled(!toggled);
  };
  
  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <Sidebar toggled={toggled} handleToggleSidebar={handleToggleSidebar} setPage={setPage}/>
      <div className="btn-toggle" onClick={handleToggleSidebar}>
        <FaBars />
      </div>
      <section>
     
        {page === "home" && <DashboardHome />}
        {page === "payment" && 
          <Elements stripe={stripePromise}>
            <PaymentPage />
          </Elements>
          
        }
      
      </section>
    </div>
  );
};

export default DashboardAutoPage;
