"use client";

import { useState } from "react";

export default function Home() {
  const [tasks, settasks] = useState<any[]>([]);
  const [title, settile] = useState<string>("");

  async function addtask() {
    if (!title.trim()) {
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });

    const data = await res.json();

    settasks([...tasks, data.task]);
    settile("");
  }

  async function completedtask(id: number) {
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const updatedTask = await res.json();
    settasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  }

  async function deleteTask(id: number) {
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();

    console.log(data);

    settasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        value={title}
        onChange={(e) => settile(e.target.value)}
        placeholder="Enter task name..."
      />

      <button onClick={addtask}>Add</button>

      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => completedtask(item.id)}>
              {item.completed ? "Completed" : "Complete"}
            </button>

            <button onClick={() => deleteTask(item.id)}>
              Delete
            </button>
          </li>
          
        ))}
      </ul>
    </div>
  );
}