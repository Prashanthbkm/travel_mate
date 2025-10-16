// TaskList.js
import React, { useState } from "react";

const TaskList = ({ tasks = [], upcomingTrips = [], onTaskUpdate }) => {
  const [taskList, setTaskList] = useState(tasks);

  const toggleTaskCompletion = async (id) => {
    try {
      // Update local state immediately for better UX
      setTaskList(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );

      // If you have a backend API for updating tasks, call it here
      // await updateTask(id, { completed: !task.completed });
      
      // Notify parent component about the update
      if (onTaskUpdate) {
        onTaskUpdate();
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Revert local state if API call fails
      setTaskList(tasks);
    }
  };

  return (
    <div className="task-list">
      <h2>Travel Tasks</h2>
      <ul className="tasks">
        {taskList.map(task => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() => toggleTaskCompletion(task.id)}
              className="task-checkbox"
            />
            <div className="task-content">
              <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                {task.title}
              </span>
              {task.trip && task.trip !== 'General' && (
                <div className="task-trip">For {task.trip} trip</div>
              )}
              {task.dueDate && (
                <div className="task-due">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {upcomingTrips.length > 0 ? (
        <div className="upcoming-trips">
          <h3>Upcoming Trips</h3>
          {upcomingTrips.map((trip, index) => (
            <div key={index} className="trip-item">
              <span className="trip-destination">{trip.destination}</span>
              <span className="trip-date">{trip.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-trips">
          <p>No upcoming trips scheduled</p>
          <small>Start planning your next adventure!</small>
        </div>
      )}
    </div>
  );
};

export default TaskList;