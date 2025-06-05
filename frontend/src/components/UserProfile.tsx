
import React, { useState } from 'react';
import '../styles/UserProfile.css';

interface UserProfileProps {
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email }) => {
  const [open, setOpen] = useState(false);
  const initials = name.split(' ')[0][0].toUpperCase(); 

  const toggleDropdown = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.href = '/';
};

  return (
    <div className="user-profile-container">
      <div className="user-initials" onClick={toggleDropdown}>
        {initials}
      </div>
      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-circle">{initials}</div>
            <div>
              <div className="user-name">{name}</div>
              <div className="user-email">{email}</div>
            </div>
          </div>
          <hr />
          <ul className="user-menu">
            <li>Orders</li>
            <li>Favourites</li>
            <li>Settings</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
