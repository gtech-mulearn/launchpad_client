import style from "./styles.module.css";
import toast, { Toaster } from "react-hot-toast";

const Table = ({ data }) => {
  const headers = ["Rank", "Name", "IG", "MUID", "Karma", " "];
  const notify = () =>
    toast("This profile is private", {
      position: "bottom-center",
      style: {
        background: "#EF7E28",
        color: "white",
      },
    });

  return (
    <div className="w-full flex justify-center items-center">
      <div className={`${style.tableContainer}`}>
        <table className={`${style.leaderboard} rounded-lg overflow-x-scroll`}>
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
            {data.map((user, index) => (
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
                  className={`${style.data_cell}`}
                  onClick={() => {
                    if (user.is_public) {
                      window.open(
                        `https://app.mulearn.org/profile/${user.muid}`,
                        "_blank"
                      );
                    } else {
                      notify();
                    }
                    console.log("redirect");
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
                <td className={`${style.data_cell}`}>
                  {user.karma > 1000
                    ? `${(user.karma / 1000).toFixed(1)}k `
                    : user.karma}
                  <span
                    className={
                      "font-sans font-bold text-xl pl-1 -translate-y-1 text-[#1B1A1E]"
                    }
                  >
                    ϰ
                  </span>
                </td>
                <td>
                  <button>Hire</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Toaster />
      </div>
    </div>
  );
};

export default Table;
