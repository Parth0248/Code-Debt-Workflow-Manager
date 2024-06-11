import React, {useEffect, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CardList from './CardList';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TextBox from './TextBox';
import Filters from './Filters';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// TODO: @alice_wang: 15-07-2024 : 14 : Refactor the data fetching logic to use async/await : Not that urgent.
// TODO : @john_doe : 05/06/2024 : 30 : RefactorCode : Improve code readability
function App() {
  const [updateTask, setUpdateTask] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [tasks, setTasks] = useState(null);

  return (
    // <></>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <h1 style={{ fontSize: "5rem" }}>Daily TO-DO </h1>
        <h2>Let's plan your day</h2>
        <h3>Pending tasks: {pendingTasks}</h3>
        <TextBox />
        {/* <Filters /> */}
        <CardList pendingTasks = {pendingTasks} setPendingTasks = {setPendingTasks} />
      </div>  
    </ThemeProvider>
  );
}

export default App;
