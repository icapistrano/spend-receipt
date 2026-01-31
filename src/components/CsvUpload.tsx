import { useState } from "react";
import { Subheading } from "./Controls/Subheading";

export const CsvUpload: React.FC<{
  onUpload: (file: File | null) => void;
}> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (file: File | null) => {
    onUpload(file);
    setFile(file);
  };

  return (
    <section>
      <Subheading text="Data source" />
      <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-[#e8ced3] px-6 py-8 bg-background-light hover:border-primary transition-colors cursor-pointer group w-full max-w-md">
        {/* Icon */}
        <span className="material-symbols-outlined text-primary text-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-file-upload"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm0 9l-.09 .004l-.058 .007l-.118 .025l-.105 .035l-.113 .054l-.111 .071a1 1 0 0 0 -.112 .097l-2.5 2.5a1 1 0 0 0 0 1.414l.094 .083a1 1 0 0 0 1.32 -.083l.793 -.793v3.586a1 1 0 0 0 2 0v-3.585l.793 .792a1 1 0 0 0 1.414 -1.414l-2.5 -2.5l-.082 -.073l-.104 -.074l-.098 -.052l-.11 -.044l-.112 -.03l-.126 -.017z" />
            <path d="M19 7h-4l-.001 -4.001z" />
          </svg>
        </span>

        {/* Heading + instruction */}
        <div className="text-center">
          {!file && (
            <>
              <p className="text-sm font-bold">Upload Spending Data</p>
              <p className="text-xs text-gray-500 mt-1">
                Drag & drop your CSV file here, or click “Browse File”
              </p>
            </>
          )}
        </div>

        {/* File input / button */}
        {!file ? (
          <div className="flex items-center space-x-2 mt-2">
            <label
              htmlFor="file-upload"
              className="flex min-w-[120px] items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 cursor-pointer hover:bg-primary/90 transition-colors"
            >
              Browse File
            </label>
            <input
              id="file-upload"
              accept=".csv"
              type="file"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between w-full max-w-sm mt-2 bg-gray-100 px-3 py-2 rounded-lg">
            <span className="text-gray-700 text-sm truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => handleFile(null)}
              className="text-red-500 hover:text-red-700 text-xs font-bold ml-2"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
