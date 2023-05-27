import PublicStats from "../components/PublicStats";
import pig from "../assets/images/pig.svg";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { useContext } from "react";

function HomePage() {
  const { publicStats } = useContext(GlobalContext);

  return (
    <div className="home-page">
      <PublicStats stats={publicStats} />
      <img src={pig} alt="piggy bank" />
    </div>
  );
}

export default HomePage;
