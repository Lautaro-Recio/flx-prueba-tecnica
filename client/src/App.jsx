import AppContextProvider from "./context/AppContext";
import Filters from "./components/Filters/Filters";
import Header from "./components/Header/Header";
import UsersContainer from "./components/UsersContainer/UsersContainer";

function App() {
  return (
    <AppContextProvider>
      <div>
        <Header />
        <Filters />
        <UsersContainer />
      </div>
    </AppContextProvider>
  );
}

export default App;
