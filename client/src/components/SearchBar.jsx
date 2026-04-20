export default function SearchBar({ setSearch }) {
  return (
    <input
      className="input"
      placeholder="Buscar servicio..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
