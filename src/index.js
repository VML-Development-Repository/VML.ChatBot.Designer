import React, { useState, StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button';
import axios from 'axios';
import Agent from './Agent';
import { APIURL } from './Config';
import Admin from './Admin';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get(`${APIURL}/api/flowcharts/flowcharts`)
      .then((res) => {
        console.log("Llegoooo")
        console.log(res.data[0].flowchart)
        localStorage.setItem('flowchart', JSON.stringify(res.data[0].flowchart))

        axios.get(`${APIURL}/api/flowcharts/flowchartLines`)
      .then((res) => {
        console.log("Llegoooo")
        localStorage.setItem('flowchartLines', res.data[0].flowchartLines)

        setCargando(false);
      });
        
      });

      
  }, [])

  console.clear();
  const [showAgent, setShowAgent] = useState(true);

  return (
    <>
    {
        cargando ? <h1>Cargando...</h1> : <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAgent(!showAgent)}
          >
            {showAgent ? 'Ver Admin' : 'Ver Agente'}
          </Button>
          <hr />
          {showAgent ? <Agent /> : <Admin />}
          {/* <Admin /> */}
          {/* <Agent /> */}
        </>
      }
    </>
  );
};

root.render(<App />);
