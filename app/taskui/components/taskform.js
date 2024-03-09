// TaskForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = ({ userType }) => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Task created successfully');
      } else {
        // Handle error (e.g., show an error message)
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Task Name:</label>
      <input {...register('taskName')} />

      <label>Due Date:</label>
      <DatePicker
        selected={new Date()}
        onChange={(date) => setValue('dueDate', date)}
      />

      {userType === 'admin' && (
        <div>
          <label>Recurring:</label>
          <input type="checkbox" {...register('recurring')} />
        </div>
      )}

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;