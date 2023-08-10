const btnLogin = document.getElementById("login");
const btnCancel = document.getElementById("cancelLogin");
const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const mensajeBienvenida = document.getElementById("bienvenido");
const btnPagar = document.getElementById("botonPagar");
const btnCrearAcc = document.getElementById("crearAcc");
const usuarioConectado = JSON.parse(localStorage.getItem("usuarioON")) || [];
const check = document.getElementById("verContra");
const nombreLoginInput = document.getElementById("nombreLogin");
const passwordLoginInput = document.getElementById("passwordLogin");
//
//
function Login() {
  const nombreLogin = nombreLoginInput.value;
  const passwordLogin = passwordLoginInput.value;
  const usuarioEncontrado = listaUsuarios.find((user) => user.nombre === nombreLogin && user.password === passwordLogin);
  if (usuarioEncontrado) {
    const nombreUsuario = { nombreLogin };
    usuarioConectado.push(nombreUsuario);
    localStorage.setItem("usuarioON", JSON.stringify(usuarioConectado));
    nombreLoginInput.value = "";
    passwordLoginInput.value = "";
    window.location.href = "../../index.html";
  } else {
    Swal.fire({
      icon: "error",
      title: "Error al iniciar",
      text: "Nombre de usuario o contraseña incorrectos",
      confirmButtonText: "Volver a intentar",
    });
  }
}
function cancelar() {
  window.location.href = "../../index.html";
}
function ircrear() {
  window.location.href = "../pages/crear.html";
}
//
//
btnLogin.addEventListener("click", Login);
btnCrearAcc.addEventListener("click", ircrear);
btnCancel.addEventListener("click", cancelar);

check.addEventListener("click", () => {
  if (check.checked) {
    passwordLoginInput.type = "text";
  } else {
    passwordLoginInput.type = "password";
  }
});
