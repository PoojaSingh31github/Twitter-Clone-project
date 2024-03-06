import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RightSidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/findall'); // Replace with your API endpoint
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id} className="mb-2">
            {user.username}
          </li>
          // Adjust the property names based on your User model structure
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
