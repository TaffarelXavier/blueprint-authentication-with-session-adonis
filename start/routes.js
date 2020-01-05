'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Essas rotas devem ser acessíveis apenas //
// quando você não está logado
Route.group(() => {
  //Faz o login
  Route.post("/login", "SessionController.login")
  //Cadastrar um novo usuário:
  Route.post('/register', 'SessionController.register')
}).middleware(['guest'])


// Essas rotas devem ser acessíveis apenas
// quando você está logado
Route.group(() => {
//Buscar um usuário pelo ID dele
Route.get("users/:id", "SessionController.show").middleware("auth");

//Faz o logout
Route.get("/logout", "SessionController.logout");
}).middleware(['auth'])