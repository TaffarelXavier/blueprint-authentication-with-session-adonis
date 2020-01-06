const instance = axios.create({
  baseURL: "http://127.0.0.1:3004",
  withCredentials: true
});

const Formulario = {
  /**
   *
   *
   *
   *
   * */
  formRegister: document.getElementById("formRegister"),
  /**
   *
   *
   *
   *
   * */
  formLogin: document.getElementById("formLogin"),
  /**
   *
   *
   *
   *
   * */
  btnLogout: document.getElementById("btnLogout"),
  /**
   *
   *
   *
   *
   * */
  registrar: () => {
    Formulario.formRegister.onsubmit = () => {
      var form = new FormData(Formulario.formRegister);

      instance
        .post("/register", form)
        .then(response => {
          if (response.status == 200) {
            window.localStorage.setItem("user", JSON.stringify(response.data));
          } else {
            throw new Error("Ops! Houve um erro em nosso servidor.");
          }
        })
        .catch(error => {
          console.log(error);
          log(JSON.stringify(error));
        });

      return false;
    };
  },

  /**
   *
   *
   *          LOGIN
   *
   *
   * */
  login: callback => {
    Formulario.formLogin.onsubmit = ev => {
      ev.preventDefault();

      var form = new FormData(Formulario.formLogin);

      instance
        .post("/login", form)
        .then(response => {
          if (response.status == 200) {
            window.localStorage.setItem("user", JSON.stringify(response.data));
            callback(response.data);
            Formulario.btnLogout.removeAttribute("hidden");
          } else {
            throw new Error("Ops! Houve um erro em nosso servidor.");
          }
        })
        .catch(error => {
          console.log(error);
          log(JSON.stringify(error));
        });

      return false;
    };
  },
  /**
   *
   *
   *
   *
   * */
  mostrarUsuarioConectado: () => {
    if (window.localStorage.getItem("user")) {
      const { id } = JSON.parse(window.localStorage.getItem("user"));
      instance("/users/" + id, {
        method: "GET"
      })
        .then(response => {
          if (response.status == 200) {
            const { username } = response.data;
            document.getElementById(
              "firstname"
            ).innerHTML = username.toUpperCase();
            Formulario.btnLogout.removeAttribute("hidden");
          } else {
            response.statusText;
          }
        })
        .catch(error => {
          console.log(error);
          log(JSON.stringify(error));
        });
    }
  },
  /**
   *
   *
   *
   *
   * */
  logout: () => {
    Formulario.btnLogout.onclick = () => {
      if (window.localStorage.getItem("user")) {
        instance("/logout", {
          method: "GET"
        })
          .then(response => {
              console.log("TEste");
            if(response.status === 401 || response.status === 200){
                window.localStorage.removeItem("user");
                window.location.reload();
            }
            else{
                return response.statusText;
            }
          })
          .catch(response => {
              console.log(response);
          });
      }
    };
  },
  mostrarTodosUsuarios() {
    instance("/users/", {
      method: "GET"
    })
      .then(response => {
        return response.status == 200
          ? log(JSON.stringify(response.data), "mostrar-todos-usuarios")
          : response.statusText;
      })
      .catch(error => {
        console.log(error);
        log(JSON.stringify(error));
      });
  },
  run: () => {
    Formulario.registrar();
    Formulario.login(result => {
      const { username } = result;
      document.getElementById("firstname").innerHTML = username;
    });
    Formulario.mostrarUsuarioConectado();
    Formulario.logout();
    Formulario.mostrarTodosUsuarios();
  }
};

function log(content, id = "mostrar-usuario") {
  document.getElementById(id).append(content);
}

Formulario.run();
