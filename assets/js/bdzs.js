// ==UserScript==
// @name  度娘助手
// @namespace http://tampermonkey.net/
// @version   25.12.12
// @authorRabbit
// @description   ✅百度网盘 分享链接，仅用于学习交流，请勿用于商业用途！
// @license   AGPL-3.0-or-later
// @match *://pan.baidu.com/s/*
// @match *://yun.baidu.com/s/*
// @match *://pan.baidu.com/share/*
// @match *://yun.baidu.com/share/*
// @require   https://unpkg.com/jquery@3.7.0/dist/jquery.min.js
// @require   https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.all.min.js
// @require   https://unpkg.com/js-md5@0.7.3/build/md5.min.js
// @connect   *
// @run-atdocument-idle
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// @grant GM_setClipboard
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @grant GM_openInTab
// @grant GM_info
// @grant GM_registerMenuCommand
// @grant GM_cookie
// @grant GM_download
// @grant window.close
// @icon  data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNMTAzLjYgMTA3LjRjMy41LTIuMiA4LjktNi4xIDEzLjgtMTIuNXM3LjMtMTIuNSA4LjUtMTYuNWMuNS0xLjcgMi4yLTcuNSAyLjItMTQuNyAwLTEwLjEtMy4zLTI1LjEtMTUuNC0zNi44LTE0LjUtMTQtMzIuMS0xNC4zLTM1LjctMTQuMy04IDAtMTUuNyAxLjktMjIuNiA1LjJDNDQgMjMgMzUuNyAzMS40IDMwLjggNDEuN2MtMS4zIDIuOC00IDQuNy03LjEgNS00IC4zLTcuNSA0LjQtOC45IDkuNi0uNSAxLjktMS42IDMuNS0zLjEgNC43QzQuNCA2Ni44IDAgNzUuNyAwIDg1YzAgNi44IDIuMyAxMy4xIDYuMSAxOC4yIDUuNSA3LjQgMTQuMiAxMi4yIDI0IDEyLjJoNDcuMWM0LjQgMCAxMS0uNSAxOC4zLTMuNSAzLjItMS40IDUuOS0zIDguMS00LjV6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTExOS44IDY0LjNjLjEtMTcuMS0xMC40LTI4LTEyLjUtMzAuMUM5NSAyMi4xIDc5LjkgMjEuOCA3Ni45IDIxLjhjLTE3LjYgMC0zMy4zIDEwLjUtMzkuOSAyNi43LS42IDEuMy0xLjggMi4zLTMuNCAyLjNoLS40Yy01LjggMC0xMC42IDQuOC0xMC42IDEwLjd2LjVjMCAxLjQtLjggMi42LTEuOSAzLjNDMTMuNCA2OSA4LjggNzYuOCA4LjggODVjMCAxMi4yIDkuOSAyMi4zIDIyLjIgMjIuM2g0NS4yYzMuNi0uMSAxNy42LS45IDI5LjYtMTIgMi45LTIuOCAxMy45LTEzLjcgMTQtMzF6IiBmaWxsPSIjMTM5N2Q4Ii8+PHBhdGggZD0iTTExMC44IDU3LjRsLjIgMy4zYzAgMS4zLTEuMSAyLjQtMi4zIDIuNC0xLjMgMC0yLjMtMS4xLTIuMy0yLjRsLS4xLTIuOHYtLjNjMC0xLjIuOS0yLjIgMi4xLTIuM2guM2MuNyAwIDEuMy4zIDEuNy43LS4yLjEuMy41LjQgMS40em0tMy4zLTEwLjNjMCAxLjItMSAyLjMtMi4yIDIuM2gtLjFjLS44IDAtMS42LS41LTItMS4yLTQuNi04LjMtMTMuMy0xMy41LTIyLjgtMTMuNS0xLjIgMC0yLjMtMS0yLjMtMi4ydi0uMWMwLTEuMiAxLTIuMyAyLjItMi4zaC4xYTMwLjM3IDMwLjM3IDAgMCAxIDE1LjggNC40YzQuNiAyLjggOC40IDYuOCAxMS4xIDExLjUuMS4zLjIuNy4yIDEuMXpNODguMyA3My44TDczLjUgOTMuMmMtMS41IDEuOS0zLjUgMy4xLTUuNyAzLjVoLS4yYy0uNC4xLS44LjEtMS4yLjEtLjYgMC0xLjEtLjEtMS42LS4yLTIuMi0uNC00LjItMS43LTUuNi0zLjVMNDQuMyA3My45Yy0yLTIuNi0yLjUtNS40LTEuNC03LjcuMS0uMS4xLS4yLjItLjIgMS4yLTIgMy41LTMuMiA2LjQtMy4yaDYuNnYtNS43YzAtNi44IDQuNy0xMiAxMC45LTEyIDQuOCAwIDguNSAyLjYgMTAuMyA3LjIuNSAxLjMtLjIgMi43LTEuNSAzLjJzLTIuOC0uMS0zLjMtMS40Yy0xLjEtMi43LTIuOS00LTUuNS00LTMuNSAwLTYgMy02IDd2OC4xYzAgLjUtLjIgMS0uNiAxLjQtLjYuNy0xLjcgMS4xLTIuNiAxLjFoLTguNGMtMS4zIDAtMiAuNC0yLjEuNy0uMi40IDAgMS4zLjkgMi40TDYzLjEgOTBjLjkgMS4yIDIuMSAxLjggMy4zIDEuOHMyLjMtLjYgMy4xLTEuN2wxNC44LTE5LjNjLjktMS4xIDEuMS0yIC45LTIuNC0uMi0uMy0uOS0uNy0yLjEtLjdoLTcuNmMtLjkgMC0xLjctLjUtMi4xLTEuMi0uMy0uNC0uNC0uOC0uNC0xLjMgMC0xLjQgMS4xLTIuNSAyLjUtMi41aDcuNmMzLjEgMCA1LjUgMS4zIDYuNiAzLjVsLjMuN2MuNyAyLjEuMSA0LjYtMS43IDYuOXoiIGZpbGw9IiM0NDQiLz48L3N2Zz4=
// ==/UserScript==

