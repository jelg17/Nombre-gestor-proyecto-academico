/* =========================================
   DATOS DEL SISTEMA
   ========================================= */

/*
 * Se recupera la información almacenada en el navegador.
 * Si no existen datos, se utilizan valores iniciales.
 */

let proyecto =
    JSON.parse(localStorage.getItem("proyecto")) || null;


let integrantes =
    JSON.parse(localStorage.getItem("integrantes")) || [];


let tareas =
    JSON.parse(localStorage.getItem("tareas")) || [];


let recursos =
    JSON.parse(localStorage.getItem("recursos")) || [];


/* =========================================
   NAVEGACIÓN
   ========================================= */

/*
 * Se obtienen los botones del menú y las secciones
 * disponibles dentro del sistema.
 */

const botonesMenu =
    document.querySelectorAll(".menu-item");


const secciones =
    document.querySelectorAll(".seccion");


/*
 * Cada botón permite cambiar entre las diferentes
 * secciones del sistema.
 */

botonesMenu.forEach((boton) => {

    boton.addEventListener("click", () => {

        const seccionSeleccionada =
            boton.getAttribute("data-seccion");


        mostrarSeccion(seccionSeleccionada);

    });

});


/*
 * Se muestra la sección seleccionada y se ocultan
 * las demás secciones.
 */

function mostrarSeccion(nombreSeccion) {

    secciones.forEach((seccion) => {

        seccion.classList.remove("activa");

    });


    botonesMenu.forEach((boton) => {

        boton.classList.remove("activo");

    });


    const seccion =
        document.getElementById(nombreSeccion);


    const boton =
        document.querySelector(
            `[data-seccion="${nombreSeccion}"]`
        );


    if (seccion) {

        seccion.classList.add("activa");

    }


    if (boton) {

        boton.classList.add("activo");

    }


    /*
     * Se actualiza el título principal dependiendo
     * de la sección seleccionada.
     */

    const tituloSeccion =
        document.getElementById("tituloSeccion");


    const titulos = {

        inicio: "Gestión del proyecto académico",

        proyectos: "Proyectos",

        integrantes: "Integrantes",

        tareas: "Tareas",

        recursos: "Recursos",

        recordatorios: "Recordatorios"

    };


    if (titulos[nombreSeccion]) {

        tituloSeccion.textContent =
            titulos[nombreSeccion];

    }

}


/* =========================================
   PROYECTOS
   ========================================= */

/*
 * Se configura el botón para guardar el proyecto.
 */

document
    .getElementById("guardarProyecto")
    .addEventListener("click", guardarProyecto);


function guardarProyecto() {

    const nombre =
        document
            .getElementById("nombreProyecto")
            .value
            .trim();


    /*
     * Se valida que el nombre del proyecto
     * no esté vacío.
     */

    if (nombre === "") {

        alert(
            "Ingrese el nombre del proyecto."
        );

        return;

    }


    /*
     * Se crea el objeto que contiene
     * la información del proyecto.
     */

    proyecto = {

        nombre: nombre

    };


    /*
     * Se guarda el proyecto en localStorage.
     */

    localStorage.setItem(
        "proyecto",
        JSON.stringify(proyecto)
    );


    /*
     * Se limpia el campo después de guardar.
     */

    document
        .getElementById("nombreProyecto")
        .value = "";


    actualizarInterfaz();


    alert(
        "Proyecto guardado correctamente."
    );

}


/*
 * Se configura el botón para eliminar el proyecto.
 */

document
    .getElementById("eliminarProyecto")
    .addEventListener(
        "click",
        eliminarProyecto
    );


/*
 * Se elimina únicamente el proyecto registrado.
 * Los integrantes, tareas y recursos permanecen guardados.
 */

function eliminarProyecto() {

    if (!proyecto) {

        alert(
            "No hay un proyecto registrado."
        );

        return;

    }


    /*
     * Se solicita confirmación para evitar
     * eliminaciones accidentales.
     */

    const confirmar =
        confirm(
            "¿Está seguro de eliminar el proyecto actual?"
        );


    if (!confirmar) {

        return;

    }


    proyecto = null;


    /*
     * Se elimina el proyecto almacenado.
     */

    localStorage.removeItem("proyecto");


    actualizarInterfaz();


    alert(
        "Proyecto eliminado correctamente."
    );

}


