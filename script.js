function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materias = [];
    this.calificaciones = {};
}


function Clase(nombre) {
    this.nombre = nombre;
    this.alumnosInscritos = [];
}

let alumnos = [];

let clases = [
    new Clase("Matemáticas"),
    new Clase("Historia"),
    new Clase("Ciencias"),
    new Clase("Musica"),
    new Clase("Gimnasia"),
    // Agrega más clases si lo deseas
];
function darDeAltaAlumno(event) {
    if (event) {
        event.preventDefault(); // Evitar que el formulario se envíe
    }
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = parseInt(document.getElementById("edad").value);

    let nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);

    // Guardar en LocalStorage
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    console.log("Alumno dado de alta:", nuevoAlumno);

    // Limpiar el formulario
    document.getElementById("alta-alumno-form").reset();
    
    // Recargar la página
    location.reload();
}



window.onload = function() {
    if(localStorage.getItem('alumnos')) {
        alumnos = JSON.parse(localStorage.getItem('alumnos'));
    }
};

window.addEventListener('load', function() {
    if(localStorage.getItem('alumnos')) {
        alumnos = JSON.parse(localStorage.getItem('alumnos'));
        let alumnosSelect = document.getElementById("alumnos-select");
        alumnos.forEach(alumno => {
            let option = document.createElement("option");
            option.value = alumno.nombre;
            option.text = alumno.nombre;
            alumnosSelect.appendChild(option);
        });
    }
});


function asignarMaterias(alumno) {
    let materiasCheckbox = document.querySelectorAll("#materias-container input[type='checkbox']:checked");
    alumno.materias = [];
    materiasCheckbox.forEach(checkbox => {
        let materiaNombre = checkbox.value;
        alumno.materias.push(materiaNombre);
    });
    // Actualizar el registro del alumno en LocalStorage
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    console.log("Materias asignadas:", alumno.materias);

    // Limpiar el formulario y mostrar los alumnos actualizados
    limpiarFormulario();
    mostrarAlumnos();
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("edad").value = "";
    document.querySelectorAll("#materias-container input[type='checkbox']:checked").forEach(checkbox => {
        checkbox.checked = false;
    });
}
function mostrarMaterias() {
    let alumnoNombre = document.getElementById("alumnos-select").value;
    let alumno = alumnos.find(alumno => alumno.nombre === alumnoNombre);
    if (alumno) {
        let materiasContainer = document.getElementById("materias-container");
        materiasContainer.innerHTML = ""; // Limpiar el contenedor de materias
        clases.forEach(clase => {
            let formCheck = document.createElement("div");
            formCheck.className = "form-check";
            
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = clase.nombre;
            checkbox.id = clase.nombre;
            checkbox.className = "form-check-input";
            
            let label = document.createElement("label");
            label.setAttribute("for", clase.nombre);
            label.className = "form-check-label";
            label.textContent = clase.nombre;
            
            formCheck.appendChild(checkbox);
            formCheck.appendChild(label);
            materiasContainer.appendChild(formCheck);
        });
        let asignarButton = document.createElement("button");
        asignarButton.textContent = "Asignar Materias";
        asignarButton.className = "btn btn-primary"; // Añadir las clases de Bootstrap al botón
        asignarButton.addEventListener("click", function() {
            asignarMaterias(alumno);
        });
        materiasContainer.appendChild(asignarButton);
    }
}

function mostrarAlumnos() {
    let alumnosContainer = document.getElementById("alumnos-container");
    alumnosContainer.innerHTML = ""; // Limpiar el contenedor de alumnos

    alumnos.forEach(alumno => {
        let card = document.createElement("div");
        card.className = "card mb-3";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let nombre = document.createElement("h5");
        nombre.className = "card-title";
        nombre.textContent = `Nombre: ${alumno.nombre} ${alumno.apellidos}`;

        let edad = document.createElement("p");
        edad.className = "card-text";
        edad.textContent = `Edad: ${alumno.edad}`;

        let materias = document.createElement("p");
        materias.className = "card-text";
        materias.textContent = `Materias: ${alumno.materias.join(", ")}`;

        let calificaciones = document.createElement("p");
        calificaciones.className = "card-text";
        calificaciones.textContent = "Calificaciones:";
        for (const materia in alumno.calificaciones) {
            const califs = alumno.calificaciones[materia];
            calificaciones.textContent += `\n${materia}: ${califs.join(", ")}`;
        }

        cardBody.appendChild(nombre);
        cardBody.appendChild(edad);
        cardBody.appendChild(materias);
        cardBody.appendChild(calificaciones);
        card.appendChild(cardBody);
        alumnosContainer.appendChild(card);
    });
}

function buscarAlumno() {
    let filtro = document.getElementById("filtro-nombre").value.toLowerCase();
    let alumnosFiltrados = alumnos.filter(alumno => {
        let nombreCompleto = `${alumno.nombre.toLowerCase()} ${alumno.apellidos.toLowerCase()}`;
        return nombreCompleto.includes(filtro);
    });

    let alumnosContainer = document.getElementById("alumnos-container");
    alumnosContainer.innerHTML = ""; // Limpiar el contenedor de alumnos

    alumnosFiltrados.forEach(alumno => {
        let card = document.createElement("div");
        card.className = "card mb-3";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let nombre = document.createElement("h5");
        nombre.className = "card-title";
        nombre.textContent = `Nombre: ${alumno.nombre} ${alumno.apellidos}`;

        let edad = document.createElement("p");
        edad.className = "card-text";
        edad.textContent = `Edad: ${alumno.edad}`;

        let materias = document.createElement("p");
        materias.className = "card-text";
        materias.textContent = `Materias: ${alumno.materias.join(", ")}`;

        let calificaciones = document.createElement("p");
        calificaciones.className = "card-text";
        calificaciones.textContent = "Calificaciones:";
        for (const materia in alumno.calificaciones) {
            const califs = alumno.calificaciones[materia];
            calificaciones.textContent += `\n${materia}: ${califs.join(", ")}`;
        }

        cardBody.appendChild(nombre);
        cardBody.appendChild(edad);
        cardBody.appendChild(materias);
        cardBody.appendChild(calificaciones);
        card.appendChild(cardBody);
        alumnosContainer.appendChild(card);
    });
}

// Llamar a mostrarMaterias cuando se carga la página
window.addEventListener('load', function() {
    if(localStorage.getItem('alumnos')) {
        alumnos = JSON.parse(localStorage.getItem('alumnos'));
        mostrarAlumnos();
        mostrarMaterias(); // Mostrar materias al cargar la página
    }
});

// Llamar a mostrarMaterias cuando se selecciona un alumno
document.getElementById("alumnos-select").addEventListener("change", function() {
    mostrarMaterias();
});

