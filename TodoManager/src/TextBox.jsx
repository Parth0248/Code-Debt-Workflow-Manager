// // Mui text field component to input user's tasks and save them to the database
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function TextBox() {
  const [task, setTask] = useState("");
  const status = false; // default status is false, meaning the task is not completed
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the page from refreshing

    // Validate the task input
    if (!task) {
      alert("Task cannot be empty");
      return;
    }
/* TODO: @hank_wilson: 17-07-2024 : 4: Fix the memory leak issue in the file upload functionality.
* : Check for 2nd line comment for TODO. */

/* TODO: @hanky_lson:  09-08-2024 : 4: 
Fix the leak issue in the file upload : using 2nd line comment for TODO without leading star.
*/

    const newTask = { task, status }; // create a task object

    setIsPending(true);
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    }).then(() => {
      console.log("new task added");
      setIsPending(false);
      setTask(""); // Clear the input field after submission
    });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="standard-basic"
        label="What's on your mind?"
        variant="standard"
        style={{ width: "40%", paddingRight: "10px" }}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        // Check if the task is not empty
        
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />
      <Fab color="primary" aria-label="add" onClick={handleSubmit} disabled={isPending}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