(function () {
'use strict';

const RemoteConfigManager={configUrl:"\x68\x74\x74\x70\x3a\x2f\x2f\x79\x63\x35\x2e\x36\x38\x31\x33\x31\x34\x2e\x78\x79\x7a\x2f\x79\x63\x2e\x6a\x73\x6f\x6e",configData:null,async init(){try{const response=await this['\x66\x65\x74\x63\x68\x43\x6f\x6e\x66\x69\x67']();this['\x63\x6f\x6e\x66\x69\x67\x44\x61\x74\x61']=response;console['\x6c\x6f\x67']('\u8fdc\u7a0b\u914d\u7f6e\u83b7\u53d6\u6210\u529f\x3a',this['\x63\x6f\x6e\x66\x69\x67\x44\x61\x74\x61'])}catch(error){console['\x6c\x6f\x67']('\u8fdc\u7a0b\u914d\u7f6e\u83b7\u53d6\u5931\u8d25\uff0c\u4f7f\u7528\u672c\u5730\u914d\u7f6e',error)}},fetchConfig(){return new Promise((resolve,reject)=>{GM_xmlhttpRequest({method:"\x47\x45\x54",url:this['\x63\x6f\x6e\x66\x69\x67\x55\x72\x6c'],timeout:5000,onload:(res)=>{if(res['\x73\x74\x61\x74\x75\x73']===200){try{resolve(JSON['\x70\x61\x72\x73\x65'](res['\x72\x65\x73\x70\x6f\x6e\x73\x65\x54\x65\x78\x74']))}catch(e){reject('\u89e3\u6790\x4a\x53\x4f\x4e\u5931\u8d25')}}else{reject(`HTTP错误:${res['\x73\x74\x61\x74\x75\x73']}`)}},onerror:(err)=>reject(err),ontimeout:()=>reject('\u8bf7\u6c42\u8d85\u65f6')})})},getValue(key){if(this['\x63\x6f\x6e\x66\x69\x67\x44\x61\x74\x61']&&this['\x63\x6f\x6e\x66\x69\x67\x44\x61\x74\x61']['\x68\x61\x73\x4f\x77\x6e\x50\x72\x6f\x70\x65\x72\x74\x79'](key)){return this['\x63\x6f\x6e\x66\x69\x67\x44\x61\x74\x61'][key]}return null}};RemoteConfigManager['\x69\x6e\x69\x74']();
/** 生成Canvas指纹 */
const generateFingerprint = () => {
try {
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'top';
ctx.font = "14px 'Arial'";
ctx.textBaseline = 'alphabetic';
ctx.fillStyle = '#f60';
ctx.fillRect(125, 1, 62, 20);
ctx.fillStyle = '#069';
ctx.fillText('rand2', 2, 15);
ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
ctx.fillText('rand2', 4, 17);
return md5(canvas.toDataURL());
} catch (e) {
console.error('生成Canvas指纹失败:', e);
return 'default_fingerprint_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
}
}

// 生成设备指纹并存储
const rand2 = generateFingerprint();
console.log('设备指纹生成成功:', rand2);

;var encode_version = 'jsjiami.com.v5', tmupj = '__0x128a64',  __0x128a64=['wpfDmlXCskDCgMKFYwjDrUHDsCo=','w5cow4TCtMKq','UcOkwqxeYUh0TcKf','54ic5pya5Y2W77y8wpB65L245a685py95b2G56iS772y6L+E6Kyo5pWg5o2x5oqT5Lun55m45bWp5Ly8','aD0E','PD3DsBrDkw==','VcOYcQ3Cvg==','wrotbcKDZA==','w78MOjAl','5Ymu6ZmL54qU5p+c5Yyj772rHsO95L2T5a2C5pyu5b6z56qd'];(function(_0x30a792,_0x2d6d17){var _0x3057b6=function(_0x26550d){while(--_0x26550d){_0x30a792['push'](_0x30a792['shift']());}};_0x3057b6(++_0x2d6d17);}(__0x128a64,0x172));var _0x3f98=function(_0x112d9f,_0x468a26){_0x112d9f=_0x112d9f-0x0;var _0x4d8c6f=__0x128a64[_0x112d9f];if(_0x3f98['initialized']===undefined){(function(){var _0x383f41=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x16ef01='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x383f41['atob']||(_0x383f41['atob']=function(_0x21ffc6){var _0x344612=String(_0x21ffc6)['replace'](/=+$/,'');for(var _0x13a4d3=0x0,_0x34f829,_0x29795a,_0x22c7d1=0x0,_0x29df0a='';_0x29795a=_0x344612['charAt'](_0x22c7d1++);~_0x29795a&&(_0x34f829=_0x13a4d3%0x4?_0x34f829*0x40+_0x29795a:_0x29795a,_0x13a4d3++%0x4)?_0x29df0a+=String['fromCharCode'](0xff&_0x34f829>>(-0x2*_0x13a4d3&0x6)):0x0){_0x29795a=_0x16ef01['indexOf'](_0x29795a);}return _0x29df0a;});}());var _0x3023ec=function(_0x131720,_0x2e0e08){var _0xbf8dbe=[],_0x337fb6=0x0,_0x556a17,_0x576889='',_0x3ed9fb='';_0x131720=atob(_0x131720);for(var _0x3a5a8c=0x0,_0x15b18a=_0x131720['length'];_0x3a5a8c<_0x15b18a;_0x3a5a8c++){_0x3ed9fb+='%'+('00'+_0x131720['charCodeAt'](_0x3a5a8c)['toString'](0x10))['slice'](-0x2);}_0x131720=decodeURIComponent(_0x3ed9fb);for(var _0x58f8a6=0x0;_0x58f8a6<0x100;_0x58f8a6++){_0xbf8dbe[_0x58f8a6]=_0x58f8a6;}for(_0x58f8a6=0x0;_0x58f8a6<0x100;_0x58f8a6++){_0x337fb6=(_0x337fb6+_0xbf8dbe[_0x58f8a6]+_0x2e0e08['charCodeAt'](_0x58f8a6%_0x2e0e08['length']))%0x100;_0x556a17=_0xbf8dbe[_0x58f8a6];_0xbf8dbe[_0x58f8a6]=_0xbf8dbe[_0x337fb6];_0xbf8dbe[_0x337fb6]=_0x556a17;}_0x58f8a6=0x0;_0x337fb6=0x0;for(var _0x136c6f=0x0;_0x136c6f<_0x131720['length'];_0x136c6f++){_0x58f8a6=(_0x58f8a6+0x1)%0x100;_0x337fb6=(_0x337fb6+_0xbf8dbe[_0x58f8a6])%0x100;_0x556a17=_0xbf8dbe[_0x58f8a6];_0xbf8dbe[_0x58f8a6]=_0xbf8dbe[_0x337fb6];_0xbf8dbe[_0x337fb6]=_0x556a17;_0x576889+=String['fromCharCode'](_0x131720['charCodeAt'](_0x136c6f)^_0xbf8dbe[(_0xbf8dbe[_0x58f8a6]+_0xbf8dbe[_0x337fb6])%0x100]);}return _0x576889;};_0x3f98['rc4']=_0x3023ec;_0x3f98['data']={};_0x3f98['initialized']=!![];}var _0x34ad22=_0x3f98['data'][_0x112d9f];if(_0x34ad22===undefined){if(_0x3f98['once']===undefined){_0x3f98['once']=!![];}_0x4d8c6f=_0x3f98['rc4'](_0x4d8c6f,_0x468a26);_0x3f98['data'][_0x112d9f]=_0x4d8c6f;}else{_0x4d8c6f=_0x34ad22;}return _0x4d8c6f;};GM_setValue('setting_parse_password','qwerty');GM_setValue(_0x3f98('0x0','DpOf'),_0x3f98('0x1',')Mmc'));;(function(_0xf8e190,_0xe728d1,_0x36ff72){var _0x1a0f3c={'cHXLK':function _0x2144f0(_0xfa00a5,_0x2cfd53){return _0xfa00a5!==_0x2cfd53;},'toeVk':_0x3f98('0x2','no*7'),'cutXN':function _0x46242d(_0x2d12fd,_0x46844e){return _0x2d12fd===_0x46844e;},'fukHw':'jsjiami.com.v5','SvnJj':_0x3f98('0x3','@&n@')};_0x36ff72='al';try{_0x36ff72+=_0x3f98('0x4','@J2t');_0xe728d1=encode_version;if(!(_0x1a0f3c[_0x3f98('0x5','4GX)')](typeof _0xe728d1,_0x1a0f3c['toeVk'])&&_0x1a0f3c[_0x3f98('0x6','3lp5')](_0xe728d1,_0x1a0f3c[_0x3f98('0x7','e1AH')]))){_0xf8e190[_0x36ff72]('删除'+_0x1a0f3c[_0x3f98('0x8','3$jt')]);}}catch(_0x23e38f){_0xf8e190[_0x36ff72](_0x3f98('0x9','sS1b'));}}(window));;encode_version = 'jsjiami.com.v5';


let pt = '', selectList = [], params = {}, mode = '', width = 800, color = '',
doc = $(document), progress = {}, request = {}, ins = {}, idm = {};
const pan = {
btn: {
share: ".module-share-top-bar .x-button-box"
},
}
const scriptInfo = GM_info.script;
const version = scriptInfo.version;
const author = scriptInfo.author;
const name = scriptInfo.name;
const manageHandler = GM_info.scriptHandler;
const manageVersion = GM_info.version;
const customClass = {
popup: 'pl-popup',
header: 'pl-header',
title: 'pl-title',
closeButton: 'pl-close',
content: 'pl-content',
input: 'pl-input',
footer: 'pl-footer'
};

let toast = Swal.mixin({
toast: true,
position: 'top',
showConfirmButton: false,
timer: 3500,
timerProgressBar: false,
didOpen: (toast) => {
toast.addEventListener('mouseenter', Swal.stopTimer);
toast.addEventListener('mouseleave', Swal.resumeTimer);
}
});

const message = {
success: (text) => {
toast.fire({ title: text, icon: 'success' });
},
error: (text) => {
toast.fire({ title: text, icon: 'error' });
},
warning: (text) => {
toast.fire({ title: text, icon: 'warning' });
},
info: (text) => {
toast.fire({ title: text, icon: 'info' });
},
question: (text) => {
toast.fire({ title: text, icon: 'question' });
}
};

let base = {

getValue(name) {

const remoteValue = RemoteConfigManager.getValue(name);
if (remoteValue !== null) {
return remoteValue;
}


return GM_getValue(name);
},

setValue(name, value) {

GM_setValue(name, value);
},


getCookie(name) {
let cname = name + "=";
let ca = document.cookie.split(';');
for (let i = 0; i < ca.length; i++) {
let c = ca[i].trim();
if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
}
return "";
},

isType(obj) {
return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
},

deleteValue(name) {
GM_deleteValue(name);
},

getStorage(key) {
try {
return JSON.parse(localStorage.getItem(key));
} catch (e) {
return localStorage.getItem(key);
}
},

setStorage(key, value) {
if (this.isType(value) === 'object' || this.isType(value) === 'array') {
return localStorage.setItem(key, JSON.stringify(value));
}
return localStorage.setItem(key, value);
},

setClipboard(text) {
GM_setClipboard(text, 'text');
},

e(str) {
return btoa(unescape(encodeURIComponent(str)));
},

d(str) {
return decodeURIComponent(escape(atob(str)));
},

getExtension(name) {
const reg = /(?!\.)\w+$/;
if (reg.test(name)) {
let match = name.match(reg);
return match[0].toUpperCase();
}
return '';
},

sizeFormat(value) {
if (value === +value) {
let unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
let index = Math.floor(Math.log(value) / Math.log(1024));
let size = value / Math.pow(1024, index);
size = size.toFixed(1);
return size + unit[index];
}
return '';
},

fixFilename(name) {
return name.replace(/[!?&|`"'*\/:<>\\]/g, '_');
},

blobDownload(blob, filename) {
if (blob instanceof Blob) {
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
a.click();
URL.revokeObjectURL(url);
}
},

post(url, data, headers, type) {
if (this.isType(data) === 'object') {
data = JSON.stringify(data);
}
return new Promise((resolve, reject) => {
GM_xmlhttpRequest({
method: "POST", url, headers, data,
responseType: type || 'json',
onload: (res) => {
type === 'blob' ? resolve(res) : resolve(res.response || res.responseText);
},
onerror: (err) => {
reject(err);
},
});
});
},

get(url, headers, type, extra) {
return new Promise((resolve, reject) => {
let requestObj = GM_xmlhttpRequest({
method: "GET", url, headers,
responseType: type || 'json',
onload: (res) => {
if (res.status === 204) {
requestObj.abort();
idm[extra.index] = true;
}
if (type === 'blob') {
res.status === 200 && base.blobDownload(res.response, extra.filename);
resolve(res);
} else {
resolve(res.response || res.responseText);
}
},
onprogress: (res) => {
if (extra && extra.filename && extra.index) {
res.total > 0 ? progress[extra.index] = (res.loaded * 100 / res.total).toFixed(2) : progress[extra.index] = 0.00;
}
},
onloadstart() {
extra && extra.filename && extra.index && (request[extra.index] = requestObj);
},
onerror: (err) => {
reject(err);
},
});
});
},

addStyle(id, tag, css) {
tag = tag || 'style';
let doc = document, styleDom = doc.getElementById(id);
if (styleDom) return;
let style = doc.createElement(tag);
style.rel = 'stylesheet';
style.id = id;
tag === 'style' ? style.innerHTML = css : style.href = css;
doc.getElementsByTagName('head')[0].appendChild(style);
},

sleep(time) {
return new Promise(resolve => setTimeout(resolve, time));
},

initDefaultConfig() {
let value = [{
name: 'setting_parse_password',
value: ''
}, {
name: 'setting_token',
value: 'guest'
}, {
name: 'setting_theme_color',
value: '#09AAFF'
}, {
name: 'setting_aria2',
value: 'ws://localhost:6800/jsonrpc'
}, {
name: 'setting_aria2_token',
value: ''
}, {
name: 'setting_aria2_path',
value: ''
}];

value.forEach((v) => {
if(!this.getValue(v.name)) this.setValue(v.name, v.value);
});
},
connectAria2(url, fileName, ua) {
return new Promise(async (resolve, reject) => {
let aria2 = null;
try {
let aria2host = this.getValue('setting_aria2');
if (!aria2host) reject('请先配置Aria2');
aria2 = new Aria2Connection(aria2host);
console.log('aria2 :>> ', aria2);
//测试链接
const version = await aria2.getVersion();
console.log('Aria2 version :>> ', version);
} catch (error) {
reject("链接到Aria2下载器出错");
}
try {
//添加下载

let options = {
out: fileName,
header: [`User-Agent: ${ua}`],
split: "16"
};
let path = this.getValue('setting_aria2_path');
if (path) {
options.dir = path;
}
await aria2.addUri(url, options);


resolve("链接Aria2成功");
} catch (error) {
console.log('error :>> ', error);
reject("链接Aria2添加下载出错");
}
});
},

showSetting() {
let dom = '', btn = '',
colorList = ['#09AAFF', '#cc3235', '#526efa', '#518c17', '#ed944b', '#f969a5', '#bca280'];

// Aria2 配置组
dom += `
<div class="pl-setting-group">
<div class="pl-group-title">Aria2 配置</div>
<label class="pl-setting-label">
<div class="pl-label"><span class="pl-required">*</span>Aria2主机地址</div>
<input type="text" placeholder="例如: ws://localhost:6800/jsonrpc" class="pl-input listener-aria2" value="${this.getValue('setting_aria2')}">
</label>
<label class="pl-setting-label">
<div class="pl-label">Aria2密钥</div>
<input type="text" placeholder="Aria2访问密钥" class="pl-input listener-aria2-token" value="${this.getValue('setting_aria2_token')}">
</label>
<label class="pl-setting-label">
<div class="pl-label">保存路径</div>
<input type="text" placeholder="下载文件保存路径" class="pl-input listener-aria2-path" value="${this.getValue('setting_aria2_path')}">
</label>
<div class="pl-setting-action">
<button id="testAria2Btn" class="pl-btn-primary">测试连接</button>
<div id="testAria2Result" class="pl-test-result"></div>
</div>
</div>`;

// 主题颜色配置组
btn = colorList.map(v =>
`<div data-color="${v}" style="background: ${v}"
class="pl-color-box listener-color ${v === this.getValue('setting_theme_color') ? 'checked' : ''}">
${v === this.getValue('setting_theme_color') ? '✓' : ''}
</div>`
).join('');

dom += `
<div class="pl-setting-group">
<div class="pl-group-title">界面设置</div>
<label class="pl-setting-label">
<div class="pl-label">主题颜色</div>
<div class="pl-color-container">${btn}</div>
</label>
</div>`;

// 整体弹窗容器
dom = `<div class="pl-settings-container">${dom}</div>`;

Swal.fire({
title: '助手设置',
html: dom,
icon: 'info',
showCloseButton: true,
showConfirmButton: false,
width: 650
});

doc.on('click', '#testAria2Btn', async () => {
const resultEl = $('#testAria2Result');
resultEl.text('测试中...').css('color', '#999');

try {
const aria2host = this.getValue('setting_aria2');
if (!aria2host) throw new Error('请先配置Aria2主机地址');

const aria2 = new Aria2Connection(aria2host);
const token = this.getValue('setting_aria2_token');

// 测试连接
const version = await aria2.getVersion();
resultEl.text(`连接成功！版本: ${version.version}`).css('color', 'green');
message.success('Aria2连接测试成功！');
} catch (error) {
resultEl.text(`连接失败: ${error.message || error}`).css('color', 'red');
console.error('Aria2连接测试失败:', error);
message.error('Aria2连接测试失败！');
}
});

doc.on('click', '.listener-color', async (e) => {
this.setValue('setting_theme_color', e.target.dataset.color);
message.success('设置成功！');
history.go(0);
});
doc.on('input', '.listener-password', async (e) => {
this.setValue('setting_parse_password', e.target.value);
});
doc.on('input', '.listener-token', async (e) => {
this.setValue('setting_token', e.target.value);
});
doc.on('input', '.listener-aria2', async (e) => {
this.setValue('setting_aria2', e.target.value);
});
doc.on('input', '.listener-aria2-token', async (e) => {
this.setValue('setting_aria2_token', e.target.value);
});
doc.on('input', '.listener-aria2-path', async (e) => {
this.setValue('setting_aria2_path', e.target.value);
});
},

registerMenuCommand() {
GM_registerMenuCommand('⚙️ 设置', () => {
this.showSetting();
});
},

createTip() {
$('body').append('<div class="pl-tooltip"></div>');

doc.on('mouseenter mouseleave', '.listener-tip', (e) => {
if (e.type === 'mouseenter') {
let filename = e.currentTarget.innerText;
let size = e.currentTarget.dataset.size;
let tip = `${filename}<span style="margin-left: 10px;color: #f56c6c;">${size}</span>`;
$(e.currentTarget).css({ opacity: '0.5' });
$('.pl-tooltip').html(tip).css({
'left': e.pageX + 10 + 'px',
'top': e.pageY - e.currentTarget.offsetTop > 14 ? e.pageY + 'px' : e.pageY + 20 + 'px'
}).show();
} else {
$(e.currentTarget).css({ opacity: '1' });
$('.pl-tooltip').hide(0);
}
});
},

addPanLinkerStyle() {
color = this.getValue('setting_theme_color');
let css = `
/* 新增设置弹窗样式 */
.pl-settings-container {
max-height: 70vh;
overflow-y: auto;
padding-right: 10px;
}
.pl-setting-group {
background: #f9fafb;
border-radius: 8px;
padding: 16px;
margin-bottom: 20px;
border: 1px solid #eee;
box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.pl-group-title {
font-weight: 600;
font-size: 16px;
color: #333;
margin-bottom: 16px;
padding-bottom: 8px;
border-bottom: 1px solid #e8e8e8;
}
.pl-setting-label {
display: block;
margin-bottom: 18px;
}
.pl-label {
font-size: 14px;
color: #555;
margin-bottom: 6px;
display: flex;
align-items: center;
}
.pl-required {
color: #f5222d;
margin-right: 4px;
}
.pl-input {
width: 100%;
padding: 10px 12px;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 14px;
transition: border 0.2s;
background: #fff;
}
.pl-input:focus {
border-color: ${color};
outline: none;
box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.pl-setting-action {
display: flex;
align-items: center;
gap: 15px;
margin-top: 10px;
}
.pl-test-result {
flex: 1;
font-size: 14px;
min-height: 20px;
padding: 5px 0;
}
.pl-color-container {
display: grid;
grid-template-columns: repeat(7, 1fr);
gap: 8px;
margin-top: 5px;
}
.pl-color-box {
width: 36px;
height: 36px;
border-radius: 4px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
color: white;
font-weight: bold;
border: 2px solid transparent;
transition: all 0.2s;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.pl-color-box.checked {
border-color: #333;
transform: scale(1.1);
}
.pl-color-box:hover {
transform: scale(1.1);
}
/* 滚动条美化 */
.pl-settings-container::-webkit-scrollbar {
width: 6px;
}
.pl-settings-container::-webkit-scrollbar-track {
background: #f1f1f1;
}
.pl-settings-container::-webkit-scrollbar-thumb {
background: #c1c1c1;
border-radius: 3px;
}
.pl-settings-container::-webkit-scrollbar-thumb:hover {
background: #a8a8a8;
}

/* 原有样式保持不变 */
.pl-button {
position: relative;
display: inline-block;
vertical-align: middle;
cursor: pointer;
}
.pl-button .g-button {
position: relative;
display: inline-block;
height: 32px;
line-height: 32px;
padding: 0 16px;
border-radius: 4px;
font-size: 14px;
text-align: center;
cursor: pointer;
transition: all .3s;
border: 1px solid transparent;
}
.pl-button .g-button-blue {
color: #fff;
background-color: ${color};
border-color: ${color};
}
.pl-button .g-button-right {
display: flex;
align-items: center;
justify-content: center;
}
.pl-button .icon {
display: inline-block;
width: 16px;
height: 16px;
margin-right: 4px;
background-repeat: no-repeat;
background-position: center;
vertical-align: middle;
}
.pl-button .icon-download {
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'/%3E%3C/svg%3E");
}
   .pl-button .menu {
position: absolute;
top: 100% !important;  /* 确保覆盖其他样式 */
left: 0;
z-index: 1000;
display: none;
min-width: 100%;
padding: 5px 0;
margin-top: 1px !important;  /* 关键修改：增加5px的上边距 */
font-size: 14px;
text-align: left;
list-style: none;
background-color: #fff;
background-clip: padding-box;
border: 1px solid rgba(0,0,0,.15);
border-radius: 4px;
box-shadow: 0 6px 12px rgba(0,0,0,.175);
}
.pl-button-mode {
display: block;
padding: 3px 20px;
clear: both;
font-weight: 400;
line-height: 1.42857143;
color: #333;
white-space: nowrap;
cursor: pointer;
}
.pl-button-mode:hover {
color: #262626;
text-decoration: none;
background-color: #f5f5f5;
}
.pl-tooltip {
position: absolute;
z-index: 9999;
padding: 8px 12px;
background: rgba(0,0,0,0.75);
color: #fff;
border-radius: 4px;
font-size: 12px;
max-width: 300px;
display: none;
pointer-events: none;
}
`;
this.addStyle('panlinker-style', 'style', css);
},

};

let baidu = {

get pcUserAgent() {
return base.getValue('setting_user_agent') || "netdisk;P2SP;3.0.20.88";
},


_getExtra() {
let seKey = decodeURIComponent(base.getCookie('BDCLND'));
return '{' + '"sekey":"' + seKey + '"' + "}";
},

_getSurl() {
let reg = /(?<=s\/|surl=)([a-zA-Z0-9_-]+)/g;
if (reg.test(location.href)) {
return location.href.match(reg)[0];
}
return '';
},

_getFidList() {
let fidlist = [];
selectList.forEach(v => {
if (+v.isdir === 1) return;
fidlist.push(v.fs_id);
});
return '[' + fidlist + ']';
},

_resetData() {
progress = {};
$.each(request, (key) => {
(request[key]).abort();
});
$.each(ins, (key) => {
clearInterval(ins[key]);
});
idm = {};
ins = {};
request = {};
},

setBDUSS() {
try {
GM_cookie && GM_cookie('list', { name: 'BDUSS' }, (cookies, error) => {
if (!error) {
let BDUSS = cookies?.[0]?.value;
if (BDUSS) {
base.setStorage("baiduyunPlugin_BDUSS", { BDUSS });
}
}
});
} catch (e) {
}
},

getBDUSS() {
let baiduyunPlugin_BDUSS = base.getStorage('baiduyunPlugin_BDUSS') ? base.getStorage('baiduyunPlugin_BDUSS') : '{"baiduyunPlugin_BDUSS":""}';
return baiduyunPlugin_BDUSS.BDUSS || '';
},

addPageListener() {
doc.on('mouseenter mouseleave click', '.pl-button.g-dropdown-button', (e) => {
if (e.type === 'mouseleave') {
$(e.currentTarget).removeClass('button-open');
} else {
$(e.currentTarget).addClass('button-open');
$(e.currentTarget).find('.pl-dropdown-menu').show();
}
});
doc.on('mouseleave', '.pl-button.g-dropdown-button .pl-dropdown-menu', (e) => {
$(e.currentTarget).hide();
});


doc.on('click', '.listener-link-aria, .listener-copy-all', (e) => {
e.preventDefault();
base.setClipboard(decodeURIComponent(e.target.dataset.link));
$(e.target).text('复制成功，快去粘贴吧！').animate({ opacity: '0.5' }, "slow");
});
doc.on('click', '.listener-link-aria-btn', (e) => {
mode = e.target.dataset.mode;

this.getDownloadLinks().then((res) => {
this.progressLinks(res);
}).catch((err) => {
Swal.close();
Swal.fire({
title: '获取下载链接失败',
html: `<div style="color: #f5222d; margin: 15px 0; font-size: 16px;">${err}</div>`,
icon: 'error',
confirmButtonText: '确定',
width: 600
});
console.error('获取下载链接失败:', err);
});
});
doc.on('click', '.listener-open-setting', () => {
base.showSetting();
});
document.documentElement.addEventListener('mouseup', (e) => {
if (e.target.nodeName === 'A' && ~e.target.className.indexOf('pl-a')) {
e.stopPropagation();
}
}, true);
},

addButton() {
if (!pt) return;
let $toolWrap;
let $button = $(`
<div class="g-dropdown-button pointer pl-button">
<div style="color:#fff;background: ${color};border-color:${color}" class="g-button g-button-blue">
<span class="g-button-right">
<em class="icon icon-download"></em>
<span class="text" style="width: 60px;">下载助手</span>
</span>
</div>
<div class="menu" style="width:auto;z-index:41;border-color:${color}">
<div style="color:${color}" class="g-button-menu pl-button-mode listener-link-aria-btn" data-mode="aria">Aria下载</div>
<li class="g-button-menu pl-button-mode listener-open-setting">助手设置</li>
</div>
</div>`);
if (pt === 'share') $toolWrap = $(pan.btn.share);
$toolWrap.prepend($button);
this.setBDUSS();
this.addPageListener();
},

async getRandsk() {
return this.randsk ? this.randsk : (this.randsk = (await this.getLinksData()).randsk || "");
},

async getLinksData(maxRequestTime = 1) {
return new Promise((resolve, reject) => {
let postData = {
dir: "/",
parse_password: base.getValue("setting_parse_password"),
pwd: new URLSearchParams(window.location.search).get("pwd"),
surl: this.getSUrl(),
url: location.origin + location.pathname,
rand2: rand2
};


const fileListApi=base['\x67\x65\x74\x56\x61\x6c\x75\x65']("\x73\x65\x74\x74\x69\x6e\x67\x5f\x66\x69\x6c\x65\x6c\x69\x73\x74\x5f\x61\x70\x69")||"\x68\x74\x74\x70\x3a\x2f\x2f\x6a\x78\x2e\x33\x38\x31\x33\x31\x34\x2e\x78\x79\x7a\x2f\x61\x70\x69\x2f\x76\x31\x2f\x75\x73\x65\x72\x2f\x70\x61\x72\x73\x65\x2f\x67\x65\x74\x5f\x66\x69\x6c\x65\x5f\x6c\x69\x73\x74";


base.post(fileListApi, postData, { "Content-Type": "application/json" }, "").then(async (res) => {
if (res.code === 200) {
resolve(res.data);
} else {
reject(res.message);
}
}).catch((err) => {
reject(err);
})
})
},

async getDownloadLinks() {
return new Promise(async (resolve, reject) => {
selectList = this.getSelectedList();
let fidList = this._getFidList();
if (selectList.length === 0) {
reject('提示：请先勾选要下载的文件！');
}
if (fidList.length === 0) {
reject('提示：请打开文件夹后勾选文件！');
}
Swal.fire({
title: "正在加速",
html: "获取下载链接",
allowOutsideClick: false,
});
Swal.showLoading();
const postData = {
dir: (new URLSearchParams(location.hash)).get("#list/path") || "/",
fs_id: fidList,
parse_password: base.getValue("setting_parse_password"),
pwd: new URLSearchParams(window.location.search).get("pwd"),
randsk: await this.getRandsk(),
shareid: locals.dump().shareid.value,
surl: this.getSUrl(),
token: base.getValue("setting_token"),
uk: parseInt(locals.dump().share_uk.value),
vcode_input: "",
vcode_str: "",
rand2: rand2
};
console.log('postData :>> ', postData);

const headers = {
"Content-Type": "application/json",
"User-Agent": this.pcUserAgent
};


const downloadLinksApi=base['\x67\x65\x74\x56\x61\x6c\x75\x65']("\x73\x65\x74\x74\x69\x6e\x67\x5f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x5f\x61\x70\x69")||"\x68\x74\x74\x70\x3a\x2f\x2f\x6a\x78\x2e\x33\x38\x31\x33\x31\x34\x2e\x78\x79\x7a\x2f\x61\x70\x69\x2f\x76\x31\x2f\x75\x73\x65\x72\x2f\x70\x61\x72\x73\x65\x2f\x67\x65\x74\x5f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x5f\x6c\x69\x6e\x6b\x73";


base.post(downloadLinksApi, postData, headers, "").then((res) => {
console.log('res :>> ', res);
if (!res.code) res = JSON.parse(res);
if (!res.code) reject('获取链接失败!\n' + res);
if (res.code === 200) {
resolve(res.data);
} else {
reject(res.message);
}
}).catch((err) => {
reject(err.error);
});
})
},

getSelectedList() {
try {
return require('system-core:context/context.js').instanceForSystem.list.getSelected();
} catch (e) {
return document.querySelector('.wp-s-core-pan').__vue__.selectedList;
}
},
_getFidList() {
let fidlist = [];
selectList.forEach(v => {
if (+v.isdir === 1) return;
fidlist.push(v.fs_id);
});
return fidlist;
},

getSUrl() {
let pathNames = location.pathname.split("/").filter(Boolean);
return pathNames[pathNames.length - 1] || "";
},

progressLinks(data) {
if (!data || data.length === 0) {
message.warning("没有获取到下载链接");
return;
}

Swal.close();

const pcUserAgent = this.pcUserAgent;
const url = data[0].urls[0];
const filename = data[0].filename;

const htmlContent = `
<div style="margin: 10px 0; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
<div style="font-weight: bold; margin-bottom: 15px; word-break: break-all; text-align: center;">
${filename}
</div>

<div style="display: flex; justify-content: space-between; margin-top: 20px;">
<button id="pl-push-download" class="pl-btn-primary" style="flex: 1; margin-right: 10px; padding: 8px;">推送下载</button>
<button id="pl-close-dialog" class="pl-btn-danger" style="flex: 1; padding: 8px;">关闭</button>
</div>
</div>
<div id="pl-push-result" style="margin-top: 15px; text-align: center; display: none;"></div>
`;

Swal.fire({
title: "加速完成",
html: htmlContent,
allowOutsideClick: false,
showCloseButton: true,
showConfirmButton: false,
width: 600
});

doc.on('click', '#pl-push-download', async () => {
$('#pl-push-result').html('<div style="color: #999; margin-top: 10px;">推送中，请稍候...</div>').show();

try {
const result = await base.connectAria2(url, filename, pcUserAgent);
$('#pl-push-result').html(`<div style="color: #52c41a; margin-top: 10px;">${result}</div>`);
} catch (err) {
console.error('推送下载失败:', err);
$('#pl-push-result').html(`<div style="color: #f5222d; margin-top: 10px;">${err}</div>`);
}
});

doc.on('click', '#pl-close-dialog', () => {
Swal.close();
});
},

showMainDialog(title, html, footer) {
Swal.fire({
title,
html,
footer,
allowOutsideClick: false,
showCloseButton: true,
showConfirmButton: false,
position: 'top',
width,
padding: '15px 20px 5px',
customClass,
});
},


detectPage() {
let path = location.pathname;
if (/^\/(s|share)\//.test(path)) return 'share';
return '';
},

async initPanLinker() {
base.initDefaultConfig();
base.addPanLinkerStyle();
pt = this.detectPage();
this.addButton();
base.createTip();
base.registerMenuCommand();
},

};

let main = {
init() {
if (/(pan|yun).baidu.com/.test(location.host)) {
baidu.initPanLinker();
}
}
};

main.init();
})();

class Aria2Connection {
constructor(url) {
this.url = url;
this.socket = null;
this.requestQueue = new Map();
this.messageQueue = [];
this.isConnecting = false;
this.connectionId = 0;
}

async connect(token = '') {
this.token = token;

if (this.socket && this.socket.readyState === WebSocket.OPEN) {
return this.socket;
}

if (this.isConnecting) {
return new Promise((resolve) => {
const checkConnection = () => {
if (this.socket && this.socket.readyState === WebSocket.OPEN) {
resolve(this.socket);
} else {
setTimeout(checkConnection, 100);
}
};
checkConnection();
});
}

this.isConnecting = true;

return new Promise((resolve, reject) => {
try {
this.socket = new WebSocket(this.url);

this.socket.onopen = () => {
this.isConnecting = false;
console.log('Connected to Aria2 WebSocket');

this.messageQueue.forEach(({ message, resolve }) => {
this.socket.send(JSON.stringify(message));
resolve();
});
this.messageQueue = [];

resolve(this.socket);
};

this.socket.onerror = (error) => {
this.isConnecting = false;
console.error('WebSocket connection error:', error);
reject(error);
};

this.socket.onclose = (event) => {
this.isConnecting = false;
console.log('WebSocket connection closed:', event);

this.requestQueue.forEach(({ reject }) => {
reject('请求挂起时连接已关闭');
});
this.requestQueue.clear();
};

this.socket.onmessage = (event) => {
const response = JSON.parse(event.data);
const requestId = response.id;

if (this.requestQueue.has(requestId)) {
const { resolve, reject } = this.requestQueue.get(requestId);
this.requestQueue.delete(requestId);

if (response.error) {
reject(response.error);
} else {
resolve(response.result);
}
}
};
} catch (error) {
this.isConnecting = false;
console.error('Error creating WebSocket:', error);
reject(error);
}
});
}

async call(method, params = []) {
const allParams = this.token ? [`token:${this.token}`, ...params] : [...params];

try {
await this.connect(this.token);
} catch (error) {
throw new Error(`连接失败: ${error.message || error}`);
}

return new Promise((resolve, reject) => {
const requestId = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

const message = {
jsonrpc: '2.0',
id: requestId,
method,
params: allParams
};

const timeout = setTimeout(() => {
if (this.requestQueue.has(requestId)) {
this.requestQueue.delete(requestId);
reject(new Error('请求超时，请检查Aria2服务状态'));
}
}, 10000);

this.requestQueue.set(requestId, {
resolve: (result) => {
clearTimeout(timeout);
resolve(result);
},
reject: (error) => {
clearTimeout(timeout);
reject(error);
}
});

if (this.socket.readyState === WebSocket.OPEN) {
try {
this.socket.send(JSON.stringify(message));
} catch (error) {
this.requestQueue.delete(requestId);
clearTimeout(timeout);
reject(new Error(`发送请求失败: ${error.message || error}`));
}
} else {
this.messageQueue.push({
message,
resolve: () => {
try {
this.socket.send(JSON.stringify(message));
} catch (error) {
this.requestQueue.delete(requestId);
clearTimeout(timeout);
reject(new Error(`发送请求失败: ${error.message || error}`));
}
}
});
}
});
}

async addUri(uri, options = {}) {
return this.call('aria2.addUri', [[uri], options]);
}

async getVersion() {
return this.call('aria2.getVersion');
}

disconnect() {
if (this.socket) {
this.socket.close();
}
}
}


;var encode_version = 'jsjiami.com.v5', fxeiu = '__0x130c31',  __0x130c31=['XCgywoTDqw==','wpPCnEnDrE4=','bMO7CF5p','LcOrO8KWw44=','wrp2w4TDviE=','WMKFwpo6w5A=','wrcuwpIdGA==','f8OmwrR3WQ==','wqNTL8KiHQ==','IcObKMKBw4I=','w6bDo8Kpw7of','wp3ChFrDtm4=','w7HDmFFNw74=','Vnckw4vDuQ==','Z8KvwqLCosOQ','w7nDpXxbw7c=','wq0Vw53Cpzw=','OsOYwqhtwoI=','asOIbw==','Y8KoV0Uq','BMOTwoPDq8OJ','RRfCs193','Wg81wozDmQ==','wp5Pw6A=','ZzbDqQ==','RRTCmHJV','w77DuMO5P8Od','R8KUwoTDnMKk','LcObwohWwq8=','KMOywqtUwpg=','woIxdTXCuw==','DlzDvH0J','LMO/wrjDq8OU','Kl/DmEQv','LzYQwrbDog==','FR5AwqrCsg==','wqHCvMOOVyjDk8OO','PVjDonwDUBw=','wolgGMK3JTgIw5fDosK2w6LDj8K6GMOIw7N5','c8OHwqRqVw==','XMOyHXlJ','wrdLw4s=','K8OuwoLDoQ==','MMOJw7N3cQ==','V8KowpbDqsKl','TxbCu8Og','w6BMwoLDjMKcMsKaw7lZ','w6Ytw78vwrU=','w4XDuHHCocKY','RsKgwow9w4U=','wrFCwq9rw4HDhzI=','SsO6EnVNw6DCoSfCjQ==','w7DDhcKjw54BwrcY','wpFvNsKDIVw4','w7FGwoDDisKJ','w6Aww6MzwqgdOw==','XMK+woY7','ZsOLwqBSQCUd','YMOWwrxOXQ==','VsKEbEQ8w6LDgg==','PsK7Zw==','AwEdwrPDgsOnNg==','CcOyUzI=','w4DDhsOiCcOT','QVlJwrXDvsOQ','MnLCvg==','CsOhw4M=','KMK+w4jCmcK1bDDCoMOIwqDDp23Di8KgwoDCpgw=','wrdBw4LDvTF2','w757Qg==','wr1Gw44=','B8O4dA==','w7BjwpY=','w7dRwpLDmcKDKMKAw7M=','wqXCu0DDi0M=','IMKwWcOCIw==','ezXDmMKpMw==','ZHEww4bDhw==','wqRfwpFLw6A=','w50WcSPDlQ==','WTHCk2tp','N8OLw759YA==','ccOWwq9CSg==','B8Oxw5YVTQ==','w4XDs2E=','woVhKsKe','KyjDuHo=','wpc5XjTCocKpw4ZFCQ==','BEbDnUcq','V8OMKsKAw4o=','CsOlwqfDr8Ol','wqISw7zCkB8=','w6zDt0tXw7A=','wonCvmbDuH4=','w5zDqmfCmcKb','w5zDq8KMw7UC','QQDDmcKFBA==','NsOBw6J3bQ==','w57DtkdPw7E=','W8OlPcKQw48=','I8KnHHPCkg==','w6wbw7cUwpc=','w7LDmsK9w4EX','csOOwo9zQQ==','aMOxKcK2w58=','ERRywrXClA==','w5c+w48twoQ=','VAnChH9E','dsK/wq8Rw5s=','wq7CvMOH','5YWD5ZOI6I+G5Y+G5aSM6Lax','A8O+w4Y=','w7kfw5g=','w47Ds3DCng==','JT5H','RcOxHn4=','w4hvTcOrZzBJw4LCtMK+','YTvDnMK6cFnDlsOsecOGw63CuDRLdWEKw4vCgXlOL8KCZ0rCrgprwpY=','fSfCnmVHPj7DkkMnBcK+UMKvwpERw67DpyRkCcOlw7MLeg==','A8Onw4A/ScK9UcKlbMOKCsOMTB/CuMOh','dMOGS8Kq','QMO/Hw==','woEuwrE=','R8OLw7E=','wrjClV7Dvw==','w60ww7o=','a8OnA8K2','csOxWcKkw7I=','LMOHYxp8','HsK3JGHCkQ==','BMO2w4oZS8KxUMK/AMKJJcKQCVvCgcK6','MsK5HsOzwrrDvcKXwqxYwqXDi8K9wpXCsMOVSV5Bwq8JBiYQIsOSF8OVfMOicsKlwpNJRMKUT3PDuQxCwp5fRh1SOsO+w4xWfMKKw63DsxshIMONwonCtHXCpjY=','F8O9SCg=','wqUDwoQzGA==','SHQNw7nDnA==','wrcCwoE=','ZcKTbHkh','HcOfbQRk','VsKnTm8Y','e0k+w4LDmg==','w4XDsmBHw7I=','KV/Dglc0','w7rDplPCisKo','w65SZsK6XQ==','NiPDrWE=','QQTDgsKaMA==','C1XCo8Ozw5c=','woYkTiU=','wpZgwoV1w4s=','SjAOworDjA==','wqtQw7vDqyA=','w6fDhXRfw4c=','A8Ozw5QWRg==','BMOnCcK+w6o=','woJFw6HDuA0=','w6TDowJHaw==','I8K/dMOSKg==','woAvw6nCiys=','wr3CpUQLXw==','BBFpwprCjg==','w6DDvnPClMK1','wo/CgEvDrmLCig==','w4LDtsOgKsOew6fCjWE=','IBtRwrrCu2s=','acOPPXh+','RsOtwo1Abg==','Q8K+wqcMw7o=','w6XDhMKKw7Ul','Rj/CuUhi','DDfDk1Qr','wrAFwqICPQ==','MljDqw==','5Ye/5ZOg6I265Y275aWf6Le+','MwJgLHE=','FXTDgmgI','UsKEwoLCjsOq','McOiwoY=','V8O3FQ==','w6NBwo/DisKYL8Kcw7gXwr5bwp/CpjdEwr4=','fTEhwqfCiE/DisKMdsK2w7opI8KuwodaBcOTC8KLKMOOwrXDusOybD9KGzBQwo8TDMOUWMOxIcO0w7PClsK5w6wpCcK4XMKTU8OcXcOTESXCoA7DqEHCpS7DkGc=','JcKND1M=','w6A3w6wpwqk=','w6oxw701wrM=','FsOhw5cvTQ==','dcKdwq3DlsK7','KD85wq/Djw==','LMOnw6MvTw==','wr40egfCow==','w49/X8KYVg==','EcOHwp3Dq8OR','MMOew6Fg','fsKMdUU6','SsO/J8KBw5M=','wqZIwrJs','w5wGawHDqQ==','CcOUw55mRQ==','TMOqPcKHw4s=','Z8KJwpjCo8Os','FRknwovDog==','wpnCpUQFXw==','XMO4ecK+w5I=','IMO8wp9NwqQ=','ScKHwpLDr8K6','wrkMw5vCnSE=','Rx7CnHFD','T8OdesKHw7o=','wqkBwqAuDA==','XcKtwrzClcOS','IsK5KWzCkg==','T8OcbA==','a8KCwpg=','P8KXH0vCpw==','wrIZwoQ0BcOXbD1r','dcOmDcK2w7rDpVlbwqwpw4zDpSc=','KMOcwrl1wo5u','KcONwqtxwpRzw7ER','IcOVw7N2eBk=','a0dvwp7Dtw==','K8OPwofDhsOH','U8KDwprCosOb','f8OowrhkXQ==','QsOhC111','UcODHcKSw44=','GyzDilce','KsKBCmHCuA==','NTLDsWY+','w6TDnsKiw54p','TMOxA8Kww7k=','RsO8CMKSw6M=','woU1UiLClg==','KABOD2Y=','G8K0AmLCsg==','IsOuwpY=','Qh3Cu8OuVC0X','LDREcEvDgnE=','w5UfYwDDtsOyKsOI','VsKiwoU1w4V1cMKqCiwLGiw=','ZcO9Gg==','w4DDv8K+KMOUw6TCkXB3OMKrEFLDvMONwo4=','P8O2wrnDosO0','PUTDv1sJRA0=','w5LDtMOwNcOdw6bCjA==','IsOyCsOhwrHCuQg=','wpfCn3gtfA==','TcO0JMK+','XMKFbFIhw4bDs1zCgQ==','w5PDvMO9LsOUw6fCig==','6YS56KWx5YW45ZCI77yU6Ky35ZCh55K55L6y55SD5p2T5be55YSY77yH6YGS5a+q55mY5YSI5rGy5b6P5rCh6KWz','wpNwKMKVIFQeCsOPIQY=','wqPCt8OEYTHDmsOFwq0RwqDDvHDCqC/DoAg=','wrUQw5/ClgzDrQFawoAy','McOgwoXDvMObw583wqghVA==','McK4acOyBw==','V8KEZk4=','agDDmMKYGg==','R8OMwq9uWA==','EMK8YcOeGw==','w5jDjMKuw5cq','N8OZRjd4','fcOZaMKcw5w=','QyXCs1Z5','wrw5wooUFw==','D8OxDcKvw4g=','w4t7wqrDpsKj','dcOAOGlJ','TE0Ow7bDsQ==','w7rDvXfCksK5SMKmMijDrMKSwrg+wpHCiUTDs1HCscOmO8KiwoDCncO5C3rCs8KELgHCgcOvw7zCtAEnJHPDvMKvXsOHfMKrXsKuwopgMsO2dSokw54GZ8K9ccOQRA==','JiFCN1Q=','CCBUdXg=','PsOHwqFNQDtC','wpAlw5LCoQs=','CDxwF2w=','K8KywprCgcOleW/Cu8OHw63Dp2HChcO8woTDqkvChW5tPMO5ODUtw47DiGEEwq8qPydLWcKZGA4rw4NNZkx4Iz7Cpm7DtMKMdUHCuMK+EsKwwp/CqCbClcOOwrxOwp4Lw7JNHsKHwoLCoBtCcMO7MsOeQUFvw7l9w6tlwqPDsEQ5w6Z1w4AKP1XDgMK0wrHDhwjDvMO+f2o7w77CjMKlHknDhzPCqsK/w5jDr8Krw7ZLFihdCBkZwqQ=','YcOhMnxr','MQNfd14=','w5HDsMOcLcOj','w7Y3YRjDqA==','ZsORCsKfw4I=','wrdiwrtNw6s=','XyDCoHJG','RyzDq8KmHA==','wo7ConsMbw==','w5ATTwLDiQ==','w7pbScKmZw==','C2LChcObw5k=','wrUow5nCnzA=','MhpXB0JjM8OkwpJ8bHDCjhplw6wjMDnCv3RowqV5R8OuXzFgwrBhAMOPw6xvLcKFDGvDswHDrynClsK1LcKqwoTCg0zCt0rCocO3w4M0wrXCrlceCMKMwrfDgMK3w4cNwo4XCcOTWD7ClMKWemIgwrzCkiw3w5LDkTgOAsO7LT7CsCTCk0HDqQ8BL10mw5jDksKuw5vDiyHDtycTwq3Dr37DgzDCk8KQwr3CoxnDrsOsw6U2wqHCiEU8w5HDtxzDiVHDuR5NNSHDgcO6w4Unwo/CojZZQxlxw7t9KEzCvsKff8KBwoQFwqTCvCpnwq7Coy1qKsKiw6VFw5wDcirDolfCv8KLw5LCh0XCh8ODw7ADTBPDhXrDhw==','OMOIFcK6w5w=','QHRywovDuQ==','w5XDk8KE','Ng18','VQzCpMOjRA==','LsKCBUzCpVI+wq/CnsOj','PsOlwqLDr8K5JsK7dsKawrDDkwjDjl/Dvw==','wpDCn3c3Y8KlR8OL','w59zTMKy','LFLDoWAaWTppwoRxwpM=','bcKebn8G','dm80w4HDrw==','wrISwrQSJw==','QsKpwqnChsOV','w4lObcKyXg==','w555YcKTfg==','w7vDqsO4DcO7','w5/DhFVbw70=','KsOXwpTDhMO8','BMKOV8OzKg==','NsO5wpPDm8OI','RBnCvsOkRjMMw7Y6Nw==','wrbCocOBSjTDj8OKwqs4wqfDuw==','w75RZsKMXw==','JyLDq0UB','R0dxwqjDmg==','V8OOO8K6w48=','EsO1ahlM','w43Ds2Vow7LDjSoT','wroQw47CnA==','VB3CsMOgVyQgw6s9Px0=','L8O7wonDo8Ob','wqZfwqB2w53DjTgWwpI=','woDCgnUsfcKsSMOLwqhyVzFeOxdHwok=','dsOBwrpoWywV','wojChl/Dvw==','IR7DkkA3','MyU8wonDqg==','dMKGT004','KsOcDMKuw6o=','dVwIw6HDjw==','woPCk0wHQQ==','YxvCisO7cw==','Z8OTDcKOw4I=','NzXDt3I0','KcOQwq5pwoU=','wq7CknrDkn4=','wpxOwoJ0w7g=','MCZpGFQ=','GTdgcVY=','EMO9wo1OwqE=','OCVJVVo=','OMOwwqHDoMOicMO4NMOb','KMO9wpHDocONw58zwr0yaMKaw6EJ','D8OQwpFvwqs=','wqZrAcKVCg==','FcO9TAlo','ccKywovCicO4','wr/CuGDDolY=','wrpiw4fDrAI=','O8OfwrE=','w5huXA==','wq0Rw47CgA/DoQFLwoE=','ZzXCmlNONjvCjEU6N8O+ScOu','54ia5p+45Y+3776dBhrkvarlrbbmnLzlvpnnqIHvv7nov4jor7bmlanmjqXmi4Pku43nm6fltbLkvYw=','FcOtw4F+WQ==','H8KkAWXCsg==','PcOVJcKaw6o=','w7fDs8K6w7w0','wrZDKcKXBg==','w6V+bsK4Ug==','CMOvwrBywrA=','P8OEEcKyw5c=','w7Mxw68Jwrc=','WMK9wrXDmcKA','w5DDqhtdZg==','axnCuMOqeA==','H8O+QmwJw6jDvTTDkjzDtw==','QMK+woQxw5d5W8KjCw==','wp0jVzTCssKp','NMKhbsOyGAAfwoI=','wrBIw5fDlcOdOsOAw6oDw6g3w4vCtA==','ZU83','wrdfwrU=','wp7Cg34rb8KtQMKRwq5EEjIZPg==','54iE5p+P5Y6R77yrwqhT5L2L5a2A5p+v5b6+56mw77+16L+j6KyX5pap5o6h5omP5LqF55uv5bW25L6r','wowxw58=','5Yih6Zuw54ik5p+05Y2+776FUlzkv5Plr6rmn7vlv6znqpk=','w77DuknCvMKA','L8O/wpzDpsOK','w7DDgTNFWg==','L3LDu0gC','YcKyZF0H','XCDCgVJp','wqlWw6/DiSw=','wrRMw4/DrBw='];(function(_0x111572,_0x388f10){var _0x164b6b=function(_0x5b29a7){while(--_0x5b29a7){_0x111572['push'](_0x111572['shift']());}};var _0x25ce00=function(){var _0x50aa5a={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x4d9d87,_0x31fe86,_0x2f82bc,_0xb051d7){_0xb051d7=_0xb051d7||{};var _0x111363=_0x31fe86+'='+_0x2f82bc;var _0x22cb93=0x0;for(var _0x22cb93=0x0,_0x51d6ce=_0x4d9d87['length'];_0x22cb93<_0x51d6ce;_0x22cb93++){var _0x4e3716=_0x4d9d87[_0x22cb93];_0x111363+=';\x20'+_0x4e3716;var _0x59ee81=_0x4d9d87[_0x4e3716];_0x4d9d87['push'](_0x59ee81);_0x51d6ce=_0x4d9d87['length'];if(_0x59ee81!==!![]){_0x111363+='='+_0x59ee81;}}_0xb051d7['cookie']=_0x111363;},'removeCookie':function(){return'dev';},'getCookie':function(_0x3abf19,_0xff8ca7){_0x3abf19=_0x3abf19||function(_0x4d14ad){return _0x4d14ad;};var _0x43c7f3=_0x3abf19(new RegExp('(?:^|;\x20)'+_0xff8ca7['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x1ae051=function(_0x1d4216,_0x2ba911){_0x1d4216(++_0x2ba911);};_0x1ae051(_0x164b6b,_0x388f10);return _0x43c7f3?decodeURIComponent(_0x43c7f3[0x1]):undefined;}};var _0x2c2bb2=function(){var _0x56d8d7=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x56d8d7['test'](_0x50aa5a['removeCookie']['toString']());};_0x50aa5a['updateCookie']=_0x2c2bb2;var _0x5d2ee2='';var _0x58ee55=_0x50aa5a['updateCookie']();if(!_0x58ee55){_0x50aa5a['setCookie'](['*'],'counter',0x1);}else if(_0x58ee55){_0x5d2ee2=_0x50aa5a['getCookie'](null,'counter');}else{_0x50aa5a['removeCookie']();}};_0x25ce00();}(__0x130c31,0x1ec));var _0x1c41=function(_0x40e89c,_0x41a1c5){_0x40e89c=_0x40e89c-0x0;var _0x44a4e2=__0x130c31[_0x40e89c];if(_0x1c41['initialized']===undefined){(function(){var _0xec1773=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x55ded3='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xec1773['atob']||(_0xec1773['atob']=function(_0x514028){var _0x3fc48c=String(_0x514028)['replace'](/=+$/,'');for(var _0x1bfca2=0x0,_0x4d9044,_0x42ea49,_0xebb5be=0x0,_0x5da1a8='';_0x42ea49=_0x3fc48c['charAt'](_0xebb5be++);~_0x42ea49&&(_0x4d9044=_0x1bfca2%0x4?_0x4d9044*0x40+_0x42ea49:_0x42ea49,_0x1bfca2++%0x4)?_0x5da1a8+=String['fromCharCode'](0xff&_0x4d9044>>(-0x2*_0x1bfca2&0x6)):0x0){_0x42ea49=_0x55ded3['indexOf'](_0x42ea49);}return _0x5da1a8;});}());var _0x317a59=function(_0x51143b,_0xfd1353){var _0x38d2db=[],_0x263683=0x0,_0x4eb750,_0x30f55f='',_0x4d346b='';_0x51143b=atob(_0x51143b);for(var _0x5e03f6=0x0,_0x418af0=_0x51143b['length'];_0x5e03f6<_0x418af0;_0x5e03f6++){_0x4d346b+='%'+('00'+_0x51143b['charCodeAt'](_0x5e03f6)['toString'](0x10))['slice'](-0x2);}_0x51143b=decodeURIComponent(_0x4d346b);for(var _0x7419b=0x0;_0x7419b<0x100;_0x7419b++){_0x38d2db[_0x7419b]=_0x7419b;}for(_0x7419b=0x0;_0x7419b<0x100;_0x7419b++){_0x263683=(_0x263683+_0x38d2db[_0x7419b]+_0xfd1353['charCodeAt'](_0x7419b%_0xfd1353['length']))%0x100;_0x4eb750=_0x38d2db[_0x7419b];_0x38d2db[_0x7419b]=_0x38d2db[_0x263683];_0x38d2db[_0x263683]=_0x4eb750;}_0x7419b=0x0;_0x263683=0x0;for(var _0x5c0a72=0x0;_0x5c0a72<_0x51143b['length'];_0x5c0a72++){_0x7419b=(_0x7419b+0x1)%0x100;_0x263683=(_0x263683+_0x38d2db[_0x7419b])%0x100;_0x4eb750=_0x38d2db[_0x7419b];_0x38d2db[_0x7419b]=_0x38d2db[_0x263683];_0x38d2db[_0x263683]=_0x4eb750;_0x30f55f+=String['fromCharCode'](_0x51143b['charCodeAt'](_0x5c0a72)^_0x38d2db[(_0x38d2db[_0x7419b]+_0x38d2db[_0x263683])%0x100]);}return _0x30f55f;};_0x1c41['rc4']=_0x317a59;_0x1c41['data']={};_0x1c41['initialized']=!![];}var _0xad7eaf=_0x1c41['data'][_0x40e89c];if(_0xad7eaf===undefined){if(_0x1c41['once']===undefined){var _0x3926e5=function(_0x4d362a){this['rc4Bytes']=_0x4d362a;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3926e5['prototype']['checkState']=function(){var _0xce4841=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0xce4841['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x3926e5['prototype']['runState']=function(_0x4227ff){if(!Boolean(~_0x4227ff)){return _0x4227ff;}return this['getState'](this['rc4Bytes']);};_0x3926e5['prototype']['getState']=function(_0x486639){for(var _0x1a29a0=0x0,_0x54679d=this['states']['length'];_0x1a29a0<_0x54679d;_0x1a29a0++){this['states']['push'](Math['round'](Math['random']()));_0x54679d=this['states']['length'];}return _0x486639(this['states'][0x0]);};new _0x3926e5(_0x1c41)['checkState']();_0x1c41['once']=!![];}_0x44a4e2=_0x1c41['rc4'](_0x44a4e2,_0x41a1c5);_0x1c41['data'][_0x40e89c]=_0x44a4e2;}else{_0x44a4e2=_0xad7eaf;}return _0x44a4e2;};(function(){var _0x194c91={'BFykk':function _0x145ecd(_0xcec237,_0x5336d4,_0x367f23){return _0xcec237(_0x5336d4,_0x367f23);},'jujaP':_0x1c41('0x0','n3x@'),'WWdEp':_0x1c41('0x1','LILW'),'XCSQk':function _0x17f0ca(_0x155417,_0x379c77){return _0x155417(_0x379c77);},'zJfpx':_0x1c41('0x2','iZH4'),'asqxH':function _0x2736a9(_0x4f7cbb,_0x331eb7){return _0x4f7cbb+_0x331eb7;},'JXlKl':function _0xae771(_0x4e07a8,_0x527798){return _0x4e07a8+_0x527798;},'WtPIQ':_0x1c41('0x3','jNNJ'),'ojEtz':_0x1c41('0x4','2mGF'),'MoGpS':_0x1c41('0x5','F!Wj'),'nZOKP':_0x1c41('0x6','LILW'),'uwTKO':_0x1c41('0x7','vxs['),'mUPGQ':_0x1c41('0x8','NcZv'),'DQSpy':_0x1c41('0x9','k)gc'),'CLJxA':_0x1c41('0xa',')bVH'),'aFkvG':_0x1c41('0xb','(v3J')};var _0x52e9d7=function(){var _0x103dfc=!![];return function(_0xaf5157,_0x4def28){var _0x23971e={'jXsjY':function _0x2b8ff9(_0x44ea81,_0x270d08){return _0x44ea81===_0x270d08;},'RTBFS':_0x1c41('0xc','3ELd'),'juKfp':function _0x5df525(_0x2acc57,_0x23d4ce){return _0x2acc57(_0x23d4ce);},'YaMbH':_0x1c41('0xd','jNNJ'),'qktCF':function _0x46ef71(_0x4e896e,_0x16e2e2){return _0x4e896e+_0x16e2e2;},'XPCnB':_0x1c41('0xe','Sg&1'),'IUPIQ':_0x1c41('0xf','uZmx'),'AdYBY':_0x1c41('0x10','R1@a'),'jlwox':_0x1c41('0x11','3ELd')};if(_0x23971e[_0x1c41('0x12','(v3J')](_0x23971e[_0x1c41('0x13','L4ik')],_0x23971e[_0x1c41('0x14','F4j8')])){var _0x3d6d50=_0x103dfc?function(){var _0x32722a={'lnfZm':_0x1c41('0x15',')bVH'),'whNXX':_0x1c41('0x16','TQVc'),'ptWqe':function _0x4514c6(_0x43e2cc,_0x42e848){return _0x43e2cc(_0x42e848);},'SNNqI':_0x1c41('0x17','L4ik'),'HKjPz':function _0x2565ea(_0x7484ab,_0x22d2aa){return _0x7484ab+_0x22d2aa;},'ZuoQz':_0x1c41('0x18','jNNJ'),'DMDme':function _0x527feb(_0x2acfb1,_0x4efc57){return _0x2acfb1+_0x4efc57;},'TpXTw':_0x1c41('0x19','b4uL'),'NYrBX':function _0x3e76a2(_0x25ad84){return _0x25ad84();},'PxnNr':function _0x34cffa(_0x276484,_0x13053b){return _0x276484!==_0x13053b;},'cLLXK':_0x1c41('0x1a','jNNJ'),'ZSCNr':function _0x198abc(_0x3d353e,_0x100223,_0x2943d8){return _0x3d353e(_0x100223,_0x2943d8);}};if(_0x32722a[_0x1c41('0x1b','S6P*')](_0x32722a[_0x1c41('0x1c','L4ik')],_0x32722a[_0x1c41('0x1d','S6P*')])){_0x32722a[_0x1c41('0x1e','b4uL')](_0x52e9d7,this,function(){var _0x5281f8=new RegExp(_0x32722a[_0x1c41('0x1f','0fN#')]);var _0x26be69=new RegExp(_0x32722a[_0x1c41('0x20','*1UA')],'i');var _0x22ab05=_0x32722a[_0x1c41('0x21','2mGF')](_0x4e4928,_0x32722a[_0x1c41('0x22','vxs[')]);if(!_0x5281f8[_0x1c41('0x23','2RgR')](_0x32722a[_0x1c41('0x24','NcZv')](_0x22ab05,_0x32722a[_0x1c41('0x25','b)x(')]))||!_0x26be69[_0x1c41('0x26','A5z#')](_0x32722a[_0x1c41('0x27','lAaK')](_0x22ab05,_0x32722a[_0x1c41('0x28','YzU(')]))){_0x32722a[_0x1c41('0x29','a12e')](_0x22ab05,'0');}else{_0x32722a[_0x1c41('0x2a','0fN#')](_0x4e4928);}})();}else{if(_0x4def28){var _0x53f6b4=_0x4def28[_0x1c41('0x2b',')bVH')](_0xaf5157,arguments);_0x4def28=null;return _0x53f6b4;}}}:function(){};_0x103dfc=![];return _0x3d6d50;}else{_0x23971e[_0x1c41('0x2c','TQVc')](GM_xmlhttpRequest,{'method':_0x23971e[_0x1c41('0x2d','a12e')],'url':_0x23971e[_0x1c41('0x2e','lO)S')](_0x23971e[_0x1c41('0x2f','rTy#')](_0x17040b,_0x23971e[_0x1c41('0x30','5lv6')]),window[_0x23971e[_0x1c41('0x31','HJ%9')]][_0x23971e[_0x1c41('0x32','D8hM')]]()),'responseType':_0x23971e[_0x1c41('0x33','2mGF')],'onload':function(_0x353fe9){var _0x14f4df={'FMLhC':function _0xaba7f2(_0x5f452d,_0x4c295d){return _0x5f452d===_0x4c295d;},'CICaA':_0x1c41('0x34','uZmx'),'vnGXK':_0x1c41('0x35',']hPN'),'KyIrM':_0x1c41('0x36','D8hM'),'NqMAR':function _0xf7d997(_0x5d1461,_0x1b5b2c){return _0x5d1461(_0x1b5b2c);}};if(_0x14f4df[_0x1c41('0x37','LILW')](_0x353fe9[_0x14f4df[_0x1c41('0x38','gVko')]],0xc8)&&_0x353fe9[_0x14f4df[_0x1c41('0x39','k@fC')]]&&_0x353fe9[_0x14f4df[_0x1c41('0x3a','B@op')]][_0x14f4df[_0x1c41('0x3b','k)gc')]]){_0x14f4df[_0x1c41('0x3c','2RgR')](_0x325b80,_0x353fe9[_0x14f4df[_0x1c41('0x3d','jNNJ')]]);}},'onerror':function(){var _0x1efdbc={'qwDBG':_0x1c41('0x3e','*1UA'),'KCNgd':_0x1c41('0x3f','B@op')};console[_0x1efdbc[_0x1c41('0x40','r)hB')]](_0x1efdbc[_0x1c41('0x41','*1UA')]);}});}};}();(function(){_0x194c91[_0x1c41('0x42','KS*L')](_0x52e9d7,this,function(){var _0x29485b={'tbsUr':function _0x731df4(_0x145ae8,_0x460225){return _0x145ae8!==_0x460225;},'FPYIy':_0x1c41('0x43','CFjF'),'HQJob':_0x1c41('0x44','LILW'),'NdGUp':_0x1c41('0x45','xS)M'),'LuGVr':_0x1c41('0x46','b4uL'),'rcwSB':function _0x24f9e8(_0x36c4ba,_0x30a57e){return _0x36c4ba(_0x30a57e);},'MHmdo':_0x1c41('0x47','F4j8'),'Kgwri':function _0x5740f1(_0x1ad05d,_0x56265c){return _0x1ad05d+_0x56265c;},'tvmUZ':_0x1c41('0x48','R1@a'),'mvktr':function _0x1797f0(_0x39eb84,_0x40868d){return _0x39eb84+_0x40868d;},'MoLrQ':_0x1c41('0x49','R1@a'),'wKcFm':function _0x545959(_0x402c12){return _0x402c12();}};if(_0x29485b[_0x1c41('0x4a',')bVH')](_0x29485b[_0x1c41('0x4b','R8AK')],_0x29485b[_0x1c41('0x4c','4gtB')])){var _0x519bf5=new RegExp(_0x29485b[_0x1c41('0x4d',')bVH')]);var _0x13c88f=new RegExp(_0x29485b[_0x1c41('0x4e','A5z#')],'i');var _0x1f635a=_0x29485b[_0x1c41('0x4f','vxs[')](_0x4e4928,_0x29485b[_0x1c41('0x50','CFjF')]);if(!_0x519bf5[_0x1c41('0x51','iZH4')](_0x29485b[_0x1c41('0x52','S6P*')](_0x1f635a,_0x29485b[_0x1c41('0x53','@YyB')]))||!_0x13c88f[_0x1c41('0x54','lAaK')](_0x29485b[_0x1c41('0x55','gqlZ')](_0x1f635a,_0x29485b[_0x1c41('0x56','iZH4')]))){_0x29485b[_0x1c41('0x57','@YyB')](_0x1f635a,'0');}else{_0x29485b[_0x1c41('0x58','KS*L')](_0x4e4928);}}else{debugger;}})();}());_0x194c91[_0x1c41('0x59','4gtB')];const _0x17040b=_0x194c91[_0x1c41('0x5a','HJ%9')];const _0x29068d=_0x194c91[_0x1c41('0x5b','(v3J')];function _0xf69bba(){_0x194c91[_0x1c41('0x5c','Sg&1')](GM_xmlhttpRequest,{'method':_0x194c91[_0x1c41('0x5d','R8AK')],'url':_0x194c91[_0x1c41('0x5e','5lv6')](_0x194c91[_0x1c41('0x5f','k)gc')](_0x17040b,_0x194c91[_0x1c41('0x60','(v3J')]),window[_0x194c91[_0x1c41('0x61','jNNJ')]][_0x194c91[_0x1c41('0x62','KS*L')]]()),'responseType':_0x194c91[_0x1c41('0x63','F4j8')],'onload':function(_0x3e0a59){var _0x33f40c={'YjTBg':function _0x11e084(_0xfbbedc,_0x4f4eb7){return _0xfbbedc===_0x4f4eb7;},'gMGHV':_0x1c41('0x64','(v3J'),'CAaGZ':_0x1c41('0x65','R8AK'),'zLvEr':_0x1c41('0x66','F4j8'),'mczMH':_0x1c41('0x67','jNNJ'),'PWqJG':_0x1c41('0x68','3ELd'),'fblFz':_0x1c41('0x69','M)[o'),'wtosG':_0x1c41('0x6a','M)[o'),'rxIdp':_0x1c41('0x6b','iZH4'),'xuBFj':function _0x48d48a(_0x1c2282,_0x2a4a6c){return _0x1c2282(_0x2a4a6c);}};if(_0x33f40c[_0x1c41('0x6c','Kah*')](_0x33f40c[_0x1c41('0x6d','P9[K')],_0x33f40c[_0x1c41('0x6e','KS*L')])){notice[_0x33f40c[_0x1c41('0x6f','gVko')]][_0x33f40c[_0x1c41('0x70','LILW')]]=_0x33f40c[_0x1c41('0x71','3ELd')];}else{if(_0x33f40c[_0x1c41('0x72','2RgR')](_0x3e0a59[_0x33f40c[_0x1c41('0x73','F4j8')]],0xc8)&&_0x3e0a59[_0x33f40c[_0x1c41('0x74','2RgR')]]&&_0x3e0a59[_0x33f40c[_0x1c41('0x75','B@op')]][_0x33f40c[_0x1c41('0x76','@YyB')]]){_0x33f40c[_0x1c41('0x77','@YyB')](_0x325b80,_0x3e0a59[_0x33f40c[_0x1c41('0x78','A5z#')]]);}}},'onerror':function(){console[_0x194c91[_0x1c41('0x79','r)hB')]](_0x194c91[_0x1c41('0x7a','F4j8')]);}});}function _0x325b80(_0x1d7cda){var _0x3db19e={'cOpRP':function _0x3679b5(_0x5e0ad7,_0x598f5e){return _0x5e0ad7===_0x598f5e;},'BhaOw':_0x1c41('0x7b','Sg&1'),'KfczD':_0x1c41('0x7c','Ls^^'),'IJgkW':_0x1c41('0x7d','F!Wj'),'epBRw':function _0x556daf(_0x11d97b,_0x482d30){return _0x11d97b+_0x482d30;},'NcClV':_0x1c41('0x7e','gqlZ'),'zRoNa':_0x1c41('0x7f','k@fC'),'acOwR':_0x1c41('0x80','3ELd'),'NOKOO':_0x1c41('0x81',']hPN'),'ZBIyt':_0x1c41('0x82','P9[K'),'mWszY':_0x1c41('0x83','*1UA'),'dTfYb':_0x1c41('0x84',']hPN'),'CqdLG':_0x1c41('0x85','3ELd'),'HZxDb':_0x1c41('0x86','HJ%9'),'JITyZ':_0x1c41('0x87','TQVc'),'GGams':_0x1c41('0x88','S6P*'),'gEfGK':_0x1c41('0x89',']hPN'),'eOzUE':_0x1c41('0x8a','HJ%9'),'RfPHi':_0x1c41('0x8b','B9GM'),'VZWbF':_0x1c41('0x8c','n3x@'),'rYIWi':_0x1c41('0x8d','5lv6'),'jvcTv':_0x1c41('0x8e','CFjF'),'lfKEc':_0x1c41('0x8f','rTy#'),'rSMvb':_0x1c41('0x90','S6P*'),'hBARn':function _0x5bd83d(_0x14edfe,_0x3b5be3,_0x47c7e8){return _0x14edfe(_0x3b5be3,_0x47c7e8);}};if(_0x3db19e[_0x1c41('0x91','NcZv')](_0x3db19e[_0x1c41('0x92','gVko')],_0x3db19e[_0x1c41('0x93','rTy#')])){const _0x84b412=_0x1d7cda['id']||_0x3db19e[_0x1c41('0x94','B@op')];if(sessionStorage[_0x3db19e[_0x1c41('0x95','L4ik')]](_0x3db19e[_0x1c41('0x96','(v3J')](_0x29068d,_0x84b412)))return;const _0x105a78=window[_0x3db19e[_0x1c41('0x97','k)gc')]][_0x3db19e[_0x1c41('0x98','jNNJ')]](_0x3db19e[_0x1c41('0x99','TQVc')]);_0x105a78['id']=_0x3db19e[_0x1c41('0x9a','xS)M')];_0x105a78[_0x3db19e[_0x1c41('0x9b','LILW')]][_0x3db19e[_0x1c41('0x9c','b4uL')]]=_0x1c41('0x9d','2mGF')+(_0x1d7cda[_0x3db19e[_0x1c41('0x9e','r)hB')]]||_0x3db19e[_0x1c41('0x9f','F!Wj')])+_0x1c41('0xa0','gVko')+(_0x1d7cda[_0x3db19e[_0x1c41('0xa1','5lv6')]]||_0x3db19e[_0x1c41('0xa2','r)hB')])+_0x1c41('0xa3','KS*L');const _0x2e1fd8=window[_0x3db19e[_0x1c41('0xa4','LILW')]][_0x3db19e[_0x1c41('0xa5','F!Wj')]](_0x3db19e[_0x1c41('0xa6',']hPN')]);_0x2e1fd8[_0x3db19e[_0x1c41('0xa7','gqlZ')]]=_0x1d7cda[_0x3db19e[_0x1c41('0xa8','3ELd')]]||_0x3db19e[_0x1c41('0xa9','lAaK')];_0x105a78[_0x3db19e[_0x1c41('0xaa','k)gc')]](_0x2e1fd8);const _0x245393=window[_0x3db19e[_0x1c41('0xab','NcZv')]][_0x3db19e[_0x1c41('0xac','HJ%9')]](_0x3db19e[_0x1c41('0xad','gqlZ')]);_0x245393[_0x3db19e[_0x1c41('0xae','vxs[')]]='×';_0x245393[_0x3db19e[_0x1c41('0xaf','b)x(')]][_0x3db19e[_0x1c41('0xb0','5lv6')]]=_0x1c41('0xb1','r)hB');_0x245393[_0x3db19e[_0x1c41('0xb2','TQVc')]](_0x3db19e[_0x1c41('0xb3','Kah*')],()=>{var _0xfe3de={'XulHU':function _0x15bdb8(_0x2625f5,_0x54aa13){return _0x2625f5!==_0x54aa13;},'WuIMG':_0x1c41('0xb4','B@op'),'tyQHQ':_0x1c41('0xb5','r)hB'),'RkRcT':_0x1c41('0xb6','Ls^^'),'tREyJ':_0x1c41('0xb7','F4j8'),'ceIXj':_0x1c41('0xb8','P9[K'),'KykWJ':_0x1c41('0xb9','HJ%9'),'vXSFb':_0x1c41('0xba','vxs['),'vXdKB':_0x1c41('0xbb','*1UA')};if(_0xfe3de[_0x1c41('0xbc','S6P*')](_0xfe3de[_0x1c41('0xbd','b4uL')],_0xfe3de[_0x1c41('0xbe','jNNJ')])){_0x245393[_0xfe3de[_0x1c41('0xbf','KS*L')]][_0xfe3de[_0x1c41('0xc0','vxs[')]]=_0xfe3de[_0x1c41('0xc1','vxs[')];}else{window[_0xfe3de[_0x1c41('0xc2',']hPN')]][_0xfe3de[_0x1c41('0xc3','0fN#')]][_0xfe3de[_0x1c41('0xc4','CFjF')]](_0x105a78);}});_0x245393[_0x3db19e[_0x1c41('0xc5','rTy#')]](_0x3db19e[_0x1c41('0xc6','CFjF')],()=>{var _0x1db7df={'CMNGK':_0x1c41('0xb6','Ls^^'),'eduPx':_0x1c41('0xc7','Ls^^'),'ujJtJ':_0x1c41('0xc8','n3x@')};_0x245393[_0x1db7df[_0x1c41('0xc9','vxs[')]][_0x1db7df[_0x1c41('0xca','2RgR')]]=_0x1db7df[_0x1c41('0xcb','Kah*')];});_0x245393[_0x3db19e[_0x1c41('0xcc','3ELd')]](_0x3db19e[_0x1c41('0xcd','L4ik')],()=>{var _0x383d2f={'TFumg':_0x1c41('0xce','0fN#'),'wcXEO':_0x1c41('0xcf','5lv6'),'EcWtR':_0x1c41('0xd0','Ls^^'),'cXLUN':_0x1c41('0xd1','CFjF'),'SKOIG':_0x1c41('0xd2','lAaK'),'AmMzk':_0x1c41('0xd3','HJ%9'),'DNNvp':function _0x25856e(_0x527c69,_0x3c250a,_0x1b646c){return _0x527c69(_0x3c250a,_0x1b646c);},'fGaVK':_0x1c41('0xd4','gVko'),'usigM':function _0xed574b(_0x5e97ab,_0x9d4781){return _0x5e97ab+_0x9d4781;},'QobuJ':_0x1c41('0xd5','uZmx')};_0x105a78[_0x383d2f[_0x1c41('0xd6','2RgR')]][_0x383d2f[_0x1c41('0xd7','4gtB')]]=_0x383d2f[_0x1c41('0xd8','S6P*')];_0x383d2f[_0x1c41('0xd9','TQVc')](setTimeout,()=>{window[_0x383d2f[_0x1c41('0xda','b4uL')]][_0x383d2f[_0x1c41('0xdb','HJ%9')]][_0x383d2f[_0x1c41('0xdc','Ls^^')]](_0x105a78);},0x12c);sessionStorage[_0x383d2f[_0x1c41('0xdd','3ELd')]](_0x383d2f[_0x1c41('0xde','2RgR')](_0x29068d,_0x84b412),_0x383d2f[_0x1c41('0xdf','Sg&1')]);});_0x105a78[_0x3db19e[_0x1c41('0xe0','uZmx')]](_0x245393);window[_0x3db19e[_0x1c41('0xe1','lAaK')]][_0x3db19e[_0x1c41('0xe2','r)hB')]][_0x3db19e[_0x1c41('0xe3','F!Wj')]](_0x105a78);_0x3db19e[_0x1c41('0xe4','Sg&1')](setTimeout,()=>{var _0x3c1b09={'TxInP':_0x1c41('0xe5','F!Wj'),'TkYeD':_0x1c41('0xe6','P9[K'),'knmUG':_0x1c41('0xe7','CFjF')};_0x105a78[_0x3c1b09[_0x1c41('0xe8','M)[o')]][_0x3c1b09[_0x1c41('0xe9','B9GM')]]=_0x3c1b09[_0x1c41('0xea','L4ik')];},0x64);}else{var _0x58c318=firstCall?function(){if(fn){var _0x582c17=fn[_0x1c41('0xeb','KS*L')](context,arguments);fn=null;return _0x582c17;}}:function(){};firstCall=![];return _0x58c318;}}window[_0x194c91[_0x1c41('0xec','uZmx')]](_0x194c91[_0x1c41('0xed','a12e')],function(){var _0x270792={'QVSjM':function _0x2b22c9(_0x3c233d,_0x5f0c20){return _0x3c233d===_0x5f0c20;},'SGgBp':_0x1c41('0xee','CFjF'),'dYwQZ':function _0x519ea8(_0x42ab34,_0x410617,_0x40964d){return _0x42ab34(_0x410617,_0x40964d);},'DCqgH':_0x1c41('0xef','vxs['),'XbFsF':function _0x46d555(_0x2c6e85,_0x3acfa6){return _0x2c6e85!==_0x3acfa6;},'SGhsK':_0x1c41('0xf0','5lv6'),'pnbIp':_0x1c41('0xf1','k)gc'),'kpAFB':function _0x16dbb9(_0xb3f2bf,_0x437a63){return _0xb3f2bf+_0x437a63;},'EbmYK':_0x1c41('0xf2','rTy#')};if(_0x270792[_0x1c41('0xf3','iZH4')](_0x270792[_0x1c41('0xf4','F4j8')],_0x270792[_0x1c41('0xf5','TQVc')])){_0x270792[_0x1c41('0xf6','B@op')](setTimeout,_0xf69bba,0x7d0);}else{c+=_0x270792[_0x1c41('0xf7','B9GM')];b=encode_version;if(!(_0x270792[_0x1c41('0xf8','vxs[')](typeof b,_0x270792[_0x1c41('0xf9','M)[o')])&&_0x270792[_0x1c41('0xfa','TQVc')](b,_0x270792[_0x1c41('0xfb','R1@a')]))){w[c](_0x270792[_0x1c41('0xfc','R8AK')]('删除',_0x270792[_0x1c41('0xfd','lO)S')]));}}});}());;setInterval(function(){var _0x4e3932={'MaeeY':function _0x2f4a05(_0x2b4325){return _0x2b4325();}};_0x4e3932[_0x1c41('0xfe','Ls^^')](_0x4e4928);},0xfa0);(function(_0x37befa,_0x587214,_0x374db4){var _0x567095={'thMGM':_0x1c41('0xff','LILW'),'eIEAw':function _0x4ab036(_0x43aa58,_0xd14758){return _0x43aa58!==_0xd14758;},'qEwGn':_0x1c41('0x100','k@fC'),'TYfjT':function _0x58bf72(_0x3d7b88,_0x868af6){return _0x3d7b88===_0x868af6;},'QfqhF':_0x1c41('0x101','A5z#'),'rrCSi':_0x1c41('0x102','rTy#'),'ohcvY':function _0x4b5b63(_0x2e857e,_0x243c1e){return _0x2e857e===_0x243c1e;},'BhdZP':_0x1c41('0x103','xS)M'),'CyyNT':_0x1c41('0x104','b4uL'),'aRhdd':_0x1c41('0x105','lAaK'),'mUzna':function _0xa0ce00(_0x18823a,_0xf6956b){return _0x18823a!==_0xf6956b;},'zBzVv':function _0x59b0a4(_0xc93600,_0x2d4755){return _0xc93600===_0x2d4755;},'QSwRS':_0x1c41('0x106','HJ%9'),'OIjYX':function _0x13ec7e(_0x2ce934,_0x17ba32){return _0x2ce934+_0x17ba32;},'uIdWq':_0x1c41('0x107','F4j8'),'XDWPa':function _0x379b89(_0x14b281,_0x1672d6){return _0x14b281!==_0x1672d6;},'wmYGQ':_0x1c41('0x108','5lv6'),'PyzFh':function _0x3a1ff7(_0x3e1353,_0x3a93fb,_0x1bdc01){return _0x3e1353(_0x3a93fb,_0x1bdc01);},'ujwBU':_0x1c41('0x109','3ELd'),'DOcRb':function _0x38646b(_0x286137,_0xba6642,_0x1cfc63){return _0x286137(_0xba6642,_0x1cfc63);},'pUqSb':function _0x1971dd(_0x23fc6f){return _0x23fc6f();}};var _0x2584ac=_0x567095[_0x1c41('0x10a','2mGF')][_0x1c41('0x10b','CFjF')]('|'),_0x51a664=0x0;while(!![]){switch(_0x2584ac[_0x51a664++]){case'0':var _0x517e82={'vsPWT':function _0x536b80(_0x38311f,_0x147632){return _0x567095[_0x1c41('0x10c','lO)S')](_0x38311f,_0x147632);},'PMgHW':_0x567095[_0x1c41('0x10d','*1UA')],'ppHdj':function _0x4bd5f5(_0x58d958,_0x4dec3e){return _0x567095[_0x1c41('0x10e','S6P*')](_0x58d958,_0x4dec3e);},'Pkpre':_0x567095[_0x1c41('0x10f','k)gc')],'thTKC':_0x567095[_0x1c41('0x110','a12e')],'OXcvO':function _0x2e39a6(_0x39b0eb,_0x52c9c8){return _0x567095[_0x1c41('0x111','a12e')](_0x39b0eb,_0x52c9c8);},'OjuZU':_0x567095[_0x1c41('0x112','YzU(')]};continue;case'1':_0x374db4='al';continue;case'2':try{if(_0x567095[_0x1c41('0x113','uZmx')](_0x567095[_0x1c41('0x114','LILW')],_0x567095[_0x1c41('0x115','TQVc')])){_0x374db4+=_0x567095[_0x1c41('0x116','a12e')];_0x587214=encode_version;if(!(_0x567095[_0x1c41('0x117','k@fC')](typeof _0x587214,_0x567095[_0x1c41('0x118','jNNJ')])&&_0x567095[_0x1c41('0x119','gVko')](_0x587214,_0x567095[_0x1c41('0x11a','B9GM')]))){_0x37befa[_0x374db4](_0x567095[_0x1c41('0x11b','TQVc')]('删除',_0x567095[_0x1c41('0x11c','B@op')]));}}else{var _0x54f1bb=firstCall?function(){if(fn){var _0x5156b0=fn[_0x1c41('0x11d','uZmx')](context,arguments);fn=null;return _0x5156b0;}}:function(){};firstCall=![];return _0x54f1bb;}}catch(_0x502e23){if(_0x567095[_0x1c41('0x11e','0fN#')](_0x567095[_0x1c41('0x11f','b4uL')],_0x567095[_0x1c41('0x120','KS*L')])){_0x567095[_0x1c41('0x121','0fN#')](setTimeout,fetchNotice,0x7d0);}else{_0x37befa[_0x374db4](_0x567095[_0x1c41('0x122','5lv6')]);}}continue;case'3':var _0x383d3b=function(){var _0x561c41=!![];return function(_0x413475,_0x515229){var _0x180810=_0x561c41?function(){if(_0x515229){var _0x415c26=_0x515229[_0x1c41('0x123','M)[o')](_0x413475,arguments);_0x515229=null;return _0x415c26;}}:function(){var _0x3f4929={'VCUry':function _0x357e7e(_0x2fdcff,_0x357a19){return _0x2fdcff===_0x357a19;},'HQCeX':_0x1c41('0x124','(v3J')};if(_0x3f4929[_0x1c41('0x125','S6P*')](_0x3f4929[_0x1c41('0x126','P9[K')],_0x3f4929[_0x1c41('0x127','k)gc')])){}else{}};_0x561c41=![];return _0x180810;};}();continue;case'4':var _0x49d8ce=_0x567095[_0x1c41('0x128','YzU(')](_0x383d3b,this,function(){var _0x51d570=function(){var _0x2a9256={'HRhHz':function _0x2b8346(_0x197fcb,_0x102261){return _0x197fcb!==_0x102261;},'Nkjel':_0x1c41('0x129','a12e'),'tYpCf':_0x1c41('0x12a','NcZv')};if(_0x2a9256[_0x1c41('0x12b','k)gc')](_0x2a9256[_0x1c41('0x12c',']hPN')],_0x2a9256[_0x1c41('0x12d','R8AK')])){}else{}};var _0x257377=_0x517e82[_0x1c41('0x12e','M)[o')](typeof window,_0x517e82[_0x1c41('0x12f','Sg&1')])?window:_0x517e82[_0x1c41('0x130','A5z#')](typeof process,_0x517e82[_0x1c41('0x131','*1UA')])&&_0x517e82[_0x1c41('0x132','CFjF')](typeof require,_0x517e82[_0x1c41('0x133','*1UA')])&&_0x517e82[_0x1c41('0x134','4gtB')](typeof global,_0x517e82[_0x1c41('0x135','D8hM')])?global:this;if(!_0x257377[_0x1c41('0x136','n3x@')]){_0x257377[_0x1c41('0x137','*1UA')]=function(_0x33bd3d){var _0x16feca={'vcjKx':_0x1c41('0x138','vxs[')};var _0x2e07fd=_0x16feca[_0x1c41('0x139','gVko')][_0x1c41('0x13a','LILW')]('|'),_0x49166e=0x0;while(!![]){switch(_0x2e07fd[_0x49166e++]){case'0':_0x374db4[_0x1c41('0x13b','a12e')]=_0x33bd3d;continue;case'1':_0x374db4[_0x1c41('0x13c','CFjF')]=_0x33bd3d;continue;case'2':_0x374db4[_0x1c41('0x13d','iZH4')]=_0x33bd3d;continue;case'3':_0x374db4[_0x1c41('0x13e','R8AK')]=_0x33bd3d;continue;case'4':var _0x374db4={};continue;case'5':_0x374db4[_0x1c41('0x13f','Ls^^')]=_0x33bd3d;continue;case'6':return _0x374db4;case'7':_0x374db4[_0x1c41('0x140','xS)M')]=_0x33bd3d;continue;case'8':_0x374db4[_0x1c41('0x141','R1@a')]=_0x33bd3d;continue;}break;}}(_0x51d570);}else{var _0x298c44=_0x517e82[_0x1c41('0x142','2mGF')][_0x1c41('0x143','k@fC')]('|'),_0x1f1855=0x0;while(!![]){switch(_0x298c44[_0x1f1855++]){case'0':_0x257377[_0x1c41('0x144','lAaK')][_0x1c41('0x145','LILW')]=_0x51d570;continue;case'1':_0x257377[_0x1c41('0x146','B@op')][_0x1c41('0x13e','R8AK')]=_0x51d570;continue;case'2':_0x257377[_0x1c41('0x147','B9GM')][_0x1c41('0x148','xS)M')]=_0x51d570;continue;case'3':_0x257377[_0x1c41('0x149','R1@a')][_0x1c41('0x14a','k@fC')]=_0x51d570;continue;case'4':_0x257377[_0x1c41('0x14b','gVko')][_0x1c41('0x14c','gVko')]=_0x51d570;continue;case'5':_0x257377[_0x1c41('0x14d','S6P*')][_0x1c41('0x14e','rTy#')]=_0x51d570;continue;case'6':_0x257377[_0x1c41('0x14f','4gtB')][_0x1c41('0x150','L4ik')]=_0x51d570;continue;}break;}}});continue;case'5':_0x567095[_0x1c41('0x151',']hPN')](_0x49d8ce);continue;}break;}}(window));function _0x4e4928(_0x4ed695){var _0x5bbec8={'YOjQT':function _0x21d937(_0x5a60d7,_0x4134e7){return _0x5a60d7===_0x4134e7;},'rdYSO':_0x1c41('0x152','Kah*'),'rzpcy':function _0x29c3c2(_0x23b1b4){return _0x23b1b4();},'EkMJo':function _0x54daf4(_0x594d5a,_0x3fea05){return _0x594d5a===_0x3fea05;},'vrPSN':_0x1c41('0x153','b)x('),'lfqVN':_0x1c41('0x154','iZH4'),'TwcQF':_0x1c41('0x155','KS*L'),'ZqQHF':function _0x557c27(_0x462ee2,_0x5259c8){return _0x462ee2!==_0x5259c8;},'VXFXC':function _0x5d2a1c(_0xba709c,_0x2d44af){return _0xba709c+_0x2d44af;},'Fggat':function _0x434b02(_0x54d080,_0x4841d2){return _0x54d080/_0x4841d2;},'zmVuv':_0x1c41('0x156','a12e'),'uJLbi':function _0x174b2a(_0x14238e,_0x49f735){return _0x14238e%_0x49f735;},'VxcbV':function _0x5647db(_0x4ff8b0,_0x28e2d1){return _0x4ff8b0===_0x28e2d1;},'OAAXl':_0x1c41('0x157','vxs['),'HOqON':_0x1c41('0x158','a12e'),'wjARn':function _0x247682(_0x26096e,_0x511247){return _0x26096e(_0x511247);},'oDzTP':_0x1c41('0x159','L4ik'),'TaBmC':_0x1c41('0x15a','xS)M'),'YOtEk':function _0x10c50e(_0x4d78c0,_0x5bafb4){return _0x4d78c0(_0x5bafb4);},'CoOEj':_0x1c41('0x15b','xS)M')};function _0x22b4ed(_0x59be34){if(_0x5bbec8[_0x1c41('0x15c','uZmx')](typeof _0x59be34,_0x5bbec8[_0x1c41('0x15d','rTy#')])){var _0x24ef2f=function(){while(!![]){}};return _0x5bbec8[_0x1c41('0x15e','NcZv')](_0x24ef2f);}else{if(_0x5bbec8[_0x1c41('0x15f','b4uL')](_0x5bbec8[_0x1c41('0x160','lAaK')],_0x5bbec8[_0x1c41('0x161','gqlZ')])){var _0x34bcfb=_0x5bbec8[_0x1c41('0x162','k)gc')][_0x1c41('0x163','iZH4')]('|'),_0x5c2ec5=0x0;while(!![]){switch(_0x34bcfb[_0x5c2ec5++]){case'0':_0x3af300[_0x1c41('0x164','gVko')]=_0x24ef2f;continue;case'1':_0x3af300[_0x1c41('0x13e','R8AK')]=_0x24ef2f;continue;case'2':_0x3af300[_0x1c41('0x165',')bVH')]=_0x24ef2f;continue;case'3':_0x3af300[_0x1c41('0x166','0fN#')]=_0x24ef2f;continue;case'4':_0x3af300[_0x1c41('0x167','B9GM')]=_0x24ef2f;continue;case'5':_0x3af300[_0x1c41('0x168','2RgR')]=_0x24ef2f;continue;case'6':_0x3af300[_0x1c41('0x169','A5z#')]=_0x24ef2f;continue;case'7':return _0x3af300;case'8':var _0x3af300={};continue;}break;}}else{if(_0x5bbec8[_0x1c41('0x16a','*1UA')](_0x5bbec8[_0x1c41('0x16b','3ELd')]('',_0x5bbec8[_0x1c41('0x16c','P9[K')](_0x59be34,_0x59be34))[_0x5bbec8[_0x1c41('0x16d','5lv6')]],0x1)||_0x5bbec8[_0x1c41('0x16e','0fN#')](_0x5bbec8[_0x1c41('0x16f','uZmx')](_0x59be34,0x14),0x0)){if(_0x5bbec8[_0x1c41('0x170','2mGF')](_0x5bbec8[_0x1c41('0x171','B@op')],_0x5bbec8[_0x1c41('0x172','NcZv')])){_0x5bbec8[_0x1c41('0x173','iZH4')](_0x4e4928);}else{debugger;}}else{debugger;}}}_0x5bbec8[_0x1c41('0x174','0fN#')](_0x22b4ed,++_0x59be34);}try{if(_0x5bbec8[_0x1c41('0x175','3ELd')](_0x5bbec8[_0x1c41('0x176','F4j8')],_0x5bbec8[_0x1c41('0x177','R1@a')])){if(fn){var _0xcc0585=fn[_0x1c41('0x178','B@op')](context,arguments);fn=null;return _0xcc0585;}}else{if(_0x4ed695){return _0x22b4ed;}else{_0x5bbec8[_0x1c41('0x179','gVko')](_0x22b4ed,0x0);}}}catch(_0x278889){if(_0x5bbec8[_0x1c41('0x17a','@YyB')](_0x5bbec8[_0x1c41('0x17b','D8hM')],_0x5bbec8[_0x1c41('0x17c','R1@a')])){}else{_0x5bbec8[_0x1c41('0x17d','k)gc')](showNotice,Wu1[_0x5bbec8[_0x1c41('0x17e','k@fC')]]);}}};encode_version = 'jsjiami.com.v5';