/* =========================================
   INTEGRANTES
   ========================================= */

/*
 * Se configura el botón para agregar integrantes.
 */

document
    .getElementById("agregarIntegrante")
    .addEventListener(
        "click",
        agregarIntegrante
    );


function agregarIntegrante() {

    const nombre =
        document
            .getElementById("nombreIntegrante")
            .value
            .trim();


    /*
     * Se valida que el nombre del integrante
     * tenga información.
     */

    if (nombre === "") {

        alert(
            "Ingrese el nombre del integrante."
        );

        return;

    }


    /*
     * Se agrega el integrante con un identificador
     * único generado a partir de la fecha actual.
     */

    integrantes.push({

        id: Date.now(),

        nombre: nombre

    });


    guardarDatos();


    /*
     * Se limpia el campo después de agregar
     * el integrante.
     */

    document
        .getElementById("nombreIntegrante")
        .value = "";


    actualizarInterfaz();

}


/*
 * Se muestran los integrantes registrados
 * y el botón para eliminar cada uno.
 */

function mostrarIntegrantes() {

    const lista =
        document.getElementById(
            "listaIntegrantes"
        );


    if (integrantes.length === 0) {

        lista.innerHTML = `

            <p class="mensaje-vacio">
                No hay integrantes registrados.
            </p>

        `;

        return;

    }


    lista.innerHTML = "";


    integrantes.forEach((integrante) => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "lista-item";


        elemento.innerHTML = `

            <div>

                <strong>
                    ${integrante.nombre}
                </strong>

                <small>
                    Integrante del proyecto
                </small>

            </div>


            <button
                class="eliminar"
                onclick="eliminarIntegrante(${integrante.id})"
            >
                Eliminar
            </button>

        `;


        lista.appendChild(elemento);

    });

}


/*
 * Se elimina el integrante seleccionado después
 * de solicitar confirmación.
 */

function eliminarIntegrante(id) {

    const integrante =
        integrantes.find(
            (item) => item.id === id
        );


    if (!integrante) {

        return;

    }


    /*
     * Se solicita confirmación antes de eliminar.
     */

    const confirmar =
        confirm(
            `¿Está seguro de eliminar a ${integrante.nombre}?`
        );


    if (!confirmar) {

        return;

    }


    /*
     * Se elimina únicamente el integrante seleccionado.
     * Las tareas existentes se mantienen.
     */

    integrantes =
        integrantes.filter(
            (item) => item.id !== id
        );


    guardarDatos();


    actualizarInterfaz();

}


/* =========================================
   RESPONSABLES
   ========================================= */

/*
 * Se actualiza el listado de responsables utilizando
 * los integrantes registrados.
 */

function actualizarResponsables() {

    const select =
        document.getElementById(
            "responsableTarea"
        );


    select.innerHTML = `

        <option value="">
            Seleccionar responsable
        </option>

    `;


    integrantes.forEach((integrante) => {

        const opcion =
            document.createElement("option");


        opcion.value =
            integrante.id;


        opcion.textContent =
            integrante.nombre;


        select.appendChild(opcion);

    });

}


/* =========================================
   TAREAS
   ========================================= */

/*
 * Se configura el botón para crear tareas.
 */

document
    .getElementById("crearTarea")
    .addEventListener(
        "click",
        crearTarea
    );


