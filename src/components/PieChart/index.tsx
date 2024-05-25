import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Options } from "highcharts";
import Spinner from "../Spinner";

const PieChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [chartOptionData, setChartOptionsData] = useState({});
  const [from, setFrom] = useState("");
  const [error, setError] = useState("");

  const fetchData = async (from: string) => {
    try {
      const response = await fetch(
        `https://api.carbonintensity.org.uk/generation/${from}/pt24h`
      );
      const data = await response.json();
      const generationData = data.data.generationmix.map((item: any) => ({
        name: item.fuel,
        y: item.perc,
      }));
      setChartOptionsData(generationData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const chartOptions: any = {
    chart: {
      type: "pie",
    },
    title: {
      text: "UK Energy Mix",
    },
    series: [
      {
        name: "Energy Source",
        colorByPoint: true,
        data: chartOptionData,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  useEffect(() => {
    if (from) {
      fetchData(from);
    }
  }, [from]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!from) {
      setError("Please enter a valid date.");
      return;
    }
    setLoading(true);
    fetchData(from);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <label
          htmlFor="from"
          className="block text-sm font-medium text-gray-700"
        >
          Enter a date (YYYY-MM-DDTHH:MMZ):
        </label>
        <input
          type="text"
          id="from"
          value={from}
          onChange={handleInputChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="YYYY-MM-DDTHH:MMZ"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fetch Data
        </button>
      </form>
      {loading ? (
        <Spinner />
      ) : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </div>
  );
};

export default PieChart;
