import { Header } from "./components/Header";
import { MainView } from "./pages/MainView";

function App() {
  return (
    <div className="relative flex mh-screen w-full flex-col overflow-x-hidden h-screen font-ui">
      {/* <Header /> */}
      <MainView />
    </div>
  );
}

export default App;
