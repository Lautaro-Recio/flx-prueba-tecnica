/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { readUsers } from "../index";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [search, setSeaerch] = useState("");
  const [filter, setFilter] = useState("");

  // Función para actualizar los datos
  const refreshData = async () => {
    const newData = await readUsers();
    setData(newData);
  };

  useEffect(() => {
    refreshData(); // Cargar datos al inicio
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        refreshData,
        setSeaerch,
        search,
        setFilter,
        filter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
