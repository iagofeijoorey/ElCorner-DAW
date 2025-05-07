/* -----------------------------------------------------------------------------*/
/* ------------------------- FUNCIONES AUXILIARES ------------------------------*/
/* -----------------------------------------------------------------------------*/
function verificarSesion() {
    const sesionActiva = localStorage.getItem('sesionActiva');
  
    // Si hay una sesión activa y estamos en la página de login, redirigir a perfil
    if (sesionActiva === 'true' && window.location.href.includes('login.html')) {
      window.location.href = 'perfil.html';
    }
}
function cerrarSesion() {
    localStorage.removeItem('sesionActiva');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}
    





/* -----------------------------------------------------------------------------*/
/* --------------------- CAMBIAR DE PESTAÑA EN PERFIL --------------------------*/
/* -----------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Funcionalidad de las pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Desactivar todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Activar la pestaña seleccionada
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });




    // Verificar si hay una sesión activa
    verificarSesion();
    
    // Configurar botón de cerrar sesión si existe
    const logoutButton = document.getElementById('cerrar-sesion');
    if (logoutButton) {
      logoutButton.addEventListener('click', cerrarSesion);
    }
});







/* -----------------------------------------------------------------------------*/
/* ----------------------- CARGAR DATOS DEL USUARIO ----------------------------*/
/* -----------------------------------------------------------------------------*/
$(document).ready(function() {
    const usuarioActivo = localStorage.getItem('usuario');

    if (!usuarioActivo) {
        console.log('No hay usuario activo en localStorage');
        return;
    }

    console.log('Usuario activo:', usuarioActivo);


    const nombreUsuarioGuardado = localStorage.getItem('usuario');
            if (nombreUsuarioGuardado) {
                document.getElementById('username-display').textContent = nombreUsuarioGuardado;
                document.getElementById('nombre').value = nombreUsuarioGuardado;
            }

            document.getElementById('username-display').textContent = "aaaaa";
            $('#nombre').val("aaaaa");

    fetch('../../BaseDeDatos/datosUsuarios.json')
        .then(response => {
            console.log('Respuesta del fetch:', response);

            if (!response.ok) {
                mostrarMensaje('Error al conectar con la base de datos.', false);
            }
            return response.json();
        })
        .then(jsonObj => {
            console.log('JSON cargado:', jsonObj);

            // Buscar el usuario activo en el JSON
            const usuarioValido = jsonObj.datosUsuarios.find(
                user => user.usuario === usuarioActivo
            );


            

            // Si encontramos el usuario, actualizamos los campos del formulario
            if (usuarioValido) {
                console.log('Usuario encontrado:', usuarioValido);

                // Actualizar el nombre de usuario en el encabezado
                document.getElementById('username-display').textContent = usuarioValido.usuario;

                // Actualizar campos del formulario de información personal
                document.getElementById('nombre').value = usuarioValido.nombre;
                document.getElementById('apellidos').value = usuarioValido.apellidos;
                document.getElementById('email').value = usuarioValido.email;
                document.getElementById('telefono').value = usuarioValido.telefono;
                document.getElementById('fecha-nacimiento').value = usuarioValido.fechaNacimiento;
                document.getElementById('ubicacion').value = usuarioValido.ubicacion;
                document.getElementById('bio').value = usuarioValido.acercaDeMi;

                // También podríamos actualizar la sección de equipos si es necesario
                // Esto dependería de cómo se estructura la información de equipos en el HTML

                console.log('Datos de usuario cargados correctamente');
            } else {
                console.error('Usuario no encontrado en la base de datos');
            }
        })

}); 


/*
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Funcionalidad de las pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Desactivar todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Activar la pestaña seleccionada
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Mostrar el nombre de usuario almacenado en localStorage
    const nombreUsuarioGuardado = localStorage.getItem('usuario');
    if (nombreUsuarioGuardado) {
        document.getElementById('username-display').textContent = nombreUsuarioGuardado;
        document.getElementById('nombre').value = nombreUsuarioGuardado;
    }
    
    // Configurar el botón de cerrar sesión
    document.getElementById('cerrar-sesion').addEventListener('click', function() {
        // Eliminar datos de sesión del localStorage
        localStorage.removeItem('sesionActiva');
        localStorage.removeItem('usuario');
        
        // Redirigir a la página de login
        window.location.href = 'login.html';
    });
});
*/