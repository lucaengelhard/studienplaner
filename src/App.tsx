import ProgressChart, {
  ProgressChartData,
  ProgressChartGoal,
} from "./components/ProgressChart";

function App() {
  const data: ProgressChartData = [
    {
      name: "Belegt",
      color: "red",
      value: 36,
    },
  ];

  const goals: ProgressChartGoal[] = [
    { name: "Bachelor Zulassung", value: 120 },
    { name: "Minimum Abschluss", value: 135 },
  ];

  return (
    <>
      <ProgressChart size={300} stroke={20} data={data} goals={goals} />
    </>
  );
}

export default App;
