import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import env from "../../Settings";

function AssignUser() {
  const location = useLocation();
  const [UsersList, setUsersList] = useState();
  const path = location.pathname.split("/")[2];
  const usersList = async () => {
    const res = await axios.get(`${env.api}/users/all`);
    console.log(res.data.users);
    setUsersList([...res.data.users]);
  };

  const handleAssignUser = async (id) => {
    alert(id);
    let data = {
      path,
      id,
    };
    let token = JSON.parse(window.localStorage.getItem("details"));
    try {
      const res = await axios.post(`${env.api}/incident/assign-user`, data, {
        headers: {
          Authorization: token.token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    usersList();
    console.log(UsersList);
  }, []);
  return (
    <>
      <h1 class="h3 mb-2 text-gray-800">Incidents</h1>
      <p class="mb-4">An Admin Dashboard for Incident management system.</p>

      <Link
        to="/create"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      >
        <i class="fas fa-download fa-sm text-white-50"></i> Assign User
      </Link>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Users</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>Incidents</th>
                  <th></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>Incidents</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                {UsersList
                  ? UsersList.map((e, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{e.username}</td>
                          <td>{e.incidents.length}</td>
                          <td>
                            <button
                              onClick={() => {
                                handleAssignUser(e._id);
                              }}
                              className="btn btn-warning"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignUser;
