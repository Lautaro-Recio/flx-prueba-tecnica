/* eslint-disable react/prop-types */
import { Input, Select } from "antd";

function UserForm({
  username,
  name,
  lastname,
  email,
  status,
  age,
  emailError,
  setUserName,
  setName,
  setLastName,
  setEmail,
  setState,
  setAge,
  setEmailError,
}) {
  //En caso de creación de usuario, se muestra el formulario de creación sin datos
  //En caso de actualización, se muestra el formulario de actualización con los datos del usuario
  return (
    <div className="grid add-user">
      <label htmlFor="username">
        Usuario
        <Input
          id="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>

      <label htmlFor="email">
        Email
        <Input
          id="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          //Validación del email
          onBlur={() => {
            const emailRegex =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            setEmailError(!emailRegex.test(email));
          }}
        />
        {/* Si el email no es válido, se muestra un mensaje de error */}
        {emailError && (
          <span style={{ color: "red", fontSize: "12px" }}>
            El correo electrónico no es válido.
          </span>
        )}
      </label>

      <label htmlFor="name">
        Nombre
        <Input
          id="name"
          placeholder="John"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label htmlFor="lastname">
        Apellido
        <Input
          id="lastname"
          placeholder="Doe"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <label htmlFor="status">
        Estado
        <Select
          id="status"
          placeholder="Seleccione un estado"
          value={status || undefined}
          onChange={(value) => setState(value)}
          style={{ width: "100%" }}
        >
          <Select.Option value="active">Activo</Select.Option>
          <Select.Option value="inactive">Inactivo</Select.Option>
        </Select>
      </label>

      <label htmlFor="age">
        Edad
        <Input
          id="age"
          placeholder="43"
          value={age === "" ? "" : Number(age)}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
      </label>
    </div>
  );
}

export default UserForm;
