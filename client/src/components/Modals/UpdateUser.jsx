/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useState, useEffect, useContext } from "react";
import { updateUserById } from "../../index";
import UserForm from "./UserForm";
import "./Modals.scss";
import { AppContext } from "../../context/AppContext";

function UpdateUser({ userToEdit }) {
  const { refreshData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setState] = useState("");
  const [age, setAge] = useState("");
  const [emailError, setEmailError] = useState(false);


  useEffect(() => {
    if (userToEdit) {
        // Actualiza los valores del formulario solo cuando el id cambia
        setUserName(userToEdit.username || "");
        setName(userToEdit.name || "");
        setLastName(userToEdit.lastname || "");
        setEmail(userToEdit.email || "");
        setState(userToEdit.status || "");
        setAge(userToEdit.age ? String(userToEdit.age) : "");
    }
  }, [userToEdit,]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);


    // Actualización del usuario
    updateUserById(userToEdit.id, {
      username,
      name,
      lastname,
      email,
      status,
      age,
    });

    setTimeout(() => {
      //Desactivo el modal y reseteo los campos
      setOpen(false);
      setConfirmLoading(false);
      setUserName("");
      setName("");
      setLastName("");
      setEmail("");
      setState("");
      setAge("");
      refreshData();
    }, 2000);
  };

  return (
    <>
      <a type="button" onClick={showModal}>
        Editar
      </a>

      <Modal
        title="Editar usuario"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
        footer={[
          //Si alguno de los campos no es válido, no se puede actualizar el usuario
          <Button
            key="submit"
            disabled={
              emailError ||
              !username ||
              !name ||
              !lastname ||
              !email ||
              !status ||
              !age
            }
            type="primary"
            onClick={handleOk}
          >
            Editar usuario
          </Button>
        ]}
      >
        {/* Renderiza el formulario de creación y actualización de usuario */}
        <UserForm
          username={username}
          name={name}
          lastname={lastname}
          email={email}
          status={status}
          age={age}
          emailError={emailError}
          setUserName={setUserName}
          setName={setName}
          setLastName={setLastName}
          setEmail={setEmail}
          setState={setState}
          setAge={setAge}
          setEmailError={setEmailError}
        />
      </Modal>
    </>
  );
}

export default UpdateUser;
