import InsertarRegistro from './components/crear';
import ActualizarCampos from './components/actualizar';
import EliminarCampo from './components/eliminar';
import Consultar from './components/consultar';
// client/src/App.jsx
import React from 'react';
import './App.css';      // ← aquí importas tu App.css

function App() {
  return (
    <div style={{ padding: 20 }} className="App">
      <InsertarRegistro />
      <ActualizarCampos />
      <EliminarCampo />
      <Consultar/>
    </div>
  );
}

export default App;
