import{r as d,d as _,N as ne,a0 as he,a2 as ge,a3 as ke,X as be,e as oe,B as we,O as q,Z as _e,R as Ce,ar as Ae,Q as Ne,$ as Ue,F as ie,a4 as re,c as f,a as t,o as y,_ as $e,b as Se,as as Ve,f as E,h as c,g as S,x as M,i as m,t as x,n as De,k as Me,w as U,S as Te,z as I,Y as Be,p as se,G as je,ae as Le,q as Fe,H,I as Q,at as Ee}from"./index-DurEI3hX.js";import{_ as Ie}from"./Breadcrumbs-B6XfXTty.js";import{r as le}from"./CheckCircleIcon-CEUXs41N.js";import{r as qe}from"./PencilIcon-D7E12stK.js";import"./ChevronRightIcon-Dgoahx3p.js";function Pe(i,o,l){let p=d(l==null?void 0:l.value),u=_(()=>i.value!==void 0);return[_(()=>u.value?i.value:p.value),function(C){return u.value||(p.value=C),o==null?void 0:o(C)}]}function Re(i){var o,l;let p=(o=i==null?void 0:i.form)!=null?o:i.closest("form");if(p){for(let u of p.elements)if(u!==i&&(u.tagName==="INPUT"&&u.type==="submit"||u.tagName==="BUTTON"&&u.type==="submit"||u.nodeName==="INPUT"&&u.type==="image")){u.click();return}(l=p.requestSubmit)==null||l.call(p)}}let Ze=Symbol("GroupContext"),Oe=ne({name:"Switch",emits:{"update:modelValue":i=>!0},props:{as:{type:[Object,String],default:"button"},modelValue:{type:Boolean,default:void 0},defaultChecked:{type:Boolean,optional:!0},form:{type:String,optional:!0},name:{type:String,optional:!0},value:{type:String,optional:!0},id:{type:String,default:null},disabled:{type:Boolean,default:!1},tabIndex:{type:Number,default:0}},inheritAttrs:!1,setup(i,{emit:o,attrs:l,slots:p,expose:u}){var C;let A=(C=i.id)!=null?C:`headlessui-switch-${he()}`,n=ge(Ze,null),[g,b]=Pe(_(()=>i.modelValue),s=>o("update:modelValue",s),_(()=>i.defaultChecked));function $(){b(!g.value)}let w=d(null),N=n===null?w:n.switchRef,P=ke(_(()=>({as:i.as,type:l.type})),N);u({el:N,$el:N});function R(s){s.preventDefault(),$()}function Z(s){s.key===re.Space?(s.preventDefault(),$()):s.key===re.Enter&&Re(s.currentTarget)}function O(s){s.preventDefault()}let v=_(()=>{var s,h;return(h=(s=be(N))==null?void 0:s.closest)==null?void 0:h.call(s,"form")});return oe(()=>{we([v],()=>{if(!v.value||i.defaultChecked===void 0)return;function s(){b(i.defaultChecked)}return v.value.addEventListener("reset",s),()=>{var h;(h=v.value)==null||h.removeEventListener("reset",s)}},{immediate:!0})}),()=>{let{name:s,value:h,form:z,tabIndex:T,...B}=i,V={checked:g.value},K={id:A,ref:N,role:"switch",type:P.value,tabIndex:T===-1?0:T,"aria-checked":g.value,"aria-labelledby":n==null?void 0:n.labelledby.value,"aria-describedby":n==null?void 0:n.describedby.value,onClick:R,onKeyup:Z,onKeypress:O};return q(ie,[s!=null&&g.value!=null?q(Ce,Ae({features:Ne.Hidden,as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:g.value,form:z,disabled:B.disabled,name:s,value:h})):null,_e({ourProps:K,theirProps:{...l,...Ue(B,["modelValue","defaultChecked"])},slot:V,attrs:l,slots:p,name:"Switch"})])}}});function ze(i,o){return y(),f("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})])}function Ke(i,o){return y(),f("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"})])}function Ge(i,o){return y(),f("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"})])}const Ye={class:"admin-users min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-300"},He={class:"container mx-auto px-4 py-8"},Qe={class:"flex justify-between items-center mb-12 bg-light-secondary dark:bg-dark-secondary p-6 rounded-xl shadow-lg"},Je={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"},Xe={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-primary/10 dark:from-dark-secondary dark:to-accent-primary/20 rounded-xl shadow-lg p-6 border-2 border-accent-primary/20"},We={class:"text-3xl font-bold text-accent-primary"},et={class:"text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1"},tt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-orange-500/10 dark:from-dark-secondary dark:to-orange-500/20 rounded-xl shadow-lg p-6 border-2 border-orange-500/20"},at={class:"text-3xl font-bold text-orange-500"},rt={class:"flex items-center mt-2"},st={class:"h-2 flex-grow rounded-full bg-light-neutral-200 dark:bg-dark-neutral-700"},lt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-blue-500/10 dark:from-dark-secondary dark:to-blue-500/20 rounded-xl shadow-lg p-6 border-2 border-blue-500/20"},nt={class:"text-3xl font-bold text-blue-500"},ot={class:"text-xs text-accent-tertiary mt-1"},it={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-cyan-500/10 dark:from-dark-secondary dark:to-cyan-500/20 rounded-xl shadow-lg p-6 border-2 border-cyan-500/20"},dt={class:"text-3xl font-bold text-cyan-500"},ct={key:0,class:"mb-4 flex items-center space-x-2"},ut={class:"text-sm text-light-text-secondary dark:text-dark-text-secondary"},mt={class:"bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden border border-light-neutral-300 dark:border-dark-neutral-700"},xt={class:"overflow-x-auto"},pt={class:"min-w-full divide-y divide-light-neutral-300 dark:divide-dark-neutral-700"},vt={class:"bg-light-neutral-100 dark:bg-dark-neutral-800"},ft={scope:"col",class:"px-6 py-3"},yt=["checked"],ht={class:"flex items-center"},gt={class:"flex items-center"},kt={class:"flex items-center"},bt={class:"bg-light-secondary dark:bg-dark-secondary divide-y divide-light-neutral-300 dark:divide-dark-neutral-700"},wt={key:0,class:"animate-pulse"},_t={key:1},Ct={colspan:"5",class:"px-6 py-12 text-center"},At={class:"flex flex-col items-center"},Nt={class:"px-6 py-4"},Ut=["checked","onChange"],$t={class:"px-6 py-4 whitespace-nowrap"},St={class:"flex items-center"},Vt={class:"flex-shrink-0 h-10 w-10 rounded-full bg-accent-primary/10 dark:bg-accent-primary/20 flex items-center justify-center text-accent-primary"},Dt={class:"ml-4"},Mt={class:"text-sm font-medium text-light-text-primary dark:text-dark-text-primary"},Tt={key:0,class:"ml-1 text-xs text-accent-quaternary dark:text-accent-quaternary font-normal"},Bt={class:"px-6 py-4 whitespace-nowrap"},jt={class:"text-sm text-light-text-secondary dark:text-dark-text-secondary"},Lt={class:"px-6 py-4 whitespace-nowrap"},Ft={class:"text-sm text-light-text-secondary dark:text-dark-text-secondary"},Et={class:"px-6 py-4 whitespace-nowrap"},It={class:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium"},qt={class:"flex items-center justify-end space-x-2"},Pt=["onClick"],Rt=["onClick"],Zt={key:1,class:"fixed bottom-4 right-4 bg-accent-tertiary/10 border border-accent-tertiary/20 text-accent-tertiary dark:text-accent-tertiary px-4 py-2 rounded-lg shadow-lg flex items-center"},Ot={class:"fixed inset-0 overflow-y-auto"},zt={class:"flex min-h-full items-center justify-center p-4 text-center"},Kt={class:"flex justify-between items-center mb-4"},Gt={key:0,class:"mb-4 bg-accent-tertiary/10 border-accent-tertiary/20 text-accent-tertiary dark:text-accent-tertiary border px-4 py-2 rounded flex items-center"},Yt={class:"mt-4 space-y-4"},Ht={class:"grid grid-cols-2 gap-4"},Qt={class:"flex items-center"},Jt={class:"mt-6 flex justify-end space-x-3"},Xt=["disabled"],Wt={key:0,class:"inline-block animate-spin mr-2"},ea={__name:"AdminUsersView",setup(i){const o=d([]),l=d([]),p=d(!0),u=d(""),C=d(!1),A=d(null),n=d({}),g=d(!1),b=d(null),$=d(!1),w=Se({show:!1,message:"",timeout:null}),N=d(0),P=d(0),R=d(12),Z=d("24:15"),O=_(()=>l.value.length===L.value.length),v=d("name"),s=d("asc"),h=d("all"),z=[{text:"Dashboard",path:"/admin"},{text:"User Management"}],T=a=>{a.target.checked?l.value=L.value.map(e=>e.id):l.value=[]},B=a=>{const e=l.value.indexOf(a);e===-1?l.value.push(a):l.value.splice(e,1)},V=d(null);oe(async()=>{try{p.value=!0;const a=Ve();b.value=a.currentUser,o.value=await E.getAllUsers()}catch(a){console.error("Failed to load users:",a),V.value="Failed to load users. Please try again later."}finally{p.value=!1}});const K=a=>{if(!a)return"?";const e=a.firstName?a.firstName[0]:"",r=a.lastName?a.lastName[0]:"";return(e+r).toUpperCase()||"?"},de=a=>{if(!a||!b.value)return!1;const e=a.id===b.value.uid||a.uid===b.value.uid||a.email===b.value.email;return e&&!a.email&&b.value.email&&(a.email=b.value.email),e},j=a=>{w.timeout&&clearTimeout(w.timeout),w.message=a,w.show=!0,w.timeout=setTimeout(()=>{w.show=!1},3e3)},G=a=>{v.value===a?s.value=s.value==="asc"?"desc":"asc":(v.value=a,s.value="asc")},ce=()=>{u.value="",h.value="all"},J=_(()=>o.value.filter(a=>a.isAdmin).length),Y=ne({props:{active:Boolean,direction:String},setup(a){return()=>a.active?q("span",{class:"ml-1 text-gray-700"},a.direction==="asc"?"↑":"↓"):q("span",{class:"ml-1 text-gray-300"},"↕")}}),L=_(()=>{let a=[...o.value];if(h.value!=="all"){const e=h.value==="admin";a=a.filter(r=>r.isAdmin===e)}if(u.value){const e=u.value.toLowerCase();a=a.filter(r=>{var k;return((k=r.email)==null?void 0:k.toLowerCase().includes(e))||`${r.firstName} ${r.lastName}`.toLowerCase().includes(e)})}return a.sort((e,r)=>{var W,ee,te,ae;let k,D;v.value==="name"?(k=`${e.firstName} ${e.lastName}`.toLowerCase(),D=`${r.firstName} ${r.lastName}`.toLowerCase()):v.value==="email"?(k=((W=e.email)==null?void 0:W.toLowerCase())||"",D=((ee=r.email)==null?void 0:ee.toLowerCase())||""):v.value==="createdAt"&&(k=((te=e.createdAt)==null?void 0:te.seconds)||0,D=((ae=r.createdAt)==null?void 0:ae.seconds)||0);const X=k>D?1:k<D?-1:0;return s.value==="asc"?X:-X}),a}),ue=a=>{if(!a)return"N/A";try{let e;if(a.toDate&&typeof a.toDate=="function")e=a.toDate();else if(a.seconds)e=new Date(a.seconds*1e3);else if(a instanceof Date)e=a;else if(typeof a=="string")e=new Date(a);else return"N/A";return e.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}catch(e){return console.error("Error formatting date:",e),"N/A"}},me=async a=>{try{if(!a||!a.id){console.error("Invalid user object:",a);return}const e={id:a.id,firstName:a.firstName||"",lastName:a.lastName||"",email:a.email||"",phone:a.phone||"",isAdmin:!!a.isAdmin,createdAt:a.createdAt||null};A.value=e.id,await Ee(),n.value={...e},C.value=!0}catch(e){console.error("Error opening user details:",e),alert("Could not open user details. Please try again.")}},F=()=>{C.value=!1,n.value={},A.value=null,$.value=!1},xe=async()=>{if(A.value)try{g.value=!0,V.value=null;const a={firstName:n.value.firstName||"",lastName:n.value.lastName||"",phone:n.value.phone||"",isAdmin:!!n.value.isAdmin,email:n.value.email};await E.updateUser(A.value,a);const e=o.value.findIndex(r=>r.id===A.value);e!==-1&&(o.value[e]={...o.value[e],...a}),$.value=!0,j(`User ${a.firstName} ${a.lastName} updated successfully`),setTimeout(()=>{F()},1500)}catch(a){console.error("Failed to update user:",a),V.value="Failed to update user. Please try again."}finally{g.value=!1}},pe=[{value:"all",label:"All Roles"},{value:"admin",label:"Admins"},{value:"customer",label:"Customers"}];_(()=>{var a;return((a=pe.find(e=>e.value===h.value))==null?void 0:a.label)||"All Roles"});const ve=async()=>{if(confirm(`Are you sure you want to delete ${l.value.length} users?`))try{await Promise.all(l.value.map(a=>E.deleteUser(a))),o.value=o.value.filter(a=>!l.value.includes(a.id)),l.value=[],j("Users deleted successfully")}catch(a){console.error("Failed to delete users:",a)}},fe=async()=>{const a=confirm("Make selected users admins? Click OK for Admin, Cancel for Customer");try{await Promise.all(l.value.map(e=>E.updateUser(e,{isAdmin:a}))),o.value=o.value.map(e=>l.value.includes(e.id)?{...e,isAdmin:a}:e),l.value=[],j("Users' roles updated successfully")}catch(e){console.error("Failed to update users:",e)}},ye=a=>{console.log("View activity for user:",a.id),j("User activity feature coming soon")};return(a,e)=>(y(),f("div",Ye,[t("div",He,[t("div",Qe,[t("div",null,[c(Ie,{items:z}),e[7]||(e[7]=t("h1",{class:"text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2"},"User Management",-1)),e[8]||(e[8]=t("p",{class:"text-light-text-secondary dark:text-dark-text-secondary mt-1"},"View and manage system users",-1))]),t("button",{onClick:ce,class:"bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-white py-2 px-4 rounded-btn flex items-center shadow-btn hover:shadow-btn-hover transition-btn duration-200"},[c(m(ze),{class:"h-5 w-5 mr-2"}),e[9]||(e[9]=M(" Reset Filters "))])]),t("div",Je,[t("div",Xe,[e[10]||(e[10]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Total Users",-1)),t("p",We,x(o.value.length),1),t("p",et,"Last 30 days: +"+x(N.value),1)]),t("div",tt,[e[11]||(e[11]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Admins",-1)),t("p",at,x(J.value),1),t("div",rt,[t("div",st,[t("div",{class:"h-2 rounded-full bg-orange-500 transition-all duration-300",style:De(`width: ${J.value/o.value.length*100}%`)},null,4)])])]),t("div",lt,[e[13]||(e[13]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Active Users",-1)),t("p",nt,x(P.value),1),t("p",ot,[e[12]||(e[12]=t("span",{class:"inline-block transform rotate-45"},"↗",-1)),M(" "+x(R.value)+"% from last month ",1)])]),t("div",it,[e[14]||(e[14]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Avg. Session",-1)),t("p",dt,x(Z.value),1),e[15]||(e[15]=t("p",{class:"text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1"},"Minutes per user",-1))])]),l.value.length>0?(y(),f("div",ct,[t("span",ut,x(l.value.length)+" selected ",1),t("button",{onClick:ve,class:"text-red-500 hover:text-red-600 text-sm font-medium"}," Delete Selected "),t("button",{onClick:fe,class:"text-accent-quaternary hover:text-accent-quaternary/80 text-sm font-medium"}," Change Role ")])):S("",!0),t("div",mt,[t("div",xt,[t("table",pt,[t("thead",vt,[t("tr",null,[t("th",ft,[t("input",{type:"checkbox",onChange:T,checked:O.value,class:"rounded border-light-neutral-300 dark:border-dark-neutral-600 text-accent-primary focus:ring-accent-primary"},null,40,yt)]),t("th",{scope:"col",class:"px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer",onClick:e[0]||(e[0]=r=>G("name"))},[t("div",ht,[e[16]||(e[16]=t("span",null,"Name",-1)),c(m(Y),{active:v.value==="name",direction:s.value},null,8,["active","direction"])])]),t("th",{scope:"col",class:"px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer",onClick:e[1]||(e[1]=r=>G("email"))},[t("div",gt,[e[17]||(e[17]=t("span",null,"Email",-1)),c(m(Y),{active:v.value==="email",direction:s.value},null,8,["active","direction"])])]),t("th",{scope:"col",class:"px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer",onClick:e[2]||(e[2]=r=>G("createdAt"))},[t("div",kt,[e[18]||(e[18]=t("span",null,"Joined",-1)),c(m(Y),{active:v.value==="createdAt",direction:s.value},null,8,["active","direction"])])]),e[19]||(e[19]=t("th",{scope:"col",class:"px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider"}," Role ",-1)),e[20]||(e[20]=t("th",{scope:"col",class:"px-6 py-3 text-right text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider"}," Actions ",-1))])]),t("tbody",bt,[p.value?(y(),f("tr",wt,e[21]||(e[21]=[t("td",{colspan:"5",class:"px-6 py-12 text-center text-light-text-secondary dark:text-dark-text-secondary"}," Loading users... ",-1)]))):L.value.length===0?(y(),f("tr",_t,[t("td",Ct,[t("div",At,[c(m(Ge),{class:"h-12 w-12 text-light-neutral-400 dark:text-dark-neutral-600 mb-2"}),e[22]||(e[22]=t("h3",{class:"text-lg font-medium text-light-text-primary dark:text-dark-text-primary"},"No users found",-1)),e[23]||(e[23]=t("p",{class:"text-light-text-secondary dark:text-dark-text-secondary mt-1"},"Try adjusting your search or filter criteria",-1))])])])):S("",!0),(y(!0),f(ie,null,Me(L.value,r=>(y(),f("tr",{key:r.id,class:I(["hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 transition-colors",l.value.includes(r.id)?"bg-accent-primary/5":""])},[t("td",Nt,[t("input",{type:"checkbox",checked:l.value.includes(r.id),onChange:k=>B(r.id),class:"rounded border-light-neutral-300 dark:border-dark-neutral-600 text-accent-primary focus:ring-accent-primary"},null,40,Ut)]),t("td",$t,[t("div",St,[t("div",Vt,x(K(r)),1),t("div",Dt,[t("div",Mt,[M(x(r.firstName)+" "+x(r.lastName)+" ",1),de(r)?(y(),f("span",Tt,"(You)")):S("",!0)])])])]),t("td",Bt,[t("div",jt,x(r.email||"No email"),1)]),t("td",Lt,[t("div",Ft,x(ue(r.createdAt)),1)]),t("td",Et,[t("span",{class:I([r.isAdmin?"bg-accent-primary/10 text-accent-primary":"bg-light-neutral-100 dark:bg-dark-neutral-700 text-light-text-secondary dark:text-dark-text-secondary","px-2 py-1 text-xs rounded-full"])},x(r.isAdmin?"Admin":"Customer"),3)]),t("td",It,[t("div",qt,[t("button",{onClick:k=>ye(r),class:"text-accent-quaternary hover:text-accent-quaternary/80 transition-colors",title:"View Activity"},[c(m(Ke),{class:"h-5 w-5"})],8,Pt),t("button",{onClick:k=>me(r),class:"text-accent-quaternary hover:text-accent-quaternary/80 transition-colors",title:"Edit User"},[c(m(qe),{class:"h-5 w-5"})],8,Rt)])])],2))),128))])])])]),w.show?(y(),f("div",Zt,[c(m(le),{class:"h-5 w-5 mr-2"}),t("span",null,x(w.message),1)])):S("",!0)]),c(m(Te),{appear:"",show:C.value,as:"template"},{default:U(()=>[c(m(Be),{as:"div",onClose:F,class:"relative z-50"},{default:U(()=>[c(m(se),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0"},{default:U(()=>e[24]||(e[24]=[t("div",{class:"fixed inset-0 bg-black bg-opacity-50 transition-opacity"},null,-1)])),_:1}),t("div",Ot,[t("div",zt,[c(m(se),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-200 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95"},{default:U(()=>[c(m(je),{class:"w-full max-w-md transform overflow-hidden rounded-2xl bg-light-secondary dark:bg-dark-secondary p-6 text-left align-middle shadow-xl transition-all border border-light-neutral-300 dark:border-dark-neutral-700"},{default:U(()=>[t("div",Kt,[c(m(Le),{as:"h3",class:"text-lg font-medium text-light-text-primary dark:text-dark-text-primary"},{default:U(()=>e[25]||(e[25]=[M(" Edit User ")])),_:1}),t("button",{onClick:F,class:"text-light-neutral-500 dark:text-dark-neutral-500 hover:text-light-text-primary dark:hover:text-dark-text-primary focus:outline-none","aria-label":"Close"},[c(m(Fe),{class:"h-6 w-6"})])]),$.value?(y(),f("div",Gt,[c(m(le),{class:"h-5 w-5 mr-2"}),e[26]||(e[26]=t("span",null,"User updated successfully!",-1))])):S("",!0),t("div",Yt,[t("div",Ht,[t("div",null,[e[27]||(e[27]=t("label",{for:"firstName",class:"block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary"}," First name ",-1)),H(t("input",{type:"text",id:"firstName","onUpdate:modelValue":e[3]||(e[3]=r=>n.value.firstName=r),class:"mt-1 block w-full rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary px-3 py-2 focus:border-accent-primary focus:ring-accent-primary focus:outline-none sm:text-sm"},null,512),[[Q,n.value.firstName]])]),t("div",null,[e[28]||(e[28]=t("label",{for:"lastName",class:"block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary"}," Last name ",-1)),H(t("input",{type:"text",id:"lastName","onUpdate:modelValue":e[4]||(e[4]=r=>n.value.lastName=r),class:"mt-1 block w-full rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary px-3 py-2 focus:border-accent-primary focus:ring-accent-primary focus:outline-none sm:text-sm"},null,512),[[Q,n.value.lastName]])])]),t("div",null,[e[29]||(e[29]=t("label",{for:"email",class:"block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary"}," Email ",-1)),H(t("input",{type:"email",id:"email","onUpdate:modelValue":e[5]||(e[5]=r=>n.value.email=r),disabled:"",class:"mt-1 block w-full rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-neutral-100 dark:bg-dark-neutral-800 text-light-neutral-500 dark:text-dark-neutral-500 px-3 py-2 cursor-not-allowed sm:text-sm"},null,512),[[Q,n.value.email]])]),t("div",Qt,[c(m(Oe),{modelValue:n.value.isAdmin,"onUpdate:modelValue":e[6]||(e[6]=r=>n.value.isAdmin=r),class:I([n.value.isAdmin?"bg-accent-primary":"bg-light-neutral-300 dark:bg-dark-neutral-600","relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2"])},{default:U(()=>[e[30]||(e[30]=t("span",{class:"sr-only"},"Admin status",-1)),t("span",{"aria-hidden":"true",class:I([n.value.isAdmin?"translate-x-5":"translate-x-0","pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"])},null,2)]),_:1},8,["modelValue","class"]),e[31]||(e[31]=t("span",{class:"ml-3 text-sm text-light-text-primary dark:text-dark-text-primary"}," Admin privileges ",-1))])]),t("div",Jt,[t("button",{type:"button",class:"inline-flex justify-center rounded-md border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-primary dark:bg-dark-primary px-4 py-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",onClick:F}," Cancel "),t("button",{type:"button",class:"inline-flex justify-center rounded-md border border-transparent bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary focus-visible:ring-offset-2",onClick:xe,disabled:g.value},[g.value?(y(),f("span",Wt,"⟳")):S("",!0),M(" "+x(g.value?"Saving...":"Save Changes"),1)],8,Xt)])]),_:1})]),_:1})])])]),_:1})]),_:1},8,["show"])]))}},na=$e(ea,[["__scopeId","data-v-afb7c067"]]);export{na as default};
