export const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-red-200 px-6 lg:px-10 py-3 z-10">
      <div className="flex items-center gap-4 text-[#1c0d10]">
        <div className="size-8 bg-red-500 rounded-lg flex items-center justify-center text-white">
          <span className="w-10 h-10"></span>
        </div>
        <h2 className="text-xl font-semibold font-ui">Spending Insights</h2>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            History
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Settings
          </a>
        </nav>
      </div>
    </header>
  );
};
