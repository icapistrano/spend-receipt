import Papa from "papaparse";

export function parseCsv(text: string): string[][] {
  const result = Papa.parse<string[]>(text, {
    skipEmptyLines: true,
  });

  return result.data;
}
