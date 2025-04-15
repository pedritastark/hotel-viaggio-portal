import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Configuración de Firebase: completa estos campos con tu proyecto
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "https://hotel-viaggio-captive-portal-default-rtdb.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const splashDuration = 2000; // 4 segundos

  // Transición splash → formulario
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      const login = document.getElementById('login');
      login.classList.remove('hidden');
      login.classList.add('fade-in');
    }, 500);
  }, splashDuration);

  // Envío del formulario
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const tratamiento = document.getElementById('tratamiento');
    if (!tratamiento.checked) {
      alert("Debe autorizar el tratamiento de datos personales.");
      return;
    }

    // Recopila datos
    const nombre     = document.getElementById("nombre").value;
    const telefono   = document.getElementById("telefono").value;
    const correo     = document.getElementById("correo").value;
    const codigo     = document.getElementById("codigo").value;
    const publicidad = document.getElementById("publicidad").checked;

    try {
      await push(ref(db, 'usuarios'), {
        nombre,
        telefono,
        correo,
        codigo,
        tratamiento: true,
        publicidad,
        fecha: new Date().toISOString()
      });

      // Transición formulario → “conectado”
      const login = document.getElementById('login');
      login.classList.add('fade-out');
      setTimeout(() => {
        login.style.display = 'none';
        const connected = document.getElementById('connected');
        connected.classList.remove('hidden');
        connected.classList.add('fade-in');
      }, 500);

    } catch (err) {
      console.error("Error al guardar en Firebase:", err);
      alert("Error al guardar los datos.");
    }
  });
});