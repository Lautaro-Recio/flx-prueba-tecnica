import { Button, Modal } from "antd";
import { useContext, useState } from "react";
import { deleteUserById } from "../../index";
import { AppContext } from "../../context/AppContext";

// eslint-disable-next-line react/prop-types
function DeleteUser({ id, username }) {
  const { refreshData } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    await refreshData(); // Recargar datos desde el servidor

    setConfirmLoading(false);
    setOpen(false);
  };



  return (
    <>
      <a href="#" onClick={showModal}>
        Eliminar
      </a>
      <Modal
        title="Eliminar usuario"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={[
          <Button
            key="submit"
            type="primary"
            danger
            onClick={() => {
              deleteUserById(id); // Elimina el usuario con el id
              handleOk();
            }}
          >
            Eliminar usuario
          </Button>,
        ]}
      >
        <div className="add-user">
          <p>
            ¿Está seguro que quiere eliminar el usuario
            <span className="delete">@{username}?</span>
          </p>
        </div>
      </Modal>
    </>
  );
}

export default DeleteUser;
