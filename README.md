# YellowMe Url Shortener

**Tecnologias**

- BackEnd: [`NodeJS`/JS](NodeJS/JS )  y [Express version 4.x.](https://expressjs.com/)
- FrontEnd: [VueJS](https://vuejs.org/)
- Base de datos: [Mongodb](https://www.mongodb.com)

**Instalar Dependencias:**

```bash
$ npm install
cd ./front
$ npm install
cd ./back
$ npm install
```

**Conexiones a la base de datos**

Se necesitan crear variables de entorno para la conexion a mongodb.

En entornos *nix

```bash
export MONGO_CS=connection_string
export MONGO_USER=user_database
export MONGO_PASSWORD=password
export MONGO_DBNAME=name_database
export MONGO_COLLECTION=collection_database
```

**Variable de entorno para la url del API**

Para correr vuejs en modo local, se necesita crear un archivo llamado front/.env.local, como sugiere la [documentacion](https://cli.vuejs.org/guide/mode-and-env.html), dentro del archivo va a ir lo siguiente:

```VUE_APP_API=http://localhost:5000```

**Ejecutar proyectos**

Dentro de la carpeta principal se puede ejcutar el siguiente comando:

```npm run serve```

Esto ejecutara ambos proyectos front y back

El backend estara corriendo en el puerto **5000** y el front en el puerto **8080**

### API Request

**Agregar Url**

```/api/admin/AddUrl```

```bash
curl --location --request POST 'http://localhost:5000/api/admin/AddUrl' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url":"https://google.com"
}'
```

**response code 200**

```json
{
​    "code": 1002,
​    "messages": [
​        "Register Created"
​    ],
​    "content": {
​        "short_url": "xex539Rnuy",
​        "url": "https://google.com.mx"
​    }
}
```

**Obtener todos los registros**

```/api/admin/list```

```bash
curl --location --request GET 'http://localhost:5000/api/admin/list'
```

```json
{
    "code": 1007,
    "messages": [
        "Correct"
    ],
    "content": [
        {
            "short_url": "2nVqRfocla",
            "url": "https://google.com"
        }
    ]
}
```

**Subir un archivo con direcciones**

```/api/admin/bulkUrl```
```bash
curl --location --request POST 'http://localhost:5000/api/admin/bulkUrl' \
--form 'file=@/home/genitalico/temp/urls.txt'
```

```json
{
    "code": 1007,
    "messages": [
        "Correct"
    ],
    "content": [
        {
            "short_url": "2nVqRfocla",
            "url": "https://google.com"
        }
    ]
}
```

El archivo que se puede subir tiene que ser un archivo de texto plano, el formato es una url por linea.