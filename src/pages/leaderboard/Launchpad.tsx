import React, { useEffect, useState } from "react";
import Card from "./components/card";
import Table from "./components/table";
// Comment out problematic import
// import mulogo from "../assets/mulogo.svg";
import { getTableData } from "./services/api";
import { TableContext } from "./context/tableContext";
import Pagination from "./components/pagination/Pagination";
import style from "./style.module.css";

// Define the missing interfaces
interface paginationProps {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface topthreeProps {
  profile_pic: string;
  full_name: string;
  muid: string;
  karma: number;
  org: string;
  district_name: string;
  is_public: boolean;
}

function Leaderboard() {
  const [tableData, settableData] = useState([]);
  const [paginationData, setpaginationData] = useState<paginationProps | {}>(
    {}
  );
  // const [inputValue, setInputValue] = useState("");
  const [topThree, settopThree] = useState<topthreeProps[] | []>([]);
  const [searchTearm, setsearchTearm] = useState("");
  useEffect(() => {
    getTableData({ perPage: 15 }).then((data) => {
      settableData(data.data);
      setpaginationData(data.pagination);
      settopThree(data.data.slice(0, 3));
    });
  }, []);
  // console.log("tableData", tableData);
  // console.log("top three", topThree);

  const handleSearch = async () => {
    const data = await getTableData({ search: searchTearm });
    settableData(data.data);
    setpaginationData(data.pagination);
  };

  return (
    <TableContext.Provider
      value={{
        tableData,
        settableData,
        paginationData,
        setpaginationData,
      }}
    >
      <div className={style.container}>
        <div className={style.titleContainer}>
          <h1 className={style.title}>
            <span className={style.titlePrefix}>
              <img 
                src="data:image/svg+xml,%3csvg%20width='82'%20height='103'%20viewBox='0%200%2082%20103'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M75.0727%2049.7626C77.7509%2049.3557%2080.252%2051.1969%2080.659%2053.8752L81.532%2059.6207C82.01%2062.7663%2079.8474%2065.7038%2076.7018%2066.1818L74.315%2066.5444C67.5797%2067.5679%2062.2546%2066.0813%2058.3397%2062.0848C54.9918%2068.4705%2048.9173%2072.332%2040.1165%2073.6693C39.1751%2073.8123%2038.2531%2073.9114%2037.3506%2073.9664C32.9216%2074.2365%2028.3769%2078.0387%2029.0435%2082.4256L30.9325%2094.8575C31.4105%2098.0031%2029.2479%20100.941%2026.1023%20101.419L20.1165%20102.328C16.9708%20102.806%2014.0333%20100.644%2013.5553%2097.498L0.966041%2014.6463C0.488064%2011.5007%202.65062%208.56321%205.79624%208.08523L11.7821%207.17568C14.9277%206.6977%2017.8652%208.86025%2018.3432%2012.0059L23.4104%2045.3537C24.0923%2049.8415%2025.8298%2053.1128%2028.6227%2055.1678C31.4157%2057.2228%2034.8328%2057.9432%2038.874%2057.3291C43.3642%2056.6468%2046.745%2054.7098%2049.0163%2051.518C51.2877%2048.3262%2052.0006%2043.9479%2051.155%2038.3831L46.4969%207.72792C46.019%204.5823%2048.1815%201.64479%2051.3271%201.16681L57.313%200.257259C60.4586%20-0.220718%2063.3961%201.94184%2063.8741%205.08746L70.1074%2046.1094C70.5438%2048.9815%2072.1989%2050.1993%2075.0727%2049.7626Z'%20fill='%23EF7E28'/%3e%3c/svg%3e" 
                alt="Launchpad logo" 
                style={{ 
                  height: '1em', 
                  marginRight: '0.2em',
                  verticalAlign: 'middle'
                }} 
              />
            </span>
            <span className={style.titleMain}>Launchpad</span>
            <span className={style.titleAccent}>Leaderboard</span>
            <div className={style.titleUnderline}></div>
          </h1>
        </div>
        
  
        <div className={style.fullWidth}>
          {tableData ? <Table data={tableData} /> : <h1>Loading...</h1>}
        </div>
        <div>
          <Pagination />
        </div>
      </div>
    </TableContext.Provider>
  );
}

export default Leaderboard;
