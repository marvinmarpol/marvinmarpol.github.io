"use strict";(self.webpackChunk_digication_ws_hw_fs_fe_typescript=self.webpackChunk_digication_ws_hw_fs_fe_typescript||[]).push([[871],{96540:(r,t,n)=>{r.exports=n(15287)},74848:(r,t,n)=>{r.exports=n(21020)},82960:(r,t,n)=>{function e(r){return"Minified Redux error #"+r+"; visit https://redux.js.org/Errors?code="+r+" for the full message or use the non-minified dev environment for full errors. "}n.d(t,{y$:()=>u});var o="function"==typeof Symbol&&Symbol.observable||"@@observable",i=function(){return Math.random().toString(36).substring(7).split("").join(".")},f={INIT:"@@redux/INIT"+i(),REPLACE:"@@redux/REPLACE"+i(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+i()}};function u(r,t,n){var i;if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error(e(0));if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error(e(1));return n(u)(r,t)}if("function"!=typeof r)throw new Error(e(2));var c=r,s=t,p=[],w=p,h=!1;function l(){w===p&&(w=p.slice())}function y(){if(h)throw new Error(e(3));return s}function a(r){if("function"!=typeof r)throw new Error(e(4));if(h)throw new Error(e(5));var t=!0;return l(),w.push(r),function(){if(t){if(h)throw new Error(e(6));t=!1,l();var n=w.indexOf(r);w.splice(n,1),p=null}}}function E(r){if(!function(r){if("object"!=typeof r||null===r)return!1;for(var t=r;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(r)===t}(r))throw new Error(e(7));if(void 0===r.type)throw new Error(e(8));if(h)throw new Error(e(9));try{h=!0,s=c(s,r)}finally{h=!1}for(var t=p=w,n=0;n<t.length;n++)(0,t[n])();return r}return E({type:f.INIT}),(i={dispatch:E,subscribe:a,getState:y,replaceReducer:function(r){if("function"!=typeof r)throw new Error(e(10));c=r,E({type:f.REPLACE})}})[o]=function(){var r,t=a;return(r={subscribe:function(r){if("object"!=typeof r||null===r)throw new Error(e(11));function n(){r.next&&r.next(y())}return n(),{unsubscribe:t(n)}}})[o]=function(){return this},r},i}}}]);