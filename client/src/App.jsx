// import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import History from './components/History'
import Bisection from './calculateform/Bisection'
import FaslePosition from './calculateform/FaslePosition'
import GaussianElimination from './calculateform/GaussianElimination'
import LUDecomposition from './calculateform/LUDecomposition'
import MatrixInverse from './calculateform/MatrixInverse'
import Graph from './calculateform/Graph'

import {Routes , Route , HashRouter} from 'react-router-dom'

function App() {
  return (
    <>
      <HashRouter>
        <Header/>
        <Routes>
          <Route path="/bisection" element={<Bisection />} />
          <Route path="/false-position" element={<FaslePosition />} />
          <Route path="/gaussian-elimination" element={<GaussianElimination />} />
          <Route path="/lu-decomposition" element={<LUDecomposition />} />
          <Route path="/matrix-inverse" element={<MatrixInverse />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App
