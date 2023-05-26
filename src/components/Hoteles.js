import axios from "axios";
import { useState, useEffect } from "react";

function Hoteles() {
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotel");
      setHoteles(response.data);
    } catch (error) {
      console.error('Error al obtener los Hoteles:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, address, phone } = event.target.elements;

    try {
      await axios.post("http://localhost:3000/hotel", {
        name: name.value,
        address: address.value,
        phone: phone.value
      });
      fetchData();
      event.target.reset();
    } catch (error) {
      console.error('Error al enviar los datos del hotel:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/hotel/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar el hotel:', error);
    }
  };

  return (
    <div className="app">
      <div>
        <h2>Agregar Hotel</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="name" />
          </label>
          <label>
            Dirección:
            <input type="text" name="address" />
          </label>
          <label>
            Teléfono:
            <input type="text" name="phone" />
          </label>
          <button type="submit">Agregar</button>
        </form>
      </div>
      <div>
        <h2>Listado de Hoteles</h2>
        {hoteles.map((item) => (
          <div key={item.id}>
            <h3>Hotel: {item.name}</h3>
            <h3>Dirección: {item.address}</h3>
            <h3>Teléfono: {item.phone}</h3>
            <form onSubmit={() => handleDelete(item.id)}>
              <button type="submit">Eliminar</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hoteles;
