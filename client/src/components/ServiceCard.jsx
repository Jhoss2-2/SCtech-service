export default function ServiceCard({ service, onDelete }) {
  return (
    <div className="card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p>S/. {service.price}</p>
      <button className="btn btn-delete" onClick={() => onDelete(service.id)}>
        Eliminar
      </button>
    </div>
  );
}
