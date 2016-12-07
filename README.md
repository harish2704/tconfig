# tconfig
A simple and transparent config file loader for Nodejs applications.


## install
```bash
npm i tconfig
```
## Usage
```javascript
const conig = require('tconfig');

console.log( config ); // your config object
```

## Examples

```javascript
// file: xyz.js

/*
▾ app/
    ▾ config/
       default.js     // port = 3000
       production.js  // port = 4000
    xyz.js
    package.json
*/


console.log( require('tconfig') );
```

#### Simple case
```bash
hari@hari-VirtualBox:~app$ node xyz.js 
{ port: 3000 }

```

#### Override using NODE_ENV
values from config/production overides the default one

```bash
hari@hari-VirtualBox:~app$ env NODE_ENV=production node xyz.js 
{ port: 5000 }
```

#### Override using Environtment Variables.
Default prefix is `TC_`

TC_port will set config.port

TC_a.b.c will set config.a.b.c
```bash
hari@hari-VirtualBox:~app$ env NODE_ENV=production TC_db.mysql.user=root node xyz.js 
{ port: 5000, db: { mysql: { user: 'root' } } }
```

#### Override using Environtment Variables. Custom Prefix
Prefix can be changed using Environtment variable
```bash
export TC_PREFIX=MYAPP_
export MYAPP_PORT=8080
hari@hari-VirtualBox:~app$ env MYAPP_db.mysql.user=root node xyz.js 
{ port: 8080, db: { mysql: { user: 'root' } } }

```

#### use custom config directory
config directory can be changed using Environtment variable
```bash
hari@hari-VirtualBox:~app$ env CONFIG_DIR=../config TC_PREFIX=MYAPP_ NODE_ENV=production MYAPP_db.mysql.user=root node xyz.js 
{ dir: '../config', db: { mysql: { user: 'root' } } }

```





