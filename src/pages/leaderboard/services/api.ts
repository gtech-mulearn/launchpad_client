import axios from "axios";

interface requestparams {
  perPage?: number;
  search?: string;
  pageIndex?: number;
}

export const getTableData = async (params?: requestparams) => {
  try {
    const response = await axios.get(
      "https://mulearn.org/api/v1/launchpad/task-completed-leaderboard/",
      {
        params,
      }
    );
    const data = await response.data.response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
//pageIndex=2&perPage=15
