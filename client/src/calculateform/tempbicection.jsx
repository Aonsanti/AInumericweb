import { useState } from "react";
import "./Bisection.css";

export default function Bisection() {
    const [fx , setFx] = useState("");
    const [xl , setXl] = useState();
    const [xr , setXr] = useState();
    const [error , setError] = useState();

  return (
    <div className="Formcontainer">
      <div className="nameHeader">
        <div>Function f(x)</div>
        <div>Lower bound (xL)</div>
        <div>Upper bound (xR)</div>
        <div>Tolerance (Error)</div>
      </div>
      <div className="data">
        <input placeholder="Function" value={fx} onChange={(e) => setFx(e.target.value)}></input>
        <input placeholder="Value of XL" value={xl} onChange={(e) => setXl(e.target.value)}></input>
        <input placeholder="Value of XR" value={xr} onChange={(e) => setXr(e.target.value)}></input>
        <input placeholder="Error you can accept" value={error} onChange={(e) => setError(e.target.value)}></input>
      </div>
      <button onSubmit={console.log("Test")}>Confirm</button>
    </div>
  );
}
