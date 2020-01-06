"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/users", "UserController.index");

Route.group(() => {
  //Faz o login
  Route.post("/login", "SessionController.login");
  //Cadastrar um novo usuário:
  Route.post("/register", "SessionController.register");
}).middleware(["guest"]);

// Essas rotas devem ser acessíveis apenas
// quando você está logado
Route.group(() => {
  //Buscar um usuário pelo ID dele
  Route.get("users/:id", "SessionController.show").middleware("auth");

  //Faz o logout
  Route.get("/logout", "SessionController.logout");
}).middleware(["auth"]);
