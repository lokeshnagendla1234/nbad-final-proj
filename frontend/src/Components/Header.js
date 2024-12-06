import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Utlis.js/UserContext';


function Header() {
  const {user,logout}=useUser();

  const navigate=useNavigate();
  const handleLogout=()=>{
    
    if(user){
       logout();
        navigate("/");
    }
  }

  return (
    <header className="w-full h-32  shadow-md bg-black bg-opacity-90 hover:cursor-pointer hover:shadow-lg  hover:border-b border-white flex items-center px-6 z-10 ">
    
      <h1 className="text-white text-2xl font-bold tracking-wide hover:text-orange-400">
        Generative AI Innovations
      </h1>

     
      <nav className="ml-auto mr-10">
        <ul className="flex space-x-6">
          <li className="text-white text-lg font-medium hover:text-orange-400 transition-all">
            <Link to="/dashboard"> Dashboard</Link>
            
          </li>
          <li className="text-white text-lg font-medium hover:text-orange-400 transition-all">
          <Link to="/summary"> Summary</Link>
          </li>
          <li className="text-white text-lg font-medium hover:text-orange-400 transition-all">
          <Link to="/report"> Report</Link>
          </li>
          <li className="text-white text-lg font-medium hover:text-orange-400 transition-all" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
