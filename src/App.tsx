import ProgressChart from "./components/custom/ProgressChart";

function App() {
  return (
    <>
      <div className="w-64 aspect-square shadow-md rounded-lg p-4">
        <ProgressChart
          color="red"
          max={200}
          value={36.5}
          strokeWidth={30}
          score
          threshold={200 / 2}
          showMax
        />
      </div>
    </>
  );
}

export default App;
