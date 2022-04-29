import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import env from "../../Settings";

function CreateIncident(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");

  const history = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    let userData = { title, desc, type };
let token = JSON.parse(window.localStorage.getItem("details"))
    const res = await axios.post(
      `${env.api}/incident/create`,
      userData,
      {
        headers: {
          Authorization:token.token ,
        },
      },
      
    );

    history("/");

    setTitle("");
    setDesc("");
    setType("");
  };

  return (
    <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Create Incident</h1>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Incident Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label>Details</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label>Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="col-lg-12">
              <input
                type="submit"
                value="submit"
                className="btn btn-primary mt-3 "
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateIncident;
