// src/components/ActualizarCampos.jsx
import { useState } from 'react'
import axios from 'axios'

export default function ActualizarCampos() {
  // 1) Estado para id, título y nuevo contenido
  const [id, setId] = useState('')
  const [titulo, setTitulo] = useState('')
  const [nuevoContenido, setNuevoContenido] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (!id) {
      return alert('Debes indicar el ID del registro a actualizar')
    }

    try {
      // 2) Inyecta el ID en la URL y envía el body con lo que cambias
      await axios.put(`/api/actualizar/${id}`, {
        titulo,
        contenido: nuevoContenido,
      })
      alert('Actualizado correctamente')
      // 3) Opcional: limpiar formulario
      setId('')
      setTitulo('')
      setNuevoContenido('')
    } catch (err) {
        console.error('ERROR API:', err.response?.status, err.response?.data);
  alert('Error al actualizar: ' + (err.response?.data?.message || err.message));
    }
  }

  return (
    <section>
      <h2>Actualizar Campos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="update-id">ID del registro:</label><br />
          <input
            type="text"
            id="update-id"
            name="id"
            placeholder="Ej. 123"
            required
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="update-titulo">Título actual:</label><br />
          <input
            type="text"
            id="update-titulo"
            name="titulo"
            placeholder="Título a buscar"
            required
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="update-nuevo-contenido">Nuevo contenido:</label><br />
          <textarea
            id="update-nuevo-contenido"
            name="nuevo_contenido"
            placeholder="Escribe el nuevo contenido"
            rows="4"
            required
            value={nuevoContenido}
            onChange={e => setNuevoContenido(e.target.value)}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </section>
  )
}
