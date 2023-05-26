import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { AuthCtx } from "../Contexts/AuthCtx";

function useOnEveryPage() {
  const { deleteAllMsg } = useContext(GlobalContext);
  const { checkAuth } = useContext(AuthCtx);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    deleteAllMsg(); //delete all messages on page change
  }, [deleteAllMsg, location.pathname, checkAuth]);
}

export default useOnEveryPage;
