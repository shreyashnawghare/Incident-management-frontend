 import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import env from "../../Settings";
import ReactPaginate from "react-paginate";
import Select from 'react-select';

function Incidents() {
  const [IncidentsList, setIncidentsList] = useState();
  const [pageCount, setpageCount] = useState(0);
  const [dateFiltered,setDateFiltered] = useState(null);
  const [dateSelected,setDateSelected] = useState(null);
  const [typeFiltered,setTypeFiltered] = useState(null);
  const [typeSelected,setTypeSelected] = useState(null);

  const incidentTypes = [
    { value: 'All', label: 'All' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Serious', label: 'Serious' },
  ];

  const dateOptions = [
    { value: 'latest', label: 'Sort by latest Date ' },
    { value: 'oldest', label: 'Sort by oldest Date ' },
  ];

  const handleDelete = async (id) => {
    let delIndex = id;
    try {
      let token = JSON.parse(window.localStorage.getItem("details"));
      await axios.delete(`${env.api}/incident/delete`, delIndex, {
        headers: {
          Authorization: token.token,
        },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  const incidentsList = async () => {
    const res = await axios.get(
      `${env.api}/incident/incidents?page=1&size=10`
    );
    console.log(res.data.incidents);
    // const total = res.headers.get('x-total-count');
    // console.log(total);
    setpageCount(res.data.totalPages)
    setIncidentsList([...res.data.incidents]);
  };

  const handleTypeSelected = async (e) => {
    // alert( e.value);
    let typeFilter;
    setTypeSelected(e.value);
    if(e.value == "All") {
      typeFilter = IncidentsList;
    } else {
      typeFilter = IncidentsList.filter(item=> item.type ==  e.value );
    }
     
    // alert(typeFilter)
    setTypeFiltered(typeFilter)
    // setIncidentDetails(typeFilter)
  }

  const handleDateSelected = async (e) => {
    // alert( e.value);
    let DateFilter;
    setDateSelected(e.value);
    if(e.value == "All") {
      DateFilter = IncidentsList;
    } else if (e.value == "oldest")  {
      DateFilter = IncidentsList.reverse();
      setDateFiltered(DateFilter)
    }  
   
  }

  useEffect(() => {
    incidentsList();
    // console.log(IncidentsList);
  }, []);

  const fetchIncidents = async (currentPage) => {
    const res = await axios.get(
      `${env.api}/incident/incidents?page=${currentPage}&size=10`
    );
    const PaginatedData = res.data;
    console.log(PaginatedData)
    return PaginatedData;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;
    console.log(currentPage)

    const incidentsFromServer = await fetchIncidents(currentPage);

    setIncidentsList(incidentsFromServer.incidents);
  };
  return (
    <>
      <h1 class="h3 mb-2 text-gray-800">Incidents</h1>
      <p class="mb-4">An Admin Dashboard for Incident management system.</p>
  <div className="row" style={{padding:"1% 2%"}}>
        <div className="col-4">
          <div>
            <p>Filter by Incident Type</p>
          </div>
          <div>
          <Select
        defaultValue={typeSelected}
        onChange={(e)=>handleTypeSelected(e)}
        options={incidentTypes}
      />
          </div>
        </div>
        <div className="col-4">
          <div>
            <p>Sort by Date</p>
          </div>
          <div>
          <Select
        defaultValue={dateSelected}
        onChange={(e)=>handleDateSelected(e)}
        options={dateOptions}
      />
          </div>
        </div>
        <div className="col-4"></div>
      </div>
      <Link
        to="/create"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      >
        <i class="fas fa-download fa-sm text-white-50"></i> Create Incident
      </Link>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Incidents</h6>
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
                  <th>Ttile</th>
                  <th>Details</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Ttile</th>
                  <th>Details</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {dateFiltered ? dateFiltered.map((e,i)=>{
                  return (
                    <tr>
                    <td>{i + 1}</td>
                    <td>{e.title}</td>
                    <td>{e.desc}</td>
                    <td>{e.type}</td>
                    <td>{e.resolved ? "Resolved" : "Pending"}</td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                        <td>{new Date(e.updatedAt).toDateString()}</td>
                    <td>
                      <Link
                        to={`/assign/${e._id}`}
                        className="btn btn-primary"
                      >
                        Assign User
                      </Link>
                      <button
                        onClick={() => {
                          handleDelete(e._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  )}):typeFiltered ? typeFiltered.map((e,i)=>{
                    return (
                      <tr>
                      <td>{i + 1}</td>
                      <td>{e.title}</td>
                      <td>{e.desc}</td>
                      <td>{e.type}</td>
                      <td>{e.resolved ? "Resolved" : "Pending"}</td>
                      <td>{new Date(e.createdAt).toDateString()}</td>
                        <td>{new Date(e.updatedAt).toDateString()}</td>
                      <td>
                        <Link
                          to={`/assign/${e._id}`}
                          className="btn btn-primary"
                        >
                          Assign User
                        </Link>
                        <button
                          onClick={() => {
                            handleDelete(e._id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    )}):IncidentsList
                  ? IncidentsList.map((e, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{e.title}</td>
                          <td>{e.desc}</td>
                          <td>{e.type}</td>
                          <td>{e.resolved ? "Resolved" : "Pending"}</td>
                          <td>{new Date(e.createdAt).toDateString()}</td>
                        <td>{new Date(e.updatedAt).toDateString()}</td>
                          <td>
                            <Link
                              to={`/assign/${e._id}`}
                              className="btn btn-primary"
                            >
                              Assign User
                            </Link>
                            <button
                              onClick={() => {
                                handleDelete(e._id);
                              }}
                              className="btn btn-danger"
                            >
                              Delete
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
      <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item"}
          breakLinkClassName={"page-link"}
          breakClassName={"page-item"}
          activeClassName={"active"}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          // renderOnZeroPageCount={null}
        />
    </>
  );
}

export default Incidents;
