import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession } from '../Utils/Common';
 
function Dashboard(props) {
  const navigate = useNavigate();
 
  /*const handleLogout = () => { 
    removeUserSession();
    navigate('/login');  
       <input className="button" type="button" onClick={handleLogout} value="Logout" />   
  }*/

  return (
    <div>
      <h1>Welcome to your dashboard</h1><br /><br />
  
    </div>
  );
}
 
export default Dashboard;