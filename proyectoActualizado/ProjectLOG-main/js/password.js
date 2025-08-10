const passwordForm = document.getElementById("passwordForm");
const newPasswordInput = document.getElementById("newPassword");

if (passwordForm) {
    passwordForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const apiUrl = "https://e5490qb09j.execute-api.us-east-1.amazonaws.com/prod/usuarios/login/newpass";
        
        // Recuperamos el usuario de la memoria de sesión
        const usuarioGuardado = sessionStorage.getItem("usuario");

        // Verificación de seguridad: si no hay usuario, redirigimos al login
        if (!usuarioGuardado) {
            alert("No se encontró el usuario. Por favor, inicie sesión nuevamente.");
            window.location.href = "login.html";
            return;
        }

        const newPassword = newPasswordInput.value.trim();

        // Creamos el objeto con los datos correctos para la API
        const credentials = {
            usuario: usuarioGuardado,
            new_password: newPassword
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (!response.ok) {
                // Maneja los errores del cliente o del servidor
                return response.json().then(errorData => {
                    throw new Error(errorData.error || "Ocurrió un error al cambiar la contraseña.");
                });
            }
            return response.json();
        })
        .then(data => {
            // Manejamos los 3 posibles casos en la respuesta de éxito
            if (data.mensaje === "Contraseña actualizada exitosamente.") {
                console.log("Contraseña cambiada con éxito.");
                
                // Guardamos los nuevos tokens en el almacenamiento local
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("id_token", data.id_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("token_type", data.token_type);
                localStorage.setItem("expires_in", data.expires_in);

                // Limpiamos la memoria de sesión ya que la contraseña ya fue cambiada
                sessionStorage.removeItem("usuario");
                sessionStorage.removeItem("oldPassword");
                
                alert("Contraseña actualizada. Redirigiendo a la página principal.");
                window.location.href = "home.html";
            } else if (data.mensaje) {
                // Este caso captura otros mensajes de error del servidor, aunque no sean errores HTTP
                throw new Error(data.error || data.mensaje);
            } else {
                // Si la respuesta no contiene un mensaje de éxito, es inesperada
                throw new Error("Respuesta del servidor inesperada.");
            }
        })
        .catch(error => {
            console.error("❌ Error al cambiar la contraseña:", error);
            alert("Error: " + error.message);
            newPasswordInput.value = "";
        });
    });
}









/*document.getElementById("passwordForm").addEventListener("submit", function(e) {
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
});*/