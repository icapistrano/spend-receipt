import { useState } from "react";
import { ControlsPanel } from "../components/ControlsPanel";
import { ReceiptPreview } from "../components/Receipt/ReceiptPreview";

export type Category = {
  title: string;
  numCount: number;
  total: number;
  isChecked: boolean;
};

export const MainView = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <main className="flex items-center justify-center h-full">
      <ReceiptPreview categories={categories} />
      <ControlsPanel setRenderedCategories={setCategories} />
    </main>
  );
};
