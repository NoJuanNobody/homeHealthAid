// PatientDashboard.js
import React from 'react';
import TaskForm from './TaskForm';

const PatientDashboard = () => {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <TaskForm userType="patient" />
      {/* Display existing tasks */}
    </div>
  );
};

export default PatientDashboard;