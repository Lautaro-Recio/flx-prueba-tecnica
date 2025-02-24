import { Button, Modal } from "antd";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"; 
import UserForm from "./UserForm"; 
import { createUser } from "../../index";
import { AppContext } from "../../context/AppContext";


function AddUser() {
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

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

  
    
    //Si el email es válido, creamos el usuario
    setEmailError(false);

    //Creamos el usuario
    const newUser = {
      id: uuidv4(),//Generamos un id aleatorio
      username,
      name,
      lastname,
      email,
      status,
      age,
    };

    createUser(newUser);
    //Desactivo el modal y reseteo los campos
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setUserName("");
      setName("");
      setLastName("");
      setEmail("");
      setState("");
      setAge("");
      //Actualizo los datos de la tabla
      refreshData();
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Agregar usuario
      </Button>

      <Modal
        title="Agregar usuario"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
        footer={[
          <Button
            key="submit"
            //Si alguno de los campos no es válido, no se puede crear el usuario
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
            Agregar usuario
          </Button>,
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

export default AddUser;
