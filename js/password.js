document.getElementById("passwordForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("username").value;
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newPassword").value;

  fetch("users/users.json")
    .then(res => res.json())
    .then(users => {
      const userIndex = users.findIndex(u => u.usuario === usuario && u.password === oldPass);

      if (userIndex !== -1) {
        users[userIndex].password = newPass;
        alert("Contraseña actualizada exitosamente");
        window.location.href = "home.html";

        // Mostrar en consola para comprobar
        console.table(users);

        // Aquí normalmente guardarías el array actualizado de nuevo en el archivo,
        // pero en el navegador esto no es posible sin backend.
      } else {
        alert("Usuario o contraseña actual incorrectos");
        document.getElementById("oldPassword").value = "";
        document.getElementById("newPassword").value = "";
      }
    })
    .catch(error => {
      console.error("Error al cargar users.json:", error);
      alert("⚠️ No se pudo procesar el cambio");
    });
});


/*document.getElementById("passwordForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Esto impide el comportamiento por defecto

    const correo = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    //const credencialesValidas = {
    //    "usuario1@correo.com": "clave123",
    //    "jose@iot.dev": "sensor789"
    //};

    if (confirmPassword === newPassword) {
        
    } else {
        alert("Contraseñas diferentes.");
    }
});*/