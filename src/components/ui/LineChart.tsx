import { FunctionComponent, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const LineChart: FunctionComponent<{
  data: any[];
  loading?: boolean;
}> = ({ data, loading }) => {
  const [option, setOption] = useState({});

  useEffect(() => {
    setOption({
      title: { text: "Line / bar chart" },
      tooltip: { trigger: "axis" },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: { feature: { saveAsImage: {} } },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data?.map((item) => item?.gene),
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "exper_rep1",
          type: "bar",
          data: data?.map((item) => item?.exper_rep1),
        },
        {
          name: "exper_rep2",
          type: "line",
          data: data?.map((item) => item?.exper_rep2),
        },
        {
          name: "exper_rep3",
          type: "bar",
          data: data?.map((item) => item?.exper_rep3),
        },
        {
          name: "control_rep1",
          type: "bar",
          data: data?.map((item) => item?.control_rep1),
        },
        {
          name: "control_rep2",
          type: "line",
          data: data?.map((item) => item?.control_rep2),
        },
        {
          name: "control_rep3",
          type: "line",
          data: data?.map((item) => item?.control_rep3),
        },
      ],
    });
  }, [data]);
  return (
    <div className="w-full border border-stone-200 rounded-md p-4">
      {loading ? (
        <div className="animate-pulse w-full h-full rounded-md" />
      ) : data?.length == 0 ? (
        <span className="font-medium text-xs text-stone-600">
          Enter valid ids to display data
        </span>
      ) : (
        <ReactECharts option={option} notMerge={true} />
      )}
    </div>
  );
};

export default LineChart;
