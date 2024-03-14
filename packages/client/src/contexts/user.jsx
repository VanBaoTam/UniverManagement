import React, { createContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

function UserContextProvider(props) {
  const storedUser = useMemo(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { token: "", type: "", role: "", accountId: "" };
  }, []);

  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const setUserContext = (userInfo) => {
    setUser(userInfo);
  };

  const logout = () => {
    setUser({ token: "", type: "", role: "", accountId: "" });
    sessionStorage.removeItem("user");
  };

  const userValue = useMemo(
    () => ({ user, setUserContext, logout }),
    [user, setUserContext, logout]
  );

  return (
    <UserContext.Provider value={userValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