function crearTarea() {

    const nombre =
        document
            .getElementById("nombreTarea")
            .value
            .trim();


    const responsable =
        document
            .getElementById("responsableTarea")
            .value;


    const fecha =
        document
            .getElementById("fechaTarea")
            .value;


    /*
     * Se valida que el nombre de la tarea
     * haya sido ingresado.
     */

    if (nombre === "") {

        alert(
            "Ingrese el nombre de la tarea."
        );

        return;

    }


    /*
     * Se valida que exista un responsable.
     */

    if (responsable === "") {

        alert(
            "Seleccione un responsable."
        );

        return;

    }


    /*
     * Se valida que exista una fecha de entrega.
     */

    if (fecha === "") {

        alert(
            "Seleccione una fecha de entrega."
        );

        return;

    }


    /*
     * Se busca el integrante seleccionado
     * para obtener su nombre.
     */

    const integrante =
        integrantes.find(
            (item) => item.id == responsable
        );


    if (!integrante) {

        alert(
            "No se encontró el responsable seleccionado."
        );

        return;

    }


    /*
     * Se crea la tarea con estado inicial pendiente.
     */

    const nuevaTarea = {

        id: Date.now(),

        nombre: nombre,

        responsableId: integrante.id,

        responsableNombre: integrante.nombre,

        fecha: fecha,

        estado: "Pendiente"

    };


    tareas.push(nuevaTarea);


    guardarDatos();


    /*
     * Se limpian los campos del formulario.
     */

    document
        .getElementById("nombreTarea")
        .value = "";


    document
        .getElementById("responsableTarea")
        .value = "";


    document
        .getElementById("fechaTarea")
        .value = "";


    actualizarInterfaz();

}


/*
 * Se muestran las tareas registradas.
 */

function mostrarTareas() {

    const lista =
        document.getElementById(
            "listaTareas"
        );


    if (tareas.length === 0) {

        lista.innerHTML = `

            <p class="mensaje-vacio">
                No hay tareas registradas.
            </p>

        `;

        return;

    }


    lista.innerHTML = "";


    tareas.forEach((tarea) => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "tarea";


        const claseEstado =
            obtenerClaseEstado(
                tarea.estado
            );


        elemento.innerHTML = `

            <div class="tarea-informacion">

                <strong>
                    ${tarea.nombre}
                </strong>

                <small>
                    Responsable:
                    ${tarea.responsableNombre}
                </small>

                <br>

                <small>
                    Entrega:
                    ${formatearFecha(tarea.fecha)}
                </small>

            </div>


            <div class="tarea-acciones">

                <button
                    class="estado ${claseEstado}"
                    onclick="cambiarEstado(${tarea.id})"
                >
                    ${tarea.estado}
                </button>


                <button
                    class="eliminar"
                    onclick="eliminarTarea(${tarea.id})"
                >
                    Eliminar
                </button>

            </div>

        `;


        lista.appendChild(elemento);

    });

}


/*
 * Se obtiene la clase visual correspondiente
 * al estado actual de la tarea.
 */

function obtenerClaseEstado(estado) {

    if (estado === "Pendiente") {

        return "estado-pendiente";

    }


    if (estado === "En progreso") {

        return "estado-progreso";

    }


    if (estado === "En revisión") {

        return "estado-revision";

    }


    if (estado === "Completada") {

        return "estado-completada";

    }


    return "estado-pendiente";

}


/*
 * Se cambia el estado de la tarea siguiendo
 * el orden definido.
 */

function cambiarEstado(id) {

    const tarea =
        tareas.find(
            (item) => item.id === id
        );


    if (!tarea) {

        return;

    }


    const estados = [

        "Pendiente",

        "En progreso",

        "En revisión",

        "Completada"

    ];


    const posicionActual =
        estados.indexOf(
            tarea.estado
        );


    /*
     * Se avanza al siguiente estado.
     */

    if (
        posicionActual <
        estados.length - 1
    ) {

        tarea.estado =
            estados[posicionActual + 1];

    }


    guardarDatos();


    actualizarInterfaz();

}


/*
 * Se elimina una tarea después de solicitar
 * confirmación.
 */

function eliminarTarea(id) {

    const confirmar =
        confirm(
            "¿Está seguro de eliminar esta tarea?"
        );


    if (!confirmar) {

        return;

    }


    tareas =
        tareas.filter(
            (tarea) => tarea.id !== id
        );


    guardarDatos();


    actualizarInterfaz();

}


/* =========================================
   RECURSOS
   ========================================= */

/*
 * Se configura el botón para agregar recursos.
 */

document
    .getElementById("agregarRecurso")
    .addEventListener(
        "click",
        agregarRecurso
    );


