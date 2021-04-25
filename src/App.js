import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [page, setPage] = useState(1);
  const [jobsHistory, setjobsHistory] = useState([]);

  useEffect(() => {
    fetch(
      'http://localhost:8080/jobs-api/v1/jobs', {
        method: "GET"      
      }
    )
      .then(res => res.json())
      .then(response => {
        setjobsHistory(response.data);
        console.log(jobsHistory);
      })
      .catch(error => console.log(error));
  }, [page]);
  
  const formatTimestamp = (time) => {
    return new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(time);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {jobsHistory.map((job, index) => (
        <div key={index}>
          {job && (
            <>
              <div>
                <h2 style={{ textDecoration: "Underline" }}>
                  {job.title}
                </h2>
                <p>Salary: {job.salary} {job.symbolCurrency}</p>
                <p>Publication Date: {formatTimestamp(job.publicationDate)}</p>
              </div>
              <hr />
            </>
          )}
        </div>
      ))}
      </header>
    </div>
  );
}

export default App;
