import React from "react";
import Menu from "./Menu"; 


const Base = ({
  title = "My title",
  description = "My description",
  className = " text-white p-4",
  children,
}) => (
  <div>
    <Menu/>
    <div className="container-fluid">
      <div className="jumbotron text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer  mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you have any questions feel free to reach out</h4>
        <button className="btn btn-warning btn-lg">Contact us</button>
      </div>
    </footer>
  </div>
);

export default Base;
