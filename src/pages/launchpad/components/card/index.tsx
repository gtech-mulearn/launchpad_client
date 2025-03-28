import launchpad_logo from "../../assets/launchpad.png";
import badge from "../../assets/paunchpad_badge.png";
import style from "./style.module.css";
import toast, { Toaster } from "react-hot-toast";

function Card({
  img,
  full_name,
  email,
  karma,
  rank,
  org,
  district_name,
  is_public,
  muid,
}: CardProps) {
  const notify = () =>
    toast("This profile is private", {
      position: "bottom-center",
      style: {
        background: "#EF7E28",
        color: "white",
      },
    });

  return (
    <div
      onClick={() => {
        if (is_public) {
          window.open(`https://app.mulearn.org/profile/${muid}`, "_blank");
        } else {
          notify();
        }
        console.log("redirect");
      }}
      className={style.profileCard}
    >
      <div className={style.profileHeader}>
        <img
          src={badge}
          alt="badge"
          className={
            "absolute top-1/2 left-1/2 -translate-y-[25%] opacity-15 -z-10"
          }
        />
        <img
          src={img}
          alt="profile_pic"
          className={`${style.badge} rounded-full ring-2 ring-[#EF7E28]`}
        />
        <div className={style.profileInfo}>
          <h2 className={style.name}>{full_name}</h2>
          <p className={style.email}>{email}</p>
          <p className={style.college}>{org}</p>
          <p className={style.district}>{district_name} -District</p>
        </div>
        <div className={style.rank}>{rank}</div>
      </div>
      <div className={style.profileFooter}>
        <div className={`${style.karma}`}>
          <span className={style.karmaValue}>
            {karma > 1000 ? `${(karma / 1000).toFixed(1)}k ` : karma}
          </span>
          <span className={"font-sans font-bold text-xl pl-1 text-[#F4AA73]"}>
            ϰ
          </span>
        </div>
        <img
          src={launchpad_logo}
          alt="Launchpad Kerala"
          className={style.logo}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default Card;
