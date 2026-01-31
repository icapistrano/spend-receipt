export const Subheading: React.FC<{
  text: string;
}> = ({ text }) => {
  return (
    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
      {text}
    </h3>
  );
};
