import { ChartConfig } from "./components/ui/chart";
import ProgressChart, { chartData } from "./components/ProgressChart";

function App() {
  const chartConfig: ChartConfig = {
    bestanden: {
      label: "Bestanden",
      color: "green",
    },
    geplant: {
      label: "Geplant",
      icon: undefined,
      color: "purple",
    },
    belegt: {
      label: "Belegt",
      color: "red",
    },
  };

  const chartData: chartData = [{ bestanden: 10, belegt: 35, geplant: 0 }];

  return (
    <>
      <div>
        <ProgressChart config={chartConfig} data={chartData} maxValue={135} />
      </div>
    </>
  );
}

export default App;
