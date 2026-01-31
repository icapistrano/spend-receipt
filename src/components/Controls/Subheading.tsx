import type { ReactNode } from "react";

export const Subheading: React.FC<{
  text: string;
  action?: ReactNode;
}> = ({ text, action }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
        {text}
      </h3>
      {action}
    </div>
  );
};
