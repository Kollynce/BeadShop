import{_ as O,J as U,am as j,r as f,b as F,d as w,e as R,I as Z,c,a as t,t as o,i as B,h as y,w as v,C as E,n as N,K as S,g as L,F as I,k as G,f as _,o as u,x as A,z as J}from"./index-C4z9Z3NH.js";const K={class:"admin-dashboard min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-300"},Q={class:"container mx-auto px-4 py-8"},W={class:"flex justify-between items-center mb-12 bg-light-secondary dark:bg-dark-secondary p-6 rounded-xl shadow-lg"},X={class:"text-light-text-secondary dark:text-dark-text-secondary text-lg"},Y={key:0,xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 text-light-text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},tt={key:1,xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 text-dark-text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},et={class:"grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"},rt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-primary/10 dark:from-dark-secondary dark:to-accent-primary/20 rounded-xl shadow-lg p-6 border-2 border-accent-primary/20 hover:border-accent-primary transition-all duration-300"},st={class:"flex-1 flex flex-col"},at={class:"text-3xl font-bold mb-4 text-accent-primary"},ot={class:"text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4"},nt={class:"mt-auto"},dt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-secondary/10 dark:from-dark-secondary dark:to-accent-secondary/20 rounded-xl shadow-lg p-6 border-2 border-accent-secondary/20 hover:border-accent-secondary transition-all duration-300"},lt={class:"flex-1 flex flex-col"},it={class:"text-3xl font-bold mb-4 text-accent-secondary"},ct={class:"mb-4 flex-1"},ut={class:"flex justify-between mb-2"},xt={class:"text-sm font-medium text-accent-secondary"},gt={class:"w-full bg-light-neutral-200 dark:bg-dark-neutral-700 rounded-full h-2"},ht={class:"mt-auto"},mt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-quaternary/10 dark:from-dark-secondary dark:to-accent-quaternary/20 rounded-xl shadow-lg p-6 border-2 border-accent-quaternary/20 hover:border-accent-quaternary transition-all duration-300"},pt={class:"flex-1 flex flex-col"},kt={class:"text-3xl font-bold mb-4 text-accent-quaternary"},yt={class:"mb-4 flex-1"},vt={class:"flex w-full justify-between mb-2"},bt={class:"text-sm font-medium text-accent-quaternary"},ft={class:"w-full bg-light-neutral-200 dark:bg-dark-neutral-700 rounded-full h-2"},wt={class:"mt-auto"},_t={class:"mb-12"},At={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"},Mt={class:"flex flex-col"},Ct={class:"-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},Dt={class:"inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"},Bt={class:"overflow-hidden border border-light-neutral-300 dark:border-dark-neutral-700 md:rounded-xl"},Nt={class:"flex justify-between items-center p-4 bg-light-secondary dark:bg-dark-secondary"},St={class:"flex items-center space-x-2"},Lt={class:"text-sm px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary"},Pt={class:"min-w-full divide-y divide-light-neutral-300 dark:divide-dark-neutral-700"},qt={class:"bg-white divide-y divide-light-neutral-300 dark:divide-dark-neutral-700 dark:bg-dark-secondary"},Ht={key:0,class:"animate-pulse"},Vt={class:"px-4 py-4 text-sm whitespace-nowrap"},$t={class:"flex items-center"},zt={class:"px-4 py-4 text-sm whitespace-nowrap"},Tt={class:"text-light-text-primary dark:text-dark-text-primary"},Ot={class:"text-light-text-secondary dark:text-dark-text-secondary"},Ut={class:"px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary whitespace-nowrap"},jt={__name:"AdminDashboard",setup(Ft){const m=U(),M=j(),b=Z(),n=f(!0),C=f(null),s=F({products:{total:0,stockPercentage:0},orders:{total:0,pending:0},users:{total:0,active:0}}),x=f([]),P=w(()=>s.orders.total&&s.orders.pending/s.orders.total*100||0),q=w(()=>s.users.total&&s.users.active/s.users.total*100||0),H=async()=>{try{n.value=!0,C.value=null;const[a,e,l]=await Promise.all([_.getProducts(),_.getAllOrders(),_.getAllUsers()]),p=Array.isArray(a)?a:[],g=Array.isArray(e)?e:[],d=Array.isArray(l)?l:[];s.products={total:p.length,stockPercentage:V(p)},s.orders={total:g.length,pending:g.filter(r=>r.status==="processing").length},s.users={total:d.length,active:d.filter(r=>!r.disabled).length},x.value=[...g,...d].filter(r=>r&&(r.createdAt||r.orderNumber||r.email)).sort((r,h)=>{const k=i=>{var D;return(D=i==null?void 0:i.createdAt)!=null&&D.toDate?i.createdAt.toDate():i!=null&&i.createdAt?new Date(i.createdAt):new Date};return k(h)-k(r)}).slice(0,5).map(r=>{var h,k;return{type:r.orderNumber?"order":"user",data:{...r,orderNumber:r.orderNumber||(r.id?`ORD-${r.id.slice(0,6)}`:"N/A"),email:r.email||"N/A"},date:((k=(h=r.createdAt)==null?void 0:h.toDate)==null?void 0:k.call(h))||new Date(r.createdAt||Date.now())}})}catch(a){console.error("Error fetching dashboard data:",a),C.value="Failed to load dashboard data",s.products={total:0,stockPercentage:0},s.orders={total:0,pending:0},s.users={total:0,active:0},x.value=[]}finally{n.value=!1}},V=a=>{if(!a.length)return 0;const e=a.filter(l=>(l.quantity||0)>0).length;return Math.round(e/a.length*100)},$=()=>{M.toggleTheme()},z=()=>{b.push("/")},T=()=>{console.log("Bulk action not implemented yet")};return R(async()=>{if(!m.user){console.log("No user found, redirecting to login"),b.push("/login");return}if(!m.user.isAdmin){console.log("User is not admin, redirecting to home"),b.push("/");return}console.log("Admin user confirmed:",m.user),await H()}),w(()=>{var e;const a=!!((e=m.user)!=null&&e.isAdmin);return console.log("Current admin status:",a),a}),(a,e)=>{var p,g;const l=E("router-link");return u(),c("div",K,[t("div",Q,[t("div",W,[t("div",null,[e[0]||(e[0]=t("h1",{class:"text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2"},"Shop Manager",-1)),t("p",X," Welcome back, "+o(((g=(p=B(m))==null?void 0:p.user)==null?void 0:g.displayName)||"Admin"),1)]),t("button",{onClick:$,class:"p-2 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors","aria-label":"Toggle dark mode"},[B(M).theme==="light"?(u(),c("svg",Y,e[1]||(e[1]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"},null,-1)]))):(u(),c("svg",tt,e[2]||(e[2]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"},null,-1)])))])]),t("div",et,[t("div",rt,[t("div",st,[e[4]||(e[4]=t("h2",{class:"text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary"},"Products",-1)),t("p",at,o(n.value?"Loading...":`${s.products.total}`),1),t("p",ot,o(n.value?"":`${s.products.stockPercentage}% in stock`),1),t("div",nt,[y(l,{to:"/admin/products",class:"inline-flex items-center text-accent-primary hover:text-orange-500 font-medium transition-colors duration-200"},{default:v(()=>e[3]||(e[3]=[A(" Manage Products "),t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-4 ml-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1)])),_:1})])])]),t("div",dt,[t("div",lt,[e[7]||(e[7]=t("h2",{class:"text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary"},"Orders",-1)),t("p",it,o(n.value?"...":s.orders.total),1),t("div",ct,[t("div",ut,[e[5]||(e[5]=t("span",{class:"text-sm text-light-text-secondary dark:text-dark-text-secondary"},"Pending Orders",-1)),t("span",xt,o(n.value?"...":s.orders.pending),1)]),t("div",gt,[t("div",{class:"bg-accent-secondary h-2 rounded-full transition-all duration-300",style:N(n.value?"width: 0%":`width: ${P.value}%`)},null,4)])]),t("div",ht,[y(l,{to:"/admin/orders",class:"inline-flex items-center text-accent-secondary hover:text-accent-secondary/80 font-medium transition-colors duration-200"},{default:v(()=>e[6]||(e[6]=[A(" Manage Orders "),t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-4 ml-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1)])),_:1})])])]),t("div",mt,[t("div",pt,[e[10]||(e[10]=t("h2",{class:"text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary"},"Users",-1)),t("p",kt,o(n.value?"Loading...":`${s.users.total}`),1),t("div",yt,[t("div",vt,[e[8]||(e[8]=t("span",{class:"text-sm text-light-text-secondary dark:text-dark-text-secondary"},"Active Users",-1)),t("span",bt,o(n.value?"...":`${s.users.active}`),1)]),t("div",ft,[t("div",{class:"bg-accent-quaternary h-2 rounded-full transition-all duration-300",style:N(n.value?"width: 0%":`width: ${q.value}%`)},null,4)])]),t("div",wt,[y(l,{to:"/admin/users",class:"inline-flex items-center text-accent-quaternary hover:text-accent-quaternary/80 font-medium transition-colors duration-200"},{default:v(()=>e[9]||(e[9]=[A(" Manage Users "),t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-4 ml-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1)])),_:1})])])])]),t("div",_t,[e[13]||(e[13]=t("h2",{class:"text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6"},"Quick Actions",-1)),t("div",At,[y(l,{to:"/admin/products/new",class:"group flex items-center p-6 bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-accent-primary transition-all duration-300"},{default:v(()=>e[11]||(e[11]=[t("div",{class:"p-3 bg-gradient-to-br from-accent-primary to-orange-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 4v16m8-8H4"})])],-1),t("div",null,[t("span",{class:"block text-lg font-semibold text-light-text-primary dark:text-dark-text-primary"},"Add Product"),t("span",{class:"text-sm text-light-text-secondary dark:text-dark-text-secondary"},"Create new listing")],-1)])),_:1}),t("button",{onClick:z,class:"flex items-center p-6 bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-accent-secondary transition-all duration-300"},e[12]||(e[12]=[S('<div class="p-3 bg-accent-secondary rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300" data-v-bec82c26><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bec82c26><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-bec82c26></path></svg></div><div data-v-bec82c26><span class="block text-lg font-semibold text-light-text-primary dark:text-dark-text-primary" data-v-bec82c26>View Store</span><span class="text-sm text-light-text-secondary dark:text-dark-text-secondary" data-v-bec82c26>Go to shop</span></div>',2)]))])]),t("div",Mt,[t("div",Ct,[t("div",Dt,[t("div",Bt,[t("div",Nt,[e[14]||(e[14]=t("div",null,[t("h2",{class:"text-xl font-semibold text-light-text-primary dark:text-dark-text-primary"},"Recent Activity"),t("p",{class:"mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary"}," Latest actions and updates in your shop ")],-1)),t("div",St,[t("span",Lt,o(x.value.length)+" items ",1),x.value.length?(u(),c("button",{key:0,onClick:T,class:"px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-all duration-300"}," Bulk Action ")):L("",!0)])]),t("table",Pt,[e[17]||(e[17]=t("thead",{class:"bg-light-secondary dark:bg-dark-secondary"},[t("tr",null,[t("th",{scope:"col",class:"py-3.5 px-4 text-sm font-normal text-left text-light-text-secondary dark:text-dark-text-secondary"},[t("button",{class:"flex items-center gap-x-2"},[t("span",null,"Type"),t("svg",{class:"h-3",viewBox:"0 0 10 11",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z",fill:"currentColor",stroke:"currentColor","stroke-width":"0.1"}),t("path",{d:"M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z",fill:"currentColor",stroke:"currentColor","stroke-width":"0.1"})])])]),t("th",{scope:"col",class:"px-4 py-3.5 text-sm font-normal text-left text-light-text-secondary dark:text-dark-text-secondary"},"Details"),t("th",{scope:"col",class:"px-4 py-3.5 text-sm font-normal text-left text-light-text-secondary dark:text-dark-text-secondary"},"Date"),t("th",{scope:"col",class:"relative py-3.5 px-4"},[t("span",{class:"sr-only"},"Actions")])])],-1)),t("tbody",qt,[n.value?(u(),c("tr",Ht,e[15]||(e[15]=[t("td",{colspan:"4",class:"text-center p-4 text-light-text-secondary dark:text-dark-text-secondary"}," Loading... ",-1)]))):x.value.length?(u(!0),c(I,{key:1},G(x.value,(d,r)=>(u(),c("tr",{key:r,class:"hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors"},[t("td",Vt,[t("div",$t,[t("div",{class:J(`inline px-3 py-1 text-sm font-normal rounded-full ${d.type==="order"?"text-accent-secondary bg-accent-secondary/10":"text-accent-quaternary bg-accent-quaternary/10"}`)},o(d.type),3)])]),t("td",zt,[t("div",null,[t("h4",Tt,o(d.type==="order"?`Order #${d.data.orderNumber}`:d.data.email),1),t("p",Ot,o(d.type==="order"?"New order placed":"User activity"),1)])]),t("td",Ut,o(new Date(d.date).toLocaleString()),1),e[16]||(e[16]=t("td",{class:"px-4 py-4 text-sm whitespace-nowrap"},[t("button",{class:"px-1 py-1 text-light-text-secondary dark:text-dark-text-secondary transition-colors duration-200 rounded-lg hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"})])])],-1))]))),128)):L("",!0)])]),e[18]||(e[18]=S('<div class="flex items-center justify-between p-4 border-t border-light-neutral-300 dark:border-dark-neutral-700" data-v-bec82c26><button class="flex items-center gap-x-2 px-4 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors" data-v-bec82c26><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bec82c26><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" data-v-bec82c26></path></svg> Previous </button><button class="flex items-center gap-x-2 px-4 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600 transition-colors" data-v-bec82c26> Next <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bec82c26><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" data-v-bec82c26></path></svg></button></div>',1))])])])])])])}}},Zt=O(jt,[["__scopeId","data-v-bec82c26"]]);export{Zt as default};
