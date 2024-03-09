// AdminDashboard.js
import React from 'react';
import TaskForm from './TaskForm';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <TaskForm userType="admin" />
      {/* Display existing tasks */}
    </div>
  );
};

export default AdminDashboard;