function agregarRecurso() {

    const nombre =
        document
            .getElementById("nombreRecurso")
            .value
            .trim();


    const enlace =
        document
            .getElementById("enlaceRecurso")
            .value
            .trim();


    /*
     * Se valida el nombre del recurso.
     */

    if (nombre === "") {

        alert(
            "Ingrese el nombre del recurso."
        );

        return;

    }


    /*
     * Se valida el enlace.
     */

    if (enlace === "") {

        alert(
            "Ingrese el enlace del recurso."
        );

        return;

    }


    /*
     * Se agrega el recurso al arreglo.
     */

    recursos.push({

        id: Date.now(),

        nombre: nombre,

        enlace: enlace

    });


    guardarDatos();


    document
        .getElementById("nombreRecurso")
        .value = "";


    document
        .getElementById("enlaceRecurso")
        .value = "";


    actualizarInterfaz();

}


/*
 * Se muestran los recursos registrados.
 */

function mostrarRecursos() {

    const lista =
        document.getElementById(
            "listaRecursos"
        );


    if (recursos.length === 0) {

        lista.innerHTML = `

            <p class="mensaje-vacio">
                No hay recursos registrados.
            </p>

        `;

        return;

    }


    lista.innerHTML = "";


    recursos.forEach((recurso) => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "lista-item";


        elemento.innerHTML = `

            <div>

                <strong>
                    ${recurso.nombre}
                </strong>


                <a
                    class="recurso-enlace"
                    href="${recurso.enlace}"
                    target="_blank"
                >
                    ${recurso.enlace}
                </a>

            </div>

        `;


        lista.appendChild(elemento);

    });

}


/* =========================================
   RECORDATORIOS
   ========================================= */

/*
 * Se muestran las tareas que todavía
 * no han sido completadas.
 */

function mostrarRecordatorios() {

    const lista =
        document.getElementById(
            "listaRecordatorios"
        );


    /*
     * Se filtran las tareas que no están completadas.
     */

    const pendientes =
        tareas.filter(
            (tarea) =>
                tarea.estado !== "Completada"
        );


    /*
     * Se ordenan las tareas por fecha,
     * comenzando por la entrega más cercana.
     */

    pendientes.sort(
        (a, b) =>
            new Date(a.fecha) -
            new Date(b.fecha)
    );


    if (pendientes.length === 0) {

        lista.innerHTML = `

            <p class="mensaje-vacio">
                No hay tareas pendientes.
            </p>

        `;

        return;

    }


    lista.innerHTML = "";


    pendientes.forEach((tarea) => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "lista-item";


        elemento.innerHTML = `

            <div>

                <strong>
                    ${tarea.nombre}
                </strong>


                <small>
                    Responsable:
                    ${tarea.responsableNombre}
                </small>


                <br>


                <small>
                    Fecha de entrega:
                    ${formatearFecha(tarea.fecha)}
                </small>

            </div>


            <span
                class="estado ${obtenerClaseEstado(tarea.estado)}"
            >
                ${tarea.estado}
            </span>

        `;


        lista.appendChild(elemento);

    });

}


/* =========================================
   PRÓXIMAS ENTREGAS
   ========================================= */

/*
 * Se muestran hasta cinco tareas pendientes
 * ordenadas por fecha de entrega.
 */

function mostrarProximasEntregas() {

    const contenedor =
        document.getElementById(
            "proximasEntregas"
        );


    const pendientes =
        tareas
            .filter(
                (tarea) =>
                    tarea.estado !== "Completada"
            )
            .sort(
                (a, b) =>
                    new Date(a.fecha) -
                    new Date(b.fecha)
            )
            .slice(0, 5);


    if (pendientes.length === 0) {

        contenedor.innerHTML = `

            <p class="mensaje-vacio">
                No hay próximas entregas.
            </p>

        `;

        return;

    }


    contenedor.innerHTML = "";


    pendientes.forEach((tarea) => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "lista-item";


        elemento.innerHTML = `

            <div>

                <strong>
                    ${tarea.nombre}
                </strong>

                <small>
                    ${tarea.responsableNombre}
                </small>

            </div>


            <small>
                ${formatearFecha(tarea.fecha)}
            </small>

        `;


        contenedor.appendChild(elemento);

    });

}


