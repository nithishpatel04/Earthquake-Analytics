import type { EarthquakeRecord } from "../typescript/earthquake";

interface DataTableProps {
  data: EarthquakeRecord[];
}

export default function DataTable({ data }: DataTableProps) {
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]) as (keyof EarthquakeRecord)[];

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={String(header)}>{String(header)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => (
                <td key={`${row.id}-${String(header)}`}>
                  {row[header] !== null && row[header] !== undefined
                    ? String(row[header])
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}