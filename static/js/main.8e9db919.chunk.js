(window["webpackJsonplunchtime-react"]=window["webpackJsonplunchtime-react"]||[]).push([[0],{55:function(e,t,n){e.exports=n(74)},60:function(e,t,n){},61:function(e,t,n){},74:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(48),c=n.n(o),i=(n(60),n(6)),u=n(53),l=n(12),s=n(52),f=(n(61),n(13)),p=n.n(f),d=n(17),b=n(18),h=n(19),m=n(20),v=n(8),g=n.n(v);n(44);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(n,!0).forEach(function(t){Object(d.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var E=function(){function e(){Object(h.a)(this,e),this._db=void 0,this._db=g.a.firestore()}return Object(m.a)(e,[{key:"createGroup",value:function(){var e=Object(b.a)(p.a.mark(function e(t){var n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._db.collection("groups").add(t);case 2:return n=e.sent,e.abrupt("return",j({},t,{id:n.id}));case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"addGroupMember",value:function(e,t){return this._db.collection("groups").doc(e).update({users:g.a.firestore.FieldValue.arrayUnion(t)})}},{key:"getGroupMembership",value:function(e){return this._db.collection("groups").where("users","array-contains",e).get().then(function(e){return e.docs.map(function(e){return j({},e.data(),{id:e.id})})})}}]),e}(),y=n(3);function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var P=function(){function e(){Object(h.a)(this,e),this._db=void 0,this._db=g.a.firestore()}return Object(m.a)(e,[{key:"subscribe",value:function(e,t){var n=this;return y.a.create(function(t){return n._db.collection("destinations").where("groupId","==",e).onSnapshot(function(e){var n=[];e.forEach(function(e){return n.push(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(n,!0).forEach(function(t){Object(d.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({id:e.id},e.data()))}),t.next(n)})}).subscribe(t)}},{key:"createDestination",value:function(){var e=Object(b.a)(p.a.mark(function e(t){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._db.collection("destinations").add(t);case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"deleteDestination",value:function(e){return this._db.collection("destinations").doc(e).delete()}}]),e}(),k=(n(38),n(76)),S=n(77),C=n(78);function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(n,!0).forEach(function(t){Object(d.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var x=function(){function e(){var t=this;Object(h.a)(this,e),this._groupRepo=new E,this.firebaseAuth=void 0,this.currentUser$=void 0,this.firebaseAuth=g.a.auth(),this.currentUser$=new y.a(function(e){t.firebaseAuth.onAuthStateChanged(function(t){e.next(t)})}).pipe(Object(k.a)(function(e){return null==e?[null]:new y.a(function(n){t._groupRepo.getGroupMembership(e.uid).then(function(t){return n.next(D({},e,{groups:t}))},function(t){console.error("error fetching groups",t),n.next(D({},e,{groups:[]}))})})}),Object(S.a)(null),Object(C.a)())}return Object(m.a)(e,[{key:"signOut",value:function(){var e=Object(b.a)(p.a.mark(function e(){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.firebaseAuth.signOut();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),e}();function I(e,t){return e.localeCompare(t)}function _(e){var t,n=e.groupId,r=e.destinations,o=e.onCreate,c=e.onDelete,i=r.slice().sort((t=function(e){return e.name},function(e,t){return function(n,r){return e(t(n),t(r))}}(I,t))).map(function(e){return a.a.createElement("li",{key:e.name},a.a.createElement("button",{onClick:function(){return c(e)}},"delete")," "+e.name)});return a.a.createElement("div",null,a.a.createElement("ul",null,i),"Add new:",a.a.createElement("br",null),a.a.createElement(N,{groupId:n,onAdd:o}))}function N(e){var t=e.groupId,n=e.onAdd,o=Object(r.useState)(""),c=Object(i.a)(o,2),u=c[0],l=c[1],s=function(){n({groupId:t,name:u}),l("")};return a.a.createElement("div",null,a.a.createElement("label",null,"Name"),a.a.createElement("input",{value:u,onChange:function(e){l(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&s()}}),a.a.createElement("button",{onClick:s},"Add"))}function R(e){var t=e.destinations,n=Object(r.useState)(),o=Object(i.a)(n,2),c=o[0],u=o[1];return t&&t.length?a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){var e=t.map(function(e){return{dest:e,sort:Math.random()}}).reduce(function(e,t){return e.sort>t.sort?e:t}).dest;u(e)}},"Pick")," ",c&&c.name||"\xa0"):a.a.createElement("div",null)}var U=n(49),G=a.a.createContext(null);function W(e){var t=e.authService;if(null!=Object(r.useContext)(G))return a.a.createElement(l.a,{to:{pathname:"/"}});var n={signInFlow:"popup",signInOptions:[g.a.auth.GoogleAuthProvider.PROVIDER_ID,g.a.auth.PhoneAuthProvider.PROVIDER_ID],callbacks:{signInSuccessWithAuthResult:function(){return!1}}};return a.a.createElement(U.FirebaseAuth,{uiConfig:n,firebaseAuth:t.firebaseAuth})}var z=a.a.createContext(null);function L(e){var t=e.user,n=e.onSelect,o=Object(r.useState)(t.groups[0]),c=Object(i.a)(o,2),u=c[0],l=c[1];if(!t.groups.length)return a.a.createElement("p",null,"User '",t.displayName,"' is not a member of any groups.");var s=t.groups.map(function(e){return a.a.createElement("option",{value:e.id},e.name)});return a.a.createElement("div",null,a.a.createElement("p",null,"no group selected"),a.a.createElement("select",{value:u&&u.id||"",onChange:function(e){var n=t.groups.find(function(t){return t.id===e.target.value});l(n||null)}},s),a.a.createElement("button",{onClick:function(){u&&n(u)}},"Switch"))}function F(e){var t=e.onCreate,n=Object(r.useState)(""),o=Object(i.a)(n,2),c=o[0],u=o[1],l=Object(r.useState)(!1),s=Object(i.a)(l,2),f=s[0],p=s[1],d=Object(r.useContext)(G),b=Object(r.useState)(null),h=Object(i.a)(b,2),m=h[0],v=h[1],g=!c.length||f;return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("input",{value:c,onChange:function(e){return u(e.target.value)}}),a.a.createElement("button",{disabled:g,onClick:function(){c&&d&&(p(!0),(new E).createGroup({name:c,users:[d.uid]}).then(t,v).finally(function(){return p(!1)}))}},"Create")),m)}g.a.initializeApp({apiKey:"AIzaSyAZv3xYRqBQTuPN02gy6zz25C0LUgpZ6zU",authDomain:"lunchtime-react-95b31.firebaseapp.com",projectId:"lunchtime-react-95b31"}),console.log("DestinationRepository",P);var M=new P,$=new x;function B(e){var t=e.component,n=Object(u.a)(e,["component"]),o=t,c=Object(r.useContext)(G);return a.a.createElement(l.b,Object.assign({},n,{render:function(e){return c?a.a.createElement(o,e):a.a.createElement(l.a,{to:{pathname:"/sign-in",state:{from:e.location}}})}}))}function T(){var e=Object(r.useContext)(G),t=Object(r.useState)(null),n=Object(i.a)(t,2),o=n[0],c=n[1],u=Object(r.useState)(null),l=Object(i.a)(u,2),s=l[0],f=l[1];if(Object(r.useEffect)(function(){if(o){var e=M.subscribe(o.id,{next:f});return function(){return e.unsubscribe()}}},[e,o]),null==o)return a.a.createElement(a.a.Fragment,null,a.a.createElement(L,{user:e,onSelect:c}),a.a.createElement(F,{onCreate:c}));if(null==s)return a.a.createElement("p",null,"Loading data...");return a.a.createElement(z.Provider,{value:o},a.a.createElement("h1",null,"Pick a place"),a.a.createElement(R,{destinations:s}),a.a.createElement("h1",null,"Edit places"),a.a.createElement(_,{groupId:o.id,destinations:s,onCreate:function(e){M.createDestination(e)},onDelete:function(e){M.deleteDestination(e.id)}}))}var V=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function J(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(a.a.createElement(function(){var e=Object(r.useState)(null),t=Object(i.a)(e,2),n=t[0],o=t[1];Object(r.useEffect)(function(){var e=$.currentUser$.subscribe(o);return function(){return e.unsubscribe()}},[]);var c=n?a.a.createElement("p",null,"Signed in as: ",n.displayName,a.a.createElement("button",{onClick:function(){$.signOut()}},"Sign out")):null;return a.a.createElement(s.a,null,a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("h1",{className:"App-title"},"Lunchtime")),a.a.createElement("div",{className:"App-body-container"},a.a.createElement("div",{className:"App-body"},c,a.a.createElement(G.Provider,{value:n},a.a.createElement(l.d,null,a.a.createElement(B,{exact:!0,path:"/",component:T}),a.a.createElement(l.b,{path:"/sign-in",render:function(e){return a.a.createElement(W,{authService:$})}})))))))},null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");V?(!function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):J(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):J(e)})}}()}},[[55,1,2]]]);
//# sourceMappingURL=main.8e9db919.chunk.js.map