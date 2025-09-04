// Autenticación y lógica del tendero
document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const addClientBtn = document.getElementById("addClient");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const clientNameInput = document.getElementById("clientName");
  const clientDebtInput = document.getElementById("clientDebt");
  const clientList = document.getElementById("clientList");

  const authSection = document.getElementById("auth-section");
  const dashboard = document.getElementById("dashboard");

  // Registro
  registerBtn.addEventListener("click", () => {
    auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(() => alert("Tendero registrado"))
      .catch(err => alert(err.message));
  });

  // Login
  loginBtn.addEventListener("click", () => {
    auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      .catch(err => alert(err.message));
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    auth.signOut();
  });

  // Estado de autenticación
  auth.onAuthStateChanged(user => {
    if (user) {
      authSection.classList.add("hidden");
      dashboard.classList.remove("hidden");
      cargarClientes(user.uid);
    } else {
      authSection.classList.remove("hidden");
      dashboard.classList.add("hidden");
    }
  });

  // Añadir cliente
  addClientBtn.addEventListener("click", () => {
    const user = auth.currentUser;
    if (user) {
      const cliente = {
        nombre: clientNameInput.value,
        deuda: parseFloat(clientDebtInput.value)
      };
      db.collection("tenderos").doc(user.uid).collection("clientes").add(cliente)
        .then(() => {
          clientNameInput.value = "";
          clientDebtInput.value = "";
          cargarClientes(user.uid);
        });
    }
  });

  // Cargar clientes
  function cargarClientes(uid) {
    clientList.innerHTML = "";
    db.collection("tenderos").doc(uid).collection("clientes").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const li = document.createElement("li");
          li.textContent = `${data.nombre} - $${data.deuda}`;
          clientList.appendChild(li);
        });
      });
  }
});
