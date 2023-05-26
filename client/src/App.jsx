import { GlobalProvider } from "./Contexts/GlobalCtx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthCtx";
import RequireAuth from "./components/RequireAuth";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AccountsPage from "./pages/AccountsPage.jsx";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route element={<RequireAuth opposite={true} />}>
                <Route path="/login" element={<LoginPage />} />;
              </Route>
              <Route element={<RequireAuth />}>
                <Route path="/accounts" element={<AccountsPage />} />;
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
