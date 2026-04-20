import { useState } from "react";

export default function ServiceForm({ onSave }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <div className="card">
      <input name="name" placeholder="Nombre" className="input" onChange={handleChange}/>
      <input name="description" placeholder="Descripción" className="input" onChange={handleChange}/>
      <input name="price" placeholder="Precio" className="input" onChange={handleChange}/>
      <button className="btn btn-edit" onClick={() => onSave(form)}>
        Guardar
      </button>
    </div>
  );
}
