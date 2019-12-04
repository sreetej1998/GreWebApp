import React, { useState } from "react";
import Words from "./Components/words";
import Auth from "./Components/Auth";

const App = props => {
  let [logged, setLogged] = useState(false);
  let [username, setUsername] = useState("");
  const setLogin = () => {
    setLogged(!logged);
  };

  const rememberUserName = username => {
    setUsername(username);
  };

  if (logged) {
    return (
      <div>
        <Words callBack={setLogin} username={username} />
      </div>
    );
  } else {
    return <Auth callBack={setLogin} rememberUserName={rememberUserName} />;
  }
};
export default App;
