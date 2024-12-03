import { useRef, useEffect, useState } from "react";

export default function useChartGradient(topColor, bottomColor, height = 400) {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, topColor); // Top color
      gradient.addColorStop(1, bottomColor); // Bottom color
      setGradient(gradient);
    }
  }, [topColor, bottomColor, height]);

  return { gradient, chartRef };
}