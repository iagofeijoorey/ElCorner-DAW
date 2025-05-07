//Resaltar ENTRAR
function resaltar(x) {
  x.style.height = "53px";
  x.style.width = "140px";
  x.style.backgroundColor = '#2980b9';
  
  // Use absolute positioning to prevent layout shift
  x.style.position = 'relative';
  x.style.transform = 'translateY(-13px)'; // Compensate for height increase
  x.style.zIndex = '1'; // Ensure it appears above other elements
  
  // Adjust box-shadow for a more pronounced effect
  x.style.boxShadow = '0 8px 10px rgba(0, 0, 0, 0.2)';
}
function quitarResaltado(x) {
  x.style.height = "40px";
  x.style.width = "130px";
  x.style.backgroundColor = '#3498db';
  
  // Reset positioning
  x.style.position = 'static';
  x.style.transform = 'translateY(0)';
  x.style.zIndex = 'auto';
  
  // Restore original box-shadow
  x.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
}

//Resaltar redes sociales
function resaltarSocial(x){
  x.style.opacity = '0.75';
  x.style.transform = 'translateY(-6px)';
}
function quitarResaltadoSocial(x){
  x.style.opacity = '1';
  x.style.transform = 'translateY(0)';
}

function borrarTexto(x){
  x.innerHTML.placeholder="";
}



/* ------------------------------------------------------------------------------------------------------------------------ */
/* -------------------------------------------------    LOGIN    ---------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------ */

function handleLoginSubmit(event) {
  event.preventDefault(); // Prevenir envío del formulario por defecto

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username.trim() === '') {
    mostrarMensaje('Por favor, ingrese su nombre de usuario', false);
    return;
  }

  if (password.trim() === '') {
    mostrarMensaje('Por favor, ingrese su contraseña', false);
    return;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const xmlDoc = this.responseXML;
        if (xmlDoc) {
          validateUser(username, password, xmlDoc);
        } else {
          mostrarMensaje('Error al procesar los datos de usuario.', false);
        }
      } else {
        mostrarMensaje('Error al conectar con la base de datos.', false);
      }
    }
  };

  xhttp.open("GET", "../../BaseDeDatos/usuarios.xml", true);
  xhttp.send();
}

function validateUser(username, password, xmlDoc) {
  const usuarios = xmlDoc.getElementsByTagName('usuario');
  let usuarioValido = false;
  
  for (let i = 0; i < usuarios.length; i++) {
    const user = usuarios[i];
    const usuarioNode = user.getElementsByTagName('nombre_usuario')[0];
    const contrasenaNode = user.getElementsByTagName('contrasena')[0];
    
    if (usuarioNode && contrasenaNode && 
        usuarioNode.textContent === username && 
        contrasenaNode.textContent === password) {
      usuarioValido = true;
      break;
    }
  }
  
  if (usuarioValido) {
    // Si el usuario es válido, guardar información en localStorage
    localStorage.setItem('sesionActiva', 'true');
    localStorage.setItem('usuario', username);
    
    // Mostrar modal de éxito
    mostrarMensaje('¡Has iniciado sesión correctamente!', true);
    
    // Redirigir a la página de perfil después de un breve delay
    setTimeout(() => {
      window.location.href = 'perfil.html';
    }, 1500);
  } else {
    // Si no coincide, mostrar modal de error
    mostrarMensaje('Las credenciales no son correctas', false);
  }
}

function verificarSesion() {
  const sesionActiva = localStorage.getItem('sesionActiva');

  // Si hay una sesión activa y estamos en la página de login, redirigir a perfil
  if (sesionActiva === 'true' && window.location.href.includes('login.html')) {
    window.location.href = 'perfil.html';
  }
}

document.addEventListener('DOMContentLoaded', function() {

  verificarSesion();


  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

});








/* ----------------------------------------------------------------------------------------------------------------------- */
/* -----------------------------------------------    VENTANAS    -------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------- */

function borrarTexto(x){
  x.placeholder = "";
}
function mostrarMensaje(mensaje, esExito) {
  // Crear contenedor del modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  // Crear contenido del modal
  const modalContenido = document.createElement('div');
  modalContenido.style.backgroundColor = esExito ? '#4CAF50' : '#f44336';
  modalContenido.style.color = 'white';
  modalContenido.style.padding = '20px';
  modalContenido.style.borderRadius = '10px';
  modalContenido.style.textAlign = 'center';
  modalContenido.style.maxWidth = '300px';
  modalContenido.style.width = '100%';

  // Añadir mensaje
  const mensajeTexto = document.createElement('p');
  mensajeTexto.textContent = mensaje;
  mensajeTexto.style.margin = '0 0 15px 0';
  mensajeTexto.style.fontSize = '18px';

  // Añadir botón de aceptar
  const botonAceptar = document.createElement('button');
  botonAceptar.textContent = 'Aceptar';
  botonAceptar.style.backgroundColor = 'white';
  botonAceptar.style.color = esExito ? '#4CAF50' : '#f44336';
  botonAceptar.style.border = 'none';
  botonAceptar.style.padding = '10px 20px';
  botonAceptar.style.borderRadius = '5px';
  botonAceptar.style.cursor = 'pointer';

  // Añadir funcionalidad al botón
  botonAceptar.addEventListener('click', () => {
    document.body.removeChild(modal);
    if (esExito) {
      window.location.href = 'perfil.html';
    }
  });

  // Ensamblar modal
  modalContenido.appendChild(mensajeTexto);
  modalContenido.appendChild(botonAceptar);
  modal.appendChild(modalContenido);

  // Añadir modal al body
  document.body.appendChild(modal);
}