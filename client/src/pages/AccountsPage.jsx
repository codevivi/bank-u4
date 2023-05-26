import Accounts from "../components/Accounts/Accounts.jsx";
import { AccountsProvider } from "../Contexts/AccountsCtx.jsx";

function AccountsPage() {
  return (
    <>
      <AccountsProvider>
        <Accounts />
      </AccountsProvider>
    </>
  );
}

export default AccountsPage;
