import"./assets/modulepreload-polyfill-3cfb730f.js";import{i,f as D}from"./assets/vendor-77e16229.js";i.settings({position:"topRight"});const f=document.getElementById("datetime-picker"),o=document.querySelector("[data-start]"),e=document.querySelectorAll(".timer .value");let r=null,h=null;const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],b()}};D(f,C);function b(){!r||r<=new Date?(i.error({title:"Error",message:"Please choose a date in the future"}),o.disabled=!0):(o.disabled=!1,i.success({title:"Success",message:"Correct date"}))}function n(t){return t<10?"0"+t:t}function m(){const s=r-new Date;if(s<=0){clearInterval(h),e.forEach(c=>c.textContent="00");return}const{days:u,hours:d,minutes:l,seconds:a}=g(s);e[0].textContent=n(u),e[1].textContent=n(d),e[2].textContent=n(l),e[3].textContent=n(a)}o.addEventListener("click",t=>{o.disabled=!0,f.disabled=!0,m(),h=setInterval(m,1e3)});function g(t){const a=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),y=Math.floor(t%864e5%36e5/6e4),p=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:c,minutes:y,seconds:p}}
//# sourceMappingURL=commonHelpers.js.map
