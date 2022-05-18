import { useRef, useState, useContext } from "react";
import { UserContext } from "../Context";

export const Login = () => {
  const formRef = useRef(null);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const userContext = useContext(UserContext);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "secret") {
      userContext.setNeedsLogin(false);
    }
  }
  return <div className="flex mx-auto">
    <form className="flex mx-auto flex-col gap-2" ref={formRef} onSubmit={onSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.currentTarget.value)} />
      <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)} />
      <button type="submit">Login</button>
    </form>
  </div>;
}