import React, { useEffect, useState } from "react";
import axios from "axios";

const ExcelTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/files/data")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;

  if (data.length === 0) return <p>No data found</p>;

  // Get all keys to display table headers
  const headers = Object.keys(data[0]);

  return (
    <div>
      <h2>Excel Data</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            {headers.map((key, i) => (
              <th key={i}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {headers.map((key, i) => (
                <td key={i}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelTable;

