import DataTable from "./components/datatable";
import { useEarthquakeData } from "./hooks/earthquakedata";

export default function App() {
  const { data, loading, error } = useEarthquakeData();

  return (
    <div className="app-container">
      <h1 className="page-title">QuakeInsight</h1>
      <p className="page-subtitle">Earthquake data table view</p>

      <div className="panel">
        {loading && <p className="status-text">Loading earthquake data...</p>}
        {error && <p className="status-text error-text">{error}</p>}
        {!loading && !error && <DataTable data={data} />}
      </div>
    </div>
  );
}