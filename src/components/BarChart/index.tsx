import React, { useEffect, useCallback, useState } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Spinner from "../Spinner";

interface GenerationMix {
  fuel: string;
  perc: number;
}

interface ApiResponse {
  data: {
    from: string;
    to: string;
    generationmix: GenerationMix[];
  };
}

const BarChart: React.FC = () => {
  const [energyData, setEnergyData] = useState<GenerationMix[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.carbonintensity.org.uk/generation"
      );
      const data: ApiResponse = await response.json();
      const generationMix = data.data.generationmix;

      if (JSON.stringify(energyData) !== JSON.stringify(generationMix)) {
        setEnergyData(generationMix);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [energyData]);

  useEffect(() => {
    if (energyData.length === 0) {
      fetchData();
      setLoading(false);
    }
  }, [fetchData, energyData]);

  const categories = energyData.map((source: GenerationMix) => source.fuel);
  const data = energyData.map((source: GenerationMix) => source.perc);

  const chartOptions: Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Energy Mix",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: "Percentage",
      },
    },
    series: [
      {
        name: "Energy Mix",
        type: "column",
        data: data,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default BarChart;
