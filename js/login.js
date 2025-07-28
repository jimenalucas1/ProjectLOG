document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuarioInput = document.getElementById("username");
  const passInput = document.getElementById("password");

  fetch("users/users.json")
    .then(res => res.json())
    .then(users => {
      const usuarioValido = users.find(u => u.usuario === usuarioInput.value && u.password === passInput.value);

      if (usuarioValido) {
        window.location.href = "password.html";
        alert("Es necesario que cambie su contraseña para la primera vez en iniciar sesión.");
      } else {
        alert("Usuario y/o contraseña incorrectos");
        passInput.value = ""; // limpiar contraseña
      }
    })
    .catch(error => {
      console.error("Error al cargar users.json:", error);
      alert("ERROR al verificar credenciales");
      passInput.value = "";
    });
});

/*document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Esto impide el comportamiento por defecto

    const correo = document.getElementById("username").value.trim();
    const clave = document.getElementById("password").value.trim();

    const credencialesValidas = {
        "usuario1@correo.com": "clave123",
        "jose@iot.dev": "sensor789"
    };

    if (credencialesValidas[correo] === clave) {
        window.location.href = "home.html"; // Redirección controlada
    } else {
        alert("Correo o contraseña incorrecta.");
    }
});*/