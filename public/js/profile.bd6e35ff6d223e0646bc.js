var profile=function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="/js/",e(0)}({0:function(t,e,n){var i=n(58),s=n(59),o=n(60);e.init=function(){new i,new s,new o}},1:function(t,e,n){"use strict";function i(t,e){for(var n=t.target;n;){if(n.matches(e))return n;if(n==t.currentTarget)break;n=n.parentElement}return null}function s(t,e,n,s,o){t.addEventListener(n,function(t){var n=i(t,e);t.delegateTarget=n,n&&s.call(o||this,t)})}n(3),s.delegateMixin=function(t){t.delegate=function(t,e,n){s(this.elem,t,e,n,this)}},t.exports=s},2:function(){var t={matches:Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector,remove:function(){var t=this.parentNode;return t?t.removeChild(this):void 0}};for(var e in t)Element.prototype[e]||(Element.prototype[e]=t[e]);try{new CustomEvent("IE has CustomEvent, but doesn't support constructor")}catch(n){window.CustomEvent=function(t,e){var n;return e=e||{bubbles:!1,cancelable:!1,detail:void 0},n=document.createEvent("CustomEvent"),n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},CustomEvent.prototype=Object.create(window.Event.prototype)}},3:function(t,e,n){n(2)},4:function(t,e,n){var i=n(9);e.info=i.spawn({addnCls:"humane-libnotify-info",timeout:1e3}),e.error=i.spawn({addnCls:"humane-libnotify-error",timeout:3e3})},5:function(t,e,n){function i(t){function e(t,e){var n=new CustomEvent(t);return n.originalEvent=e,n}function n(t,n){var i=e("fail",n);i.reason=t,o.dispatchEvent(i)}function i(t,n){var i=e("success",n);i.result=t,o.dispatchEvent(i)}var o=new XMLHttpRequest,r=t.method||"GET",a=t.body,l=t.url;window.csrf&&(l=s(l,"_csrf",window.csrf)),"[object Object]"=={}.toString.call(a)&&(this.setRequestHeader("Content-Type","application/json;charset=UTF-8"),a=JSON.stringify(a)),o.open(r,l,t.sync?!1:!0),o.method=r,t.noGlobalEvents||(o.addEventListener("loadstart",function(t){var n=e("xhrstart",t);document.dispatchEvent(n)}),o.addEventListener("loadend",function(t){var n=e("xhrend",t);document.dispatchEvent(n)}),o.addEventListener("success",function(t){var n=e("xhrsuccess",t);n.result=t.result,document.dispatchEvent(n)}),o.addEventListener("fail",function(t){var n=e("xhrfail",t);n.reason=t.reason,document.dispatchEvent(n)})),t.json&&o.setRequestHeader("Accept","application/json"),o.setRequestHeader("X-Requested-With","XMLHttpRequest");var c=t.successStatuses||[200];return o.addEventListener("error",function(t){n("Ошибка связи с сервером.",t)}),o.addEventListener("timeout",function(t){n("Превышено максимально допустимое время ожидания ответа от сервера.",t)}),o.addEventListener("abort",function(t){n("Запрос был прерван.",t)}),o.addEventListener("load",function(e){if(!this.status)return void n("Не получен ответ от сервера.",e);if(-1==c.indexOf(this.status))return void n("Ошибка на стороне сервера (код "+this.status+"), попытайтесь позднее",e);var s=this.responseText,o=this.getResponseHeader("Content-Type");if(o.match(/^application\/json/)||t.json)try{s=JSON.parse(s)}catch(e){return void n("Некорректный формат ответа от сервера",e)}i(s,e)}),setTimeout(function(){o.send(a)},0),o}function s(t,e,n){var i=encodeURIComponent(e)+"="+encodeURIComponent(n);return~t.indexOf("?")?t+"&"+i:t+"?"+i}n(3),n(8),t.exports=i},8:function(t,e,n){var i=n(4);document.addEventListener("xhrfail",function(t){i.error(t.reason)})},9:function(t){!function(e,n,i){t.exports=i(e,n)}("humane",this,function(){var t=window,e=document,n={on:function(e,n,i){"addEventListener"in t?e.addEventListener(n,i,!1):e.attachEvent("on"+n,i)},off:function(e,n,i){"removeEventListener"in t?e.removeEventListener(n,i,!1):e.detachEvent("on"+n,i)},bind:function(t,e){return function(){t.apply(e,arguments)}},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},config:function(t,e){return null!=t?t:e},transSupport:!1,useFilter:/msie [678]/i.test(navigator.userAgent),_checkTransition:function(){var t=e.createElement("div"),n={webkit:"webkit",Moz:"",O:"o",ms:"MS"};for(var i in n)i+"Transition"in t.style&&(this.vendorPrefix=n[i],this.transSupport=!0)}};n._checkTransition();var i=function(e){e||(e={}),this.queue=[],this.baseCls=e.baseCls||"humane",this.addnCls=e.addnCls||"",this.timeout="timeout"in e?e.timeout:2500,this.waitForMove=e.waitForMove||!1,this.clickToClose=e.clickToClose||!1,this.timeoutAfterMove=e.timeoutAfterMove||!1,this.container=e.container;try{this._setupEl()}catch(i){n.on(t,"load",n.bind(this._setupEl,this))}};return i.prototype={constructor:i,_setupEl:function(){var t=e.createElement("div");if(t.style.display="none",!this.container){if(!e.body)throw"document.body is null";this.container=e.body}this.container.appendChild(t),this.el=t,this.removeEvent=n.bind(function(){this.timeoutAfterMove?setTimeout(n.bind(this.remove,this),this.timeout):this.remove()},this),this.transEvent=n.bind(this._afterAnimation,this),this._run()},_afterTimeout:function(){n.config(this.currentMsg.waitForMove,this.waitForMove)?this.removeEventsSet||(n.on(e.body,"mousemove",this.removeEvent),n.on(e.body,"click",this.removeEvent),n.on(e.body,"keypress",this.removeEvent),n.on(e.body,"touchstart",this.removeEvent),this.removeEventsSet=!0):this.remove()},_run:function(){if(!this._animating&&this.queue.length&&this.el){this._animating=!0,this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=null);var t=this.queue.shift(),e=n.config(t.clickToClose,this.clickToClose);e&&(n.on(this.el,"click",this.removeEvent),n.on(this.el,"touchstart",this.removeEvent));var i=n.config(t.timeout,this.timeout);i>0&&(this.currentTimer=setTimeout(n.bind(this._afterTimeout,this),i)),n.isArray(t.html)&&(t.html="<ul><li>"+t.html.join("<li>")+"</ul>"),this.el.innerHTML=t.html,this.currentMsg=t,this.el.className=this.baseCls,n.transSupport?(this.el.style.display="block",setTimeout(n.bind(this._showMsg,this),50)):this._showMsg()}},_setOpacity:function(t){if(n.useFilter)try{this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity=100*t}catch(e){}else this.el.style.opacity=String(t)},_showMsg:function(){var t=n.config(this.currentMsg.addnCls,this.addnCls);if(n.transSupport)this.el.className=this.baseCls+" "+t+" "+this.baseCls+"-animate";else{var e=0;this.el.className=this.baseCls+" "+t+" "+this.baseCls+"-js-animate",this._setOpacity(0),this.el.style.display="block";var i=this,s=setInterval(function(){1>e?(e+=.1,e>1&&(e=1),i._setOpacity(e)):clearInterval(s)},30)}},_hideMsg:function(){var t=n.config(this.currentMsg.addnCls,this.addnCls);if(n.transSupport)this.el.className=this.baseCls+" "+t,n.on(this.el,n.vendorPrefix?n.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent);else var e=1,i=this,s=setInterval(function(){e>0?(e-=.1,0>e&&(e=0),i._setOpacity(e)):(i.el.className=i.baseCls+" "+t,clearInterval(s),i._afterAnimation())},30)},_afterAnimation:function(){n.transSupport&&n.off(this.el,n.vendorPrefix?n.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent),this.currentMsg.cb&&this.currentMsg.cb(),this.el.style.display="none",this._animating=!1,this._run()},remove:function(t){var i="function"==typeof t?t:null;n.off(e.body,"mousemove",this.removeEvent),n.off(e.body,"click",this.removeEvent),n.off(e.body,"keypress",this.removeEvent),n.off(e.body,"touchstart",this.removeEvent),n.off(this.el,"click",this.removeEvent),n.off(this.el,"touchstart",this.removeEvent),this.removeEventsSet=!1,i&&this.currentMsg&&(this.currentMsg.cb=i),this._animating?this._hideMsg():i&&i()},log:function(t,e,n,i){var s={};if(i)for(var o in i)s[o]=i[o];if("function"==typeof e)n=e;else if(e)for(var o in e)s[o]=e[o];return s.html=t,n&&(s.cb=n),this.queue.push(s),this._run(),this},spawn:function(t){var e=this;return function(n,i,s){return e.log.call(e,n,i,s,t),e}},create:function(t){return new i(t)}},new i})},58:function(t,e,n){function i(){this.elem=document.body,this.delegate('[data-action="provider-add"]',"click",function(t){t.preventDefault(),this.addProvider(t.delegateTarget.dataset.provider)}),this.delegate('[data-action="provider-remove"]',"click",function(t){t.preventDefault(),this.removeProvider(t.delegateTarget.dataset.provider)})}var s=n(1),o=n(4),r=n(5);i.prototype.addProvider=function(t){this.openAuthPopup("/auth/connect/"+t)},i.prototype.removeProvider=function(t){var e=r({method:"POST",url:"/auth/disconnect/"+t});e.addEventListener("success",function(){window.location.reload()}),e.send()},i.prototype.openAuthPopup=function(t){this.authPopup&&!this.authPopup.closed&&this.authPopup.close();var e=800,n=600,i=(window.outerHeight-n)/2,s=(window.outerWidth-e)/2;window.authProvidersManager=this,this.authPopup=window.open(t,"authProvidersManager","width="+e+",height="+n+",scrollbars=0,top="+i+",left="+s)},i.prototype.onAuthSuccess=function(){window.location.reload()},i.prototype.onAuthFailure=function(t){o.error(t||"Отказ в авторизации.","error")},s.delegateMixin(i.prototype),t.exports=i},59:function(t,e,n){function i(){this.elem=document.body.querySelector('[data-action="photo-change"]'),this.elem.addEventListener("click",function(t){t.preventDefault(),this.changePhoto()}.bind(this))}var s=n(1),o=n(5),r=n(4);i.prototype.changePhoto=function(){var t=document.createElement("input");t.type="file";var e=this;t.onchange=function(){e.upload(this.files[0])},t.click()},i.prototype.updateUserPhoto=function(t){this.elem.style.backgroundImage='url("'+t.replace(/(\.\w+)$/,window.devicePixelRatio>1?"m$1":"t$1")+'")'},i.prototype.upload=function(t){var e=new FormData;e.append("photo",t);var n=o({method:"PATCH",url:"/users/me",json:!0,body:e});n.successStatuses=[200,400];var i=this;n.addEventListener("success",function(t){return 400==this.status?void r.error("Неверный тип файла или изображение повреждено."):void i.updateUserPhoto(t.result.photo)})},s.delegateMixin(i.prototype),t.exports=i},60:function(t,e,n){{var i=n(1);n(5),n(4)}i.delegateMixin(PhotoChanger.prototype),t.exports=PhotoChanger}});