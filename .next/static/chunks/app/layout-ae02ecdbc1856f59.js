(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{7334:function(e,t,r){Promise.resolve().then(r.t.bind(r,3649,23)),Promise.resolve().then(r.t.bind(r,3385,23)),Promise.resolve().then(r.bind(r,3289))},3289:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var a=r(7437),o=r(2749),i=r(3046),s=r(9686);let n=(0,s.oM)({name:"auth",initialState:{user:null,isLoading:!0,isAuthenticated:!1},reducers:{setUser:(e,t)=>{e.user=t.payload,e.isAuthenticated=!!t.payload,e.isLoading=!1},setLoading:(e,t)=>{e.isLoading=t.payload},logout:e=>{e.user=null,e.isAuthenticated=!1,e.isLoading=!1}}}),{setUser:l,setLoading:d,logout:c}=n.actions;var u=n.reducer,p=r(8784),f=r(5175);let m=(0,s.xC)({reducer:{auth:u,news:p.ZP,ui:f.ZP}});var g=r(5925),y=r(2265);function h(e){let{children:t}=e,r=(0,i.I0)(),o=(0,i.v9)(e=>e.ui.darkMode);return(0,y.useEffect)(()=>{r((0,f.D7)())},[r]),(0,y.useEffect)(()=>{o?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[o]),(0,a.jsx)(a.Fragment,{children:t})}function b(e){let{children:t}=e;return(0,a.jsx)(o.SessionProvider,{children:(0,a.jsx)(i.zt,{store:m,children:(0,a.jsxs)(h,{children:[t,(0,a.jsx)(g.x7,{position:"top-right",toastOptions:{duration:4e3,style:{background:"hsl(var(--card))",color:"hsl(var(--card-foreground))",border:"1px solid hsl(var(--border))"}}})]})})})}},8784:function(e,t,r){"use strict";r.d(t,{K5:function(){return l},aL:function(){return i},rr:function(){return n},sW:function(){return c}});var a=r(9686);let o={articles:[],filteredArticles:[],filters:{author:"",dateRange:{start:"",end:""},type:"all",searchQuery:""},isLoading:!1,error:null,totalCount:0,payoutData:{}},i=(0,a.hg)("news/fetchNews",async(e,t)=>{let{rejectWithValue:r}=t;try{let e=await fetch("/api/news");if(!e.ok)throw Error("Failed to fetch news");return(await e.json()).articles||[]}catch(e){return r(e instanceof Error?e.message:"Unknown error")}}),s=(0,a.oM)({name:"news",initialState:o,reducers:{setFilters:(e,t)=>{e.filters={...e.filters,...t.payload};let r=e.articles;if(e.filters.author&&(r=r.filter(t=>t.author.toLowerCase().includes(e.filters.author.toLowerCase()))),"all"!==e.filters.type&&(r=r.filter(t=>t.type===e.filters.type)),e.filters.searchQuery){let t=e.filters.searchQuery.toLowerCase();r=r.filter(e=>{var r;return e.title.toLowerCase().includes(t)||(null===(r=e.description)||void 0===r?void 0:r.toLowerCase().includes(t))||e.author.toLowerCase().includes(t)})}e.filters.dateRange.start&&e.filters.dateRange.end&&(r=r.filter(t=>{let r=new Date(t.publishedAt),a=new Date(e.filters.dateRange.start),o=new Date(e.filters.dateRange.end);return r>=a&&r<=o})),e.filteredArticles=r},clearFilters:e=>{e.filters=o.filters,e.filteredArticles=e.articles},updatePayoutData:(e,t)=>{e.payoutData=t.payload,localStorage.setItem("payoutData",JSON.stringify(t.payload))},loadPayoutData:e=>{{let t=localStorage.getItem("payoutData");t&&(e.payoutData=JSON.parse(t))}}},extraReducers:e=>{e.addCase(i.pending,e=>{e.isLoading=!0,e.error=null}).addCase(i.fulfilled,(e,t)=>{e.isLoading=!1,e.articles=t.payload,e.filteredArticles=t.payload,e.totalCount=t.payload.length,e.error=null}).addCase(i.rejected,(e,t)=>{e.isLoading=!1,e.error=t.payload})}}),{setFilters:n,clearFilters:l,updatePayoutData:d,loadPayoutData:c}=s.actions;t.ZP=s.reducer},5175:function(e,t,r){"use strict";r.d(t,{D7:function(){return d},GB:function(){return s},In:function(){return o}});let a=(0,r(9686).oM)({name:"ui",initialState:{darkMode:!1,sidebarOpen:!0,loading:{}},reducers:{toggleDarkMode:e=>{e.darkMode=!e.darkMode,localStorage.setItem("darkMode",JSON.stringify(e.darkMode))},setDarkMode:(e,t)=>{e.darkMode=t.payload,localStorage.setItem("darkMode",JSON.stringify(t.payload))},toggleSidebar:e=>{e.sidebarOpen=!e.sidebarOpen},setSidebarOpen:(e,t)=>{e.sidebarOpen=t.payload},setLoading:(e,t)=>{e.loading[t.payload.key]=t.payload.loading},initializeTheme:e=>{{let t=localStorage.getItem("darkMode");t?e.darkMode=JSON.parse(t):e.darkMode=window.matchMedia("(prefers-color-scheme: dark)").matches}}}}),{toggleDarkMode:o,setDarkMode:i,toggleSidebar:s,setSidebarOpen:n,setLoading:l,initializeTheme:d}=a.actions;t.ZP=a.reducer},3385:function(){},3649:function(e){e.exports={style:{fontFamily:"'__Inter_e8ce0c', '__Inter_Fallback_e8ce0c'",fontStyle:"normal"},className:"__className_e8ce0c"}},5925:function(e,t,r){"use strict";let a,o;r.d(t,{x7:function(){return eu},Am:function(){return P}});var i,s=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?p(s,i):i+"{"+p(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=p(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=p.p?p.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},g=(e,t,r,a,o)=>{var i;let s=m(e),n=f[s]||(f[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!f[n]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);f[n]=p(o?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&f.g?f.g:null;return r&&(f.g=f[n]),i=f[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),n},y=(e,t,r)=>e.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?y(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let b,v,x,w=h.bind({k:1});function k(e,t){let r=this||{};return function(){let a=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;r.p=Object.assign({theme:v&&v()},n),r.o=/ *go\d+/.test(l),n.className=h.apply(r,a)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),x&&d[0]&&x(n),b(d,n)}return t?t(o):o}}var E=e=>"function"==typeof e,D=(e,t)=>E(e)?e(t):e,O=(a=0,()=>(++a).toString()),C=()=>{if(void 0===o&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");o=!e||e.matches}return o},L=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return L(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},M=[],N={toasts:[],pausedAt:void 0},S=e=>{N=L(N,e),M.forEach(e=>{e(N)})},_={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},j=(e={})=>{let[t,r]=(0,s.useState)(N),a=(0,s.useRef)(N);(0,s.useEffect)(()=>(a.current!==N&&r(N),M.push(r),()=>{let e=M.indexOf(r);e>-1&&M.splice(e,1)}),[]);let o=t.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||_[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:o}},$=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||O()}),A=e=>(t,r)=>{let a=$(t,e,r);return S({type:2,toast:a}),a.id},P=(e,t)=>A("blank")(e,t);P.error=A("error"),P.success=A("success"),P.loading=A("loading"),P.custom=A("custom"),P.dismiss=e=>{S({type:3,toastId:e})},P.remove=e=>S({type:4,toastId:e}),P.promise=(e,t,r)=>{let a=P.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?D(t.success,e):void 0;return o?P.success(o,{id:a,...r,...null==r?void 0:r.success}):P.dismiss(a),e}).catch(e=>{let o=t.error?D(t.error,e):void 0;o?P.error(o,{id:a,...r,...null==r?void 0:r.error}):P.dismiss(a)}),e};var I=(e,t)=>{S({type:1,toast:{id:e,height:t}})},z=()=>{S({type:5,time:Date.now()})},F=new Map,R=1e3,T=(e,t=R)=>{if(F.has(e))return;let r=setTimeout(()=>{F.delete(e),S({type:4,toastId:e})},t);F.set(e,r)},H=e=>{let{toasts:t,pausedAt:r}=j(e);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&P.dismiss(t.id);return}return setTimeout(()=>P.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,s.useCallback)(()=>{r&&S({type:6,time:Date.now()})},[r]),o=(0,s.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=r||{},s=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)T(e.id,e.removeDelay);else{let t=F.get(e.id);t&&(clearTimeout(t),F.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:I,startPause:z,endPause:a,calculateOffset:o}}},J=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Z=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Q=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Z} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,G=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,W=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${K} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Y=k("div")`
  position: absolute;
`,V=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(ee,null,t):t:"blank"===r?null:s.createElement(V,null,s.createElement(q,{...a}),"loading"!==r&&s.createElement(Y,null,"error"===r?s.createElement(Q,{...a}):s.createElement(W,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,eo=k("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ei=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},i=s.createElement(et,{toast:e}),n=s.createElement(ei,{...e.ariaProps},D(e.message,e));return s.createElement(eo,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:i,message:n}):s.createElement(s.Fragment,null,i,n))});i=s.createElement,p.p=void 0,b=i,v=void 0,x=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let i=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:i,className:t,style:r},o)},ed=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ec=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:d}=H(r);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let i=r.position||t,n=ed(i,d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return s.createElement(el,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?ec:"",style:n},"custom"===r.type?D(r.message,r):o?o(r):s.createElement(en,{toast:r,position:i}))}))}}},function(e){e.O(0,[749,743,971,938,744],function(){return e(e.s=7334)}),_N_E=e.O()}]);