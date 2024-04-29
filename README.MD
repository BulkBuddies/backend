# Bulkbuddies

___

## Indice

- [Descripción](#descripción)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
  - [Instalación de las dependencias](#instalación-de-las-dependencias)
  - [Variables de entorno](#variables-de-entorno)
    - [Puerto del servidor](#puerto-del-servidor)
    - [Conexión a la base de datos](#conexión-a-la-base-de-datos)
    - [Creación de la base de datos de manera remota](#creación-de-la-base-de-datos-de-manera-remota)
    - [Llaves secretas para el JSONWebToken](#llaves-secretas-para-el-jsonwebtoken)
    - [CORS (Cross Origin Resource Sharing)](#cors-cross-origin-resource-sharing)
    - [Autenticación con Google](#autenticación-con-google)
- [Iniciar](#iniciar)
  - [Iniciar en ambiente de producción](#iniciar-en-ambiente-de-producción)
- [Testing](#testing)
  - [Correr tests](#correr-tests)
- [Endpoints](#endpoints)
  - [Autenticación](#autenticación)
  - [User](#user)
  - [Post](#post)
  - [Profile](#profile)
  - [Región](#región)
- [Documentación](#documentación)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Colaboradores](#colaboradores)


## Descripción

API Rest de la aplicación web que facilita la gestión de la importación de productos al mayor cuando existe un interés compartido en cierto producto, lo que produce un pago de cierta cantidad del producto en la medida que el interesado pueda pagar por cierta cantidad.

Entre varios interesados se paga por para poder importar un producto en precio al mayor.


## Requisitos

- Node 20
- VS Code u otro IDE


## Instalación

### Instalación de las dependencias

En la terminal:

``` 
npm install  
```



- Para el funcionamiento de la API en ambiente de desarrollo, agregar las siguientes variables a un archivo .env:

### Variables de entorno

En un archivo .env se deben agregar ciertas variables de entorno para el buen funcionamiento de la API.


 > [!NOTE] 
 > Puedes usar el .env.example como referencia, pero ciertas variables no serán necesarias en el ambiente de desarrolo, mientras que para otras necesitarás crear credenciales como para que puedas usar servicios como:
 >  - Autenticación con Google
 >   <br>


#### Puerto del servidor

No es obligatorio agregar el puerto, en su defecto quedará en 3000 si no se agrega la variable en el .env

```
PORT=
```

#### Conexión a la base de datos

- Una vez creada la base de datos de manera local con el archivo [script.sql](./config/db/script.sql), deben agregarse estas variables: 
 
```
HOST=localhost
DBUSER=
DB_PORT=5432
PASSWORD=
DATABASE=bulkbuddies
```
- En DBUSER se agrega el nombre del usuario que accede a la base de datos.

- En password se agrega la contraseña del usuario que accede a la base de datos.

- Los demás valores no se modifican.

#### Creación de la base de datos de manera remota

De manera opcional podrías usar el mismo script en una base de datos creada en [Render](https://render.com/) o [Supabase](https://supabase.com/). Se obviaría el "CREATE DATABASE" porque esa función ya la realizan dichos servicios.

#### Llaves secretas para el JSONWebToken

```
JWT_SECRET=
REFRESH_TOKEN_KEY=
```

Puedes agregar cualquier cadena de carácteres en ambas variables. Idealmente que no sean iguales porque tienen propósitos distintos.

#### CORS (Cross Origin Resource Sharing)

- Si tienes pensado probar la API como cliente (página web), debes agregar la URL a la siguiente variable de entorno

```
ORIGIN="la url de la página web"
```

#### Autenticación con Google

**Este paso lo puedes saltar y probarlo directamente [aquí](https://bulkbuddies.onrender.com/api/v1/auth/google)**

En el .env.example verás las siguientes variables para que funcione la autenticación con Google:

```
# Google credentials
CLIENT_ID=
CLIENT_SECRET=

# Allowed redirect URIs by Google 
GOOGLE_LOGIN_REDIRECT_URL=
GOOGLE_REGISTER_REDIRECT_URL=
```
- En el apartado de *Google Credentials* debes crear un proyecto nuevo con tu cuenta de Google en el [Google Cloud Console](https://console.cloud.google.com).

- Una vez creado el proyecto, se pueden crear las credenciales seleccionando **Google OAUTH 2**, seguir los pasos que indican y se les generará una id del cliente y una llave secreta. Ambas credenciales se agregan a las variables de entorno.

- Asimismo, se deben agregar las URLs de redireccionamiento cuando se realiza el accesso desde el lado del servidor para que funcione.

## Iniciar

- Una vez que hayas agregado las variables de entorno puedes iniciar el proyecto usando el siguiente comando (ambiente de desarrollo):

```
npm run dev
```

### Iniciar en ambiente de producción
 
Si deseas correrlo en un ambiente de producción deberás crearte una cuenta en [Redis](https://redis.io/es/) y agregar las siguientes variables de entorno

```
REDIS_PASSWORD=
REDIS_HOST=
REDIS_PORT=
```
Iniciar:

```
npm start
```

## Testing

### Correr tests

Antes de correr los tests, es necesario agregar las siguientes variables de entorno:

```
TEST_DATABASE=
DB_TEST_HOST=
DB_TEST_USER=
DB_TEST_PORT=
DB_TEST_PASSWORD=
```

Puedes utilizar los mismos valores de la misma base de datos que se creó con el *script.sql*. Si deseas probarlo en otra base de datos, creas una nueva y la base de datos principal no se verá afectada.


> [!TIP]
> También puedes crear la base de datos [de manera remota](#creación-de-la-base-de-datos-de-manera-remota) para el testing

En la terminal usa el siguiente comando para correr los tests:

```
npm test
```

## Endpoints

### Autenticación

| HTTP Verbs | Endpoints | Acción |
| --- | --- | --- |
| POST | /api/v1/register | Crear de la cuenta |
| POST | /api/v1/login | Iniciar sesión |
| POST | /api/v1/logout | Cerrar sesión |
| GET | /api/v1/refresh | Pedir nuevo access token con el refresh token en cookies |
| GET | /api/v1/auth/google | Autenticar con Google |

### User

| HTTP Verbs | Endpoints | Acción |
| --- | --- | --- |
| GET | /api/v1/user | Ver los usuarios registrados |
| GET | /api/v1/user/:id | Ver información del usuario por id |
| DELETE | /api/v1/user/:id | Eliminar usuario por id (protegido con JWT) |
| GET | /api/v1/refresh | Pedir nuevo access token con el refresh token en cookies |

### Post

| Verbos HTTP | Endpoints | Acción |
| --- | --- | --- |
| GET | /api/v1/post | Ver todos los posts. |
| GET | /api/v1/post/:userId | Ver los posts creados por por usuario con su id. |
| POST | /api/v1/post | Crear post nuevo. |
| PUT | /api/v1/post/:userId | Modificar post con el id del usuario que la creó. |
| DELETE | /api/v1/post/:userId | Se realiza un *soft delete* del post con el id del usuario. |


### Profile

| Verbos HTTP | Endpoints | Acción |
| --- | --- | --- |
| GET | /api/v1/profile/:id | Recibir mayor información del usuario por su id. |
| PATCH | /api/v1/profile/:id | Modificar información general del usuario. |

### Región

| Verbos HTTP | Endpoints | Acción |
| --- | --- | --- |
| GET | /api/v1/region | Lista de las regiones de Chile |
| GET | /api/v1/region/:id | Lista de las comunas de Chile por la id de la región|


### Documentación

[Aquí](https://bulkbuddies.onrender.com/api/v1/docs) puedes ver la documentación de la API.

Nota: La documentación sigue en construcción.

### Tecnologías utilizadas

- [Express](https://expressjs.com/es/) Web Framework
- [NodeJS](https://nodejs.org/en) Entorno de ejecución 
- [Express validator](https://express-validator.github.io/docs) Validador de los datos que se envían a los endpoints tipo POST, PUT o PATCH.


### Colaboradores

- [Felipe Castillo](https://github.com/felipec583)
- [Fabián Leiva](https://github.com/fabianleiva)
- [Felipe Poblete](https://github.com/fpobleteinfo)
- [Gabriel Larez](https://github.com/SrGJLN)
- [Ramón Martínez](https://github.com/RaimonxDev)

### Licencia
