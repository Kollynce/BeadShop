import{N as V,r as w,O as ee,Q as ve,R as ce,d as T,e as H,U as le,B as me,V as be,W as L,X as S,Z as K,$ as ye,F as G,a0 as pe,a1 as fe,a2 as re,a3 as xe,a4 as O,a5 as X,a6 as he,a7 as oe,a8 as J,a9 as we,aa as U,ab as C,c as _,o as I,a as t,_ as ke,K as _e,f as te,g as Y,h as v,k as Z,w as P,i as u,S as q,C as Ie,t as h,q as Ne,z as F,x as B,l as Pe,H as R,I as W,ac as ae,E as z,D as ne}from"./index-DurEI3hX.js";import{r as Se}from"./PencilIcon-D7E12stK.js";import{r as Te}from"./ChevronRightIcon-Dgoahx3p.js";import{N as Ee,Q as De,V as Ae}from"./disclosure-B-ZqVuTO.js";let $e=V({props:{onFocus:{type:Function,required:!0}},setup(s){let c=w(!0);return()=>c.value?ee(ce,{as:"button",type:"button",features:ve.Focusable,onFocus(m){m.preventDefault();let f,y=50;function i(){var o;if(y--<=0){f&&cancelAnimationFrame(f);return}if((o=s.onFocus)!=null&&o.call(s)){c.value=!1,cancelAnimationFrame(f);return}f=requestAnimationFrame(i)}f=requestAnimationFrame(i)}}):null}});var Oe=(s=>(s[s.Forwards=0]="Forwards",s[s.Backwards=1]="Backwards",s))(Oe||{}),Ce=(s=>(s[s.Less=-1]="Less",s[s.Equal=0]="Equal",s[s.Greater=1]="Greater",s))(Ce||{});let ge=Symbol("TabsContext");function Q(s){let c=re(ge,null);if(c===null){let m=new Error(`<${s} /> is missing a parent <TabGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(m,Q),m}return c}let se=Symbol("TabsSSRContext"),je=V({name:"TabGroup",emits:{change:s=>!0},props:{as:{type:[Object,String],default:"template"},selectedIndex:{type:[Number],default:null},defaultIndex:{type:[Number],default:0},vertical:{type:[Boolean],default:!1},manual:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(s,{slots:c,attrs:m,emit:f}){var y;let i=w((y=s.selectedIndex)!=null?y:s.defaultIndex),o=w([]),d=w([]),p=T(()=>s.selectedIndex!==null),E=T(()=>p.value?s.selectedIndex:i.value);function D(n){var a;let e=L(g.tabs.value,S),r=L(g.panels.value,S),l=e.filter(x=>{var k;return!((k=S(x))!=null&&k.hasAttribute("disabled"))});if(n<0||n>e.length-1){let x=J(i.value===null?0:Math.sign(n-i.value),{[-1]:()=>1,0:()=>J(Math.sign(n),{[-1]:()=>0,0:()=>0,1:()=>1}),1:()=>0}),k=J(x,{0:()=>e.indexOf(l[0]),1:()=>e.indexOf(l[l.length-1])});k!==-1&&(i.value=k),g.tabs.value=e,g.panels.value=r}else{let x=e.slice(0,n),k=[...e.slice(n),...x].find(M=>l.includes(M));if(!k)return;let b=(a=e.indexOf(k))!=null?a:g.selectedIndex.value;b===-1&&(b=g.selectedIndex.value),i.value=b,g.tabs.value=e,g.panels.value=r}}let g={selectedIndex:T(()=>{var n,a;return(a=(n=i.value)!=null?n:s.defaultIndex)!=null?a:null}),orientation:T(()=>s.vertical?"vertical":"horizontal"),activation:T(()=>s.manual?"manual":"auto"),tabs:o,panels:d,setSelectedIndex(n){E.value!==n&&f("change",n),p.value||D(n)},registerTab(n){var a;if(o.value.includes(n))return;let e=o.value[i.value];if(o.value.push(n),o.value=L(o.value,S),!p.value){let r=(a=o.value.indexOf(e))!=null?a:i.value;r!==-1&&(i.value=r)}},unregisterTab(n){let a=o.value.indexOf(n);a!==-1&&o.value.splice(a,1)},registerPanel(n){d.value.includes(n)||(d.value.push(n),d.value=L(d.value,S))},unregisterPanel(n){let a=d.value.indexOf(n);a!==-1&&d.value.splice(a,1)}};le(ge,g);let N=w({tabs:[],panels:[]}),$=w(!1);H(()=>{$.value=!0}),le(se,T(()=>$.value?null:N.value));let j=T(()=>s.selectedIndex);return H(()=>{me([j],()=>{var n;return D((n=s.selectedIndex)!=null?n:s.defaultIndex)},{immediate:!0})}),be(()=>{if(!p.value||E.value==null||g.tabs.value.length<=0)return;let n=L(g.tabs.value,S);n.some((a,e)=>S(g.tabs.value[e])!==S(a))&&g.setSelectedIndex(n.findIndex(a=>S(a)===S(g.tabs.value[E.value])))}),()=>{let n={selectedIndex:i.value};return ee(G,[o.value.length<=0&&ee($e,{onFocus:()=>{for(let a of o.value){let e=S(a);if((e==null?void 0:e.tabIndex)===0)return e.focus(),!0}return!1}}),K({theirProps:{...m,...ye(s,["selectedIndex","defaultIndex","manual","vertical","onChange"])},ourProps:{},slot:n,slots:c,attrs:m,name:"TabGroup"})])}}}),Fe=V({name:"TabList",props:{as:{type:[Object,String],default:"div"}},setup(s,{attrs:c,slots:m}){let f=Q("TabList");return()=>{let y={selectedIndex:f.selectedIndex.value},i={role:"tablist","aria-orientation":f.orientation.value};return K({ourProps:i,theirProps:s,slot:y,attrs:c,slots:m,name:"TabList"})}}}),de=V({name:"Tab",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:null}},setup(s,{attrs:c,slots:m,expose:f}){var y;let i=(y=s.id)!=null?y:`headlessui-tabs-tab-${pe()}`,o=Q("Tab"),d=w(null);f({el:d,$el:d}),H(()=>o.registerTab(d)),fe(()=>o.unregisterTab(d));let p=re(se),E=T(()=>{if(p.value){let r=p.value.tabs.indexOf(i);return r===-1?p.value.tabs.push(i)-1:r}return-1}),D=T(()=>{let r=o.tabs.value.indexOf(d);return r===-1?E.value:r}),g=T(()=>D.value===o.selectedIndex.value);function N(r){var l;let x=r();if(x===X.Success&&o.activation.value==="auto"){let k=(l=we(d))==null?void 0:l.activeElement,b=o.tabs.value.findIndex(M=>S(M)===k);b!==-1&&o.setSelectedIndex(b)}return x}function $(r){let l=o.tabs.value.map(x=>S(x)).filter(Boolean);if(r.key===O.Space||r.key===O.Enter){r.preventDefault(),r.stopPropagation(),o.setSelectedIndex(D.value);return}switch(r.key){case O.Home:case O.PageUp:return r.preventDefault(),r.stopPropagation(),N(()=>U(l,C.First));case O.End:case O.PageDown:return r.preventDefault(),r.stopPropagation(),N(()=>U(l,C.Last))}if(N(()=>J(o.orientation.value,{vertical(){return r.key===O.ArrowUp?U(l,C.Previous|C.WrapAround):r.key===O.ArrowDown?U(l,C.Next|C.WrapAround):X.Error},horizontal(){return r.key===O.ArrowLeft?U(l,C.Previous|C.WrapAround):r.key===O.ArrowRight?U(l,C.Next|C.WrapAround):X.Error}}))===X.Success)return r.preventDefault()}let j=w(!1);function n(){var r;j.value||(j.value=!0,!s.disabled&&((r=S(d))==null||r.focus({preventScroll:!0}),o.setSelectedIndex(D.value),he(()=>{j.value=!1})))}function a(r){r.preventDefault()}let e=xe(T(()=>({as:s.as,type:c.type})),d);return()=>{var r,l;let x={selected:g.value,disabled:(r=s.disabled)!=null?r:!1},{...k}=s,b={ref:d,onKeydown:$,onMousedown:a,onClick:n,id:i,role:"tab",type:e.value,"aria-controls":(l=S(o.panels.value[D.value]))==null?void 0:l.id,"aria-selected":g.value,tabIndex:g.value?0:-1,disabled:s.disabled?!0:void 0};return K({ourProps:b,theirProps:k,slot:x,attrs:c,slots:m,name:"Tab"})}}}),Me=V({name:"TabPanels",props:{as:{type:[Object,String],default:"div"}},setup(s,{slots:c,attrs:m}){let f=Q("TabPanels");return()=>{let y={selectedIndex:f.selectedIndex.value};return K({theirProps:s,ourProps:{},slot:y,attrs:m,slots:c,name:"TabPanels"})}}}),ie=V({name:"TabPanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null},tabIndex:{type:Number,default:0}},setup(s,{attrs:c,slots:m,expose:f}){var y;let i=(y=s.id)!=null?y:`headlessui-tabs-panel-${pe()}`,o=Q("TabPanel"),d=w(null);f({el:d,$el:d}),H(()=>o.registerPanel(d)),fe(()=>o.unregisterPanel(d));let p=re(se),E=T(()=>{if(p.value){let N=p.value.panels.indexOf(i);return N===-1?p.value.panels.push(i)-1:N}return-1}),D=T(()=>{let N=o.panels.value.indexOf(d);return N===-1?E.value:N}),g=T(()=>D.value===o.selectedIndex.value);return()=>{var N;let $={selected:g.value},{tabIndex:j,...n}=s,a={ref:d,id:i,role:"tabpanel","aria-labelledby":(N=S(o.tabs.value[D.value]))==null?void 0:N.id,tabIndex:g.value?j:-1};return!g.value&&s.unmount&&!s.static?ee(ce,{as:"span","aria-hidden":!0,...a}):K({ourProps:a,theirProps:n,slot:$,attrs:c,slots:m,features:oe.Static|oe.RenderStrategy,visible:g.value,name:"TabPanel"})}}});function Ue(s,c){return I(),_("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"})])}function ue(s,c){return I(),_("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m4.5 12.75 6 6 9-13.5"})])}const Be={class:"min-h-screen bg-light-primary dark:bg-dark-primary"},Ve={class:"max-w-4xl mx-auto px-4 py-8"},Le={key:0,class:"space-y-6 animate-pulse"},qe={class:"bg-white shadow rounded-lg p-6"},Re={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},We={class:"bg-white shadow rounded-lg p-6"},ze={class:"bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm flex items-center"},Ge={class:"text-green-700"},He={class:"bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm flex items-center"},Ke={class:"text-red-700"},Qe={key:0,class:"ml-2 bg-accent-secondary/20 text-accent-primary text-xs px-2 py-0.5 rounded-full"},Xe={class:"bg-white dark:bg-dark-neutral-800 shadow-sm rounded-lg overflow-hidden ring-1 ring-gray-900/5 dark:ring-dark-neutral-700"},Ye={class:"bg-gradient-to-r from-accent-quaternary to-accent-secondary px-6 py-4"},Ze={class:"flex justify-between items-center"},Je={class:"p-6"},et={key:0,class:"grid md:grid-cols-2 gap-y-6 gap-x-8"},tt={class:"profile-field"},at={class:"text-gray-800"},rt={class:"profile-field"},st={class:"text-gray-800"},lt={class:"profile-field"},ot={class:"text-gray-800"},nt={class:"profile-field"},dt={class:"text-gray-800"},it={class:"space-y-2"},ut={class:"space-y-2"},ct={class:"space-y-2"},pt={class:"space-y-2"},ft={class:"md:col-span-2 space-y-2"},gt={class:"md:col-span-2 flex justify-end space-x-4 pt-4"},vt={type:"submit",class:"px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center"},mt={class:"bg-white dark:bg-dark-neutral-800 shadow-sm rounded-lg overflow-hidden ring-1 ring-gray-900/5 dark:ring-dark-neutral-700"},bt={class:"p-6"},yt={key:0,class:"text-center py-12 bg-gray-50 dark:bg-indigo-900/20 rounded-lg"},xt={key:1,class:"space-y-6"},ht={class:"flex items-start space-x-4"},wt={class:"bg-indigo-100 rounded-full p-2 hidden sm:block"},kt={class:"font-medium text-gray-900 dark:text-gray-100"},_t={class:"flex items-center text-sm text-gray-600 mt-1"},It={class:"flex flex-col items-end mt-2 sm:mt-0"},Nt={class:"font-semibold text-lg text-gray-900 dark:text-gray-100"},Pt={key:0,class:"text-sm italic text-gray-800"},St={key:1,class:"space-y-2 mb-4"},Tt={class:"flex items-center"},Et={class:"h-14 w-14 rounded-md overflow-hidden border border-gray-200 mr-3 flex-shrink-0 bg-gray-50"},Dt=["src","alt"],At={class:"text-gray-800 font-medium"},$t={class:"flex items-center mt-1"},Ot={class:"bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs"},Ct={class:"text-xs text-gray-500 md:hidden"},jt={class:"flex flex-col items-end"},Ft={class:"text-gray-900 font-medium"},Mt={class:"text-xs text-gray-500 hidden md:block"},Ut={class:"mt-4 flex flex-col space-y-2 text-sm"},Bt={class:"flex justify-between text-gray-800 pt-2 border-t"},Vt={class:"text-gray-800"},Lt={class:"flex justify-between text-gray-800"},qt={class:"text-gray-800"},Rt={__name:"AccountView",setup(s){const c=_e(),m=w(null),f=w([]),y=w(!0),i=w(!1),o=w(""),d=w("");w("profile"),w(!1);const p=w({firstName:"",lastName:"",email:"",phone:"",address:""}),E=w(!1);H(async()=>{if(c.user)try{const a=await te.getUserProfile(c.user.uid);m.value=a,a&&(p.value={firstName:a.firstName||"",lastName:a.lastName||"",email:a.email||c.user.email,phone:a.phone||"",address:a.address||""});try{console.log("Fetching orders for user:",c.user.uid);const e=await te.getUserOrders(c.user.uid);console.log("Orders received:",e.length,e),e&&e.length>0?(f.value=e.map(r=>({...r,formattedDate:D(r.orderDate),displayTotal:typeof r.total=="number"?r.total.toFixed(2):"0.00",orderNumber:r.orderNumber||`ORD-${r.id.substring(0,6)}`,items:Array.isArray(r.items)?r.items:[]})),console.log("Processed orders:",f.value)):(console.log("No orders found or empty array returned"),f.value=[])}catch(e){console.error("Error fetching orders:",e),f.value=[],d.value="Could not load order history"}}catch(a){d.value="Error loading user data",console.error("Error in account view:",a)}finally{y.value=!1,setTimeout(()=>{E.value=!0},100)}else y.value=!1,setTimeout(()=>{E.value=!0},100)});const D=a=>{if(!a)return"N/A";try{let e;if(a.toDate&&typeof a.toDate=="function")e=a.toDate();else if(a.seconds)e=new Date(a.seconds*1e3);else if(a instanceof Date)e=a;else if(typeof a=="string")e=new Date(a);else if(typeof a=="number")e=new Date(a);else return"Invalid date";return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"short",day:"numeric"}).format(e)}catch(e){return console.error("Error formatting date:",e,a),"Date error"}},g=async()=>{d.value="",o.value="";try{await te.updateUserProfile(c.user.uid,p.value),m.value={...m.value,...p.value},i.value=!1,o.value="Profile updated successfully!",setTimeout(()=>{o.value=""},3e3)}catch(a){d.value="Failed to update profile",console.error("Error updating profile:",a)}},N=a=>({Processing:"bg-amber-100 text-amber-800 border border-amber-300",Shipped:"bg-blue-100 text-blue-800 border border-blue-300",Delivered:"bg-emerald-100 text-emerald-800 border border-emerald-300",Cancelled:"bg-red-100 text-red-800 border border-red-300"})[a]||"bg-gray-100 text-gray-800 border border-gray-300",$=(a=0)=>({"transition-all duration-500 ease-out":!0,"opacity-0 translate-y-4":!E.value,"opacity-100 translate-y-0":E.value,[`delay-${a}`]:a>0}),j=a=>{if(!a)return ne("placeholder.jpg");if(typeof a=="string"){if(a.startsWith("base64://"))return a.replace("base64://","");if(a.startsWith("temp://"))return a.replace("temp://","")}return a},n=a=>{console.error("Image failed to load:",a.target.src),a.target.src=ne("placeholder.jpg"),a.target.onerror=function(){const e=a.target.parentNode;if(e){e.classList.add("flex","items-center","justify-center","bg-gray-100"),a.target.style.display="none";const r=document.createElement("div");r.innerHTML=`
        <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 24 24" width="100%" height="100%">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <path d="M12 6v12M6 12h12" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,r.className="broken-image",e.appendChild(r)}}};return(a,e)=>{const r=Ie("router-link");return I(),_("div",Be,[t("div",Ve,[e[31]||(e[31]=t("h1",{class:"text-3xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary"},"My Account",-1)),y.value?(I(),_("div",Le,[t("div",qe,[e[8]||(e[8]=t("div",{class:"h-6 bg-gray-200 rounded w-1/3 mb-6"},null,-1)),t("div",Re,[(I(),_(G,null,Z(4,l=>t("div",{key:l,class:"space-y-2"},e[7]||(e[7]=[t("div",{class:"h-4 bg-gray-200 rounded w-1/4"},null,-1),t("div",{class:"h-6 bg-gray-200 rounded"},null,-1)]))),64))])]),t("div",We,[e[10]||(e[10]=t("div",{class:"h-6 bg-gray-200 rounded w-1/3 mb-6"},null,-1)),(I(),_(G,null,Z(3,l=>t("div",{key:l,class:"mb-4 pb-4 border-b last:border-b-0"},e[9]||(e[9]=[t("div",{class:"flex justify-between mb-2"},[t("div",{class:"h-6 bg-gray-200 rounded w-1/4"}),t("div",{class:"h-6 bg-gray-200 rounded w-20"})],-1),t("div",{class:"h-4 bg-gray-200 rounded w-2/3"},null,-1)]))),64))])])):Y("",!0),v(u(q),{appear:"",show:!y.value,as:"div",enter:"transition-opacity duration-500","enter-from":"opacity-0","enter-to":"opacity-100"},{default:P(()=>[t("div",null,[v(u(q),{appear:"",show:!!o.value,as:"div",enter:"transform transition duration-300 ease-out","enter-from":"-translate-y-4 opacity-0","enter-to":"translate-y-0 opacity-100",leave:"transform transition duration-200 ease-in","leave-from":"translate-y-0 opacity-100","leave-to":"-translate-y-4 opacity-0",class:"mb-6"},{default:P(()=>[t("div",ze,[v(u(ue),{class:"w-5 h-5 text-green-500 mr-3 flex-shrink-0"}),t("p",Ge,h(o.value),1)])]),_:1},8,["show"]),v(u(q),{appear:"",show:!!d.value,as:"div",enter:"transform transition duration-300 ease-out","enter-from":"-translate-y-4 opacity-0","enter-to":"translate-y-0 opacity-100",leave:"transform transition duration-200 ease-in","leave-from":"translate-y-0 opacity-100","leave-to":"-translate-y-4 opacity-0",class:"mb-6"},{default:P(()=>[t("div",He,[v(u(Ne),{class:"w-5 h-5 text-red-500 mr-3 flex-shrink-0"}),t("p",Ke,h(d.value),1)])]),_:1},8,["show"]),v(u(je),{defaultIndex:0,as:"div",class:F($(100))},{default:P(()=>[v(u(Fe),{class:"flex border-b border-light-neutral-300 dark:border-dark-neutral-700 mb-6 space-x-2"},{default:P(()=>[v(u(de),{as:"template"},{default:P(({selected:l})=>[t("button",{class:F(["py-3 px-6 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-t-md transition-colors",[l?"text-accent-primary border-b-2 border-accent-primary bg-accent-secondary/10":"text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary"]])}," Profile Information ",2)]),_:1}),v(u(de),{as:"template"},{default:P(({selected:l})=>[t("button",{class:F(["py-3 px-6 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-t-md transition-colors flex items-center",[l?"text-accent-primary border-b-2 border-accent-primary bg-accent-secondary/10":"text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-secondary dark:hover:bg-dark-secondary"]])},[e[11]||(e[11]=B(" Order History ")),f.value.length?(I(),_("span",Qe,h(f.value.length),1)):Y("",!0)],2)]),_:1})]),_:1}),v(u(Me),{class:"focus:outline-none"},{default:P(()=>[v(u(ie),{class:F([$(200),"focus:outline-none"])},{default:P(()=>{var l,x,k,b,M;return[t("div",Xe,[t("div",Ye,[t("div",Ze,[e[13]||(e[13]=t("h2",{class:"text-xl font-semibold text-white"},"Personal Details",-1)),i.value?Y("",!0):(I(),_("button",{key:0,onClick:e[0]||(e[0]=A=>i.value=!0),class:"btn-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600","aria-label":"Edit profile"},[v(u(Se),{class:"w-4 h-4 mr-1"}),e[12]||(e[12]=B(" Edit "))]))])]),t("div",Je,[i.value?Y("",!0):(I(),_("div",et,[t("div",tt,[e[14]||(e[14]=t("p",{class:"text-gray-800"},"Full Name",-1)),t("p",at,h(((l=m.value)==null?void 0:l.firstName)||"-")+" "+h(((x=m.value)==null?void 0:x.lastName)||""),1)]),t("div",rt,[e[15]||(e[15]=t("p",{class:"text-gray-800"},"Email",-1)),t("p",st,h(((k=m.value)==null?void 0:k.email)||u(c).user.email),1)]),t("div",lt,[e[16]||(e[16]=t("p",{class:"text-gray-800"},"Phone",-1)),t("p",ot,h(((b=m.value)==null?void 0:b.phone)||"Not provided"),1)]),t("div",nt,[e[17]||(e[17]=t("p",{class:"text-gray-800"},"Address",-1)),t("p",dt,h(((M=m.value)==null?void 0:M.address)||"Not provided"),1)])])),v(u(q),{appear:"",show:i.value,enter:"transition-opacity ease-out duration-300","enter-from":"opacity-0","enter-to":"opacity-100",leave:"transition-opacity ease-in duration-200","leave-from":"opacity-100","leave-to":"opacity-0",as:"div"},{default:P(()=>[t("form",{onSubmit:Pe(g,["prevent"]),class:"grid md:grid-cols-2 gap-6"},[t("div",it,[e[18]||(e[18]=t("label",{class:"text-sm font-medium field-label",for:"firstName"},"First Name",-1)),R(t("input",{id:"firstName","onUpdate:modelValue":e[1]||(e[1]=A=>p.value.firstName=A),type:"text",class:"w-full px-4 py-2.5 bg-white border border-gray-300 dark:border-dark-neutral-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-500 transition-colors duration-200",placeholder:"Enter your first name"},null,512),[[W,p.value.firstName]])]),t("div",ut,[e[19]||(e[19]=t("label",{class:"text-sm font-medium field-label",for:"lastName"},"Last Name",-1)),R(t("input",{id:"lastName","onUpdate:modelValue":e[2]||(e[2]=A=>p.value.lastName=A),type:"text",class:"w-full px-4 py-2.5 bg-white border border-gray-300 dark:border-dark-neutral-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-500 transition-colors duration-200",placeholder:"Enter your last name"},null,512),[[W,p.value.lastName]])]),t("div",ct,[e[20]||(e[20]=t("label",{class:"text-sm font-medium field-label",for:"email"},"Email",-1)),R(t("input",{id:"email","onUpdate:modelValue":e[3]||(e[3]=A=>p.value.email=A),type:"email",class:"w-full px-4 py-2.5 bg-gray-50 border border-gray-200 dark:border-dark-neutral-700 rounded-lg shadow-sm cursor-not-allowed text-gray-500 dark:text-gray-400",disabled:"","aria-disabled":"true"},null,512),[[W,p.value.email]]),e[21]||(e[21]=t("p",{class:"text-xs text-gray-500 mt-1.5"},"Email cannot be changed",-1))]),t("div",pt,[e[22]||(e[22]=t("label",{class:"text-sm font-medium field-label",for:"phone"},"Phone",-1)),R(t("input",{id:"phone","onUpdate:modelValue":e[4]||(e[4]=A=>p.value.phone=A),type:"tel",class:"w-full px-4 py-2.5 bg-white border border-gray-300 dark:border-dark-neutral-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors duration-200",placeholder:"Enter your phone number"},null,512),[[W,p.value.phone]])]),t("div",ft,[e[23]||(e[23]=t("label",{class:"text-sm font-medium field-label",for:"address"},"Address",-1)),R(t("textarea",{id:"address","onUpdate:modelValue":e[5]||(e[5]=A=>p.value.address=A),class:"w-full px-4 py-2.5 bg-white border border-gray-300 dark:border-dark-neutral-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors duration-200 min-h-[100px] resize-y",placeholder:"Enter your address"},null,512),[[W,p.value.address]])]),t("div",gt,[t("button",{type:"button",onClick:e[6]||(e[6]=A=>i.value=!1),class:"px-4 py-2.5 border border-gray-300 dark:border-dark-neutral-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-neutral-700 hover:bg-gray-50 dark:hover:bg-dark-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"}," Cancel "),t("button",vt,[v(u(ue),{class:"w-4 h-4 mr-1.5"}),e[24]||(e[24]=B(" Save Changes "))])])],32)]),_:1},8,["show"])])])]}),_:1},8,["class"]),v(u(ie),{class:F([$(300),"focus:outline-none"])},{default:P(()=>[t("div",mt,[e[30]||(e[30]=t("div",{class:"bg-gradient-to-r from-accent-quaternary to-accent-secondary px-6 py-4"},[t("h2",{class:"text-xl font-semibold text-white"},"Order History")],-1)),t("div",bt,[f.value.length===0?(I(),_("div",yt,[v(u(ae),{class:"w-16 h-16 text-gray-400 mx-auto mb-4"}),e[26]||(e[26]=t("p",{class:"text-gray-500 mb-4"},"You haven't placed any orders yet.",-1)),v(r,{to:"/products",class:"btn btn-primary inline-flex items-center justify-center"},{default:P(()=>[v(u(ae),{class:"w-4 h-4 mr-2"}),e[25]||(e[25]=B(" Start Shopping "))]),_:1})])):(I(),_("div",xt,[v(u(q),{appear:"",show:!0,enter:"transition-opacity ease-out duration-300","enter-from":"opacity-0","enter-to":"opacity-100",as:"div",class:"space-y-6"},{default:P(()=>[(I(!0),_(G,null,Z(f.value,(l,x)=>(I(),_("div",{key:l.id,class:F(["bg-white dark:bg-dark-neutral-800 border border-gray-200 dark:border-dark-neutral-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",{"delay-100":x===0,"delay-150":x===1,"delay-200":x>=2}])},[v(u(Ee),{as:"div",defaultOpen:""},{default:P(({open:k})=>[v(u(De),{class:"w-full bg-gray-50 dark:bg-indigo-900/20 p-4 flex flex-wrap justify-between items-center border-b dark:border-dark-neutral-600 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"},{default:P(()=>[t("div",ht,[t("div",wt,[v(u(ae),{class:"w-5 h-5 text-indigo-600"})]),t("div",null,[t("p",kt," Order #"+h(l.orderNumber),1),t("div",_t,[v(u(Ue),{class:"w-3.5 h-3.5 mr-1.5"}),B(" "+h(l.formattedDate),1)])])]),t("div",It,[t("p",Nt,h(u(z)(l.total)),1),t("span",{class:F(["text-xs px-3 py-1 rounded-full mt-1 inline-flex items-center",N(l.status||"Processing")])},[t("span",{class:F(["w-1.5 h-1.5 rounded-full mr-1",{"bg-amber-500":(l.status||"Processing")==="Processing","bg-blue-500":l.status==="Shipped","bg-emerald-500":l.status==="Delivered","bg-red-500":l.status==="Cancelled"}])},null,2),B(" "+h(l.status||"Processing"),1)],2),v(u(Te),{class:F(["w-5 h-5 text-gray-400 mt-1.5 transition-transform duration-200",{"transform rotate-90":k}])},null,8,["class"])])]),_:2},1024),v(u(Ae),{class:"p-4 bg-white dark:bg-dark-neutral-800/50"},{default:P(()=>[e[29]||(e[29]=t("div",{class:"mb-2 pb-2 border-b border-dashed"},[t("h4",{class:"text-sm font-medium text-gray-800 mb-2"},"Items")],-1)),!l.items||l.items.length===0?(I(),_("p",Pt," No items found in this order ")):(I(),_("div",St,[(I(!0),_(G,null,Z(l.items,(b,M)=>(I(),_("div",{key:M,class:"flex justify-between text-sm py-2 border-b border-gray-100 last:border-b-0"},[t("div",Tt,[t("div",Et,[t("img",{src:j(b.imageUrl||b.image),alt:b.name,class:"h-full w-full object-cover object-center",onError:n,loading:"lazy"},null,40,Dt)]),t("div",null,[t("span",At,h(b.name),1),t("div",$t,[t("span",Ot,h(b.quantity),1),t("span",Ct,h(u(z)(b.price))+" each ",1)])])]),t("div",jt,[t("span",Ft,h(u(z)(b.price*b.quantity)),1),t("span",Mt,h(u(z)(b.price))+" each ",1)])]))),128))])),t("div",Ut,[t("div",Bt,[e[27]||(e[27]=t("span",null,"Order date:",-1)),t("span",Vt,h(l.formattedDate),1)]),t("div",Lt,[e[28]||(e[28]=t("span",null,"Total:",-1)),t("span",qt,h(u(z)(l.total)),1)])])]),_:2},1024)]),_:2},1024)],2))),128))]),_:1})]))])])]),_:1},8,["class"])]),_:1})]),_:1},8,["class"])])]),_:1},8,["show"])])])}}},Kt=ke(Rt,[["__scopeId","data-v-35895029"]]);export{Kt as default};
