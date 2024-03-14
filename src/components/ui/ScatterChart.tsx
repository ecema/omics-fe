import { FunctionComponent, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const ScatterChart: FunctionComponent<{
  data: any[];
  loading?: boolean;
}> = ({ data, loading }) => {
  const [option, setOption] = useState({});
  const [triggerRandomize, setTriggerRandomize] = useState(0);
  const handleTriggerRandomize = () => {
    setTriggerRandomize((prev) => prev + 1);
  };
  useEffect(() => {
    const randomTenNumber = new Array<number>(6);
    for (let i = 0; i < randomTenNumber.length; i++) {
      randomTenNumber[i] = Math.round(Math.random() * data.length);
    }
    const filteredData = data?.filter((item, i) => randomTenNumber.includes(i));
    const filteredDataLength = filteredData.length;
    const [series, singleAxis]: [any[], any[]] = [[], []];
    filteredData?.forEach((item, index) => {
      singleAxis.push({
        right: 80,
        type: "category",
        boundaryGap: false,
        name: item?.gene,
        data: ["e_rep1", "e_rep2", "e_rep3", "c_rep1", "c_rep2", "c_rep3"],
        top: (index * 100) / filteredDataLength + "%",
        height: 100 / filteredDataLength - 10 + "%",
        axisLabel: {
          position: "left",
          interval: 0,
        },
      });
      series.push({
        singleAxisIndex: index,
        coordinateSystem: "singleAxis",
        type: "scatter",
        data: [
          item?.exper_rep1,
          item?.exper_rep2,
          item?.exper_rep3,
          item?.control_rep1,
          item?.control_rep2,
          item?.control_rep3,
        ],
        symbolSize: function (dataItem: any) {
          return dataItem ? Math.log(dataItem) * 3 : 0;
        },
      });
    });
    setOption({
      tooltip: { position: "top" },
      singleAxis: singleAxis,
      series: series,
    });
  }, [data, triggerRandomize]);
  return (
    <div className="w-full border border-stone-200 rounded-md p-4">
      {loading ? (
        <div className="animate-pulse w-full h-full rounded-md bg-gray-100" />
      ) : data?.length == 0 ? (
        <span className="font-medium text-xs text-stone-600">
          Enter valid ids to display data
        </span>
      ) : (
        <>
          <div className="w-full flex items-center justify-between px-2">
            <span className="text-xl font-semibold text-stone-700">
              Scatter chart <span className="text-sm">(ln(x)*3)</span>
            </span>
            <button
              className="relative z-30 bg-white h-10 rounded-md border border-stone-200 hover:border-stone-400 px-3 text-stone-700 text-sm"
              onClick={handleTriggerRandomize}
            >
              Click to get new gene values
            </button>
          </div>
          <ReactECharts option={option} notMerge={true} />
        </>
      )}
    </div>
  );
};

export default ScatterChart;
