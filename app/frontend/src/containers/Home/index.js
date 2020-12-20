import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main'

const Home = (props) => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container">
    <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Main/>
    <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Home;
