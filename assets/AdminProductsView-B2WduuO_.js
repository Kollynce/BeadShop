import{c as d,o as n,n as I,y as T,a as t,r as u,e as U,an as Y,A as G,q,g as $,t as i,ao as P,ap as K,_ as X,d as b,h as w,w as v,i as Z,B as L,C as tt,ai as et,F as M,j as N,f as V,E as rt,I as at,J as ot,v as A,D}from"./index-CuOswql7.js";import{_ as st}from"./Breadcrumbs-vN02jygy.js";import"./ChevronRightIcon-8GHKYUga.js";const lt={class:"flex justify-center items-center"},nt={__name:"LoadingSpinner",props:{size:{type:String,default:"md",validator:o=>["sm","md","lg"].includes(o)},color:{type:String,default:"black"}},setup(o){return(k,s)=>(n(),d("div",lt,[(n(),d("svg",{class:T(["animate-spin",{"h-4 w-4":o.size==="sm","h-8 w-8":o.size==="md","h-12 w-12":o.size==="lg"}]),style:I({color:o.color}),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},s[0]||(s[0]=[t("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1),t("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1)]),6))]))}},dt={key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4"},it={class:"flex justify-between items-center p-4 border-b"},ct={class:"text-lg font-medium"},ut={class:"p-4"},xt={key:0,class:"p-4 border-t bg-gray-50"},gt={__name:"Modal",props:{show:{type:Boolean,default:!1},title:{type:String,default:""}},emits:["close"],setup(o,{emit:k}){const s=o,g=k,m=u(null),y=c=>{c.key==="Escape"&&s.show&&g("close")},x=c=>{m.value&&!m.value.contains(c.target)&&s.show&&g("close")};return U(()=>{document.addEventListener("keydown",y),document.addEventListener("mousedown",x)}),Y(()=>{document.removeEventListener("keydown",y),document.removeEventListener("mousedown",x)}),G(()=>s.show,c=>{c?document.body.style.overflow="hidden":document.body.style.overflow=""}),(c,f)=>(n(),q(K,{to:"body"},[o.show?(n(),d("div",dt,[t("div",{class:"fixed inset-0 bg-black bg-opacity-50 transition-opacity",onClick:f[0]||(f[0]=S=>g("close"))}),t("div",{ref_key:"modal",ref:m,class:"bg-white rounded-lg shadow-xl w-full max-w-md z-10 overflow-hidden transform transition-all"},[t("div",it,[t("h3",ct,i(o.title),1),t("button",{onClick:f[1]||(f[1]=S=>g("close")),class:"text-gray-500 hover:text-gray-700"},f[2]||(f[2]=[t("span",{class:"sr-only"},"Close",-1),t("svg",{class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),t("div",ut,[P(c.$slots,"default")]),c.$slots.footer?(n(),d("div",xt,[P(c.$slots,"footer")])):$("",!0)],512)])):$("",!0)]))}},mt=["type","disabled"],F={__name:"Button",props:{type:{type:String,default:"button"},variant:{type:String,default:"primary",validator:o=>["primary","secondary","outline","danger"].includes(o)},size:{type:String,default:"md",validator:o=>["sm","md","lg"].includes(o)},disabled:{type:Boolean,default:!1},fullWidth:{type:Boolean,default:!1}},setup(o){return(k,s)=>(n(),d("button",{type:o.type,disabled:o.disabled,class:T(["inline-flex items-center justify-center rounded-btn shadow-btn transition-btn focus:outline-none focus:ring-2 focus:ring-offset-2",{"bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-500 dark:active:bg-orange-700":o.variant==="primary","bg-light-neutral-200 text-light-neutral-800 hover:bg-light-neutral-300 dark:bg-dark-neutral-700 dark:text-dark-neutral-100 dark:hover:bg-dark-neutral-600":o.variant==="secondary","bg-white dark:bg-transparent text-light-text-primary dark:text-dark-text-primary border border-light-neutral-300 dark:border-dark-neutral-600 hover:bg-light-neutral-100 dark:hover:bg-dark-secondary":o.variant==="outline","bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":o.variant==="danger","px-3 py-1.5 text-sm":o.size==="sm","px-4 py-2":o.size==="md","px-6 py-3 text-lg":o.size==="lg","w-full":o.fullWidth,"opacity-50 cursor-not-allowed pointer-events-none":o.disabled}])},[P(k.$slots,"default")],10,mt))}},yt={class:"admin-products min-h-screen bg-light-primary dark:bg-dark-primary transition-colors duration-300"},ft={class:"container mx-auto px-4 py-8"},ht={class:"flex justify-between items-center mb-12 bg-light-secondary dark:bg-dark-secondary p-6 rounded-xl shadow-lg"},pt={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"},kt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-accent-primary/10 dark:from-dark-secondary dark:to-accent-primary/20 rounded-xl shadow-lg p-6 border-2 border-accent-primary/20"},vt={class:"text-3xl font-bold text-accent-primary"},bt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-orange-500/10 dark:from-dark-secondary dark:to-orange-500/20 rounded-xl shadow-lg p-6 border-2 border-orange-500/20"},wt={class:"text-3xl font-bold text-orange-500"},_t={class:"flex items-center mt-2"},Ct={class:"h-2 flex-grow rounded-full bg-light-neutral-200 dark:bg-dark-neutral-700"},$t={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-blue-500/10 dark:from-dark-secondary dark:to-blue-500/20 rounded-xl shadow-lg p-6 border-2 border-blue-500/20"},St={class:"text-3xl font-bold text-blue-500"},Pt={class:"text-xs text-accent-tertiary mt-1"},jt={class:"flex flex-col h-full bg-gradient-to-br from-light-secondary to-cyan-500/10 dark:from-dark-secondary dark:to-cyan-500/20 rounded-xl shadow-lg p-6 border-2 border-cyan-500/20"},zt={class:"text-3xl font-bold text-cyan-500"},Bt={class:"bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg p-6 mb-6 border border-light-neutral-300 dark:border-dark-neutral-700"},Et={class:"flex flex-wrap items-center gap-4"},Lt={class:"flex-1"},Mt=["value"],Nt={class:"bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden border border-light-neutral-300 dark:border-dark-neutral-700"},Vt={class:"overflow-x-auto"},At={class:"min-w-full bg-light-secondary dark:bg-dark-secondary"},Dt={class:"bg-light-neutral-100 dark:bg-dark-neutral-700"},Ft={class:"py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary"},It={class:"py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary"},Tt={class:"py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary"},Ut={class:"py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary"},qt={class:"py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary"},Wt={class:"py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary"},Ht={class:"py-3 px-4 text-left text-light-text-primary dark:text-dark-text-primary"},Ot={key:0},Rt={colspan:"7",class:"py-4 text-center"},Jt={key:1},Qt={class:"py-3 px-4"},Yt={class:"relative w-16 h-16 rounded overflow-hidden bg-light-neutral-100 dark:bg-dark-neutral-800"},Gt=["src","alt"],Kt={class:"py-3 px-4 text-light-text-primary dark:text-dark-text-primary"},Xt={class:"py-3 px-4 text-light-text-primary dark:text-dark-text-primary"},Zt={class:"py-3 px-4 text-light-text-primary dark:text-dark-text-primary"},te={class:"py-3 px-4 text-light-text-primary dark:text-dark-text-primary"},ee={class:"py-3 px-4"},re={key:0,class:"text-accent-tertiary dark:text-accent-tertiary"},ae={key:1,class:"text-light-neutral-500 dark:text-dark-neutral-500"},oe={class:"py-3 px-4"},se={class:"flex space-x-2"},le=["onClick"],ne=["onClick"],de={class:"text-light-text-secondary dark:text-dark-text-secondary"},ie={class:"flex justify-end space-x-3"},ce={__name:"AdminProductsView",setup(o){const k=at(),s=u([]),g=u(!0),m=u(""),y=u(!1),x=u(null);u({});const c=r=>{if(!r)return D("placeholder.jpg");if(typeof r=="string"){if(r.startsWith("data:image"))return r;if(r.startsWith("/9j/")||r.startsWith("iVBOR"))return`data:image/jpeg;base64,${r}`;if(r.startsWith("base64://"))return r.replace("base64://","")}return r},f=r=>{console.error("Image failed to load:",r.target.src),r.target.src=D("placeholder.jpg"),r.target.onerror=function(){const e=r.target.parentNode;if(e){const l=document.createElement("div");l.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <path d="M12 6v12M6 12h12" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `,l.className="broken-image rounded w-16 h-16 flex items-center justify-center bg-light-neutral-200 dark:bg-dark-neutral-200",e.replaceChild(l,r.target)}}},S=async()=>{try{g.value=!0;const r=await V.getProducts();s.value=r.map(e=>({...e,images:Array.isArray(e.images)?e.images:[e.imageUrl||e.image]}))}catch(r){console.error("Failed to load products:",r)}finally{g.value=!1}},h=u("name"),_=u("asc"),C=u("all"),j=b(()=>s.value.filter(r=>r.stock<5).length),z=b(()=>s.value.filter(r=>r.featured).length),W=b(()=>s.value.reduce((r,e)=>r+e.price*e.stock,0)),H=b(()=>[...new Set(s.value.map(r=>r.category))]),B=b(()=>{let r=[...s.value];if(C.value!=="all"&&(r=r.filter(l=>l.category===C.value)),m.value){const l=m.value.toLowerCase();r=r.filter(a=>a.name.toLowerCase().includes(l)||a.category.toLowerCase().includes(l)||a.description.toLowerCase().includes(l))}const e=(l,a)=>typeof l[h.value]=="string"?l[h.value].localeCompare(a[h.value]):Number(l[h.value])-Number(a[h.value]);return r.sort((l,a)=>_.value==="asc"?e(l,a):e(a,l)),r}),O=async()=>{if(x.value)try{await V.deleteProduct(x.value.id);const r=s.value.findIndex(e=>e.id===x.value.id);r!==-1&&s.value.splice(r,1),y.value=!1,x.value=null}catch(r){console.error("Failed to delete product:",r)}},R=r=>{k.push(`/admin/products/edit/${r.id}`)},J=r=>{x.value=r,y.value=!0},p=r=>{h.value===r?_.value=_.value==="asc"?"desc":"asc":(h.value=r,_.value="asc")};return U(S),(r,e)=>{const l=rt("router-link");return n(),d("div",yt,[t("div",ft,[t("div",ht,[t("div",null,[w(st,{items:[{text:"Dashboard",path:"/admin"},{text:"Products"}]}),e[11]||(e[11]=t("h1",{class:"text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2"},"Manage Products",-1))]),w(l,{to:"/admin/products/new",class:"bg-btn-primary hover:bg-btn-primary-hover dark:hover:bg-btn-primary-dark text-white py-2 px-4 rounded-btn flex items-center shadow-btn hover:shadow-btn-hover transition-btn duration-200"},{default:v(()=>e[12]||(e[12]=[t("span",{class:"mr-2"},"Add New Product",-1),t("span",{class:"text-xl"},"+",-1)])),_:1})]),t("div",pt,[t("div",kt,[e[13]||(e[13]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Total Products",-1)),t("p",vt,i(s.value.length),1),e[14]||(e[14]=t("p",{class:"text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1"},"Active listings",-1))]),t("div",bt,[e[15]||(e[15]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Low Stock",-1)),t("p",wt,i(j.value),1),t("div",_t,[t("div",Ct,[t("div",{class:"h-2 rounded-full bg-orange-500 transition-all duration-300",style:I(`width: ${j.value/s.value.length*100}%`)},null,4)])])]),t("div",$t,[e[16]||(e[16]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Featured",-1)),t("p",St,i(z.value),1),t("p",Pt,i((z.value/s.value.length*100).toFixed(1))+"% of products ",1)]),t("div",jt,[e[17]||(e[17]=t("h3",{class:"text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"},"Total Value",-1)),t("p",zt,i(Z(ot)(W.value)),1),e[18]||(e[18]=t("p",{class:"text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1"},"Inventory worth",-1))])]),t("div",Bt,[t("div",Et,[t("div",Lt,[L(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=a=>m.value=a),placeholder:"Search products...",class:"w-full p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"},null,512),[[tt,m.value]])]),t("div",null,[L(t("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>C.value=a),class:"p-2 border border-light-neutral-300 dark:border-dark-neutral-600 rounded bg-light-primary dark:bg-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"},[e[19]||(e[19]=t("option",{value:"all"},"All Categories",-1)),(n(!0),d(M,null,N(H.value,a=>(n(),d("option",{key:a,value:a},i(a),9,Mt))),128))],512),[[et,C.value]])])])]),t("div",Nt,[t("div",Vt,[t("table",At,[t("thead",Dt,[t("tr",null,[t("th",Ft,[t("button",{onClick:e[2]||(e[2]=a=>p("image"))}," Image ")]),t("th",It,[t("button",{onClick:e[3]||(e[3]=a=>p("name"))}," Name ")]),t("th",Tt,[t("button",{onClick:e[4]||(e[4]=a=>p("category"))}," Category ")]),t("th",Ut,[t("button",{onClick:e[5]||(e[5]=a=>p("price"))}," Price ")]),t("th",qt,[t("button",{onClick:e[6]||(e[6]=a=>p("stock"))}," Stock ")]),t("th",Wt,[t("button",{onClick:e[7]||(e[7]=a=>p("featured"))}," Featured ")]),t("th",Ht,[t("button",{onClick:e[8]||(e[8]=a=>p("actions"))}," Actions ")])])]),t("tbody",null,[g.value?(n(),d("tr",Ot,[t("td",Rt,[w(nt)])])):B.value.length===0?(n(),d("tr",Jt,e[20]||(e[20]=[t("td",{colspan:"7",class:"py-4 text-center text-light-text-secondary dark:text-dark-text-secondary"}," No products found ",-1)]))):$("",!0),(n(!0),d(M,null,N(B.value,a=>{var E;return n(),d("tr",{key:a.id,class:"border-b border-light-neutral-200 dark:border-dark-neutral-600 hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-800 transition-colors"},[t("td",Qt,[t("div",Yt,[t("img",{src:c(((E=a.images)==null?void 0:E[0])||a.imageUrl||a.image),alt:a.name,class:"w-full h-full object-cover",onError:f},null,40,Gt)])]),t("td",Kt,i(a.name),1),t("td",Xt,i(a.category),1),t("td",Zt,"$"+i(a.price.toFixed(2)),1),t("td",te,i(a.stock),1),t("td",ee,[a.featured?(n(),d("span",re,"Yes")):(n(),d("span",ae,"No"))]),t("td",oe,[t("div",se,[t("button",{onClick:Q=>R(a),class:"text-accent-quaternary dark:text-accent-quaternary hover:text-accent-quaternary/80 dark:hover:text-accent-quaternary/80 transition-colors"}," Edit ",8,le),t("button",{onClick:Q=>J(a),class:"text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"}," Delete ",8,ne)])])])}),128))])])])]),y.value?(n(),q(gt,{key:0,onClose:e[10]||(e[10]=a=>y.value=!1)},{header:v(()=>e[21]||(e[21]=[t("h3",{class:"text-xl font-medium text-light-text-primary dark:text-dark-text-primary"},"Confirm Delete",-1)])),body:v(()=>{var a;return[t("p",de,' Are you sure you want to delete "'+i((a=x.value)==null?void 0:a.name)+'"? This action cannot be undone. ',1)]}),footer:v(()=>[t("div",ie,[w(F,{variant:"secondary",onClick:e[9]||(e[9]=a=>y.value=!1)},{default:v(()=>e[22]||(e[22]=[A(" Cancel ")])),_:1}),w(F,{variant:"danger",onClick:O},{default:v(()=>e[23]||(e[23]=[A(" Delete ")])),_:1})])]),_:1})):$("",!0)])])}}},me=X(ce,[["__scopeId","data-v-3f08fffb"]]);export{me as default};
//# sourceMappingURL=AdminProductsView-B2WduuO_.js.map
