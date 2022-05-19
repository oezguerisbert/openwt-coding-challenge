import "flowbite";
import React, { Suspense } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { MyUserContextProvider, UserContext } from "./Context";
const GoT = React.lazy(() => import("./components/GameOfThrones"));

const Content = () => {
  return (
    <div className="container mx-auto w-full">
      <div className="flex flex-row gap-3 w-full">
        <Suspense fallback="Loading...">
          <GoT />
        </Suspense>
      </div>
    </div>
  );
};

const MyApp = () => {
  const userContext = React.useContext(UserContext);
  return (
    <div className="App flex w-full mx-auto min-h-screen bg-slate-200 p-8">
      {userContext.needsLogin ? <Login /> : <Content />}
    </div>
  );
};

function App() {
  return (
    <MyUserContextProvider>
      <MyApp />
    </MyUserContextProvider>
  );
}

export default App;
