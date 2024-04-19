const ERRORS = new Map([
  ["23502", { status: 400, message: "El campo no puede estar vacio" }],
  [
    "42P01",
    { status: 500, message: "error en la conexion con la base de datos" },
  ],
  ["23505", { status: 500, message: "correo ya existe" }],
  ["22P02", { status: 400, message: "bad request" }],
  ["42601", { status: 400, message: "error de sintaxis en la consulta" }],
  ["2201W", { status: 400, message: "Valor del LIMIT no puede ser negativo" }],
  ["auth_01", { status: 400, message: "el usuario no existe" }],
  ["auth_02", { status: 400, message: "contraseña invalida" }],
  ["auth_03", { status: 401, message: "el token debe estar presente" }],
  ["auth_05", { status: 400, message: "Faltan email o password" }],
  ["auth_06", { status: 204, message: "Sin cookie" }],
  ["auth_07", { status: 401, message: "Sin credenciales en la cookie" }],
  ["jwt expired", { status: 403, message: "el token expiró" }],
  ["invalid token", { status: 401, message: "el token no es valido" }],
  ["jwt malformed", { status: 401, message: "JWT formato no válido" }],
  ["No Bearer", { status: 401, message: "Utiliza formato Bearer" }],
  [
    "invalid signature",
    { status: 401, message: "La firma del JWT no es válida" },
  ],
  ["signup", { status: 400, message: "Debe llenar todos los campos" }],
]);

export default ERRORS;
