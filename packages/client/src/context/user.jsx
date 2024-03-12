import React, { createContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

function UserContextProvider(props) {
  const storedUser = useMemo(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { accountId: "", role: "" };
  }, []);

  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const setUserContext = (userInfo) => {
    setUser(userInfo);
    console.log(userInfo);
  };

  const userValue = useMemo(() => ({ user, setUserContext }), [user]);

  return (
    <UserContext.Provider value={userValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
