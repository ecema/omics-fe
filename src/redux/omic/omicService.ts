import axios from "axios";

export async function getOmicList(geneList: string): Promise<any> {
  return await axios.get(`http://localhost:3000/omic?geneList=${geneList}`);
}

export async function getOmicAnalysis(id: string): Promise<any> {
  return await axios.get(`http://localhost:3000/omic/${id}`);
}
