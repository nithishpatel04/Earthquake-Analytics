import { useMemo, useState } from "react";
import DataTable from "./components/datatable";
import EarthquakeScatterChart from "./components/scatterchart";
import { useEarthquakeData } from "./hooks/earthquakedata";
import type { EarthquakeRecord } from "./typescript/earthquake";

export default function App() {
  const { data, loading, error } = useEarthquakeData();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [xAxisKey, setXAxisKey] = useState<keyof EarthquakeRecord>("longitude");
  const [yAxisKey, setYAxisKey] = useState<keyof EarthquakeRecord>("latitude");

  const visibleData = useMemo(() => {
    return data.slice(0, 100);
  }, [data]);

  const selectedRecord = useMemo(() => {
    return visibleData.find((row) => row.id === selectedId) || null;
  }, [visibleData, selectedId]);

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="page-title">Earthquake-Insight</h1>
        <p className="page-subtitle">
          Earthquake data visualization and table view
        </p>
      </div>

      {!loading && !error && (
        <div className="summary-card">
          <strong>Visible records:</strong> {visibleData.length} of {data.length}
          {" | "}
          <strong>X-Axis:</strong> {String(xAxisKey)}
          {" | "}
          <strong>Y-Axis:</strong> {String(yAxisKey)}
          {selectedRecord && (
            <>
              {" | "}
              <strong>Selected:</strong> {selectedRecord.place}
            </>
          )}
        </div>
      )}

      <div className="main-grid">
        <div className="panel">
          <h2 className="section-title">Scatter Plot</h2>

          {loading && <p className="status-text">Loading earthquake data...</p>}
          {error && <p className="status-text error-text">{error}</p>}
          {!loading && !error && (
            <EarthquakeScatterChart
              data={visibleData}
              selectedId={selectedId}
              onPointSelect={setSelectedId}
              xAxisKey={xAxisKey}
              yAxisKey={yAxisKey}
              setXAxisKey={setXAxisKey}
              setYAxisKey={setYAxisKey}
            />
          )}
        </div>

        <div className="panel">
          <h2 className="section-title">Data Table</h2>

          {loading && <p className="status-text">Loading earthquake data...</p>}
          {error && <p className="status-text error-text">{error}</p>}
          {!loading && !error && (
            <DataTable
              data={visibleData}
              selectedId={selectedId}
              onRowSelect={setSelectedId}
              xAxisKey={xAxisKey}
              yAxisKey={yAxisKey}
            />
          )}
        </div>
      </div>
    </div>
  );
}