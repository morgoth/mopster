var __ember_auto_import__;(()=>{var e={291:e=>{"use strict"
var t,n="object"==typeof Reflect?Reflect:null,r=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)}
t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)}
var o=Number.isNaN||function(e){return e!=e}
function s(){s.init.call(this)}e.exports=s,e.exports.once=function(e,t){return new Promise((function(n,r){function o(n){e.removeListener(t,s),r(n)}function s(){"function"==typeof e.removeListener&&e.removeListener("error",o),n([].slice.call(arguments))}v(e,t,s,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,{once:!0})}(e,o)}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0
var i=10
function c(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function a(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function l(e,t,n,r){var o,s,i,l
if(c(n),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),i=s[t]),void 0===i)i=s[t]=n,++e._eventsCount
else if("function"==typeof i?i=s[t]=r?[n,i]:[i,n]:r?i.unshift(n):i.push(n),(o=a(e))>0&&i.length>o&&!i.warned){i.warned=!0
var h=new Error("Possible EventEmitter memory leak detected. "+i.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit")
h.name="MaxListenersExceededWarning",h.emitter=e,h.type=t,h.count=i.length,l=h,console&&console.warn&&console.warn(l)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function f(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=h.bind(r)
return o.listener=n,r.wrapFn=o,o}function u(e,t,n){var r=e._events
if(void 0===r)return[]
var o=r[t]
return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n]
return t}(o):d(o,o.length)}function p(e){var t=this._events
if(void 0!==t){var n=t[e]
if("function"==typeof n)return 1
if(void 0!==n)return n.length}return 0}function d(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r]
return n}function v(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n)
else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e)
e.addEventListener(t,(function o(s){r.once&&e.removeEventListener(t,o),n(s)}))}}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return i},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".")
i=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".")
return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return a(this)},s.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n])
var o="error"===e,s=this._events
if(void 0!==s)o=o&&void 0===s.error
else if(!o)return!1
if(o){var i
if(t.length>0&&(i=t[0]),i instanceof Error)throw i
var c=new Error("Unhandled error."+(i?" ("+i.message+")":""))
throw c.context=i,c}var a=s[e]
if(void 0===a)return!1
if("function"==typeof a)r(a,this,t)
else{var l=a.length,h=d(a,l)
for(n=0;n<l;++n)r(h[n],this,t)}return!0},s.prototype.addListener=function(e,t){return l(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return l(this,e,t,!0)},s.prototype.once=function(e,t){return c(t),this.on(e,f(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return c(t),this.prependListener(e,f(this,e,t)),this},s.prototype.removeListener=function(e,t){var n,r,o,s,i
if(c(t),void 0===(r=this._events))return this
if(void 0===(n=r[e]))return this
if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t))
else if("function"!=typeof n){for(o=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){i=n[s].listener,o=s
break}if(o<0)return this
0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1]
e.pop()}(n,o),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,i||t)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,n,r
if(void 0===(n=this._events))return this
if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this
if(0===arguments.length){var o,s=Object.keys(n)
for(r=0;r<s.length;++r)"removeListener"!==(o=s[r])&&this.removeAllListeners(o)
return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t)
else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r])
return this},s.prototype.listeners=function(e){return u(this,e,!0)},s.prototype.rawListeners=function(e){return u(this,e,!1)},s.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):p.call(e,t)},s.prototype.listenerCount=p,s.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},587:e=>{var t=null
"undefined"!=typeof WebSocket?t=WebSocket:"undefined"!=typeof MozWebSocket?t=MozWebSocket:"undefined"!=typeof global?t=global.WebSocket||global.MozWebSocket:"undefined"!=typeof window?t=window.WebSocket||window.MozWebSocket:"undefined"!=typeof self&&(t=self.WebSocket||self.MozWebSocket),e.exports=t},443:(e,t,n)=>{const r=n(291),o=n(587)
function s(e){return e.replace(/(_[a-z])/g,(e=>e.toUpperCase().replace("_","")))}class i extends r{constructor(e){super(),this._console=this._getConsole(e||{}),this._settings=this._configure(e||{}),this._backoffDelay=this._settings.backoffDelayMin,this._pendingRequests={},this._webSocket=null,this._delegateEvents(),this._settings.autoConnect&&this.connect()}_getConsole(e){if(void 0!==e.console)return e.console
const t="undefined"!=typeof console&&console||{}
return t.log=t.log||(()=>{}),t.warn=t.warn||(()=>{}),t.error=t.error||(()=>{}),t}_configure(e){const t={...e},n="undefined"!=typeof document&&"https:"===document.location.protocol?"wss://":"ws://",r="undefined"!=typeof document&&document.location.host||"localhost"
return t.webSocketUrl=e.webSocketUrl||`${n}${r}/mopidy/ws`,!1!==e.autoConnect&&(t.autoConnect=!0),t.backoffDelayMin=e.backoffDelayMin||1e3,t.backoffDelayMax=e.backoffDelayMax||64e3,t}_delegateEvents(){this.removeAllListeners("websocket:close"),this.removeAllListeners("websocket:error"),this.removeAllListeners("websocket:incomingMessage"),this.removeAllListeners("websocket:open"),this.removeAllListeners("state:offline"),this.on("websocket:close",this._cleanup),this.on("websocket:error",this._handleWebSocketError),this.on("websocket:incomingMessage",this._handleMessage),this.on("websocket:open",this._resetBackoffDelay),this.on("websocket:open",this._getApiSpec),this.on("state:offline",this._reconnect)}off(...e){if(0===e.length)this.removeAllListeners()
else if(1===e.length){const t=e[0]
if("string"!=typeof t)throw Error("Expected no arguments, a string, or a string and a listener.")
this.removeAllListeners(t)}else this.removeListener(...e)}connect(){if(this._webSocket){if(this._webSocket.readyState===i.WebSocket.OPEN)return
this._webSocket.close()}this._webSocket=this._settings.webSocket||new i.WebSocket(this._settings.webSocketUrl),this._webSocket.onclose=e=>{this.emit("websocket:close",e)},this._webSocket.onerror=e=>{this.emit("websocket:error",e)},this._webSocket.onopen=()=>{this.emit("websocket:open")},this._webSocket.onmessage=e=>{this.emit("websocket:incomingMessage",e)}}_cleanup(e){Object.keys(this._pendingRequests).forEach((t=>{const{reject:n}=this._pendingRequests[t]
delete this._pendingRequests[t]
const r=new i.ConnectionError("WebSocket closed")
r.closeEvent=e,n(r)})),this.emit("state","state:offline"),this.emit("state:offline")}_reconnect(){setTimeout((()=>{this.emit("state","reconnectionPending",{timeToAttempt:this._backoffDelay}),this.emit("reconnectionPending",{timeToAttempt:this._backoffDelay}),setTimeout((()=>{this.emit("state","reconnecting"),this.emit("reconnecting"),this.connect()}),this._backoffDelay),this._backoffDelay*=2,this._backoffDelay>this._settings.backoffDelayMax&&(this._backoffDelay=this._settings.backoffDelayMax)}),0)}_resetBackoffDelay(){this._backoffDelay=this._settings.backoffDelayMin}close(){this.off("state:offline",this._reconnect),this._webSocket&&this._webSocket.close()}_handleWebSocketError(e){this._console.warn("WebSocket error:",e.stack||e)}_send(e){switch(this._webSocket.readyState){case i.WebSocket.CONNECTING:return Promise.reject(new i.ConnectionError("WebSocket is still connecting"))
case i.WebSocket.CLOSING:return Promise.reject(new i.ConnectionError("WebSocket is closing"))
case i.WebSocket.CLOSED:return Promise.reject(new i.ConnectionError("WebSocket is closed"))
default:return new Promise(((t,n)=>{const r={...e,jsonrpc:"2.0",id:this._nextRequestId()}
this._pendingRequests[r.id]={resolve:t,reject:n},this._webSocket.send(JSON.stringify(r)),this.emit("websocket:outgoingMessage",r)}))}}_handleMessage(e){try{const t=JSON.parse(e.data)
Object.hasOwnProperty.call(t,"id")?this._handleResponse(t):Object.hasOwnProperty.call(t,"event")?this._handleEvent(t):this._console.warn(`Unknown message type received. Message was: ${e.data}`)}catch(t){if(!(t instanceof SyntaxError))throw t
this._console.warn(`WebSocket message parsing failed. Message was: ${e.data}`)}}_handleResponse(e){if(!Object.hasOwnProperty.call(this._pendingRequests,e.id))return void this._console.warn("Unexpected response received. Message was:",e)
const{resolve:t,reject:n}=this._pendingRequests[e.id]
if(delete this._pendingRequests[e.id],Object.hasOwnProperty.call(e,"result"))t(e.result)
else if(Object.hasOwnProperty.call(e,"error")){const t=new i.ServerError(e.error.message)
t.code=e.error.code,t.data=e.error.data,n(t),this._console.warn("Server returned error:",e.error)}else{const t=new Error("Response without 'result' or 'error' received")
t.data={response:e},n(t),this._console.warn("Response without 'result' or 'error' received. Message was:",e)}}_handleEvent(e){const t={...e}
delete t.event
const n=`event:${s(e.event)}`
this.emit("event",n,t),this.emit(n,t)}_getApiSpec(){return this._send({method:"core.describe"}).then(this._createApi.bind(this)).catch(this._handleWebSocketError.bind(this))}_createApi(e){const t=e=>(...t)=>{const n={method:e}
return 0===t.length?this._send(n):t.length>1?Promise.reject(new Error("Expected zero arguments, a single array, or a single object.")):Array.isArray(t[0])||t[0]===Object(t[0])?([n.params]=t,this._send(n)):Promise.reject(new TypeError("Expected an array or an object."))},n=e=>{let t=this
return e.forEach((e=>{const n=s(e)
t[n]=t[n]||{},t=t[n]})),t}
Object.keys(e).forEach((r=>{const o=(e=>{let t=e.split(".")
return t.length>=1&&"core"===t[0]&&(t=t.slice(1)),t})(r),i=s(o.slice(-1)[0]),c=n(o.slice(0,-1))
c[i]=t(r),c[i].description=e[r].description,c[i].params=e[r].params})),this.emit("state","state:online"),this.emit("state:online")}}class c extends Error{constructor(e){super(e),this.name="ConnectionError"}}i.ConnectionError=c
class a extends Error{constructor(e){super(e),this.name="ServerError"}}i.ServerError=a,i.WebSocket=o,i.prototype._nextRequestId=(()=>{let e=-1
return()=>(e+=1,e)})(),e.exports=i},945:(e,t,n)=>{var r,o
e.exports=(r=_eai_d,o=_eai_r,window.emberAutoImportDynamic=function(e){return 1===arguments.length?o("_eai_dyn_"+e):o("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return o("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},void r("mopidy",[],(function(){return n(443)})))},851:function(e,t){window._eai_r=require,window._eai_d=define}},t={}
function n(r){var o=t[r]
if(void 0!==o)return o.exports
var s=t[r]={exports:{}}
return e[r].call(s.exports,s,s.exports,n),s.exports}n(851)
var r=n(945)
__ember_auto_import__=r})()
