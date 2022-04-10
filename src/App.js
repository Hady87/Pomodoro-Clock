import MainComponent from "./components/MainComponent";
import { ClockCProvider } from "./context/ClockContext";

function App() {
  return (
    <>
      <ClockCProvider>
        <MainComponent />
      </ClockCProvider>
    </>
  );
}

export default App;
