import React from "react";

const Dashboard = props => {

  console.log("dashboard")
  console.log(props)

  return(
    <div>
      <div>
        <h1>Dashboard</h1>
        <h1>Status: {props.loggedInStatus}</h1>
        <h1>Todo</h1>

      </div>
    </div>


  );
};


export default Dashboard;
