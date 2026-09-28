/* ==========================================
   ELEMENTOS DE LA PÁGINA
========================================== */

// Se obtiene el contenedor principal para controlar
// el cambio entre inicio de sesión y registro.
const contenedor = document.querySelector(".contenedor");

// Botón para mostrar el formulario de registro.
const mostrarRegistro =
    document.getElementById("mostrarRegistro");

// Botón para regresar al formulario de inicio de sesión.
const mostrarLogin =
    document.getElementById("mostrarLogin");


/* ==========================================
   CAMBIAR A REGISTRO
========================================== */

// Al presionar "Registrarse" se muestra
// el formulario correspondiente.
mostrarRegistro.addEventListener("click", function () {

    contenedor.classList.add("mostrar-registro");

});


/* ==========================================
   REGRESAR AL LOGIN
========================================== */

// Al presionar "Iniciar Sesión" se vuelve
// a mostrar el formulario principal.
mostrarLogin.addEventListener("click", function () {

    contenedor.classList.remove("mostrar-registro");

});


/* ==========================================
   INICIO DE SESIÓN
========================================== */

// Se obtiene el formulario de inicio de sesión.
const loginForm =
    document.getElementById("loginForm");


/*
    Se revisan los datos ingresados en el formulario.

    Por el momento se utiliza un usuario temporal:
    Correo: admin
    Contraseña: 1234

    Próximamente esta validación será reemplazada
    por una consulta a la base de datos.
*/
loginForm.addEventListener("submit", function (event) {

    // Se evita que el formulario recargue la página.
    event.preventDefault();


    // Se obtiene el correo ingresado.
    const email =
        document.getElementById("loginEmail").value.trim();


    // Se obtiene la contraseña ingresada.
    const password =
        document.getElementById("loginPassword").value.trim();


    // Se comprueba el usuario y la contraseña temporal.
    if (email === "admin" && password === "1234") {

        // Si los datos son correctos, se dirige a la página de inicio.
        window.location.href = "../sistema/index.html";

    } else {

        // Si los datos no coinciden, se muestra un mensaje.
        alert("El correo o la contraseña son incorrectos.");

    }

});


/* ==========================================
   REGISTRO
========================================== */

// Se obtiene el formulario de registro.
const registroForm =
    document.getElementById("registroForm");


/*
    Por el momento el formulario de registro
    solamente está preparado visualmente.

    Próximamente se implementará el almacenamiento
    de los datos mediante una base de datos.
*/
registroForm.addEventListener("submit", function (event) {

    // Se evita que la página se recargue.
    event.preventDefault();


    // El registro de usuarios se implementará próximamente.
    alert(
        "El registro de usuarios estará disponible próximamente."
    );

});