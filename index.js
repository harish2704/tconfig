
var  path = require('path');
var configDIR = process.env.CONFIG_DIR || path.resolve( path.join( require.main.paths[0], '..', 'config' ) );
var env = ( process.env.NODE_ENV || 'development' ).toLowerCase();
var envPrefix = process.env.TC_PREFIX || 'TC_';
var envRegex = new RegExp( '^' + envPrefix + '(.*)' );
var finalConfig = {};

function loadConfig( name ){
  var out = {};
  try{
    out = require( configDIR + '/' + name );
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
