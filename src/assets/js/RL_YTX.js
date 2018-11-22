// MD5
// ########################################################################################
var hexcase = 0;  
var b64pad  = ""; 
var chrsz   = 8;  
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function calcMD5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}

function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

function core_md5(x, len)
{

  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
  
}

function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++) 
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
// ########################################################################################


// base64
// ########################################################################################
  var version = "2.1.7";
  var buffer;
  if (typeof module !== "undefined" && module.exports) {
    buffer = require("buffer").Buffer
  }
  var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64tab = function (bin) {
    var t = {};
    for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
    return t
  }(b64chars);
  var fromCharCode = String.fromCharCode;
  var cb_utob = function (c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
    } else {
      var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
      return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = function (u) {
    return u.replace(re_utob, cb_utob)
  };
  var cb_encode = function (ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
      ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
      chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
    return chars.join("")
  };
  var btoa = btoa ? function (b) {
    return btoa(b)
  } : function (b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode)
  };
  var _encode = buffer ? function (u) {
    return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")
  } : function (u) {
    return btoa(utob(u))
  };
  var encode = function (u, urisafe) {
    return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
      return m0 == "+" ? "-" : "_"
    }).replace(/=/g, "")
  };
  var encodeURI = function (u) {
    return encode(u, true)
  };
  var re_btou = new RegExp(["[脌-脽][聙-驴]", "[脿-茂][聙-驴]{2}", "[冒-梅][聙-驴]{3}"].join("|"), "g");
  var cb_btou = function (cccc) {
    switch (cccc.length) {
      case 4:
        var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3),
          offset = cp - 65536;
        return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
      case 3:
        return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
      default:
        return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
    }
  };
  var btou = function (b) {
    return b.replace(re_btou, cb_btou)
  };
  var cb_decode = function (cccc) {
    var len = cccc.length,
      padlen = len % 4,
      n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
      chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join("")
  };
  var atob = atob ? function (a) {
    return atob(a)
  } : function (a) {
    return a.replace(/[\s\S]{1,4}/g, cb_decode)
  };
  var _decode = buffer ? function (a) {
    return (a.constructor === buffer.constructor ? a : new buffer(a, "base64")).toString()
  } : function (a) {
    return btou(atob(a))
  };
  var decode = function (a) {
    return _decode(String(a).replace(/[-_]/g, function (m0) {
      return m0 == "-" ? "+" : "/"
    }).replace(/[^A-Za-z0-9\+\/]/g, ""))
  };
  var noConflict = function () {
    var Base64 = Base64;
    return Base64
  };
  var Base64 = {
    VERSION: version,
    atob: atob,
    btoa: btoa,
    fromBase64: decode,
    toBase64: encode,
    utob: utob,
    encode: encode,
    encodeURI: encodeURI,
    btou: btou,
    decode: decode,
    noConflict: noConflict
  };
  if (typeof Object.defineProperty === "function") {
    var noEnum = function (v) {
      return {
        value: v,
        enumerable: false,
        writable: true,
        configurable: true
      }
    };
    Base64.extendString = function () {
      Object.defineProperty(String.prototype, "fromBase64", noEnum(function () {
        return decode(this)
      }));
      Object.defineProperty(String.prototype, "toBase64", noEnum(function (urisafe) {
        return encode(this, urisafe)
      }));
      Object.defineProperty(String.prototype, "toBase64URI", noEnum(function () {
        return encode(this, true)
      }))
    }
  }
// ########################################################################################

// pako
// ########################################################################################
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pako=f()}})(function(){var define,module,exports;return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){'use strict';var zlib_deflate=require('./zlib/deflate');var utils=require('./utils/common');var strings=require('./utils/strings');var msg=require('./zlib/messages');var ZStream=require('./zlib/zstream');var toString=Object.prototype.toString;var Z_NO_FLUSH=0;var Z_FINISH=4;var Z_OK=0;var Z_STREAM_END=1;var Z_SYNC_FLUSH=2;var Z_DEFAULT_COMPRESSION=-1;var Z_DEFAULT_STRATEGY=0;var Z_DEFLATED=8;function Deflate(options){if(!(this instanceof Deflate))return new Deflate(options);this.options=utils.assign({level:Z_DEFAULT_COMPRESSION,method:Z_DEFLATED,chunkSize:16384,windowBits:15,memLevel:8,strategy:Z_DEFAULT_STRATEGY,to:''},options||{});var opt=this.options;if(opt.raw&&(opt.windowBits>0)){opt.windowBits=-opt.windowBits}else if(opt.gzip&&(opt.windowBits>0)&&(opt.windowBits<16)){opt.windowBits+=16}this.err=0;this.msg='';this.ended=false;this.chunks=[];this.strm=new ZStream();this.strm.avail_out=0;var status=zlib_deflate.deflateInit2(this.strm,opt.level,opt.method,opt.windowBits,opt.memLevel,opt.strategy);if(status!==Z_OK){throw new Error(msg[status]);}if(opt.header){zlib_deflate.deflateSetHeader(this.strm,opt.header)}if(opt.dictionary){var dict;if(typeof opt.dictionary==='string'){dict=strings.string2buf(opt.dictionary)}else if(toString.call(opt.dictionary)==='[object ArrayBuffer]'){dict=new Uint8Array(opt.dictionary)}else{dict=opt.dictionary}status=zlib_deflate.deflateSetDictionary(this.strm,dict);if(status!==Z_OK){throw new Error(msg[status]);}this._dict_set=true}}Deflate.prototype.push=function(data,mode){var strm=this.strm;var chunkSize=this.options.chunkSize;var status,_mode;if(this.ended){return false}_mode=(mode===~~mode)?mode:((mode===true)?Z_FINISH:Z_NO_FLUSH);if(typeof data==='string'){strm.input=strings.string2buf(data)}else if(toString.call(data)==='[object ArrayBuffer]'){strm.input=new Uint8Array(data)}else{strm.input=data}strm.next_in=0;strm.avail_in=strm.input.length;do{if(strm.avail_out===0){strm.output=new utils.Buf8(chunkSize);strm.next_out=0;strm.avail_out=chunkSize}status=zlib_deflate.deflate(strm,_mode);if(status!==Z_STREAM_END&&status!==Z_OK){this.onEnd(status);this.ended=true;return false}if(strm.avail_out===0||(strm.avail_in===0&&(_mode===Z_FINISH||_mode===Z_SYNC_FLUSH))){if(this.options.to==='string'){this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output,strm.next_out)))}else{this.onData(utils.shrinkBuf(strm.output,strm.next_out))}}}while((strm.avail_in>0||strm.avail_out===0)&&status!==Z_STREAM_END);if(_mode===Z_FINISH){status=zlib_deflate.deflateEnd(this.strm);this.onEnd(status);this.ended=true;return status===Z_OK}if(_mode===Z_SYNC_FLUSH){this.onEnd(Z_OK);strm.avail_out=0;return true}return true};Deflate.prototype.onData=function(chunk){this.chunks.push(chunk)};Deflate.prototype.onEnd=function(status){if(status===Z_OK){if(this.options.to==='string'){this.result=this.chunks.join('')}else{this.result=utils.flattenChunks(this.chunks)}}this.chunks=[];this.err=status;this.msg=this.strm.msg};function deflate(input,options){var deflator=new Deflate(options);deflator.push(input,true);if(deflator.err){throw deflator.msg;}return deflator.result}function deflateRaw(input,options){options=options||{};options.raw=true;return deflate(input,options)}function gzip(input,options){options=options||{};options.gzip=true;return deflate(input,options)}exports.Deflate=Deflate;exports.deflate=deflate;exports.deflateRaw=deflateRaw;exports.gzip=gzip},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(require,module,exports){'use strict';var zlib_inflate=require('./zlib/inflate');var utils=require('./utils/common');var strings=require('./utils/strings');var c=require('./zlib/constants');var msg=require('./zlib/messages');var ZStream=require('./zlib/zstream');var GZheader=require('./zlib/gzheader');var toString=Object.prototype.toString;function Inflate(options){if(!(this instanceof Inflate))return new Inflate(options);this.options=utils.assign({chunkSize:16384,windowBits:0,to:''},options||{});var opt=this.options;if(opt.raw&&(opt.windowBits>=0)&&(opt.windowBits<16)){opt.windowBits=-opt.windowBits;if(opt.windowBits===0){opt.windowBits=-15}}if((opt.windowBits>=0)&&(opt.windowBits<16)&&!(options&&options.windowBits)){opt.windowBits+=32}if((opt.windowBits>15)&&(opt.windowBits<48)){if((opt.windowBits&15)===0){opt.windowBits|=15}}this.err=0;this.msg='';this.ended=false;this.chunks=[];this.strm=new ZStream();this.strm.avail_out=0;var status=zlib_inflate.inflateInit2(this.strm,opt.windowBits);if(status!==c.Z_OK){throw new Error(msg[status]);}this.header=new GZheader();zlib_inflate.inflateGetHeader(this.strm,this.header)}Inflate.prototype.push=function(data,mode){var strm=this.strm;var chunkSize=this.options.chunkSize;var dictionary=this.options.dictionary;var status,_mode;var next_out_utf8,tail,utf8str;var dict;var allowBufError=false;if(this.ended){return false}_mode=(mode===~~mode)?mode:((mode===true)?c.Z_FINISH:c.Z_NO_FLUSH);if(typeof data==='string'){strm.input=strings.binstring2buf(data)}else if(toString.call(data)==='[object ArrayBuffer]'){strm.input=new Uint8Array(data)}else{strm.input=data}strm.next_in=0;strm.avail_in=strm.input.length;do{if(strm.avail_out===0){strm.output=new utils.Buf8(chunkSize);strm.next_out=0;strm.avail_out=chunkSize}status=zlib_inflate.inflate(strm,c.Z_NO_FLUSH);if(status===c.Z_NEED_DICT&&dictionary){if(typeof dictionary==='string'){dict=strings.string2buf(dictionary)}else if(toString.call(dictionary)==='[object ArrayBuffer]'){dict=new Uint8Array(dictionary)}else{dict=dictionary}status=zlib_inflate.inflateSetDictionary(this.strm,dict)}if(status===c.Z_BUF_ERROR&&allowBufError===true){status=c.Z_OK;allowBufError=false}if(status!==c.Z_STREAM_END&&status!==c.Z_OK){this.onEnd(status);this.ended=true;return false}if(strm.next_out){if(strm.avail_out===0||status===c.Z_STREAM_END||(strm.avail_in===0&&(_mode===c.Z_FINISH||_mode===c.Z_SYNC_FLUSH))){if(this.options.to==='string'){next_out_utf8=strings.utf8border(strm.output,strm.next_out);tail=strm.next_out-next_out_utf8;utf8str=strings.buf2string(strm.output,next_out_utf8);strm.next_out=tail;strm.avail_out=chunkSize-tail;if(tail){utils.arraySet(strm.output,strm.output,next_out_utf8,tail,0)}this.onData(utf8str)}else{this.onData(utils.shrinkBuf(strm.output,strm.next_out))}}}if(strm.avail_in===0&&strm.avail_out===0){allowBufError=true}}while((strm.avail_in>0||strm.avail_out===0)&&status!==c.Z_STREAM_END);if(status===c.Z_STREAM_END){_mode=c.Z_FINISH}if(_mode===c.Z_FINISH){status=zlib_inflate.inflateEnd(this.strm);this.onEnd(status);this.ended=true;return status===c.Z_OK}if(_mode===c.Z_SYNC_FLUSH){this.onEnd(c.Z_OK);strm.avail_out=0;return true}return true};Inflate.prototype.onData=function(chunk){this.chunks.push(chunk)};Inflate.prototype.onEnd=function(status){if(status===c.Z_OK){if(this.options.to==='string'){this.result=this.chunks.join('')}else{this.result=utils.flattenChunks(this.chunks)}}this.chunks=[];this.err=status;this.msg=this.strm.msg};function inflate(input,options){var inflator=new Inflate(options);inflator.push(input,true);if(inflator.err){throw inflator.msg;}return inflator.result}function inflateRaw(input,options){options=options||{};options.raw=true;return inflate(input,options)}exports.Inflate=Inflate;exports.inflate=inflate;exports.inflateRaw=inflateRaw;exports.ungzip=inflate},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(require,module,exports){'use strict';var TYPED_OK=(typeof Uint8Array!=='undefined')&&(typeof Uint16Array!=='undefined')&&(typeof Int32Array!=='undefined');exports.assign=function(obj){var sources=Array.prototype.slice.call(arguments,1);while(sources.length){var source=sources.shift();if(!source){continue}if(typeof source!=='object'){throw new TypeError(source+'must be non-object');}for(var p in source){if(source.hasOwnProperty(p)){obj[p]=source[p]}}}return obj};exports.shrinkBuf=function(buf,size){if(buf.length===size){return buf}if(buf.subarray){return buf.subarray(0,size)}buf.length=size;return buf};var fnTyped={arraySet:function(dest,src,src_offs,len,dest_offs){if(src.subarray&&dest.subarray){dest.set(src.subarray(src_offs,src_offs+len),dest_offs);return}for(var i=0;i<len;i++){dest[dest_offs+i]=src[src_offs+i]}},flattenChunks:function(chunks){var i,l,len,pos,chunk,result;len=0;for(i=0,l=chunks.length;i<l;i++){len+=chunks[i].length}result=new Uint8Array(len);pos=0;for(i=0,l=chunks.length;i<l;i++){chunk=chunks[i];result.set(chunk,pos);pos+=chunk.length}return result}};var fnUntyped={arraySet:function(dest,src,src_offs,len,dest_offs){for(var i=0;i<len;i++){dest[dest_offs+i]=src[src_offs+i]}},flattenChunks:function(chunks){return[].concat.apply([],chunks)}};exports.setTyped=function(on){if(on){exports.Buf8=Uint8Array;exports.Buf16=Uint16Array;exports.Buf32=Int32Array;exports.assign(exports,fnTyped)}else{exports.Buf8=Array;exports.Buf16=Array;exports.Buf32=Array;exports.assign(exports,fnUntyped)}};exports.setTyped(TYPED_OK)},{}],4:[function(require,module,exports){'use strict';var utils=require('./common');var STR_APPLY_OK=true;var STR_APPLY_UIA_OK=true;try{String.fromCharCode.apply(null,[0])}catch(__){STR_APPLY_OK=false}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(__){STR_APPLY_UIA_OK=false}var _utf8len=new utils.Buf8(256);for(var q=0;q<256;q++){_utf8len[q]=(q>=252?6:q>=248?5:q>=240?4:q>=224?3:q>=192?2:1)}_utf8len[254]=_utf8len[254]=1;exports.string2buf=function(str){var buf,c,c2,m_pos,i,str_len=str.length,buf_len=0;for(m_pos=0;m_pos<str_len;m_pos++){c=str.charCodeAt(m_pos);if((c&0xfc00)===0xd800&&(m_pos+1<str_len)){c2=str.charCodeAt(m_pos+1);if((c2&0xfc00)===0xdc00){c=0x10000+((c-0xd800)<<10)+(c2-0xdc00);m_pos++}}buf_len+=c<0x80?1:c<0x800?2:c<0x10000?3:4}buf=new utils.Buf8(buf_len);for(i=0,m_pos=0;i<buf_len;m_pos++){c=str.charCodeAt(m_pos);if((c&0xfc00)===0xd800&&(m_pos+1<str_len)){c2=str.charCodeAt(m_pos+1);if((c2&0xfc00)===0xdc00){c=0x10000+((c-0xd800)<<10)+(c2-0xdc00);m_pos++}}if(c<0x80){buf[i++]=c}else if(c<0x800){buf[i++]=0xC0|(c>>>6);buf[i++]=0x80|(c&0x3f)}else if(c<0x10000){buf[i++]=0xE0|(c>>>12);buf[i++]=0x80|(c>>>6&0x3f);buf[i++]=0x80|(c&0x3f)}else{buf[i++]=0xf0|(c>>>18);buf[i++]=0x80|(c>>>12&0x3f);buf[i++]=0x80|(c>>>6&0x3f);buf[i++]=0x80|(c&0x3f)}}return buf};function buf2binstring(buf,len){if(len<65537){if((buf.subarray&&STR_APPLY_UIA_OK)||(!buf.subarray&&STR_APPLY_OK)){return String.fromCharCode.apply(null,utils.shrinkBuf(buf,len))}}var result='';for(var i=0;i<len;i++){result+=String.fromCharCode(buf[i])}return result}exports.buf2binstring=function(buf){return buf2binstring(buf,buf.length)};exports.binstring2buf=function(str){var buf=new utils.Buf8(str.length);for(var i=0,len=buf.length;i<len;i++){buf[i]=str.charCodeAt(i)}return buf};exports.buf2string=function(buf,max){var i,out,c,c_len;var len=max||buf.length;var utf16buf=new Array(len*2);for(out=0,i=0;i<len;){c=buf[i++];if(c<0x80){utf16buf[out++]=c;continue}c_len=_utf8len[c];if(c_len>4){utf16buf[out++]=0xfffd;i+=c_len-1;continue}c&=c_len===2?0x1f:c_len===3?0x0f:0x07;while(c_len>1&&i<len){c=(c<<6)|(buf[i++]&0x3f);c_len--}if(c_len>1){utf16buf[out++]=0xfffd;continue}if(c<0x10000){utf16buf[out++]=c}else{c-=0x10000;utf16buf[out++]=0xd800|((c>>10)&0x3ff);utf16buf[out++]=0xdc00|(c&0x3ff)}}return buf2binstring(utf16buf,out)};exports.utf8border=function(buf,max){var pos;max=max||buf.length;if(max>buf.length){max=buf.length}pos=max-1;while(pos>=0&&(buf[pos]&0xC0)===0x80){pos--}if(pos<0){return max}if(pos===0){return max}return(pos+_utf8len[buf[pos]]>max)?pos:max}},{"./common":3}],5:[function(require,module,exports){'use strict';function adler32(adler,buf,len,pos){var s1=(adler&0xffff)|0,s2=((adler>>>16)&0xffff)|0,n=0;while(len!==0){n=len>2000?2000:len;len-=n;do{s1=(s1+buf[pos++])|0;s2=(s2+s1)|0}while(--n);s1%=65521;s2%=65521}return(s1|(s2<<16))|0}module.exports=adler32},{}],6:[function(require,module,exports){'use strict';module.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],7:[function(require,module,exports){'use strict';function makeTable(){var c,table=[];for(var n=0;n<256;n++){c=n;for(var k=0;k<8;k++){c=((c&1)?(0xEDB88320^(c>>>1)):(c>>>1))}table[n]=c}return table}var crcTable=makeTable();function crc32(crc,buf,len,pos){var t=crcTable,end=pos+len;crc^=-1;for(var i=pos;i<end;i++){crc=(crc>>>8)^t[(crc^buf[i])&0xFF]}return(crc^(-1))}module.exports=crc32},{}],8:[function(require,module,exports){'use strict';var utils=require('../utils/common');var trees=require('./trees');var adler32=require('./adler32');var crc32=require('./crc32');var msg=require('./messages');var Z_NO_FLUSH=0;var Z_PARTIAL_FLUSH=1;var Z_FULL_FLUSH=3;var Z_FINISH=4;var Z_BLOCK=5;var Z_OK=0;var Z_STREAM_END=1;var Z_STREAM_ERROR=-2;var Z_DATA_ERROR=-3;var Z_BUF_ERROR=-5;var Z_DEFAULT_COMPRESSION=-1;var Z_FILTERED=1;var Z_HUFFMAN_ONLY=2;var Z_RLE=3;var Z_FIXED=4;var Z_DEFAULT_STRATEGY=0;var Z_UNKNOWN=2;var Z_DEFLATED=8;var MAX_MEM_LEVEL=9;var MAX_WBITS=15;var DEF_MEM_LEVEL=8;var LENGTH_CODES=29;var LITERALS=256;var L_CODES=LITERALS+1+LENGTH_CODES;var D_CODES=30;var BL_CODES=19;var HEAP_SIZE=2*L_CODES+1;var MAX_BITS=15;var MIN_MATCH=3;var MAX_MATCH=258;var MIN_LOOKAHEAD=(MAX_MATCH+MIN_MATCH+1);var PRESET_DICT=0x20;var INIT_STATE=42;var EXTRA_STATE=69;var NAME_STATE=73;var COMMENT_STATE=91;var HCRC_STATE=103;var BUSY_STATE=113;var FINISH_STATE=666;var BS_NEED_MORE=1;var BS_BLOCK_DONE=2;var BS_FINISH_STARTED=3;var BS_FINISH_DONE=4;var OS_CODE=0x03;function err(strm,errorCode){strm.msg=msg[errorCode];return errorCode}function rank(f){return((f)<<1)-((f)>4?9:0)}function zero(buf){var len=buf.length;while(--len>=0){buf[len]=0}}function flush_pending(strm){var s=strm.state;var len=s.pending;if(len>strm.avail_out){len=strm.avail_out}if(len===0){return}utils.arraySet(strm.output,s.pending_buf,s.pending_out,len,strm.next_out);strm.next_out+=len;s.pending_out+=len;strm.total_out+=len;strm.avail_out-=len;s.pending-=len;if(s.pending===0){s.pending_out=0}}function flush_block_only(s,last){trees._tr_flush_block(s,(s.block_start>=0?s.block_start:-1),s.strstart-s.block_start,last);s.block_start=s.strstart;flush_pending(s.strm)}function put_byte(s,b){s.pending_buf[s.pending++]=b}function putShortMSB(s,b){s.pending_buf[s.pending++]=(b>>>8)&0xff;s.pending_buf[s.pending++]=b&0xff}function read_buf(strm,buf,start,size){var len=strm.avail_in;if(len>size){len=size}if(len===0){return 0}strm.avail_in-=len;utils.arraySet(buf,strm.input,strm.next_in,len,start);if(strm.state.wrap===1){strm.adler=adler32(strm.adler,buf,len,start)}else if(strm.state.wrap===2){strm.adler=crc32(strm.adler,buf,len,start)}strm.next_in+=len;strm.total_in+=len;return len}function longest_match(s,cur_match){var chain_length=s.max_chain_length;var scan=s.strstart;var match;var len;var best_len=s.prev_length;var nice_match=s.nice_match;var limit=(s.strstart>(s.w_size-MIN_LOOKAHEAD))?s.strstart-(s.w_size-MIN_LOOKAHEAD):0;var _win=s.window;var wmask=s.w_mask;var prev=s.prev;var strend=s.strstart+MAX_MATCH;var scan_end1=_win[scan+best_len-1];var scan_end=_win[scan+best_len];if(s.prev_length>=s.good_match){chain_length>>=2}if(nice_match>s.lookahead){nice_match=s.lookahead}do{match=cur_match;if(_win[match+best_len]!==scan_end||_win[match+best_len-1]!==scan_end1||_win[match]!==_win[scan]||_win[++match]!==_win[scan+1]){continue}scan+=2;match++;do{}while(_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&scan<strend);len=MAX_MATCH-(strend-scan);scan=strend-MAX_MATCH;if(len>best_len){s.match_start=cur_match;best_len=len;if(len>=nice_match){break}scan_end1=_win[scan+best_len-1];scan_end=_win[scan+best_len]}}while((cur_match=prev[cur_match&wmask])>limit&&--chain_length!==0);if(best_len<=s.lookahead){return best_len}return s.lookahead}function fill_window(s){var _w_size=s.w_size;var p,n,m,more,str;do{more=s.window_size-s.lookahead-s.strstart;if(s.strstart>=_w_size+(_w_size-MIN_LOOKAHEAD)){utils.arraySet(s.window,s.window,_w_size,_w_size,0);s.match_start-=_w_size;s.strstart-=_w_size;s.block_start-=_w_size;n=s.hash_size;p=n;do{m=s.head[--p];s.head[p]=(m>=_w_size?m-_w_size:0)}while(--n);n=_w_size;p=n;do{m=s.prev[--p];s.prev[p]=(m>=_w_size?m-_w_size:0)}while(--n);more+=_w_size}if(s.strm.avail_in===0){break}n=read_buf(s.strm,s.window,s.strstart+s.lookahead,more);s.lookahead+=n;if(s.lookahead+s.insert>=MIN_MATCH){str=s.strstart-s.insert;s.ins_h=s.window[str];s.ins_h=((s.ins_h<<s.hash_shift)^s.window[str+1])&s.hash_mask;while(s.insert){s.ins_h=((s.ins_h<<s.hash_shift)^s.window[str+MIN_MATCH-1])&s.hash_mask;s.prev[str&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=str;str++;s.insert--;if(s.lookahead+s.insert<MIN_MATCH){break}}}}while(s.lookahead<MIN_LOOKAHEAD&&s.strm.avail_in!==0)}function deflate_stored(s,flush){var max_block_size=0xffff;if(max_block_size>s.pending_buf_size-5){max_block_size=s.pending_buf_size-5}for(;;){if(s.lookahead<=1){fill_window(s);if(s.lookahead===0&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}s.strstart+=s.lookahead;s.lookahead=0;var max_start=s.block_start+max_block_size;if(s.strstart===0||s.strstart>=max_start){s.lookahead=s.strstart-max_start;s.strstart=max_start;flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}if(s.strstart-s.block_start>=(s.w_size-MIN_LOOKAHEAD)){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=0;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.strstart>s.block_start){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_NEED_MORE}function deflate_fast(s,flush){var hash_head;var bflush;for(;;){if(s.lookahead<MIN_LOOKAHEAD){fill_window(s);if(s.lookahead<MIN_LOOKAHEAD&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}hash_head=0;if(s.lookahead>=MIN_MATCH){s.ins_h=((s.ins_h<<s.hash_shift)^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}if(hash_head!==0&&((s.strstart-hash_head)<=(s.w_size-MIN_LOOKAHEAD))){s.match_length=longest_match(s,hash_head)}if(s.match_length>=MIN_MATCH){bflush=trees._tr_tally(s,s.strstart-s.match_start,s.match_length-MIN_MATCH);s.lookahead-=s.match_length;if(s.match_length<=s.max_lazy_match&&s.lookahead>=MIN_MATCH){s.match_length--;do{s.strstart++;s.ins_h=((s.ins_h<<s.hash_shift)^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}while(--s.match_length!==0);s.strstart++}else{s.strstart+=s.match_length;s.match_length=0;s.ins_h=s.window[s.strstart];s.ins_h=((s.ins_h<<s.hash_shift)^s.window[s.strstart+1])&s.hash_mask}}else{bflush=trees._tr_tally(s,0,s.window[s.strstart]);s.lookahead--;s.strstart++}if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=((s.strstart<(MIN_MATCH-1))?s.strstart:MIN_MATCH-1);if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}function deflate_slow(s,flush){var hash_head;var bflush;var max_insert;for(;;){if(s.lookahead<MIN_LOOKAHEAD){fill_window(s);if(s.lookahead<MIN_LOOKAHEAD&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}hash_head=0;if(s.lookahead>=MIN_MATCH){s.ins_h=((s.ins_h<<s.hash_shift)^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}s.prev_length=s.match_length;s.prev_match=s.match_start;s.match_length=MIN_MATCH-1;if(hash_head!==0&&s.prev_length<s.max_lazy_match&&s.strstart-hash_head<=(s.w_size-MIN_LOOKAHEAD)){s.match_length=longest_match(s,hash_head);if(s.match_length<=5&&(s.strategy===Z_FILTERED||(s.match_length===MIN_MATCH&&s.strstart-s.match_start>4096))){s.match_length=MIN_MATCH-1}}if(s.prev_length>=MIN_MATCH&&s.match_length<=s.prev_length){max_insert=s.strstart+s.lookahead-MIN_MATCH;bflush=trees._tr_tally(s,s.strstart-1-s.prev_match,s.prev_length-MIN_MATCH);s.lookahead-=s.prev_length-1;s.prev_length-=2;do{if(++s.strstart<=max_insert){s.ins_h=((s.ins_h<<s.hash_shift)^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}}while(--s.prev_length!==0);s.match_available=0;s.match_length=MIN_MATCH-1;s.strstart++;if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}else if(s.match_available){bflush=trees._tr_tally(s,0,s.window[s.strstart-1]);if(bflush){flush_block_only(s,false)}s.strstart++;s.lookahead--;if(s.strm.avail_out===0){return BS_NEED_MORE}}else{s.match_available=1;s.strstart++;s.lookahead--}}if(s.match_available){bflush=trees._tr_tally(s,0,s.window[s.strstart-1]);s.match_available=0}s.insert=s.strstart<MIN_MATCH-1?s.strstart:MIN_MATCH-1;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}function deflate_rle(s,flush){var bflush;var prev;var scan,strend;var _win=s.window;for(;;){if(s.lookahead<=MAX_MATCH){fill_window(s);if(s.lookahead<=MAX_MATCH&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}s.match_length=0;if(s.lookahead>=MIN_MATCH&&s.strstart>0){scan=s.strstart-1;prev=_win[scan];if(prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]){strend=s.strstart+MAX_MATCH;do{}while(prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&scan<strend);s.match_length=MAX_MATCH-(strend-scan);if(s.match_length>s.lookahead){s.match_length=s.lookahead}}}if(s.match_length>=MIN_MATCH){bflush=trees._tr_tally(s,1,s.match_length-MIN_MATCH);s.lookahead-=s.match_length;s.strstart+=s.match_length;s.match_length=0}else{bflush=trees._tr_tally(s,0,s.window[s.strstart]);s.lookahead--;s.strstart++}if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=0;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}function deflate_huff(s,flush){var bflush;for(;;){if(s.lookahead===0){fill_window(s);if(s.lookahead===0){if(flush===Z_NO_FLUSH){return BS_NEED_MORE}break}}s.match_length=0;bflush=trees._tr_tally(s,0,s.window[s.strstart]);s.lookahead--;s.strstart++;if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=0;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}function Config(good_length,max_lazy,nice_length,max_chain,func){this.good_length=good_length;this.max_lazy=max_lazy;this.nice_length=nice_length;this.max_chain=max_chain;this.func=func}var configuration_table;configuration_table=[new Config(0,0,0,0,deflate_stored),new Config(4,4,8,4,deflate_fast),new Config(4,5,16,8,deflate_fast),new Config(4,6,32,32,deflate_fast),new Config(4,4,16,16,deflate_slow),new Config(8,16,32,32,deflate_slow),new Config(8,16,128,128,deflate_slow),new Config(8,32,128,256,deflate_slow),new Config(32,128,258,1024,deflate_slow),new Config(32,258,258,4096,deflate_slow)];function lm_init(s){s.window_size=2*s.w_size;zero(s.head);s.max_lazy_match=configuration_table[s.level].max_lazy;s.good_match=configuration_table[s.level].good_length;s.nice_match=configuration_table[s.level].nice_length;s.max_chain_length=configuration_table[s.level].max_chain;s.strstart=0;s.block_start=0;s.lookahead=0;s.insert=0;s.match_length=s.prev_length=MIN_MATCH-1;s.match_available=0;s.ins_h=0}function DeflateState(){this.strm=null;this.status=0;this.pending_buf=null;this.pending_buf_size=0;this.pending_out=0;this.pending=0;this.wrap=0;this.gzhead=null;this.gzindex=0;this.method=Z_DEFLATED;this.last_flush=-1;this.w_size=0;this.w_bits=0;this.w_mask=0;this.window=null;this.window_size=0;this.prev=null;this.head=null;this.ins_h=0;this.hash_size=0;this.hash_bits=0;this.hash_mask=0;this.hash_shift=0;this.block_start=0;this.match_length=0;this.prev_match=0;this.match_available=0;this.strstart=0;this.match_start=0;this.lookahead=0;this.prev_length=0;this.max_chain_length=0;this.max_lazy_match=0;this.level=0;this.strategy=0;this.good_match=0;this.nice_match=0;this.dyn_ltree=new utils.Buf16(HEAP_SIZE*2);this.dyn_dtree=new utils.Buf16((2*D_CODES+1)*2);this.bl_tree=new utils.Buf16((2*BL_CODES+1)*2);zero(this.dyn_ltree);zero(this.dyn_dtree);zero(this.bl_tree);this.l_desc=null;this.d_desc=null;this.bl_desc=null;this.bl_count=new utils.Buf16(MAX_BITS+1);this.heap=new utils.Buf16(2*L_CODES+1);zero(this.heap);this.heap_len=0;this.heap_max=0;this.depth=new utils.Buf16(2*L_CODES+1);zero(this.depth);this.l_buf=0;this.lit_bufsize=0;this.last_lit=0;this.d_buf=0;this.opt_len=0;this.static_len=0;this.matches=0;this.insert=0;this.bi_buf=0;this.bi_valid=0}function deflateResetKeep(strm){var s;if(!strm||!strm.state){return err(strm,Z_STREAM_ERROR)}strm.total_in=strm.total_out=0;strm.data_type=Z_UNKNOWN;s=strm.state;s.pending=0;s.pending_out=0;if(s.wrap<0){s.wrap=-s.wrap}s.status=(s.wrap?INIT_STATE:BUSY_STATE);strm.adler=(s.wrap===2)?0:1;s.last_flush=Z_NO_FLUSH;trees._tr_init(s);return Z_OK}function deflateReset(strm){var ret=deflateResetKeep(strm);if(ret===Z_OK){lm_init(strm.state)}return ret}function deflateSetHeader(strm,head){if(!strm||!strm.state){return Z_STREAM_ERROR}if(strm.state.wrap!==2){return Z_STREAM_ERROR}strm.state.gzhead=head;return Z_OK}function deflateInit2(strm,level,method,windowBits,memLevel,strategy){if(!strm){return Z_STREAM_ERROR}var wrap=1;if(level===Z_DEFAULT_COMPRESSION){level=6}if(windowBits<0){wrap=0;windowBits=-windowBits}else if(windowBits>15){wrap=2;windowBits-=16}if(memLevel<1||memLevel>MAX_MEM_LEVEL||method!==Z_DEFLATED||windowBits<8||windowBits>15||level<0||level>9||strategy<0||strategy>Z_FIXED){return err(strm,Z_STREAM_ERROR)}if(windowBits===8){windowBits=9}var s=new DeflateState();strm.state=s;s.strm=strm;s.wrap=wrap;s.gzhead=null;s.w_bits=windowBits;s.w_size=1<<s.w_bits;s.w_mask=s.w_size-1;s.hash_bits=memLevel+7;s.hash_size=1<<s.hash_bits;s.hash_mask=s.hash_size-1;s.hash_shift=~~((s.hash_bits+MIN_MATCH-1)/MIN_MATCH);s.window=new utils.Buf8(s.w_size*2);s.head=new utils.Buf16(s.hash_size);s.prev=new utils.Buf16(s.w_size);s.lit_bufsize=1<<(memLevel+6);s.pending_buf_size=s.lit_bufsize*4;s.pending_buf=new utils.Buf8(s.pending_buf_size);s.d_buf=s.lit_bufsize>>1;s.l_buf=(1+2)*s.lit_bufsize;s.level=level;s.strategy=strategy;s.method=method;return deflateReset(strm)}function deflateInit(strm,level){return deflateInit2(strm,level,Z_DEFLATED,MAX_WBITS,DEF_MEM_LEVEL,Z_DEFAULT_STRATEGY)}function deflate(strm,flush){var old_flush,s;var beg,val;if(!strm||!strm.state||flush>Z_BLOCK||flush<0){return strm?err(strm,Z_STREAM_ERROR):Z_STREAM_ERROR}s=strm.state;if(!strm.output||(!strm.input&&strm.avail_in!==0)||(s.status===FINISH_STATE&&flush!==Z_FINISH)){return err(strm,(strm.avail_out===0)?Z_BUF_ERROR:Z_STREAM_ERROR)}s.strm=strm;old_flush=s.last_flush;s.last_flush=flush;if(s.status===INIT_STATE){if(s.wrap===2){strm.adler=0;put_byte(s,31);put_byte(s,139);put_byte(s,8);if(!s.gzhead){put_byte(s,0);put_byte(s,0);put_byte(s,0);put_byte(s,0);put_byte(s,0);put_byte(s,s.level===9?2:(s.strategy>=Z_HUFFMAN_ONLY||s.level<2?4:0));put_byte(s,OS_CODE);s.status=BUSY_STATE}else{put_byte(s,(s.gzhead.text?1:0)+(s.gzhead.hcrc?2:0)+(!s.gzhead.extra?0:4)+(!s.gzhead.name?0:8)+(!s.gzhead.comment?0:16));put_byte(s,s.gzhead.time&0xff);put_byte(s,(s.gzhead.time>>8)&0xff);put_byte(s,(s.gzhead.time>>16)&0xff);put_byte(s,(s.gzhead.time>>24)&0xff);put_byte(s,s.level===9?2:(s.strategy>=Z_HUFFMAN_ONLY||s.level<2?4:0));put_byte(s,s.gzhead.os&0xff);if(s.gzhead.extra&&s.gzhead.extra.length){put_byte(s,s.gzhead.extra.length&0xff);put_byte(s,(s.gzhead.extra.length>>8)&0xff)}if(s.gzhead.hcrc){strm.adler=crc32(strm.adler,s.pending_buf,s.pending,0)}s.gzindex=0;s.status=EXTRA_STATE}}else{var header=(Z_DEFLATED+((s.w_bits-8)<<4))<<8;var level_flags=-1;if(s.strategy>=Z_HUFFMAN_ONLY||s.level<2){level_flags=0}else if(s.level<6){level_flags=1}else if(s.level===6){level_flags=2}else{level_flags=3}header|=(level_flags<<6);if(s.strstart!==0){header|=PRESET_DICT}header+=31-(header%31);s.status=BUSY_STATE;putShortMSB(s,header);if(s.strstart!==0){putShortMSB(s,strm.adler>>>16);putShortMSB(s,strm.adler&0xffff)}strm.adler=1}}if(s.status===EXTRA_STATE){if(s.gzhead.extra){beg=s.pending;while(s.gzindex<(s.gzhead.extra.length&0xffff)){if(s.pending===s.pending_buf_size){if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}flush_pending(strm);beg=s.pending;if(s.pending===s.pending_buf_size){break}}put_byte(s,s.gzhead.extra[s.gzindex]&0xff);s.gzindex++}if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}if(s.gzindex===s.gzhead.extra.length){s.gzindex=0;s.status=NAME_STATE}}else{s.status=NAME_STATE}}if(s.status===NAME_STATE){if(s.gzhead.name){beg=s.pending;do{if(s.pending===s.pending_buf_size){if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}flush_pending(strm);beg=s.pending;if(s.pending===s.pending_buf_size){val=1;break}}if(s.gzindex<s.gzhead.name.length){val=s.gzhead.name.charCodeAt(s.gzindex++)&0xff}else{val=0}put_byte(s,val)}while(val!==0);if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}if(val===0){s.gzindex=0;s.status=COMMENT_STATE}}else{s.status=COMMENT_STATE}}if(s.status===COMMENT_STATE){if(s.gzhead.comment){beg=s.pending;do{if(s.pending===s.pending_buf_size){if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}flush_pending(strm);beg=s.pending;if(s.pending===s.pending_buf_size){val=1;break}}if(s.gzindex<s.gzhead.comment.length){val=s.gzhead.comment.charCodeAt(s.gzindex++)&0xff}else{val=0}put_byte(s,val)}while(val!==0);if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}if(val===0){s.status=HCRC_STATE}}else{s.status=HCRC_STATE}}if(s.status===HCRC_STATE){if(s.gzhead.hcrc){if(s.pending+2>s.pending_buf_size){flush_pending(strm)}if(s.pending+2<=s.pending_buf_size){put_byte(s,strm.adler&0xff);put_byte(s,(strm.adler>>8)&0xff);strm.adler=0;s.status=BUSY_STATE}}else{s.status=BUSY_STATE}}if(s.pending!==0){flush_pending(strm);if(strm.avail_out===0){s.last_flush=-1;return Z_OK}}else if(strm.avail_in===0&&rank(flush)<=rank(old_flush)&&flush!==Z_FINISH){return err(strm,Z_BUF_ERROR)}if(s.status===FINISH_STATE&&strm.avail_in!==0){return err(strm,Z_BUF_ERROR)}if(strm.avail_in!==0||s.lookahead!==0||(flush!==Z_NO_FLUSH&&s.status!==FINISH_STATE)){var bstate=(s.strategy===Z_HUFFMAN_ONLY)?deflate_huff(s,flush):(s.strategy===Z_RLE?deflate_rle(s,flush):configuration_table[s.level].func(s,flush));if(bstate===BS_FINISH_STARTED||bstate===BS_FINISH_DONE){s.status=FINISH_STATE}if(bstate===BS_NEED_MORE||bstate===BS_FINISH_STARTED){if(strm.avail_out===0){s.last_flush=-1}return Z_OK}if(bstate===BS_BLOCK_DONE){if(flush===Z_PARTIAL_FLUSH){trees._tr_align(s)}else if(flush!==Z_BLOCK){trees._tr_stored_block(s,0,0,false);if(flush===Z_FULL_FLUSH){zero(s.head);if(s.lookahead===0){s.strstart=0;s.block_start=0;s.insert=0}}}flush_pending(strm);if(strm.avail_out===0){s.last_flush=-1;return Z_OK}}}if(flush!==Z_FINISH){return Z_OK}if(s.wrap<=0){return Z_STREAM_END}if(s.wrap===2){put_byte(s,strm.adler&0xff);put_byte(s,(strm.adler>>8)&0xff);put_byte(s,(strm.adler>>16)&0xff);put_byte(s,(strm.adler>>24)&0xff);put_byte(s,strm.total_in&0xff);put_byte(s,(strm.total_in>>8)&0xff);put_byte(s,(strm.total_in>>16)&0xff);put_byte(s,(strm.total_in>>24)&0xff)}else{putShortMSB(s,strm.adler>>>16);putShortMSB(s,strm.adler&0xffff)}flush_pending(strm);if(s.wrap>0){s.wrap=-s.wrap}return s.pending!==0?Z_OK:Z_STREAM_END}function deflateEnd(strm){var status;if(!strm||!strm.state){return Z_STREAM_ERROR}status=strm.state.status;if(status!==INIT_STATE&&status!==EXTRA_STATE&&status!==NAME_STATE&&status!==COMMENT_STATE&&status!==HCRC_STATE&&status!==BUSY_STATE&&status!==FINISH_STATE){return err(strm,Z_STREAM_ERROR)}strm.state=null;return status===BUSY_STATE?err(strm,Z_DATA_ERROR):Z_OK}function deflateSetDictionary(strm,dictionary){var dictLength=dictionary.length;var s;var str,n;var wrap;var avail;var next;var input;var tmpDict;if(!strm||!strm.state){return Z_STREAM_ERROR}s=strm.state;wrap=s.wrap;if(wrap===2||(wrap===1&&s.status!==INIT_STATE)||s.lookahead){return Z_STREAM_ERROR}if(wrap===1){strm.adler=adler32(strm.adler,dictionary,dictLength,0)}s.wrap=0;if(dictLength>=s.w_size){if(wrap===0){zero(s.head);s.strstart=0;s.block_start=0;s.insert=0}tmpDict=new utils.Buf8(s.w_size);utils.arraySet(tmpDict,dictionary,dictLength-s.w_size,s.w_size,0);dictionary=tmpDict;dictLength=s.w_size}avail=strm.avail_in;next=strm.next_in;input=strm.input;strm.avail_in=dictLength;strm.next_in=0;strm.input=dictionary;fill_window(s);while(s.lookahead>=MIN_MATCH){str=s.strstart;n=s.lookahead-(MIN_MATCH-1);do{s.ins_h=((s.ins_h<<s.hash_shift)^s.window[str+MIN_MATCH-1])&s.hash_mask;s.prev[str&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=str;str++}while(--n);s.strstart=str;s.lookahead=MIN_MATCH-1;fill_window(s)}s.strstart+=s.lookahead;s.block_start=s.strstart;s.insert=s.lookahead;s.lookahead=0;s.match_length=s.prev_length=MIN_MATCH-1;s.match_available=0;strm.next_in=next;strm.input=input;strm.avail_in=avail;s.wrap=wrap;return Z_OK}exports.deflateInit=deflateInit;exports.deflateInit2=deflateInit2;exports.deflateReset=deflateReset;exports.deflateResetKeep=deflateResetKeep;exports.deflateSetHeader=deflateSetHeader;exports.deflate=deflate;exports.deflateEnd=deflateEnd;exports.deflateSetDictionary=deflateSetDictionary;exports.deflateInfo='pako deflate (from Nodeca project)'},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(require,module,exports){'use strict';function GZheader(){this.text=0;this.time=0;this.xflags=0;this.os=0;this.extra=null;this.extra_len=0;this.name='';this.comment='';this.hcrc=0;this.done=false}module.exports=GZheader},{}],10:[function(require,module,exports){'use strict';var BAD=30;var TYPE=12;module.exports=function inflate_fast(strm,start){var state;var _in;var last;var _out;var beg;var end;var dmax;var wsize;var whave;var wnext;var s_window;var hold;var bits;var lcode;var dcode;var lmask;var dmask;var here;var op;var len;var dist;var from;var from_source;var input,output;state=strm.state;_in=strm.next_in;input=strm.input;last=_in+(strm.avail_in-5);_out=strm.next_out;output=strm.output;beg=_out-(start-strm.avail_out);end=_out+(strm.avail_out-257);dmax=state.dmax;wsize=state.wsize;whave=state.whave;wnext=state.wnext;s_window=state.window;hold=state.hold;bits=state.bits;lcode=state.lencode;dcode=state.distcode;lmask=(1<<state.lenbits)-1;dmask=(1<<state.distbits)-1;top:do{if(bits<15){hold+=input[_in++]<<bits;bits+=8;hold+=input[_in++]<<bits;bits+=8}here=lcode[hold&lmask];dolen:for(;;){op=here>>>24;hold>>>=op;bits-=op;op=(here>>>16)&0xff;if(op===0){output[_out++]=here&0xffff}else if(op&16){len=here&0xffff;op&=15;if(op){if(bits<op){hold+=input[_in++]<<bits;bits+=8}len+=hold&((1<<op)-1);hold>>>=op;bits-=op}if(bits<15){hold+=input[_in++]<<bits;bits+=8;hold+=input[_in++]<<bits;bits+=8}here=dcode[hold&dmask];dodist:for(;;){op=here>>>24;hold>>>=op;bits-=op;op=(here>>>16)&0xff;if(op&16){dist=here&0xffff;op&=15;if(bits<op){hold+=input[_in++]<<bits;bits+=8;if(bits<op){hold+=input[_in++]<<bits;bits+=8}}dist+=hold&((1<<op)-1);if(dist>dmax){strm.msg='invalid distance too far back';state.mode=BAD;break top}hold>>>=op;bits-=op;op=_out-beg;if(dist>op){op=dist-op;if(op>whave){if(state.sane){strm.msg='invalid distance too far back';state.mode=BAD;break top}}from=0;from_source=s_window;if(wnext===0){from+=wsize-op;if(op<len){len-=op;do{output[_out++]=s_window[from++]}while(--op);from=_out-dist;from_source=output}}else if(wnext<op){from+=wsize+wnext-op;op-=wnext;if(op<len){len-=op;do{output[_out++]=s_window[from++]}while(--op);from=0;if(wnext<len){op=wnext;len-=op;do{output[_out++]=s_window[from++]}while(--op);from=_out-dist;from_source=output}}}else{from+=wnext-op;if(op<len){len-=op;do{output[_out++]=s_window[from++]}while(--op);from=_out-dist;from_source=output}}while(len>2){output[_out++]=from_source[from++];output[_out++]=from_source[from++];output[_out++]=from_source[from++];len-=3}if(len){output[_out++]=from_source[from++];if(len>1){output[_out++]=from_source[from++]}}}else{from=_out-dist;do{output[_out++]=output[from++];output[_out++]=output[from++];output[_out++]=output[from++];len-=3}while(len>2);if(len){output[_out++]=output[from++];if(len>1){output[_out++]=output[from++]}}}}else if((op&64)===0){here=dcode[(here&0xffff)+(hold&((1<<op)-1))];continue dodist}else{strm.msg='invalid distance code';state.mode=BAD;break top}break}}else if((op&64)===0){here=lcode[(here&0xffff)+(hold&((1<<op)-1))];continue dolen}else if(op&32){state.mode=TYPE;break top}else{strm.msg='invalid literal/length code';state.mode=BAD;break top}break}}while(_in<last&&_out<end);len=bits>>3;_in-=len;bits-=len<<3;hold&=(1<<bits)-1;strm.next_in=_in;strm.next_out=_out;strm.avail_in=(_in<last?5+(last-_in):5-(_in-last));strm.avail_out=(_out<end?257+(end-_out):257-(_out-end));state.hold=hold;state.bits=bits;return}},{}],11:[function(require,module,exports){'use strict';var utils=require('../utils/common');var adler32=require('./adler32');var crc32=require('./crc32');var inflate_fast=require('./inffast');var inflate_table=require('./inftrees');var CODES=0;var LENS=1;var DISTS=2;var Z_FINISH=4;var Z_BLOCK=5;var Z_TREES=6;var Z_OK=0;var Z_STREAM_END=1;var Z_NEED_DICT=2;var Z_STREAM_ERROR=-2;var Z_DATA_ERROR=-3;var Z_MEM_ERROR=-4;var Z_BUF_ERROR=-5;var Z_DEFLATED=8;var HEAD=1;var FLAGS=2;var TIME=3;var OS=4;var EXLEN=5;var EXTRA=6;var NAME=7;var COMMENT=8;var HCRC=9;var DICTID=10;var DICT=11;var TYPE=12;var TYPEDO=13;var STORED=14;var COPY_=15;var COPY=16;var TABLE=17;var LENLENS=18;var CODELENS=19;var LEN_=20;var LEN=21;var LENEXT=22;var DIST=23;var DISTEXT=24;var MATCH=25;var LIT=26;var CHECK=27;var LENGTH=28;var DONE=29;var BAD=30;var MEM=31;var SYNC=32;var ENOUGH_LENS=852;var ENOUGH_DISTS=592;var MAX_WBITS=15;var DEF_WBITS=MAX_WBITS;function zswap32(q){return(((q>>>24)&0xff)+((q>>>8)&0xff00)+((q&0xff00)<<8)+((q&0xff)<<24))}function InflateState(){this.mode=0;this.last=false;this.wrap=0;this.havedict=false;this.flags=0;this.dmax=0;this.check=0;this.total=0;this.head=null;this.wbits=0;this.wsize=0;this.whave=0;this.wnext=0;this.window=null;this.hold=0;this.bits=0;this.length=0;this.offset=0;this.extra=0;this.lencode=null;this.distcode=null;this.lenbits=0;this.distbits=0;this.ncode=0;this.nlen=0;this.ndist=0;this.have=0;this.next=null;this.lens=new utils.Buf16(320);this.work=new utils.Buf16(288);this.lendyn=null;this.distdyn=null;this.sane=0;this.back=0;this.was=0}function inflateResetKeep(strm){var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;strm.total_in=strm.total_out=state.total=0;strm.msg='';if(state.wrap){strm.adler=state.wrap&1}state.mode=HEAD;state.last=0;state.havedict=0;state.dmax=32768;state.head=null;state.hold=0;state.bits=0;state.lencode=state.lendyn=new utils.Buf32(ENOUGH_LENS);state.distcode=state.distdyn=new utils.Buf32(ENOUGH_DISTS);state.sane=1;state.back=-1;return Z_OK}function inflateReset(strm){var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;state.wsize=0;state.whave=0;state.wnext=0;return inflateResetKeep(strm)}function inflateReset2(strm,windowBits){var wrap;var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;if(windowBits<0){wrap=0;windowBits=-windowBits}else{wrap=(windowBits>>4)+1;if(windowBits<48){windowBits&=15}}if(windowBits&&(windowBits<8||windowBits>15)){return Z_STREAM_ERROR}if(state.window!==null&&state.wbits!==windowBits){state.window=null}state.wrap=wrap;state.wbits=windowBits;return inflateReset(strm)}function inflateInit2(strm,windowBits){var ret;var state;if(!strm){return Z_STREAM_ERROR}state=new InflateState();strm.state=state;state.window=null;ret=inflateReset2(strm,windowBits);if(ret!==Z_OK){strm.state=null}return ret}function inflateInit(strm){return inflateInit2(strm,DEF_WBITS)}var virgin=true;var lenfix,distfix;function fixedtables(state){if(virgin){var sym;lenfix=new utils.Buf32(512);distfix=new utils.Buf32(32);sym=0;while(sym<144){state.lens[sym++]=8}while(sym<256){state.lens[sym++]=9}while(sym<280){state.lens[sym++]=7}while(sym<288){state.lens[sym++]=8}inflate_table(LENS,state.lens,0,288,lenfix,0,state.work,{bits:9});sym=0;while(sym<32){state.lens[sym++]=5}inflate_table(DISTS,state.lens,0,32,distfix,0,state.work,{bits:5});virgin=false}state.lencode=lenfix;state.lenbits=9;state.distcode=distfix;state.distbits=5}function updatewindow(strm,src,end,copy){var dist;var state=strm.state;if(state.window===null){state.wsize=1<<state.wbits;state.wnext=0;state.whave=0;state.window=new utils.Buf8(state.wsize)}if(copy>=state.wsize){utils.arraySet(state.window,src,end-state.wsize,state.wsize,0);state.wnext=0;state.whave=state.wsize}else{dist=state.wsize-state.wnext;if(dist>copy){dist=copy}utils.arraySet(state.window,src,end-copy,dist,state.wnext);copy-=dist;if(copy){utils.arraySet(state.window,src,end-copy,copy,0);state.wnext=copy;state.whave=state.wsize}else{state.wnext+=dist;if(state.wnext===state.wsize){state.wnext=0}if(state.whave<state.wsize){state.whave+=dist}}}return 0}function inflate(strm,flush){var state;var input,output;var next;var put;var have,left;var hold;var bits;var _in,_out;var copy;var from;var from_source;var here=0;var here_bits,here_op,here_val;var last_bits,last_op,last_val;var len;var ret;var hbuf=new utils.Buf8(4);var opts;var n;var order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!strm||!strm.state||!strm.output||(!strm.input&&strm.avail_in!==0)){return Z_STREAM_ERROR}state=strm.state;if(state.mode===TYPE){state.mode=TYPEDO}put=strm.next_out;output=strm.output;left=strm.avail_out;next=strm.next_in;input=strm.input;have=strm.avail_in;hold=state.hold;bits=state.bits;_in=have;_out=left;ret=Z_OK;inf_leave:for(;;){switch(state.mode){case HEAD:if(state.wrap===0){state.mode=TYPEDO;break}while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if((state.wrap&2)&&hold===0x8b1f){state.check=0;hbuf[0]=hold&0xff;hbuf[1]=(hold>>>8)&0xff;state.check=crc32(state.check,hbuf,2,0);hold=0;bits=0;state.mode=FLAGS;break}state.flags=0;if(state.head){state.head.done=false}if(!(state.wrap&1)||(((hold&0xff)<<8)+(hold>>8))%31){strm.msg='incorrect header check';state.mode=BAD;break}if((hold&0x0f)!==Z_DEFLATED){strm.msg='unknown compression method';state.mode=BAD;break}hold>>>=4;bits-=4;len=(hold&0x0f)+8;if(state.wbits===0){state.wbits=len}else if(len>state.wbits){strm.msg='invalid window size';state.mode=BAD;break}state.dmax=1<<len;strm.adler=state.check=1;state.mode=hold&0x200?DICTID:TYPE;hold=0;bits=0;break;case FLAGS:while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.flags=hold;if((state.flags&0xff)!==Z_DEFLATED){strm.msg='unknown compression method';state.mode=BAD;break}if(state.flags&0xe000){strm.msg='unknown header flags set';state.mode=BAD;break}if(state.head){state.head.text=((hold>>8)&1)}if(state.flags&0x0200){hbuf[0]=hold&0xff;hbuf[1]=(hold>>>8)&0xff;state.check=crc32(state.check,hbuf,2,0)}hold=0;bits=0;state.mode=TIME;case TIME:while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(state.head){state.head.time=hold}if(state.flags&0x0200){hbuf[0]=hold&0xff;hbuf[1]=(hold>>>8)&0xff;hbuf[2]=(hold>>>16)&0xff;hbuf[3]=(hold>>>24)&0xff;state.check=crc32(state.check,hbuf,4,0)}hold=0;bits=0;state.mode=OS;case OS:while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(state.head){state.head.xflags=(hold&0xff);state.head.os=(hold>>8)}if(state.flags&0x0200){hbuf[0]=hold&0xff;hbuf[1]=(hold>>>8)&0xff;state.check=crc32(state.check,hbuf,2,0)}hold=0;bits=0;state.mode=EXLEN;case EXLEN:if(state.flags&0x0400){while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.length=hold;if(state.head){state.head.extra_len=hold}if(state.flags&0x0200){hbuf[0]=hold&0xff;hbuf[1]=(hold>>>8)&0xff;state.check=crc32(state.check,hbuf,2,0)}hold=0;bits=0}else if(state.head){state.head.extra=null}state.mode=EXTRA;case EXTRA:if(state.flags&0x0400){copy=state.length;if(copy>have){copy=have}if(copy){if(state.head){len=state.head.extra_len-state.length;if(!state.head.extra){state.head.extra=new Array(state.head.extra_len)}utils.arraySet(state.head.extra,input,next,copy,len)}if(state.flags&0x0200){state.check=crc32(state.check,input,copy,next)}have-=copy;next+=copy;state.length-=copy}if(state.length){break inf_leave}}state.length=0;state.mode=NAME;case NAME:if(state.flags&0x0800){if(have===0){break inf_leave}copy=0;do{len=input[next+copy++];if(state.head&&len&&(state.length<65536)){state.head.name+=String.fromCharCode(len)}}while(len&&copy<have);if(state.flags&0x0200){state.check=crc32(state.check,input,copy,next)}have-=copy;next+=copy;if(len){break inf_leave}}else if(state.head){state.head.name=null}state.length=0;state.mode=COMMENT;case COMMENT:if(state.flags&0x1000){if(have===0){break inf_leave}copy=0;do{len=input[next+copy++];if(state.head&&len&&(state.length<65536)){state.head.comment+=String.fromCharCode(len)}}while(len&&copy<have);if(state.flags&0x0200){state.check=crc32(state.check,input,copy,next)}have-=copy;next+=copy;if(len){break inf_leave}}else if(state.head){state.head.comment=null}state.mode=HCRC;case HCRC:if(state.flags&0x0200){while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(hold!==(state.check&0xffff)){strm.msg='header crc mismatch';state.mode=BAD;break}hold=0;bits=0}if(state.head){state.head.hcrc=((state.flags>>9)&1);state.head.done=true}strm.adler=state.check=0;state.mode=TYPE;break;case DICTID:while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}strm.adler=state.check=zswap32(hold);hold=0;bits=0;state.mode=DICT;case DICT:if(state.havedict===0){strm.next_out=put;strm.avail_out=left;strm.next_in=next;strm.avail_in=have;state.hold=hold;state.bits=bits;return Z_NEED_DICT}strm.adler=state.check=1;state.mode=TYPE;case TYPE:if(flush===Z_BLOCK||flush===Z_TREES){break inf_leave}case TYPEDO:if(state.last){hold>>>=bits&7;bits-=bits&7;state.mode=CHECK;break}while(bits<3){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.last=(hold&0x01);hold>>>=1;bits-=1;switch((hold&0x03)){case 0:state.mode=STORED;break;case 1:fixedtables(state);state.mode=LEN_;if(flush===Z_TREES){hold>>>=2;bits-=2;break inf_leave}break;case 2:state.mode=TABLE;break;case 3:strm.msg='invalid block type';state.mode=BAD}hold>>>=2;bits-=2;break;case STORED:hold>>>=bits&7;bits-=bits&7;while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if((hold&0xffff)!==((hold>>>16)^0xffff)){strm.msg='invalid stored block lengths';state.mode=BAD;break}state.length=hold&0xffff;hold=0;bits=0;state.mode=COPY_;if(flush===Z_TREES){break inf_leave}case COPY_:state.mode=COPY;case COPY:copy=state.length;if(copy){if(copy>have){copy=have}if(copy>left){copy=left}if(copy===0){break inf_leave}utils.arraySet(output,input,next,copy,put);have-=copy;next+=copy;left-=copy;put+=copy;state.length-=copy;break}state.mode=TYPE;break;case TABLE:while(bits<14){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.nlen=(hold&0x1f)+257;hold>>>=5;bits-=5;state.ndist=(hold&0x1f)+1;hold>>>=5;bits-=5;state.ncode=(hold&0x0f)+4;hold>>>=4;bits-=4;if(state.nlen>286||state.ndist>30){strm.msg='too many length or distance symbols';state.mode=BAD;break}state.have=0;state.mode=LENLENS;case LENLENS:while(state.have<state.ncode){while(bits<3){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.lens[order[state.have++]]=(hold&0x07);hold>>>=3;bits-=3}while(state.have<19){state.lens[order[state.have++]]=0}state.lencode=state.lendyn;state.lenbits=7;opts={bits:state.lenbits};ret=inflate_table(CODES,state.lens,0,19,state.lencode,0,state.work,opts);state.lenbits=opts.bits;if(ret){strm.msg='invalid code lengths set';state.mode=BAD;break}state.have=0;state.mode=CODELENS;case CODELENS:while(state.have<state.nlen+state.ndist){for(;;){here=state.lencode[hold&((1<<state.lenbits)-1)];here_bits=here>>>24;here_op=(here>>>16)&0xff;here_val=here&0xffff;if((here_bits)<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(here_val<16){hold>>>=here_bits;bits-=here_bits;state.lens[state.have++]=here_val}else{if(here_val===16){n=here_bits+2;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=here_bits;bits-=here_bits;if(state.have===0){strm.msg='invalid bit length repeat';state.mode=BAD;break}len=state.lens[state.have-1];copy=3+(hold&0x03);hold>>>=2;bits-=2}else if(here_val===17){n=here_bits+3;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=here_bits;bits-=here_bits;len=0;copy=3+(hold&0x07);hold>>>=3;bits-=3}else{n=here_bits+7;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=here_bits;bits-=here_bits;len=0;copy=11+(hold&0x7f);hold>>>=7;bits-=7}if(state.have+copy>state.nlen+state.ndist){strm.msg='invalid bit length repeat';state.mode=BAD;break}while(copy--){state.lens[state.have++]=len}}}if(state.mode===BAD){break}if(state.lens[256]===0){strm.msg='invalid code -- missing end-of-block';state.mode=BAD;break}state.lenbits=9;opts={bits:state.lenbits};ret=inflate_table(LENS,state.lens,0,state.nlen,state.lencode,0,state.work,opts);state.lenbits=opts.bits;if(ret){strm.msg='invalid literal/lengths set';state.mode=BAD;break}state.distbits=6;state.distcode=state.distdyn;opts={bits:state.distbits};ret=inflate_table(DISTS,state.lens,state.nlen,state.ndist,state.distcode,0,state.work,opts);state.distbits=opts.bits;if(ret){strm.msg='invalid distances set';state.mode=BAD;break}state.mode=LEN_;if(flush===Z_TREES){break inf_leave}case LEN_:state.mode=LEN;case LEN:if(have>=6&&left>=258){strm.next_out=put;strm.avail_out=left;strm.next_in=next;strm.avail_in=have;state.hold=hold;state.bits=bits;inflate_fast(strm,_out);put=strm.next_out;output=strm.output;left=strm.avail_out;next=strm.next_in;input=strm.input;have=strm.avail_in;hold=state.hold;bits=state.bits;if(state.mode===TYPE){state.back=-1}break}state.back=0;for(;;){here=state.lencode[hold&((1<<state.lenbits)-1)];here_bits=here>>>24;here_op=(here>>>16)&0xff;here_val=here&0xffff;if(here_bits<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(here_op&&(here_op&0xf0)===0){last_bits=here_bits;last_op=here_op;last_val=here_val;for(;;){here=state.lencode[last_val+((hold&((1<<(last_bits+last_op))-1))>>last_bits)];here_bits=here>>>24;here_op=(here>>>16)&0xff;here_val=here&0xffff;if((last_bits+here_bits)<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=last_bits;bits-=last_bits;state.back+=last_bits}hold>>>=here_bits;bits-=here_bits;state.back+=here_bits;state.length=here_val;if(here_op===0){state.mode=LIT;break}if(here_op&32){state.back=-1;state.mode=TYPE;break}if(here_op&64){strm.msg='invalid literal/length code';state.mode=BAD;break}state.extra=here_op&15;state.mode=LENEXT;case LENEXT:if(state.extra){n=state.extra;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.length+=hold&((1<<state.extra)-1);hold>>>=state.extra;bits-=state.extra;state.back+=state.extra}state.was=state.length;state.mode=DIST;case DIST:for(;;){here=state.distcode[hold&((1<<state.distbits)-1)];here_bits=here>>>24;here_op=(here>>>16)&0xff;here_val=here&0xffff;if((here_bits)<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if((here_op&0xf0)===0){last_bits=here_bits;last_op=here_op;last_val=here_val;for(;;){here=state.distcode[last_val+((hold&((1<<(last_bits+last_op))-1))>>last_bits)];here_bits=here>>>24;here_op=(here>>>16)&0xff;here_val=here&0xffff;if((last_bits+here_bits)<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=last_bits;bits-=last_bits;state.back+=last_bits}hold>>>=here_bits;bits-=here_bits;state.back+=here_bits;if(here_op&64){strm.msg='invalid distance code';state.mode=BAD;break}state.offset=here_val;state.extra=(here_op)&15;state.mode=DISTEXT;case DISTEXT:if(state.extra){n=state.extra;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.offset+=hold&((1<<state.extra)-1);hold>>>=state.extra;bits-=state.extra;state.back+=state.extra}if(state.offset>state.dmax){strm.msg='invalid distance too far back';state.mode=BAD;break}state.mode=MATCH;case MATCH:if(left===0){break inf_leave}copy=_out-left;if(state.offset>copy){copy=state.offset-copy;if(copy>state.whave){if(state.sane){strm.msg='invalid distance too far back';state.mode=BAD;break}}if(copy>state.wnext){copy-=state.wnext;from=state.wsize-copy}else{from=state.wnext-copy}if(copy>state.length){copy=state.length}from_source=state.window}else{from_source=output;from=put-state.offset;copy=state.length}if(copy>left){copy=left}left-=copy;state.length-=copy;do{output[put++]=from_source[from++]}while(--copy);if(state.length===0){state.mode=LEN}break;case LIT:if(left===0){break inf_leave}output[put++]=state.length;left--;state.mode=LEN;break;case CHECK:if(state.wrap){while(bits<32){if(have===0){break inf_leave}have--;hold|=input[next++]<<bits;bits+=8}_out-=left;strm.total_out+=_out;state.total+=_out;if(_out){strm.adler=state.check=(state.flags?crc32(state.check,output,_out,put-_out):adler32(state.check,output,_out,put-_out))}_out=left;if((state.flags?hold:zswap32(hold))!==state.check){strm.msg='incorrect data check';state.mode=BAD;break}hold=0;bits=0}state.mode=LENGTH;case LENGTH:if(state.wrap&&state.flags){while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(hold!==(state.total&0xffffffff)){strm.msg='incorrect length check';state.mode=BAD;break}hold=0;bits=0}state.mode=DONE;case DONE:ret=Z_STREAM_END;break inf_leave;case BAD:ret=Z_DATA_ERROR;break inf_leave;case MEM:return Z_MEM_ERROR;case SYNC:default:return Z_STREAM_ERROR}}strm.next_out=put;strm.avail_out=left;strm.next_in=next;strm.avail_in=have;state.hold=hold;state.bits=bits;if(state.wsize||(_out!==strm.avail_out&&state.mode<BAD&&(state.mode<CHECK||flush!==Z_FINISH))){if(updatewindow(strm,strm.output,strm.next_out,_out-strm.avail_out)){state.mode=MEM;return Z_MEM_ERROR}}_in-=strm.avail_in;_out-=strm.avail_out;strm.total_in+=_in;strm.total_out+=_out;state.total+=_out;if(state.wrap&&_out){strm.adler=state.check=(state.flags?crc32(state.check,output,_out,strm.next_out-_out):adler32(state.check,output,_out,strm.next_out-_out))}strm.data_type=state.bits+(state.last?64:0)+(state.mode===TYPE?128:0)+(state.mode===LEN_||state.mode===COPY_?256:0);if(((_in===0&&_out===0)||flush===Z_FINISH)&&ret===Z_OK){ret=Z_BUF_ERROR}return ret}function inflateEnd(strm){if(!strm||!strm.state){return Z_STREAM_ERROR}var state=strm.state;if(state.window){state.window=null}strm.state=null;return Z_OK}function inflateGetHeader(strm,head){var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;if((state.wrap&2)===0){return Z_STREAM_ERROR}state.head=head;head.done=false;return Z_OK}function inflateSetDictionary(strm,dictionary){var dictLength=dictionary.length;var state;var dictid;var ret;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;if(state.wrap!==0&&state.mode!==DICT){return Z_STREAM_ERROR}if(state.mode===DICT){dictid=1;dictid=adler32(dictid,dictionary,dictLength,0);if(dictid!==state.check){return Z_DATA_ERROR}}ret=updatewindow(strm,dictionary,dictLength,dictLength);if(ret){state.mode=MEM;return Z_MEM_ERROR}state.havedict=1;return Z_OK}exports.inflateReset=inflateReset;exports.inflateReset2=inflateReset2;exports.inflateResetKeep=inflateResetKeep;exports.inflateInit=inflateInit;exports.inflateInit2=inflateInit2;exports.inflate=inflate;exports.inflateEnd=inflateEnd;exports.inflateGetHeader=inflateGetHeader;exports.inflateSetDictionary=inflateSetDictionary;exports.inflateInfo='pako inflate (from Nodeca project)'},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(require,module,exports){'use strict';var utils=require('../utils/common');var MAXBITS=15;var ENOUGH_LENS=852;var ENOUGH_DISTS=592;var CODES=0;var LENS=1;var DISTS=2;var lbase=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0];var lext=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78];var dbase=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0];var dext=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];module.exports=function inflate_table(type,lens,lens_index,codes,table,table_index,work,opts){var bits=opts.bits;var len=0;var sym=0;var min=0,max=0;var root=0;var curr=0;var drop=0;var left=0;var used=0;var huff=0;var incr;var fill;var low;var mask;var next;var base=null;var base_index=0;var end;var count=new utils.Buf16(MAXBITS+1);var offs=new utils.Buf16(MAXBITS+1);var extra=null;var extra_index=0;var here_bits,here_op,here_val;for(len=0;len<=MAXBITS;len++){count[len]=0}for(sym=0;sym<codes;sym++){count[lens[lens_index+sym]]++}root=bits;for(max=MAXBITS;max>=1;max--){if(count[max]!==0){break}}if(root>max){root=max}if(max===0){table[table_index++]=(1<<24)|(64<<16)|0;table[table_index++]=(1<<24)|(64<<16)|0;opts.bits=1;return 0}for(min=1;min<max;min++){if(count[min]!==0){break}}if(root<min){root=min}left=1;for(len=1;len<=MAXBITS;len++){left<<=1;left-=count[len];if(left<0){return-1}}if(left>0&&(type===CODES||max!==1)){return-1}offs[1]=0;for(len=1;len<MAXBITS;len++){offs[len+1]=offs[len]+count[len]}for(sym=0;sym<codes;sym++){if(lens[lens_index+sym]!==0){work[offs[lens[lens_index+sym]]++]=sym}}if(type===CODES){base=extra=work;end=19}else if(type===LENS){base=lbase;base_index-=257;extra=lext;extra_index-=257;end=256}else{base=dbase;extra=dext;end=-1}huff=0;sym=0;len=min;next=table_index;curr=root;drop=0;low=-1;used=1<<root;mask=used-1;if((type===LENS&&used>ENOUGH_LENS)||(type===DISTS&&used>ENOUGH_DISTS)){return 1}var i=0;for(;;){i++;here_bits=len-drop;if(work[sym]<end){here_op=0;here_val=work[sym]}else if(work[sym]>end){here_op=extra[extra_index+work[sym]];here_val=base[base_index+work[sym]]}else{here_op=32+64;here_val=0}incr=1<<(len-drop);fill=1<<curr;min=fill;do{fill-=incr;table[next+(huff>>drop)+fill]=(here_bits<<24)|(here_op<<16)|here_val|0}while(fill!==0);incr=1<<(len-1);while(huff&incr){incr>>=1}if(incr!==0){huff&=incr-1;huff+=incr}else{huff=0}sym++;if(--count[len]===0){if(len===max){break}len=lens[lens_index+work[sym]]}if(len>root&&(huff&mask)!==low){if(drop===0){drop=root}next+=min;curr=len-drop;left=1<<curr;while(curr+drop<max){left-=count[curr+drop];if(left<=0){break}curr++;left<<=1}used+=1<<curr;if((type===LENS&&used>ENOUGH_LENS)||(type===DISTS&&used>ENOUGH_DISTS)){return 1}low=huff&mask;table[low]=(root<<24)|(curr<<16)|(next-table_index)|0}}if(huff!==0){table[next+huff]=((len-drop)<<24)|(64<<16)|0}opts.bits=root;return 0}},{"../utils/common":3}],13:[function(require,module,exports){'use strict';module.exports={2:'need dictionary',1:'stream end',0:'','-1':'file error','-2':'stream error','-3':'data error','-4':'insufficient memory','-5':'buffer error','-6':'incompatible version'}},{}],14:[function(require,module,exports){'use strict';var utils=require('../utils/common');var Z_FIXED=4;var Z_BINARY=0;var Z_TEXT=1;var Z_UNKNOWN=2;function zero(buf){var len=buf.length;while(--len>=0){buf[len]=0}}var STORED_BLOCK=0;var STATIC_TREES=1;var DYN_TREES=2;var MIN_MATCH=3;var MAX_MATCH=258;var LENGTH_CODES=29;var LITERALS=256;var L_CODES=LITERALS+1+LENGTH_CODES;var D_CODES=30;var BL_CODES=19;var HEAP_SIZE=2*L_CODES+1;var MAX_BITS=15;var Buf_size=16;var MAX_BL_BITS=7;var END_BLOCK=256;var REP_3_6=16;var REPZ_3_10=17;var REPZ_11_138=18;var extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];var extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];var extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];var bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var DIST_CODE_LEN=512;var static_ltree=new Array((L_CODES+2)*2);zero(static_ltree);var static_dtree=new Array(D_CODES*2);zero(static_dtree);var _dist_code=new Array(DIST_CODE_LEN);zero(_dist_code);var _length_code=new Array(MAX_MATCH-MIN_MATCH+1);zero(_length_code);var base_length=new Array(LENGTH_CODES);zero(base_length);var base_dist=new Array(D_CODES);zero(base_dist);function StaticTreeDesc(static_tree,extra_bits,extra_base,elems,max_length){this.static_tree=static_tree;this.extra_bits=extra_bits;this.extra_base=extra_base;this.elems=elems;this.max_length=max_length;this.has_stree=static_tree&&static_tree.length}var static_l_desc;var static_d_desc;var static_bl_desc;function TreeDesc(dyn_tree,stat_desc){this.dyn_tree=dyn_tree;this.max_code=0;this.stat_desc=stat_desc}function d_code(dist){return dist<256?_dist_code[dist]:_dist_code[256+(dist>>>7)]}function put_short(s,w){s.pending_buf[s.pending++]=(w)&0xff;s.pending_buf[s.pending++]=(w>>>8)&0xff}function send_bits(s,value,length){if(s.bi_valid>(Buf_size-length)){s.bi_buf|=(value<<s.bi_valid)&0xffff;put_short(s,s.bi_buf);s.bi_buf=value>>(Buf_size-s.bi_valid);s.bi_valid+=length-Buf_size}else{s.bi_buf|=(value<<s.bi_valid)&0xffff;s.bi_valid+=length}}function send_code(s,c,tree){send_bits(s,tree[c*2],tree[c*2+1])}function bi_reverse(code,len){var res=0;do{res|=code&1;code>>>=1;res<<=1}while(--len>0);return res>>>1}function bi_flush(s){if(s.bi_valid===16){put_short(s,s.bi_buf);s.bi_buf=0;s.bi_valid=0}else if(s.bi_valid>=8){s.pending_buf[s.pending++]=s.bi_buf&0xff;s.bi_buf>>=8;s.bi_valid-=8}}function gen_bitlen(s,desc){var tree=desc.dyn_tree;var max_code=desc.max_code;var stree=desc.stat_desc.static_tree;var has_stree=desc.stat_desc.has_stree;var extra=desc.stat_desc.extra_bits;var base=desc.stat_desc.extra_base;var max_length=desc.stat_desc.max_length;var h;var n,m;var bits;var xbits;var f;var overflow=0;for(bits=0;bits<=MAX_BITS;bits++){s.bl_count[bits]=0}tree[s.heap[s.heap_max]*2+1]=0;for(h=s.heap_max+1;h<HEAP_SIZE;h++){n=s.heap[h];bits=tree[tree[n*2+1]*2+1]+1;if(bits>max_length){bits=max_length;overflow++}tree[n*2+1]=bits;if(n>max_code){continue}s.bl_count[bits]++;xbits=0;if(n>=base){xbits=extra[n-base]}f=tree[n*2];s.opt_len+=f*(bits+xbits);if(has_stree){s.static_len+=f*(stree[n*2+1]+xbits)}}if(overflow===0){return}do{bits=max_length-1;while(s.bl_count[bits]===0){bits--}s.bl_count[bits]--;s.bl_count[bits+1]+=2;s.bl_count[max_length]--;overflow-=2}while(overflow>0);for(bits=max_length;bits!==0;bits--){n=s.bl_count[bits];while(n!==0){m=s.heap[--h];if(m>max_code){continue}if(tree[m*2+1]!==bits){s.opt_len+=(bits-tree[m*2+1])*tree[m*2];tree[m*2+1]=bits}n--}}}function gen_codes(tree,max_code,bl_count){var next_code=new Array(MAX_BITS+1);var code=0;var bits;var n;for(bits=1;bits<=MAX_BITS;bits++){next_code[bits]=code=(code+bl_count[bits-1])<<1}for(n=0;n<=max_code;n++){var len=tree[n*2+1];if(len===0){continue}tree[n*2]=bi_reverse(next_code[len]++,len)}}function tr_static_init(){var n;var bits;var length;var code;var dist;var bl_count=new Array(MAX_BITS+1);length=0;for(code=0;code<LENGTH_CODES-1;code++){base_length[code]=length;for(n=0;n<(1<<extra_lbits[code]);n++){_length_code[length++]=code}}_length_code[length-1]=code;dist=0;for(code=0;code<16;code++){base_dist[code]=dist;for(n=0;n<(1<<extra_dbits[code]);n++){_dist_code[dist++]=code}}dist>>=7;for(;code<D_CODES;code++){base_dist[code]=dist<<7;for(n=0;n<(1<<(extra_dbits[code]-7));n++){_dist_code[256+dist++]=code}}for(bits=0;bits<=MAX_BITS;bits++){bl_count[bits]=0}n=0;while(n<=143){static_ltree[n*2+1]=8;n++;bl_count[8]++}while(n<=255){static_ltree[n*2+1]=9;n++;bl_count[9]++}while(n<=279){static_ltree[n*2+1]=7;n++;bl_count[7]++}while(n<=287){static_ltree[n*2+1]=8;n++;bl_count[8]++}gen_codes(static_ltree,L_CODES+1,bl_count);for(n=0;n<D_CODES;n++){static_dtree[n*2+1]=5;static_dtree[n*2]=bi_reverse(n,5)}static_l_desc=new StaticTreeDesc(static_ltree,extra_lbits,LITERALS+1,L_CODES,MAX_BITS);static_d_desc=new StaticTreeDesc(static_dtree,extra_dbits,0,D_CODES,MAX_BITS);static_bl_desc=new StaticTreeDesc(new Array(0),extra_blbits,0,BL_CODES,MAX_BL_BITS)}function init_block(s){var n;for(n=0;n<L_CODES;n++){s.dyn_ltree[n*2]=0}for(n=0;n<D_CODES;n++){s.dyn_dtree[n*2]=0}for(n=0;n<BL_CODES;n++){s.bl_tree[n*2]=0}s.dyn_ltree[END_BLOCK*2]=1;s.opt_len=s.static_len=0;s.last_lit=s.matches=0}function bi_windup(s){if(s.bi_valid>8){put_short(s,s.bi_buf)}else if(s.bi_valid>0){s.pending_buf[s.pending++]=s.bi_buf}s.bi_buf=0;s.bi_valid=0}function copy_block(s,buf,len,header){bi_windup(s);if(header){put_short(s,len);put_short(s,~len)}utils.arraySet(s.pending_buf,s.window,buf,len,s.pending);s.pending+=len}function smaller(tree,n,m,depth){var _n2=n*2;var _m2=m*2;return(tree[_n2]<tree[_m2]||(tree[_n2]===tree[_m2]&&depth[n]<=depth[m]))}function pqdownheap(s,tree,k){var v=s.heap[k];var j=k<<1;while(j<=s.heap_len){if(j<s.heap_len&&smaller(tree,s.heap[j+1],s.heap[j],s.depth)){j++}if(smaller(tree,v,s.heap[j],s.depth)){break}s.heap[k]=s.heap[j];k=j;j<<=1}s.heap[k]=v}function compress_block(s,ltree,dtree){var dist;var lc;var lx=0;var code;var extra;if(s.last_lit!==0){do{dist=(s.pending_buf[s.d_buf+lx*2]<<8)|(s.pending_buf[s.d_buf+lx*2+1]);lc=s.pending_buf[s.l_buf+lx];lx++;if(dist===0){send_code(s,lc,ltree)}else{code=_length_code[lc];send_code(s,code+LITERALS+1,ltree);extra=extra_lbits[code];if(extra!==0){lc-=base_length[code];send_bits(s,lc,extra)}dist--;code=d_code(dist);send_code(s,code,dtree);extra=extra_dbits[code];if(extra!==0){dist-=base_dist[code];send_bits(s,dist,extra)}}}while(lx<s.last_lit)}send_code(s,END_BLOCK,ltree)}function build_tree(s,desc){var tree=desc.dyn_tree;var stree=desc.stat_desc.static_tree;var has_stree=desc.stat_desc.has_stree;var elems=desc.stat_desc.elems;var n,m;var max_code=-1;var node;s.heap_len=0;s.heap_max=HEAP_SIZE;for(n=0;n<elems;n++){if(tree[n*2]!==0){s.heap[++s.heap_len]=max_code=n;s.depth[n]=0}else{tree[n*2+1]=0}}while(s.heap_len<2){node=s.heap[++s.heap_len]=(max_code<2?++max_code:0);tree[node*2]=1;s.depth[node]=0;s.opt_len--;if(has_stree){s.static_len-=stree[node*2+1]}}desc.max_code=max_code;for(n=(s.heap_len>>1);n>=1;n--){pqdownheap(s,tree,n)}node=elems;do{n=s.heap[1];s.heap[1]=s.heap[s.heap_len--];pqdownheap(s,tree,1);m=s.heap[1];s.heap[--s.heap_max]=n;s.heap[--s.heap_max]=m;tree[node*2]=tree[n*2]+tree[m*2];s.depth[node]=(s.depth[n]>=s.depth[m]?s.depth[n]:s.depth[m])+1;tree[n*2+1]=tree[m*2+1]=node;s.heap[1]=node++;pqdownheap(s,tree,1)}while(s.heap_len>=2);s.heap[--s.heap_max]=s.heap[1];gen_bitlen(s,desc);gen_codes(tree,max_code,s.bl_count)}function scan_tree(s,tree,max_code){var n;var prevlen=-1;var curlen;var nextlen=tree[0*2+1];var count=0;var max_count=7;var min_count=4;if(nextlen===0){max_count=138;min_count=3}tree[(max_code+1)*2+1]=0xffff;for(n=0;n<=max_code;n++){curlen=nextlen;nextlen=tree[(n+1)*2+1];if(++count<max_count&&curlen===nextlen){continue}else if(count<min_count){s.bl_tree[curlen*2]+=count}else if(curlen!==0){if(curlen!==prevlen){s.bl_tree[curlen*2]++}s.bl_tree[REP_3_6*2]++}else if(count<=10){s.bl_tree[REPZ_3_10*2]++}else{s.bl_tree[REPZ_11_138*2]++}count=0;prevlen=curlen;if(nextlen===0){max_count=138;min_count=3}else if(curlen===nextlen){max_count=6;min_count=3}else{max_count=7;min_count=4}}}function send_tree(s,tree,max_code){var n;var prevlen=-1;var curlen;var nextlen=tree[0*2+1];var count=0;var max_count=7;var min_count=4;if(nextlen===0){max_count=138;min_count=3}for(n=0;n<=max_code;n++){curlen=nextlen;nextlen=tree[(n+1)*2+1];if(++count<max_count&&curlen===nextlen){continue}else if(count<min_count){do{send_code(s,curlen,s.bl_tree)}while(--count!==0)}else if(curlen!==0){if(curlen!==prevlen){send_code(s,curlen,s.bl_tree);count--}send_code(s,REP_3_6,s.bl_tree);send_bits(s,count-3,2)}else if(count<=10){send_code(s,REPZ_3_10,s.bl_tree);send_bits(s,count-3,3)}else{send_code(s,REPZ_11_138,s.bl_tree);send_bits(s,count-11,7)}count=0;prevlen=curlen;if(nextlen===0){max_count=138;min_count=3}else if(curlen===nextlen){max_count=6;min_count=3}else{max_count=7;min_count=4}}}function build_bl_tree(s){var max_blindex;scan_tree(s,s.dyn_ltree,s.l_desc.max_code);scan_tree(s,s.dyn_dtree,s.d_desc.max_code);build_tree(s,s.bl_desc);for(max_blindex=BL_CODES-1;max_blindex>=3;max_blindex--){if(s.bl_tree[bl_order[max_blindex]*2+1]!==0){break}}s.opt_len+=3*(max_blindex+1)+5+5+4;return max_blindex}function send_all_trees(s,lcodes,dcodes,blcodes){var rank;send_bits(s,lcodes-257,5);send_bits(s,dcodes-1,5);send_bits(s,blcodes-4,4);for(rank=0;rank<blcodes;rank++){send_bits(s,s.bl_tree[bl_order[rank]*2+1],3)}send_tree(s,s.dyn_ltree,lcodes-1);send_tree(s,s.dyn_dtree,dcodes-1)}function detect_data_type(s){var black_mask=0xf3ffc07f;var n;for(n=0;n<=31;n++,black_mask>>>=1){if((black_mask&1)&&(s.dyn_ltree[n*2]!==0)){return Z_BINARY}}if(s.dyn_ltree[9*2]!==0||s.dyn_ltree[10*2]!==0||s.dyn_ltree[13*2]!==0){return Z_TEXT}for(n=32;n<LITERALS;n++){if(s.dyn_ltree[n*2]!==0){return Z_TEXT}}return Z_BINARY}var static_init_done=false;function _tr_init(s){if(!static_init_done){tr_static_init();static_init_done=true}s.l_desc=new TreeDesc(s.dyn_ltree,static_l_desc);s.d_desc=new TreeDesc(s.dyn_dtree,static_d_desc);s.bl_desc=new TreeDesc(s.bl_tree,static_bl_desc);s.bi_buf=0;s.bi_valid=0;init_block(s)}function _tr_stored_block(s,buf,stored_len,last){send_bits(s,(STORED_BLOCK<<1)+(last?1:0),3);copy_block(s,buf,stored_len,true)}function _tr_align(s){send_bits(s,STATIC_TREES<<1,3);send_code(s,END_BLOCK,static_ltree);bi_flush(s)}function _tr_flush_block(s,buf,stored_len,last){var opt_lenb,static_lenb;var max_blindex=0;if(s.level>0){if(s.strm.data_type===Z_UNKNOWN){s.strm.data_type=detect_data_type(s)}build_tree(s,s.l_desc);build_tree(s,s.d_desc);max_blindex=build_bl_tree(s);opt_lenb=(s.opt_len+3+7)>>>3;static_lenb=(s.static_len+3+7)>>>3;if(static_lenb<=opt_lenb){opt_lenb=static_lenb}}else{opt_lenb=static_lenb=stored_len+5}if((stored_len+4<=opt_lenb)&&(buf!==-1)){_tr_stored_block(s,buf,stored_len,last)}else if(s.strategy===Z_FIXED||static_lenb===opt_lenb){send_bits(s,(STATIC_TREES<<1)+(last?1:0),3);compress_block(s,static_ltree,static_dtree)}else{send_bits(s,(DYN_TREES<<1)+(last?1:0),3);send_all_trees(s,s.l_desc.max_code+1,s.d_desc.max_code+1,max_blindex+1);compress_block(s,s.dyn_ltree,s.dyn_dtree)}init_block(s);if(last){bi_windup(s)}}function _tr_tally(s,dist,lc){s.pending_buf[s.d_buf+s.last_lit*2]=(dist>>>8)&0xff;s.pending_buf[s.d_buf+s.last_lit*2+1]=dist&0xff;s.pending_buf[s.l_buf+s.last_lit]=lc&0xff;s.last_lit++;if(dist===0){s.dyn_ltree[lc*2]++}else{s.matches++;dist--;s.dyn_ltree[(_length_code[lc]+LITERALS+1)*2]++;s.dyn_dtree[d_code(dist)*2]++}return(s.last_lit===s.lit_bufsize-1)}exports._tr_init=_tr_init;exports._tr_stored_block=_tr_stored_block;exports._tr_flush_block=_tr_flush_block;exports._tr_tally=_tr_tally;exports._tr_align=_tr_align},{"../utils/common":3}],15:[function(require,module,exports){'use strict';function ZStream(){this.input=null;this.next_in=0;this.avail_in=0;this.total_in=0;this.output=null;this.next_out=0;this.avail_out=0;this.total_out=0;this.msg='';this.state=null;this.data_type=2;this.adler=0}module.exports=ZStream},{}],"/":[function(require,module,exports){'use strict';var assign=require('./lib/utils/common').assign;var deflate=require('./lib/deflate');var inflate=require('./lib/inflate');var constants=require('./lib/zlib/constants');var pako={};assign(pako,deflate,inflate,constants);module.exports=pako},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")});
// ########################################################################################

// amrnb


(function (e) {
  var scriptArray = new Array();
  if (typeof (hex_md5) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/MD5.min.js" type="text/javascript" charset="utf-8"></script>')
  }
  if (typeof (Base64) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/base64.min.js" type="text/javascript" charset="utf-8"></script>')
  }
  if (typeof (pako) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/pako.js" type="text/javascript" charset="utf-8"></script>')
  }
  if (typeof (AMR) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/amrnb.js" type="text/javascript" charset="utf-8"></script>')
  }

  function createScript(src) {
    var md5script = document.createElement('script');
    md5script.type = 'text/javascript';
    md5script.charset = 'UTF-8';
    md5script.src = src;
    scriptArray.push(md5script)
  }
  var docu = document.getElementsByTagName('head')[0];
  for (var i = 0; i < scriptArray.length; i++) {
    docu.parentNode.insertBefore(scriptArray[i], docu)
  }
  var YTX_CONFIG = {
    getServer: true,
    _app_server: "aHR0cHM6Ly9pbXNsYi55dW50b25neHVuLmNvbS8yMDE2LTA4LTE1L0hUTUw1Lw==",
    _server_ip: [],
    _file_server_url: '',
    _lvs_servers: [],
    _socket: null,
    _appid: '',
    _version: '5.4.0',
    _ClientNo: 0,
    _msgVersion: 0,
    _syncMsgVersion: 0,
    _routerSwitch: true,
    _maxMsgVersion: 0,
    _syncMsgPorcessing: false,
    _receiveMsgBuf: {},
    _loginMode: 1,
    _network: 1,
    _sdkName: 'YTX-HTML5-SDK',
    _token: null,
    _userName: null,
    _userPwd: null,
    _imei: null,
    _userAcc: null,
    _reqSig: null,
    _reqTimestamp: null,
    _fTimestamp: null,
    _reqAuth: null,
    _clientMap: {},
    _loginStatus: 1,
    _isConnect: false,
    _mcm_agentId: null,
    _ccpCustomData: null,
    _deviceType: 21,
    _timeOutSecond: 40,
    _fileTimeOutSecond: 120,
    _heartBeatInterval: {
      _2G: 45,
      _3G: 90,
      _4G: 180,
      _WIFI: 300,
      _RECONNECT: 15
    },
    _failHeartBeatInterval: 10,
    _heartBeatTimeOut: 5,
    _intervalId: null,
    _failIntervalId: null,
    _isConnecting: false,
    _reLoginNum: 0,
    _isReconnect: false,
    _currentSession: 0,
    _maxMsgLen: 2048,
    _maxFileLen: 1024 * 1024 * 50,
    _maxSingleFileLen: 102400,
    _loginType: 1,
    _sessionId: null,
    _fileSig: null,
    _pushListener: null,
    _noticeListener: null,
    _mcmListener: null,
    _mcmNoticeListener: null,
    _connectStatListener: null,
    _charRoomLinstener: function () {},
    _conferenceNotifyLinstener: function () {},
    _friendNoticeMsgListener: function () {},
    _voipListener: null,
    _oldMeetingListener: null,
    _msgNotifyListener: null,
    _reauthListener: null,
    _heartBeatErrNum: 0,
    _Notification: null,
    _beforeUnLoad: [],
    _voipTimestamp: 0,
    _voipTimer: null,
    _meetingData: {},
    _logLev: {
      _DEBUG: 1,
      _INFO: 2,
      _WARN: 3,
      _ERROR: 4
    },
    _logLevStat: 1,
    _tel: null,
    _nickname: null,
    _logPrint: true,
    _recordVideo: false,
    _log: function (lev, content) {
      if (!YTX_CONFIG._logPrint) {
        return
      }
      if (lev < YTX_CONFIG._logLevStat) {
        return
      }
      if (!window.console || !window.console.log || !window.console.info || !window.console.warn || !window.console.error) {
        return
      }
      var timeStamp = YTX_CONFIG._getTimeStamp();
      content = timeStamp + " :: SDK :: " + content;
      if (lev == YTX_CONFIG._logLev._DEBUG) {
        console.log(content)
      } else if (lev == YTX_CONFIG._logLev._INFO) {
        console.info(content)
      } else if (lev == YTX_CONFIG._logLev._WARN) {
        console.warn(content)
      } else if (lev == YTX_CONFIG._logLev._ERROR) {
        console.error(content)
      }
    },
    _WS_TYPE: 4,
    _ipSpeedTestConfig: {
      _count: 10,
      _interval: 1000,
      _timeout: {
        _3G: 10 * 1000,
        _WIFI: 5 * 1000,
        _LAN: 1 * 1000,
        _4G: 3 * 1000,
        _GPRS: 20 * 1000,
        _OTHER: 10 * 1000
      }
    },
    chatRommId: null,
    chatRommNickName: null,
    _mediaConfig: {
      width: {
        ideal: 1280
      },
      height: {
        ideal: 720
      },
      frameRate: {
        ideal: 15
      },
      type: 1
    },
    _prototype: {
      _ipSpeedTest: 5,
      _kickOff: 6,
      _msg_CMD: 9,
      _msg_DEL: 21,
      _confirmMsg: 15,
      _pushMsgNotify: 18,
      _pushMsg: 19,
      _login: 20,
      _logout: 21,
      _setMyInfo: 23,
      _getMyInfo: 24,
      _cmdMsg: 26,
      _syncMsg: 27,
      _sendMsg: 29,
      _createGroup: 30,
      _dismissGroup: 31,
      _quitGroup: 32,
      _joinGroup: 33,
      _confirmJoinGroup: 34,
      _inviteJoinGroup: 35,
      _getGroupDetail: 36,
      _getOwnGroups: 37,
      _forbidMemberSpeak: 38,
      _modifyGroup: 39,
      _confirmInviteJoin: 40,
      _searchGroups: 41,
      _queryGroupMembers: 42,
      _deleteGroupMember: 43,
      _queryGroupMemberCard: 44,
      _modifyMemberCard: 45,
      _setGroupMessageRule: 46,
      _mcmEventData: {
        _prototype: 126,
        _mcmEventDef: {
          _UserEvt_StartAsk: 1,
          _UserEvt_EndAsk: 2,
          _UserEvt_SendMSG: 3,
          _UserEvt_SendMail: 4,
          _UserEvt_SendWXMsg: 5,
          _UserEvt_GetAGList: 6,
          _UserEvt_RespAGList: 7,
          _UserEvt_IRCN: 8,
          _UserEvt_SendMCM: 9,
          _NotifyUser_QueueInfo: 10,
          _NotifyUser_StartAskResp: 11,
          _NotifyUser_EndAskResp: 12,
          _NotifyUser_StartConf: 13,
          _NotifyUser_StopConf: 14,
          _NotifyUser_EndAsk: 15,
          _NotifyUser_IRItemList: 16,
          _UserEvt_SelectItem: 17,
          _NotifyUser_StartRobotKF: 18,
          _NotifyUser_StopRobotKF: 19,
          _AgentEvt_KFOnWork: 47,
          _NotifyAgent_KFOnWorkResp: 48,
          _AgentEvt_KFOffWork: 49,
          _NotifyAgent_KFOffWorkResp: 50,
          _AgentEvt_KFStateOpt: 51,
          _NotifyAgent_KFStateResp: 52,
          _AgentEvt_SendMCM: 53,
          _AgentEvt_TransKF: 55,
          _NotifyAgent_TransKFResp: 56,
          _AgentEvt_EnterCallService: 57,
          _NotifyAgent_EnterCallSerResp: 58,
          _NotifyAgent_NewUserAsk: 59,
          _NotifyAgent_UserEndAsk: 60,
          _NotifyAgent_ImHistory: 61,
          _AgentEvt_Ready: 65,
          _AgentEvt_NotReady: 66,
          _AgentEvt_StartSerWithUser: 67,
          _AgentEvt_StopSerWithUser: 68,
          _AgentEvt_TransferQueue: 69,
          _AgentEvt_StartConf: 70,
          _AgentEvt_MakeCall: 71,
          _AgentEvt_AnswerCall: 72,
          _AgentEvt_ReleaseCall: 73,
          _AgentEvt_SendNotify: 74,
          _AgentEvt_ExitConf: 75,
          _NotifyAgent_NewUserCallin: 76,
          _NotifyAgent_UserReleaseCall: 77,
          _NotifyAgent_ReadyResp: 78,
          _NotifyAgent_NotReadyResp: 79,
          _NotifyAgent_UserCallEstablish: 80,
          _AgentEvt_RejectUser: 81,
          _NotifyAgent_RejectUserResp: 82,
          _NotifyAgent_StartConfResp: 83,
          _NotifyAgent_ExitConfResp: 84,
          _NotifyAgent_ExitConf: 85,
          _NotifyAgent_InviteJoinConf: 86,
          _AgentEvt_ForceJoinConf: 87,
          _NotifyAgent_ForceJoinConfResp: 88,
          _NotifyAgent_TransferNewUser: 89,
          _NotifyAgent_TransferQueueResp: 90,
          _NotifyAgent_ForceStartConf: 91,
          _AgentEvt_ForceTransfer: 92,
          _NotifyAgent_ForceTransferResp: 93,
          _NotifyAgent_ForceTransfernewUser: 94,
          _NotifyAgent_CallState: 95,
          _NotifyAgent_StopSerWithUserResp: 96,
          _AgentEvt_QueryQueueInfo: 97,
          _NotifyAgent_QueryQueueInfoResp: 98,
          _NotifyAgent_StartSerWithUserResp: 99,
          _AgentEvt_ReservedForUser: 100,
          _NotifyAgent_ReservedForUserResp: 101,
          _AgentEvt_CancelReserved: 102,
          _NotifyAgent_CancelReservedResp: 103,
          _NotifyAgent_ReservedUserAsk: 104,
          _AgentEvt_StartSessionTimer: 105,
          _NotifyAgent_StartSessionTimerResp: 106,
          _NotifyAgent_STExpired: 107,
          _AgentEvt_MonitorAgent: 108,
          _NotifyAgent_MonitorAgentResp: 109,
          _AgentEvt_CancelMonitorAgent: 110,
          _NotifyAgent_CancelMonitorAgentResp: 111,
          _AgentEvt_QueryAgentInfo: 112,
          _NotifyAgent_QueryAgentInfoResp: 113,
          _AgentEvt_SerWithTheUser: 114,
          _NotifyAgent_SerWithTheUserResp: 115,
          _AgentEvt_TransKFStartSerWithUser: 116,
          _AgentEvt_ForceTransferStartSerWithUser: 117,
          _AgentEvt_ForceEndService: 118,
          _NotifyAgent_ForceEndService: 119,
          _NotifyUser_ForceEndService: 120,
          _NotifyAgent_ForceEndServiceResp: 121,
          _NotifyAgent_JoinConfResp: 122,
          _AgentEvt_JoinConf: 123,
          _NotifyAgent_AgentSendMsg: 124,
          _NotifyUser_SendMSGResp: 125,
          _NotifyAgent_SendMCMResp: 126,
          _NotifyAgent_AgentJoinIM: 127,
          _NotifyAgent_AgentEndIMService: 128,
          _NotifyAgent_ExitIMService: 129,
          _NotifyAgent_TransferResult: 130
        },
        _mcmType: {
          _MCMType_txt: 1,
          _MCMType_audio: 2,
          _MCMType_video: 3,
          _MCMType_emotion: 4,
          _MCMType_pos: 5,
          _MCMType_file: 6
        },
        _mcmAgentState: {
          _AgentTelStat_noready: 0,
          _AgentTelStat_idle: 1,
          _AgentTelStat_locking: 2,
          _AgentTelStat_talking: 3,
          _AgentTelStat_linebusy: 4,
          _AgentTelStat_offwork: 9,
          _AgentImStat_offline: 10,
          _AgentImStat_online: 11,
          _AgentImStat_idle: 12,
          _AgentImStat_offwork: 13,
          _AgentImStat_working: 14,
          _AgentImStat_workingfull: 15,
          _AgentImStat_suspend: 16
        },
        _mcmChannel: {
          _MCType_im: 0,
          _MCType_wx: 1,
          _MCType_mail: 2,
          _MCType_sms: 3,
          _MCType_fax: 4
        }
      },
      _getUserState: 71,
      _callRoute: 127,
      _deleteReadMsg: 72,
      _msgOperation: 72,
      _setGroupMemberRole: 74,
      _setTopContact: 77,
      _getTopContact: 78,
      _chatRoom: {
        ChatRoom_MESSAGE: 14,
        MSG_SEND_LiveChatRoom_MESSAGE: 160,
        _enterChatRoom: 161,
        _fetchChatroomInfo: 162,
        _fetchChatroomMembers: 163,
        _updateChatroomInfo: 164,
        _updateChatRoomMemberRole: 165,
        _updateMyChatroomMemberInfo: 166,
        _kickMember: 167,
        _updateMemberOption: 168,
        _exitChatRoom: 169
      },
      _ConferenceMessage: 140,
      _ConferenceNotice: 141,
      friendMsg: 100
    },
    _httpType: {
      _attachStart: 1,
      _attachEnd: 2,
      _historyMessage: 3,
      _recentContact: 4,
      _userDevice: 5
    },
    _voipCallData: {
      _iceServers: [],
      _peerConnection: null,
      _callEventCallId: null,
      _called: null,
      _caller: null,
      _inviteSdp: null,
      _voipOtherView: null,
      _voipLocalView: null,
      _localMediaStream: null,
      _remoteMediaStream: null,
      _connected: false,
      _voipCallType: null,
      _msgRouterMap: {},
      _releaseCallback: null,
      _releaseCallbackError: null,
      _needVideo: false,
      _needAudio: false,
      _sender: []
    },
    _errcode: {
      _SUCC: 200,
      _NO_LOGIN: 170003,
      _NOT_SUPPORT_H5: 174001,
      _NO_REQUIRED_PARAM: 170002,
      _PARAM_TYPE_ERR: 170012,
      _NETWORK_ERR: 174002,
      _NETWORK_TIME_OUT: 174003,
      _FILE_PARAM_ERROR: 170012,
      _RESP_TIME_OUT: 171137,
      _LOGIN_NO_USERNAME: 170002,
      _LOGIN_NO_PWD: 170002,
      _GROUP_NO_GROUPID: 170002,
      _TEXT_TOO_LONG: 170001,
      _FILE_TOO_LARGE: 170001,
      _PARAM_OUT_OF_LENGTH: 170001,
      _VOIP_NO_MEDIA: 174004,
      _VOIP_MEDIA_ERROR: 174005,
      _VOIP_NO_VIDEO: 170002,
      _REQUEST_TOO_FREQUENT: 174006,
      _CHARSET_ILLEGAl: 170012,
      _NOT_SUPPORT_FILE: 174007,
      _NOT_SUPPORT_CALL: 174008,
      _NOT_SUPPORT_URL: 174009,
      _NOT_SUPPORT_RECORDER: 174012,
      _NO_RESOURCE_STREAM: 174010,
      _FILE_SOURCE_ERROR: 174011,
      _FILE_FILEREADER_ERROR: 174012,
      _PEERCONNECTION_ERROR: 174013,
      _MEDIASTATE_ERROR: 174014
    },
    _requestTime: null,
    _requestCounter: 0,
    _requestLimit: 300,
    _synMsgMaxNumLimit: 100,
    _newUserState: false,
    _groupConfig: {
      _groupArray: [],
      _groupMemberArray: [],
      _builder: null
    },
    localStorage: null,
    hasLocalStorage: true,
    jsonp: function (url, param, callback, onError) {
      var p = "";
      if (param) {
        p = "&";
        for (i in param) {
          p += i + "=" + param[i] + "&"
        }
      }
      var c = "ytx" + parseInt(Math.random() * 1000000) + "_" + new Date().getTime();
      window[c] = function (e) {
        callback(e)
      };
      var urq = url + "?cb=" + c + p;
      var s = document.createElement('script');
      s.src = urq;
      var tar = document.querySelector("body");
      tar.appendChild(s);
      s.onload = function (e) {
        tar.removeChild(s);
        delete window[c]
      };
      s.onerror = function (err) {
        onError(err);
        delete window[c]
      }
    },
    setlocalStorage: function (version) {
      if (!YTX_CONFIG.hasLocalStorage) {
        return
      }
      if (typeof version == "number") {
        version.toString()
      }
      window.localStorage[this._userAcc] = version
    },
    getlocalStorage: function () {
      if (!YTX_CONFIG.hasLocalStorage) {
        return YTX_CONFIG._msgVersion
      }
      var s = null;
      if ((s = window.localStorage[this._userAcc]) == undefined) {
        window.localStorage[this._userAcc] = 0;
        return "0"
      }
      return s
    },
    _sendMsg: function (content) {
      var curTime = new Date().getTime();
      if (!YTX_CONFIG._requestTime) {
        YTX_CONFIG._requestTime = curTime;
        YTX_CONFIG._requestCounter = 0
      } else if ((curTime - YTX_CONFIG._requestTime) > 60 * 1000) {
        YTX_CONFIG._requestTime = curTime;
        YTX_CONFIG._requestCounter = 0
      }
      if (YTX_CONFIG._requestCounter++ < YTX_CONFIG._requestLimit) {
        YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "send msg : " + content);
        YTX_CONFIG._socket.send(content)
      } else {
        var json = JSON.parse(content);
        var msgLite = json["MsgLite"];
        var clientNo = msgLite["3"];
        var request = YTX_CONFIG._clientMap[clientNo];
        try {
          clearTimeout(request.timeout)
        } catch (e) {
          console.log("Cannot read property 'timeout' of undefined")
        }
        var onError = request.onError;
        var resp = {};
        resp.code = YTX_CONFIG._errcode._REQUEST_TOO_FREQUENT;
        resp.msg = 'request too quick, please wait a minute.';
        onError(resp)
      }
    },
    _generateClientNo: function (callback, onError, msgId, endVersion, type, repeat, orignMsgId, notUpdate) {
      var clientNo;
      if (notUpdate) {
        clientNo = YTX_CONFIG._ClientNo
      } else {
        clientNo = ++YTX_CONFIG._ClientNo
      }
      var data = {};
      if (!!callback) {
        data.callback = callback
      } else {
        data.callback = function () {}
      }
      data.onError = onError;
      if (!!msgId) {
        data.msgId = msgId
      }
      if (!!endVersion) {
        data.endVersion = endVersion
      }
      if (!!type) {
        data.type = type
      }
      if (!!repeat) {
        data.repeat = repeat
      }
      if (!!orignMsgId) {
        data.orignMsgId = orignMsgId
      }
      var i = setTimeout(function () {
        var resp = {};
        if (YTX_CONFIG._loginStatus == 2) {
          YTX_CONFIG._loginStatus = 1
        }
        resp.code = YTX_CONFIG._errcode._RESP_TIME_OUT;
        if (!!orignMsgId) {
          resp.msgId = orignMsgId
        }
        if (!!msgId) {
          resp.msgClientNo = msgId
        }
        resp.msg = 'request time out.', onError(resp);
        console.log('time out clientNo is: ' + clientNo);
        delete YTX_CONFIG._clientMap[clientNo]
      }, YTX_CONFIG._timeOutSecond * 1000);
      data.timeout = i;
      YTX_CONFIG._clientMap[clientNo] = data;
      return clientNo
    },
    _noticeApp: function (obj) {
      var msgId = obj.msgDateCreated + '|' + obj.version;
      obj.msgId = msgId;
      if (obj.msgType == YTX_CONFIG._prototype._msg_CMD) {
        var resp = YTX_CONFIG._protobuf._parseNoticeMsg(obj);
        resp.msgId = obj.msgId;
        if (!!YTX_CONFIG._noticeListener) {
          YTX_CONFIG._noticeListener(resp)
        } else {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "noticeLinstener is null   ")
        }
      } else if (obj.msgType == YTX_CONFIG._prototype._msg_DEL) {
        var resp = YTX_CONFIG._protobuf._parseMsgNotify(obj);
        if (!!YTX_CONFIG._msgNotifyListener) {
          YTX_CONFIG._msgNotifyListener(resp)
        } else {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "_msgNotifyListener is null : ")
        }
      } else if (obj.msgType == YTX_CONFIG._prototype._chatRoom.ChatRoom_MESSAGE) {
        var resp = YTX_CONFIG._protobuf._parseChatRoomMsgInner(obj);
        if (!!YTX_CONFIG._charRoomLinstener) {
          YTX_CONFIG._charRoomLinstener(resp)
        } else {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "onCharRoomEventLinstener is null : ")
        }
      } else if (obj.msgType == YTX_CONFIG._prototype.friendMsg) {
        YTX_CONFIG._friendNoticeMsgListener(obj)
      } else if (!!obj.mcmEvent && obj.mcmEvent != 0) {
        if (!!YTX_CONFIG._mcmListener) {
          YTX_CONFIG._mcmListener(obj)
        } else {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "_mcmListener is null : ")
        }
      } else {
        if (!!YTX_CONFIG._pushListener) {
          YTX_CONFIG._pushListener(obj)
        } else {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "_pushListener is null : ")
        }
      }
    },
    _processSyncMsg: function (type, endVersion, requestType) {
      if (1 == type && YTX_CONFIG._syncMsgPorcessing) {
        return
      };
      if (!!endVersion && endVersion < YTX_CONFIG._maxMsgVersion) {
        var type = (!!requestType) ? requestType : -1;
        var sendStr = YTX_CONFIG._protobuf._buildSyncMessage(YTX_CONFIG._msgVersion + 1, endVersion, type, reGet);
        if (!!sendStr) {
          YTX_CONFIG._syncMsgPorcessing = true;
          YTX_CONFIG._sendMsg(sendStr)
        } else {
          YTX_CONFIG._syncMsgPorcessing = false
        }
      } else if (YTX_CONFIG._msgVersion < YTX_CONFIG._maxMsgVersion) {
        var end = YTX_CONFIG._maxMsgVersion;
        for (var i in YTX_CONFIG._receiveMsgBuf) {
          if (i == (YTX_CONFIG._msgVersion + 1)) {
            var msg = YTX_CONFIG._receiveMsgBuf[(YTX_CONFIG._msgVersion + 1)];
            delete YTX_CONFIG._receiveMsgBuf[(YTX_CONFIG._msgVersion + 1)];
            YTX_CONFIG._msgVersion = YTX_CONFIG._msgVersion + 1;
            if (!!msg) {
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "config message : " + YTX_CONFIG);
              YTX_CONFIG._noticeApp(msg)
            }
          } else {
            end = i - 1;
            break
          }
        }
        if (YTX_CONFIG._msgVersion != YTX_CONFIG._maxMsgVersion) {
          var sendStr = YTX_CONFIG._protobuf._buildSyncMessage(YTX_CONFIG._msgVersion + 1, end, 0, reGet);
          if (!!sendStr) {
            YTX_CONFIG._syncMsgPorcessing = true;
            YTX_CONFIG._sendMsg(sendStr)
          } else {
            YTX_CONFIG._syncMsgPorcessing = false
          }
        } else {
          YTX_CONFIG._syncMsgPorcessing = false
        }
      } else {
        YTX_CONFIG._syncMsgPorcessing = false
      }

      function reGet(err) {
        if (err.code === 171137) {
          YTX_CONFIG._syncMsgPorcessing = false;
          YTX_CONFIG._processSyncMsg(type, endVersion, requestType)
        }
      }
    },
    getLoginToken: function () {
      if (YTX_CONFIG.hasLocalStorage) {
        var token = localStorage.getItem("YTX_multUser#" + YTX_CONFIG._userAcc);
        return token ? token : null
      } else {
        return null
      }
    },
    _onResponse: function (obj) {
      YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "receive msg : " + obj);
      obj = JSON.parse(obj);
      if (!!obj["hb"]) {
        YTX_CONFIG._heartBeatCallBack(obj["hb"]);
        return
      }
      if (!obj["MsgLite"]) {
        if (!!obj["Http"]) {
          YTX_CONFIG._onHttpResonse(obj)
        } else if (!!obj["resp"]) {
          YTX_CONFIG._onRequestResp(obj)
        }
        return
      }
      obj = obj["MsgLite"];
      if (!!obj["6"] && obj["6"] != YTX_CONFIG._errcode._SUCC) {
        YTX_CONFIG._onResponseErr(obj);
        return
      }
      var type = obj["1"];
      if (type == YTX_CONFIG._prototype._callRoute) {
        var data = YTX_CONFIG._clientMap[obj["3"]];
        if (data && !!data.timeout) {
          clearTimeout(data.timeout)
        };
        if (obj["6"] == YTX_CONFIG._errcode._SUCC) {
          if (!!data.callback) {
            var resp = {};
            resp.code = 200;
            data.callback(resp)
          }
        } else {
          if (!!data && !!data.onError) {
            var resp = {};
            resp.code = obj["6"];
            data.onError(resp)
          }
        }
        if (!!obj["2"] && obj["2"]["CallEventData"]["13"].indexOf("confid=") === -1) {
          if (YTX_CONFIG._routerSwitch && !YTX_CONFIG._voipCallData._msgRouterMap[obj["2"]["CallEventData"]["2"]]) {
            if (obj["2"]["CallEventData"]["1"] == 1 || obj["2"]["CallEventData"]["1"] == 2) {
              YTX_CONFIG._voipCallData._msgRouterMap[obj["2"]["CallEventData"]["2"]] = obj[9]
            }
          }
          var callEventData = YTX_CONFIG._protobuf._parseCallEventData(obj);
          YTX_CONFIG._processVoip(callEventData)
        } else if (!!obj["2"] && obj["2"]["CallEventData"]["13"].indexOf("confid=") > -1) {
          var meetingData = YTX_CONFIG._protobuf._parseOldMeetingEventData(obj);
          if (meetingData.confid && !YTX_CONFIG._meetingData[meetingData.confid]) {
            YTX_CONFIG._meetingData[meetingData.confid] = true
          } else {
            return
          }
          YTX_CONFIG._oldMeetingListener({
            caller: meetingData.getCaller(),
            called: meetingData.getCalled(),
            confid: meetingData.confid
          })
        }
        return
      } else if (type == YTX_CONFIG._prototype._pushMsg) {
        var pushs = obj["2"]["PushMsg"];
        if (pushs[2] === 13) return;
        if (pushs["1"] && YTX_CONFIG.hasLocalStorage) {
          YTX_CONFIG.setlocalStorage(pushs["1"])
        }
        var pushMsg = YTX_CONFIG._protobuf._parsePushMsgResp(obj);
        if (!pushMsg.version) {
          if (pushMsg.msgDomain == "undefined" && !!pushMsg.msgContent && pushMsg.msgType === 12) {
            pushMsg.msgDomain = pushMsg.msgContent;
            pushMsg.msgContent = null
          };
          YTX_CONFIG._noticeApp(pushMsg);
          return
        };
        if (YTX_CONFIG._msgVersion + 1 === pushMsg.version) {
          if (YTX_CONFIG._syncMsgPorcessing) {
            YTX_CONFIG._receiveMsgBuf[pushMsg.version] = pushMsg
          } else {
            YTX_CONFIG._msgVersion += 1;
            YTX_CONFIG._noticeApp(pushMsg)
          }
        } else if (pushMsg.version > YTX_CONFIG._msgVersion) {
          YTX_CONFIG._maxMsgVersion = (YTX_CONFIG._maxMsgVersion < pushMsg.version) ? pushMsg.version : YTX_CONFIG._maxMsgVersion;
          YTX_CONFIG._receiveMsgBuf[pushMsg.version] = pushMsg;
          YTX_CONFIG._processSyncMsg(1)
        };
        if (YTX_CONFIG._msgVersion % 10 == 0) {
          YTX_CONFIG._confirmMsg()
        };
        return
      } else if (type == YTX_CONFIG._prototype._pushMsgNotify) {
        var notifyResp = YTX_CONFIG._protobuf._parsePushMsgNotifyResp(obj);
        var msgVersion = notifyResp.version;
        YTX_CONFIG._maxMsgVersion = msgVersion;
        YTX_CONFIG._processSyncMsg(1);
        return
      } else if (type == YTX_CONFIG._prototype._syncMsg) {
        var request = YTX_CONFIG._clientMap[obj["3"]];
        if (!request) {
          YTX_CONFIG._log(YTX_CONFIG._logLev._WARN, "receive a unrequest response, clientNo:" + obj["3"]);
          return
        };
        var resps = YTX_CONFIG._protobuf._parseSyncMsgResp(obj, request);
        var continuous = true;
        var end = request.endVersion;
        for (var i = 0; i < resps.length; i++) {
          var resp = resps[i];
          if (!resp.version) {
            continue
          }
          if (YTX_CONFIG._msgVersion >= resp.version) {
            YTX_CONFIG._noticeApp(resp)
          } else if (YTX_CONFIG._msgVersion + 1 == resp.version) {
            YTX_CONFIG._msgVersion = (resp.version > YTX_CONFIG._msgVersion) ? resp.version : YTX_CONFIG._msgVersion;
            if (YTX_CONFIG._msgVersion % 10 == 0) {
              YTX_CONFIG._confirmMsg()
            };
            if (YTX_CONFIG._receiveMsgBuf[resp.version]) {
              delete YTX_CONFIG._receiveMsgBuf[resp.version]
            }
            YTX_CONFIG._noticeApp(resp);
            continue
          } else {
            if (continuous) {
              continuous = false;
              end = resp.version - 1
            }
            YTX_CONFIG._receiveMsgBuf[resp.version] = resp
          }
        };
        if (!continuous) {
          YTX_CONFIG._syncMsgPorcessing = false;
          YTX_CONFIG._processSyncMsg(2, end, request.type)
        } else {
          YTX_CONFIG._syncMsgPorcessing = false;
          YTX_CONFIG._processSyncMsg(2)
        }
      } else if (type == YTX_CONFIG._prototype._mcmEventData._prototype) {
        YTX_CONFIG._protobuf._parseMcmMsg(obj);
        var request = YTX_CONFIG._clientMap[obj["3"]];
        if (!request) {
          return
        }
        try {
          clearTimeout(request.timeout)
        } catch (e) {
          console.log("Cannot read property 'timeout' of undefined")
        }
        if (!!request.callback) {
          if (!!request.msgId) {
            var resp = {};
            resp.msgId = request.msgId;
            request.callback(resp)
          } else {
            request.callback()
          }
        }
        return
      } else if (type == YTX_CONFIG._prototype._kickOff) {
        var loginRsp = YTX_CONFIG._protobuf._parseKickOffResp(obj);
        if (!!YTX_CONFIG._connectStatListener) {
          YTX_CONFIG._connectStatListener(loginRsp)
        }
        YTX_CONFIG._confirmMsg();
        if (!!YTX_CONFIG._voipCallData._callEventCallId) {
          YTX_CONFIG._Media.count = 0;
          var releaseCallBuilder = new RL_YTX.ReleaseCallBuilder();
          releaseCallBuilder.setCallId(YTX_CONFIG._voipCallData._callEventCallId);
          releaseCallBuilder.setCaller(YTX_CONFIG._voipCallData._caller);
          releaseCallBuilder.setCalled(YTX_CONFIG._voipCallData._called);
          RL_YTX.releaseCall(releaseCallBuilder, function (sucObj) {}, function (errObj) {})
        }
        YTX_CONFIG._logout();
        return
      } else if (type === YTX_CONFIG._prototype._chatRoom.MSG_SEND_LiveChatRoom_MESSAGE && !obj["3"]) {
        var chatRoomMsg = YTX_CONFIG._protobuf._parseChatRoomMsg(obj);
        YTX_CONFIG._noticeApp(chatRoomMsg);
        return
      } else if (type === YTX_CONFIG._prototype._ConferenceNotice) {
        var cn = YTX_CONFIG._protobuf._parseConferenceNotice(obj);
        if (YTX_CONFIG._conferenceNotifyLinstener) {
          YTX_CONFIG._conferenceNotifyLinstener(cn)
        }
        return
      }
      var request = YTX_CONFIG._clientMap[obj["3"]];
      if (!request) {
        YTX_CONFIG._log(YTX_CONFIG._logLev._WARN, "receive a unrequest response, clientNo:" + obj["3"]);
        return
      }
      var callback = request.callback;
      try {
        clearTimeout(request.timeout)
      } catch (e) {
        console.log("Cannot read property 'timeout' of undefined")
      }
      if (!callback) {
        return
      }
      if (type == YTX_CONFIG._prototype._login) {
        var loginRsp = YTX_CONFIG._protobuf._parseLoginResp(obj);
        if (loginRsp.authState == 1) {
          var loginRsp = YTX_CONFIG._protobuf._parseKickOffResp(obj);
          YTX_CONFIG._logout();
          if (!!YTX_CONFIG._connectStatListener) {
            YTX_CONFIG._connectStatListener(loginRsp)
          }
          return
        }
        YTX_CONFIG._loginStatus = 3;
        YTX_CONFIG._reLoginNum = 0;
        YTX_CONFIG._heartBeatErrNum = 0;
        if (!loginRsp.authToken) {
          loginRsp.authToken = obj["8"]
        }
        if (!loginRsp.authToken && !!YTX_CONFIG._token) {
          loginRsp.authToken = YTX_CONFIG._token
        }
        if (YTX_CONFIG._msgVersion == 0) {
          var v = parseInt(YTX_CONFIG.getlocalStorage());
          if (loginRsp.historyver > v) {
            YTX_CONFIG._msgVersion = loginRsp.historyver;
            YTX_CONFIG.setlocalStorage(loginRsp.historyver)
          } else if (v > loginRsp.version) {
            YTX_CONFIG.setlocalStorage(loginRsp.version);
            YTX_CONFIG._msgVersion = loginRsp.version
          } else {
            YTX_CONFIG._msgVersion = v
          }
        }
        YTX_CONFIG._maxMsgVersion = loginRsp.version;
        if (YTX_CONFIG._maxMsgVersion - YTX_CONFIG._msgVersion > 500) {
          YTX_CONFIG._msgVersion = YTX_CONFIG._maxMsgVersion - 500
        }
        if (YTX_CONFIG._msgVersion < YTX_CONFIG._maxMsgVersion) {
          YTX_CONFIG._processSyncMsg(2)
        }
        loginRsp.historyver = loginRsp.version;
        if (YTX_CONFIG._loginType == 2) {
          YTX_CONFIG._sessionId = loginRsp.authToken;
          YTX_CONFIG._token = loginRsp.authToken
        } else {
          YTX_CONFIG._token = loginRsp.authToken;
          YTX_CONFIG._sessionId = loginRsp.authToken
        }
        var transferPolicy = loginRsp.transferPolicy;
        var ipSpeedTestPolicy = loginRsp.ipSpeedTestPolicy;
        delete loginRsp.transferPolicy;
        delete loginRsp.ipSpeedTestPolicy;
        if (YTX_CONFIG._isReconnect) {
          YTX_CONFIG._isReconnect = false;
          YTX_CONFIG._connectStateChange(3, "reconnect to server suc!")
        }
        if (!!YTX_CONFIG._intervalId) {
          window.clearInterval(YTX_CONFIG._intervalId)
        }
        YTX_CONFIG._intervalId = window.setInterval(YTX_CONFIG._heartBeat, YTX_CONFIG._heartBeatInterval._WIFI * 1000);
        if (!!YTX_CONFIG._failIntervalId) {
          clearInterval(YTX_CONFIG._failIntervalId);
          YTX_CONFIG._failIntervalId = null
        }
        if (!!callback) {
          callback(loginRsp)
        }
        if (!!transferPolicy) {
          YTX_CONFIG._doTransferPolicy(transferPolicy)
        }
        if (!!ipSpeedTestPolicy) {
          YTX_CONFIG._doIpSpeedTest(ipSpeedTestPolicy)
        }
        if (!!YTX_CONFIG.chatRommId) {
          var enterChatroomBuilder = new RL_YTX.EnterChatroomBuilder();
          enterChatroomBuilder.setRoomId(YTX_CONFIG.chatRommId);
          enterChatroomBuilder.setNickName(RL_YTX.chatRommNickName);
          RL_YTX.enterChatroom(enterChatroomBuilder, function (e) {
            console.log('reenter chatroom success')
          }, function (err) {
            console.log(err)
          })
        } else {
          YTX_CONFIG.chatRommId = RL_YTX.chatRommId;
          YTX_CONFIG.chatRommNickName = RL_YTX.chatRommNickName
        }
        if (parseInt(YTX_CONFIG.getlocalStorage()) === 0) {
          YTX_CONFIG._uploadUserDevice()
        }
      } else if (type == YTX_CONFIG._prototype._logout) {
        RL_YTX.chatRommId = null;
        YTX_CONFIG._logout();
        callback(YTX_CONFIG._protobuf._parseCodeResp(obj))
      } else if (type == YTX_CONFIG._prototype._sendMsg) {
        callback(YTX_CONFIG._protobuf._parseSendMsgResp(obj, request))
      } else if (type == YTX_CONFIG._prototype._getMyInfo || type == YTX_CONFIG._prototype._setMyInfo) {
        callback(YTX_CONFIG._protobuf._parseGetMyInfo(obj))
      } else if (type == YTX_CONFIG._prototype._createGroup) {
        callback(YTX_CONFIG._protobuf._parseCreateGroupResp(obj))
      } else if (type == YTX_CONFIG._prototype._getOwnGroups) {
        YTX_CONFIG._protobuf._parseGetGroupListResp(obj, callback, request.onError)
      } else if (type == YTX_CONFIG._prototype._queryGroupMembers) {
        YTX_CONFIG._protobuf._parseGetGroupMemberListResp(obj, callback, request.onError)
      } else if (type == YTX_CONFIG._prototype._getGroupDetail) {
        callback(YTX_CONFIG._protobuf._parseGetGroupDetailResp(obj))
      } else if (type == YTX_CONFIG._prototype._searchGroups) {
        callback(YTX_CONFIG._protobuf._parseSearchGroupsResp(obj))
      } else if (type == YTX_CONFIG._prototype._queryGroupMemberCard) {
        callback(YTX_CONFIG._protobuf._parseQueryGroupMemberCard(obj))
      } else if (type == YTX_CONFIG._prototype._getUserState) {
        if (YTX_CONFIG._newUserState) {
          callback(YTX_CONFIG._protobuf._parseGetUserState_multy(obj))
        } else {
          callback(YTX_CONFIG._protobuf._parseGetUserState(obj))
        }
      } else if (type == YTX_CONFIG._prototype._chatRoom._enterChatRoom) {
        callback(YTX_CONFIG._protobuf._parseEnterChatroomResp(obj))
      } else if (type == YTX_CONFIG._prototype._chatRoom._fetchChatroomInfo) {
        callback(YTX_CONFIG._protobuf._parseFetchChatroomInfoResp(obj))
      } else if (type == YTX_CONFIG._prototype._chatRoom._fetchChatroomMembers) {
        callback(YTX_CONFIG._protobuf._parseFetchChatroomMembersResp(obj))
      } else if (type == YTX_CONFIG._prototype._chatRoom.MSG_SEND_LiveChatRoom_MESSAGE) {
        if (!obj["2"]) {
          callback(YTX_CONFIG._protobuf._parseSendChatroomMsgResp(obj, request))
        } else {
          var chatRoomMsg = YTX_CONFIG._protobuf._parseChatRoomMsg(obj);
          YTX_CONFIG._noticeApp(chatRoomMsg)
        }
        return
      } else if (type == YTX_CONFIG._prototype._getTopContact) {
        callback(YTX_CONFIG._protobuf._parseGetTopContactResp(obj))
      } else if (type == YTX_CONFIG._prototype._ConferenceMessage) {
        callback(YTX_CONFIG._protobuf._parseConferenceMessageResp(obj))
      } else {
        callback(YTX_CONFIG._protobuf._parseCodeResp(obj))
      }
      if (type != YTX_CONFIG._prototype._sendMsg) {
        delete YTX_CONFIG._clientMap[obj["3"]]
      }
    },
    _onHttpResonse: function (obj) {
      obj = obj["Http"];
      if (!obj) {
        return
      }
      if (!!obj["6"] && obj["6"] != YTX_CONFIG._errcode._SUCC) {
        YTX_CONFIG._onResponseErr(obj);
        return
      }
      var request = YTX_CONFIG._clientMap[obj["3"]];
      if (!request) {
        YTX_CONFIG._log(YTX_CONFIG._logLev._WARN, "receive a unrequest response, clientNo:" + obj["3"]);
        return
      }
      var callback = request.callback;
      try {
        clearTimeout(request.timeout)
      } catch (e) {
        console.log("Cannot read property 'timeout' of undefined")
      }
      if (!callback) {
        return
      }
      var type = obj["1"];
      if (type == YTX_CONFIG._httpType._historyMessage) {
        var data = obj;
        var resp = YTX_CONFIG._protobuf._parseGetHistoryMsg(data);
        callback(resp)
      } else if (type == YTX_CONFIG._httpType._recentContact) {
        var data = obj;
        var resp = YTX_CONFIG._protobuf._parseGetRecentContactList(data);
        callback(resp)
      } else {
        callback(YTX_CONFIG._protobuf._parseCodeResp(obj))
      }
    },
    _onRequestResp: function (obj) {
      console.log(obj, "_onRequestResp");
      obj = obj["resp"];
      var request = YTX_CONFIG._clientMap[obj["3"]];
      if (!request) {
        YTX_CONFIG._log(YTX_CONFIG._logLev._WARN, "receive a unrequest response, clientNo:" + obj["3"]);
        return
      }
      var callback = request.callback;
      try {
        clearTimeout(request.timeout)
      } catch (e) {
        console.log("Cannot read property 'timeout' of undefined")
      }
      if (!callback) {
        return
      }
      obj["2"]["fileUrl"] = Base64.decode(YTX_CONFIG._lvs_servers);
      callback(obj["2"])
    },
    _onSyncMsgRespErr: function (obj) {
      YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "syncMsgResp error : " + obj.code)
    },
    _processVoip: function (callEventData) {
      if (!YTX_CONFIG._voipCallData._callEventCallId && callEventData.getCallEvent() != 1) {
        delete YTX_CONFIG._voipCallData._msgRouterMap[callEventData._callId];
        if (!!YTX_CONFIG._voipCallData._releaseCallbackError && callEventData._callEvent == 10) {
          var obj = [];
          obj["code"] = callEventData._reason;
          obj["msg"] = "cancel voip error";
          return
        };
        if (!!YTX_CONFIG._voipCallData._releaseCallback) {
          var obj = [];
          obj["callId"] = callEventData._callId;
          obj["calltype"] = YTX_CONFIG._voipCallData._voipCallType;
          YTX_CONFIG._voipCallData._releaseCallback(obj);
          return
        };
        return
      }
      if (YTX_CONFIG._voipCallData._callEventCallId != callEventData.getCallId() && callEventData.getCallEvent() != 1) {
        return
      }
      if (callEventData.getCallEvent() == 1) {
        if (!YTX_CONFIG._voipCallData._callEventCallId) {
          YTX_CONFIG._voipCallData._callEventCallId = callEventData.getCallId();
          YTX_CONFIG._voipCallData._caller = callEventData.getCaller();
          YTX_CONFIG._voipCallData._called = callEventData.getCalled();
          var resp = {};
          resp.callId = callEventData.getCallId();
          resp.caller = callEventData.getCaller();
          resp.called = callEventData.getCalled();
          resp.userdata = callEventData.getUserData();
          resp.msg = "calling";
          var sdpStr = callEventData.getStrSDP();
          YTX_CONFIG._voipCallData._inviteSdp = sdpStr;
          var type = 0;
          if (sdpStr.indexOf('m=audio') > -1) {
            if (sdpStr.indexOf('m=video') > -1) {
              type = 1
            }
          }
          YTX_CONFIG._voipCallData._voipCallType = type;
          resp.callType = type;
          resp.state = 6;
          resp.code = 200;
          if (!YTX_CONFIG.util.getUserMedia() || !YTX_CONFIG.util.getPeerConnection()) {
            resp.code = YTX_CONFIG._errcode._NOT_SUPPORT_CALL
          }
          YTX_CONFIG._voipListener(resp);
          var str;
          if (resp.code == 200) {
            callEventData.setCallEvent(2);
            callEventData.setStrSDP();
            str = YTX_CONFIG._protobuf._buildCallEvent(callEventData, function () {}, function () {})
          } else {
            callEventData.setCallEvent(10);
            callEventData.setStrSDP();
            callEventData.setReason(603);
            str = YTX_CONFIG._protobuf._buildCallEvent(callEventData, function () {}, function () {});
            YTX_CONFIG._voipCallData._callEventCallId = null
          }
          if (!!str) {
            YTX_CONFIG._sendMsg(str)
          }
        } else if (callEventData.getCallId() == YTX_CONFIG._voipCallData._callEventCallId) {
          return
        } else if (callEventData.getCallId() != YTX_CONFIG._voipCallData._callEventCallId) {
          callEventData.setCallEvent(10);
          callEventData.setReason("486");
          callEventData.setStrSDP();
          var str = YTX_CONFIG._protobuf._buildCallEvent(callEventData, function () {}, function () {});
          YTX_CONFIG._sendMsg(str)
        }
      } else if (callEventData.getCallEvent() == 2) {
        var resp = {};
        resp.callId = callEventData.getCallId();
        resp.caller = callEventData.getCaller();
        resp.called = callEventData.getCalled();
        resp.userdata = callEventData.getUserData();
        resp.state = 1;
        resp.callType = YTX_CONFIG._voipCallData._voipCallType;
        resp.msg = "calling";
        resp.code = 200;
        YTX_CONFIG._voipListener(resp);
        YTX_CONFIG._voipReply200(callEventData)
      } else if (callEventData.getCallEvent() == 3) {
        if (!!callEventData.getStrSDP()) {
          YTX_CONFIG._setTelRemote(callEventData)
        }
        var resp = {};
        resp.callId = callEventData.getCallId();
        resp.caller = callEventData.getCaller();
        resp.called = callEventData.getCalled();
        resp.userdata = callEventData.getUserData();
        resp.state = 1;
        resp.msg = "calling";
        resp.callType = YTX_CONFIG._voipCallData._voipCallType;
        resp.code = 200;
        YTX_CONFIG._voipListener(resp)
      } else if (callEventData.getCallEvent() == 4) {
        if (!callEventData.getStrSDP()) {
          return
        }
        YTX_CONFIG._sendAck(callEventData);
        YTX_CONFIG._voipCallData._connected = true;
        var resp = {};
        resp.callId = callEventData.getCallId();
        resp.caller = callEventData.getCaller();
        resp.called = callEventData.getCalled();
        resp.state = 3;
        callEventData.getUserData() ? resp.userdata = callEventData.getUserData() : "";
        resp.msg = "opposite side accept";
        resp.callType = YTX_CONFIG._voipCallData._voipCallType;
        resp.code = 200;
        YTX_CONFIG._voipListener(resp)
      } else if (callEventData.getCallEvent() == 6) {
        var resp = {};
        resp.callId = callEventData.getCallId();
        resp.caller = callEventData.getCaller();
        resp.called = callEventData.getCalled();
        resp.userdata = callEventData.getUserData();
        resp.reason = "0";
        resp.state = 7;
        resp.callType = YTX_CONFIG._voipCallData._voipCallType;
        resp.msg = "the call has established";
        resp.code = 200;
        YTX_CONFIG._voipListener(resp)
      } else if (callEventData.getCallEvent() == 7 || callEventData.getCallEvent() == 8) {
        YTX_CONFIG._Media.count = 0;
        var resp = {};
        resp.callId = callEventData.getCallId();
        resp.caller = callEventData.getCaller();
        resp.called = callEventData.getCalled();
        resp.userdata = callEventData.getUserData();
        resp.reason = "0";
        resp.state = 5;
        resp.msg = "the call was stoped";
        resp.code = 200;
        resp.callType = YTX_CONFIG._voipCallData._voipCallType;
        YTX_CONFIG._voipListener(resp);
        YTX_CONFIG._releaseVoip();
        YTX_CONFIG._voipReply200(callEventData);
        delete YTX_CONFIG._voipCallData._msgRouterMap[callEventData._callId];
        clearInterval(YTX_CONFIG._voipTimer);
        YTX_CONFIG._voipTimestamp = 0
      } else if (callEventData.getCallEvent() == 10) {
        YTX_CONFIG._Media.count = 0;
        var resp = {};
        resp.callId = callEventData.getCallId();
        resp.caller = callEventData.getCaller();
        resp.called = callEventData.getCalled();
        if (!!callEventData.getReason()) {
          resp.reason = "175" + callEventData.getReason()
        } else {
          resp.reason = "0"
        }
        resp.code = 200;
        resp.userdata = callEventData.getUserData();
        resp.callType = YTX_CONFIG._voipCallData._voipCallType;
        resp.state = 4;
        resp.msg = "calling failed , maybe opposite side is busying";
        YTX_CONFIG._voipListener(resp);
        YTX_CONFIG._releaseVoip();
        YTX_CONFIG._voipReply200(callEventData);
        delete YTX_CONFIG._voipCallData._msgRouterMap[callEventData._callId]
      } else if (callEventData.getCallEvent() == 11 || callEventData.getCallEvent() == 12) {
        YTX_CONFIG._voipReply200(callEventData)
      } else if (callEventData.getCallEvent() == 15) {
        callEventData.setCallEvent(16);
        callEventData.setStrSDP();
        if (YTX_CONFIG._voipCallData._connected) {
          callEventData.setReason(0)
        }
        var str = YTX_CONFIG._protobuf._buildCallEvent(callEventData, function () {}, function () {});
        YTX_CONFIG._sendMsg(str)
      }
    },
    _voipReply200: function (callEventData) {
      callEventData.setCallEvent(4);
      callEventData.setStrSDP();
      var str = YTX_CONFIG._protobuf._buildCallEvent(callEventData, function () {}, function () {});
      YTX_CONFIG._sendMsg(str)
    },
    _doTransferPolicy: function (transferPolicy) {},
    _doIpSpeedTest: function (ipSpeedTestPolicy) {
      var type = ipSpeedTestPolicy["1"];
      if (type == 2) {
        var ipAdds = ipSpeedTestPolicy["2"];
        for (var i in ipAdds) {
          var ipAdd = ipAdds[i];
          if (ipAdd["3"] != YTX_CONFIG._WS_TYPE) {
            continue
          }
          var count = (!!ipSpeedTestPolicy["3"]) ? ipSpeedTestPolicy["3"] : YTX_CONFIG._ipSpeedTestConfig._count;
          var interval = (!!ipSpeedTestPolicy["4"]) ? ipSpeedTestPolicy["4"] : YTX_CONFIG._ipSpeedTestConfig._interval;
          var timeout = (!!ipSpeedTestPolicy["5"]) ? ipSpeedTestPolicy["5"] : YTX_CONFIG._ipSpeedTestConfig._timeout._WIFI;
          var num = 0,
            receiveNum = 0;
          var webSocket = new WebSocket('ws://' + ipAdd["1"] + ":" + ipAdd["2"]);
          var startTime, endTime, maxDelay = 0,
            minDelay = 0,
            totalDelay = 0;
          var tId = setTimeout(function () {
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "ipSpeedTest timeout...");
            webSocket.close()
          }, (interval * count + timeout));
          webSocket.tid = tId;
          webSocket._ip = ipAdd["1"];
          webSocket._port = ipAdd["2"];
          webSocket.num = 0;
          webSocket.receiveNum = 0;
          webSocket.onopen = function (event) {
            var wb = this;
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "start ipSpeedTest...");
            var intervalId = setInterval(function () {
              var tstamp = new Date().getTime();
              if (wb.num == 0) {
                wb.startTime = tstamp
              }
              var str = '{"hb":' + (tstamp) + '}';
              wb.send(str);
              wb.num++;
              if (wb.num >= count) {
                clearInterval(intervalId)
              }
            }, interval)
          };
          webSocket.onmessage = function (event) {
            var data = event.data;
            data = JSON.parse(data);
            this.endTime = new Date().getTime();
            var stime = data["hb"];
            var delay = this.endTime - stime;
            if (!this.totalDelay) {
              this.totalDelay = 0
            }
            this.totalDelay += delay;
            if (!this.maxDelay) {
              this.maxDelay = delay
            } else {
              if (this.maxDelay < delay) {
                this.maxDelay = delay
              }
            }
            if (!this.minDelay) {
              this.minDelay = delay
            } else {
              if (this.minDelay > delay) {
                this.minDelay = delay
              }
            }
            this.receiveNum++;
            if (this.receiveNum == count) {
              if (!!this.tid) {
                clearTimeout(this.tid)
              }
              this.close()
            }
          };
          webSocket.onclose = function (event) {
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "ipSpeedTest complete...");
            if (event.code > 1000) {
              console.warn('ipspeed socket has closed, error code :' + event.code + ': ' + event.reason + ': ' + event.wasClean)
            }
            var netWork = YTX_CONFIG._getNetWork();
            var lost, averageDelay, costtime;
            if (this.receiveNum > 0) {
              lost = (count - this.receiveNum) / count * 100;
              averageDelay = this.totalDelay / this.receiveNum
            } else {
              lost = 100
            }
            var jsonStr = '{\"IpSpeedResult\":{\"1\":' + netWork + ',' + '\"3\":\"' + this._ip + '\",' + '\"4\":' + this._port + ',' + '\"5\":' + lost;
            if (averageDelay > 0) {
              jsonStr += ',\"6\":' + averageDelay
            }
            if (this.minDelay > 0) {
              jsonStr += ',\"7\":' + this.minDelay
            }
            if (this.maxDelay > 0) {
              jsonStr += ',\"8\":' + this.maxDelay
            }
            if (!!ipSpeedTestPolicy["7"]) {
              jsonStr += ',\"11\":\"' + ipSpeedTestPolicy["7"] + '\"'
            }
            jsonStr += '}}';
            var str = '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._ipSpeedTest + ',\"2\":' + jsonStr + '}}';
            if (YTX_CONFIG._loginStatus == 3) {
              YTX_CONFIG._sendMsg(str)
            }
          }
        }
      } else if (type == 1) {}
    },
    _getNetWork: function () {
      return 1
    },
    _onResponseErr: function (obj) {
      var request = YTX_CONFIG._clientMap[obj["3"]];
      if (YTX_CONFIG._loginStatus == 2) {
        YTX_CONFIG._loginStatus = 1
      }
      if (!!request) {
        try {
          clearTimeout(request.timeout)
        } catch (e) {
          console.log("Cannot read property 'timeout' of undefined")
        }
      }
      if (obj["1"] == YTX_CONFIG._prototype._getMyInfo && obj["6"] == 520015) {
        var callback = request.callback;
        var resp = {};
        resp.version = 1;
        resp.nickName = YTX_CONFIG._userName;
        resp.sex = 0;
        resp.birth = '1970-01-01';
        callback(resp)
      } else if ((obj["6"] >= 520001 && obj["6"] <= 520010) || (obj["6"] >= 520018 && obj["6"] <= 520019) || (obj["6"] >= 520021 && obj["6"] <= 520021) || (obj["6"] >= 520023 && obj["6"] <= 520023) || obj["6"] == 529998) {
        var onError = request.onError;
        onError(YTX_CONFIG._protobuf._parseCodeResp(obj));
        return
      } else if ((obj["6"] >= 520000 && obj["6"] <= 529999) || (obj["6"] >= 550000 && obj["6"] <= 559999) || obj["6"] == 219000) {
        YTX_CONFIG._isReconnect = true;
        YTX_CONFIG._reLoginNum++;
        if (YTX_CONFIG._reLoginNum > 10) {
          setTimeout(function () {
            YTX_CONFIG._reLoginNum = 1;
            YTX_CONFIG._loginStatus = 1;
            if (!!YTX_CONFIG._socket) {
              YTX_CONFIG._socket.onclose = function () {};
              YTX_CONFIG._socket.close();
              YTX_CONFIG._socket = null
            }
            var onError = function () {};
            var callback = function () {};
            if (!!request) {
              onError = request.onError;
              callback = request.callback
            }
            onError(YTX_CONFIG._protobuf._parseCodeResp(obj));
            YTX_CONFIG._connectStateChange(5, "connect fail,please relogin");
            return
          }, 10000)
        } else {
          YTX_CONFIG._loginStatus = 1;
          if (!!YTX_CONFIG._socket) {
            YTX_CONFIG._socket.onclose = function () {};
            YTX_CONFIG._socket.close();
            YTX_CONFIG._socket = null
          }
          var onError = function () {};
          var callback = function () {};
          if (!!request) {
            onError = request.onError;
            callback = request.callback
          }
          onError(YTX_CONFIG._protobuf._parseCodeResp(obj));
          YTX_CONFIG._connectStateChange(5, "connect fail,please relogin");
          return
        }
      }
      var onError = request.onError;
      if (obj["1"] == YTX_CONFIG._prototype._login) {
        YTX_CONFIG._loginStatus = 1
      }
      if (obj["1"] == YTX_CONFIG._prototype._sendMsg || obj["1"] == YTX_CONFIG._prototype._mcmEventData._prototype) {
        onError ? onError(YTX_CONFIG._protobuf._parseSendMsgRespErr(obj, request)) : console.log("onError is missing,lack of onerror callback");
        return
      }
      delete YTX_CONFIG._clientMap[obj["3"]];
      var callback = request.callback;
      if (obj["6"] == 580005) {
        if (!request.repeat || request.repeat < 1) {
          if (!!request.repeat) {
            request.repeat += 1
          } else {
            request.repeat = 2
          }
          var sendStr = YTX_CONFIG._protobuf._buildSyncMessage(YTX_CONFIG._msgVersion + 1, request.endVersion, request.type, function () {}, request.repeat);
          if (!!sendStr) {
            YTX_CONFIG._sendMsg(sendStr)
          }
        } else {
          if ((request.endVersion - YTX_CONFIG._msgVersion) > 10) {
            YTX_CONFIG._msgVersion = YTX_CONFIG._msgVersion + 10
          } else {
            YTX_CONFIG._msgVersion = request.endVersion
          }
          YTX_CONFIG._processSyncMsg()
        }
      } else {
        onError(YTX_CONFIG._protobuf._parseCodeResp(obj))
      }
    },
    _getServerIp: function (type, callback, onError, sig, timestamp, reset) {
      if (!YTX_CONFIG.getServer) {
        YTX_CONFIG._initScoket(type, callback, onError, sig, timestamp, reset);
        return
      }
      var appid = YTX_CONFIG._appid;
      var apptoken = YTX_CONFIG._token;
      var accunt = '';
      var sigs = '';
      var w = '';
      if (type == 1) {
        sigs = sig;
        accunt = appid;
        w = 'Application/'
      } else {
        sigs = hex_md5(appid + YTX_CONFIG._userName + timestamp + YTX_CONFIG._userPwd);
        accunt = window.encodeURIComponent(appid + '#' + YTX_CONFIG._userName);
        w = 'User/'
      }
      var datas = {
        "sig": sigs,
        "userName": YTX_CONFIG._userName,
        "authorization": timestamp,
        "version": YTX_CONFIG._version,
        "type": type.toString()
      };
      YTX_CONFIG.jsonp(Base64.decode(YTX_CONFIG._app_server) + w + accunt + "/GetServerBalance", datas, function (e) {
        var lvs = 'https://' + e["LVS"][0].host + ":" + e["LVS"][0].port;
        var fileurl = 'wss://' + e["webSocketServer"][0].host + ":" + e["webSocketServer"][0].port + "/ws";
        var server = 'wss://' + e["webSocketServer"][0].host + ":" + e["webSocketServer"][0].port + "/ws";
        YTX_CONFIG._lvs_servers = [Base64.encode(lvs)];
        YTX_CONFIG._file_server_url = Base64.encode(fileurl);
        YTX_CONFIG._server_ip = [Base64.encode(server)];
        YTX_CONFIG._initScoket(type, callback, onError, sig, timestamp, reset)
      }, function (e) {
        var resp = {};
        resp.code = '510100';
        resp.msg = 'get server failed, please check the parameter';
        onError(resp)
      })
    },
    setAuthSigTime: function (reqSig, longTimestamp, reqAuth) {
      YTX_CONFIG._reqSig = reqSig;
      YTX_CONFIG._reqTimestamp = longTimestamp;
      YTX_CONFIG._reqAuth = reqAuth;
      setTimeout(function () {
        YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "auth sig is out of time , reAuth ...");
        YTX_CONFIG._reqTimestamp = null;
        YTX_CONFIG._reqSig = null;
        YTX_CONFIG._reqAuth = null;
        if (typeof YTX_CONFIG._reauthListener === "function") {
          YTX_CONFIG._reauthListener()
        }
      }, 8280000)
    },
    _initScoket: function (type, callback, onError, sig, timestamp, reset) {
      if (type === undefined || (type == 1 && sig === undefined)) {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
        resp.msg = "login type or sig is empty";
        onError(resp);
        return
      }
      window.onbeforeunload = function (event) {
        YTX_CONFIG._confirmMsg();
        YTX_CONFIG._Media.count = 0;
        var releaseCallBuilder = new RL_YTX.ReleaseCallBuilder();
        releaseCallBuilder.setCallId(YTX_CONFIG._voipCallData._callEventCallId);
        releaseCallBuilder.setCaller(YTX_CONFIG._voipCallData._caller);
        releaseCallBuilder.setCalled(YTX_CONFIG._voipCallData._called);
        RL_YTX.releaseCall(releaseCallBuilder, function (sucObj) {}, function (errObj) {});
        if (!!YTX_CONFIG._beforeUnLoad) {
          for (i in YTX_CONFIG._beforeUnLoad) {
            if (typeof YTX_CONFIG._beforeUnLoad[i] == "function") {
              YTX_CONFIG._beforeUnLoad[i]()
            } else {
              continue
            }
          }
        }
        YTX_CONFIG._loginStatus = 3;
        if (YTX_CONFIG._socket && YTX_CONFIG._socket.close) YTX_CONFIG._socket.close();
        YTX_CONFIG.chatRommId = null;
        YTX_CONFIG.chatRommNickName = null;
        RL_YTX.chatRommId = null;
        RL_YTX.chatRommNickName = null;
        YTX_CONFIG._logout()
      };
      if (reset) {
        if (!!YTX_CONFIG._socket) {
          YTX_CONFIG._socket.onclose = function () {};
          if (YTX_CONFIG._socket && YTX_CONFIG._socket.close) YTX_CONFIG._socket.close();
          YTX_CONFIG._socket = null
        }
        YTX_CONFIG._isConnect = false;
        YTX_CONFIG._isConnecting = false
      }
      if (!YTX_CONFIG._isConnect) {
        if (!YTX_CONFIG._isConnecting) {
          var serverip = Base64.decode(YTX_CONFIG._server_ip[0]);
          YTX_CONFIG._socket = new WebSocket(serverip);
          YTX_CONFIG._isConnecting = true;
          var tId = setTimeout(function () {
            if (YTX_CONFIG._isConnecting) {
              YTX_CONFIG._isConnecting = false;
              var resp = {};
              resp.code = YTX_CONFIG._errcode._NETWORK_TIME_OUT;
              resp.msg = 'connect to websocket time out.';
              onError(resp);
              return
            }
          }, YTX_CONFIG._timeOutSecond * 1000);
          var sessionId = YTX_CONFIG._currentSession;
          YTX_CONFIG._socket.onopen = function (event) {
            if (!!tId) {
              clearTimeout(tId)
            }
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "Client connect to Server ");
            YTX_CONFIG._isConnect = true;
            YTX_CONFIG._isConnecting = false;
            if (!YTX_CONFIG._imei) {
              YTX_CONFIG._protobuf._generateImei()
            }
            YTX_CONFIG._loginType = type;
            var sendStr = YTX_CONFIG._protobuf._buildLogin(type, callback, onError, sig, timestamp);
            if (!!sendStr) {
              YTX_CONFIG._loginStatus = 2;
              YTX_CONFIG._sendMsg(sendStr)
            }
          };
          YTX_CONFIG._socket.onmessage = function (event) {
            if (sessionId != YTX_CONFIG._currentSession) {
              return
            }
            var timeStamp = YTX_CONFIG._getTimeStamp();
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, timeStamp + ' Client received a message', event);
            YTX_CONFIG._onResponse(event.data)
          };
          YTX_CONFIG._socket.onclose = function (event) {
            if (event.code > 1000) {
              console.warn('main websocket has closed, error code :' + event.code + ': ' + event.reason + ': ' + event.wasClean)
            }
            if (!!tId) {
              clearTimeout(tId)
            }
            if (sessionId != YTX_CONFIG._currentSession) {
              return
            }
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'Client notified socket has closed', event);
            if (YTX_CONFIG._loginStatus == 3) {
              YTX_CONFIG._isConnect = false;
              YTX_CONFIG._isConnecting = false;
              YTX_CONFIG._loginStatus = 1;
              YTX_CONFIG._connectStateChange(1, "connect closeed");
              YTX_CONFIG._reconnect(function () {});
              if (!!YTX_CONFIG._intervalId) {
                window.clearInterval(YTX_CONFIG._intervalId)
              }
              YTX_CONFIG._intervalId = window.setInterval(YTX_CONFIG._heartBeat, YTX_CONFIG._heartBeatInterval._RECONNECT * 1000)
            } else if (YTX_CONFIG._isConnecting) {
              YTX_CONFIG._isConnecting = false;
              var resp = {};
              resp.code = YTX_CONFIG._errcode._NETWORK_ERR;
              resp.msg = 'connecting to websocket, please wait.';
              onError(resp);
              return
            }
            YTX_CONFIG._isConnecting = false
          }
        } else {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'Client is connecting to server, please wait')
        }
      } else {
        if (YTX_CONFIG._loginStatus == 1) {
          var sendStr = YTX_CONFIG._protobuf._buildLogin(type, callback, onError, sig, timestamp);
          if (!!sendStr) {
            YTX_CONFIG._loginStatus = 2;
            YTX_CONFIG._sendMsg(sendStr)
          }
        } else if (YTX_CONFIG._loginStatus == 2) {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'user is logining, please wait..')
        } else {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'user has login')
        }
      }
    },
    _checkOnline: function (onErr, msgId, msgClientNo) {
      var resp = {};
      if (!YTX_CONFIG._userName) {
        resp.code = YTX_CONFIG._errcode._NO_LOGIN;
        if (!!msgId) {
          resp.msgId = msgId
        }
        if (!!msgClientNo) {
          resp.msgClientNo = msgClientNo
        }
        resp.msg = 'user not login';
        onErr(resp);
        return false
      }
      if (YTX_CONFIG._loginStatus != 3) {
        YTX_CONFIG._log(YTX_CONFIG._logLev._WARN, "no user login");
        if (YTX_CONFIG._isConnect) {
          resp.code = YTX_CONFIG._errcode._NO_LOGIN
        } else {
          resp.code = YTX_CONFIG._errcode._NETWORK_ERR
        }
        if (!!msgId) {
          resp.msgId = msgId
        }
        if (!!msgClientNo) {
          resp.msgClientNo = msgClientNo
        }
        resp.msg = 'user not login';
        onErr(resp);
        return false
      }
      return true
    },
    _generateFullMsgId: function (msgId) {
      return YTX_CONFIG._token + '|' + msgId
    },
    _protobuf: {
      _buildLogout: function (callback, onError) {
        if (!YTX_CONFIG._checkOnline(function () {}, null)) {
          YTX_CONFIG._logout();
          return null
        }
        if (!YTX_CONFIG._imei) {
          YTX_CONFIG._protobuf._generateImei()
        }
        var logOutStr = '{\"Logout\":{\"1\":\"' + YTX_CONFIG._imei + '\"}}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._logout + ',\"2\":' + logOutStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, function () {})) + '}}'
      },
      _buildLogin: function (type, callback, onError, sig, timestamp) {
        var resp = {};
        if (type != 1 && type != 2 && type != 3) {
          return null
        }
        if (type != 2) {
          if (!YTX_CONFIG._userName) {
            resp.code = YTX_CONFIG._errcode._LOGIN_NO_USERNAME;
            resp.msg = 'param userName is empty';
            onError(resp);
            return null
          }
        }
        if (type == 3 && !YTX_CONFIG._userPwd) {
          resp.code = YTX_CONFIG._errcode._LOGIN_NO_PWD;
          resp.msg = 'param userPwd is empty';
          onError(resp);
          return null
        }
        if (!YTX_CONFIG._imei) {
          YTX_CONFIG._protobuf._generateImei()
        }
        if (!YTX_CONFIG._userPwd) {
          YTX_CONFIG._userPwd = ''
        }
        if (!sig) {
          sig = ''
        }
        if (!timestamp) {
          timestamp = ''
        }
        var loginJsonStr;
        if (type != 2) {
          loginJsonStr = '{\"UserAuth\":{\"1\":' + type + ',' + '\"2\":\"' + YTX_CONFIG._appid + '\",' + '\"3\":\"' + YTX_CONFIG._userName + '\",' + '\"4\":\"' + timestamp + '\",' + '\"5\":' + YTX_CONFIG._deviceType + ',\"6\":\"' + sig + '\",' + '\"7\":\"' + YTX_CONFIG._version + '\",' + '\"8\":\"' + YTX_CONFIG._imei + '\",\"9\":' + YTX_CONFIG._loginMode + ',' + '\"10\":' + YTX_CONFIG._network + ',\"11\":\"' + YTX_CONFIG._userPwd + '\"' + '}}';
          return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._login + ',\"2\":' + loginJsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
        } else {
          loginJsonStr = '{\"UserAuth\":{\"1\":2,\"2\":\"' + YTX_CONFIG._appid + '\",' + '\"8\":\"' + YTX_CONFIG._imei + '\",\"10\":' + YTX_CONFIG._network + '}}';
          return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._login + ',\"2\":' + loginJsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + ',\"8\":\"' + YTX_CONFIG._token + '\"}}'
        }
      },
      _generateImei: function () {
        YTX_CONFIG._imei = hex_md5(YTX_CONFIG._appid + YTX_CONFIG._userName + YTX_CONFIG._sdkName)
      },
      _buildHeartBeat: function () {
        var id = setTimeout(YTX_CONFIG._heartBeatCallBackErr(++YTX_CONFIG._heartBeatErrNum), YTX_CONFIG._heartBeatTimeOut * 1000);
        return '{"hb":' + id + '}'
      },
      _buildChatroomSendTextMsg: function (msgType, content, receiver, msgId, msgDomain, callback, onError, orignMsgId, atAccounts) {
        var allMsgId = YTX_CONFIG._generateFullMsgId(msgId);
        if (!YTX_CONFIG._checkOnline(onError, orignMsgId, allMsgId)) {
          YTX_CONFIG._ClientNo++;
          return null
        }
        if (!receiver) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msgId = orignMsgId;
          resp.msgClientNo = allMsgId;
          resp.msg = 'param [receiver] is empty';
          onError(resp);
          return
        }
        if (content.length > YTX_CONFIG._maxMsgLen) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._TEXT_TOO_LONG;
          resp.msgId = orignMsgId;
          resp.msgClientNo = allMsgId;
          resp.msg = 'param content is over ' + YTX_CONFIG._maxMsgLen + ' character, too large.';
          onError(resp);
          return
        }
        var compress = false;
        var len = 0;
        content = Base64.encode(content);
        var sendJsonStr = new Object();
        sendJsonStr['1'] = msgType;
        sendJsonStr['2'] = msgId + '';
        sendJsonStr['3'] = content;
        sendJsonStr['4'] = YTX_CONFIG._userName;
        sendJsonStr['5'] = receiver;
        if (!!msgDomain || 0 == msgDomain) {
          sendJsonStr['6'] = msgDomain
        }
        if (compress) {
          sendJsonStr['8'] = len
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"SendMsg\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError, allMsgId, '', '', '', orignMsgId, true);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom.MSG_SEND_LiveChatRoom_MESSAGE + ',\"2\":' + sendProto + ',\"3\":' + clientNo + '}}'
      },
      _buildSendTextMsg: function (msgType, content, receiver, msgId, msgDomain, callback, onError, orignMsgId, atAccounts) {
        var allMsgId = YTX_CONFIG._generateFullMsgId(msgId);
        if (!YTX_CONFIG._checkOnline(onError, orignMsgId, allMsgId)) {
          YTX_CONFIG._ClientNo++;
          return null
        }
        if (!receiver) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msgId = orignMsgId;
          resp.msgClientNo = allMsgId;
          resp.msg = 'param receiver is empty';
          onError(resp);
          return
        }
        if (!content && msgType != 12) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msgId = orignMsgId;
          resp.msgClientNo = allMsgId;
          resp.msg = 'param content is empty';
          onError(resp);
          return
        }
        if (content.length > YTX_CONFIG._maxMsgLen) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._TEXT_TOO_LONG;
          resp.msgId = orignMsgId;
          resp.msgClientNo = allMsgId;
          resp.msg = 'param content over ' + YTX_CONFIG._maxMsgLen + ' character, too large.';
          onError(resp);
          return
        }
        var compress = false;
        var len = 0;
        content = Base64.encode(content);
        var sendJsonStr = new Object();
        if (!!atAccounts) {
          if (atAccounts instanceof Array && atAccounts.length > 0) {
            sendJsonStr['1'] = msgType
          } else {
            var resp = {};
            resp.code = 170012;
            resp.msg = "param atAccounts isn't an Array or is empty";
            onError(resp);
            return
          }
        } else {
          sendJsonStr['1'] = msgType
        }
        sendJsonStr['2'] = msgId + '';
        sendJsonStr['3'] = content;
        sendJsonStr['4'] = YTX_CONFIG._userName;
        sendJsonStr['5'] = receiver;
        if (!!msgDomain || 0 == msgDomain) {
          sendJsonStr['6'] = msgDomain
        }
        if (compress) {
          sendJsonStr['8'] = len
        }
        if (!!atAccounts && atAccounts.length > 0) {
          var atStr = new Object();
          console.log("sendMsg:extopts=" + atAccounts.join(","));
          atStr["at"] = atAccounts;
          sendJsonStr['11'] = Base64.encode(JSON.stringify(atStr))
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"SendMsg\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError, allMsgId, '', '', '', orignMsgId, true);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._sendMsg + ',\"2\":' + sendProto + ',\"3\":' + clientNo + '}}'
      },
      _buildSendFileMsgStart: function (file, content, receiver, msgType, msgId, msgDomain, type, onError, fileName, msgClientNo, isLarge) {
        if (!YTX_CONFIG._checkOnline(onError, msgId, msgClientNo)) {
          return null
        }
        var name = null;
        if (file instanceof File) {
          name = file.name
        } else if (!!fileName) {
          name = fileName
        } else if (!!file.fileName) {
          name = file.fileName
        } else {
          name = msgId
        }
        var sig = YTX_CONFIG._fileSig.toUpperCase();
        var sendJsonStr = new Object();
        sendJsonStr['1'] = YTX_CONFIG._appid;
        sendJsonStr['2'] = msgType + '';
        sendJsonStr['3'] = ((!!content) ? content : '');
        sendJsonStr['4'] = ((!!msgDomain) ? msgDomain : '');
        sendJsonStr['5'] = YTX_CONFIG._userName;
        sendJsonStr['6'] = receiver;
        sendJsonStr['7'] = name;
        sendJsonStr['8'] = YTX_CONFIG._imei;
        sendJsonStr['9'] = YTX_CONFIG._token + new Date().getTime();
        sendJsonStr['10'] = sig;
        sendJsonStr['11'] = type + '';
        sendJsonStr['12'] = ((!!file.size) ? file.size : '');
        sendJsonStr['13'] = msgClientNo;
        sendJsonStr['14'] = isLarge;
        sendJsonStr = JSON.stringify(sendJsonStr);
        return '{\"start\":' + sendJsonStr + '}'
      },
      _buildSendSchedule: function (callback, onError, schedule) {
        var jsonStr = '{\"1\":' + schedule + '}';
        return '{\"state\":' + jsonStr + '}'
      },
      _buildSendFileMsgEnd: function (callback, onError, msgId, orignMsgId) {
        var jsonStr = '{\"1\":' + YTX_CONFIG._generateClientNo(callback, onError, msgId, '', '', '', orignMsgId, false) + '}';
        return '{\"end\":' + jsonStr + '}'
      },
      _buildMCM_UserEvt_StartAsk: function (osUnityAccount, agentId, userData, addrJson, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!osUnityAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param osUnityAccount is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._UserEvt_StartAsk;
        jsonStr['5'] = osUnityAccount;
        jsonStr['10'] = agentId;
        jsonStr['19'] = JSON.stringify(addrJson);
        jsonStr['20'] = 0;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_UserEvt_EndAsk: function (osUnityAccount, userData, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!osUnityAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param osUnityAccount is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._UserEvt_EndAsk;
        jsonStr['5'] = osUnityAccount;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_UserEvt_SendMSG: function (osUnityAccount, content, userData, type, msgId, callback, onError, orignMsgId) {
        var allMsgId = YTX_CONFIG._token + '|' + msgId;
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!content) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msgId = orignMsgId;
          resp.msgClientNo = allMsgId;
          resp.msg = 'param content is empty.';
          onError(resp);
          return
        }
        if (!osUnityAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param osUnityAccount is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._UserEvt_SendMSG;
        jsonStr['5'] = osUnityAccount;
        var msgData = new Object();
        msgData['1'] = type;
        msgData['2'] = content;
        var msgDataArray = [];
        msgDataArray[0] = msgData;
        jsonStr['6'] = msgDataArray;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError, allMsgId, '', '', '', orignMsgId)) + '}}'
      },
      _buildMCM_AgentEvt_SendMCM: function (userAccount, content, userData, type, msgId, callback, onError, orignMsgId, chanType, mailTitle) {
        var allMsgId = YTX_CONFIG._token + '|' + msgId;
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!content) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msgId = orignMsgId;
          resp.msgClientNo = allMsgId;
          resp.msg = 'param content is empty.';
          onError(resp);
          return
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_SendMCM;
        jsonStr['4'] = userAccount;
        jsonStr['8'] = chanType;
        var msgData = new Object();
        msgData['1'] = type;
        msgData['2'] = content;
        if (chanType == YTX_CONFIG._prototype._mcmEventData._mcmChannel._MCType_mail) {
          msgData['5'] = mailTitle
        }
        var msgDataArray = [];
        msgDataArray[0] = msgData;
        jsonStr['6'] = msgDataArray;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError, allMsgId, '', '', '', orignMsgId)) + '}}'
      },
      _buildMCM_AgentEvt_StartSerWithUser: function (userAccount, MCMDataBuilder, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_StartSerWithUser;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        if (!!MCMDataBuilder && !!MCMDataBuilder.getCcpCustomData()) {
          jsonStr['17'] = MCMDataBuilder.getCcpCustomData()
        }
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_StopSerWithUser: function (userAccount, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        };
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_StopSerWithUser;
        jsonStr['4'] = userAccount;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_KFOnWork: function (serverCap, MCMAgentInfoBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        var errorStr = undefined;
        if ((!!MCMAgentInfoBuilder.getImState()) && isNaN(MCMAgentInfoBuilder.getImState())) {
          errorStr = 'ImState'
        } else if ((!!MCMAgentInfoBuilder.getTelState()) && isNaN(MCMAgentInfoBuilder.getTelState())) {
          errorStr = 'TelState'
        } else if ((!!MCMAgentInfoBuilder.getDelayCall()) && isNaN(MCMAgentInfoBuilder.getDelayCall())) {
          errorStr = 'DelayCall'
        } else if ((!!MCMAgentInfoBuilder.getAnswerTimeout()) && isNaN(MCMAgentInfoBuilder.getAnswerTimeout())) {
          errorStr = 'AnswerTimeout'
        } else if ((!!MCMAgentInfoBuilder.getMaxImUser()) && isNaN(MCMAgentInfoBuilder.getMaxImUser())) {
          errorStr = 'MaxImUser'
        } else if ((!!MCMAgentInfoBuilder.getAgentServerMode()) && isNaN(MCMAgentInfoBuilder.getAgentServerMode())) {
          errorStr = 'AgentServerMode'
        } else if ((!!serverCap) && isNaN(serverCap)) {
          errorStr = 'serverCap'
        }
        if (!!errorStr) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param ' + errorStr + ' is not a number';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_KFOnWork;
        jsonStr['20'] = 0;
        jsonStr['22'] = (!!serverCap) ? serverCap : 5;
        jsonStr['10'] = MCMAgentInfoBuilder.getAgentId();
        var jsonStr13 = new Object();
        jsonStr13['1'] = MCMAgentInfoBuilder.getAgentId();
        if (!!MCMAgentInfoBuilder.getImState()) jsonStr13['2'] = MCMAgentInfoBuilder.getImState();
        if (!!MCMAgentInfoBuilder.getTelState()) jsonStr13['3'] = MCMAgentInfoBuilder.getTelState();
        if (!!MCMAgentInfoBuilder.getNumber()) jsonStr13['4'] = MCMAgentInfoBuilder.getNumber();
        if (!!MCMAgentInfoBuilder.getPushVoipacc()) jsonStr13['5'] = MCMAgentInfoBuilder.getPushVoipacc();
        if (!!MCMAgentInfoBuilder.getQueueType()) jsonStr13['6'] = MCMAgentInfoBuilder.getQueueType();
        if (!!MCMAgentInfoBuilder.getUserInfoCallbackurl()) jsonStr13['7'] = MCMAgentInfoBuilder.getUserInfoCallbackurl();
        if (!!MCMAgentInfoBuilder.getDelayCall()) jsonStr13['8'] = MCMAgentInfoBuilder.getDelayCall();
        if (!!MCMAgentInfoBuilder.getAnswerTimeout()) jsonStr13['9'] = MCMAgentInfoBuilder.getAnswerTimeout();
        if (!!MCMAgentInfoBuilder.getQueuePriority()) jsonStr13['10'] = MCMAgentInfoBuilder.getQueuePriority();
        if (!!MCMAgentInfoBuilder.getMaxImUser()) jsonStr13['11'] = MCMAgentInfoBuilder.getMaxImUser();
        if (!!MCMAgentInfoBuilder.getAgentServerMode()) jsonStr13['12'] = MCMAgentInfoBuilder.getAgentServerMode();
        jsonStr['13'] = jsonStr13;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_KFOffWork: function (agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_KFOffWork;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_Ready: function (agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_Ready;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_NotReady: function (agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_NotReady;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_RejectUser: function (userAccount, ccpCustomData, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!ccpCustomData) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param ccpCustomData is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_RejectUser;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        jsonStr['17'] = ccpCustomData;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_TransKF: function (userAccount, osUnityAccount, transAgentId, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!osUnityAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param osUnityAccount is empty';
          onError(resp);
          return
        }
        if (!transAgentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param transAgentId is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_TransKF;
        jsonStr['4'] = userAccount;
        jsonStr['5'] = osUnityAccount;
        jsonStr['10'] = agentId;
        jsonStr['11'] = transAgentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_TransferQueue: function (userAccount, queueType, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!queueType) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param queueType is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_TransferQueue;
        jsonStr['4'] = userAccount;
        jsonStr['18'] = queueType;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_EnterCallService: function (userAccount, userPhone, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!userPhone) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userPhone is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_EnterCallService;
        jsonStr['4'] = userAccount;
        jsonStr['12'] = userPhone;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_MonitorAgent: function (userAccount, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_MonitorAgent;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_CancelMonitorAgent: function (userAccount, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_CancelMonitorAgent;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_ForceTransfer: function (userAccount, superAgentId, agentId, transAgentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!superAgentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param superAgentId is empty';
          onError(resp);
          return
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param agentId is empty';
          onError(resp);
          return
        }
        if (!transAgentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param transAgentId is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_ForceTransfer;
        jsonStr['4'] = userAccount;
        jsonStr['23'] = superAgentId;
        jsonStr['10'] = agentId;
        jsonStr['11'] = transAgentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_ForceEndService: function (userAccount, superAgentId, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!superAgentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param superAgentId is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_ForceEndService;
        jsonStr['4'] = userAccount;
        jsonStr['23'] = superAgentId;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_QueryQueueInfo: function (queueType, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!queueType) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param queueType is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_QueryQueueInfo;
        jsonStr['18'] = queueType;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_QueryAgentInfo: function (agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_QueryAgentInfo;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_StartConf: function (userAccount, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param agentId is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_StartConf;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_JoinConf: function (userAccount, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param agentId is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_JoinConf;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_ExitConf: function (userAccount, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param agentId is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_ExitConf;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_StartSessionTimer: function (userAccount, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_StartSessionTimer;
        jsonStr['4'] = userAccount;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_ForceJoinConf: function (userAccount, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param agentId is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_ForceJoinConf;
        jsonStr['4'] = userAccount;
        jsonStr['10'] = agentId;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_ReservedForUser: function (keyType, reservedKey, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_ReservedForUser;
        jsonStr['10'] = agentId;
        var ccpCustomData = {};
        ccpCustomData['keyType'] = keyType;
        ccpCustomData['reservedKey'] = reservedKey;
        jsonStr['17'] = ccpCustomData;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_CancelReserved: function (keyType, reservedKey, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_CancelReserved;
        jsonStr['10'] = agentId;
        var ccpCustomData = {};
        ccpCustomData['keyType'] = keyType;
        ccpCustomData['reservedKey'] = reservedKey;
        jsonStr['17'] = ccpCustomData;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCM_AgentEvt_SerWithTheUser: function (osUnityAccount, userAccount, chanType, agentId, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!agentId) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = "param agentId is empty";
          onError(resp);
          return
        }
        if (!osUnityAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param osUnityAccount is empty';
          onError(resp);
          return
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param userAccount is empty';
          onError(resp);
          return
        }
        if (!chanType) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param chanType is empty';
          onError(resp);
          return
        }
        var jsonStr = new Object();
        jsonStr['1'] = YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_SerWithTheUser;
        jsonStr['10'] = agentId;
        jsonStr['5'] = osUnityAccount;
        jsonStr['4'] = userAccount;
        jsonStr['8'] = chanType;
        jsonStr = JSON.stringify(jsonStr);
        jsonStr = '{\"MCMData\":' + jsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._mcmEventData._prototype + ',\"2\":' + jsonStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildMCMEventData: function (userAccount, callback, onError) {},
      _buildSyncMessage: function (startVersion, endVersion, type, onError, repeat) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (isNaN(startVersion) || isNaN(endVersion) || (!!type && isNaN(type))) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = 'param startVersion or endVersion or type is not a number.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = "";
        if (startVersion == endVersion) {
          sendJsonStr['1'] = startVersion + ''
        } else if (endVersion - startVersion <= 10) {
          for (var g = startVersion; g < endVersion + 1; g++) {
            sendJsonStr['1'] += g + ","
          }
          sendJsonStr['1'] = sendJsonStr['1'].substring(0, sendJsonStr['1'].length - 1)
        } else {
          for (var g = startVersion; g < (parseInt(startVersion) + 10); g++) {
            sendJsonStr['1'] += g + ","
          }
          sendJsonStr['1'] = sendJsonStr['1'].substring(0, sendJsonStr['1'].length - 1)
        }
        if (!!type) {
          sendJsonStr['2'] = type
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var syncMsgStr = '{\"SyncMsg\":' + sendJsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._syncMsg + ',\"2\":' + syncMsgStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(null, onError, null, endVersion, type, repeat)) + '}}'
      },
      _buildGetNickByAcc: function (userAccount, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!userAccount) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = "_buildGetNickByAcc():userAccount cann't be null!";
          onError(resp);
          return
        };
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        var sendStr = new Object();
        sendStr['1'] = userAccount;
        sendStr = JSON.stringify(sendStr);
        var queryPersonInfoStr = '{\"QueryPersonInfo\":' + sendStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._getMyInfo + ',\"2\":' + queryPersonInfoStr + ',\"3\":' + clientNo + '}}'
      },
      _buildGetMyInfo: function (callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._getMyInfo + ',\"3\":' + clientNo + '}}'
      },
      _buildSetMyInfo: function (uploadPersonInfoBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError)) {
          return null
        }
        if (!uploadPersonInfoBuilder.getNickName()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'upload personInfo,nickName is null';
          onError(resp);
          return
        }
        if (!!uploadPersonInfoBuilder.getBirth()) {
          var regx = /^(19|20)\d{2}-(1[0-2]|0[1-9])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
          if (regx.exec(uploadPersonInfoBuilder.getBirth()) == null) {
            var resp = {};
            resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
            resp.msg = 'upload personInfo,birth is error, only accept format yyyy-MM-dd, eg:1990-01-01';
            onError(resp);
            return
          }
        }
        if (!!uploadPersonInfoBuilder.getSex()) {
          var regx = /^(1|2)$/;
          if (regx.exec(uploadPersonInfoBuilder.getSex()) == null) {
            var resp = {};
            resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
            resp.msg = 'upload personInfo,sex is error, 1 is male and 2 is female';
            onError(resp);
            return
          }
        }
        if (!!uploadPersonInfoBuilder.getSign() && uploadPersonInfoBuilder.getSign().length > 100) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_OUT_OF_LENGTH;
          resp.msg = 'upload personInfo,sign is error, sign length must less than 100';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = uploadPersonInfoBuilder.getNickName();
        if (!!uploadPersonInfoBuilder.getSex()) {
          sendJsonStr['2'] = parseInt(uploadPersonInfoBuilder.getSex())
        }
        if (!!uploadPersonInfoBuilder.getBirth()) {
          sendJsonStr['3'] = uploadPersonInfoBuilder.getBirth()
        }
        if (!!uploadPersonInfoBuilder.getSign()) {
          sendJsonStr['4'] = uploadPersonInfoBuilder.getSign()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var uploadPersonInfoStr = '{\"PersonInfo\":' + sendJsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._setMyInfo + ',\"2\":' + uploadPersonInfoStr + ',\"3\":' + (YTX_CONFIG._generateClientNo(callback, onError)) + '}}'
      },
      _buildCreateGroup: function (createGroupBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!createGroupBuilder || !createGroupBuilder.getGroupName() || !createGroupBuilder.getScope()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupName or scope is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = YTX_CONFIG._userName;
        sendJsonStr['2'] = createGroupBuilder.getGroupName();
        sendJsonStr['3'] = createGroupBuilder.getGroupType();
        if (!!createGroupBuilder.getProvince()) {
          sendJsonStr['4'] = createGroupBuilder.getProvince()
        }
        if (!!createGroupBuilder.getCity()) {
          sendJsonStr['5'] = createGroupBuilder.getCity()
        }
        sendJsonStr['6'] = createGroupBuilder.getScope();
        if (!!createGroupBuilder.getDeclared()) {
          sendJsonStr['7'] = createGroupBuilder.getDeclared()
        }
        if (typeof createGroupBuilder.getPermission() == 'string') {
          sendJsonStr['8'] = parseInt(createGroupBuilder.getPermission())
        } else {
          sendJsonStr['8'] = createGroupBuilder.getPermission()
        }
        sendJsonStr['9'] = createGroupBuilder.getMode();
        if (!!createGroupBuilder.getGroupDomain()) {
          sendJsonStr['10'] = createGroupBuilder.getGroupDomain()
        }
        if (!!createGroupBuilder.getTarget()) {
          if (isNaN(createGroupBuilder.getTarget())) {
            var resp = {};
            resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
            resp.msg = 'param target is not a number.';
            onError(resp);
            return
          }
          sendJsonStr['11'] = createGroupBuilder.getTarget()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"CreateGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._createGroup + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildDismissGroup: function (dismissGroupBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!dismissGroupBuilder || !dismissGroupBuilder.getGroupId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupid is empty.';
          onError(resp)
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = dismissGroupBuilder.getGroupId();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"DismissGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._dismissGroup + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildInviteJoinGroupr: function (InviteGroupMemberBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!InviteGroupMemberBuilder || !InviteGroupMemberBuilder.getGroupId() || !InviteGroupMemberBuilder.getMembers()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupid or members is empty.';
          onError(resp)
        }
        if (!(InviteGroupMemberBuilder.getMembers() instanceof Array)) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = 'param members is not an array.';
          onError(resp);
          return
        }
        var confirm = InviteGroupMemberBuilder.getConfirm();
        if (!confirm) {
          confirm = 2
        } else {
          if (isNaN(confirm) || (confirm != 1 && confirm != 2)) {
            var resp = {};
            resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
            resp.msg = 'param confirm is illegal';
            onError(resp);
            return
          }
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = InviteGroupMemberBuilder.getGroupId();
        if (!!InviteGroupMemberBuilder.getDeclared()) {
          sendJsonStr['3'] = InviteGroupMemberBuilder.getDeclared()
        }
        var members = InviteGroupMemberBuilder.getMembers();
        if (members.length <= 0) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = 'param members is illegal';
          onError(resp);
          return
        }
        sendJsonStr['4'] = members;
        sendJsonStr['5'] = InviteGroupMemberBuilder.getConfirm();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"InviteJoinGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._inviteJoinGroup + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildConfirmInviteJoinGroup: function (ConfirmInviteGroupMemberBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!ConfirmInviteGroupMemberBuilder || !ConfirmInviteGroupMemberBuilder.getGroupId() || !ConfirmInviteGroupMemberBuilder.getConfirm() || !ConfirmInviteGroupMemberBuilder.getInvitor()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupid or confirm or invitor is empty.';
          onError(resp)
        }
        var confirm = ConfirmInviteGroupMemberBuilder.getConfirm();
        if (isNaN(confirm)) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = 'param confirm is not a number.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = ConfirmInviteGroupMemberBuilder.getGroupId();
        sendJsonStr['2'] = ConfirmInviteGroupMemberBuilder.getInvitor();
        sendJsonStr['3'] = ConfirmInviteGroupMemberBuilder.getConfirm();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ConfirmInviteJoinGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._confirmInviteJoin + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildQuitGroup: function (QuitGroupBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!QuitGroupBuilder || !QuitGroupBuilder.getGroupId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupid is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = QuitGroupBuilder.getGroupId();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"QuitGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._quitGroup + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildGetGroupList: function (GetGroupListBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!GetGroupListBuilder || !GetGroupListBuilder.getPageSize()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param pageSize is empty.';
          onError(resp);
          return
        }
        if (isNaN(GetGroupListBuilder.getPageSize())) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = 'param pageSize is not a number.';
          onError(resp);
          return
        }
        YTX_CONFIG._groupConfig._builder = GetGroupListBuilder;
        var sendJsonStr = new Object();
        if (!!GetGroupListBuilder.getGroupId()) {
          sendJsonStr['2'] = GetGroupListBuilder.getGroupId()
        }
        sendJsonStr['3'] = GetGroupListBuilder.getPageSize();
        if (!!GetGroupListBuilder.getTarget()) {
          sendJsonStr['4'] = GetGroupListBuilder.getTarget()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"GetOwnerGroups\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._getOwnGroups + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildGetGroupMemberList: function (GetGroupMemberListBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!GetGroupMemberListBuilder || !GetGroupMemberListBuilder.getPageSize() || !GetGroupMemberListBuilder.getGroupId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param pageSize or groupId is empty.';
          onError(resp);
          return
        }
        if (isNaN(GetGroupMemberListBuilder.getPageSize())) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = 'param pageSize is not a number.';
          onError(resp);
          return
        }
        YTX_CONFIG._groupConfig._builder = GetGroupMemberListBuilder;
        var sendJsonStr = new Object();
        sendJsonStr['1'] = GetGroupMemberListBuilder.getGroupId();
        if (!!GetGroupMemberListBuilder.getMemberId()) {
          sendJsonStr['3'] = GetGroupMemberListBuilder.getMemberId()
        }
        sendJsonStr['4'] = GetGroupMemberListBuilder.getPageSize();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"GetGroupMembers\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._queryGroupMembers + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildJoinGroup: function (JoinGroupBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!JoinGroupBuilder || !JoinGroupBuilder.getGroupId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupId is empty';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = JoinGroupBuilder.getGroupId();
        sendJsonStr['3'] = JoinGroupBuilder.getDeclared();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"JoinGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._joinGroup + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildConfirmJoinGroup: function (ConfirmJoinGroupBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!ConfirmJoinGroupBuilder || !ConfirmJoinGroupBuilder.getGroupId() || !ConfirmJoinGroupBuilder.getMemberId() || !ConfirmJoinGroupBuilder.getConfirm()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupId or memberId or confirm is empty';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = ConfirmJoinGroupBuilder.getGroupId();
        sendJsonStr['3'] = ConfirmJoinGroupBuilder.getMemberId();
        sendJsonStr['4'] = ConfirmJoinGroupBuilder.getConfirm();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ConfirmJoinGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._confirmJoinGroup + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildGetGroupDetail: function (GetGroupDetailBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!GetGroupDetailBuilder || !GetGroupDetailBuilder.getGroupId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupId is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = GetGroupDetailBuilder.getGroupId();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"GetGroupDetail\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._getGroupDetail + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildSearchGroups: function (SearchGroupsBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!SearchGroupsBuilder || !SearchGroupsBuilder.getSearchType() || !SearchGroupsBuilder.getKeywords) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param serachType or keyWord is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = SearchGroupsBuilder.getSearchType();
        sendJsonStr['3'] = SearchGroupsBuilder.getKeywords();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"SearchGroups\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._searchGroups + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildDeleteGroupMember: function (DeleteGroupMemberBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!DeleteGroupMemberBuilder || !DeleteGroupMemberBuilder.getGroupId() || !DeleteGroupMemberBuilder.getMemberId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupid or memberId is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = DeleteGroupMemberBuilder.getGroupId();
        sendJsonStr['3'] = [DeleteGroupMemberBuilder.getMemberId()];
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"DeleteGroupMember\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._deleteGroupMember + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildForbidMemberSpeak: function (ForbidMemberSpeakBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!ForbidMemberSpeakBuilder || !ForbidMemberSpeakBuilder.getGroupId() || !ForbidMemberSpeakBuilder.getMemberId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupid or memberId is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = ForbidMemberSpeakBuilder.getGroupId();
        sendJsonStr['3'] = ForbidMemberSpeakBuilder.getMemberId();
        sendJsonStr['4'] = ForbidMemberSpeakBuilder.getForbidState();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ForbidMemberSpeak\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._forbidMemberSpeak + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildSetGroupMessageRule: function (SetGroupMessageRuleBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!SetGroupMessageRuleBuilder || !SetGroupMessageRuleBuilder.getGroupId()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupId is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = SetGroupMessageRuleBuilder.getGroupId();
        if (!!SetGroupMessageRuleBuilder.getIsNotice()) {
          sendJsonStr['2'] = SetGroupMessageRuleBuilder.getIsNotice()
        }
        if (!!SetGroupMessageRuleBuilder.getIsApplePush()) {
          sendJsonStr['3'] = SetGroupMessageRuleBuilder.getIsApplePush()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"SetGroupMessagRule\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._setGroupMessageRule + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildQueryGroupMemberCard: function (QueryGroupMemberCard, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!QueryGroupMemberCard || !QueryGroupMemberCard.getMemberId() || !QueryGroupMemberCard.getBelong()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param memberId or groupid is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = QueryGroupMemberCard.getMemberId();
        sendJsonStr['2'] = QueryGroupMemberCard.getBelong();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"QueryGroupMemberCard\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._queryGroupMemberCard + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildModifyMemberCard: function (ModifyMemberCardBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!ModifyMemberCardBuilder || !ModifyMemberCardBuilder.getMember() || !ModifyMemberCardBuilder.getBelong()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param memberId or groupId is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = ModifyMemberCardBuilder.getBelong();
        sendJsonStr['2'] = ModifyMemberCardBuilder.getMember();
        if (!!ModifyMemberCardBuilder.getDisplay()) {
          sendJsonStr['3'] = ModifyMemberCardBuilder.getDisplay()
        }
        if (!!ModifyMemberCardBuilder.getPhone()) {
          sendJsonStr['4'] = ModifyMemberCardBuilder.getPhone()
        }
        if (!!ModifyMemberCardBuilder.getMail()) {
          sendJsonStr['5'] = ModifyMemberCardBuilder.getMail()
        }
        if (!!ModifyMemberCardBuilder.getRemark()) {
          sendJsonStr['6'] = ModifyMemberCardBuilder.getRemark()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ModifyMemberCard\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._modifyMemberCard + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildModifyGroup: function (ModifyGroupBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!ModifyGroupBuilder || !ModifyGroupBuilder.getGroupId() || !ModifyGroupBuilder.getGroupName()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param groupid or groupName is empty.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['2'] = ModifyGroupBuilder.getGroupId();
        sendJsonStr['3'] = ModifyGroupBuilder.getGroupName();
        if (!!ModifyGroupBuilder.getType()) {
          sendJsonStr['4'] = ModifyGroupBuilder.getType()
        }
        if (!!ModifyGroupBuilder.getProvince()) {
          sendJsonStr['5'] = ModifyGroupBuilder.getProvince()
        }
        if (!!ModifyGroupBuilder.getCity()) {
          sendJsonStr['6'] = ModifyGroupBuilder.getCity()
        }
        if (!!ModifyGroupBuilder.getScope()) {
          sendJsonStr['7'] = ModifyGroupBuilder.getScope()
        }
        if (!!ModifyGroupBuilder.getDeclared() || "" == ModifyGroupBuilder.getDeclared()) {
          sendJsonStr['8'] = ModifyGroupBuilder.getDeclared()
        }
        if (!!ModifyGroupBuilder.getPermission()) {
          sendJsonStr['9'] = ModifyGroupBuilder.getPermission()
        }
        if (!!ModifyGroupBuilder.getGroupDomain()) {
          sendJsonStr['10'] = ModifyGroupBuilder.getGroupDomain()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ModifyGroup\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._modifyGroup + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildConfirmMsg: function () {
        if (!YTX_CONFIG._checkOnline(function () {}, null)) {
          return null
        }
        if (YTX_CONFIG._msgVersion == 0 || YTX_CONFIG._syncMsgVersion == YTX_CONFIG._msgVersion) {
          return null
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = YTX_CONFIG._msgVersion;
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ConfirmMsg\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(function () {
          YTX_CONFIG._syncMsgVersion = YTX_CONFIG._msgVersion
        }, function () {});
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._confirmMsg + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _getStateTime: null,
      _getStateCount: 0,
      _buildGetUserState: function (GetUserStateBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var curTime = new Date().getTime();
        if (!YTX_CONFIG._protobuf._getStateTime) {
          YTX_CONFIG._protobuf._getStateTime = curTime;
          YTX_CONFIG._protobuf._getStateCount = 0
        } else {
          if (((curTime - YTX_CONFIG._protobuf._getStateTime) > 3000)) {
            YTX_CONFIG._protobuf._getStateCount = 0;
            YTX_CONFIG._protobuf._getStateTime = curTime
          }
        }
        if (YTX_CONFIG._protobuf._getStateCount++ > 0) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._REQUEST_TOO_FREQUENT;
          resp.msg = 'request too frequent, please wait a while.';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        if (!!GetUserStateBuilder.getUseracc()) {
          if (GetUserStateBuilder.getUseracc() instanceof Array) {
            if (GetUserStateBuilder.getUseracc().length == 0) {
              var resp = {};
              resp.code = YTX_CONFIG._errcode._CHARSET_ILLEGAl;
              resp.msg = "getUserState param is null";
              onError(resp);
              return
            } else {
              sendJsonStr['1'] = GetUserStateBuilder.getUseracc()
            }
          } else {
            sendJsonStr['1'] = GetUserStateBuilder.getUseracc()
          }
        } else {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._CHARSET_ILLEGAl;
          resp.msg = "param userAccount param is null";
          onError(resp);
          return
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"GetUserState\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._getUserState + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildSetGroupMemberRole: function (setGroupMemberRoleBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = setGroupMemberRoleBuilder.getGroupId();
        sendJsonStr['2'] = setGroupMemberRoleBuilder.getMemberId();
        sendJsonStr['3'] = setGroupMemberRoleBuilder.getRole();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"SetGroupMemberRole\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._setGroupMemberRole + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildGetFileSource: function (url, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        };
        return '{\"FileUrl\":"' + url + '"}'
      },
      _buildGetHistoryMessage: function (GetHistoryMsgBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        };
        var resp = {};
        if (!GetHistoryMsgBuilder.getTalker()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'talker is required';
          onError(resp);
          return
        };
        var sendJsonStr = new Object();
        sendJsonStr['appId'] = YTX_CONFIG._appid;
        sendJsonStr['userName'] = YTX_CONFIG._userName;
        sendJsonStr['pageSize'] = GetHistoryMsgBuilder.getPageSize();
        sendJsonStr['talker'] = GetHistoryMsgBuilder.getTalker();
        sendJsonStr['order'] = GetHistoryMsgBuilder.getOrder();
        if (GetHistoryMsgBuilder.getTime()) {
          sendJsonStr['time'] = GetHistoryMsgBuilder.getTime()
        }
        if (GetHistoryMsgBuilder.getMsgDecompression()) {
          sendJsonStr['msgDecompression'] = GetHistoryMsgBuilder.getMsgDecompression()
        }
        sendJsonStr['type'] = 1;
        sendJsonStr = JSON.stringify(sendJsonStr);
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"request\":{\"1\":\"ClientHistroyMsg\",\"2\":\"' + YTX_CONFIG._userAcc + '\",\"3\":' + sendJsonStr + ', \"4\":\"' + YTX_CONFIG._reqSig + '\",\"5\":\"' + YTX_CONFIG._reqAuth + '\",\"6\":' + clientNo + '  }}'
      },
      _buildEnterChatroom: function (enterChatroomBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        if (!enterChatroomBuilder.getRoomId()) {
          throw "roomId is Required parameters";
        }
        sendJsonStr['1'] = enterChatroomBuilder.getRoomId();
        if (enterChatroomBuilder.getNickName()) {
          sendJsonStr['2'] = enterChatroomBuilder.getNickName()
        }
        if (enterChatroomBuilder.getInfoExt()) {
          sendJsonStr['3'] = enterChatroomBuilder.getInfoExt()
        }
        if (enterChatroomBuilder.getNeedNotify()) {
          sendJsonStr['4'] = enterChatroomBuilder.getNeedNotify()
        }
        if (enterChatroomBuilder.getNotifyExt()) {
          sendJsonStr['5'] = enterChatroomBuilder.getNotifyExt()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"EnterChatroom\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._enterChatRoom + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildExitChatroom: function (exitChatroomBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        if (!exitChatroomBuilder.getRoomId()) {
          throw "roomId is Required parameters";
        }
        sendJsonStr['1'] = exitChatroomBuilder.getRoomId();
        if (exitChatroomBuilder.getNeedNotify()) {
          sendJsonStr['2'] = exitChatroomBuilder.getNeedNotify()
        }
        if (exitChatroomBuilder.getNotifyExt()) {
          sendJsonStr['3'] = exitChatroomBuilder.getNotifyExt()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ExitChatroom\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._exitChatRoom + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildFetchChatroomInfo: function (fetchChatroomInfoBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        if (!fetchChatroomInfoBuilder.getRoomId()) {
          throw "roomId is Required parameters";
        }
        sendJsonStr['1'] = fetchChatroomInfoBuilder.getRoomId();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"FetchChatroomInfo\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._fetchChatroomInfo + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildFetchChatroomMembers: function (fetchChatroomMembersBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        if (!fetchChatroomMembersBuilder.getRoomId()) {
          throw "roomId is Required parameters";
        }
        sendJsonStr['1'] = fetchChatroomMembersBuilder.getRoomId();
        sendJsonStr['2'] = fetchChatroomMembersBuilder.getUserId();
        sendJsonStr['3'] = fetchChatroomMembersBuilder.getType();
        sendJsonStr['4'] = fetchChatroomMembersBuilder.getPageSize();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"FetchChatroomMembers\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._fetchChatroomMembers + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildUpdateChatroomInfo: function (updateChatroomInfoBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        if (!updateChatroomInfoBuilder.getRoomId()) {
          throw "roomId is Required parameters";
        }
        sendJsonStr['1'] = updateChatroomInfoBuilder.getRoomId();
        if (updateChatroomInfoBuilder.getRoomName()) sendJsonStr['2'] = updateChatroomInfoBuilder.getRoomName();
        if (updateChatroomInfoBuilder.getAnnouncement()) sendJsonStr['3'] = updateChatroomInfoBuilder.getAnnouncement();
        if (updateChatroomInfoBuilder.getRoomExt()) sendJsonStr['4'] = updateChatroomInfoBuilder.getRoomExt();
        if (updateChatroomInfoBuilder.getAllMuteMode()) sendJsonStr['5'] = updateChatroomInfoBuilder.getAllMuteMode();
        if (updateChatroomInfoBuilder.getNeedNotify()) sendJsonStr['6'] = updateChatroomInfoBuilder.getNeedNotify();
        if (updateChatroomInfoBuilder.getNotifyExt()) sendJsonStr['7'] = updateChatroomInfoBuilder.getNotifyExt();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"UpdateChatroomInfo\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._updateChatroomInfo + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildUpdateChatRoomMemberRole: function (updateChatRoomMemberRoleBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!updateChatRoomMemberRoleBuilder.getRoomId()) {
          throw "roomId is Required parameters";
        }
        if (!updateChatRoomMemberRoleBuilder.getUserId()) {
          throw "userId is Required parameters";
        }
        if (!updateChatRoomMemberRoleBuilder.getType()) {
          throw "type is Required parameters";
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = updateChatRoomMemberRoleBuilder.getRoomId();
        sendJsonStr['2'] = updateChatRoomMemberRoleBuilder.getUserId();
        sendJsonStr['3'] = updateChatRoomMemberRoleBuilder.getType();
        if (updateChatRoomMemberRoleBuilder.getNeedNotify()) sendJsonStr['4'] = updateChatRoomMemberRoleBuilder.getNeedNotify();
        if (updateChatRoomMemberRoleBuilder.getNotifyExt()) sendJsonStr['5'] = updateChatRoomMemberRoleBuilder.getNotifyExt();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"UpdateChatRoomMemberRole\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._updateChatRoomMemberRole + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildUpdateMyChatroomMemberInfo: function (updateMyChatroomMemberInfoBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = updateMyChatroomMemberInfoBuilder.getRoomId();
        sendJsonStr['2'] = updateMyChatroomMemberInfoBuilder.getNickName();
        sendJsonStr['3'] = updateMyChatroomMemberInfoBuilder.getInfoExt();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"UpdateMyChatroomMemberInfo\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._updateMyChatroomMemberInfo + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildUpdateMemberOption: function (updateMemberOptionBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!updateMemberOptionBuilder.getRoomId()) {
          throw "roomId is Required parameters";
        }
        if (!updateMemberOptionBuilder.getUserId()) {
          throw "userId is Required parameters";
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = updateMemberOptionBuilder.getRoomId();
        sendJsonStr['2'] = updateMemberOptionBuilder.getUserId();
        if (updateMemberOptionBuilder.getState()) sendJsonStr['3'] = updateMemberOptionBuilder.getState();
        if (updateMemberOptionBuilder.getMuteDuration()) sendJsonStr['4'] = updateMemberOptionBuilder.getMuteDuration();
        if (updateMemberOptionBuilder.getNeedNotify()) sendJsonStr['5'] = updateMemberOptionBuilder.getNeedNotify();
        if (updateMemberOptionBuilder.getNotifyExt()) sendJsonStr['6'] = updateMemberOptionBuilder.getNotifyExt();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"UpdateMemberOption\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._updateMemberOption + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildSetTopContact: function (setTopContactBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        if (!setTopContactBuilder.getContact()) {
          throw "contact is Required parameters";
        } else {
          sendJsonStr['1'] = setTopContactBuilder.getContact()
        }
        if (!setTopContactBuilder.getType()) {
          throw "type is Required parameters";
        } else {
          sendJsonStr['2'] = setTopContactBuilder.getType()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"SetTopContact\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._setTopContact + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildGetTopContact: function (callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._getTopContact + ',\"3\":' + (clientNo) + '}}'
      },
      _buildKickMember: function (kickMemberBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = kickMemberBuilder.getRoomId();
        sendJsonStr['2'] = kickMemberBuilder.getUserIds();
        sendJsonStr['3'] = kickMemberBuilder.getNotifyExt();
        sendJsonStr['4'] = kickMemberBuilder.getNeedNotify();
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"KickMember\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._chatRoom._kickMember + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildConferenceMsg: function (conferenceMsgBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = conferenceMsgBuilder.getPath();
        sendJsonStr['2'] = Base64.encode(conferenceMsgBuilder.getContent());
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"ConferenceMessage\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._ConferenceMessage + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _CallEventData: function (callEvent, callId, isVoipCall, called, caller, userData, strSDP, reason, deviceId) {
        this._callEvent = callEvent;
        this._callId = callId;
        this._isVoipCall = isVoipCall;
        this._called = called;
        this._caller = caller;
        this._userData = userData;
        this._strSDP = strSDP;
        this._reason = reason;
        this._deviceId = deviceId;
        this.getDeviceId = function () {
          return this._deviceId
        };
        this.setDeviceId = function (deviceId) {
          this._deviceId = deviceId
        };
        this.setCallEvent = function (callEvent) {
          this._callEvent = callEvent
        };
        this.setCallId = function (callId) {
          this._callId = callId
        };
        this.setIsVoipCall = function (isVoipCall) {
          this._isVoipCall = isVoipCall
        };
        this.setCalled = function (called) {
          this._called = called
        };
        this.setCaller = function (caller) {
          this._caller = caller
        };
        this.setUserData = function (userData) {
          this._userData = userData
        };
        this.setStrSDP = function (strSDP) {
          this._strSDP = strSDP
        };
        this.setReason = function (reason) {
          this._reason = reason
        };
        this.getCallEvent = function () {
          return this._callEvent
        };
        this.getCallId = function () {
          return this._callId
        };
        this.getIsVoipCall = function () {
          return this._isVoipCall
        };
        this.getCalled = function () {
          return this._called
        };
        this.getCaller = function () {
          return this._caller
        };
        this.getUserData = function () {
          return this._userData
        };
        this.getStrSDP = function () {
          return this._strSDP
        };
        this.getReason = function () {
          return this._reason
        }
      },
      _buildCallEvent: function (CallEventBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!CallEventBuilder || !CallEventBuilder.getCaller() || !CallEventBuilder.getCalled()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param called or caller is empty';
          onError(resp);
          return
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = CallEventBuilder.getCallEvent();
        sendJsonStr['2'] = CallEventBuilder.getCallId();
        if (CallEventBuilder.getIsVoipCall() == 0 || CallEventBuilder.getIsVoipCall() == 1 || CallEventBuilder.getIsVoipCall() == 2) {
          sendJsonStr['3'] = CallEventBuilder.getIsVoipCall()
        }
        sendJsonStr['5'] = CallEventBuilder.getCalled();
        sendJsonStr['7'] = CallEventBuilder.getCaller();
        if (!!CallEventBuilder.getReason()) {
          sendJsonStr['10'] = CallEventBuilder.getReason()
        }
        if (!!CallEventBuilder.getUserData()) {
          sendJsonStr['13'] = CallEventBuilder.getUserData()
        }
        if (!!CallEventBuilder.getStrSDP()) {
          sendJsonStr['17'] = CallEventBuilder.getStrSDP()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"CallEventDataInner\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError, CallEventBuilder.getCallId());
        if (!!YTX_CONFIG._voipCallData._msgRouterMap[CallEventBuilder.getCallId()]) {
          return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._callRoute + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + ',\"9":\"' + YTX_CONFIG._voipCallData._msgRouterMap[CallEventBuilder.getCallId()] + '\"}}'
        } else {
          return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._callRoute + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
        }
      },
      _buildDeleteReadMsg: function (DeleteReadMsgBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        if (!DeleteReadMsgBuilder.getMsgid()) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
          resp.msg = 'param msgId is empty.';
          onError(resp);
          return
        }
        var version = DeleteReadMsgBuilder.getMsgid();
        var idx = version.indexOf('|');
        if (idx > 0) {
          version = version.substr(idx + 1)
        }
        var sendJsonStr = new Object();
        sendJsonStr['1'] = version;
        sendJsonStr['2'] = YTX_CONFIG._userName;
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"MsgOperation\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._deleteReadMsg + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildMsgOperation: function (msgOperationBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sendJsonStr = new Object();
        if (!!msgOperationBuilder.getVersion()) {
          sendJsonStr['1'] = msgOperationBuilder.getVersion()
        }
        if (!!msgOperationBuilder.getMsgId()) {
          sendJsonStr['2'] = msgOperationBuilder.getMsgId()
        }
        if (!sendJsonStr['1'] && !sendJsonStr['2']) {
          var resp = new Object();
          resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
          resp.msg = 'less for parameter msgId or Version at least one ,please check the parameter';
          onError ? onError(resp) : YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, resp.msg)
        }
        if (!!msgOperationBuilder.getType()) {
          sendJsonStr['3'] = msgOperationBuilder.getType()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        var sendProto = '{\"MsgOperation\":' + sendJsonStr + '}';
        return '{\"MsgLite\":{\"1\":' + YTX_CONFIG._prototype._msgOperation + ',\"2\":' + sendProto + ',\"3\":' + (clientNo) + '}}'
      },
      _buildGetRecentContactList: function (GetRecentContactListBuilder, callback, onError) {
        if (!YTX_CONFIG._checkOnline(onError, null)) {
          return null
        }
        var sig = YTX_CONFIG._fileSig;
        var sendJsonStr = new Object();
        sendJsonStr['1'] = YTX_CONFIG._appid;
        sendJsonStr['2'] = YTX_CONFIG._userName;
        if (GetRecentContactListBuilder.getTime()) {
          sendJsonStr['3'] = GetRecentContactListBuilder.getTime()
        }
        if (GetRecentContactListBuilder.getLimit()) {
          sendJsonStr['4'] = GetRecentContactListBuilder.getLimit()
        }
        sendJsonStr = JSON.stringify(sendJsonStr);
        var sendProto = '{\"RecentlyContactsList\":' + sendJsonStr + '}';
        var clientNo = YTX_CONFIG._generateClientNo(callback, onError);
        return '{\"Http\":{\"1\":4,\"2\":' + sendProto + ',\"3\":' + clientNo + ',\"4\":\"' + sig + '\"}}'
      },
      _parseLoginResp: function (obj) {
        var data = obj["2"];
        data = data["UserAuthResp"];
        var resp = {};
        resp.authState = data["1"];
        resp.kickoffText = data["2"];
        resp.connectorId = data["3"];
        resp.version = (!!data["4"]) ? data["4"] : 0;
        resp.transferPolicy = data["6"];
        resp.pversion = data["7"];
        resp.softVersion = data["8"];
        resp.historyver = (!!data["10"]) ? data["10"] : 0;
        resp.authToken = data["11"];
        resp.ipSpeedTestPolicy = data["12"];
        resp.multLine = data["18"];
        return resp
      },
      _parseCodeResp: function (obj) {
        var resp = {};
        resp.code = obj["6"];
        return resp
      },
      _parseConferenceMessageResp: function (obj) {
        var resp = {};
        resp.code = obj["6"];
        resp.result = Base64.decode(obj["2"]["ConferenceMessageResp"]["1"]);
        return resp
      },
      _parseSendMsgResp: function (obj, request) {
        var data = obj["2"];
        var resp = {};
        if (!!data && !!data["SendMsgResp"]) {
          data = data["SendMsgResp"];
          resp.token = data["1"];
          resp.url = data["2"]
        }
        var clientNo = obj["3"];
        var msgId = request.orignMsgId;
        var msgClientNo = request.msgId;
        resp.msgId = msgId;
        resp.msgClientNo = msgClientNo;
        return resp
      },
      _parseSendChatroomMsgResp: function (obj, request) {
        var resp = {};
        resp.msgId = request.msgId;
        resp.msgClientNo = request.msgClinetNo;
        resp.code = obj["6"];
        return resp
      },
      _parseSendMsgRespErr: function (obj, request) {
        var resp = {};
        var clientNo = obj["3"];
        resp.msgClientNo = request.msgId;
        resp.msgId = request.orignMsgId;
        resp.code = obj["6"];
        return resp
      },
      _parseChatRoomMsgInner: function (obj) {
        if (!obj.msgDomain) {
          return obj
        }
        var data = JSON.parse(Base64.decode(obj.msgDomain));
        var resp = {};
        resp["msgSender"] = obj.msgSender;
        resp["msgReceiver"] = obj.msgReceiver;
        resp["msgType"] = obj.msgType;
        resp["msgDateCreated"] = obj.msgDateCreated;
        resp["type"] = data.type;
        resp["roomId"] = data.roomId;
        resp["member"] = data.member;
        resp["nickName"] = data.nickName;
        resp["role"] = data.role;
        resp["roomName"] = data.roomName;
        if (data.notifyExt) resp["notifyExt"] = Base64.decode(data.notifyExt);
        return resp
      },
      _parseChatRoomMsg: function (obj) {
        var data = obj["2"];
        if (!data) {
          return {
            code: obj[6]
          }
        }
        data = data["PushMsg"];
        var resp = {};
        resp.version = data["1"];
        resp.msgType = (!!data["2"]) ? data["2"] : 1;
        resp.sessionId = data["3"];
        if (!!data["4"]) {
          resp.msgContent = Base64.decode(data["4"])
        } else {
          resp.msgContent = ''
        }
        resp.msgSender = data["5"];
        resp.msgReceiver = data["6"];
        resp.msgDomain = data["7"];
        resp.msgDateCreated = data["10"];
        resp.senderNickName = data["13"];
        if (!!data["16"]) {
          resp.senderNick = data[16]
        }
        return resp
      },
      _parseConferenceNotice: function (obj) {
        var data = obj["2"];
        if (!data) {
          return {
            code: obj[6]
          }
        }
        var reData = data["ConferenceNotification"];
        return reData
      },
      _parsePushMsgResp: function (obj) {
        var data = obj["2"];
        data = data["PushMsg"];
        var resp = {};
        resp.version = data["1"];
        resp.msgType = (!!data["2"]) ? data["2"] : 1;
        resp.sessionId = data["3"];
        if (!!data["4"]) {
          resp.msgContent = Base64.decode(data["4"])
        } else {
          resp.msgContent = ''
        }
        resp.msgSender = data["5"];
        resp.msgReceiver = data["6"];
        resp.msgDomain = data["7"];
        resp.msgFileName = data["8"];
        if (!!data["9"]) {
          var fileUrl = data["9"];
          if (!fileUrl.startWith('http')) {
            if (fileUrl.indexOf('_thum') > 0) {
              fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'))
            }
            var len = YTX_CONFIG._lvs_servers.length;
            var Range = len - 1;
            var Rand = Math.random();
            var idx = Math.round(Rand * Range);
            var lvsServer = Base64.decode(YTX_CONFIG._lvs_servers[idx]);
            fileUrl = lvsServer + fileUrl
          }
          resp.msgFileUrl = fileUrl;
          if (resp.msgType == 3) {
            resp.msgFileUrlThum = resp.msgFileUrl + '_thum'
          }
        }
        resp.msgDateCreated = data["10"];
        resp.senderNickName = data["13"];
        resp.mcmEvent = 0;
        if (!!data["14"]) {
          resp.msgFileSize = data["14"]
        }
        if (!!data["15"]) {
          var data = Base64.decode(data["15"]);
          data = JSON.parse(data);
          if (data["isat"]) {
            resp.isAtMsg = true
          }
          if (data["isSave"]) {
            resp.isSave = true
          }
          if (data["isSyncMsg"]) {
            resp.isSyncMsg = true
          }
          if (data["isOfflinePush"]) {
            resp.isOfflinePush = true
          }
          if (data["isHint"]) {
            resp.isHint = true
          }
        }
        if (!!data["16"]) {
          resp.senderNick = data[16]
        }
        return resp
      },
      _parseMCM_Msg: function (data) {
        var msg = {};
        msg.mcmEvent = data["1"];
        msg.version = data["2"];
        msg.chanType = data["8"];
        msg.addrJson = data["19"];
        if (msg.mcmEvent == YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_SendMCM) {
          msg.msgSender = data["5"];
          msg.msgReceiver = (!!data["4"]) ? data["4"] : YTX_CONFIG._userName
        } else if (msg.mcmEvent == YTX_CONFIG._prototype._mcmEventData._mcmEventDef._UserEvt_SendMSG) {
          msg.msgSender = data["4"];
          msg.msgReceiver = (!!data["5"]) ? data["5"] : YTX_CONFIG._userName
        }
        msg.msgDomain = data["16"];
        msg.msgDateCreated = data["3"];
        msg.msgId = msg.msgDateCreated + '|' + msg.version;
        if (!!data["6"]) {
          var msgInfos = data["6"];
          if (!!msgInfos && msgInfos.length > 0) {
            var msgInfo = msgInfos[0];
            msg.msgType = msgInfo["1"];
            msg.msgContent = msgInfo["2"];
            msg.msgFileName = msgInfo["4"];
            if (!!msgInfo["3"]) {
              var fileUrl = msgInfo["3"];
              if (fileUrl.indexOf('_thum') > 0) {
                fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'))
              }
              var len = YTX_CONFIG._lvs_servers.length;
              var Range = len - 1;
              var Rand = Math.random();
              var idx = Math.round(Rand * Range);
              var lvsServer = Base64.decode(YTX_CONFIG._lvs_servers[idx]);
              msg.msgFileUrl = lvsServer + fileUrl;
              if (msg.msgType == 3) {
                msg.msgFileUrlThum = msg.msgFileUrl + '_thum'
              }
            }
          }
        }
        return msg
      },
      _parseMCMNotice_Msg: function (data) {
        var msg = {};
        msg.mcmEvent = data["1"];
        msg.version = data["2"];
        msg.msgDateCreated = data["3"];
        msg.msgId = msg.msgDateCreated + '|' + msg.version;
        if (!!data["4"]) {
          msg.userAccount = data["4"]
        }
        if (!!data["5"]) {
          msg.osUnityAccount = data["5"]
        }
        if (!!data["6"]) {
          var msgInfos = data["6"];
          if (!!msgInfos && msgInfos.length > 0) {
            var msgInfo = msgInfos[0];
            var m = {};
            m.msgType = msgInfo["1"];
            m.msgContent = msgInfo["2"];
            m.msgFileUrl = msgInfo["3"];
            if (!!msgInfo["3"]) {
              var fileUrl = msgInfo["3"];
              if (fileUrl.indexOf('_thum') > 0) {
                fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'))
              }
              var len = YTX_CONFIG._lvs_servers.length;
              var Range = len - 1;
              var Rand = Math.random();
              var idx = Math.round(Rand * Range);
              var lvsServer = Base64.decode(YTX_CONFIG._lvs_servers[idx]);
              m.msgFileUrl = lvsServer + fileUrl;
              if (m.msgType == 3) {
                m.msgFileUrlThum = msg.msgFileUrl + '_thum'
              }
            }
            m.msgFileName = msgInfo["4"];
            msg.MSGData = m
          }
        }
        if (!!data["7"]) {
          var m = {};
          var d = data["7"];
          m.notifyDes = d["1"];
          var items = new Array();
          var d2 = d["2"];
          for (var i in d2) {
            var itemObj = d2[i];
            var item = {};
            item.key = itemObj["1"];
            item.value = itemObj["2"];
            items.push(item)
          }
          m.selectItems = items;
          msg.userIRCN = m
        }
        if (!!data["8"]) {
          msg.chanType = data["8"]
        }
        if (!!data["9"]) {
          msg.agentAccount = data["9"]
        }
        if (!!data["10"]) {
          msg.agentId = data["10"]
        }
        if (!!data["11"]) {
          msg.transAgentId = data["11"]
        }
        if (!!data["12"]) {
          msg.userPhone = data["12"]
        }
        if (!!data["13"]) {
          var m = {};
          var d = data["13"];
          m.agentId = d["1"];
          m.imState = d["2"];
          m.telState = d["3"];
          m.number = d["4"];
          m.pushVoipacc = d["5"];
          m.queueType = d["6"];
          m.userInfoCallbackurl = d["7"];
          m.delayCall = d["8"];
          m.answerTimeout = d["9"];
          m.queuePriority = d["10"];
          m.maxImUser = d["11"];
          m.agentServerMode = d["12"];
          msg.agentInfo = m
        }
        if (!!data["14"]) {
          var m = {};
          var d = data["14"];
          m.optResult = d["1"];
          m.optRetDes = d["2"];
          m.optUserData = d["3"];
          msg.agentStateOpt = m
        }
        if (!!data["15"]) {
          msg.appId = data["15"]
        }
        if (!!data["16"]) {
          msg.userData = data["16"]
        }
        if (!!data["17"]) {
          msg.ccpCustomData = data["17"]
        }
        if (!!data["18"]) {
          msg.queueType = data["18"]
        }
        if (!!data["19"]) {
          msg.msgJsonData = data["19"]
        }
        if (!!data["20"]) {
          msg.CCSType = data["20"]
        }
        if (!!data["21"]) {
          msg.nickName = data["21"]
        }
        if (!!data["22"]) {
          msg.serviceCap = data["22"]
        }
        return msg
      },
      _parseNoticeMsg: function (obj) {
        var domain = obj.msgDomain;
        domain = Base64.decode(domain).replace(new RegExp(/(')/g), "\"");
        var domainInfo = JSON.parse(domain);
        var resp = {};
        resp.auditType = domainInfo.auditType;
        resp.groupId = domainInfo.groupId;
        resp.groupName = domainInfo.groupName;
        resp.declared = domainInfo.declared;
        resp.confirm = domainInfo.confirm;
        resp.ext = domainInfo.ext;
        resp.version = obj.version;
        resp.serviceNo = obj.msgSender;
        resp.target = domainInfo.target;
        if (domainInfo.auditType == 2 || domainInfo.auditType == 4 || domainInfo.auditType == 10) {
          resp.admin = domainInfo.member;
          resp.adminName = domainInfo.nickName
        } else if (domainInfo["auditType"] == 11) {
          resp.admin = domainInfo.admin;
          resp.member = domainInfo.member;
          resp.memberName = domainInfo.nickName
        } else {
          resp.member = domainInfo.member;
          resp.memberName = domainInfo.nickName
        }
        return resp
      },
      _parsePushMsgNotifyResp: function (obj) {
        var data = obj["2"];
        data = data["PushMsgNotify"];
        var resp = {};
        resp.version = data["1"];
        return resp
      },
      _parseMsgNotify: function (obj) {
        var domain = obj.msgDomain;
        var domainInfo = JSON.parse(domain);
        var msgId = domainInfo.msgid;
        var resp = {};
        resp.msgType = obj.msgType;
        resp.sender = obj.msgSender;
        resp.msgId = msgId;
        resp.dateCreated = obj.dateCreated;
        return resp
      },
      _parseSyncMsgResp: function (obj, request) {
        var data = obj["2"];
        data = data["SyncMsgResp"];
        var resp = new Array();
        var recVersion = 0;
        for (var i in data) {
          var orign = data[i];
          var msg = {};
          msg.version = orign["1"];
          if (recVersion < msg.version) {
            recVersion = msg.version
          }
          msg.msgType = (!!orign["2"]) ? orign["2"] : 1;
          msg.msgContent = orign["4"];
          if (!!orign["4"]) {
            msg.msgContent = Base64.decode(orign["4"])
          } else {
            msg.msgContent = ''
          }
          msg.msgSender = orign["5"];
          msg.sessionId = orign["3"];
          msg.msgReceiver = orign["6"];
          msg.msgDomain = orign["7"];
          msg.msgFileName = orign["8"];
          if (!!orign["9"]) {
            var fileUrl = orign["9"];
            if (fileUrl.indexOf('_thum') > 0) {
              fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'))
            }
            var len = YTX_CONFIG._lvs_servers.length;
            var Range = len - 1;
            var Rand = Math.random();
            var idx = Math.round(Rand * Range);
            var lvsServer = Base64.decode(YTX_CONFIG._lvs_servers[idx]);
            msg.msgFileUrl = lvsServer + fileUrl;
            if (msg.msgType == 3) {
              msg.msgFileUrlThum = msg.msgFileUrl + '_thum'
            }
          }
          msg.msgDateCreated = orign["10"];
          if (!!orign["13"]) {
            msg.mcmEvent = orign["13"]
          } else {
            msg.mcmEvent = 0
          }
          if (!!orign["14"]) {
            msg.msgFileSize = orign["14"]
          }
          if (!!orign["15"]) {
            msg.isAtMsg = Base64.decode(orign["15"])
          }
          if (!!orign["16"]) {
            msg.msgSenderNick = orign["16"]
          }
          resp.push(msg)
        }
        return resp
      },
      _parseGetHistoryMsg: function (obj) {
        var resp = new Array();
        var data = obj["2"];
        for (var i in data) {
          var orign = data[i];
          var result = {};
          if (orign.msgType == YTX_CONFIG._prototype._msg_CMD) {
            var msg = YTX_CONFIG._protobuf._parseNoticeMsg(orign);
            var you_sender = msg.serviceNo;
            var groupId = msg.groupId;
            var name = '系统通知';
            var groupName = msg.groupName;
            var version = msg.msgId;
            var peopleId = msg.member;
            var people = (!!msg.memberName) ? msg.memberName : msg.member;
            var you_msgContent = '';
            var auditType = msg.auditType;
            var groupTarget = (msg.target == 2) ? "群组" : "讨论组";
            if (1 == auditType) {
              you_msgContent = '[' + people + ']申请加入' + groupTarget + '[' + groupName + ']'
            } else if (2 == auditType) {
              you_msgContent = '[' + groupName + ']管理员邀请您加入' + groupTarget
            } else if (3 == auditType) {
              you_msgContent = '[' + people + ']直接加入群组[' + groupName + ']'
            } else if (4 == auditType) {
              you_msgContent = '管理员解散了群组[' + groupName + ']'
            } else if (5 == auditType) {
              you_msgContent = '[' + people + ']退出了' + groupTarget + '[' + groupName + ']'
            } else if (6 == auditType) {
              you_msgContent = '[' + groupName + ']管理员将[' + people + ']踢出' + groupTarget
            } else if (7 == auditType) {
              you_msgContent = '管理员同意[' + people + ']加入群组[' + groupName + ']的申请'
            } else if (8 == auditType) {
              if (2 != obj.confirm) {
                you_msgContent = '[' + people + ']拒绝了群组[' + groupName + ']的邀请'
              } else {
                you_msgContent = '[' + people + ']同意了管理员的邀请，加入群组[' + groupName + ']'
              }
            } else if (10 == auditType) {
              you_msgContent = '管理员修改' + groupTarget + '[' + groupName + ']信息'
            } else if (11 == auditType) {
              you_msgContent = '用户[' + people + ']修改群组成员名片'
            } else if (12 == auditType) {
              you_msgContent = '用户[' + people + ']成为' + groupTarget + '[' + groupName + ']管理员'
            } else {
              you_msgContent = '未知type[' + auditType + ']'
            }
            result.msgContent = you_msgContent;
            result.msgType = orign.msgType;
            result.msgSender = name;
            result.msgId = orign.msgDateCreated + '|' + orign.version
          } else {
            if (!!orign.version) {
              result.msgId = orign.msgDateCreated + '|' + orign.version
            } else {
              result.msgId = orign.msgId
            }
            result.msgContent = orign.msgContent;
            result.msgSender = orign.msgSender;
            result.msgReceiver = orign.msgReceiver;
            result.msgDomain = orign.msgDomain;
            if (orign.msgFileName) {
              result.msgFileName = orign.msgFileName
            }
            if (!!orign.msgFileUrl) {
              var fileUrl = orign.msgFileUrl;
              if (fileUrl.indexOf('_thum') > 0) {
                fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'))
              }
              var len = YTX_CONFIG._lvs_servers.length;
              var Range = len - 1;
              var Rand = Math.random();
              var idx = Math.round(Rand * Range);
              var lvsServer = Base64.decode(YTX_CONFIG._lvs_servers[idx]);
              result.msgFileUrl = lvsServer + fileUrl;
              if (result.msgType == 3) {
                result.msgFileUrlThum = msg.msgFileUrl + '_thum'
              }
            }
          }
          result.msgDateCreated = orign.msgDateCreated;
          if (!!orign.msgFileSize) {
            result.msgFileSize = orign.msgFileSize
          }
          if (!!orign.mcmEvent) {
            result.mcmEvent = orign.mcmEvent
          } else {
            result.mcmEvent = 0
          }
          resp.push(result)
        }
        return resp
      },
      _parseGetMyInfo: function (obj) {
        var data = obj["2"];
        data = data["PersonInfoResp"];
        var resp = {};
        resp.version = data["1"];
        resp.nickName = data["2"];
        resp.sex = data["3"];
        resp.birth = data["4"];
        resp.sign = data["5"];
        return resp
      },
      _parseMcmMsg: function (obj) {
        var data = obj["2"];
        if (!data) {
          return
        }
        data = data["MCMData"];
        var mcmEvent = data["1"];
        if (mcmEvent == YTX_CONFIG._prototype._mcmEventData._mcmEventDef._AgentEvt_SendMCM || mcmEvent == YTX_CONFIG._prototype._mcmEventData._mcmEventDef._UserEvt_SendMSG) {
          var resp = YTX_CONFIG._protobuf._parseMCM_Msg(data);
          YTX_CONFIG._mcmListener(resp)
        } else {
          var resp = YTX_CONFIG._protobuf._parseMCMNotice_Msg(data);
          YTX_CONFIG._mcmNoticeListener(resp)
        }
      },
      _parseCreateGroupResp: function (obj) {
        var data = obj["2"];
        if (!data) {
          return
        }
        data = data["CreateGroupResp"];
        var msg = {};
        msg.data = data["1"];
        return msg
      },
      _parseGetGroupListResp: function (obj, callback, onErr) {
        var data = obj["2"];
        if (!data) {
          callback(YTX_CONFIG._groupConfig._groupArray);
          YTX_CONFIG._groupConfig._groupArray = [];
          return
        }
        data = data["GetOwnerGroupsResp"];
        data = data["1"];
        for (var i = 0; i < data.length; i++) {
          var simpleObj = data[i];
          var simpleGroup = {};
          simpleGroup.groupId = simpleObj["1"];
          simpleGroup.name = simpleObj["2"];
          simpleGroup.owner = simpleObj["3"];
          simpleGroup.permission = simpleObj["4"];
          simpleGroup.isNotice = simpleObj["5"];
          simpleGroup.memberCount = simpleObj["6"];
          simpleGroup.scope = simpleObj["7"];
          simpleGroup.dateCreated = simpleObj["8"];
          simpleGroup.target = simpleObj["9"];
          YTX_CONFIG._groupConfig._groupArray.push(simpleGroup)
        }
        if (data.length == YTX_CONFIG._groupConfig._builder.getPageSize()) {
          var groupId = data[data.length - 1]["1"];
          var GetGroupListBuilder = YTX_CONFIG._groupConfig._builder;
          GetGroupListBuilder.setGroupId(groupId);
          RL_YTX.getGroupList(GetGroupListBuilder, callback, onErr)
        } else {
          callback(YTX_CONFIG._groupConfig._groupArray);
          YTX_CONFIG._groupConfig._groupArray = []
        }
      },
      _parseGetGroupMemberListResp: function (obj, callback, onErr) {
        var data = obj["2"];
        if (!data) {
          callback(YTX_CONFIG._groupConfig._groupMemberArray);
          YTX_CONFIG._groupConfig._groupMemberArray = [];
          return
        }
        data = data["GetGroupMembersResp"];
        var groupId = data["1"];
        data = data["2"];
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var member = {};
          member.member = obj["1"];
          member.nickName = obj["2"];
          member.speakState = obj["3"];
          member.role = obj["4"];
          member.sex = obj["5"];
          YTX_CONFIG._groupConfig._groupMemberArray.push(member)
        }
        if (data.length == YTX_CONFIG._groupConfig._builder.getPageSize()) {
          var memberId = data[data.length - 1]["1"];
          var GetGroupMemberListBuilder = YTX_CONFIG._groupConfig._builder;
          GetGroupMemberListBuilder.setMemberId(memberId);
          RL_YTX.getGroupMemberList(GetGroupMemberListBuilder, callback, onErr)
        } else {
          callback(YTX_CONFIG._groupConfig._groupMemberArray);
          YTX_CONFIG._groupConfig._groupMemberArray = []
        }
      },
      _parseGetGroupDetailResp: function (obj) {
        var data = obj["2"];
        var resp = {};
        data = data["GetGroupDetailResp"];
        resp.creator = data["1"];
        resp.groupName = data["2"];
        resp.type = data["3"];
        resp.province = data["4"];
        resp.city = data["5"];
        resp.scope = data["6"];
        resp.declared = data["7"];
        resp.dateCreated = data["8"];
        resp.numbers = data["9"];
        resp.isNotice = data["10"];
        resp.permission = data["11"];
        resp.groupDomain = data["12"];
        resp.isApplePush = data["13"];
        resp.target = data["14"];
        return resp
      },
      _parseSearchGroupsResp: function (obj) {
        var data = obj["2"];
        var resp = new Array();
        if (!data) {
          return resp
        }
        data = data["SearchGroupsResp"];
        data = data["1"];
        for (var i in data) {
          var simpleObj = data[i];
          var simpleGroup = {};
          simpleGroup.groupId = simpleObj["1"];
          simpleGroup.name = simpleObj["2"];
          simpleGroup.owner = simpleObj["3"];
          simpleGroup.permission = simpleObj["4"];
          simpleGroup.declared = simpleObj["5"];
          simpleGroup.memberCount = simpleObj["6"];
          simpleGroup.scope = simpleObj["7"];
          resp.push(simpleGroup)
        }
        return resp
      },
      _parseQueryGroupMemberCard: function (obj) {
        var data = obj["2"];
        var resp = {};
        if (!data) {
          return resp
        }
        data = data["QueryGroupMemberCardResp"];
        resp.member = data["1"];
        resp.groupid = data["2"];
        resp.display = data["3"];
        resp.phone = data["4"];
        resp.mail = data["5"];
        resp.remark = data["6"];
        resp.speakState = data["7"];
        resp.role = data["8"];
        resp.sex = data["9"];
        return resp
      },
      _parseKickOffResp: function (obj) {
        var data = obj["2"];
        data = data["UserAuthResp"];
        var resp = {};
        resp.code = 4;
        resp.msg = data["2"];
        return resp
      },
      _parseGetUserState: function (obj) {
        var data = obj["2"];
        var resp = {};
        if (!data) {
          return resp
        }
        data = data["GetUserStateResp"] ? data["GetUserStateResp"] : data["GetMultiUserStateResp"][0]["GetUserStateResp"];
        resp.useracc = data["1"];
        resp.network = data["2"];
        resp.state = data["3"];
        resp.device = data["4"];
        return resp
      },
      _parseGetTopContactResp: function (obj) {
        return obj["2"]["GetTopContactResp"]
      },
      _parseEnterChatroomResp: function (obj) {
        var data = obj["2"];
        data = data["EnterChatroomResp"];
        var resp = {};
        if (!data) {
          return resp
        }
        resp.creator = data["1"];
        resp.roomNickname = data["2"];
        resp.notice = data["3"];
        resp.onlineCount = data["4"];
        resp.allSilence = data["5"];
        resp.roomExt = data["6"];
        resp.url = data["7"];
        resp.userRole = data["8"];
        resp.state = data["9"];
        resp.keepSilence = data["10"];
        resp.enterTime = data["11"];
        return resp
      },
      _parseFetchChatroomInfoResp: function (obj) {
        var data = obj["2"];
        data = data["FetchChatroomInfoResp"];
        var resp = {};
        if (!data) {
          return resp
        }
        resp.creator = data["1"];
        resp.roomNickname = data["2"];
        resp.notice = data["3"];
        resp.onlineCount = data["4"];
        resp.allSilence = data["5"];
        resp.roomExt = data["6"];
        return resp
      },
      _parseFetchChatroomMembersResp: function (obj) {
        var data = obj["2"]["FetchChatroomMembersResp"];
        var resp = new Array();
        if (!data) {
          return resp
        }
        for (var i = 0; i < data.length; i++) {
          var simpleObj = data[i]["ChatroomMember"];
          var simpleGroup = {};
          simpleGroup.userId = simpleObj["1"];
          simpleGroup.nickName = simpleObj["2"];
          simpleGroup.type = simpleObj["3"];
          simpleGroup.state = simpleObj["4"];
          simpleGroup.muteDuration = simpleObj["5"];
          simpleGroup.enterTime = simpleObj["6"];
          simpleGroup.infoExt = simpleObj["7"];
          resp.push(simpleGroup)
        }
        return resp
      },
      _parseGetUserState_multy: function (obj) {
        var data;
        var resp = {};
        if (!!obj["2"]["GetMultiUserStateResp"]) {
          data = obj["2"]["GetMultiUserStateResp"];
          if (!data) {
            data = obj["2"]["GetUserStateResp"];
            if (!data) {
              return resp
            } else {
              resp.useracc = data["1"];
              resp.network = data["2"];
              resp.state = data["3"];
              resp.device = data["4"]
            }
          } else {
            resp = [];
            for (var i = 0; i < data.length; i++) {
              var dataPer = data[i]["GetUserStateResp"];
              var respPer = {};
              respPer.useracc = dataPer["1"];
              respPer.network = dataPer["2"];
              respPer.state = dataPer["3"];
              respPer.device = dataPer["4"];
              resp.push(respPer)
            }
          }
        } else {
          resp = [];
          var dataPer = obj["2"]["GetUserStateResp"];
          var respPer = {};
          if (!!data) return resp;
          respPer.useracc = dataPer["1"];
          respPer.network = dataPer["2"];
          respPer.state = dataPer["3"];
          respPer.device = dataPer["4"];
          resp.push(respPer)
        }
        return resp
      },
      _parseCallEventData: function (obj) {
        var data = obj["2"];
        var resp = {};
        if (!data) {
          return resp
        }
        data = data["CallEventData"];
        resp = new YTX_CONFIG._protobuf._CallEventData(data["1"], data["2"], data["3"], data["5"], data["7"], data["13"], data["17"], data["10"]);
        return resp
      },
      _parseOldMeetingEventData: function (obj) {
        var data = obj["2"];
        var resp = {};
        if (!data) {
          return resp
        }
        data = data["CallEventData"];
        resp = new YTX_CONFIG._protobuf._CallEventData(data["1"], data["2"], data["3"], data["5"], data["7"], data["13"], data["17"], data["10"]);
        var spe = data["13"];
        spe = spe.split(";");
        for (var i = 0; i < spe.length; i++) {
          if (spe[i].length === 0) continue;
          var l = spe[i].split("=");
          resp[l[0]] = l[1]
        }
        return resp
      },
      _parseGetRecentContactList: function (obj) {
        var resp = [];
        var data = obj["2"];
        for (var i in data) {
          var orign = data[i];
          var result = {};
          var userAcc = orign.sessionId;
          var name = orign.sessionName;
          var time = orign.dateCreated;
          result.name = name;
          result.time = time;
          result.contact = userAcc;
          resp.push(result)
        }
        return resp
      }
    },
    _logout: function () {
      YTX_CONFIG._token = null;
      YTX_CONFIG._userName = null;
      YTX_CONFIG._userPwd = null;
      YTX_CONFIG._imei = null;
      YTX_CONFIG.chatRommId = null;
      YTX_CONFIG.chatRommNickName = null;
      RL_YTX.chatRommId = null;
      RL_YTX.chatRommNickName = null;
      for (var i in YTX_CONFIG._clientMap) {
        var request = YTX_CONFIG._clientMap[i];
        if (!request) {
          return
        }
        try {
          clearTimeout(request.timeout)
        } catch (e) {
          console.log("Cannot read property 'timeout' of undefined")
        }
      }
      YTX_CONFIG._clientMap = {};
      YTX_CONFIG._sessionId = null;
      YTX_CONFIG._currentSession = null;
      YTX_CONFIG._ClientNo = 0;
      YTX_CONFIG._sendMsgId = 0;
      YTX_CONFIG._msgVersion = 0;
      YTX_CONFIG._syncMsgVersion = 0;
      YTX_CONFIG._maxMsgVersion = 0;
      YTX_CONFIG._syncMsgPorcessing = false;
      YTX_CONFIG._receiveMsgBuf = {};
      YTX_CONFIG._isReconnect = false;
      YTX_CONFIG._loginStatus = 1;
      YTX_CONFIG._isConnect = false;
      if (YTX_CONFIG._socket) {
        YTX_CONFIG._socket.close()
      }
      YTX_CONFIG._socket = null;
      window.clearInterval(YTX_CONFIG._intervalId);
      YTX_CONFIG._intervalId = null;
      RL_YTX.photo.cancel();
      RL_YTX.audio.cancel()
    },
    _connectStateChange: function (code, msg) {
      if (YTX_CONFIG._connectStatListener) {
        var resp = {};
        resp.code = code;
        resp.msg = msg;
        YTX_CONFIG._connectStatListener(resp)
      }
    },
    _onShortAuthFail: function (callback) {
      YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "shrot autl fail, complete auth");
      YTX_CONFIG._isReconnect = true;
      if (YTX_CONFIG._userPwd) {
        YTX_CONFIG._initScoket(3, callback, function () {})
      } else {
        YTX_CONFIG._initScoket(1, callback, function () {})
      }
    },
    _reconnect: function (callback) {
      YTX_CONFIG._connectStateChange(2, "reconnect to server");
      YTX_CONFIG._isReconnect = true;
      YTX_CONFIG._initScoket(2, callback, function () {}, null, null, true)
    },
    _sendFile: function (fileInfo, content, receiver, msgType, msgId, msgDomain, type, callback, onError, progress, fileName, orignMsgId) {
      if (!YTX_CONFIG._checkOnline(onError, orignMsgId, msgId)) {
        YTX_CONFIG._ClientNo++;
        return
      }
      if (!fileInfo || !receiver || !msgType) {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
        resp.msgId = orignMsgId;
        resp.msgClientNo = msgId;
        resp.msg = 'param file or receiver or type is empty';
        onError(resp);
        return
      }
      var sendStatus = 1;
      if (!(fileInfo instanceof File) && !(fileInfo instanceof Blob)) {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._FILE_PARAM_ERROR;
        resp.msgId = orignMsgId;
        resp.msgClientNo = msgId;
        resp.msg = 'param file is illegal';
        onError(resp);
        return
      }
      if (fileInfo.size >= YTX_CONFIG._maxFileLen) {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._FILE_TOO_LARGE;
        resp.msgId = orignMsgId;
        resp.msgClientNo = msgId;
        resp.msg = 'param file is too large.';
        onError(resp);
        return
      }
      var tId = setTimeout(function () {
        if (sendStatus == 2) {
          return
        }
        sendStatus = 3;
        var resp = {};
        if (YTX_CONFIG._loginStatus == 2) {
          YTX_CONFIG._loginStatus = 1
        }
        resp.code = YTX_CONFIG._errcode._RESP_TIME_OUT;
        resp.msgId = orignMsgId;
        resp.msgClientNo = msgId;
        resp.msg = 'connec to fileserver time out.';
        onError(resp)
      }, YTX_CONFIG._fileTimeOutSecond * 1000);
      var fileurl = Base64.decode(YTX_CONFIG._file_server_url);
      var ws = new WebSocket(fileurl);
      var total = fileInfo.size;
      var part;
      var start = 0;
      var binaryString;
      var buf = 1024;
      var end = start + buf;
      var filetimeout = 0;

      function sendFileByStep() {
        var k = 0;
        while (start < total && k++ < 100) {
          end = start + buf;
          if (end > total) {
            end = total
          }
          if (binaryString.slice) {
            part = binaryString.slice(start, end)
          } else if (binaryString.mozSlice) {
            part = binaryString.mozSlice(start, end)
          } else if (binaryString.webkitSlice) {
            part = binaryString.webkitSlice(start, end)
          } else {
            part = binaryString;
            end = total;
            start = total;
            if (total > YTX_CONFIG._maxSingleFileLen) {
              var err = {};
              err.code = YTX_CONFIG._errcode._FILE_TOO_LARGE;
              err.msg = "for Blob.slice() is not support by browser , you can send max file length under " + YTX_CONFIG._maxSingleFileLen + "byte";
              onError(err);
              if (ws.close) ws.close();
              return
            }
          }
          try {
            ws.send(part);
            if (end == total) {
              var sendStr = YTX_CONFIG._protobuf._buildSendFileMsgEnd(callback, onError, msgId, orignMsgId);
              if (!sendStr) {
                return
              }
              ws.send(sendStr)
            }
          } catch (e) {
            console.log("发送文件失败，file websocket已经关闭" + e);
            break
          }
          if (typeof progress == 'function') {
            progress(start, total, msgId)
          }
          start = end
        }
        k = 0;
        if (start < total) {
          sendStr = YTX_CONFIG._protobuf._buildSendSchedule(function () {}, function () {}, 456);
          ws.send(sendStr);
          filetimeout = setTimeout(function () {
            var resp = {};
            resp.code = YTX_CONFIG._errcode._RESP_TIME_OUT;
            resp.msgId = orignMsgId;
            resp.msgClientNo = msgId;
            resp.msg = 'send file timeout, file websocket will close';
            onError(resp);
            onError();
            ws.close()
          }, YTX_CONFIG._timeOutSecond * 1000)
        }
        if (typeof progress != 'function') {
          progress(start, total, msgId)
        }
      }
      ws.onopen = function (event) {
        if (sendStatus == 3) {
          ws.close();
          return
        }
        sendStatus = 2;
        YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "connect to file socket");
        var sendStr = YTX_CONFIG._protobuf._buildSendFileMsgStart(fileInfo, null, receiver, msgType, orignMsgId, msgDomain, type, onError, fileName, msgId, true);
        if (!sendStr) {
          return
        }
        YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, sendStr);
        var reader = new FileReader();
        reader.readAsArrayBuffer(fileInfo);
        reader.onload = function loaded(evt) {
          binaryString = evt.target.result;
          total = binaryString.byteLength;
          ws.send(sendStr)
        }
      };
      ws.onmessage = function (event) {
        if (!!tId) {
          clearTimeout(tId)
        }
        var data = JSON.parse(event.data);
        if (!!data['start']) {
          if (data['start'] == 1) {
            sendFileByStep()
          } else {
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'filezie is out of size , websocket has refused the require..')
          }
        } else if (!!data['continue']) {
          if (!!filetimeout) {
            clearTimeout(filetimeout)
          }
          sendFileByStep()
        } else if (!!data['state']) {
          data = data["state"];
          var request = YTX_CONFIG._clientMap[data["2"]];
          if (!!request) {
            var resp = {};
            resp.msgId = orignMsgId;
            resp.msgClientNo = msgId;
            resp.fileUrl = Base64.decode(YTX_CONFIG._lvs_servers[0]) + data["3"];
            try {
              clearTimeout(request.timeout)
            } catch (e) {
              console.log("Cannot read property 'timeout' of undefined")
            }
            var callback = request.callback;
            var onError = request.onError;
            if (data["1"] == "000000") {
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, event.data);
              callback(resp)
            } else {
              var resp = {};
              resp.msgId = orignMsgId;
              resp.msgClientNo = msgId;
              resp.code = data["1"];
              resp.msg = "send file err";
              onError(resp)
            }
          } else {
            YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'file client request is null')
          }
          ws.close()
        } else if (!!data['end']) {}
      };
      ws.onclose = function (event) {
        if (event.code > 1000) {
          console.warn('file client socket has closed, error code :' + event.code + ': ' + event.reason + ': ' + event.wasClean)
        }
        YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'file client socket has closed', event)
      }
    },
    _heartBeat: function () {
      if (!YTX_CONFIG._isReconnect) {
        var heartBeatStr = YTX_CONFIG._protobuf._buildHeartBeat();
        YTX_CONFIG._sendMsg(heartBeatStr)
      } else if (!YTX_CONFIG._isConnecting) {
        YTX_CONFIG._reconnect(function () {})
      }
    },
    _heartBeatCallBack: function (obj) {
      YTX_CONFIG._heartBeatErrNum = 0;
      if (!!obj) {
        clearTimeout(obj)
      }
      YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "heartBeat succ")
    },
    _heartBeatCallBackErr: function (times) {
      YTX_CONFIG._log(YTX_CONFIG._logLevStat._INFO, "heart beak err");
      if ((!YTX_CONFIG._isConnect) || (YTX_CONFIG._loginStatus == 1) || times > 3) {
        if (YTX_CONFIG._loginStatus == 3) {
          YTX_CONFIG._connectStateChange(1, "connect closeed")
        }
        YTX_CONFIG._loginStatus = 1;
        YTX_CONFIG._socket.close();
        YTX_CONFIG._socket = null;
        YTX_CONFIG._isConnect = false;
        YTX_CONFIG._isReconnect = true;
        YTX_CONFIG._reconnect(function () {});
        if (!YTX_CONFIG._failIntervalId) {
          YTX_CONFIG._failIntervalId = window.setInterval(YTX_CONFIG._heartBeat, YTX_CONFIG._failHeartBeatInterval * 1000)
        }
        if (!!YTX_CONFIG._intervalId) {
          clearInterval(YTX_CONFIG._intervalId);
          YTX_CONFIG._intervalId = null
        }
      }
    },
    _confirmMsg: function () {
      var confirmStr = YTX_CONFIG._protobuf._buildConfirmMsg();
      if (!!confirmStr) {
        YTX_CONFIG._sendMsg(confirmStr)
      }
    },
    _getTimeStamp: function () {
      var now = new Date();
      var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
      return timestamp
    },
    _releaseVoip: function () {
      if (!!YTX_CONFIG._voipCallData._localMediaStream) {
        YTX_CONFIG.util.stopMediaStream(YTX_CONFIG._voipCallData._localMediaStream)
      }
      if (YTX_CONFIG._voipCallData._peerConnection != null) {
        if (YTX_CONFIG._voipCallData._peerConnection.signalingState != "closed") {
          YTX_CONFIG._voipCallData._peerConnection.close();
          YTX_CONFIG._voipCallData._peerConnection = null
        }
        YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipOtherView, null);
        YTX_CONFIG._voipCallData._voipOtherView = null;
        if (YTX_CONFIG._voipCallData._voipLocalView) {
          YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipLocalView, null);
          YTX_CONFIG._voipCallData._voipLocalView = null
        }
      }
      YTX_CONFIG._voipCallData._connected = false;
      YTX_CONFIG._voipCallData._callEventCallId = null;
      YTX_CONFIG._voipCallData._peerConnection = null;
      YTX_CONFIG._voipCallData._inviteSdp = null;
      YTX_CONFIG._voipCallData._localMediaStream = null
    },
    _setTelRemote: function (callEventData) {
      var receiverSdp = callEventData.getStrSDP();
      if (!YTX_CONFIG._voipCallData._peerConnection) {
        return
      }
      YTX_CONFIG.setRemoteDesc(receiverSdp, "answer", function () {}, function (err) {
        console.log("RemoteError" + err)
      })
    },
    _sendAck: function (callEventData) {
      var receiverSdp = callEventData.getStrSDP();
      var pc = YTX_CONFIG._voipCallData._peerConnection;
      if (!pc) {
        return
      }
      if (("getReceivers" in pc && pc.getReceivers().length > 0) || ("getRemoteStreams" in pc && pc.getRemoteStreams().length > 0)) {
        callEventData.setCallEvent(6);
        callEventData.setStrSDP();
        var str = YTX_CONFIG._protobuf._buildCallEvent(callEventData, function () {}, function () {
          console.log("send ack err")
        });
        YTX_CONFIG._sendMsg(str);
        YTX_CONFIG._voipCallData._connected = true
      }
      YTX_CONFIG.setRemoteDesc(receiverSdp, "answer", function () {}, function (err) {
        console.log("RemoteError" + err)
      })
    },
    setRemoteDesc: function (receSDP, oa, callback, onerror) {
      var pc = YTX_CONFIG._voipCallData._peerConnection;
      var sessionDescription = YTX_CONFIG.util.getSessionDescription();
      if (pc.remoteDescription && pc.remoteDescription.sdp.length != 0) {
        return
      }
      try {
        pc.setRemoteDescription(new sessionDescription({
          type: oa,
          sdp: receSDP
        })).then(callback).catch(onerror)
      } catch (e) {
        pc.setRemoteDescription(new sessionDescription({
          type: oa,
          sdp: receSDP
        }), callback, onerror)
      }
    },
    processAVStream: function (view, stream) {
      if (!view) {
        return
      }
      if ("srcObject" in view) {
        view.srcObject = stream
      } else if (!stream) {
        view.src = stream
      } else {
        view.src = URL.createObjectURL(stream)
      }
      if (view !== YTX_CONFIG._voipCallData._voipOtherView) {
        return
      }
    },
    processCreateOffer: function (callback, onerror) {
      try {
        YTX_CONFIG._voipCallData._peerConnection.createOffer().then(callback).catch(onerror)
      } catch (e) {
        YTX_CONFIG._voipCallData._peerConnection.createOffer(callback, onerror)
      }
    },
    processCreateAnswer: function (constraints, callback, onerror) {
      try {
        YTX_CONFIG._voipCallData._peerConnection.createAnswer(constraints).then(callback).catch(onerror)
      } catch (e) {
        YTX_CONFIG._voipCallData._peerConnection.createAnswer(callback, onerror, constraints)
      }
    },
    _processSDP: function (strSDP) {
      strSDP = strSDP.replace(/level-asymmetry-allowed=*;/, "").replace(/;profile-level-id=*\\r\\n/, "\\r\\n");
      var tabStr = '';
      if (strSDP.indexOf('\r\n') > 0) {
        tabStr = '\r\n'
      } else if (strSDP.indexOf('\r') > 0) {
        tabStr = '\r'
      } else if (strSDP.indexOf('\n') > 0) {
        tabStr = '\n'
      }
      var arr = strSDP.split('m=');
      var sendSDP = '';
      var arrLength = arr.length;
      for (var i = 0; i < arrLength; i++) {
        var subStr = arr[i];
        if (subStr.substr(0, 2) == 'v=') {
          sendSDP += subStr;
          continue
        }
        var typeIdx = subStr.indexOf(tabStr);
        var typeHead = subStr.substr(0, typeIdx);
        var headArr = typeHead.split(' ');
        var newHead = 'm=';
        var headArrLength = headArr.length;
        for (var j = 0; j < headArrLength; j++) {
          if (j < 3) {
            newHead += headArr[j] + ' '
          }
        };
        newHead = newHead.substr(0, newHead.length - 1);
        var typeBody = subStr.substr(typeIdx + tabStr.length);
        var newBody = '';
        var bodyArr = typeBody.split(tabStr);
        var delCode = '';
        var localIp = '';
        var bodyArrLength = bodyArr.length;
        for (var j = 0; j < bodyArrLength; j++) {
          if (bodyArr[j].indexOf('candidate') > 0) {
            var candiArry = bodyArr[j].split(' ');
            if (candiArry[4].indexOf('.') > -1 && localIp.length === 0) {
              localIp = candiArry[4];
              break
            }
          }
        }
        for (var j = 0; j < bodyArrLength; j++) {
          if (bodyArr[j].indexOf('rtpmap') > 0) {
            var eIdx = bodyArr[j].indexOf(' ');
            var sIdx = bodyArr[j].indexOf(':');
            var code = bodyArr[j].substring(sIdx + 1, eIdx);
            if (bodyArr[j].indexOf('ISAC') > 0 || bodyArr[j].indexOf('G722') > 0 || bodyArr[j].indexOf('rtx') > 0 || YTX_CONFIG._recordVideo && (bodyArr[j].indexOf('PCMA') > 0 || bodyArr[j].indexOf('rtx') > 0 || bodyArr[j].indexOf('opus') > 0)) {
              delCode = code;
              continue
            }
            newHead += ' ' + code;
            newBody += tabStr + bodyArr[j]
          } else if (bodyArr[j].indexOf('fmtp') > 0) {
            if (bodyArr[j].indexOf('a=fmtp:' + delCode + ' ') < 0) {
              newBody += tabStr + bodyArr[j]
            }
          } else if (bodyArr[j].indexOf('candidate') > 0) {
            if (bodyArr[j].indexOf('.') > 0) {
              newBody += tabStr + bodyArr[j]
            } else {
              continue
            }
          } else if (bodyArr[j].indexOf('c=') == 0) {
            newBody += localIp.length > 0 ? (tabStr + "c=IN IP4 " + localIp) : (tabStr + bodyArr[j])
          } else {
            newBody += tabStr + bodyArr[j]
          }
        }
        sendSDP += newHead + newBody
      }
      return sendSDP
    },
    _cLength: function (str) {
      var reg = /([0-9a-f]{1,4}:)|(:[0-9a-f]{1,4})/gi;
      var temp = str.replace(reg, ' ');
      return temp.length
    },
    _isIPv6: function (tmpstr) {
      var patrn = /([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}/i;
      var r = patrn.exec(tmpstr);
      if (r) {
        return true
      }
      if (tmpstr == "::") {
        return true
      }
      patrn = /(([0-9a-f]{1,4}:){0,6})((:[0-9a-f]{1,4}){0,6})/i;
      r = patrn.exec(tmpstr);
      if (r) {
        var c = YTX_CONFIG._cLength(tmpstr);
        if (c <= 7 && c > 0) {
          return true
        }
      }
      patrn = /([0-9a-f]{1,4}:){1,7}:/i;
      r = patrn.exec(tmpstr);
      if (r) {
        return true
      }
      patrn = /:(:[0-9a-f]{1,4}){1,7}/i;
      r = patrn.exec(tmpstr);
      if (r) {
        return true
      }
      patrn = /([0-9a-f]{1,4}:){6}(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/i;
      r = patrn.exec(tmpstr);
      if (r) {
        if (r[2] <= 255 && r[3] <= 255 && r[4] <= 255 && r[5] <= 255) return true
      }
      patrn = /([0-9a-f]{1,4}:){1,5}:(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/i;
      r = patrn.exec(tmpstr);
      if (r) {
        if (r[2] <= 255 && r[3] <= 255 && r[4] <= 255 && r[5] <= 255) return true
      }
      patrn = /::(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/i;
      r = patrn.exec(tmpstr);
      if (r) {
        if (r[1] <= 255 && r[2] <= 255 && r[3] <= 255 && r[4] <= 255) return true
      }
      return false
    },
    _sendVoip: function (CallEventBuilder, callback, onError) {
      var count = 0;
      var iceServer = {
        "iceServers": YTX_CONFIG._voipCallData._iceServers
      };
      var isCaller = false;
      var onIceCompleted = false;
      var isVideo = null;
      if (CallEventBuilder.getCallEvent() == 1) {
        if (1 == CallEventBuilder.getIsVoipCall()) {
          isVideo = true
        } else {
          isVideo = false
        }
      } else {
        if (1 == YTX_CONFIG._voipCallData._voipCallType) {
          isVideo = true
        } else {
          isVideo = false
        }
      }
      if (YTX_CONFIG._userName == CallEventBuilder.getCaller()) {
        isCaller = true
      }
      var peerConnection = YTX_CONFIG.util.getPeerConnection();
      if (!peerConnection) {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._NOT_SUPPORT_CALL;
        resp.msg = 'browers not support call operation';
        onError(resp)
      }
      var options = {
        optional: [{
          DtlsSrtpKeyAgreement: true
        }]
      };
      var pc = new peerConnection(iceServer, options);
      YTX_CONFIG._voipCallData._peerConnection = pc;
      if (!YTX_CONFIG._voipCallData._voipOtherView) {
        if (CallEventBuilder.getIsVoipCall() == 0 || CallEventBuilder.getIsVoipCall() == 2) {
          YTX_CONFIG._voipCallData._voipOtherView = document.createElement("video")
        } else {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._VOIP_NO_VIDEO;
          resp.msg = 'please set view first.';
          onError(resp);
          return
        }
      };
      pc.onicecandidate = function (event) {
        console.log("+++ onicecandidate +++");
        if (event.candidate) {
          console.log("+++ onicecandidate:" + event.candidate.candidate)
        } else {
          onIceCompleted = true;
          console.log("+++ onicecandidate end! +++")
        }
      };
      pc.onnegotiationneeded = function (e) {
        console.log('onnegotiationneeded', YTX_CONFIG._voipCallData._peerConnection.iceGatheringState, e)
      };

      function addStream(event) {
        YTX_CONFIG._voipCallData._remoteMediaStream = event.streams ? event.streams[0] : event.stream;
        YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipOtherView, event.streams ? event.streams[0] : event.stream)
      }
      if ('ontrack' in pc) {
        pc.ontrack = addStream
      } else if ('onaddtrack' in pc) {
        pc.onaddtrack = addStream
      } else if ('onaddstream' in pc) {
        pc.onaddstream = addStream
      }

      function sendOfferAndAnswer(stream, asAudio) {
        var error = function (err) {
          console.log("createOfferORAnswer Failed!", err)
        };
        var remoteError = function (err) {
          console.log("RemoteError", err)
        };
        if (!!YTX_CONFIG._voipCallData._voipLocalView) {
          YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipLocalView, stream)
        };
        YTX_CONFIG._voipCallData._localMediaStream = stream;
        try {
          stream.getTracks().forEach(function (track) {
            YTX_CONFIG._voipCallData._sender.push(pc.addTrack(track, stream))
          });
          console.log("+++ addTrack succ!")
        } catch (e) {
          pc.addStream(stream);
          console.log("+++ addStream succ!")
        }
        YTX_CONFIG._Media.sendVoipBuilder = CallEventBuilder;
        if (isCaller) {
          YTX_CONFIG.processCreateOffer(YTX_CONFIG._Media.sendOfferFn, callback, error)
        } else {
          YTX_CONFIG.setRemoteDesc(YTX_CONFIG._voipCallData._inviteSdp, "offer", function () {
            var constraints = {
              mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: isVideo
              }
            };
            YTX_CONFIG.processCreateAnswer(constraints, sendAnswerFn, error)
          }, remoteError)
        }

        function sendAnswerFn(desc) {
          var count = 0;

          function sendAnswer() {
            count++;
            if (pc.iceGatheringState == "complete" || count > 10) {
              console.log("+++ sendAnswer " + count);
              count = -100;
              var strSDP = pc.localDescription.sdp;
              var preSDP = YTX_CONFIG._processSDP(strSDP);
              CallEventBuilder.setStrSDP(preSDP);
              if (CallEventBuilder.getCallId() == YTX_CONFIG._voipCallData._callEventCallId) {
                var sendStr = YTX_CONFIG._protobuf._buildCallEvent(CallEventBuilder, callback, onError);
                if (!!sendStr) {
                  YTX_CONFIG._sendMsg(sendStr)
                }
                YTX_CONFIG._voipCallData._connected = true;
                var resp = new Object();
                resp.code = "200";
                resp.asAudio = true;
                callback(resp)
              }
            } else if (count > -1) {
              window.setTimeout(function () {
                sendAnswer()
              }, 200)
            }
          };
          YTX_CONFIG._Media.setLocalDescription(desc, sendAnswer, onError)
        }
      }
      if (CallEventBuilder.getDeviceId() && isVideo) {
        var did = CallEventBuilder.getDeviceId();
        if (did === "environment") {
          isVideo = {
            facingMode: {
              exact: "environment"
            },
            width: YTX_CONFIG._mediaConfig.width,
            height: YTX_CONFIG._mediaConfig.height,
            frameRate: YTX_CONFIG._mediaConfig.frameRate
          }
        } else if (did === "user") {
          isVideo = {
            facingMode: "user",
            width: YTX_CONFIG._mediaConfig.width,
            height: YTX_CONFIG._mediaConfig.height,
            frameRate: YTX_CONFIG._mediaConfig.frameRate
          }
        } else {
          YTX_CONFIG._mediaConfig.type = 2;
          isVideo = {
            optional: [{
              sourceId: did
            }, ]
          }
        }
      }
      YTX_CONFIG._getUserMedia(isVideo, sendOfferAndAnswer, function (err) {
        pc.close();
        var resp = {};
        resp.code = YTX_CONFIG._errcode._VOIP_MEDIA_ERROR;
        resp.msg = 'get media stream error.' + err.name + ":" + err.message;
        resp.err = err.name;
        onError(resp)
      })
    },
    _Media: {
      count: 0,
      sendVoipBuilder: null,
      sendOfferFn: function (desc, reset, callback, onError) {
        YTX_CONFIG._Media.setLocalDescription(desc, sendOffer, onError);

        function sendOffer() {
          YTX_CONFIG._Media.count++;
          if ((YTX_CONFIG._voipCallData._peerConnection.iceGatheringState == "complete" || YTX_CONFIG._Media.count > 10) && YTX_CONFIG._Media.count > 0) {
            console.log("+++ sendOffer " + YTX_CONFIG._Media.count);
            YTX_CONFIG._Media.count = -100;
            var strSDP = YTX_CONFIG._voipCallData._peerConnection.localDescription.sdp;
            var preSDP = YTX_CONFIG._processSDP(strSDP);
            YTX_CONFIG._Media.sendVoipBuilder.setStrSDP(YTX_CONFIG._processSDP(preSDP));
            var state = 2;
            var msg = "calling";
            if (YTX_CONFIG._Media.sendVoipBuilder.getCallId() == YTX_CONFIG._voipCallData._callEventCallId) {
              var sendStr = YTX_CONFIG._protobuf._buildCallEvent(YTX_CONFIG._Media.sendVoipBuilder, callback, onError);
              if (!!sendStr) {
                YTX_CONFIG._sendMsg(sendStr)
              }
            } else {
              state = 4;
              msg = "calling failed , maybe opposite side is busying"
            }
            var resp = {};
            resp.callId = YTX_CONFIG._Media.sendVoipBuilder.getCallId();
            resp.caller = YTX_CONFIG._Media.sendVoipBuilder.getCaller();
            resp.called = YTX_CONFIG._Media.sendVoipBuilder.getCalled();
            resp.userdata = YTX_CONFIG._Media.sendVoipBuilder.getUserData();
            resp.msg = msg;
            resp.state = state;
            YTX_CONFIG._voipCallData._voipCallType = YTX_CONFIG._Media.sendVoipBuilder.getIsVoipCall();
            resp.callType = YTX_CONFIG._Media.sendVoipBuilder.getIsVoipCall();
            resp.code = 200;
            YTX_CONFIG._voipListener(resp)
          } else if (YTX_CONFIG._Media.count > -1) {
            window.setTimeout(function () {
              sendOffer()
            }, 200)
          }
        }
      },
      setLocalDescription: function (desc, callback, onerror) {
        var pm = YTX_CONFIG._voipCallData._peerConnection.setLocalDescription(desc, callback, function (err) {
          onerror({
            code: YTX_CONFIG._errcode._PEERCONNECTION_ERROR,
            msg: "setLocalDescription failed",
            err: err
          })
        });
        if (pm && "then" in pm) {
          pm.then(callback).catch(function (err) {
            onerror({
              code: YTX_CONFIG._errcode._PEERCONNECTION_ERROR,
              msg: "setLocalDescription failed",
              err: err
            })
          })
        }
      }
    },
    _getUserMedia: function (isVideo, callback, onerror, needAudio, asAudio) {
      needAudio = (needAudio == undefined || needAudio === true) ? true : false;
      YTX_CONFIG._voipCallData._needVideo = isVideo;
      YTX_CONFIG._voipCallData._needAudio = needAudio;
      try {
        navigator.mediaDevices.getUserMedia({
          audio: needAudio,
          video: isVideo
        }).then(function (stream) {
          if (!YTX_CONFIG._voipCallData._needVideo && !("getTracks" in stream && YTX_CONFIG._mediaConfig.type === 2)) {
            callback(stream, asAudio);
            return
          }
          var mst = stream.getVideoTracks()[0];
          if (!mst || !("applyConstraints" in mst)) {
            callback(stream, asAudio);
            console.log("not support constraints");
            return
          }
          try {
            var constraints = {};
            var supp = navigator.mediaDevices.getSupportedConstraints();
            if (supp.width) {
              constraints["width"] = YTX_CONFIG._mediaConfig.width
            }
            if (supp.height) {
              constraints["height"] = YTX_CONFIG._mediaConfig.height
            }
            if (supp.frameRate) {
              constraints["frameRate"] = YTX_CONFIG._mediaConfig.frameRate
            }
          } catch (e) {
            console.log(e);
            callback(stream, asAudio);
            return
          }
          mst.applyConstraints(constraints).then(function () {
            callback(stream, asAudio);
            return
          }).catch(function (err) {
            callback(stream, asAudio);
            console.log(err)
          })
        }).catch(function (err) {
          console.log(err);
          if (err && err.name === "DevicesNotFoundError" && YTX_CONFIG._voipCallData._needVideo) {
            YTX_CONFIG._getUserMedia(false, callback, onerror, needAudio, true);
            return
          }
          onerror(err)
        })
      } catch (e) {
        var getUserMedia = YTX_CONFIG.util.getUserMedia();
        if (getUserMedia) {
          getUserMedia({
            "audio": needAudio,
            "video": (isVideo ? true : false)
          }, function (e) {
            callback(e)
          }, function (err) {
            onerror(err)
          })
        } else {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._VOIP_NO_MEDIA;
          resp.msg = 'borwer not support getUserMedia.';
          onerror(resp)
        }
      }
    },
    _checkASCII: function (content) {
      var regx = /^[\x00-\\x7F\a-zA-Z\u4e00-\u9fa5、]+$/;
      if (regx.exec(content) == null) {
        return false
      }
      return true
    },
    _checkCHAR: function (content) {
      var regx = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      if (regx.exec(content) == null) {
        return false
      }
      return true
    },
    _uploadUserDevice: function (callback, onError) {
      if (!YTX_CONFIG._checkOnline(onError, null)) {
        return null
      }
      var sig = YTX_CONFIG._fileSig;
      var sendJsonStr = '{\"1\":\"' + YTX_CONFIG._appid + '\",\"2\":\"' + YTX_CONFIG._userName + '\",';
      sendJsonStr += '\"3\":\"' + YTX_CONFIG._deviceType + '\"';
      var ua = window.navigator.userAgent;
      if (!!ua) {
        sendJsonStr += ',\"4\":\"' + ua + '\"'
      }
      var sendFunc = function () {
        sendJsonStr += ',\"11\":\"' + YTX_CONFIG._version + '\",\"12\":\"' + YTX_CONFIG._imei + '\"';
        var sendProto = '{\"UserDevice\":' + sendJsonStr + '}';
        var sendStr = '{\"Http\":{\"1\":5,\"2\":' + sendProto + ',\"4\":\"' + sig + '\"}}}';
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    _releaseResource: function () {
      if (YTX_CONFIG._voipCallData._peerConnection != null) {
        if (YTX_CONFIG._voipCallData._peerConnection.signalingState != "closed") {
          YTX_CONFIG._voipCallData._peerConnection.close();
          YTX_CONFIG._voipCallData._peerConnection = null
        }
        YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipOtherView, null);
        YTX_CONFIG._voipCallData._voipOtherView = null;
        if (YTX_CONFIG._voipCallData._voipLocalView) {
          YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipLocalView, null);
          YTX_CONFIG._voipCallData._voipLocalView = null
        }
      }
      YTX_CONFIG._voipCallData._connected = false;
      YTX_CONFIG._voipCallData._callEventCallId = null;
      YTX_CONFIG._voipCallData._peerConnection = null;
      YTX_CONFIG._voipCallData._inviteSdp = null;
      YTX_CONFIG._voipCallData._localMediaStream = null;
      YTX_CONFIG._voipCallData._calltype = null
    },
    _getFileSig: function (num) {
      if (!num) {
        num = 1
      } else {
        num++
      }
      if (num > 3) {
        return
      }
      var url = Base64.decode(YTX_CONFIG._file_sig_url);
      YTX_CONFIG.jsonp(url, null, function (resp) {
        if (result.code == "000000") {
          YTX_CONFIG._fileSig = result.data
        } else {
          YTX_CONFIG._getFileSig(num)
        }
      }, function (err) {
        YTX_CONFIG._getFileSig(num)
      })
    },
    util: {
      checkFileReader: function () {
        var FileReader = FileReader || window.FileReader;
        if (!FileReader) {
          return false
        }
        return true
      },
      getWindowURL: function () {
        var url = window.URL || window.webkitURL || window.mozURL || window.msURL;
        return url
      },
      getUserMedia: function () {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia) {
          getUserMedia = navigator.mediaDevices.getUserMedia
        } else if (typeof navigator !== 'undefined' && navigator.webkitGetUserMedia) {
          getUserMedia = navigator.webkitGetUserMedia.bind(navigator)
        } else if (typeof navigator !== 'undefined' && navigator.mozGetUserMedia) {
          getUserMedia = navigator.mozGetUserMedia.bind(navigator)
        } else if (typeof navigator !== 'undefined' && navigator.getUserMedia) {
          getUserMedia = navigator.getUserMedia.bind(navigator)
        }
        return getUserMedia
      },
      getPeerConnection: function () {
        var peerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
        if (typeof RTCPeerConnection !== 'undefined') {
          peerConnection = RTCPeerConnection
        } else if (typeof mozRTCPeerConnection !== 'undefined') {
          peerConnection = mozRTCPeerConnection
        } else if (typeof webkitRTCPeerConnection !== 'undefined') {
          peerConnection = webkitRTCPeerConnection
        }
        return peerConnection
      },
      getSessionDescription: function () {
        var sessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
        if (typeof RTCSessionDescription !== 'undefined') {
          sessionDescription = RTCSessionDescription
        } else if (typeof mozRTCSessionDescription !== 'undefined') {
          sessionDescription = mozRTCSessionDescription
        } else if (typeof webkitRTCSessionDescription !== 'undefined') {
          sessionDescription = webkitRTCSessionDescription
        }
        return sessionDescription
      },
      getBrowerPrefix: function () {
        return 'hidden' in document ? null : function () {
          var r = null;
          ['webkit', 'moz', 'ms', 'o'].forEach(function (prefix) {
            if ((prefix + 'Hidden') in document) {
              return r = prefix
            }
          });
          return r
        }()
      },
      checkWindowHidden: function () {
        var prefix = YTX_CONFIG.util.getBrowerPrefix();
        if (!prefix) {
          return document['hidden']
        }
        return document[prefix + 'Hidden']
      },
      getWindowVisibleState: function () {
        var prefix = YTX_CONFIG.util.getBrowerPrefix();
        if (!prefix) {
          return document['visibilityState']
        }
        return document[prefix + 'VisibilityState']
      },
      stopMediaStream: function (stream) {
        if (stream.getTracks()) {
          console.log("stream.getTracks()");
          stream.getTracks().forEach(function (track) {
            track.stop()
          })
        } else {
          stream.stop()
        }
      },
      getMediaRecorder: function () {
        var recorder = window.MediaRecorder || window.webkitMediaRecorder || window.moztMediaRecorder;
        if (recorder) {
          return recorder
        } else {
          return false
        }
      },
      getRecordingType: function (isVideo) {
        var videoTypes = null;
        if (isVideo) {
          videoTypes = ["video/webm", "video/mpeg", "video/mp4", "video/webm\;codecs=vp8", "video/webm\;codecs=daala", "video/webm\;codecs=h264", ]
        } else {
          videoTypes = ["audio/webm\;codecs=opus", 'audio/ogg', "audio/webm"]
        }
        var mediaRecorder = YTX_CONFIG.util.getMediaRecorder();
        for (var i in videoTypes) {
          if (MediaRecorder.isTypeSupported(videoTypes[i])) {
            return videoTypes[i]
          }
        }
        return null
      }
    },
    _browser: function () {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("iPhone") > -1) {
        return "iPhone"
      }
      if (userAgent.indexOf("iPad") > -1) {
        return "iPad"
      }
      if (userAgent.indexOf("MicroMessenger") > -1) {
        return "MicroMessenger"
      }
      if (userAgent.indexOf("Opera") > -1) {
        return "Opera"
      }
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF"
      }
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome"
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari"
      }
      if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE"
      }
    }
  };
  window.RL_YTX = window.RL_YTX || {
    _msgType: {
      _TEXT: 1,
      _VOICE: 2,
      _VEDIO: 3,
      _PICTURE: 4,
      _POSITION: 5,
      _COMPRESS_FILE: 6,
      _FILE: 7,
      _sendAtMsg: 11,
      _userMsgState: 12
    },
    chatRommId: null,
    init: function (appid, serverIp, lvsServer, fileSig) {
      var resp = {};
      if (!RL_YTX.checkH5()) {
        resp.code = YTX_CONFIG._errcode._NOT_SUPPORT_H5;
        resp.msg = 'The brower do not support HTML5,please change the brower';
        return resp
      }
      if (!appid) {
        resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
        resp.msg = 'appid  is null,please check you param';
        return resp
      }
      if (!!serverIp) {
        YTX_CONFIG._server_ip[0] = Base64.encode(serverIp);
        YTX_CONFIG._file_server_url = Base64.encode(serverIp)
      }
      if (!!lvsServer) {
        YTX_CONFIG._lvs_servers[0] = Base64.encode(lvsServer)
      }
      var notSupport = [];
      if (!YTX_CONFIG.util.getUserMedia()) {
        notSupport.push(YTX_CONFIG._errcode._VOIP_NO_MEDIA)
      }
      if (!YTX_CONFIG.util.checkFileReader()) {
        notSupport.push(YTX_CONFIG._errcode._NOT_SUPPORT_FILE)
      }
      if (!YTX_CONFIG.util.getPeerConnection()) {
        notSupport.push(YTX_CONFIG._errcode._NOT_SUPPORT_CALL)
      }
      if (!YTX_CONFIG.util.getWindowURL()) {
        notSupport.push(YTX_CONFIG._errcode._NOT_SUPPORT_URL)
      }
      if (!YTX_CONFIG.util.getMediaRecorder()) {
        notSupport.push(YTX_CONFIG._errcode._NOT_SUPPORT_RECORDER)
      }
      YTX_CONFIG._Notification = window.Notification || window.mozNotification || window.webkitNotification || window.msNotification || window.webkitNotifications;
      if (!!YTX_CONFIG._Notification) {
        YTX_CONFIG._Notification.requestPermission(function (permission) {
          if (YTX_CONFIG._Notification.permission !== "granted") {
            YTX_CONFIG._Notification.permission = "granted"
          }
        })
      }
      YTX_CONFIG._fileSig = fileSig;
      YTX_CONFIG._appid = appid;
      resp.code = YTX_CONFIG._errcode._SUCC;
      resp.msg = 'init success';
      resp.unsupport = notSupport;
      return resp
    },
    onDeskMsgReceiveListener: function (callback) {},
    destory: function () {
      if (!!YTX_CONFIG._socket) {
        YTX_CONFIG._socket.close()
      }
    },
    checkH5: function () {
      try {
        window.localStorage.testItem = 'test';
        window.localStorage.removeItem('testItem')
      } catch (e) {
        YTX_CONFIG.hasLocalStorage = false
      }
      if (!!window.WebSocket) {
        YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "this brower is support H5 . Version is " + navigator.appVersion + ". vendor is :" + navigator.vendor + ". Is online :" + navigator.onLine + ' version:' + YTX_CONFIG._version);
        return true
      } else {
        YTX_CONFIG._log(YTX_CONFIG._logLev._ERROR, "sorry, your brower not support H5, exist!");
        return false
      }
    },
    login: function (LoginBuilder, callback, onError) {
      if (!YTX_CONFIG._appid) {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._NO_REQUIRED_PARAM;
        resp.msg = 'appid  is null,please init first ';
        return resp
      }
      if (YTX_CONFIG._loginStatus != 1) {
        if (YTX_CONFIG._loginStatus == 3) {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "user already login.")
        } else if (YTX_CONFIG._loginStatus == 2) {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "user logining")
        }
        return
      }
      if (!YTX_CONFIG._fileSig) {
        YTX_CONFIG._fileSig = '2b9c64616c98a93f1375bf0a2f6429e7'
      }
      YTX_CONFIG._userName = LoginBuilder.getUserName();
      YTX_CONFIG._userAcc = YTX_CONFIG._appid + '#' + LoginBuilder.getUserName();
      if (LoginBuilder.getAuthSig()) {
        YTX_CONFIG.setAuthSigTime(LoginBuilder.getAuthSig(), LoginBuilder.getTimestamp(), LoginBuilder.getReqAuth())
      }
      if (typeof YTX_CONFIG._userName != 'string') {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._PARAM_TYPE_ERR;
        resp.msg = 'parameter type false ,please check the parameter';
        onError(resp);
        return
      }
      if (typeof LoginBuilder.getSig() == 'number') {
        LoginBuilder.setSig(LoginBuilder.getSig().toString())
      }
      YTX_CONFIG._userPwd = LoginBuilder.getPwd();
      YTX_CONFIG._getServerIp(LoginBuilder.getType(), callback, onError, LoginBuilder.getSig(), LoginBuilder.getTimestamp(), true)
    },
    logout: function (callback, onError) {
      YTX_CONFIG._confirmMsg();
      if (!!YTX_CONFIG._voipCallData._callEventCallId) {
        YTX_CONFIG._Media.count = 0;
        var releaseCallBuilder = new RL_YTX.ReleaseCallBuilder();
        releaseCallBuilder.setCallId(YTX_CONFIG._voipCallData._callEventCallId);
        releaseCallBuilder.setCaller(YTX_CONFIG._voipCallData._caller);
        releaseCallBuilder.setCalled(YTX_CONFIG._voipCallData._called);
        RL_YTX.releaseCall(releaseCallBuilder, function (sucObj) {}, function (errObj) {})
      }
      var logoutStr = YTX_CONFIG._protobuf._buildLogout(callback, onError);
      if (!!logoutStr) {
        YTX_CONFIG._sendMsg(logoutStr)
      }
      YTX_CONFIG._logout();
      callback()
    },
    bindBeforeUnLoad: function (callback) {
      if (!!YTX_CONFIG._beforeUnLoad) {
        YTX_CONFIG._beforeUnLoad[YTX_CONFIG._beforeUnLoad.length] = callback
      }
      return YTX_CONFIG._beforeUnLoad.length - 1
    },
    unbindBeforeUnLoad: function (i) {
      YTX_CONFIG._beforeUnLoad[i] = null
    },
    setReqSigTime: function (reqSig, longTimestamp) {
      YTX_CONFIG.setAuthSigTime(reqSig, longTimestamp)
    },
    getDevices: function (callback) {
      var b = YTX_CONFIG._browser();
      if (b === "iPhone" || b === "iPad") {
        callback({
          type: 1,
          value: [{
            deviceId: "environment",
            label: "back camera"
          }, {
            deviceId: "user",
            label: "front camera"
          }]
        })
      } else {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          var arrs = [];
          navigator.mediaDevices.enumerateDevices().then(function (e) {
            for (var i = 0; i < e.length; i++) {
              if (e[i].kind === "videoinput") {
                arrs.push(e[i])
              }
            }
            callback({
              type: 1,
              value: arrs
            })
          }).catch(function (err) {
            callback()
          })
        } else {
          callback()
        }
      }
    },
    sendMsg: function (MsgBuilder, callback, onError, progress) {
      return new function () {
        var isAvailable = false;
        for (var i in RL_YTX._msgType) {
          if (MsgBuilder.getType() == RL_YTX._msgType[i]) {
            isAvailable = true;
            break
          }
        }
        if (!isAvailable) {
          var resp = {};
          resp.code = YTX_CONFIG._errcode._CHARSET_ILLEGAl;
          resp.msg = "msgType isn't the value of available";
          onError(resp)
        } else {
          var msgToken = null;
          if (MsgBuilder.getType() != 1 && !!MsgBuilder.getFile()) {
            var FileReader = FileReader || window.FileReader;
            if (!FileReader) {
              var resp = {};
              resp.code = YTX_CONFIG._errcode._NOT_SUPPORT_FILE;
              resp.msgId = -1;
              resp.msgClientNo = -1;
              resp.msg = 'brower not support send attach.';
              onError(resp);
              return -1
            }
            msgToken = YTX_CONFIG._generateFullMsgId(++YTX_CONFIG._ClientNo);
            YTX_CONFIG._sendFile(MsgBuilder.getFile(), null, MsgBuilder.getReceiver(), MsgBuilder.getType(), msgToken, MsgBuilder.getDomain(), 1, callback, onError, progress, MsgBuilder.getFileName())
          } else {
            msgToken = ++YTX_CONFIG._ClientNo;
            var sendStr = YTX_CONFIG._protobuf._buildSendTextMsg(MsgBuilder.getType(), MsgBuilder.getText(), MsgBuilder.getReceiver(), msgToken, MsgBuilder.getDomain(), callback, onError, MsgBuilder.getId(), MsgBuilder.getAtAccounts());
            if (!!sendStr) {
              YTX_CONFIG._sendMsg(sendStr)
            }
            msgToken = YTX_CONFIG._generateFullMsgId(msgToken)
          }
          return msgToken
        }
      }
    },
    sendChatroomMsg: function (ChatroomMsgBuilder, callback, onError, progress) {
      var isAvailable = false;
      if (ChatroomMsgBuilder.getType() === 1) {
        isAvailable = true
      }
      var msgToken = null;
      msgToken = ++YTX_CONFIG._ClientNo;
      var sendStr = YTX_CONFIG._protobuf._buildChatroomSendTextMsg(ChatroomMsgBuilder.getType(), ChatroomMsgBuilder.getText(), ChatroomMsgBuilder.getReceiver(), msgToken, ChatroomMsgBuilder.getDomain(), callback, onError, ChatroomMsgBuilder.getId());
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
      msgToken = YTX_CONFIG._generateFullMsgId(msgToken);
      return msgToken
    },
    mcmUserStartAsk: function (osUnityAccount, agentId, addrJson, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_UserEvt_StartAsk(osUnityAccount, agentId, null, addrJson, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmUserEndAsk: function (osUnityAccount, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_UserEvt_EndAsk(osUnityAccount, null, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmUserSendMsg: function (MCMMessageBuilder, callback, onError, progress) {
      var msgId = null;
      if (MCMMessageBuilder.getMsgType() != 1 && !!MCMMessageBuilder.getFile()) {
        msgId = YTX_CONFIG._generateFullMsgId(++YTX_CONFIG._ClientNo);
        YTX_CONFIG._sendFile(MCMMessageBuilder.getFile(), null, MCMMessageBuilder.getAccount(), MCMMessageBuilder.getMsgType(), msgId, MCMMessageBuilder.getUserData(), 2, callback, onError, progress, MCMMessageBuilder.getFileName(), MCMMessageBuilder.getMsgId())
      } else {
        msgId = ++YTX_CONFIG._ClientNo;
        var sendStr = YTX_CONFIG._protobuf._buildMCM_UserEvt_SendMSG(MCMMessageBuilder.getAccount(), MCMMessageBuilder.getContent(), MCMMessageBuilder.getUserData(), MCMMessageBuilder.getMsgType(), msgId, callback, onError, MCMMessageBuilder.getMsgId());
        if (!!sendStr) {
          YTX_CONFIG._sendMsg(sendStr)
        }
        msgId = YTX_CONFIG._generateFullMsgId(msgId)
      }
      return msgId
    },
    mcmAgentSendMsg: function (MCMMessageBuilder, callback, onError, progress) {
      var msgId = null;
      if (MCMMessageBuilder.getMsgType() != 1 && !!MCMMessageBuilder.getFile()) {
        msgId = YTX_CONFIG._generateFullMsgId(++YTX_CONFIG._ClientNo);
        YTX_CONFIG._sendFile(MCMMessageBuilder.getFile(), null, MCMMessageBuilder.getAccount(), MCMMessageBuilder.getMsgType(), msgId, MCMMessageBuilder.getUserData(), 3, callback, onError, progress, MCMMessageBuilder.getFileName(), MCMMessageBuilder.getMsgId())
      } else {
        msgId = ++YTX_CONFIG._ClientNo;
        var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_SendMCM(MCMMessageBuilder.getAccount(), MCMMessageBuilder.getContent(), MCMMessageBuilder.getUserData(), MCMMessageBuilder.getMsgType(), msgId, callback, onError, MCMMessageBuilder.getMsgId(), MCMMessageBuilder.getChanType(), MCMMessageBuilder.getMailTitle());
        if (!!sendStr) {
          YTX_CONFIG._sendMsg(sendStr)
        }
        msgId = YTX_CONFIG._generateFullMsgId(msgId)
      }
      return msgId
    },
    mcmAgentStartSerWithUser: function (userAccount, MCMDataBuilder, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_StartSerWithUser(userAccount, MCMDataBuilder, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentStopSerWithUser: function (userAccount, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_StopSerWithUser(userAccount, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentKFOnWork: function (serverCap, MCMAgentInfoBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_KFOnWork(serverCap, MCMAgentInfoBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentKFOffWork: function (agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_KFOffWork(agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentReady: function (agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_Ready(agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentNotReady: function (agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_NotReady(agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentRejectUser: function (userAccount, ccpCustomData, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_RejectUser(userAccount, ccpCustomData, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentTransKF: function (userAccount, osUnityAccount, transAgentId, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_TransKF(userAccount, osUnityAccount, transAgentId, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentTransferQueue: function (userAccount, queueType, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_TransferQueue(userAccount, queueType, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentMonitorAgent: function (userAccount, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_MonitorAgent(userAccount, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentCancelMonitorAgent: function (userAccount, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_CancelMonitorAgent(userAccount, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentForceTransfer: function (userAccount, superAgentId, agentId, transAgentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_ForceTransfer(userAccount, superAgentId, agentId, transAgentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentForceEndService: function (userAccount, superAgentId, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_ForceEndService(userAccount, superAgentId, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentQueryQueueInfo: function (queueType, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_QueryQueueInfo(queueType, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentQueryAgentInfo: function (agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_QueryAgentInfo(agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentStartConf: function (userAccount, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_StartConf(userAccount, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentJoinConf: function (userAccount, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_JoinConf(userAccount, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentExitConf: function (userAccount, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_ExitConf(userAccount, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentStartSessionTimer: function (userAccount, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_StartSessionTimer(userAccount, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentForceJoinConf: function (userAccount, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_ForceJoinConf(userAccount, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentReservedForUser: function (keyType, reservedKey, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_ReservedForUser(keyType, reservedKey, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentCancelReserved: function (keyType, reservedKey, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_CancelReserved(keyType, reservedKey, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    mcmAgentSerWithTheUser: function (osUnityAccount, userAccount, chanType, agentId, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildMCM_AgentEvt_SerWithTheUser(osUnityAccount, userAccount, chanType, agentId, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    syncMsg: function (SyncMsgBuilder, onError) {
      var startVersion = SyncMsgBuilder.getSVersion();
      var endVersion = SyncMsgBuilder.getEVersion();
      var sendStr = YTX_CONFIG._protobuf._buildSyncMessage(startVersion, endVersion, SyncMsgBuilder.getType(), onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getNickNameByAcc: function (userAccount, callBack, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildGetNickByAcc(userAccount, callBack, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getMyInfo: function (callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildGetMyInfo(callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    uploadPersonInfo: function (uploadPersonInfoBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildSetMyInfo(uploadPersonInfoBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    uploadPerfonInfo: function (uploadPersonInfoBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildSetMyInfo(uploadPersonInfoBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getHistoryMessage: function (GetHistoryMsgBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildGetHistoryMessage(GetHistoryMsgBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    createGroup: function (CreateGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildCreateGroup(CreateGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    dismissGroup: function (DismissGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildDismissGroup(DismissGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    inviteJoinGroup: function (InviteJoinGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildInviteJoinGroupr(InviteJoinGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    confirmInviteJoinGroup: function (ConfirmInviteJoinGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildConfirmInviteJoinGroup(ConfirmInviteJoinGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    quitGroup: function (QuitGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildQuitGroup(QuitGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getGroupList: function (GetGroupListBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildGetGroupList(GetGroupListBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getGroupMemberList: function (GetGroupMemberListBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildGetGroupMemberList(GetGroupMemberListBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    joinGroup: function (JoinGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildJoinGroup(JoinGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    confirmJoinGroup: function (ConfirmJoinGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildConfirmJoinGroup(ConfirmJoinGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getGroupDetail: function (GetGroupDetailBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildGetGroupDetail(GetGroupDetailBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    searchGroups: function (SearchGroupsBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildSearchGroups(SearchGroupsBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    deleteGroupMember: function (DeleteGroupMemberBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildDeleteGroupMember(DeleteGroupMemberBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    forbidMemberSpeak: function (ForbidMemberSpeakBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildForbidMemberSpeak(ForbidMemberSpeakBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    setGroupMessageRule: function (SetGroupMessageRuleBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildSetGroupMessageRule(SetGroupMessageRuleBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    queryGroupMemberCard: function (QueryGroupMemberCardBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildQueryGroupMemberCard(QueryGroupMemberCardBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    modifyMemberCard: function (ModifyMemberCardBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildModifyMemberCard(ModifyMemberCardBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    modifyGroup: function (ModifyGroupBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildModifyGroup(ModifyGroupBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getUserState: function (GetUserStateBuilder, callback, onError) {
      YTX_CONFIG._newUserState = GetUserStateBuilder.getNewUserstate() ? true : false;
      var sendStr = YTX_CONFIG._protobuf._buildGetUserState(GetUserStateBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    setGroupMemberRole: function (SetGroupMemberRoleBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildSetGroupMemberRole(SetGroupMemberRoleBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    setCallView: function (view, localView, hideView) {
      YTX_CONFIG._voipCallData._voipOtherView = view;
      YTX_CONFIG._voipCallData._voipLocalView = localView
    },
    msgOperation: function (MsgOperationBuilder, callback, onerror) {
      var sendStr = YTX_CONFIG._protobuf._buildMsgOperation(MsgOperationBuilder, callback, onerror);
      console.log(sendStr);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    msgRead: function (MsgReadBuilder, callback, onerror) {
      var msgOperationBuilder = new RL_YTX.MsgOperationBuilder();
      msgOperationBuilder.setVersion(MsgReadBuilder.getVersion());
      msgOperationBuilder.setType(3);
      RL_YTX.msgOperation(msgOperationBuilder, function (e) {
        callback(e)
      }, function (e) {
        if (onerror) {
          onerror(e)
        }
      })
    },
    msgBack: function (MsgBackBuilder, callback, onerror) {
      var msgOperationBuilder = new RL_YTX.MsgOperationBuilder();
      msgOperationBuilder.setMsgId(MsgBackBuilder.getMsgId());
      msgOperationBuilder.setType(1);
      RL_YTX.msgOperation(msgOperationBuilder, function (e) {
        callback(e)
      }, function (e) {
        if (onerror) {
          onerror(e)
        }
      })
    },
    setTimeWindow: function (obj) {
      if (!!obj.jquery) {
        obj = obj[0]
      }
      if (YTX_CONFIG._voipTimer) clearInterval(YTX_CONFIG._voipTimer);
      YTX_CONFIG._voipTimer = setInterval(function () {
        var second = YTX_CONFIG._voipTimestamp++;
        var minute = 0;
        var hours = 0;
        if (second > 59) {
          minute = parseInt(second / 60);
          second = second % 60
        }
        if (minute > 59) {
          hours = parseInt(second / 60);
          second = second % 60
        }
        if (!!obj) {
          obj.innerHTML = hours + " : " + minute + " : " + second
        }
      }, 1000)
    },
    setLogClose: function () {
      YTX_CONFIG._logPrint = false
    },
    setRecordVideo: function () {
      YTX_CONFIG._recordVideo = true
    },
    makeCall: function (MakeCallBuilder, callback, onError) {
      if (!YTX_CONFIG.util.getUserMedia()) {
        var resp = {};
        resp.code = YTX_CONFIG._errcode._VOIP_NO_MEDIA;
        resp.msg = 'brower not support getUserMedia.';
        onError(resp);
        return
      }
      var timeStamp = new Date().getTime();
      var randomNum = "";
      for (var i = 0; i < 6; i++) {
        randomNum += Math.floor(Math.random() * 10)
      }
      var callId = timeStamp + randomNum;
      YTX_CONFIG._voipCallData._callEventCallId = callId;
      var us_data = ("tel=" + (MakeCallBuilder.getTel() ? MakeCallBuilder.getTel() : '')) + ';' + ('nickName=' + MakeCallBuilder.getNickName()) + (';nickname=' + MakeCallBuilder.getNickName());
      var CallEventBuilder = new YTX_CONFIG._protobuf._CallEventData(1, callId, MakeCallBuilder.getCallType(), MakeCallBuilder.getCalled(), YTX_CONFIG._userName, us_data, null, null, MakeCallBuilder.getDeviceId());
      YTX_CONFIG._sendVoip(CallEventBuilder, callback, onError);
      return callId
    },
    accetpCall: function (AcceptCallBuilder, callback, onError) {
      var CallEventBuilder = new YTX_CONFIG._protobuf._CallEventData(4, AcceptCallBuilder.getCallId(), null, YTX_CONFIG._userName, AcceptCallBuilder.getCaller(), null, null, null, AcceptCallBuilder.getDeviceId());
      YTX_CONFIG._sendVoip(CallEventBuilder, callback, onError)
    },
    rejectCall: function (RejectCallBuilder, callback, onError) {
      YTX_CONFIG._Media.count = 0;
      var CallEventBuilder = new YTX_CONFIG._protobuf._CallEventData(10, RejectCallBuilder.getCallId(), null, YTX_CONFIG._userName, RejectCallBuilder.getCaller(), null, null, '603');
      var sendStr = YTX_CONFIG._protobuf._buildCallEvent(CallEventBuilder, callback, onError);
      YTX_CONFIG._voipCallData._callEventCallId = null;
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
      YTX_CONFIG._releaseVoip();
      if (!!RejectCallBuilder._callId) {
        delete YTX_CONFIG._voipCallData._msgRouterMap[RejectCallBuilder._callId]
      }
    },
    releaseCall: function (ReleaseCallBuilder, callback, onError) {
      YTX_CONFIG._Media.count = 0;
      var callEventType = 7;
      if (!!YTX_CONFIG._voipTimer) {
        clearInterval(YTX_CONFIG._voipTimer);
        YTX_CONFIG._voipTimer = null;
        YTX_CONFIG._voipTimestamp = 0
      }
      if (ReleaseCallBuilder.getCaller() == YTX_CONFIG._userName && !YTX_CONFIG._voipCallData._connected) {
        callEventType = 8
      } else if (YTX_CONFIG._voipCallData._called == YTX_CONFIG._userName && !YTX_CONFIG._voipCallData._connected) {
        var rejectCallBuilder = new RL_YTX.RejectCallBuilder();
        rejectCallBuilder.setCallId(YTX_CONFIG._voipCallData._callId);
        rejectCallBuilder.setCaller(YTX_CONFIG._voipCallData._caller);
        RL_YTX.rejectCall(rejectCallBuilder, function (sucObj) {}, function (errObj) {})
      }
      var CallEventBuilder = new YTX_CONFIG._protobuf._CallEventData(callEventType, ReleaseCallBuilder.getCallId(), null, ReleaseCallBuilder.getCalled(), ReleaseCallBuilder.getCaller());
      var sendStr = YTX_CONFIG._protobuf._buildCallEvent(CallEventBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      };
      YTX_CONFIG._releaseVoip();
      if (!!ReleaseCallBuilder._callId) {
        delete YTX_CONFIG._voipCallData._msgRouterMap[ReleaseCallBuilder._callId]
      };
      YTX_CONFIG._voipCallData._releaseCallback = callback;
      YTX_CONFIG._voipCallData._releaseCallbackError = onError
    },
    deleteReadMsg: function (DeleteReadMsgBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildDeleteReadMsg(DeleteReadMsgBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    presetSynMsgLimit: function (numLimit, callback, onError) {
      if (!isNaN(numLimit) && numLimit >= 0) {
        YTX_CONFIG._synMsgMaxNumLimit = numLimit;
        var respObj = new Object();
        respObj.code = YTX_CONFIG._errcode._SUCC;
        callback(respObj)
      } else {
        var respObj = new Object();
        respObj.code = YTX_CONFIG._errcode._CHARSET_ILLEGAl;
        respObj.msg = "只允许不小于0的整数参数";
        onError(respObj)
      }
    },
    getRecentContactList: function (GetRecentContactListBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildGetRecentContactList(GetRecentContactListBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getFileBlob: function (url, callback, onError, type) {
      var sendStr = YTX_CONFIG._protobuf._buildGetFileSource(url, callback, onError);
      if (!!sendStr) {
        var fileurl = Base64.decode(YTX_CONFIG._file_server_url);
        var ws = new WebSocket(fileurl);
        var tId = setTimeout(function () {
          YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, "getFileSource timeout...");
          ws.close()
        }, (YTX_CONFIG._timeOutSecond * 1000));
        ws.tid = tId;
        ws.onopen = function () {
          ws.send(sendStr)
        };
        ws.onmessage = function (evt) {
          readBlobAsDataURL(evt.data, function (dataurl) {
            var resp = {};
            resp.url = dataurl;
            callback(resp)
          });
          ws.close();
          if (!!tId) {
            clearTimeout(tId)
          }

          function readBlobAsDataURL(blob, callback) {
            if (type === "gzip") {
              var fr = new FileReader();
              fr.readAsBinaryString(blob);
              fr.onload = function (a) {
                var re = a.target.result;
                try {
                  var binary = pako.inflate(re, {
                    "gzip": true,
                    "windowBits": 32
                  });
                  var b = new Blob([binary], {
                    type: "application/octet-binary"
                  });
                  var url = window.URL.createObjectURL(b);
                  callback(url)
                } catch (e) {
                  var str = {};
                  str["code"] = "null";
                  str["msg"] = "uncompressing error ";
                  onError(str)
                }
              }
            } else if (type === "amr") {
              var fr = new FileReader();
              fr.readAsArrayBuffer(blob);
              fr.onload = function (a) {
                var data = new Uint8Array(a.target.result);
                var buffer = AMR.toWAV(data);
                var b = new Blob([buffer], {
                  type: 'audio/x-wav'
                });
                var url = window.URL.createObjectURL(b);
                callback(url)
              }
            }
            fr.onerror = errorHandler;

            function errorHandler(evt) {
              switch (evt.target.error.code) {
                case evt.target.error.NOT_FOUND_ERR:
                  console.log('File Not Found!');
                  break;
                case evt.target.error.NOT_READABLE_ERR:
                  console.log('File is not readable');
                  break;
                case evt.target.error.ABORT_ERR:
                  break;
                default:
                  console.log('An error occurred reading this file.')
              };
              var resp = {};
              resp.code = YTX_CONFIG._errcode._FILE_FILEREADER_ERROR;
              resp.msg = "method FileReader() occur error！";
              onError(resp)
            }
          }
        };
        ws.onerror = function () {
          console.log("WebSocketError!");
          var resp = {};
          resp.code = YTX_CONFIG._errcode._FILE_SOURCE_ERROR;
          resp.msg = "WebSocketError!";
          onError(resp)
        };
        ws.onclose = function (event) {
          console.log("fileWebSocketClosed!");
          if (event.code > 1000) {
            console.error('gzip file  client socket has closed, error code :' + event.code + ': ' + event.reason + ': ' + event.wasClean)
          }
        }
      }
    },
    getFileSource: function (url, callback, onError) {
      RL_YTX.getFileBlob(url, callback, onError, "gzip")
    },
    getAudioSource: function (url, callback, onError) {
      RL_YTX.getFileBlob(url, callback, onError, "amr")
    },
    onMsgReceiveListener: function (callback) {
      YTX_CONFIG._pushListener = callback
    },
    onMsgNotifyReceiveListener: function (callback) {
      YTX_CONFIG._msgNotifyListener = callback
    },
    onMCMMsgReceiveListener: function (callback) {
      YTX_CONFIG._mcmListener = callback
    },
    onMCMNoticeReceiveListener: function (callback) {
      YTX_CONFIG._mcmNoticeListener = callback
    },
    onNoticeReceiveListener: function (callback) {
      YTX_CONFIG._noticeListener = callback
    },
    onConnectStateChangeLisenter: function (callback) {
      YTX_CONFIG._connectStatListener = callback
    },
    onCallMsgListener: function (callback) {
      YTX_CONFIG._voipListener = callback
    },
    onMeetingListener: function (callback) {
      YTX_CONFIG._oldMeetingListener = callback
    },
    reauthListener: function (callback) {
      YTX_CONFIG._reauthListener = callback
    },
    setReauth: function (reqSig, longTimestamp) {
      YTX_CONFIG._longTimestamp = longTimestamp;
      YTX_CONFIG._reqSig = reqSig
    },
    LoginBuilder: function (type, userName, pwd, sig, timestamp, authSig, reqAuth) {
      this._type = type;
      this._userName = userName;
      this._pwd = pwd;
      this._sig = sig;
      this._timestamp = timestamp;
      this.authSig = authSig;
      this.reqAuth = reqAuth;
      this.setType = function (type) {
        this._type = type
      };
      this.setUserName = function (userName) {
        this._userName = userName
      };
      this.setPwd = function (pwd) {
        this._pwd = pwd
      };
      this.setSig = function (sig) {
        this._sig = sig
      };
      this.setTimestamp = function (timestamp) {
        this._timestamp = timestamp
      };
      this.setAuthSig = function (authSig) {
        if (typeof authSig == 'string') {
          this.authSig = authSig
        } else {
          throw 'wrong param type';
        }
      };
      this.setReqAuth = function (reqAuth) {
        this.reqAuth = reqAuth
      };
      this.getType = function () {
        return this._type
      };
      this.getUserName = function () {
        return this._userName
      };
      this.getPwd = function () {
        return this._pwd
      };
      this.getSig = function () {
        return this._sig
      };
      this.getTimestamp = function () {
        return this._timestamp
      };
      this.getAuthSig = function () {
        return this.authSig
      };
      this.getReqAuth = function () {
        return this.reqAuth
      }
    },
    MsgBuilder: function (id, content, file, type, receiver, domain, fileName, atAccounts) {
      this._id = id;
      this._text = content;
      this._file = file;
      this._type = (!!type) ? type : 1;
      this._receiver = receiver;
      this._domain = domain;
      this._fileName = fileName;
      this._atAccounts = atAccounts;
      this.setId = function (id) {
        this._id = id
      };
      this.setText = function (text) {
        this._text = text
      };
      this.setFile = function (file) {
        this._file = file
      };
      this.setType = function (type) {
        this._type = type
      };
      this.setReceiver = function (receiver) {
        this._receiver = receiver
      };
      this.setDomain = function (domain) {
        this._domain = domain
      };
      this.setFileName = function (fileName) {
        this._fileName = fileName
      };
      this.setAtAccounts = function (atAccounts) {
        this._atAccounts = atAccounts
      };
      this.getId = function () {
        return this._id
      };
      this.getText = function () {
        return this._text
      };
      this.getFile = function () {
        return this._file
      };
      this.getType = function () {
        return this._type
      };
      this.getReceiver = function () {
        return this._receiver
      };
      this.getDomain = function () {
        return this._domain
      };
      this.getFileName = function () {
        return this._fileName
      };
      this.getAtAccounts = function () {
        return this._atAccounts
      }
    },
    ChatroomMsgBuilder: function (id, content, file, type, receiver, domain) {
      this._id = id;
      this._text = content;
      this._type = (!!type) ? type : 1;
      this._receiver = receiver;
      this._domain = domain;
      this.setId = function (id) {
        this._id = id
      };
      this.setText = function (text) {
        this._text = text
      };
      this.setDomain = function (domain) {
        this._domain = domain
      };
      this.setReceiver = function (receiver) {
        this._receiver = receiver
      };
      this.getId = function () {
        return this._id
      };
      this.getText = function () {
        return this._text
      };
      this.getType = function () {
        return this._type
      };
      this.getReceiver = function () {
        return this._receiver
      };
      this.getDomain = function () {
        return this._domain
      }
    },
    _mcmType: {
      _mcmType_text: 1,
      _mcmType_audio: 2,
      _mcmType_video: 3,
      _mcmType_pic: 4,
      _mcmType_pos: 5,
      _mcmType_file: 6
    },
    MCMAgentInfoBuilder: function (agentId, imState, telState, number, customaccnum, firstnumber, acdcalltype, pushVoipacc, queueType, queuePriority, userInfoCallbackurl, delayCall, maxImUser, agentServerMode, answerTimeout) {
      this._agentId = agentId;
      this._imState = imState;
      this._telState = telState;
      this._number = number;
      this._customaccnum = customaccnum;
      this._firstnumber = firstnumber;
      this._acdcalltype = acdcalltype;
      this._pushVoipacc = pushVoipacc;
      this._queueType = queueType;
      this._queuePriority = queuePriority;
      this._userInfoCallbackurl = userInfoCallbackurl;
      this._delayCall = delayCall;
      this._maxImUser = maxImUser;
      this._agentServerMode = agentServerMode;
      this._answerTimeout = answerTimeout;
      this.setAgentId = function (agentId) {
        this._agentId = agentId
      };
      this.setImState = function (imState) {
        this._imState = imState
      };
      this.setTelState = function (telState) {
        this._telState = telState
      };
      this.setNumber = function (number) {
        this._number = number
      };
      this.setCustomaccnum = function (customaccnum) {
        this._customaccnum = customaccnum
      };
      this.setFirstnumber = function (firstnumber) {
        this._firstnumber = firstnumber
      };
      this.setAcdcalltype = function (acdcalltype) {
        this._acdcalltype = acdcalltype
      };
      this.setPushVoipacc = function (pushVoipacc) {
        this._pushVoipacc = pushVoipacc
      };
      this.setQueueType = function (queueType) {
        this._queueType = queueType
      };
      this.setQueuePriority = function (queuePriority) {
        this._queuePriority = queuePriority
      };
      this.setUserInfoCallbackurl = function (userInfoCallbackurl) {
        this._userInfoCallbackurl = userInfoCallbackurl
      };
      this.setDelayCall = function (delayCall) {
        this._delayCall = delayCall
      };
      this.setMaxImUser = function (maxImUser) {
        this._maxImUser = maxImUser
      };
      this.setAgentServerMode = function (agentServerMode) {
        this._agentServerMode = agentServerMode
      };
      this.setAnswerTimeout = function (answerTimeout) {
        this._answerTimeout = answerTimeout
      };
      this.getAgentId = function () {
        return this._agentId
      };
      this.getImState = function () {
        return this._imState
      };
      this.getTelState = function () {
        return this._telState
      };
      this.getNumber = function () {
        return this._number
      };
      this.getCustomaccnum = function () {
        return this._customaccnum
      };
      this.getFirstnumber = function () {
        return this._firstnumber
      };
      this.getAcdcalltype = function () {
        return this._acdcalltype
      };
      this.getPushVoipacc = function () {
        return this._pushVoipacc
      };
      this.getQueueType = function () {
        return this._queueType
      };
      this.getQueuePriority = function () {
        return this._queuePriority
      };
      this.getUserInfoCallbackurl = function () {
        return this._userInfoCallbackurl
      };
      this.getDelayCall = function () {
        return this._delayCall
      };
      this.getMaxImUser = function () {
        return this._maxImUser
      };
      this.getAgentServerMode = function () {
        return this._agentServerMode
      };
      this.getAnswerTimeout = function () {
        return this._answerTimeout
      }
    },
    MCMDataBuilder: function (ccpCustomData) {
      this._ccpCustomData = ccpCustomData;
      this.setCcpCustomData = function (ccpCustomData) {
        this._ccpCustomData = ccpCustomData
      };
      this.getCcpCustomData = function () {
        return this._ccpCustomData
      }
    },
    MCMMessageBuilder: function (content, file, type, msgType, userData, account, msgId, fileName, chanType, mailTitle) {
      this._content = content;
      this._userData = userData;
      this._account = account;
      this._msgId = msgId;
      this._file = file;
      this._msgType = (!!msgType) ? msgType : RL_YTX._mcmType._mcmType_text;
      this._fileName = fileName;
      this._chanType = chanType;
      this._mailTitle = mailTitle;
      this.setContent = function (content) {
        this._content = content
      };
      this.setFile = function (file) {
        this._file = file
      };
      this.setMsgType = function (msgType) {
        this._msgType = msgType
      };
      this.setAccount = function (account) {
        this._account = account
      };
      this.setMsgId = function (msgId) {
        this._msgId = msgId
      };
      this.setUserData = function (userData) {
        this._userData = userData
      };
      this.setFileName = function (fileName) {
        this._fileName = fileName
      };
      this.setChanType = function (chanType) {
        this._chanType = chanType
      };
      this.setMailTitle = function (mailTitle) {
        this._mailTitle = mailTitle
      };
      this.getMsgId = function () {
        return this._msgId
      };
      this.getContent = function () {
        return this._content
      };
      this.getFile = function () {
        return this._file
      };
      this.getMsgType = function () {
        return this._msgType
      };
      this.getUserData = function () {
        return this._userData
      };
      this.getAccount = function () {
        return this._account
      };
      this.getMsgType = function () {
        return this._msgType
      };
      this.getFileName = function () {
        return this._fileName
      };
      this.getChanType = function () {
        return this._chanType
      };
      this.getMailTitle = function () {
        return this._mailTitle
      }
    },
    SyncMsgBuilder: function (sVersion, eVersion, type) {
      this._sVersion = sVersion;
      this._eVersion = eVersion;
      this._type = type;
      this.setSVersion = function (sVersion) {
        this._sVersion = sVersion
      };
      this.setEVersion = function (eVersion) {
        this._eVersion = eVersion
      };
      this.setType = function (type) {
        this._type = type
      };
      this.getSVersion = function () {
        return this._sVersion
      };
      this.getEVersion = function () {
        return this._eVersion
      };
      this.getType = function () {
        return this._type
      }
    },
    UploadPersonInfoBuilder: function (nickName, sex, birth, sign) {
      this._nickName = nickName;
      this._sex = (!!sex) ? sex : 1;
      this._birth = birth;
      this._sign = sign;
      this.setNickName = function (nickName) {
        this._nickName = nickName
      };
      this.setSex = function (sex) {
        this._sex = sex
      };
      this.setBirth = function (birth) {
        this._birth = birth
      };
      this.setSign = function (sign) {
        this._sign = sign
      };
      this.getNickName = function () {
        return this._nickName
      };
      this.getSex = function () {
        return this._sex
      };
      this.getBirth = function () {
        return this._birth
      };
      this.getSign = function () {
        return this._sign
      }
    },
    GetHistoryMsgBuilder: function (pageSize, talker, order, time, msgDecompression, type) {
      this.pageSize = 10;
      this.talker = talker;
      this.order = 2;
      this.time = time;
      this.msgDecompression = 1;
      this.setPageSize = function (pageSize) {
        if (typeof pageSize === 'number') {
          this.pageSize = pageSize
        } else {
          throw 'wrong param type';
        }
      };
      this.getPageSize = function () {
        return this.pageSize
      };
      this.setTalker = function (talker) {
        if (typeof talker === 'string') {
          this.talker = talker
        } else {
          throw 'wrong param type';
        }
      };
      this.getTalker = function () {
        return this.talker
      };
      this.setOrder = function (order) {
        if (typeof order === 'number') {
          this.order = order
        } else {
          throw 'wrong param type';
        }
      };
      this.getOrder = function () {
        return this.order
      };
      this.setTime = function (time) {
        if (typeof time === 'string') {
          this.time = time
        } else {
          throw 'wrong param type';
        }
      };
      this.getTime = function () {
        return this.time
      };
      this.setMsgDecompression = function (msgDecompression) {
        if (typeof msgDecompression === 'string') {
          this.msgDecompression = msgDecompression
        } else {
          throw 'wrong param type';
        }
      };
      this.getMsgDecompression = function () {
        return this.msgDecompression
      }
    },
    CreateGroupBuilder: function (groupName, groupType, province, city, scope, declared, permission, mode, groupDomain, target) {
      this._groupName = groupName;
      this._groupType = (!!groupType) ? groupType : 2;
      this._province = province;
      this._city = city;
      this._scope = (!!scope) ? scope : 1;
      this._declared = declared;
      this._permission = (!!permission) ? permission : 1;
      this._mode = (!!mode) ? mode : 1;
      this._groupDomain = groupDomain;
      this._target = target;
      this.setGroupName = function (groupName) {
        this._groupName = groupName
      };
      this.setGroupType = function (groupType) {
        this._groupType = groupType
      };
      this.setProvince = function (province) {
        this._province = province
      };
      this.setCity = function (city) {
        this._city = city
      };
      this.setScope = function (scope) {
        this._scope = scope
      };
      this.setDeclared = function (declared) {
        this._declared = declared
      };
      this.setPermission = function (permission) {
        this._permission = permission
      };
      this.setMode = function (mode) {
        this._mode = mode
      };
      this.setGroupDomain = function (domain) {
        this._groupDomain = domain
      };
      this.setTarget = function (target) {
        this._target = target
      };
      this.getGroupName = function () {
        return this._groupName
      };
      this.getGroupType = function () {
        if (!!this._groupType) {
          return this._groupType
        }
        return 1
      };
      this.getProvince = function () {
        return this._province
      };
      this.getCity = function () {
        return this._city
      };
      this.getScope = function () {
        if (!!this._scope) {
          return this._scope
        }
        return 1
      };
      this.getDeclared = function () {
        return this._declared
      };
      this.getPermission = function () {
        if (!!this._permission) {
          return this._permission
        }
        return 1
      };
      this.getMode = function () {
        if (!!this._mode) {
          return this._mode
        }
        return 1
      };
      this.getGroupDomain = function () {
        return this._groupDomain
      };
      this.getTarget = function () {
        return this._target
      }
    },
    DismissGroupBuilder: function (groupId) {
      this._groupId = groupId;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.getGroupId = function () {
        return this._groupId
      }
    },
    InviteJoinGroupBuilder: function (groupId, declared, members, confirm) {
      this._groupId = groupId;
      this._declared = declared;
      this._members = members;
      this._confirm = (!!confirm) ? confirm : 2;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setDeclared = function (declared) {
        this._declared = declared
      };
      this.setMembers = function (members) {
        this._members = members
      };
      this.setConfirm = function (confirm) {
        this._confirm = confirm
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getDeclared = function () {
        return this._declared
      };
      this.getMembers = function () {
        return this._members
      };
      this.getConfirm = function () {
        return this._confirm
      }
    },
    ConfirmInviteJoinGroupBuilder: function (invitor, groupId, confirm) {
      this._invitor = invitor;
      this._groupId = groupId;
      this._confirm = (!!confirm) ? confirm : 1;
      this.setInvitor = function (invitor) {
        this._invitor = invitor
      };
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setConfirm = function (confirm) {
        this._confirm = confirm
      };
      this.getInvitor = function () {
        return this._invitor
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getConfirm = function () {
        return this._confirm
      }
    },
    QuitGroupBuilder: function (groupId) {
      this._groupid = groupId;
      this.setGroupId = function (groupId) {
        this._groupid = groupId
      };
      this.getGroupId = function () {
        return this._groupid
      }
    },
    GetGroupListBuilder: function (groupId, pageSize, target) {
      this._groupId = groupId;
      this._pageSize = (!!pageSize) ? pageSize : 50;
      this._target = isNaN(target) ? undefined : target;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setPageSize = function (pageSize) {
        this._pageSize = pageSize
      };
      this.setTarget = function (target) {
        if (isNaN(target)) {
          target = undefined
        }
        this._target = target
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getPageSize = function () {
        return this._pageSize
      };
      this.getTarget = function () {
        return this._target
      }
    },
    GetGroupMemberListBuilder: function (groupId, memberId, pageSize) {
      this._groupId = groupId;
      this._memberId = memberId;
      this._pageSize = (!!pageSize) ? pageSize : 50;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setPageSize = function (pageSize) {
        this._pageSize = pageSize
      };
      this.setMemberId = function (memberId) {
        this._memberId = memberId
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getPageSize = function () {
        return this._pageSize
      };
      this.getMemberId = function () {
        return this._memberId
      }
    },
    JoinGroupBuilder: function (groupId, declared) {
      this._groupId = groupId;
      this._declared = (!!declared) ? declared : '';
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setDeclared = function (declared) {
        if (!declared) {
          declared = ''
        }
        this._declared = declared
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getDeclared = function () {
        return this._declared
      }
    },
    ConfirmJoinGroupBuilder: function (groupId, memberId, confirm) {
      this._groupId = groupId;
      this._memberId = memberId;
      this._confirm = confirm;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setMemberId = function (memberId) {
        this._memberId = memberId
      };
      this.setConfirm = function (confirm) {
        this._confirm = confirm
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getMemberId = function () {
        return this._memberId
      };
      this.getConfirm = function () {
        return this._confirm
      }
    },
    GetGroupDetailBuilder: function (groupId) {
      this._groupId = groupId;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.getGroupId = function () {
        return this._groupId
      }
    },
    SearchGroupsBuilder: function (searchType, keywords) {
      this._searchType = searchType;
      this._keywords = keywords;
      this.setSearchType = function (searchType) {
        this._searchType = searchType
      };
      this.setKeywords = function (keywords) {
        this._keywords = keywords
      };
      this.getSearchType = function () {
        return this._searchType
      };
      this.getKeywords = function () {
        return this._keywords
      }
    },
    DeleteGroupMemberBuilder: function (groupId, memberId) {
      this._groupId = groupId;
      this._memberId = memberId;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setMemberId = function (memberId) {
        this._memberId = memberId
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getMemberId = function () {
        return this._memberId
      }
    },
    ForbidMemberSpeakBuilder: function (groupId, memberId, forbidState) {
      this._groupId = groupId;
      this._memberId = memberId;
      this._forbidState = (!!forbidState && !isNaN(forbidState)) ? forbidState : 2;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setMemberId = function (memberId) {
        this._memberId = memberId
      };
      this.setForbidState = function (forbidState) {
        if (!!forbidState && !isNaN(forbidState)) {
          this._forbidState = forbidState
        } else {
          this._forbidState = 2
        }
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getMemberId = function () {
        return this._memberId
      };
      this.getForbidState = function () {
        if (!!this._forbidState) {
          return this._forbidState
        } else {
          return 2
        }
      }
    },
    SetGroupMessageRuleBuilder: function (groupId, isNotice, isApplePush) {
      this._groupId = groupId;
      this._isNotice = (!!isNotice && !isNaN(isNotice)) ? isNotice : null;
      this._isApplePush = (!!isApplePush && !isNaN(isApplePush)) ? isNotice : null;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setIsNotice = function (isNotice) {
        if (!!isNotice && !isNaN(isNotice)) {
          this._isNotice = isNotice
        } else {
          this._isNotice = null
        }
      };
      this.setIsApplePush = function (isApplePush) {
        if ((!!isApplePush && !isNaN(isApplePush))) {
          this._isApplePush = isApplePush
        } else {
          this._isApplePush = null
        }
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getIsNotice = function () {
        return this._isNotice
      };
      this.getIsApplePush = function () {
        return this._isApplePush
      }
    },
    QueryGroupMemberCardBuilder: function (memberId, belong) {
      this._memberId = memberId;
      this._belong = belong;
      this.setMemberId = function (memberId) {
        this._memberId = memberId
      };
      this.setBelong = function (belong) {
        this._belong = belong
      };
      this.getMemberId = function () {
        return this._memberId
      };
      this.getBelong = function () {
        return this._belong
      }
    },
    ModifyMemberCardBuilder: function (member, belong, display, phone, mail, remark) {
      this._member = member;
      this._belong = belong;
      this._display = display;
      this._phone = phone;
      this._mail = mail;
      this._remark = remark;
      this.setMember = function (member) {
        this._member = member
      };
      this.setBelong = function (belong) {
        this._belong = belong
      };
      this.setDisplay = function (display) {
        this._display = display
      };
      this.setMail = function (mail) {
        this._mail = mail
      };
      this.setPhone = function (phone) {
        this._phone = phone
      };
      this.setRemark = function (remark) {
        this._remark = remark
      };
      this.getMember = function () {
        return this._member
      };
      this.getBelong = function () {
        return this._belong
      };
      this.getDisplay = function () {
        return this._display
      };
      this.getPhone = function () {
        return this._phone
      };
      this.getMail = function () {
        return this._mail
      };
      this.getRemark = function () {
        return this._remark
      }
    },
    ModifyGroupBuilder: function (groupId, groupName, type, province, city, scope, declared, permission, groupDomain) {
      this._groupId = groupId;
      this._groupName = groupName;
      this._type = type;
      this._province = province;
      this._city = city;
      this._scope = scope;
      this._declared = declared;
      this._permission = permission;
      this._groupDomain = groupDomain;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setGroupName = function (groupName) {
        this._groupName = groupName
      };
      this.setType = function (type) {
        if (!!type && !isNaN(type)) {
          this._type = type
        } else {
          this._type = null
        }
      };
      this.setProvince = function (province) {
        this._province = province
      };
      this.setCity = function (city) {
        this._city = city
      };
      this.setScope = function (scope) {
        if (!!scope && !isNaN(scope)) {
          this._scope = scope
        } else {
          this._scope = null
        }
      };
      this.setDeclared = function (declared) {
        this._declared = declared
      };
      this.setPermission = function (permission) {
        if (!!permission && !isNaN(permission)) {
          this._permission = permission
        } else {
          this._permission = null
        }
      };
      this.setGroupDomain = function (groupDomain) {
        this._groupDomain = groupDomain
      };
      this.getGroupId = function () {
        return this._groupId
      };
      this.getGroupName = function () {
        return this._groupName
      };
      this.getType = function () {
        return this._type
      };
      this.getProvince = function () {
        return this._province
      };
      this.getCity = function () {
        return this._city
      };
      this.getScope = function () {
        return this._scope
      };
      this.getDeclared = function () {
        return this._declared
      };
      this.getPermission = function () {
        return this._permission
      };
      this.getGroupDomain = function () {
        return this._groupDomain
      }
    },
    GetUserStateBuilder: function (useracc, newUserstate) {
      this._useracc = useracc;
      this._newUserstate = newUserstate;
      this.setNewUserstate = function (newUserstate) {
        this._newUserstate = newUserstate
      };
      this.getNewUserstate = function () {
        return this._newUserstate
      };
      this.setUseracc = function (useracc) {
        this._useracc = useracc
      };
      this.getUseracc = function () {
        return this._useracc
      }
    },
    SetGroupMemberRoleBuilder: function (groupId, memberId, role) {
      this._groupId = groupId;
      this._memberId = memberId;
      this._role = role;
      this.setGroupId = function (groupId) {
        this._groupId = groupId
      };
      this.setMemberId = function (memberId) {
        this._memberId = memberId
      };
      this.setRole = function (role) {
        this._role = role
      };
      this.getGroupId = function (groupId) {
        return this._groupId
      };
      this.getMemberId = function (memberId) {
        return this._memberId
      };
      this.getRole = function (role) {
        return this._role
      }
    },
    MakeCallBuilder: function (called, callType, tel, nickname, deviceId) {
      this._called = called;
      this._callType = (!!callType) ? callType : 1;
      this._tel = tel;
      this._nickname = nickname;
      this._deviceId = deviceId;
      this.setDeviceId = function (deviceId) {
        this._deviceId = deviceId
      };
      this.getDeviceId = function () {
        return this._deviceId
      };
      this.setCalled = function (called) {
        this._called = called
      };
      this.setCallType = function (callType) {
        this._callType = callType
      };
      this.setTel = function (tel) {
        this._tel = tel
      };
      this.setNickName = function (nickname) {
        this._nickname = nickname
      };
      this.getCalled = function () {
        return this._called
      };
      this.getCallType = function () {
        return this._callType
      };
      this.getTel = function () {
        return this._tel
      };
      this.getNickName = function () {
        return this._nickname
      }
    },
    AcceptCallBuilder: function (callId, caller, deviceId) {
      this._callId = callId;
      this._caller = caller;
      this._deviceId = deviceId;
      this.setDeviceId = function (deviceId) {
        this._deviceId = deviceId
      };
      this.getDeviceId = function () {
        return this._deviceId
      };
      this.setCallId = function (callId) {
        this._callId = callId
      };
      this.setCaller = function (caller) {
        this._caller = caller
      };
      this.getCallId = function () {
        return this._callId
      };
      this.getCaller = function () {
        return this._caller
      }
    },
    RejectCallBuilder: function (callId, caller, reason) {
      this._callId = callId;
      this._caller = caller;
      this.setCallId = function (callId) {
        this._callId = callId
      };
      this.setCaller = function (caller) {
        this._caller = caller
      };
      this.getCallId = function () {
        return this._callId
      };
      this.getCaller = function () {
        return this._caller
      }
    },
    ReleaseCallBuilder: function (callId, caller, called) {
      this._callId = callId;
      this._caller = caller;
      this._called = called;
      this.setCallId = function (callId) {
        this._callId = callId
      };
      this.setCaller = function (caller) {
        this._caller = caller
      };
      this.setCalled = function (called) {
        this._called = called
      };
      this.getCallId = function () {
        return this._callId
      };
      this.getCaller = function () {
        return this._caller
      };
      this.getCalled = function () {
        return this._called
      }
    },
    DeleteReadMsgBuilder: function (version, msgid) {
      this._msgid = msgid;
      this.setMsgid = function (msgid) {
        this._msgid = msgid
      };
      this.getMsgid = function () {
        return this._msgid
      }
    },
    MsgOperationBuilder: function (version, msgId, type) {
      this._version = version;
      this._msgId = msgId;
      this._type = type;
      this.setVersion = function (version) {
        this._version = version
      };
      this.setMsgId = function (msgId) {
        this._msgId = msgId
      };
      this.setType = function (type) {
        this._type = type
      };
      this.getVersion = function () {
        return this._version
      };
      this.getMsgId = function () {
        return this._msgId
      };
      this.getType = function () {
        return this._type
      }
    },
    GetRecentContactListBuilder: function (time, limit) {
      this._time = time;
      this._limit = limit ? limit : 50;
      this.setTime = function (time) {
        this._time = time
      };
      this.setLimit = function (limit) {
        this._limit = limit
      };
      this.getTime = function () {
        return this._time
      };
      this.getLimit = function () {
        return this._pageSize
      }
    },
    MsgBackBuilder: function (msgId) {
      this.msgId = msgId;
      this.setMsgId = function (msgId) {
        this.msgId = msgId
      };
      this.getMsgId = function () {
        return this.msgId
      }
    },
    MsgReadBuilder: function (version) {
      this.version = version;
      this.setVersion = function (version) {
        this.version = version
      };
      this.getVersion = function () {
        return this.version
      }
    },
    SetTopContactBuilder: function (contact, type) {
      this._contact = contact;
      this._type = type;
      this.setContact = function (contact) {
        this._contact = contact
      };
      this.getContact = function () {
        return this._contact
      };
      this.setType = function (type) {
        this._type = type
      };
      this.getType = function () {
        return this._type
      }
    },
    photo: {
      apply: function (obj, onCanPlay, onError) {
        PHOTO_CONFIG.state = 1;
        var resp = {};
        resp.code = 200;
        var userMedia = YTX_CONFIG.util.getUserMedia();
        if (!userMedia) {
          resp.code = YTX_CONFIG._errcode._VOIP_NO_MEDIA;
          resp.msg = "brower not support getUserMedia";
          onError(resp);
          return
        }
        var video = null;
        if (!!obj) {
          video = obj.tag
        }

        function onErr(error) {
          var resp = {};
          switch (error.code || error.name) {
            case 'PERMISSION_DENIED':
            case 'PermissionDeniedError':
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, '用户拒绝提供信息。');
              resp.msg = 'user refuesed';
              break;
            case 'NOT_SUPPORTED_ERROR':
            case 'NotSupportedError':
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, '浏览器不支持硬件设备。');
              resp.msg = 'brower not support';
              break;
            case 'MANDATORY_UNSATISFIED_ERROR':
            case 'MandatoryUnsatisfiedError':
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, '无法发现指定的硬件设备。');
              resp.msg = 'can not find device';
              break;
            default:
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, '无法打开音视频。异常信息:' + (error.code || error.name));
              resp.msg = 'can not open resource';
              break
          }
          resp.code = YTX_CONFIG._errcode._VOIP_MEDIA_ERROR;
          onError(resp)
        }
        if (PHOTO_CONFIG.mediaStream) {
          YTX_CONFIG.util.stopMediaStream(PHOTO_CONFIG.mediaStream);
          PHOTO_CONFIG.mediaStream = null
        }

        function inputStream(stream) {
          if (PHOTO_CONFIG.state != 1) {
            YTX_CONFIG.util.stopMediaStream(stream);
            return
          }
          if (!video) {
            video = document.createElement("video")
          }
          if ("srcObject" in video) {
            video.srcObject = stream
          } else {
            var windowUrl = YTX_CONFIG.util.getWindowURL();
            if (!!windowUrl) {
              video.src = windowUrl.createObjectURL(stream)
            }
          }
          if (onCanPlay && onCanPlay instanceof Function) {
            if (video.addEventListener) {
              video.addEventListener('canplay', function () {
                onCanPlay()
              })
            } else if (video.attachEvent) {
              video.attachEvent('oncanplay', function () {
                onCanPlay()
              })
            }
          }
          var width = "640px";
          var height = "480px";
          if (video.offsetWidth > 0) {
            width = video.offsetWidth
          } else {
            video.style.width = width
          }
          if (video.offsetHeight > 0) {
            height = video.offsetHeight
          } else {
            video.style.height = height
          }
          PHOTO_CONFIG.video = video;
          PHOTO_CONFIG.mediaStream = stream
        };
        YTX_CONFIG._getUserMedia(true, inputStream, onErr, false)
      },
      make: function () {
        var resp = {};
        resp.code = 200;
        if (!PHOTO_CONFIG.mediaStream) {
          resp.code = YTX_CONFIG._errcode._NO_RESOURCE_STREAM;
          resp.msg = "please execute apply methord first";
          return resp
        }
        var video = PHOTO_CONFIG.video;
        var windowUrl = YTX_CONFIG.util.getWindowURL();
        var canvas = document.createElement("canvas");
        var width = video.offsetWidth;
        var height = video.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        var dataurl = canvas.toDataURL('image/jpeg', 0.6);
        canvas = null;
        video = null;
        var bin = atob(dataurl.split(',')[1]);
        var buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i)
        }
        var blob = new Blob([buffer.buffer], {
          type: 'image/jpeg'
        });
        if (windowUrl) {
          var url = windowUrl.createObjectURL(blob);
          blob.url = url
        }
        YTX_CONFIG.util.stopMediaStream(PHOTO_CONFIG.mediaStream);
        PHOTO_CONFIG.mediaStream = null;
        var time = new Date().getTime();
        blob.fileName = time + ".jpg";
        resp.blob = blob;
        return resp
      },
      cancel: function () {
        PHOTO_CONFIG.state = 2;
        var resp = {};
        resp.code = 200;
        if (PHOTO_CONFIG.mediaStream) {
          YTX_CONFIG.util.stopMediaStream(PHOTO_CONFIG.mediaStream);
          PHOTO_CONFIG.mediaStream = null
        }
        if (PHOTO_CONFIG.video) {
          PHOTO_CONFIG.video = null
        }
        return resp
      }
    },
    audio: {
      apply: function (obj, onCanPlay, onError) {
        AUDIO_CONFIG.state = 1;
        var resp = {};
        var userMedia = YTX_CONFIG.util.getUserMedia();
        if (!userMedia) {
          resp.code = YTX_CONFIG._errcode._VOIP_NO_MEDIA;
          resp.msg = "brower not support getUserMedia";
          onError(resp);
          return
        }
        var audio = null;
        if (!!obj) {
          audio = obj.tag
        }

        function onErr(error) {
          var resp = {};
          switch (error.code || error.name) {
            case 'PERMISSION_DENIED':
            case 'PermissionDeniedError':
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'user refused the Permission.');
              resp.msg = 'user refuesed';
              break;
            case 'NOT_SUPPORTED_ERROR':
            case 'NotSupportedError':
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'the export is not support the equipment.');
              resp.msg = 'brower not support';
              break;
            case 'MANDATORY_UNSATISFIED_ERROR':
            case 'MandatoryUnsatisfiedError':
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'can`t find the microphone equipment ');
              resp.msg = 'can not find device';
              break;
            default:
              YTX_CONFIG._log(YTX_CONFIG._logLev._INFO, 'can`t open the microphone。errcode :' + (error.code || error.name));
              resp.msg = 'can not open resource';
              break
          }
          resp.code = YTX_CONFIG._errcode._VOIP_MEDIA_ERROR;
          onError(resp)
        }
        YTX_CONFIG._getUserMedia(false, function (stream) {
          if (AUDIO_CONFIG.state != 1) {
            YTX_CONFIG.util.stopMediaStream(stream);
            return
          }
          var windowUrl = YTX_CONFIG.util.getWindowURL();
          AUDIO_CONFIG.mediaStream = stream;
          var rec = new HZRecorder(stream);
          AUDIO_CONFIG.recorder = rec;
          if (!audio) {
            audio = document.createElement("video")
          }
          if (!!audio.srcObject) {
            audio.srcObject = stream
          } else {
            audio.src = windowUrl.createObjectURL(stream)
          }
          AUDIO_CONFIG.audio = audio;
          if (onCanPlay && onCanPlay instanceof Function) {
            if (audio.addEventListener) {
              audio.addEventListener('canplay', function () {
                onCanPlay()
              })
            } else if (audio.attachEvent) {
              audio.attachEvent('oncanplay', function () {
                onCanPlay()
              })
            }
          }
          rec.start(audio)
        }, onErr)
      },
      make: function () {
        var resp = {};
        resp.code = 200;
        if (!AUDIO_CONFIG.recorder) {
          resp.code = YTX_CONFIG._errcode._NO_RESOURCE_STREAM;
          resp.msg = "please execute apply methord first";
          return resp
        }
        var dataBlob = AUDIO_CONFIG.recorder.getBlob();
        var windowUrl = YTX_CONFIG.util.getWindowURL();
        var url = windowUrl.createObjectURL(dataBlob);
        dataBlob.url = url;
        var time = new Date().getTime();
        dataBlob.fileName = time + ".wav";
        resp.blob = dataBlob;
        return resp
      },
      cancel: function () {
        AUDIO_CONFIG.state = 2;
        var resp = {};
        resp.code = 200;
        if (AUDIO_CONFIG.recorder) {
          AUDIO_CONFIG.recorder.stop();
          AUDIO_CONFIG.recorder = null
        }
        if (AUDIO_CONFIG.audio) {
          AUDIO_CONFIG.audio = null
        }
        return resp
      }
    },
    EnterChatroomBuilder: function (roomId, nickName, infoExt, needNotify, notifyExt) {
      this.roomId = roomId;
      this.nickName = nickName;
      this.infoExt = infoExt;
      this.needNotify = needNotify ? needNotify : 2;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setNickName = function (nickName) {
        if (typeof nickName == 'string') {
          this.nickName = nickName
        } else {
          throw 'wrong param type';
        }
      };
      this.getNickName = function () {
        return this.nickName
      };
      this.setInfoExt = function (infoExt) {
        if (typeof infoExt == 'string') {
          this.infoExt = infoExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getInfoExt = function () {
        return this.infoExt
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      }
    },
    ExitChatroomBuilder: function (roomId, needNotify, notifyExt) {
      this.roomId = roomId;
      this.needNotify = needNotify;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      }
    },
    FetchChatroomInfoBuilder: function (roomId) {
      this.roomId = roomId;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      }
    },
    AllMuteBuilder: function (roomId, allMuteMode, needNotify, notifyExt) {
      this.roomId = roomId;
      this.allMuteMode = allMuteMode;
      this.needNotify = needNotify;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setAllMuteMode = function (allMuteMode) {
        if (typeof allMuteMode == 'number') {
          this.allMuteMode = allMuteMode
        } else {
          throw 'wrong param type';
        }
      };
      this.getAllMuteMode = function () {
        return this.allMuteMode
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      }
    },
    UpdateChatroomInfoBuilder: function (roomId, roomName, announcement, roomExt, allMuteMode, needNotify, notifyExt) {
      this.roomId = roomId;
      this.roomName = roomName;
      this.announcement = announcement;
      this.roomExt = roomExt;
      this.allMuteMode = allMuteMode;
      this.needNotify = needNotify;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setRoomName = function (roomName) {
        if (typeof roomName == 'string') {
          this.roomName = roomName
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomName = function () {
        return this.roomName
      };
      this.setAnnouncement = function (announcement) {
        if (typeof announcement == 'string') {
          this.announcement = announcement
        } else {
          throw 'wrong param type';
        }
      };
      this.getAnnouncement = function () {
        return this.announcement
      };
      this.setRoomExt = function (roomExt) {
        if (typeof roomExt == 'string') {
          this.roomExt = roomExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomExt = function () {
        return this.roomExt
      };
      this.setAllMuteMode = function (allMuteMode) {
        if (typeof allMuteMode == 'number') {
          this.allMuteMode = allMuteMode
        } else {
          throw 'wrong param type';
        }
      };
      this.getAllMuteMode = function () {
        return this.allMuteMode
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      }
    },
    UpdateChatRoomMemberRoleBuilder: function (roomId, userId, type, needNotify, notifyExt) {
      this.roomId = roomId;
      this.userIds = userId;
      this.type = type;
      this.needNotify = needNotify;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setUserId = function (userIds) {
        if (typeof userIds == 'string') {
          this.userId = userIds
        } else {
          throw 'wrong param type';
        }
      };
      this.getUserId = function () {
        return this.userId
      };
      this.setType = function (type) {
        if (typeof type == 'number') {
          this.type = type
        } else {
          throw 'wrong param type';
        }
      };
      this.getType = function () {
        return this.type
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      }
    },
    FetchChatroomMembersBuilder: function (roomId, userId, type, pageSize) {
      this.roomId = roomId;
      this.userId = userId;
      this.type = type ? type : 1;
      this.pageSize = pageSize ? pageSize : 20;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setUserId = function (userId) {
        if (userId == null) return;
        if (typeof userId == 'string') {
          this.userId = userId
        } else {
          throw 'wrong param type';
        }
      };
      this.getUserId = function () {
        return this.userId
      };
      this.setType = function (type) {
        if (typeof type == 'number') {
          this.type = type
        } else {
          throw 'wrong param type';
        }
      };
      this.getType = function () {
        return this.type
      };
      this.setPageSize = function (pageSize) {
        if (typeof pageSize == 'number') {
          this.pageSize = pageSize
        } else {
          throw 'wrong param type';
        }
      };
      this.getPageSize = function () {
        return this.pageSize
      }
    },
    UpdateMyChatroomMemberInfoBuilder: function (roomId, nickName, infoExt) {
      this.roomId = roomId;
      this.nickName = nickName;
      this.infoExt = infoExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setNickName = function (nickName) {
        if (typeof nickName == 'string') {
          this.nickName = nickName
        } else {
          throw 'wrong param type';
        }
      };
      this.getNickName = function () {
        return this.nickName
      };
      this.setInfoExt = function (infoExt) {
        if (typeof infoExt == 'string') {
          this.infoExt = infoExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getInfoExt = function () {
        return this.infoExt
      }
    },
    KickMemberBuilder: function (roomId, userIds, notifyExt, needNotify) {
      this.roomId = roomId;
      this.userIds = userIds;
      this.notifyExt = notifyExt;
      this.needNotify = needNotify;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setUserIds = function (userIds) {
        if (typeof userIds == 'string') {
          this.userIds = [userIds]
        } else if (userIds instanceof Array) {
          this.userIds = userIds
        } else {
          throw 'wrong param type';
        }
      };
      this.getUserIds = function () {
        return this.userIds
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      }
    },
    UpdateMemberOptionBuilder: function (roomId, userId, state, enable, muteDuration, notifyExt, needNotify) {
      this.roomId = roomId;
      this.userId = userId;
      this.state = state;
      this.enable = enable;
      this.muteDuration = muteDuration;
      this.notifyExt = notifyExt;
      this.needNotify = needNotify;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setUserIds = function (userIds) {
        if (typeof userIds == 'string') {
          this.userIds = userIds
        } else {
          throw 'wrong param type';
        }
      };
      this.getUserIds = function () {
        return this.userIds
      };
      this.setState = function (state) {
        if (typeof state == 'string') {
          this.state = state
        } else {
          throw 'wrong param type';
        }
      };
      this.getState = function () {
        return this.state
      };
      this.setEnable = function (enable) {
        if (typeof enable == 'string') {
          this.enable = enable
        } else {
          throw 'wrong param type';
        }
      };
      this.getEnable = function () {
        return this.enable
      };
      this.setMuteDuration = function (muteDuration) {
        if (typeof muteDuration == 'string') {
          this.muteDuration = muteDuration
        } else {
          throw 'wrong param type';
        }
      };
      this.getMuteDuration = function () {
        return this.muteDuration
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      }
    },
    UpdateMemberStateBuilder: function (roomId, userId, state, muteDuration, needNotify, notifyExt) {
      this.roomId = roomId;
      this.userId = userId;
      this.state = state;
      this.muteDuration = muteDuration;
      this.needNotify = needNotify;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setUserId = function (userId) {
        if (typeof userId == 'string') {
          this.userId = userId
        } else {
          throw 'wrong param type';
        }
      };
      this.getUserId = function () {
        return this.userId
      };
      this.setState = function (state) {
        if (typeof state == 'number') {
          this.state = state
        } else {
          throw 'wrong param type';
        }
      };
      this.getState = function () {
        return this.state
      };
      this.setMuteDuration = function (muteDuration) {
        if (typeof muteDuration == 'number') {
          this.muteDuration = muteDuration
        } else {
          throw 'wrong param type';
        }
      };
      this.getMuteDuration = function () {
        return this.muteDuration
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      }
    },
    enterChatroom: function (enterChatroomBuilder, callback, onError) {
      RL_YTX.chatRommId = enterChatroomBuilder.getRoomId();
      RL_YTX.chatRommNickName = enterChatroomBuilder.getNickName();
      var sendStr = YTX_CONFIG._protobuf._buildEnterChatroom(enterChatroomBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    exitChatroom: function (exitChatroomBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildExitChatroom(exitChatroomBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    fetchChatroomInfo: function (fetchChatroomInfoBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildFetchChatroomInfo(fetchChatroomInfoBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    fetchChatroomMembers: function (fetchChatroomMembersBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildFetchChatroomMembers(fetchChatroomMembersBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    updateChatroomInfo: function (updateChatroomInfoBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildUpdateChatroomInfo(updateChatroomInfoBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    updateChatRoomMemberRole: function (updateChatRoomMemberRoleBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildUpdateChatRoomMemberRole(updateChatRoomMemberRoleBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    updateMemberOption: function (updateMemberStateBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildUpdateMemberOption(updateMemberStateBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    updateMyChatroomMemberInfo: function (updateMyChatroomMemberInfoBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildUpdateMyChatroomMemberInfo(updateMyChatroomMemberInfoBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    kickMember: function (kickMemberBuilder, callback, onError) {
      var sendStr = YTX_CONFIG._protobuf._buildKickMember(kickMemberBuilder, callback, onError);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    allMuteMode: function (allMuteModeBuilder, callback, onError) {
      var updateChatroomInfoBuilder = new RL_YTX.UpdateChatroomInfoBuilder(allMuteModeBuilder.getRoomId(), null, null, null, allMuteModeBuilder.getAllMuteMode(), allMuteModeBuilder.getNeedNotify(), allMuteModeBuilder.getNotifyExt());
      RL_YTX.updateChatroomInfo(updateChatroomInfoBuilder, callback, onError)
    },
    DefriendMemberBuilder: function (roomId, userId, state, needNotify, notifyExt) {
      this.roomId = roomId;
      this.userId = userId;
      this.state = state;
      this.needNotify = needNotify;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setUserId = function (userId) {
        if (typeof userId == 'string') {
          this.userId = userId
        } else {
          throw 'wrong param type';
        }
      };
      this.getUserId = function () {
        return this.userId
      };
      this.setState = function (state) {
        if (typeof state == 'number') {
          this.state = state
        } else {
          throw 'wrong param type';
        }
      };
      this.getState = function () {
        return this.state
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      }
    },
    ForbidChatRoomMemberBuilder: function (roomId, userId, state, muteDuration, needNotify, notifyExt) {
      this.roomId = roomId;
      this.userId = userId;
      this.state = state;
      this.muteDuration = muteDuration;
      this.needNotify = needNotify;
      this.notifyExt = notifyExt;
      this.setRoomId = function (roomId) {
        if (typeof roomId == 'string') {
          this.roomId = roomId
        } else {
          throw 'wrong param type';
        }
      };
      this.getRoomId = function () {
        return this.roomId
      };
      this.setUserId = function (userId) {
        if (typeof userId == 'string') {
          this.userId = userId
        } else {
          throw 'wrong param type';
        }
      };
      this.getUserId = function () {
        return this.userId
      };
      this.setState = function (state) {
        if (typeof state == 'number') {
          this.state = state
        } else {
          throw 'wrong param type';
        }
      };
      this.getState = function () {
        return this.state
      };
      this.setMuteDuration = function (muteDuration) {
        if (typeof muteDuration == 'number') {
          this.muteDuration = muteDuration
        } else {
          throw 'wrong param type';
        }
      };
      this.getMuteDuration = function () {
        return this.muteDuration
      };
      this.setNeedNotify = function (needNotify) {
        if (typeof needNotify == 'number') {
          this.needNotify = needNotify
        } else {
          throw 'wrong param type';
        }
      };
      this.getNeedNotify = function () {
        return this.needNotify
      };
      this.setNotifyExt = function (notifyExt) {
        if (typeof notifyExt == 'string') {
          this.notifyExt = notifyExt
        } else {
          throw 'wrong param type';
        }
      };
      this.getNotifyExt = function () {
        return this.notifyExt
      }
    },
    defriendMember: function (defriendMemberBuilder, callback, onError) {
      var UpdateMemberStateBuilder = new RL_YTX.UpdateMemberStateBuilder();
      UpdateMemberStateBuilder.setRoomId(defriendMemberBuilder.getRoomId());
      UpdateMemberStateBuilder.setUserId(defriendMemberBuilder.getUserId());
      UpdateMemberStateBuilder.setState(defriendMemberBuilder.getState() == 1 ? 3 : 4);
      UpdateMemberStateBuilder.setNeedNotify(defriendMemberBuilder.getNeedNotify());
      UpdateMemberStateBuilder.setNotifyExt(defriendMemberBuilder.getNotifyExt());
      RL_YTX.updateMemberOption(UpdateMemberStateBuilder, callback, onError)
    },
    forbidChatRoomMember: function (forbidChatRoomMemberBuilder, callback, onError) {
      var UpdateMemberStateBuilder = new RL_YTX.UpdateMemberStateBuilder();
      UpdateMemberStateBuilder.setRoomId(forbidChatRoomMemberBuilder.getRoomId());
      UpdateMemberStateBuilder.setUserId(forbidChatRoomMemberBuilder.getUserId());
      UpdateMemberStateBuilder.setState(forbidChatRoomMemberBuilder.getState() === 1 ? 1 : 2);
      UpdateMemberStateBuilder.setMuteDuration(forbidChatRoomMemberBuilder.getMuteDuration());
      UpdateMemberStateBuilder.setNeedNotify(forbidChatRoomMemberBuilder.getNeedNotify());
      UpdateMemberStateBuilder.setNotifyExt(forbidChatRoomMemberBuilder.getNotifyExt());
      RL_YTX.updateMemberOption(UpdateMemberStateBuilder, callback, onError)
    },
    setTopContact: function (setTopContactBuilder, callback, onerror) {
      var sendStr = YTX_CONFIG._protobuf._buildSetTopContact(setTopContactBuilder, callback, onerror);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    getTopContact: function (callback, onerror) {
      var sendStr = YTX_CONFIG._protobuf._buildGetTopContact(callback, onerror);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    setMediaConfig: function (width, height, frameRate) {
      if (width) {
        YTX_CONFIG._mediaConfig.width.ideal = parseInt(width)
      }
      if (height) {
        YTX_CONFIG._mediaConfig.height.ideal = parseInt(height)
      }
      if (frameRate) {
        YTX_CONFIG._mediaConfig.frameRate.ideal = parseInt(frameRate)
      }
    },
    getCamera: function (callback) {
      if (typeof callback !== "function") {
        return
      }
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices().then(function (arr) {
          console.log(arr);
          var ret = [];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i]["kind"] === "videoinput") {
              ret.push(arr[i])
            }
          }
          callback(ret)
        }).catch(function (err) {
          console.log(err);
          callback(null)
        })
      } else {
        callback(null)
      }
    },
    exchangeCamera: function (did, callback, onerror) {
      if (!did) {
        return
      }
      var isVideo = null;
      if (did === "environment") {
        isVideo = {
          facingMode: {
            exact: "environment"
          },
          width: YTX_CONFIG._mediaConfig.width,
          height: YTX_CONFIG._mediaConfig.height,
          frameRate: YTX_CONFIG._mediaConfig.frameRate
        }
      } else if (did === "user") {
        isVideo = {
          facingMode: "user",
          width: YTX_CONFIG._mediaConfig.width,
          height: YTX_CONFIG._mediaConfig.height,
          frameRate: YTX_CONFIG._mediaConfig.frameRate
        }
      } else {
        YTX_CONFIG._mediaConfig.type = 2;
        isVideo = {
          optional: [{
            sourceId: did
          }]
        }
      }
      if (YTX_CONFIG._voipCallData._connected && YTX_CONFIG._voipCallData._localMediaStream) {
        var s = [];
        var VideoTrack = null;
        var AudioTrack = null;
        if (YTX_CONFIG._voipCallData._peerConnection.getSenders && (s = YTX_CONFIG._voipCallData._peerConnection.getSenders()) && s.length > 0) {
          for (var i = 0; i < s.length; i++) {
            if (s[i].track.kind == "video") {
              VideoTrack = s[i]
            } else {
              AudioTrack = s[i]
            }
          }
        } else if (YTX_CONFIG._voipCallData._localMediaStream.removeTrack && YTX_CONFIG._voipCallData._peerConnection.getSenders) {
          YTX_CONFIG._voipCallData._peerConnection.getSenders().forEach(function (track) {
            YTX_CONFIG._voipCallData._peerConnection.removeTrack(track)
          })
        } else {
          YTX_CONFIG._voipCallData._peerConnection.removeStream(YTX_CONFIG._voipCallData._localMediaStream)
        }
        YTX_CONFIG.util.stopMediaStream(YTX_CONFIG._voipCallData._localMediaStream);
        YTX_CONFIG._voipCallData._sender = [];
        YTX_CONFIG._getUserMedia(isVideo, function (stream) {
          YTX_CONFIG._voipCallData._localMediaStream = stream;
          if (VideoTrack && "replaceTrack" in VideoTrack) {
            VideoTrack.replaceTrack(stream.getVideoTracks()[0]);
            AudioTrack.replaceTrack(stream.getAudioTracks()[0]);
            if (!!YTX_CONFIG._voipCallData._voipLocalView) {
              YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipLocalView, stream)
            };
            return
          }
          if (!!YTX_CONFIG._voipCallData._voipLocalView) {
            YTX_CONFIG.processAVStream(YTX_CONFIG._voipCallData._voipLocalView, stream)
          };
          try {
            stream.getTracks().forEach(function (track) {
              YTX_CONFIG._voipCallData._peerConnection.addTrack(track, stream)
            });
            console.log("+++ addTrack succ!");
            setTimeout(function () {
              YTX_CONFIG.processCreateOffer(function (e) {
                YTX_CONFIG._Media.SDP = e;
                console.log('processCresateoffer');
                YTX_CONFIG._Media.sendOfferFn(YTX_CONFIG._Media.SDP, true, callback, onerror);
                if (YTX_CONFIG._voipCallData._peerConnection.iceGatheringState == "complete") {
                  console.log("+++ sendOffer " + YTX_CONFIG._Media.count);
                  var strSDP = YTX_CONFIG._voipCallData._peerConnection.localDescription.sdp;
                  var preSDP = YTX_CONFIG._processSDP(strSDP);
                  YTX_CONFIG._Media.sendVoipBuilder.setStrSDP(YTX_CONFIG._processSDP(preSDP));
                  var state = 2;
                  var msg = "calling";
                  if (YTX_CONFIG._Media.sendVoipBuilder.getCallId() == YTX_CONFIG._voipCallData._callEventCallId) {
                    var sendStr = YTX_CONFIG._protobuf._buildCallEvent(YTX_CONFIG._Media.sendVoipBuilder, callback, onerror);
                    if (!!sendStr) {
                      YTX_CONFIG._sendMsg(sendStr)
                    }
                  } else {
                    state = 4;
                    msg = "calling failed , maybe opposite side is busying"
                  }
                  var resp = {};
                  resp.callId = YTX_CONFIG._Media.sendVoipBuilder.getCallId();
                  resp.caller = YTX_CONFIG._Media.sendVoipBuilder.getCaller();
                  resp.called = YTX_CONFIG._Media.sendVoipBuilder.getCalled();
                  resp.userdata = YTX_CONFIG._Media.sendVoipBuilder.getUserData();
                  resp.msg = msg;
                  resp.state = state;
                  YTX_CONFIG._voipCallData._voipCallType = YTX_CONFIG._Media.sendVoipBuilder.getIsVoipCall();
                  resp.callType = YTX_CONFIG._Media.sendVoipBuilder.getIsVoipCall();
                  resp.code = 200;
                  YTX_CONFIG._voipListener(resp)
                }
                callback()
              }, function (err) {
                console.log(err)
              })
            }, 1000)
          } catch (e) {
            YTX_CONFIG._voipCallData._peerConnection.addStream(stream);
            console.log("+++ addStream succ!send offer start ++++");
            YTX_CONFIG.processCreateOffer(function (e) {
              YTX_CONFIG._Media.sendOfferFn(e, true, callback, onerror)
            }, function (err) {
              console.log(err)
            })
          }
        }, function (err) {
          console.log(err);
          error(err)
        }, YTX_CONFIG._voipCallData._needAudio)
      } else {
        var err = {};
        err.code = YTX_CONFIG._errcode._MEDIASTATE_ERROR;
        err.msg = "media connection state error ";
        error(err)
      }
    },
    deployVideoVoice: function (enable, type) {
      enable = (enable ? true : false);
      console.log(YTX_CONFIG._voipCallData._localMediaStream);
      var s = YTX_CONFIG._voipCallData._localMediaStream.getVideoTracks();
      console.log(s);
      if (type === "video") {
        if ("getVideoTracks" in YTX_CONFIG._voipCallData._localMediaStream) {
          var tracks = YTX_CONFIG._voipCallData._localMediaStream.getVideoTracks();
          for (var i = 0; i < tracks.length; i++) {
            tracks[i].enabled = enable
          }
        } else {
          YTX_CONFIG._voipCallData._localMediaStream.enabled = enable
        }
      } else {
        if ("getVideoTracks" in YTX_CONFIG._voipCallData._localMediaStream) {
          var tracks = YTX_CONFIG._voipCallData._localMediaStream.getAudioTracks();
          for (var i = 0; i < tracks.length; i++) {
            tracks[i].enabled = enable
          }
        } else {
          YTX_CONFIG._voipCallData._localMediaStream.enabled = enable
        }
      }
    },
    VideoRecord: function (local, isVideo) {
      var mediaRecorder = YTX_CONFIG.util.getMediaRecorder();
      if (!mediaRecorder) {
        return {
          err: YTX_CONFIG._errcode._NOT_SUPPORT_RECORDER,
          msg: "do not support record"
        }
      }
      var _stream = (local == "local" ? YTX_CONFIG._voipCallData._localMediaStream : YTX_CONFIG._voipCallData._remoteMediaStream);
      var type = YTX_CONFIG.util.getRecordingType(isVideo);
      if (!type) {
        return {
          err: YTX_CONFIG._errcode._NOT_SUPPORT_RECORDER,
          msg: "do not support record"
        }
      }
      var options = {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: type
      };
      var result, _callback, mr = null,
        _chunk = [];
      return {
        start: function () {
          var mediaRecorder = YTX_CONFIG.util.getMediaRecorder();
          try {
            mr = new mediaRecorder(_stream, options)
          } catch (err) {
            console.log(err)
          }
          mr.ignoreMutedMedia = true;
          mr.ondataavailable = function (evt) {
            _chunk.push(evt.data)
          };
          mr.onerror = function (e) {
            console.log(e)
          };
          mr.onstop = function (e) {
            console.log(e);
            result = new Blob(_chunk, {
              type: e.currentTarget.mimeType
            });
            if (_callback) {
              _callback({
                target: result,
                url: URL.createObjectURL(result)
              })
            }
          };
          mr.start()
        },
        stop: function (callback) {
          if (mr) {
            mr.stop();
            _callback = callback
          } else {}
        },
        pause: function () {
          mr.pause()
        },
        resume: function () {
          mr.resume()
        }
      }
    },
    onCharRoomEventLinstener: function (callback) {
      YTX_CONFIG._charRoomLinstener = callback
    },
    onProcessFriendReqListener: function (callback) {
      YTX_CONFIG._friendNoticeMsgListener = callback
    },
    onConferenceNotifyLinstener: function (callback) {
      YTX_CONFIG._conferenceNotifyLinstener = callback
    },
    ConferenceMsg: function (conferenceMsgBuilder, callback, onerror) {
      var sendStr = YTX_CONFIG._protobuf._buildConferenceMsg(conferenceMsgBuilder, callback, onerror);
      if (!!sendStr) {
        YTX_CONFIG._sendMsg(sendStr)
      }
    },
    ConferenceMsgBuilder: function (path, content) {
      this._path = path;
      this._content = content;
      this.setPath = function (path) {
        this._path = path
      };
      this.setContent = function (content) {
        this._content = JSON.stringify(content)
      };
      this.getPath = function () {
        return this._path
      };
      this.getContent = function () {
        return this._content
      }
    }
  };
  var PHOTO_CONFIG = {
    mediaStream: null,
    video: null,
    state: 1
  };
  var AUDIO_CONFIG = {
    audio: null,
    recorder: null,
    state: 1
  };
  var VIDEO_CONFIG = {};
  var HZRecorder = function (stream, config) {
    config = config || {};
    config.sampleBits = config.sampleBits || 8;
    config.sampleRate = config.sampleRate || (44100 / 6);
    var bufferLen = config.bufferLen || 4096;
    var numChannels = config.numChannels || 2;
    var context = new AudioContext();
    var audioInput = context.createMediaStreamSource(stream);
    var recorder = (context.createScriptProcessor || context.createJavaScriptNode).call(context, bufferLen, numChannels, numChannels);
    var audioData = {
      size: 0,
      buffer: [],
      inputSampleRate: context.sampleRate,
      inputSampleBits: 16,
      outputSampleRate: config.sampleRate,
      oututSampleBits: config.sampleBits,
      input: function (data) {
        this.buffer.push(new Float32Array(data));
        this.size += data.length
      },
      compress: function () {
        var data = new Float32Array(this.size);
        var offset = 0;
        for (var i = 0; i < this.buffer.length; i++) {
          data.set(this.buffer[i], offset);
          offset += this.buffer[i].length
        }
        var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
        var length = data.length / compression;
        var result = new Float32Array(parseInt(length));
        var index = 0,
          j = 0;
        while (index < length) {
          result[index] = data[j];
          j += compression;
          index++
        }
        return result
      },
      encodeWAV: function () {
        var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
        var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
        var bytes = this.compress();
        var dataLength = bytes.length * (sampleBits / 8);
        var buffer = new ArrayBuffer(44 + dataLength);
        var data = new DataView(buffer);
        var channelCount = 1;
        var offset = 0;
        var writeString = function (str) {
          for (var i = 0; i < str.length; i++) {
            data.setUint8(offset + i, str.charCodeAt(i))
          }
        };
        writeString('RIFF');
        offset += 4;
        data.setUint32(offset, 36 + dataLength, true);
        offset += 4;
        writeString('WAVE');
        offset += 4;
        writeString('fmt ');
        offset += 4;
        data.setUint32(offset, 16, true);
        offset += 4;
        data.setUint16(offset, 1, true);
        offset += 2;
        data.setUint16(offset, channelCount, true);
        offset += 2;
        data.setUint32(offset, sampleRate, true);
        offset += 4;
        data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
        offset += 4;
        data.setUint16(offset, channelCount * (sampleBits / 8), true);
        offset += 2;
        data.setUint16(offset, sampleBits, true);
        offset += 2;
        writeString('data');
        offset += 4;
        data.setUint32(offset, dataLength, true);
        offset += 4;
        if (sampleBits === 8) {
          for (var i = 0; i < bytes.length; i++, offset++) {
            var s = Math.max(-1, Math.min(1, bytes[i]));
            var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
            val = parseInt(255 / (65535 / (val + 32768)));
            data.setInt8(offset, val, true)
          }
        } else {
          for (var i = 0; i < bytes.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, bytes[i]));
            data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
          }
        }
        return new Blob([data], {
          type: 'audio/wav'
        })
      }
    };
    this.start = function (obj) {
      audioInput.connect(recorder);
      recorder.connect(context.destination);
      if (!!obj && obj.srcObject) {
        obj.srcObject = stream
      } else {
        var windowUrl = YTX_CONFIG.util.getWindowURL();
        if (!!obj && !!windowUrl) {
          var url = windowUrl.createObjectURL(stream);
          obj.src = url
        }
      }
    }, this.stop = function () {
      recorder.disconnect();
      YTX_CONFIG.util.stopMediaStream(stream)
    }, this.getBlob = function () {
      this.stop();
      return audioData.encodeWAV()
    }, this.play = function (audio) {
      var windowUrl = YTX_CONFIG.util.getWindowURL();
      audio.src = windowUrl.createObjectURL(this.getBlob())
    }, recorder.onaudioprocess = function (e) {
      audioData.input(e.inputBuffer.getChannelData(0))
    }
  };
  HZRecorder.throwError = function (message) {
    throw new function () {
      this.toString = function () {
        return message;
      }
    }
  };
  HZRecorder.get = function (callback, config) {
    if (callback) {
      var userMedia = YTX_CONFIG.util.getUserMedia();
      if (userMedia) {
        if (HZRecorder.recorderIndex == 0) {
          HZRecorder.recorderIndex = 1;
          YTX_CONFIG._getUserMedia(false, function (stream) {
            var rec = new HZRecorder(stream, config);
            callback(rec);
            HZRecorder.recorderIndex = 0
          }, function (error) {
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                HZRecorder.throwError('用户拒绝提供信息。');
                break;
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                HZRecorder.throwError('浏览器不支持硬件设备。');
                break;
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
                HZRecorder.throwError('无法发现指定的硬件设备。');
                break;
              default:
                HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
                break
            }
            HZRecorder.recorderIndex = 0
          })
        }
      } else {
        HZRecorder.throwError('当前浏览器不支持录音功能。');
        return
      }
    }
  };
  window.HZRecorder = HZRecorder;
  String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length) return false;
    if (this.substr(0, str.length) == str) return true;
    else return false;
    return true
  };
  String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length);
    return false;
    if (this.substring(this.length - str.length) == str) return true;
    else return false;
    return true
  }
})();

export default window.RL_YTX
