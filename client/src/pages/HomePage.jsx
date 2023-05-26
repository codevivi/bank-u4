import Stats from "../components/Accounts/Stats";
import pig from "../assets/images/pig.svg";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { useContext } from "react";

function HomePage() {
  const { stats } = useContext(GlobalContext);

  return (
    <div className="home-page">
      <Stats stats={stats} />
      <img src={pig} alt="piggy bank" />
    </div>
  );
}

export default HomePage;
