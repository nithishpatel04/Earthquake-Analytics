import { useEffect, useRef } from "react";
import type { EarthquakeRecord } from "../typescript/earthquake";

interface DataTableProps {
  data: EarthquakeRecord[];
  selectedId: string | null;
  onRowSelect: (id: string) => void;
  xAxisKey: keyof EarthquakeRecord;
  yAxisKey: keyof EarthquakeRecord;
}

export default function DataTable({
  data,
  selectedId,
  onRowSelect,
  xAxisKey,
  yAxisKey,
}: DataTableProps) {
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]) as (keyof EarthquakeRecord)[];
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  useEffect(() => {
    if (selectedId && rowRefs.current[selectedId]) {
      rowRefs.current[selectedId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId]);

  return (
    <div className="table-wrapper">
      <p style={{ margin: "0 0 10px 0", fontWeight: 600 }}>
        Showing {data.length} visible rows
      </p>

      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header) => {
              const isAxisHeader = header === xAxisKey || header === yAxisKey;

              return (
                <th
                  key={String(header)}
                  className={isAxisHeader ? "axis-header-cell" : ""}
                >
                  {String(header)}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => {
            const isSelectedRow = selectedId === row.id;

            return (
              <tr
                key={row.id}
                ref={(el) => {
                  rowRefs.current[row.id] = el;
                }}
                onClick={() => onRowSelect(row.id)}
                className={isSelectedRow ? "selected-row" : ""}
                style={{ cursor: "pointer" }}
              >
                {headers.map((header) => {
                  const isAxisCell = header === xAxisKey || header === yAxisKey;

                  const classNames = [
                    isAxisCell ? "axis-data-cell" : "",
                    isSelectedRow && isAxisCell ? "selected-axis-cell" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <td key={`${row.id}-${String(header)}`} className={classNames}>
                      {row[header] !== null && row[header] !== undefined
                        ? String(row[header])
                        : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}