import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "./Task";

function AllTasks(props) {
  const [tasksData, setTasksData] = useState("");

  const getTasks = () => {
    axios
      .get("http://localhost:3000/tasks/all", { withCredentials: true })
      .then((response) => {
        setTasksData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompletedStatusChange = (completed, id) => {
    console.log(!completed);
    axios
      .put(
        "http://localhost:3000/tasks/completedStatus",
        {
          task: {
            completed: !completed,
            id: id,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTaskDelete = (id) => {
    const link = "http://localhost:3000/tasks/" + id;
    axios
      .delete(link, { withCredentials: true })
      .then((response) => {
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="col-md-9 ms-sm-auto main-content h-100 p-5">
      <h3 className="fw-bold">
        <i className="bi bi-star-fill star-icon"></i>
        {"   "}All
      </h3>
      <div className="py-2">
        {tasksData &&
          tasksData.map((task, key) => {
            return (
              <Task
                task={task}
                key={key}
                handleCompletedStatusChange={handleCompletedStatusChange}
                handleTaskDelete={handleTaskDelete}
              />
            );
          })}
      </div>
    </div>
  );
}

export default AllTasks;
