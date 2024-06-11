// display a list of cards with To-Do events input by user
import { useState, useEffect } from "react";
import Card from "./Card";
import Box from "@mui/material/Box";
import Filters from "./Filters";
import { StepperContext } from "@mui/material";

const CardList = ({ pendingTasks, setPendingTasks }) => {
  // console.log(pendingTasks);
    const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [allClick, setAllClick] = useState(false);



// TODO: @carol_johnson: 18-07-2024 : 7 : Optimize the database queries for performance. : You got this Carol!

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
        setError(null);
        const updatePendingTasks = data.filter((task) => task.status === false);
        // console.log(pendingTasks.length);
        setPendingTasks(updatePendingTasks.length);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }); // Is tasks correct here?
  // Set the status of the task to false when the task is clicked
  const handleDoneClick = () => {
    setDone(!done);
    setPending(false);
  };

  const handlePendingClick = () => {
    setPending(!pending);
    setDone(false);
  };

  async function handleAllClick() {
    setAllClick(!allClick);
    setPending(true);
    setDone(true);
    let newAllClick = !allClick;
    let newTasks = tasks.map((task) => ({
      ...task,
      status: newAllClick,
    }));

    try {
      await Promise.all(
        newTasks.map((element) =>
          fetch(`http://localhost:8000/tasks/${element.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newAllClick }),
          })
        )
      );
      /* TODO: @user2: 06-06-2024 : 5: Fix bug Y : Fix bug X after fixing Y */

    //   setTasks(newTasks);
    //   setAllClick(newAllClick);
      console.log(newTasks);
    } catch (error) {
      console.error("Failed to update tasks", error);
      // Handle errors if needed
    }
  }

  //     const handleAllClick = () => {
  //   setAllClick(!allClick);
  // //   setIsPending(true);
  // //   setPending(true);
  // //   setDone(true);

  //   // Fetch all tasks from the server
  //   fetch("http://localhost:8000/tasks")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch tasks");
  //       }
  //       return response.json();
  //     })
  //     .then((tasks) => {
  //       // Create an array of fetch requests to update each task's status
  //       const updatePromises = tasks.map((task) =>
  //         fetch(`http://localhost:8000/tasks/${task.id}`, {
  //           method: "PATCH",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ status: allClick }),
  //         })
  //       );

  //       // Wait for all fetch requests to complete
  //       return Promise.all(updatePromises);
  //     })
  //     .then(() => {
  //       console.log("All tasks updated");
  //       setIsPending(false);
  //       // Update the local state to reflect the changes
  //       setTasks((prevTasks) =>
  //         prevTasks.map((task) => ({ ...task, status: allClick }))
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error updating tasks:", error);
  //       setIsPending(false);
  //     });
  //     };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card-list">
      <Filters
        handleDoneClick={handleDoneClick}
        handlePendingClick={handlePendingClick}
        handleAllClick={handleAllClick}
      />

      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          display: "grid",
          gridTemplateColumns: { md: "1fr" },
          gap: 2,
          alignItems: "center", // Align items in the middle
          padding: "5px",
          marginLeft: "180px",
          marginRight: "180px",
          marginTop: "30px",
        }}
      >
        {!done &&
          !pending &&
          tasks &&
          tasks.map((task) => (
            <Card
              id={task.id}
              task={task.task}
              status={task.status}
              key={task.id}
            />
          ))}
        {done &&
          tasks &&
          tasks
            .filter((task) => task.status === true)
            .map((task) => (
              <Card
                id={task.id}
                task={task.task}
                status={task.status}
                key={task.id}
              />
            ))}
        {pending &&
          tasks &&
          tasks
            .filter((task) => task.status === false)
            .map((task) => (
              <Card
                id={task.id}
                task={task.task}
                status={task.status}
                key={task.id}
              />
            ))}
      </Box>
    </div>
  );
};

export default CardList;
