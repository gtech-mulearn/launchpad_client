import React, { useState, useMemo } from "react";
import style from "./style.module.css";
import toast, { Toaster } from "react-hot-toast";
import ScrollArea from "../scroll-area";
import Search from "../search";

type dataProps = {
  district_name: string;
  full_name: string;
  is_public: boolean;
  karma: number;
  muid: string;
  org: string;
  profile_pic: string;
  rank: number;
  state: string;
};

type TableProps = {
  data: dataProps[];
  //   pagination: paginationProps;
};

const Table = ({ data }: TableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const headers = ["Rank", "Name", "MUID", "Karma", "Action"];
  
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    const query = searchQuery.toLowerCase().trim();
    return data.filter(
      (user) =>
        user.full_name.toLowerCase().includes(query) ||
        user.muid.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const notify = (message: string) =>
    toast(message, {
      position: "bottom-center",
      style: {
        background: "#EF7E28",
        color: "white",
      },
    });

  const handleContact = (user: dataProps) => {
    if (!user.is_public) {
      notify("Cannot contact private profile");
      return;
    }
    
    // In a real app, this would open a contact form or send an email
    notify(`Contacting ${user.full_name}...`);
  };

  return (
    <div className={style.tableWrapper}>
      <Search 
        onSearch={setSearchQuery}
        placeholder="Search by name or MUID..."
      />
      <div className={style.tableContainer}>
        {filteredData.length === 0 ? (
          <div className={style.noResults}>
            <p>No results found for "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery("")}
              className={style.resetButton}
            >
              Reset search
            </button>
          </div>
        ) : (
          <ScrollArea className={style.scrollArea}>
            <table className={style.leaderboard}>
              <thead>
                <tr className={style.header_row}>
                  {headers.map((header, index) => (
                    <th key={index} className={style.header_cell}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <tr key={index} className={style.data_row}>
                    <td style={{ fontSize: "1.2rem" }} className={style.data_cell}>
                      {user.rank}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "200px",
                        cursor: "pointer",
                      }}
                      className={style.data_cell}
                      onClick={() => {
                        if (user.is_public) {
                          window.open(
                            `https://app.mulearn.org/profile/${user.muid}`,
                            "_blank"
                          );
                        } else {
                          notify("This profile is private");
                        }
                      }}
                    >
                      <img
                        src={user.profile_pic}
                        alt="profile"
                        className={style.profile_pic}
                      />
                      {user.full_name}
                    </td>
                    <td className={style.data_cell}>{user.muid}</td>
                    <td className={style.data_cell}>
                      {user.karma > 1000
                        ? `${(user.karma / 1000).toFixed(1)}k `
                        : user.karma}
                      <span
                        className="font-sans font-bold text-xl pl-1 -translate-y-1 text-[#1B1A1E]"
                      >
                        ϰ
                      </span>
                    </td>
                    <td className={style.data_cell}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContact(user);
                        }}
                        className={`${style.contactButton} ${!user.is_public ? style.disabledButton : ''}`}
                        disabled={!user.is_public}
                        aria-label={`Contact ${user.full_name}`}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={style.buttonIcon}
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default Table;
