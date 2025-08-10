document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  axios.post("https://e5490qb09j.execute-api.us-east-1.amazonaws.com/prod/usuarios/login", 
    {
      usuario: usuario,
      password: password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  .then(response => {
    const data = response.data;
    console.log("Respuesta del backend:", data); 

    // Si se requiere cambio de contraseña
    if (data.challenge === "NEW_PASSWORD_REQUIRED") {
      // Puedes pasar usuario y password por sessionStorage
      sessionStorage.setItem("usuario", usuario);
      sessionStorage.setItem("oldPassword", password);
      alert("Es necesario que cambie su contraseña.");
      console.log("Redirigiendo a password.html");  // <-- Agrega esto
      window.location.href = "password.html";
    } 
    // Si todo ok, guardar tokens y continuar
    else if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id_token", data.id_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      alert("Inicio de sesión exitoso");
      window.location.href = "home.html";
    } else {
      alert("Respuesta inesperada del servidor.");
    }
  })
  .catch((error) => {
    if (error.response) {
      console.error("❌ Error del servidor (respuesta recibida):", error.response.data);
      console.error("Código de estado:", error.response.status);
      console.error("Encabezados:", error.response.headers);
      alert("Error del servidor: " + (error.response.data?.message || "Revisa la consola."));
    } else if (error.request) {
      console.error("❌ No hubo respuesta del servidor:", error.request);
      alert("No hubo respuesta del servidor. Verifica tu conexión.");
    } else {
      console.error("❌ Error al configurar la solicitud:", error.message);
      alert("Error al configurar la solicitud. Verifica la consola.");
    }

    document.getElementById("password").value = "";
  });
});



















/* document.getElementById("loginForm").addEventListener("submit", function(e) {
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
}); */

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