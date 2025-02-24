import { Space, Table, Tag } from "antd";
import "./UsersContainer.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DeleteUser from "../Modals/deleteUser";
import UpdateUser from "../Modals/UpdateUser";

//Columnas de la tabla
const columns = [
  {
    title: "Usuario",
    dataIndex: "username",
    key: "username",
    width: 500,
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    width: 500,
    key: "name",
  },
  {
    title: "Apellido",
    dataIndex: "lastname",
    width: 500,
    key: "lastname",
  },
  {
    title: "Estado",
    key: "status",
    dataIndex: "status",
    //renderizar el estado de los usuario en la tabla
    render: (text) => (
      <Tag color={text === "inactive" ? "red" : "green"}>
        {text === "inactive" ? "Inactivo" : "Activo"}
      </Tag>
    ),
  },
  {
    title: "Acciones",
    key: "Acciones",
    render: (id) => (
      //renderizar los botones de acciones

      <Space size="middle">
        <UpdateUser userToEdit={id} />
        <DeleteUser id={id.id} username={id.username} />
      </Space>
    ),
  },
];

function UsersContainer() {
  const { data, filter, search } = useContext(AppContext);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Inicializa el loader
    setLoading(true);

    const timeoutId = setTimeout(() => {
      let filteredData = [...data]; // Clonamos `data` para no modificarlo directamente

      // 1️⃣ Aplicamos primero el filtro por estado
      if (filter && filter.trim().toLowerCase() !== "all") {
        filteredData = filteredData.filter((user) => user.status === filter);
      }

      // 2️⃣ Luego aplicamos el filtro de búsqueda por nombre o apellido
      if (search) {
        filteredData = filteredData.filter(
          (user) =>
            user.lastname.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Actualizamos el estado con los datos filtrados
      setDataFiltered(filteredData);

      // Desactivar el loader
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [search, filter, data]);

  // Función para actualizar el estado de la tabla
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
    });
  };

  // Función para actualizar el estado de la tabla
  const currentData = dataFiltered.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <div className="padding">
      <Table
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: dataFiltered.length,
          onChange: (page) => setPagination({ ...pagination, current: page }),
        }}
        dataSource={currentData}
        rowKey="id"
        onChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
}

export default UsersContainer;
