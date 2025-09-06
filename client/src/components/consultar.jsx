// client/src/components/ListarRegistros.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import {getId} from './eliminar'
import './consultar.css'

export default function ListarRegistros() {
  const [registros, setRegistros] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  
    // Función que maneja el click y muestra el id
  const handleCardClick = id => {
    getId(id);
  }
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const res = await axios.get('/api/listar')
        // 1) Comprueba que la respuesta esté OK
        if (res.data.status !== 'success') {
          throw new Error('Error en el servidor')
        }
        // 2) Extrae el arreglo de `consulta`
        setRegistros(res.data.consulta)
      } catch (err) {
        setError(err.response?.data?.mensaje || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRegistros()
  }, [])

  if (loading) return <p>Cargando registros…</p>
  if (error)   return <p>Error: {error}</p>
  if (registros.length === 0) return <p>No hay registros para mostrar.</p>

  return (
    <section className="cards-container">
      {registros.map(reg => (
        <div key={reg._id} className="card" onClick={() => handleCardClick(reg._id)}>
          <h3 className="card-title">{reg.titulo}</h3>
          <div className='contenido'>
          <p className="card-content">{reg.contenido}</p>
          
          {reg.imgUrl && (  
            <img
              src={`http://localhost:3900/imagenes/articulos/${reg.imgUrl}`}
              alt={reg.titulo}
              className="card-img"
            />
          )}
          </div>
          <small className="card-date">
            {new Date(reg.fecha).toLocaleDateString()}
          </small>
        </div>
      ))}
    </section>
  )
}