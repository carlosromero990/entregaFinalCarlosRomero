const btnCrear = document.getElementById("crear");
const btnSalir = document.getElementById("salir");
const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const repaswordInput = document.getElementById("repasword");
const emailInput = document.getElementById("email");
const check = document.getElementById("verContra");
const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function Crear() {
  const nombre = nombreInput.value;
  const password = passwordInput.value;
  const repasword = repaswordInput.value;
  const email = emailInput.value;
  if (password === repasword) {
    if (nombre && password && email) {
      const user = { nombre, password, email };
      listaUsuarios.push(user);
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Tu cuenta se creo con exito",
        showConfirmButton: false,
        timer: 3000,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../../index.html";
        } else {
          {
            window.location.href = "../../index.html";
          }
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor ingrese todos los datos requeridos",
        confirmButtonText: "Volver a intentar",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Las contraseñas no coinciden",
      confirmButtonText: "Volver a intentar",
    });
  }
}

function sal() {
  window.location.href = "../../index.html";
}
btnCrear.addEventListener("click", Crear);
btnSalir.addEventListener("click", sal);
check.addEventListener("click", () => {
  if (check.checked) {
    passwordInput.type = "text";
    repaswordInput.type = "text";
  } else {
    passwordInput.type = "password";
    repaswordInput.type = "password";
  }
});
