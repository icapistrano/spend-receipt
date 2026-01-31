import type { Category } from "../../pages/MainView";

export const ReceiptPreview: React.FC<{
  categories: Category[];
}> = ({ categories }) => {
  const totalSpending = categories
    .map((category) => category.total)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 overflow-y-auto bg-gray-50 h-full">
      <div className="receipt-paper receipt-edge p-8 flex flex-col gap-4 relative shadow-gray-500/50 shadow-2xl bg-white">
        {/* Receipt Header */}
        <div className="text-center space-y-2 border-b-2 border-dashed border-gray-300 pb-6">
          <p className="text-xl font-bold uppercase tracking-wider font-ui">
            Spend Receipt
          </p>
          <p className="text-xs text-gray-400">
            Your categorised spending, on a single receipt
          </p>
          <div>
            {/* <p className="text-xs text-gray-400">SPENDING SUMMARY</p> */}
            <p className="text-xs text-gray-400">OCT 01 - OCT 31</p>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="py-4 space-y-3 text-sm">
          {categories.map(({ title, numCount, total }) => (
            <div
              key={title}
              className="flex items-center justify-start gap-1 tracking-widest"
            >
              <span>{title}</span>
              <span className="text-gray-500 text-xs">({numCount}x)</span>
              <span className="ml-auto">{total}</span>
            </div>
          ))}
        </div>

        {/* Receipt Total */}
        <div className="border-t-2 border-dashed border-gray-300 pt-6 space-y-1">
          <div className="flex justify-between text-lg font-bold">
            <span>TOTAL SPEND</span>
            <span className="text-primary">£{totalSpending.toFixed(2)}</span>
          </div>
          <p className="text-[10px] text-center opacity-70 pt-4 italic">
            Thank you for tracking your finances with us.
          </p>
        </div>

        {/* Barcode / Footer */}
        <div className="mt-4 flex flex-col items-center gap-1 opacity-80">
          <div className="h-12 w-full bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px)]"></div>
          <p className="text-[9px]">00110100101110100011</p>
        </div>
      </div>
    </div>
  );
};
