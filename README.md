# Proyecto 1 telemática

## 1. Descripción

Photosite es una red social que permite a diferentes fotógrafos de todo el mundo compartir su trabajo con personas que aprecien su arte. Además que permite a admiradores comentar y hacer parte del trabajo de los fotografos. 

## 2. Análisis
### 2.1 Requisitos Funcionales

* RF1: El sistema permitirá al usuario registrarse y loguearse.
* RF2: El sistema permitirá al usuario enlazar sus fotos y publicarlas.
* RF3: El sistema permitirá al usuario borrar y modificar los posts de fotos que publique.
* RF4: El sistema permitirá al usuario comentar las fotos subidas.
* RF5: El sistema permitirá al usuario elegir si quiere que sus fotos sean públicas o privadas.
* RF7: El sistema permitirá al usuario buscar entre las diferentes fotos subidas en la plataforma.

### 2.2 Tecnología de desarrollo y ejecución
| Sección | Tecnología |
| --- |:---:|
| LENGUAJE DE PROGRAMACIÓN | Javascript / NodeJS - Typescript|
| FRAMEWORK WEB - BACKEND | Express (NodeJS) | 
| WEB APP SERVER | Embebido (NodeJS) | 
| WEB SERVER | NGINX | 
| BASE DE DATOS | MongoDB | 

### 2.3 Ambientes de Desarrollo, Pruebas y Producción
#### 2.3.1 Desarrollo
| Sección | Tecnología |
| --- |:---:|
| SISTEMA OPERATIVO | Linux Ubuntu (17.04) |
| LENGUAJE DE PROGRAMACIÓN |Javascript/NodeJS(6.11.1)|
| FRAMEWORK WEB - BACKEND | Express (4.15.3) | 
| WEB APP SERVER | Embebido ((NodeJS (6.11.1)) | 
| WEB SERVER | NGINX(1.12.1) | 
| BASE DE DATOS | MongoDB(3.2.11) | 
| EDITOR | Atom(1.18.0) | 
| GIT | Git Bash(2.11.0) | 
| Pruebas | Postman(5.1.2) | 

#### 2.3.2 Pruebas en el DCA
| Sección | Tecnología |
| --- |:---:|
| SISTEMA OPERATIVO | Linux CentOS (7.1) |
| LENGUAJE DE PROGRAMACIÓN |Javascript/NodeJS(6.11.1) |
| FRAMEWORK WEB - BACKEND | Express (4.15.3) | 
| FRAMEWORK WEB - FRONTEND | Angular (4.3.1) | 
| WEB APP SERVER | Embebido ((NodeJS (6.11.1)) | 
| WEB SERVER | NGINX(1.12.1) | 
| BASE DE DATOS | MongoDB(2.6.11) | 
| GIT | Git Bash(2.11.0) | 

#### 2.3.3 Nube
| Sección | Tecnología |
| --- |:---:|
| PROVEEDOR | Heroku |
| LENGUAJE DE PROGRAMACIÓN |Javascript/NodeJS(6.11.1) |
| FRAMEWORK WEB - BACKEND | Express (4.15.3) | 
| WEB APP SERVER | Embebido ((NodeJS (6.11.1)) | 
| BASE DE DATOS | MongoDB a través de mlab(6.12.17) |

# 3. Diseño

# 3.1 Modelos
```javascript
User = {
  username: String,
  password: String
}

Photo = {
  name: String,
  source: String,
  description: String,
  publico: String,
  author: {
    id: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
}

Comment = {
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
}

```
## 3.2 Servicios Web
### 3.2.1 Index
```javascript

//Devuelve la landing page
Método: GET
URI: /
Datos Request: No aplica
Datos Response: Render: "landing"

//Renderiza el formulario para registro de usuarios
Método: GET
URI: /register
Datos Request: No aplica
Datos Response: Render: "register"

//Registra al usuario
Método: POST
URI: /register
Datos Request: {username, password}
Datos Response: Render: "photos"

//Renderiza el formulario para iniciar sesión
Método: GET
URI: /login
Datos Request: No aplica
Datos Response: Render: "login"

//Envía el request para iniciar sesión
Método: POST
URI: /login
Datos Request: {username, password}
Datos Response: Render: "photos"

//Cierra la sesión del usuario actual
Método: GET
URI: /logout
Datos Request: No aplica
Datos Response: Render: "photos"


### 3.2.2 Imágenes
```javascript
// Carga la página principal de contenido, donde se pueden ver las imágenes
Método: GET
URI: /photos/
Datos Request: No aplica 
Datos Response: Render: "photos/index"

//Sube una nueva foto a la base de datos
Método: POST
URI: /photos/
Datos Request: {name, source, description, author, publico} 
Datos Response: Render: "/photos"


//Renderiza el formulario para subir una nueva foto
Método: GET
URI: /photos/new
Datos Request: No aplica
Datos Response: Render: "photos/new"


//Muestra datos mas especificos de una foto
Método:GET
URI: /photos/:id
Datos Request: No aplica
Datos Response: Render: "photos/show"


//Busca fotos por su nombre
Método: POST
URI: /photos/search
Datos Request: {name}
Datos Response: Render: "photos/show"


//Renderiza el formulario para modificar una foto subida previamente
Método:GET
URI: /photos/
Datos Request: No aplica
Datos Response: Render: "photos/edit"


//Modifica los datos de una foto subida previamente
Método: PUT
URI: /photos/
Datos Request: {id} 
Datos Response: Render: "/photos/:id"


//Elimina una foto de la base de datos
Método: DELETE
URI: /photos/
Datos Request: {id}
Datos Response: Render: "/photos"

### 3.2.3 Commentarios
//Renderiza el formulario para crear un nuevo comentario
Método: GET
URI: /photos/:id/comments
Datos Request: No aplica
Datos Response: Render: "comments/new"

//Crea un nuevo comentario a la foto
Método: POST
URI: /photos/:id/comments/new
Datos Request: {}
Datos Response: Render: 



