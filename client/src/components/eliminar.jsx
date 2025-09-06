import { useState } from 'react';
import axios from 'axios';

export function getId(id){
    document.getElementById("eliminar-id").value = id;
}
export default function EliminarCampo() {
    const [id, setId] = useState('');
    /*const handleCardClick = id =>{
        document.getElementById(eliminar-id).textContent;
    }*/
        
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.delete(`/api/borrar/${id}`,);
            alert('Eliminado');
            setId('');
        }
        catch (err) {
            console.error('ERROR API:', err.response?.status, err.response?.data);
            alert('Error al eliminar: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <section>
            <h2>Eliminar Campo</h2>
            <form onSubmit={handleSubmit}>


                <div>
                    <label htmlFor="eliminar-id">ID del registro:</label><br />
                    <input
                        type="text"
                        id="eliminar-id"
                        name="id"
                        placeholder="Ej. 123"
                        required
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                </div>
                <button type="submit">Eliminar</button>


            </form>
        </section>
    );
}