/* =========================================
   INFORMACIÓN DEL INICIO
   ========================================= */

/*
 * Se actualizan los contadores y el porcentaje
 * de progreso del proyecto.
 */

function actualizarDashboard() {

    document
        .getElementById("totalIntegrantes")
        .textContent =
        integrantes.length;


    document
        .getElementById("totalTareas")
        .textContent =
        tareas.length;


    const pendientes =
        tareas.filter(
            (tarea) =>
                tarea.estado !== "Completada"
        ).length;


    const completadas =
        tareas.filter(
            (tarea) =>
                tarea.estado === "Completada"
        ).length;


    document
        .getElementById("totalPendientes")
        .textContent =
        pendientes;


    document
        .getElementById("totalCompletadas")
        .textContent =
        completadas;


    /*
     * Se calcula el porcentaje de avance
     * según las tareas completadas.
     */

    let porcentaje = 0;


    if (tareas.length > 0) {

        porcentaje =
            Math.round(
                (completadas / tareas.length) * 100
            );

    }


    document
        .getElementById("barraProgreso")
        .style.width =
        `${porcentaje}%`;


    document
        .getElementById("textoProgreso")
        .textContent =
        `${porcentaje}%`;

}


/* =========================================
   MOSTRAR PROYECTO
   ========================================= */

/*
 * Se muestra el proyecto registrado actualmente.
 */

function mostrarProyecto() {

    const contenedor =
        document.getElementById(
            "proyectoActual"
        );


    const nombreInicio =
        document.getElementById(
            "nombreProyectoInicio"
        );


    const botonEliminar =
        document.getElementById(
            "eliminarProyecto"
        );


    if (!proyecto) {

        contenedor.innerHTML = `

            <p class="mensaje-vacio">
                No hay un proyecto registrado.
            </p>

        `;


        nombreInicio.textContent =
            "No hay un proyecto registrado.";


        botonEliminar.style.display =
            "none";


        return;

    }


    contenedor.innerHTML = `

        <div class="lista-item">

            <div>

                <strong>
                    ${proyecto.nombre}
                </strong>

                <small>
                    Proyecto académico registrado
                </small>

            </div>

        </div>

    `;


    nombreInicio.textContent =
        proyecto.nombre;


    botonEliminar.style.display =
        "inline-block";

}


/* =========================================
   GUARDAR INFORMACIÓN
   ========================================= */

/*
 * Se guardan integrantes, tareas y recursos
 * dentro del almacenamiento local del navegador.
 */

function guardarDatos() {

    localStorage.setItem(
        "integrantes",
        JSON.stringify(integrantes)
    );


    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );


    localStorage.setItem(
        "recursos",
        JSON.stringify(recursos)
    );

}


/* =========================================
   ACTUALIZAR INTERFAZ
   ========================================= */

/*
 * Se actualizan las diferentes partes de la interfaz
 * después de realizar cambios en los datos.
 */

function actualizarInterfaz() {

    mostrarProyecto();

    mostrarIntegrantes();

    actualizarResponsables();

    mostrarTareas();

    mostrarRecursos();

    mostrarRecordatorios();

    mostrarProximasEntregas();

    actualizarDashboard();

}


/* =========================================
   FORMATO DE FECHAS
   ========================================= */

/*
 * Se convierte la fecha almacenada de año-mes-día
 * al formato día/mes/año.
 */

function formatearFecha(fecha) {

    if (!fecha) {

        return "";

    }


    const partes =
        fecha.split("-");


    if (partes.length !== 3) {

        return fecha;

    }


    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


/* =========================================
   CERRAR SESIÓN
   ========================================= */

/*
 * Se regresa al inicio de sesión al cerrar
 * la sesión actual.
 */

document
    .getElementById("cerrarSesion")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "../login/index.html";

        }
    );


/* =========================================
   CARGA INICIAL
   ========================================= */

/*
 * Se cargan los datos almacenados al abrir
 * nuevamente el sistema.
 */

actualizarInterfaz();