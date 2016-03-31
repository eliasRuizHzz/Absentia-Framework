# Absentia-Framework
Absentia.JS es un Framework en construción bajo la licencia GNU/GPL.

### Pasos:

	1. Inicializar MongoDB

~~~
sudo mongod --dbpath /data/db
~~~

	2. Crear el projecto

~~~
sudo node newproject.js
~~~

	3. Inicializar el proyecto

~~~
sudo pm2 start index.js
sudo riot -w tags/ build/js/tags/
~~~

	4. Sincronizar el proyecto

~~~
sudo node aperture.js
~~~

## Crear instancias

* Instancia: http://host:port/name-my-instance

#### Se compone de:

1. Archivo HTML
2. Archivo JS/Client
3. Archivo JSON/Data

~~~
sudo node newins.js name-my-instance
~~~

## Crear tags/html unicos

* Tags: <name-my-tag></name-my-tag>

#### Se compone de:

1. Archivo Riot Tag
3. Archivo JSON/Dynamic Data

~~~
sudo node newtag.js name-my-tag
~~~