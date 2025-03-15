import{_ as we,J as Pe,u as Ce,r as v,B as Se,d as B,e as _e,f as R,I as Me,c,K as N,a as t,t as g,h as De,w as je,C as Ee,l as G,g as D,E as b,H as S,ah as W,F as I,k as q,ai as ee,i as M,D as k,z as te,x as re,o as p}from"./index-C4z9Z3NH.js";/*!
 * paypal-js v8.2.0 (2025-01-23T17:26:53.747Z)
 * Copyright 2020-present, PayPal, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(a,l){var s={};for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&l.indexOf(o)<0&&(s[o]=a[o]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,o=Object.getOwnPropertySymbols(a);d<o.length;d++)l.indexOf(o[d])<0&&Object.prototype.propertyIsEnumerable.call(a,o[d])&&(s[o[d]]=a[o[d]]);return s}function Oe(a,l){var s=document.querySelector('script[src="'.concat(a,'"]'));if(s===null)return null;var o=le(a,l),d=s.cloneNode();if(delete d.dataset.uidAuto,Object.keys(d.dataset).length!==Object.keys(o.dataset).length)return null;var u=!0;return Object.keys(d.dataset).forEach(function(y){d.dataset[y]!==o.dataset[y]&&(u=!1)}),u?s:null}function Ve(a){var l=a.url,s=a.attributes,o=a.onSuccess,d=a.onError,u=le(l,s);u.onerror=d,u.onload=o,document.head.insertBefore(u,document.head.firstElementChild)}function Be(a){var l=a.sdkBaseUrl,s=a.environment,o=Ne(a,["sdkBaseUrl","environment"]),d=l||Ie(s),u=o,y=Object.keys(u).filter(function(P){return typeof u[P]<"u"&&u[P]!==null&&u[P]!==""}).reduce(function(P,_){var O=u[_].toString();return _=Ue(_),_.substring(0,4)==="data"||_==="crossorigin"?P.attributes[_]=O:P.queryParams[_]=O,P},{queryParams:{},attributes:{}}),w=y.queryParams,j=y.attributes;return w["merchant-id"]&&w["merchant-id"].indexOf(",")!==-1&&(j["data-merchant-id"]=w["merchant-id"],w["merchant-id"]="*"),{url:"".concat(d,"?").concat(Ae(w)),attributes:j}}function Ue(a){var l=function(s,o){return(o?"-":"")+s.toLowerCase()};return a.replace(/[A-Z]+(?![a-z])|[A-Z]/g,l)}function Ae(a){var l="";return Object.keys(a).forEach(function(s){l.length!==0&&(l+="&"),l+=s+"="+a[s]}),l}function Ie(a){return a==="sandbox"?"https://www.sandbox.paypal.com/sdk/js":"https://www.paypal.com/sdk/js"}function le(a,l){l===void 0&&(l={});var s=document.createElement("script");return s.src=a,Object.keys(l).forEach(function(o){s.setAttribute(o,l[o]),o==="data-csp-nonce"&&s.setAttribute("nonce",l["data-csp-nonce"])}),s}function qe(a,l){if(l===void 0&&(l=Promise),se(a,l),typeof document>"u")return l.resolve(null);var s=Be(a),o=s.url,d=s.attributes,u=d["data-namespace"]||"paypal",y=ae(u);return d["data-js-sdk-library"]||(d["data-js-sdk-library"]="paypal-js"),Oe(o,d)&&y?l.resolve(y):Te({url:o,attributes:d},l).then(function(){var w=ae(u);if(w)return w;throw new Error("The window.".concat(u," global variable is not available."))})}function Te(a,l){l===void 0&&(l=Promise),se(a,l);var s=a.url,o=a.attributes;if(typeof s!="string"||s.length===0)throw new Error("Invalid url.");if(typeof o<"u"&&typeof o!="object")throw new Error("Expected attributes to be an object.");return new l(function(d,u){if(typeof document>"u")return d();Ve({url:s,attributes:o,onSuccess:function(){return d()},onError:function(){var y=new Error('The script "'.concat(s,'" failed to load. Check the HTTP status code and response body in DevTools to learn more.'));return u(y)}})})}function ae(a){return window[a]}function se(a,l){if(typeof a!="object"||a===null)throw new Error("Expected an options object.");var s=a.environment;if(s&&s!=="production"&&s!=="sandbox")throw new Error('The `environment` option must be either "production" or "sandbox".');if(typeof l<"u"&&typeof l!="function")throw new Error("Expected PromisePonyfill to be a function.")}const ze="YOUR_PAYPAL_CLIENT_ID",T={async initializePayPal(){try{return await qe({"client-id":ze,currency:"USD",intent:"capture"})}catch(a){throw console.error("Failed to load PayPal JS SDK:",a),a}},createOrder(a,l){return{purchase_units:[{amount:{currency_code:"USD",value:a.toFixed(2),breakdown:{item_total:{currency_code:"USD",value:a.toFixed(2)}}},items:l.map(s=>({name:s.name,unit_amount:{currency_code:"USD",value:s.price.toFixed(2)},quantity:s.quantity.toString()}))}]}},async handlePayPalError(a){throw console.error("PayPal Error:",a),a}},Xe={class:"bg-light-primary dark:bg-dark-primary min-h-screen pb-16"},$e={key:0,class:"container mx-auto px-4"},Ke={class:"max-w-3xl mx-auto bg-light-secondary dark:bg-dark-secondary shadow-lg rounded-lg overflow-hidden"},Le={class:"bg-green-50 dark:bg-green-900 p-6 sm:p-10 text-center"},Fe={class:"text-green-700 dark:text-green-300 text-lg"},Ye={class:"mt-8 flex justify-center"},He={key:1,class:"container mx-auto px-4 mb-8"},Re={class:"max-w-3xl mx-auto bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 p-4 rounded-lg flex items-start"},We={class:"ml-3"},Je={class:"text-red-700 dark:text-red-300 font-medium"},Ze={key:2,class:"container mx-auto px-4"},Qe={class:"grid grid-cols-1 lg:grid-cols-3 lg:gap-8"},Ge={class:"lg:col-span-2"},et={class:"bg-light-secondary dark:bg-dark-secondary shadow rounded-lg overflow-hidden mb-8"},tt={class:"p-6"},rt={class:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"},at={class:"mb-6"},lt={class:"mb-6"},st=["value"],nt={key:0,class:"mb-6"},ot=["value"],dt={key:1,class:"mb-6"},it={class:"mt-6"},ut={class:"flex items-center"},ct={class:"bg-light-secondary dark:bg-dark-secondary shadow rounded-lg overflow-hidden mb-8"},pt={class:"p-6"},mt={class:"border-b border-light-neutral-200 dark:border-dark-neutral-700"},vt={class:"-mb-px flex space-x-8"},yt=["onClick"],xt={key:0,class:"mt-6"},gt={class:"mb-6"},bt={key:1,class:"mt-6"},ht={class:"bg-light-neutral-100 dark:bg-dark-neutral-800 p-4 rounded-md"},kt={class:"mt-4"},ft={class:"flex items-center"},wt={class:"ml-2 text-sm text-light-text-primary dark:text-dark-text-primary"},Pt={key:2,class:"mt-6"},Ct={class:"p-6"},St={class:"mb-6"},_t={class:"mb-6"},Mt={class:"relative"},Dt={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},jt={class:"relative"},Et={class:"absolute inset-y-0 right-0 pr-3 flex items-center"},Nt={key:0,class:"mt-1 text-sm text-light-neutral-500 dark:text-dark-neutral-500"},Ot={key:3,class:"mt-6"},Vt={class:"bg-light-neutral-100 dark:bg-dark-neutral-800 p-4 rounded-md text-center"},Bt={class:"mx-auto max-w-[200px] mb-4"},Ut=["disabled"],At={key:0,class:"animate-spin -ml-1 mr-2 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},It={class:"mt-10 lg:mt-0"},qt={class:"bg-light-secondary dark:bg-dark-secondary shadow rounded-lg overflow-hidden sticky top-6"},Tt={class:"px-6 py-4"},zt={class:"flow-root"},Xt={class:"-my-4 divide-y divide-light-neutral-200 dark:divide-dark-neutral-700"},$t={class:"flex-shrink-0 w-16 h-16 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-md overflow-hidden"},Kt=["src","alt"],Lt={class:"ml-4 flex-1 flex flex-col"},Ft={class:"flex justify-between text-sm font-medium text-light-text-primary dark:text-dark-text-primary"},Yt={class:"ml-4"},Ht={class:"mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary"},Rt={class:"flex-1 flex items-end justify-between text-sm"},Wt={class:"text-light-text-secondary dark:text-dark-text-secondary"},Jt={class:"border-t border-light-neutral-200 dark:border-dark-neutral-700 px-6 py-4 space-y-3"},Zt={class:"flex justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary"},Qt={class:"flex justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary"},Gt={key:0},er={key:1,class:"text-green-600 dark:text-green-400"},tr={class:"flex justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary"},rr={class:"pt-3 border-t border-light-neutral-200 dark:border-dark-neutral-700"},ar={class:"flex justify-between text-base font-medium text-light-text-primary dark:text-dark-text-primary"},lr={__name:"CheckoutView",setup(a){const l=Me(),s=Pe(),o=Ce(),d=v(!1),u=v(""),y=v(""),w=v(null),j=v(!1),P=v(!0),_=["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Kitengela","Thika","Machakos","Kahawa","Ruiru","Athi River","Kiambu","Rongai"],O={Nairobi:["CBD - Kencom House","CBD - Archives","CBD - Afya Centre","Westlands - The Mall","Eastleigh - First Avenue","South B - Capital Center","Karen - Karen Hub"],Kitengela:["Kitengela Mall","EPZ Plaza","Milestone Mall"],Kahawa:["Kahawa West Shopping Center","Kahawa Sukari Mall","Kahawa Wendani Plaza"]},i=v({firstName:"",lastName:"",email:"",phone:"",deliveryMethod:"",city:"",pickupPoint:"",address:""}),z=v([]),ne=()=>{i.value.pickupPoint="",i.value.address=""},oe=()=>{i.value.pickupPoint="",i.value.city&&O[i.value.city]?z.value=O[i.value.city]:z.value=[]},x=v({cardName:"",cardNumber:"",expirationDate:"",cvv:""}),de=[{id:"mobile-money",name:"M-Pesa"},{id:"cash",name:"Cash on Delivery"},{id:"card",name:"Card Payment"},{id:"paypal",name:"PayPal"}],h=v("mobile-money"),U=v({phoneNumber:""}),X=v(!1),$=v(null),J=v(!1),Z=v(!1);v(1),Se(h,async n=>{n==="paypal"&&!J.value&&await ie()});const ie=async()=>{try{const n=await T.initializePayPal();$.value&&(n.Buttons({style:{layout:"vertical",color:"blue",shape:"rect",label:"paypal"},createOrder:async(e,C)=>{const r=T.createOrder(f.value+m.value*.08,E.value);return C.order.create(r)},onApprove:async(e,C)=>{Z.value=!0;try{const r=await C.order.capture();await ue(r)}catch(r){await T.handlePayPalError(r)}finally{Z.value=!1}},onError:async e=>{await T.handlePayPalError(e)}}).render($.value),J.value=!0)}catch(n){console.error("Failed to initialize PayPal:",n),u.value="Failed to initialize PayPal. Please try another payment method."}},ue=async n=>{try{const e={...ce(),paymentMethod:"paypal",paymentDetails:{paypal:!0,orderId:n.id,status:n.status,payerEmail:n.payer.email_address},status:"paid"};await R.createOrder(e),o.clearCart(),y.value="Order placed successfully! Payment completed via PayPal.",setTimeout(()=>{l.push("/account")},3e3)}catch(e){console.error("Error processing PayPal order:",e),u.value="Failed to process PayPal payment. Please contact support."}},ce=()=>({userId:s.user.uid,orderNumber:`ORD-${Date.now().toString().slice(-6)}`,items:E.value,subtotal:m.value,shipping:V.value,total:f.value+m.value*.08,shippingInfo:{...i.value},orderDate:new Date,estimatedDelivery:new Date(Date.now()+7*24*60*60*1e3)}),Q=B(()=>{switch(h.value){case"mobile-money":return/^254[0-9]{9}$/.test(U.value.phoneNumber);case"cash":return X.value;case"card":return x.value.cardNumber&&x.value.cardName&&x.value.expirationDate&&x.value.cvv;case"paypal":return!0;default:return!1}}),pe=()=>{if(d.value)return"Processing...";switch(h.value){case"mobile-money":return`Pay with M-Pesa - ${k(f.value+m.value*.08)}`;case"cash":return`Place Order - Pay ${k(f.value+m.value*.08)} on Delivery`;case"card":return`Pay ${k(f.value+m.value*.08)}`;case"paypal":return`Proceed to PayPal - ${k(f.value+m.value*.08)}`;default:return`Complete Order - ${k(f.value+m.value*.08)}`}},me=()=>{console.log("Redirecting to PayPal...")},ve=()=>{window.open("/digital-wallet/ways-to-pay/add-payment-method","WIPaypal","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700")},E=B(()=>o.cart),m=B(()=>o.subtotal),V=B(()=>m.value>=100?0:10),f=B(()=>m.value+V.value);_e(async()=>{if(s.user)try{const n=await R.getUserProfile(s.user.uid);w.value=n,n&&(i.value={...i.value,firstName:n.firstName||"",lastName:n.lastName||"",email:n.email||s.user.email,phone:n.phone||"",address:n.address||""})}catch(n){console.error("Error loading user profile:",n)}else l.push("/login?redirect=checkout");E.value.length===0&&l.push("/cart")});const ye=async()=>{if(d.value=!0,u.value="",E.value.length===0){u.value="Your cart is empty",d.value=!1;return}try{const n=new Date,e=`ORD-${Date.now().toString().slice(-6)}`,C={userId:s.user.uid,orderNumber:e,items:E.value,subtotal:m.value,shipping:V.value,total:f.value,shippingInfo:{...i.value},paymentMethod:h.value,paymentDetails:xe(),status:ge(),orderDate:n,estimatedDelivery:new Date(n.setDate(n.getDate()+7))},r=await R.createOrder(C);h.value==="mobile-money"&&await he(r.id),o.clearCart(),y.value=be(e),setTimeout(()=>{l.push("/account")},3e3)}catch(n){u.value="Failed to place order. Please try again.",console.error("Error placing order:",n)}finally{d.value=!1}},xe=()=>{switch(h.value){case"mobile-money":return{phoneNumber:U.value.phoneNumber};case"cash":return{cashOnDelivery:!0};case"card":return{cardName:x.value.cardName,lastFourDigits:x.value.cardNumber.slice(-4),cardType:ke(x.value.cardNumber)};case"paypal":return{paypal:!0};default:return{}}},ge=()=>{switch(h.value){case"mobile-money":return"awaiting_payment";case"cash":return"pending";case"card":case"paypal":return"processing";default:return"pending"}},be=n=>{switch(h.value){case"mobile-money":return`Order ${n} placed! Please check your phone for the M-Pesa payment prompt.`;case"cash":return`Order ${n} placed! Please have ${k(f.value+m.value*.08)} ready for delivery.`;case"card":return`Order ${n} placed successfully! Your card has been charged.`;case"paypal":return`Order ${n} placed successfully! Payment completed via PayPal.`;default:return`Order placed successfully! Your order number is ${n}.`}},he=async n=>{try{console.log("Initiating M-Pesa payment for order:",n)}catch(e){throw console.error("Error initiating M-Pesa payment:",e),e}},ke=n=>{const e=n.replace(/\D/g,"");return/^4/.test(e)?"Visa":/^5[1-5]/.test(e)?"MasterCard":/^3[47]/.test(e)?"American Express":/^6(?:011|5)/.test(e)?"Discover":"Unknown"},fe={mounted(n,e){n.addEventListener("input",C=>{const{value:r}=e;if(!r||!r.value)return;const L=C.target.value.replace(/\D/g,""),F=r.value;let Y="",H=0;for(let A=0;A<F.length&&H<L.length;A++)F[A]==="#"?(Y+=L[H],H++):Y+=F[A];C.target.value=Y})}},K={mounted(n,e){e&&e.value&&fe.mounted(n,e)}};return(n,e)=>{const C=Ee("router-link");return p(),c("div",Xe,[e[57]||(e[57]=N('<div class="bg-light-secondary dark:bg-dark-secondary shadow-sm py-8 mb-8" data-v-ce49e11e><div class="container mx-auto px-4" data-v-ce49e11e><div class="max-w-4xl mx-auto" data-v-ce49e11e><div class="flex flex-col sm:flex-row items-center justify-between gap-4" data-v-ce49e11e><div class="flex items-center w-full sm:w-auto" data-v-ce49e11e><div class="relative" data-v-ce49e11e><div class="w-12 h-12 rounded-full bg-btn-primary text-white flex items-center justify-center font-semibold text-lg" data-v-ce49e11e> 1 </div><div class="absolute -right-4 top-1/2 h-1 w-8 bg-btn-primary hidden sm:block" data-v-ce49e11e></div></div><div class="ml-4" data-v-ce49e11e><p class="font-medium text-btn-primary" data-v-ce49e11e>Cart</p><p class="text-sm text-light-text-secondary dark:text-dark-text-secondary" data-v-ce49e11e>Review items</p></div></div><div class="flex items-center w-full sm:w-auto" data-v-ce49e11e><div class="relative" data-v-ce49e11e><div class="w-12 h-12 rounded-full bg-btn-primary text-white flex items-center justify-center font-semibold text-lg" data-v-ce49e11e> 2 </div><div class="absolute -right-4 top-1/2 h-1 w-8 bg-btn-primary hidden sm:block" data-v-ce49e11e></div><div class="absolute -left-4 top-1/2 h-1 w-8 bg-btn-primary hidden sm:block" data-v-ce49e11e></div></div><div class="ml-4" data-v-ce49e11e><p class="font-medium text-btn-primary" data-v-ce49e11e>Checkout</p><p class="text-sm text-light-text-secondary dark:text-dark-text-secondary" data-v-ce49e11e>Payment details</p></div></div><div class="flex items-center w-full sm:w-auto" data-v-ce49e11e><div class="relative" data-v-ce49e11e><div class="w-12 h-12 rounded-full bg-light-neutral-300 dark:bg-dark-neutral-600 text-light-neutral-600 dark:text-dark-neutral-300 flex items-center justify-center font-semibold text-lg" data-v-ce49e11e> 3 </div><div class="absolute -left-4 top-1/2 h-1 w-8 bg-light-neutral-300 dark:bg-dark-neutral-600 hidden sm:block" data-v-ce49e11e></div></div><div class="ml-4" data-v-ce49e11e><p class="font-medium text-light-neutral-500 dark:text-dark-neutral-400" data-v-ce49e11e>Confirmation</p><p class="text-sm text-light-text-secondary dark:text-dark-text-secondary" data-v-ce49e11e>Order complete</p></div></div></div></div></div></div>',1)),y.value?(p(),c("div",$e,[t("div",Ke,[t("div",Le,[e[18]||(e[18]=N('<div class="flex justify-center mb-5" data-v-ce49e11e><div class="rounded-full bg-green-100 dark:bg-green-800 p-3" data-v-ce49e11e><svg class="h-10 w-10 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ce49e11e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-ce49e11e></path></svg></div></div><h2 class="text-2xl font-bold text-green-800 dark:text-green-200 mb-2" data-v-ce49e11e>Order Placed Successfully!</h2>',2)),t("p",Fe,g(y.value),1),e[19]||(e[19]=t("p",{class:"mt-4 text-light-text-secondary dark:text-dark-text-secondary"},"Redirecting to your account page...",-1)),t("div",Ye,[De(C,{to:"/account",class:"px-6 py-3 bg-accent-primary hover:bg-accent-secondary text-white font-medium rounded-md transition-all"},{default:je(()=>e[17]||(e[17]=[re(" View order details ")])),_:1})])])])])):u.value?(p(),c("div",He,[t("div",Re,[e[21]||(e[21]=t("div",{class:"flex-shrink-0 mt-0.5"},[t("svg",{class:"h-5 w-5 text-red-600 dark:text-red-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})])],-1)),t("div",We,[t("p",Je,g(u.value),1)]),t("button",{onClick:e[0]||(e[0]=r=>u.value=""),class:"ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"},e[20]||(e[20]=[t("svg",{class:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))])])):(p(),c("div",Ze,[t("div",Qe,[t("div",Ge,[t("form",{onSubmit:G(ye,["prevent"])},[t("div",et,[e[35]||(e[35]=N('<div class="bg-light-neutral-100 dark:bg-dark-neutral-800 py-4 px-6 border-b border-light-neutral-200 dark:border-dark-neutral-700" data-v-ce49e11e><div class="flex items-center" data-v-ce49e11e><div class="bg-accent-primary rounded-full h-8 w-8 flex items-center justify-center mr-3" data-v-ce49e11e><svg class="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ce49e11e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-ce49e11e></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-ce49e11e></path></svg></div><h2 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary" data-v-ce49e11e>Shipping Information</h2></div></div>',1)),t("div",tt,[t("div",rt,[t("div",null,[e[22]||(e[22]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"First Name",-1)),b(t("input",{"onUpdate:modelValue":e[1]||(e[1]=r=>i.value.firstName=r),type:"text",required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",placeholder:"Your first name"},null,512),[[S,i.value.firstName]])]),t("div",null,[e[23]||(e[23]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Last Name",-1)),b(t("input",{"onUpdate:modelValue":e[2]||(e[2]=r=>i.value.lastName=r),type:"text",required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",placeholder:"Your last name"},null,512),[[S,i.value.lastName]])]),t("div",null,[e[24]||(e[24]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Email",-1)),b(t("input",{"onUpdate:modelValue":e[3]||(e[3]=r=>i.value.email=r),type:"email",required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",placeholder:"your.email@example.com"},null,512),[[S,i.value.email]])]),t("div",null,[e[25]||(e[25]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Phone",-1)),b(t("input",{"onUpdate:modelValue":e[4]||(e[4]=r=>i.value.phone=r),type:"tel",required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",placeholder:"254XXXXXXXXX"},null,512),[[S,i.value.phone]])])]),t("div",at,[e[27]||(e[27]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Delivery Method",-1)),b(t("select",{"onUpdate:modelValue":e[5]||(e[5]=r=>i.value.deliveryMethod=r),required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",onChange:ne},e[26]||(e[26]=[t("option",{value:""},"Select delivery method",-1),t("option",{value:"delivery"},"Home/Office Delivery",-1),t("option",{value:"pickup"},"Pickup Point",-1)]),544),[[W,i.value.deliveryMethod]])]),t("div",lt,[e[29]||(e[29]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"City",-1)),b(t("select",{"onUpdate:modelValue":e[6]||(e[6]=r=>i.value.city=r),required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",onChange:oe},[e[28]||(e[28]=t("option",{value:""},"Select city",-1)),(p(),c(I,null,q(_,r=>t("option",{key:r,value:r},g(r),9,st)),64))],544),[[W,i.value.city]])]),i.value.deliveryMethod==="pickup"?(p(),c("div",nt,[e[31]||(e[31]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Pickup Point",-1)),b(t("select",{"onUpdate:modelValue":e[7]||(e[7]=r=>i.value.pickupPoint=r),required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all"},[e[30]||(e[30]=t("option",{value:""},"Select pickup point",-1)),(p(!0),c(I,null,q(z.value,r=>(p(),c("option",{key:r,value:r},g(r),9,ot))),128))],512),[[W,i.value.pickupPoint]])])):D("",!0),i.value.deliveryMethod==="delivery"?(p(),c("div",dt,[e[32]||(e[32]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Detailed Address",-1)),b(t("textarea",{"onUpdate:modelValue":e[8]||(e[8]=r=>i.value.address=r),required:"",rows:"3",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",placeholder:"Enter your detailed address (e.g., House/Apartment number, Street name, Estate/Area)"},null,512),[[S,i.value.address]]),e[33]||(e[33]=t("p",{class:"mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary"}," Please provide landmarks or additional directions to help locate your address ",-1))])):D("",!0),t("div",it,[t("div",ut,[b(t("input",{id:"save-info",type:"checkbox","onUpdate:modelValue":e[9]||(e[9]=r=>P.value=r),class:"h-4 w-4 text-accent-primary focus:ring-accent-primary border-light-neutral-300 dark:border-dark-neutral-600 rounded"},null,512),[[ee,P.value]]),e[34]||(e[34]=t("label",{for:"save-info",class:"ml-2 block text-sm text-light-text-primary dark:text-dark-text-primary"}," Save this information for next time ",-1))])])])]),t("div",ct,[e[48]||(e[48]=N('<div class="bg-light-neutral-100 dark:bg-dark-neutral-800 py-4 px-6 border-b border-light-neutral-200 dark:border-dark-neutral-700" data-v-ce49e11e><div class="flex items-center" data-v-ce49e11e><div class="bg-accent-primary rounded-full h-8 w-8 flex items-center justify-center mr-3" data-v-ce49e11e><svg class="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ce49e11e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" data-v-ce49e11e></path></svg></div><h2 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary" data-v-ce49e11e>Payment Method</h2></div></div>',1)),t("div",pt,[t("div",mt,[t("nav",vt,[(p(),c(I,null,q(de,r=>t("button",{key:r.id,onClick:L=>h.value=r.id,class:te([h.value===r.id?"border-accent-primary text-accent-primary":"border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:border-light-neutral-300 dark:hover:border-dark-neutral-700","whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"])},g(r.name),11,yt)),64))])]),h.value==="mobile-money"?(p(),c("div",xt,[t("div",gt,[e[36]||(e[36]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Phone Number",-1)),b(t("input",{"onUpdate:modelValue":e[10]||(e[10]=r=>U.value.phoneNumber=r),type:"tel",required:"",placeholder:"254XXXXXXXXX",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all"},null,512),[[S,U.value.phoneNumber]])]),e[37]||(e[37]=t("p",{class:"text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2"}," You will receive an M-Pesa prompt on your phone to complete the payment. ",-1))])):D("",!0),h.value==="cash"?(p(),c("div",bt,[t("div",ht,[e[38]||(e[38]=t("p",{class:"text-sm text-light-text-primary dark:text-dark-text-primary"}," You will pay in cash when your order is delivered. Please have the exact amount ready. ",-1)),t("div",kt,[t("label",ft,[b(t("input",{type:"checkbox","onUpdate:modelValue":e[11]||(e[11]=r=>X.value=r),class:"h-4 w-4 text-accent-primary focus:ring-accent-primary border-light-neutral-300 dark:border-dark-neutral-600 rounded"},null,512),[[ee,X.value]]),t("span",wt," I agree to pay the full amount of "+g(M(k)(f.value+m.value*.08))+" upon delivery ",1)])])])])):D("",!0),h.value==="card"?(p(),c("div",Pt,[t("div",Ct,[e[45]||(e[45]=N('<div class="mb-8" data-v-ce49e11e><div class="flex items-center justify-between mb-4" data-v-ce49e11e><p class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary" data-v-ce49e11e>Accepted Cards</p><div class="flex space-x-2" data-v-ce49e11e><div class="h-8 w-12 rounded border bg-light-neutral-100 dark:bg-dark-neutral-800 flex items-center justify-center" data-v-ce49e11e><span class="text-xs font-bold text-blue-700" data-v-ce49e11e>VISA</span></div><div class="h-8 w-12 rounded border bg-light-neutral-100 dark:bg-dark-neutral-800 flex items-center justify-center" data-v-ce49e11e><span class="text-xs font-bold text-red-700" data-v-ce49e11e>MC</span></div><div class="h-8 w-12 rounded border bg-light-neutral-100 dark:bg-dark-neutral-800 flex items-center justify-center" data-v-ce49e11e><span class="text-xs font-bold text-blue-900" data-v-ce49e11e>AMEX</span></div></div></div></div>',1)),t("div",St,[e[39]||(e[39]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Name on Card",-1)),b(t("input",{"onUpdate:modelValue":e[12]||(e[12]=r=>x.value.cardName=r),type:"text",required:"",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all"},null,512),[[S,x.value.cardName]])]),t("div",_t,[e[41]||(e[41]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Card Number",-1)),t("div",Mt,[b(t("input",{"onUpdate:modelValue":e[13]||(e[13]=r=>x.value.cardNumber=r),type:"text",required:"",placeholder:"1234 5678 9012 3456",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all"},null,512),[[S,x.value.cardNumber],[M(K),"#### #### #### ####"]]),e[40]||(e[40]=t("div",{class:"absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"},[t("svg",{class:"h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-600",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})])],-1))])]),t("div",Dt,[t("div",null,[e[42]||(e[42]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"Expiration Date",-1)),b(t("input",{"onUpdate:modelValue":e[14]||(e[14]=r=>x.value.expirationDate=r),type:"text",required:"",placeholder:"MM/YY",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all"},null,512),[[S,x.value.expirationDate],[M(K),"##/##"]])]),t("div",null,[e[44]||(e[44]=t("label",{class:"block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"},"CVV",-1)),t("div",jt,[b(t("input",{"onUpdate:modelValue":e[15]||(e[15]=r=>x.value.cvv=r),type:"text",required:"",placeholder:"123",class:"w-full px-4 py-2 border border-light-neutral-300 dark:border-dark-neutral-600 bg-light-secondary dark:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-md focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all",maxlength:"3"},null,512),[[S,x.value.cvv],[M(K),"###"]]),t("div",Et,[t("button",{type:"button",onClick:e[16]||(e[16]=r=>j.value=!j.value),class:"text-light-neutral-400 dark:text-dark-neutral-600 hover:text-light-neutral-500 dark:hover:text-dark-neutral-500 focus:outline-none"},e[43]||(e[43]=[t("svg",{class:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1)]))])]),j.value?(p(),c("div",Nt," The CVV is a 3-digit security code found on the back of your card. ")):D("",!0)])])])])):D("",!0),h.value==="paypal"?(p(),c("div",Ot,[t("div",Vt,[t("div",Bt,[t("a",{href:"/digital-wallet/ways-to-pay/add-payment-method",title:"How PayPal Works",onClick:G(ve,["prevent"]),class:"inline-block"},e[46]||(e[46]=[t("img",{src:"https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg",alt:"PayPal Logo",class:"mx-auto"},null,-1)]))]),e[47]||(e[47]=t("p",{class:"text-sm text-light-text-primary dark:text-dark-text-primary my-4"}," You will be redirected to PayPal to complete your payment securely. ",-1)),t("div",{ref_key:"paypalButtonsContainer",ref:$},null,512),t("button",{type:"button",onClick:me,class:"w-full py-3 bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white font-medium rounded-md transition-all"}," Checkout with PayPal ")])])):D("",!0)])]),t("button",{type:"submit",class:te(["w-full py-4 bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-dark text-white text-lg font-medium rounded-md transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary",{"opacity-75 cursor-not-allowed":d.value||!Q.value}]),disabled:d.value||!Q.value},[d.value?(p(),c("svg",At,e[49]||(e[49]=[t("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1),t("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1)]))):D("",!0),re(" "+g(pe()),1)],10,Ut)],32)]),t("div",It,[t("div",qt,[e[55]||(e[55]=t("div",{class:"bg-light-neutral-100 dark:bg-dark-neutral-800 py-4 px-6 border-b border-light-neutral-200 dark:border-dark-neutral-700"},[t("h2",{class:"text-lg font-bold text-light-text-primary dark:text-dark-text-primary"},"Order Summary")],-1)),t("div",Tt,[t("div",zt,[t("ul",Xt,[(p(!0),c(I,null,q(E.value,r=>(p(),c("li",{key:r.id,class:"py-4 flex"},[t("div",$t,[t("img",{src:r.imageUrl||r.image||"https://placehold.co/64",alt:r.name,class:"w-full h-full object-center object-cover"},null,8,Kt)]),t("div",Lt,[t("div",null,[t("div",Ft,[t("h3",null,g(r.name),1),t("p",Yt,g(M(k)(r.price*r.quantity)),1)]),t("p",Ht,g(r.category||"Jewelry"),1)]),t("div",Rt,[t("p",Wt,"Qty "+g(r.quantity),1)])])]))),128))])])]),t("div",Jt,[t("div",Zt,[e[50]||(e[50]=t("p",null,"Subtotal",-1)),t("p",null,g(M(k)(m.value)),1)]),t("div",Qt,[e[51]||(e[51]=t("p",null,"Shipping",-1)),V.value>0?(p(),c("p",Gt,g(M(k)(V.value)),1)):(p(),c("p",er,"Free"))]),t("div",tr,[e[52]||(e[52]=t("p",null,"Taxes (estimated)",-1)),t("p",null,g(M(k)(m.value*.08)),1)]),t("div",rr,[t("div",ar,[e[53]||(e[53]=t("p",null,"Total",-1)),t("p",null,g(M(k)(f.value+m.value*.08)),1)]),e[54]||(e[54]=t("p",{class:"mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary"},"Shipping and taxes calculated at checkout",-1))])]),e[56]||(e[56]=N('<div class="px-6 pb-6 pt-2" data-v-ce49e11e><div class="mt-2" data-v-ce49e11e><div class="border border-light-neutral-300 dark:border-dark-neutral-600 rounded-md p-4 bg-light-neutral-100 dark:bg-dark-neutral-800" data-v-ce49e11e><div class="flex" data-v-ce49e11e><div class="flex-shrink-0" data-v-ce49e11e><svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ce49e11e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-ce49e11e></path></svg></div><div class="ml-3" data-v-ce49e11e><p class="text-sm text-light-text-primary dark:text-dark-text-primary" data-v-ce49e11e><strong data-v-ce49e11e>Secure checkout</strong> - Your payment information is protected </p></div></div></div></div><div class="mt-4 flex justify-center" data-v-ce49e11e><div class="flex items-center space-x-2" data-v-ce49e11e><svg class="h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ce49e11e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-ce49e11e></path></svg><span class="text-xs text-light-text-secondary dark:text-dark-text-secondary" data-v-ce49e11e>SSL Secure Payment</span></div></div></div>',1))])])])]))])}}},or=we(lr,[["__scopeId","data-v-ce49e11e"]]);export{or as default};
