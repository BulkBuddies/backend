const ERRORS = new Map([
  ["23502", { status: 400, message: "El campo no puede estar vacio" }],
  [
    "42P01",
    { status: 500, message: "error en la conexion con la base de datos" },
  ],
  ["23505", { status: 400, message: "correo o nombre de usuario ya existe" }],
  ["22P02", { status: 400, message: "bad request" }],
  ["42601", { status: 400, message: "error de sintaxis en la consulta" }],
  ["2201W", { status: 400, message: "Valor del LIMIT no puede ser negativo" }],
  ["auth_01", { status: 404, message: "el usuario no existe" }],
  ["auth_02", { status: 400, message: "contraseña o username incorrecto" }],
  ["auth_03", { status: 401, message: "el token debe estar presente" }],
  ["auth_04", { status: 401, message: "Sin autorización" }],
  ["auth_05", { status: 400, message: "Faltan email o password" }],
  ["auth_06", { status: 401, message: "No hay JWT en la cookie" }],
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
  ["post_1", { status: 404, message: "Este post no existe" }],
  ["category_01", { status: 404, message: "Esta categoria no existe" }],
]);

export default ERRORS;
