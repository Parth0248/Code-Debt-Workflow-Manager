import * as React from "react";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });
// TODO: @frank_miller : 25-07-2024 : 8 : Document the API endpoints with detailed examples : You got this Frank!

export default function Card({ id, task, status: initialStatus }) {
  if (id === "dbd7") {
    console.log(id, task, initialStatus);
  }
  const [status, setStatus] = React.useState(initialStatus);
  const [isPending, setIsPending] = React.useState(false);
  //   console.log("status", status)
  const handleCheckboxClick = () => {
    setIsPending(true);
    const updatedStatus = !status;

    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updatedStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task status");
        }
        return response.json();
      })
      .then(() => {
        console.log("Task status updated");
        setStatus(updatedStatus);
        setIsPending(false);
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        setIsPending(false);
      });
  };

  const handleDeleteClick = () => {
    setIsPending(true);

    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        return response.json();
      })
      .then(() => {
        console.log("Task deleted");
        setIsPending(false);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        setIsPending(false);
      });
  };

  const [toggle, setToggle] = React.useState(true);

  // Add edit functionality to the task

  const handleEditDoubleClick = () => {
    setToggle(!toggle);
  };

  const handleEditClick = (e) => {
    setIsPending(true);
    // Prompt the user to enter a new task
    // const updatedTask = prompt("Enter a new task", task);
    const updatedTask = e.target.value;
    if (!updatedTask) {
      setIsPending(false);
      return;
    }
    // Update the task
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: updatedTask }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
        return response.json();
      })
      .then(() => {
        console.log("Task updated");
        setIsPending(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        setIsPending(false);
      });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <div className="dispCard">
        <Item
          key={id}
          elevation={5}
          sx={{
            height: 75,
            lineHeight: "50px",
            textAlign: "left",
            color: "smoke",
            fontSize: 20,
            fontFamily: "Arial",
            padding: "10px",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={status}
              onClick={handleCheckboxClick}
              disabled={isPending}
            />

            { toggle ? (
              <span
                style={{ textDecoration: status ? "line-through" : "none" }}
                onDoubleClick={handleEditDoubleClick}
              >
                {task}{" "}
              </span>
            ) : (
              <TextField id="standard-basic" variant="standard" value={task}
              onChange={(e) => handleEditClick(e)}
              // Check if the task is not empty
              onClick={(e) => {
                if(e.target.value !== ""){
                    handleEditClick(e);
                    }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEditDoubleClick();
                }
              }}/>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Fab
              color="error"
              aria-label="delete"
              onClick={() => handleDeleteClick()}
            >
              <DeleteIcon />
            </Fab>
          </div>
        </Item>
      </div>
    </ThemeProvider>
  );
}

/*

setState({
    ...state,
    [changedId]:{
        ...state[changedId],
        status: !state[changedId].status

 }]
*/
