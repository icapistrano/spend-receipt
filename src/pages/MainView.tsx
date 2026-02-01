import { useState } from "react";
import { ControlsPanel } from "../components/ControlsPanel";
import { ReceiptPreview } from "../components/Receipt/ReceiptPreview";

export type Category = {
  title: string;
  numCount: number;
  total: number;
};

export type Metadata = {
  categories: Category[];
  dates: { start: string; end: string };
};

export const MainView = () => {
  const [metadata, setMetadata] = useState<Metadata>({
    categories: [],
    dates: { start: "", end: "" },
  });

  return (
    <main className="flex items-center justify-center h-full">
      <ReceiptPreview metadata={metadata} />
      <ControlsPanel setMetadata={setMetadata} />
    </main>
  );
};
