import { useEffect, useState } from "react";
import Papa from "papaparse";
import type { EarthquakeRecord } from "../typescript/earthquake";

const CSV_URL = "/all_month.csv";

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  const str = String(value).trim();
  if (str === "") return null;

  const num = Number(str);
  return isNaN(num) ? null : num;
}

export function useEarthquakeData() {
  const [data, setData] = useState<EarthquakeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(CSV_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch earthquake data");
        }

        const text = await res.text();

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data as Record<string, string>[];

            const parsed: EarthquakeRecord[] = rows.map((row, i) => ({
              id: row.id || String(i),
              time: row.time || "",
              place: row.place || "",
              mag: toNumber(row.mag),
              latitude: toNumber(row.latitude),
              longitude: toNumber(row.longitude),
              depth: toNumber(row.depth),
              ...Object.fromEntries(
                Object.entries(row).map(([key, value]) => {
                  const maybeNumber = toNumber(value);
                  return [key, maybeNumber !== null ? maybeNumber : value ?? ""];
                })
              ),
            }));

            setData(parsed);
            setLoading(false);
          },
          error: () => {
            setError("Failed to parse CSV data");
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}