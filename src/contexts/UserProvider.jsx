import React, { createContext, useState, useEffect } from "react";
const context = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({isAuthenticated: false, username: ""});

  useEffect(() => {
     fetch("/users")
          .then(res => res.json())
          .then(res => {
            
            if (res.user) {
                console.log("YEP, ")
                console.log(res.user);
                setUser({
                    isAuthenticated: true,
                    username: res.user.username
                });
            }
            
          })
          .catch(err => {
              console.log(err);
          });
  }, []);

  return (
      <context.Provider value={user}>
          {children}
      </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;