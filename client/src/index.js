//Crear un usuario
export const createUser = async (data) => {
  return fetch(`http://localhost:4000/users/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => console.log("Usuario creado con éxito"))
    .catch((error) => console.error("Error:", error));
};

//Devolver todos los usuarios
export const readUsers = async () => {
  return fetch(`http://localhost:4000/users/`)
    .then((response) => response.json())
    .then((data) => data);
};

//Actualizar un usuario
export const updateUserById = async (id, data) => {
  return fetch(`http://localhost:4000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => console.log("Usuario actualizado con éxito"))
    .catch((error) => console.error("Error:", error));
};

//Borrar un usuario
export const deleteUserById = async (id) => {
  return fetch(`http://localhost:4000/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => console.log("Usuario eliminado con éxito"))
    .catch((error) => console.error("Error:", error));
};



