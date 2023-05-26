import { useContext, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalCtx";
import { AuthCtx } from "../Contexts/AuthCtx";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addMsg } = useContext(GlobalContext);
  const { setAuthState } = useContext(AuthCtx);
  const [setLoginRequestCallback] = useLogin(addMsg, setAuthState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoginRequestCallback({ email, password });
      setEmail("");
      setPassword("");
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="login-page">
      <div className="main">
        <h2>Login</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input onChange={handleEmailInput} id="email" required type="email" value={email} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input onChange={handlePasswordInput} id="password" required type="password" value={password} />
            </div>
            <button className="primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
