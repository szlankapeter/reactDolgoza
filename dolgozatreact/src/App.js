import { useEffect, useState } from 'react';
import axios from "./axios.js";
import './App.css';

function App() {

  const [bejegyzesek, setBejegyzesek] = useState([]);
  const [osztaly, setOsztaly] = useState(null);
  const [nev, setNev] = useState(null);
  useEffect(() => {
    const getBejegyzesek = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/bejegyzesek");
        setBejegyzesek(data);
      } catch (error) {
        console.error(error);
      }
    };



    getBejegyzesek();
    console.log(bejegyzesek);
  }, []);


  const ujBejegyzes = async () => {
    try {
      await axios.post("http://localhost:8000/api/bejegyzes", {
        tevekenyseg_id: 1,
        osztaly_id: osztaly,
        allapot: 0
      }
      );
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="App">
      <form>
        <select onChange={(e) => setOsztaly(e.target.value)} className="form-select" aria-label="Default select example">
          {bejegyzesek.map((bejegyzes, index) => (
            <option key={index} value={bejegyzes.osztaly_id}>{bejegyzes.osztaly_id}</option>
          ))}
        </select>
        <select onChange={(e) => setNev(e.target.value)} className="form-select" aria-label="Default select example">
          {bejegyzesek.map((bejegyzes, index) => (
            <option key={index} value={bejegyzes.nev}>{bejegyzes.nev}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={ujBejegyzes()}>Ok</button>
      </form>


      <table className="table table-hover">
        <thead className='table-dark'>
          <tr>
            <th scope="col">Osztály</th>
            <th scope="col">Tevékenység</th>
            <th scope="col">Pont</th>
            <th scope="col">Státusz</th>
          </tr>
        </thead>
        <tbody>
          {bejegyzesek.map((bejegyzes, index) => (
            <tr key={index}>
              <td>{bejegyzes.osztaly_id}</td>
              <td>{bejegyzes.nev}</td>
              <td>{bejegyzes.pontszam}</td>
              <td>{bejegyzes.allapot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
