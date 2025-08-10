// =====================================================================
// Lógica de Seguridad - Redirije a la login si no hay tokens
// =====================================================================

const accessToken = localStorage.getItem("access_token");
const idToken = localStorage.getItem("id_token");

if (!accessToken || !idToken) {
    console.log("Usuario no autenticado. Redirigiendo a la página de login.");
    // Redirige al login.html si no se encuentran los tokens
    window.location.href = "login.html";
}


// =====================================================================
// Lógica para el Refresh Token
// =====================================================================
/**
/**
 * Inicia un temporizador para refrescar los tokens antes de que expiren.
 * El refresco se hará cada 50 minutos (3000 segundos) para estar seguros.
 */


const refreshTokenValue = localStorage.getItem("refresh_token");
if (refreshTokenValue) {
    startTokenRefreshTimer();
}

function startTokenRefreshTimer() {
    const refreshInterval = 50 * 60 * 1000; // 50 minutos en milisegundos

    setInterval(refreshToken, refreshInterval);
}

/**
 * Realiza la llamada a la API para obtener nuevos tokens de acceso.
 */
async function refreshToken() {
    const apiUrl = "https://e5490qb09j.execute-api.us-east-1.amazonaws.com/prod/usuarios/refresh-token";
    
    // Obtiene el refresh token del almacenamiento local
    const refreshTokenValue = localStorage.getItem("refresh_token");

    // Si no hay refresh token, no podemos hacer nada.
    if (!refreshTokenValue) {
        console.error("No se encontró el refresh token. El usuario debe iniciar sesión nuevamente.");
        // Redirige al login si el token no existe
        window.location.href = "login.html";
        return;
    }

    const credentials = {
        refresh_token: refreshTokenValue
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            // Maneja el error de la API, por ejemplo, si el refresh token ha expirado
            const errorData = await response.json();
            throw new Error(errorData.error || "El refresh token es inválido o ha expirado.");
        }

        const data = await response.json();

        // Reemplaza los tokens antiguos con los nuevos
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("id_token", data.id_token);
        
        console.log("Tokens refrescados exitosamente. Los nuevos tokens son válidos por 1 hora.");

    } catch (error) {
        console.error("❌ Error al refrescar el token:", error);
        alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
        // En caso de fallo, redirige al usuario para que vuelva a iniciar sesión
        window.location.href = "login.html";
    }
}

// ... (El resto de tu código JS se mantiene igual)

// =====================================================================
// Lógica para el Chatbot - Asistente Virtual
// =====================================================================

// Seleccionar los elementos de la interfaz del chat
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// URL de tu API que se comunica con la IA
const apiURL = 'https://e5490qb09j.execute-api.us-east-1.amazonaws.com/prod/usuarios/login/converse';

// Función para mostrar mensajes en la ventana de chat
function mostrarMensaje(remitente, texto) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('chat-message');

    if (remitente === 'user') {
        mensajeDiv.classList.add('user-message');
    } else {
        mensajeDiv.classList.add('assistant-message');
    }

    mensajeDiv.textContent = texto;
    chatLog.appendChild(mensajeDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Función principal para enviar el mensaje
async function enviarMensaje() {
    const mensaje = chatInput.value.trim();

    if (mensaje === '') {
        mostrarMensaje('assistant', 'Por favor, ingrese una consulta para atenderlo.');
        return;
    }

    mostrarMensaje('user', mensaje);
    chatInput.value = '';

    mostrarMensaje('assistant', '...');

    try {
        const idTokenchat = localStorage.getItem("id_token");
        
        if (!idTokenchat) {
            throw new Error('No se encontró un token de autenticación. Por favor, inicia sesión.');
        }

        const respuesta = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idTokenchat
            },
            body: JSON.stringify({
                "mensaje": mensaje
            }),
        });

        const datos = await respuesta.json();
        
        // --- PARA DEPURAR: Muestra la respuesta completa de la API en la consola ---
        console.log("Respuesta completa de la API:", datos);

        chatLog.removeChild(chatLog.lastChild);

        // --- LÓGICA CORREGIDA: Prioridad absoluta a 'respuesta' ---
        // Verificar si el campo 'respuesta' existe y tiene contenido
        if (datos.respuesta && datos.respuesta.length > 0) {
            mostrarMensaje('assistant', datos.respuesta);
        } else {
            // Si el campo 'respuesta' no existe o está vacío, mostrar un mensaje genérico
            mostrarMensaje('assistant', 'Lo siento, no pude obtener una respuesta válida.');
        }

    } catch (error) {
        console.error('Error al comunicarse con la API:', error);
        chatLog.removeChild(chatLog.lastChild);
        mostrarMensaje('assistant', `Lo siento, no se pudo conectar con el servidor. Inténtelo más tarde.`);
    }
}

// Escuchar el evento de clic en el botón de "Enviar"
sendBtn.addEventListener('click', enviarMensaje);

// Escuchar el evento de presionar la tecla "Enter" en el input
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        enviarMensaje();
    }
});

// =====================================================================
// Lógica para el Cierre de Sesión - Logout
// =====================================================================

const logoutBtn = document.getElementById("logout-btn");
const apiUrl = "https://e5490qb09j.execute-api.us-east-1.amazonaws.com/prod/usuarios/logout";

if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Evita la redirección inmediata

        const accessToken = localStorage.getItem("access_token");
        const idToken = localStorage.getItem("id_token");

        // Si no hay tokens, simplemente limpia y redirige para evitar errores
        if (!accessToken || !idToken) {
            console.log("No se encontraron tokens. Cerrando sesión...");
            clearSessionAndRedirect();
            return;
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken
            },
            body: JSON.stringify({ access_token: accessToken })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || "Error al cerrar sesión.");
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Sesión cerrada correctamente") {
                console.log("Sesión cerrada correctamente.");
                alert("Has cerrado sesión.");
            } else {
                throw new Error(data.error || "Respuesta inesperada del servidor.");
            }
            clearSessionAndRedirect();
        })
        .catch(error => {
            console.error("❌ Error al cerrar la sesión:", error);
            alert(error.message);
            // Aunque falle la API, siempre eliminamos los tokens del lado del cliente
            clearSessionAndRedirect();
        });
    });
}

/**
 * Elimina todos los tokens de la memoria local y redirige a la página de inicio.
 */
function clearSessionAndRedirect() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("refresh_token");
    
    // Opcional: elimina otros datos que puedas tener
    localStorage.removeItem("token:type");
    localStorage.removeItem("expires_in");
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("oldPassword");
    
    window.location.href = "index.html";
}