import { useState } from 'react';
import axios from 'axios';

export default function InsertarRegistro() {
  // 1) define el estado y su setter
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null);

  // 2) Captura el fichero cuando el usuario lo selecciona
  const handleFileChange = e => {
    setImagen(e.target.files[0])
  }

  // 3) al enviar, usa los valores del estado
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const crearRes = await axios.post('/api/crear', { titulo, contenido });
      const id = crearRes.data.articulo._id

      if (!id) throw new Error('No se obtuvo el ID')
      // 3b) Si hay imagen, prepara FormData y súbela a /api/subir-imagen/:id
      if (imagen && id) {
        
        const formData = new FormData()
        formData.append('file0', imagen)

        console.log(imagen)
        const imgName = await axios.post(
          `/api/subir-imagen/${id}`,
          formData
        )
        let imgUrl = imgName.data.files.filename;console.log(imgUrl)

        await axios.put(`/api/actualizar/${id}`, {titulo, contenido, imgUrl})
      }
      alert('Registrado con éxito');
      // opcional: limpiar formulario
      setTitulo('');
      setContenido('');
      setImagen(null)
    } catch (err) {
      console.error(err);
      alert('Error al registrar');
    }
  };

  return (
    <section>
      <h2>Insertar registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="insert-titulo">Título:</label><br />
          <input
            type="text"
            id="insert-titulo"
            name="titulo"
            placeholder="Ingresa el título"
            required
            value={titulo}                    // 3) valor controlado
            onChange={e => setTitulo(e.target.value)}  // 4) actualiza el estado
          />
        </div>
        <div>
          <label htmlFor="insert-contenido">Contenido:</label><br />
          <textarea
            id="insert-contenido"
            name="contenido"
            placeholder="Escribe el contenido"
            rows="4"
            required
            value={contenido}                        // valor controlado
            onChange={e => setContenido(e.target.value)}  // actualiza el estado
          />
        </div>
        <div>
          <label htmlFor="insert-imagen">Imagen:</label><br />
          <input
            type="file"
            id="insert-imagen"
            name="file0"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Insertar</button>
      </form>
    </section>
  );
}
