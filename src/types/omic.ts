export interface Omic {
  _id: string;
  gene: string;
  transcript: string;
  exper_rep1: number;
  exper_rep2: number;
  exper_rep3: number;
  control_rep1: number;
  control_rep2: number;
  control_rep3: number;
}
export interface OmicAnalysis {
  gene: string;
  mean: number;
  median: number;
  mode: number;
}
export interface OmicState {
  omicList: Omic[];
  omicAnalysis: OmicAnalysis;
  loading: boolean;
  loadingAction: boolean;
  error: string;
}
