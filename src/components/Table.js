import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function TableComponent({ products }) {

  const [result, setresult] = useState([]);
  const [search, setsearch] = useState('');
  const [onchange,setOnchange] = useState(false);

  useEffect(() => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(search)
    );
    setresult(result);
  }, [search]);
  return (
    <div>
      <h1>Search</h1>
      <input
        onChange={(e) => {
            setsearch(e.target.value)
            setOnchange(true)
        }}
        value={search}
        type="text"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {onchange && result.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
            </tr>
          ))}
          {!onchange && products.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableComponent;
