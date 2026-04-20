import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import ServiceForm from "../components/ServiceForm";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  const API = "http://localhost:3000/services";

  const getServices = async () => {
    const res = await axios.get(API);
    setServices(res.data);
  };

  const createService = async (data) => {
    await axios.post(API, data);
    getServices();
  };

  const deleteService = async (id) => {
    await axios.delete(`${API}/${id}`);
    getServices();
  };

  useEffect(() => {
    getServices();
  }, []);

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">Servicios</h1>
        <SearchBar setSearch={setSearch} />
        <ServiceForm onSave={createService} />
        <div className="grid">
          {filtered.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={deleteService}
            />
          ))}
        </div>
      </div>
    </>
  );
}
