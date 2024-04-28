# Bulkbuddies

___

### Descripción

API Rest de la aplicación web que facilita la gestión de la importación de productos al mayor cuando existe un interés compartido en cierto producto, lo que produce un pago de cierta cantidad del producto en la medida que el interesado pueda pagar por cierta cantidad.

Entre varios interesados se paga por para poder importar un producto en precio al mayor.


### Instalación

#### Instalación de las dependencias

``` 
npm install  
```



- Para el funcionamiento de la API en ambiente de desarrollo, agregar las siguientes variables a un archivo .env:

#### Variables de entorno

En un archivo .env se deben agregar ciertas variables de entorno para el buen funcionamiento de la API.


 > [!NOTE] 
 > Puedes usar el .env.example como referencia, pero ciertas variables no serán necesarias en el ambiente de desarrolo, mientras que para otras necesitarás crear credenciales como para que puedas usar servicios como:
 >  - Autenticación con Google
 >   <br>


##### Puerto del servidor

No es obligatorio agregar el puerto, en su defecto quedará en 3000 si no se agrega la variable en el .env

```
PORT=
```

##### Conexión a la base de datos

- Una vez creada la base de datos de manera local con el archivo script.sql, deben agregarse estas variables: 

```
HOST="localhost"
DBUSER=
DB_PORT=5432
PASSWORD=
DATABASE="bulkbuddies"
```
- En DBUSER se agrega el nombre del usuario que accede a la base de datos.

- En En password se agrega la contraseña del usuario que accede a la base de datos.

##### Creación de la base de datos de manera remota

De manera opcional podrías usar el mismo script en una base de datos creada en [Render](https://render.com/) o [Supabase](https://supabase.com/). Se obviaría el "CREATE DATABASE" porque esa función ya la realizan dichos servicios.

##### Llaves secretas para el JSONWebToken

```
JWT_SECRET=
REFRESH_TOKEN_KEY=
```

Puedes agregar cualquier cadena de carácteres en ambas variables. Idealmente que no sean iguales porque tienen propósitos distintos.

##### CORS (Cross Origin Resource Sharing)

- Si tienes pensado probar la API como cliente (página web), debes agregar la URL a la siguiente variable de entorno

```
ORIGIN="la url de la página web"
```

##### Autenticación con Google

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

### Iniciar

- Una vez que hayas agregado las variables de entorno puedes iniciar el proyecto usando el siguiente comando (ambiente de desarrollo):

```
npm run dev
```

#### Iniciar en ambiente de producción
 
Si deseas correrlo en un ambiente de producción deberás crearte una cuenta en [Redis](https://redis.io/es/) y agregar las siguientes variables de entorno

```
REDIS_PASSWORD=
REDIS_HOST=
REDIS_PORT=
```
<hr>

```
npm start
```



### Endpoints

### Colaboradores