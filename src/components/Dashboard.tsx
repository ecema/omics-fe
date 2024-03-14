import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundryPlaceholder from "./ui/ErrorBoundryPlaceholder";
import { getOmicListStart } from "../redux/omic/omicSlice";
import DataTable from "./ui/DataTable";
import { Info } from "lucide-react";
import LineChart from "./ui/LineChart";
import ScatterChart from "./ui/ScatterChart";

const Dashboard: FunctionComponent = () => {
  const dispatch = useDispatch();
  const omicState = useSelector((state: AppState) => state?.omicState);
  const { omicList, loading, error } = omicState;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [displayError, setDisplayError] = useState(false);

  const handleGetOmicList = () => {
    const geneList = inputRef?.current?.value;
    dispatch(getOmicListStart({ geneList: geneList.toString() }));
  };

  const [columnList, rowList]: [string[], any[]] = useMemo(() => {
    return !omicList || omicList?.length == 0
      ? [[], []]
      : [Object.keys(omicList[0])?.filter((key) => key != "_id"), omicList];
  }, [omicList]);

  useEffect(() => {
    handleGetOmicList();
  }, []);

  useEffect(() => {
    if (error?.length) {
      setDisplayError(true);
      setTimeout(() => setDisplayError(false), 2500);
    }
  }, [error]);

  return (
    <ErrorBoundary fallback={<ErrorBoundryPlaceholder />}>
      <main className="w-full flex flex-col gap-4 pb-12">
        <h1 className="text-xl font-bold uppercase text-rose-800">
          Omics Data
        </h1>
        {displayError && error && (
          <span className="absolute right-12 font-medium bg-rose-700 rounded-md text-white p-2 text-sm flex items-center gap-1">
            {error}
            <Info size={14} className="rotate-180" />
          </span>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            ref={inputRef}
            className="border border-stone-200 focus-within:border-stone-400 h-10 rounded-md px-3 sm:flex-1 placeholder:text-stone-400 text-sm"
            placeholder="Leave empty to retrieve all data OR Enter genes as following format: #gene1, #gene2"
          />
          <button
            className="h-10 rounded-md border border-stone-200 hover:border-stone-400 px-3 text-stone-700 text-sm"
            onClick={handleGetOmicList}
          >
            Get data
          </button>
        </div>
        <span className="text-stone-400 text-sm -mt-2 flex items-center gap-1">
          <Info size={14} />
          Example genes: 9530026P05Rik, Racgap1, Elf1, Olfr823, Phyh, Gm20604
        </span>
        <DataTable
          rowList={rowList}
          columnList={columnList}
          loading={loading}
        />
        <div className="grid grid-cols-2 gap-4">
          <LineChart data={rowList} loading={loading} />
          <ScatterChart data={rowList} loading={loading} />
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default Dashboard;
