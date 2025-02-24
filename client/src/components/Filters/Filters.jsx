import { Select, Space } from "antd";
import "./Filters.scss";
import AddUser from "../Modals/AddUser";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Search from "antd/es/input/Search";

function Filters() {
  const { setSeaerch, setFilter } = useContext(AppContext);
  // Traigo las funciones para actualizar los filtros de la tabla (UserContainer)
  return (
    <div className="padding">
      <p className="title">
        Usuarios <span> / Listado de usuarios</span>
      </p>
      <div className="filters">
        <Search
          placeholder="Buscar usuarios"
          allowClear
          onSearch={(value) => setSeaerch(value)}
          style={{ width: 350 }}
        />

        <Space.Compact>
          <Select
            onChange={(value) => setFilter(value)}
            style={{ width: 200 }}
            placeholder="Filtrar por estado"
          >
            <Select.Option value="active">Activo</Select.Option>
            <Select.Option value="inactive">Inactivo</Select.Option>
            <Select.Option value="all">Todos</Select.Option>
          </Select>
        </Space.Compact>
        <AddUser />
      </div>
    </div>
  );
}

export default Filters;
