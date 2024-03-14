import { LineChartIcon, Loader } from "lucide-react";
import React, { FunctionComponent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOmicAnalysisStart } from "../../redux/omic/omicSlice";
import { AppState } from "../../redux/store";

const DataTable: FunctionComponent<{
  columnList: string[];
  rowList: any[];
  loading?: boolean;
}> = ({ columnList, rowList, loading }) => {
  const dispatch = useDispatch();
  const omicState = useSelector((state: AppState) => state?.omicState);
  const { omicAnalysis, loadingAction } = omicState;

  const tableIdList = ["table-widget-header", "table-widget-body"];
  const handleScrollTable = (e: any) => {
    const currentId = tableIdList.find(
      (item) => !e?.target?.id?.includes(item)
    );
    currentId &&
      document?.getElementById(currentId)?.scrollTo({
        left: e.target.scrollLeft,
      });
  };

  const handleAnalyze = useCallback(
    (id: string) => () => {
      dispatch(getOmicAnalysisStart({ id }));
    },
    []
  );

  return (
    <div className="w-full border border-stone-200 rounded-md">
      <div className="h-12 border-b border-stone-200 p-3 font-medium text-xs text-stone-600 flex items-center">
        {loading && (
          <div className="animate-pulse h-full w-full bg-gray-100 rounded-md" />
        )}
        {!loading && columnList?.length == 0 && (
          <span>Enter valid ids to display data</span>
        )}
        {columnList?.length > 0 && (
          <div
            id="table-widget-header"
            onScroll={handleScrollTable}
            className="hidden sm:flex items-center overflow-scroll no-scrollbar gap-4"
          >
            <div className="flex-none w-32"></div>
            {columnList?.map((column) => (
              <span key={column} className="flex-none w-40 uppercase">
                {column}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="min-h-20 p-3 font-medium text-xs text-stone-400 flex flex-col gap-4">
        {loading &&
          [0, 1, 2, 3]?.map((item) => (
            <div
              key={item}
              className="animate-pulse h-8 w-full bg-gray-100 rounded-md"
            />
          ))}
        {!loading && rowList?.length == 0 && <span>No rows to display</span>}
        {rowList?.length > 0 && (
          <div
            id="table-widget-body"
            onScroll={handleScrollTable}
            className="sm:flex items-center overflow-scroll no-scrollbar"
          >
            <div className="flex flex-col gap-4 max-h-96 sm:max-h-72">
              {rowList?.map((row) => (
                <div
                  key={row?._id}
                  className="flex flex-col gap-4 sm:flex-row items-center border sm:border-none p-4 sm:p-0 border-stone-200 rounded-md"
                >
                  <button
                    onClick={handleAnalyze(row?._id)}
                    className="flex-none w-full sm:w-32 flex items-center justify-between rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 py-2 px-4"
                  >
                    Analyze data
                    {loadingAction ? (
                      <Loader size={14} className="animate-spin-slow" />
                    ) : (
                      <LineChartIcon size={14} />
                    )}
                  </button>
                  {columnList?.map((column) => (
                    <span
                      key={column}
                      className="inline-flex sm:inline flex-none w-full sm:w-40 truncate justify-between"
                    >
                      <span className="flex sm:hidden">{column}:</span>
                      {row[column]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {
        <div className="flex w-full items-center justify-between h-12 border-t border-stone-200 px-4 text-sm text-stone-600">
          Last analyzed gene: {omicAnalysis?.gene || "-"}
          <div className="flex items-center gap-2">
            <span className="">mean: {omicAnalysis?.mean}</span>|
            <span className="">meadian: {omicAnalysis?.median}</span>|
            <span className="">mode: {omicAnalysis?.mode}</span>
          </div>
        </div>
      }
    </div>
  );
};

export default DataTable;
