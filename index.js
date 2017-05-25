
var  path = require('path');
var fs = require('fs');
var configDir;
var env = ( process.env.NODE_ENV || 'development' ).toLowerCase();
var envPrefix = process.env.TC_PREFIX || 'TC_';
var envRegex = new RegExp( '^' + envPrefix + '(.*)' );
var finalConfig = {};
var configDirLookupPath = [
  path.resolve( path.join( require.main.paths[0], '..', 'config' ) ),
  path.join( process.env.PWD, 'config' )
];
if( process.env.CONFIG_DIR ){
  configDirLookupPath.unshift( process.env.CONFIG_DIR );
}

for (var i = 0, l = configDirLookupPath.length; i < l; i ++) {
  var v = configDirLookupPath[i];
  if( fs.existsSync(v) ){
    configDir = v;
    break;
  }
}
if( !configDir ){
  throw Error(
    'Config directory not found.\n Look up at following locations failed.\n---\n** ' +
    configDirLookupPath.join('\n** ') + '\n---\n' +
    '\n Please set CONFIG_DIR env variable');
}



function loadConfig( name ){
  var out = {};
  try{
    out = require( configDir + '/' + name );
  } catch(e){
    out = {};
  }
  return out;
}

/* Implementation of lodash.set function */
function setProp( object, keys, val ){
  keys = Array.isArray( keys )? keys : keys.split('.');
  if( keys.length>1 ){
    object[keys[0]] = object[keys[0]] || {};
    return setProp( object[keys[0]], keys.slice(1), val );
  }
  object[keys[0]] = val;
}

Object.assign( finalConfig, loadConfig('default'), loadConfig( env ) );

var envList = Object.keys( process.env ).filter( function(v){
  var match = v.match( envRegex );
  if( match ){
    setProp( finalConfig, match[1].toLowerCase(), process.env[v] );
  }
});


module.exports = finalConfig;
