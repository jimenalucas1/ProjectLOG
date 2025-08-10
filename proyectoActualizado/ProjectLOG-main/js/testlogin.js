const loginForm = document.getElementById("loginForm");
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuarioInput = document.getElementById("username");
        const passInput = document.getElementById("password");

        const apiUrl = "https://e5490qb09j.execute-api.us-east-1.amazonaws.com/prod/usuarios/login";

        const credentials = {
            usuario: usuarioInput.value.trim(),
            password: passInput.value.trim()
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            // Maneja errores de credenciales (códigos 4xx)
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Credenciales incorrectas.");
                });
            }
            // Procesa respuestas exitosas (código 200)
            return response.json();
        })
        .then(data => {
            // Ahora, en el cuerpo de una respuesta exitosa, revisamos el 'challenge' o los tokens
            
            // ESCENARIO 1: Usuario nuevo (con challenge)
            if (data.challenge === "NEW_PASSWORD_REQUIRED") {
                console.log("Usuario nuevo. Se requiere cambio de contraseña.");
                sessionStorage.setItem("usuario", usuarioInput.value.trim());
                sessionStorage.setItem("oldPassword", passInput.value.trim());

                alert("Es necesario que cambie su contraseña para la primera vez que inicia sesión.");
                window.location.href = "password.html";

            // ESCENARIO 2: Usuario existente (con tokens)
            } else if (data.access_token && data.id_token && data.refresh_token) {
                console.log("Inicio de sesión exitoso:", data);
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("id_token", data.id_token);
                localStorage.setItem("refresh_token", data.refresh_token);

                alert("Inicio de sesión exitoso");
                window.location.href = "home.html";
            } else {
                // ESCENARIO 3: Respuesta inesperada
                throw new Error("Respuesta del servidor inválida.");
            }
        })
        .catch(error => {
            // Maneja errores de conexión o los errores que lanzamos
            console.error("❌ Error en la solicitud:", error);
            
            if (error.message === "Failed to fetch") {
                alert("No hubo respuesta del servidor. Verifica tu conexión.");
            } else {
                alert("Error: " + error.message);
            }
            
            document.getElementById("password").value = "";
        });
    });

    // Toggle para el menú hamburguesa en móviles
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cierra el menú si se hace clic fuera de él en dispositivos móviles
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });


/*document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuarioInput = document.getElementById("username");
    const passInput = document.getElementById("password");
    
    // 1. Obtén la URL de tu API (¡reemplaza con tu URL real!)
    const apiUrl = 'https://e5490qb09j.execute-api.us-east-1.amazonaws.com/prod/usuarios/login'; 

    // 2. Prepara los datos del formulario en un objeto JSON
    const credentials = {
        usuario: usuarioInput.value, 
        password: passInput.value
    };

    // 3. Usa `fetch` para enviar los datos a la API
    fetch(apiUrl, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials) 
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Inicio de sesión exitoso:', data);
        
        localStorage.setItem('access_token', data.token);
        
        // Redirigir al usuario
        window.location.href = "home.html";
        alert("¡Inicio de sesión exitoso!");
    })
    .catch(error => {
        console.error('Error en el inicio de sesión:', error);
        alert("Usuario y/o contraseña incorrectos");
        passInput.value = ""; 
    });
});*/