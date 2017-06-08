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

#### Read additional config based on NODE_ENV variable.
If we specify NODE_ENV=xyz then, config/xyz.js will overide the values from default.js. **Overriding is a deep merge**

```bash
hari@hari-VirtualBox:~app$ env NODE_ENV=production node xyz.js 
{ port: 4000 }
```

#### Set any configuration variable using Environtment variable.
By setting an Environtment variable '<Prefix><key>=<value>', we can set config[key] as value.
Default prefix is `TC_`
For eg:

  * `TC_port` will set config.port

  * `TC_a.b.c` will set config.a.b.c

```bash
hari@hari-VirtualBox:~app$ env NODE_ENV=production TC_db.mysql.user=root node xyz.js 
{ port: 5000, db: { mysql: { user: 'root' } } }
```

##### Use custom env prefix.

default prefix can be changed using Environtment variable by setting `TC_PREFIX` Environtment variable

```bash
export TC_PREFIX=MYAPP_
export MYAPP_port=8080
hari@hari-VirtualBox:~app$ env MYAPP_db.mysql.user=root node xyz.js 
{ port: 8080, db: { mysql: { user: 'root' } } }

```

#### use custom config directory
config directory can be changed using Environtment variable by setting `CONFIG_DIR` Environtment variable
```bash
hari@hari-VirtualBox:~app$ env CONFIG_DIR=../config TC_PREFIX=MYAPP_ NODE_ENV=production MYAPP_db.mysql.user=root node xyz.js 
{ dir: '../config', db: { mysql: { user: 'root' } } }

```





