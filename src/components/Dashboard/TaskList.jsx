// TaskList.js (updated with travel tasks)
import React, { useState } from "react";

const initialTasks = [
  { id: 1, title: "Pack luggage for Paris trip", completed: false, trip: "Paris" },
  { id: 2, title: "Book Tokyo city tour", completed: true, trip: "Tokyo" },
  { id: 3, title: "Renew passport", completed: false, trip: "General" },
  { id: 4, title: "Buy travel adapter", completed: false, trip: "General" },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskCompletion = id => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
        Travel Tasks
      </h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              style={{ marginRight: "10px" }}
            />
            <div style={{ flex: 1 }}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#777" : "#333",
                }}
              >
                {task.title}
              </span>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {task.trip !== "General" && `For ${task.trip} trip`}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
        <span style={{ marginRight: "10px" }}>Upcoming: Paris (Jun 15)</span>
        <span>Tokyo (Sep 5)</span>
      </div>
    </div>
  );
};

export default TaskList;