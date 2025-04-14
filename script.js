document.addEventListener("DOMContentLoaded", function() {
    const splashDuration = 3000; // Duración del splash: 4 segundos
  
    // Después de 4 segundos se inicia la transición de salida del splash
    setTimeout(() => {
      const splash = document.getElementById('splash');
      splash.classList.add('fade-out');
      // Esperamos la duración de la animación (0.5s) y luego ocultamos splash y mostramos login
      setTimeout(() => {
        splash.style.display = 'none';
        const login = document.getElementById('login');
        login.classList.remove('hidden');
        login.classList.add('fade-in');
      }, 500);
    }, splashDuration);
  
    // Manejo del envío del formulario
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Validación: se requiere aceptar tratamiento de datos personales
      const tratamiento = document.getElementById('tratamiento');
      if (!tratamiento.checked) {
        alert("Debe autorizar el tratamiento de datos personales.");
        return;
      }
  
      // Aquí se puede agregar lógica adicional, por ejemplo, enviar datos a un backend.
      // Transición a pantalla de "conectado"
      document.getElementById('login').classList.add('fade-out');
      setTimeout(() => {
        document.getElementById('login').style.display = 'none';
        const connected = document.getElementById('connected');
        connected.classList.remove('hidden');
        connected.classList.add('fade-in');
      }, 500);
    });
  });