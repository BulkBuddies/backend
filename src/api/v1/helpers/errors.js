const ERRORS = new Map([
  ["23502", { status: 400, message: "El campo no puede estar vacio" }],
  [
    "42P01",
    { status: 500, message: "error en la conexion con la base de datos" },
  ],
  ["23505", { status: 500, message: "correo ya existe" }],
  ["22P02", { status: 400, message: "bad request" }],
  ["42601", { status: 400, message: "error de sintaxis en la consulta" }],
  ["auth_01", { status: 400, message: "el usuario no existe" }],
  ["auth_02", { status: 400, message: "contraseña invalida" }],
  ["auth_03", { status: 401, message: "el token debe estar presente" }],
  ["auth_04", { status: 401, message: "el token no es valido" }],
  ["auth_05", { status: 400, message: "Faltan email o password" }],
  ["signup", { status: 400, message: "Debe llenar todos los campos" }],
]);

export default ERRORS;
