import "./App.css";
import CalendarComponent from "./components/CalendarComponent";

function App() {
  return (
    <div className="app text-center flex flex-col items-center ">
      <h1 className="text-3xl mb-5">Calendar Application</h1>
      <CalendarComponent />
    </div>
  );
}

export default App;
