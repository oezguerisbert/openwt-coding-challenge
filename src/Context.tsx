import React, { PropsWithChildren, useEffect, useState } from "react";
import { localStorageName } from "./constants";

export const UserContext = React.createContext<{
  needsLogin: boolean;
  setNeedsLogin: React.Dispatch<any>;
}>({ needsLogin: false, setNeedsLogin: () => {} });

export const MyUserContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [needsLogin, setNeedsLogin] = useState<boolean>(
    JSON.parse(
      sessionStorage.getItem(localStorageName) ?? '{"needsLogin":false}'
    ).needsLogin
  );

  useEffect(() => {
    const data = JSON.stringify({ needsLogin });
    sessionStorage.setItem(localStorageName, data);
  }, [needsLogin]);

  return (
    <UserContext.Provider value={{ needsLogin, setNeedsLogin }}>
      {children}
    </UserContext.Provider>
  );
};
