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
      settableData(data.data.slice(3));
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
            {/* Replace image with text to avoid mulogo error */}
            Launchpad Leaderboard
          </h1>
        </div>
        <div className={style.searchContainer}>
          <input
            value={searchTearm}
            type="text"
            onChange={(e) => setsearchTearm(e.target.value)}
            placeholder="search"
            className={style.searchInput}
          />
          <button
            onClick={handleSearch}
            className={style.searchButton}
          >
            Search
          </button>
        </div>
        <div className={style.cardsContainer}>
          {topThree.map((user, index) => (
            <Card
              img={user.profile_pic}
              key={index}
              full_name={user.full_name}
              email={user.muid}
              karma={user.karma}
              rank={index + 1}
              org={user.org}
              district_name={user.district_name}
              muid={user.muid}
              is_public={user.is_public}
            />
          ))}
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
