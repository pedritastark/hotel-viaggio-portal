import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Configuración de Firebase: completa estos campos con tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyD_ssdJGtfVkTBG7VJIT_fgsUfFT1C-8X4",
  authDomain: "hotel-viaggio-captive-portal.firebaseapp.com",
  databaseURL: "https://hotel-viaggio-captive-portal-default-rtdb.firebaseio.com",
  projectId: "hotel-viaggio-captive-portal",
  storageBucket: "hotel-viaggio-captive-portal.firebasestorage.app",
  messagingSenderId: "820374435802",
  appId: "1:820374435802:web:eed234e5ef1237ff9732e3",
  measurementId: "G-F6PEVLKV5Z"
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app), 'usuarios');

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const login  = document.getElementById('login');
  const fadeDuration   = 500;    // milisegundos de animación
  const splashDuration = 3000;   // tiempo en milisegundos para mostrar splash

  // 2. Mostrar splash y luego formulario
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      login.classList.remove('hidden');
      login.classList.add('fade-in');
    }, fadeDuration);
  }, splashDuration);

  // 3. Manejar envío del formulario
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validar consentimiento
    const tratamientoChecked = document.getElementById('tratamiento').checked;
    if (!tratamientoChecked) {
      alert("Debe autorizar el tratamiento de datos personales.");
      return;
    }

    // Recopilar datos
    const datos = {
      nombre:     document.getElementById('nombre').value,
      telefono:   document.getElementById('telefono').value,
      correo:     document.getElementById('correo').value,
      codigo:     document.getElementById('codigo').value,
      tratamiento: true,
      publicidad: document.getElementById('publicidad').checked,
      fecha:      new Date().toISOString()
    };

    try {
      // 4. Guardar en Firebase RTDB
      await push(dbRef, datos);

      // 5. Reemplazar formulario por pantalla "Conectado"
      const card = document.getElementById('login');
      card.classList.remove('fade-in');
      card.innerHTML = `
        <h2>Estás conectado a Internet</h2>
        <p>Disfruta de la mejor experiencia digital en Hotel Viaggio 617.</p>
        <button id="navigateBtn">Ir a Internet</button>
      `;
      document.getElementById('navigateBtn')
        .addEventListener('click', () => window.location.href = 'https://www.google.com');

    } catch (err) {
      console.error("Error al guardar en Firebase:", err);
      alert("Error al guardar los datos.");
    }
  });
});