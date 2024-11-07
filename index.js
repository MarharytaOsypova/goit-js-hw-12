import{i as s,S as p}from"./assets/vendor-BrddEoy-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m="46831660-d1aa08367accf9e9e1755dc5b",h="https://pixabay.com/api/";function g(n,o=1){return fetch(`${h}?key=${m}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=12`).then(r=>{if(!r.ok)throw new Error("Network response was not ok");return r.json()}).then(r=>r.hits).catch(r=>{throw console.error("Error fetching images:",r),r})}function y(n){const o=document.querySelector(".gallery");o.innerHTML="";const r=n.map(({webformatURL:i,largeImageURL:e,tags:t,likes:a,views:u,comments:d,downloads:f})=>`
        <div class="photo-card">
            <a href="${e}" data-lightbox="image" data-title="${t}">
                <img src="${i}" alt="${t}" loading="lazy" />
            </a>
            <div class="info">
                <p><b>Likes:</b> ${a}</p>
                <p><b>Views:</b> ${u}</p>
                <p><b>Comments:</b> ${d}</p>
                <p><b>Downloads:</b> ${f}</p>
            </div>
        </div>
    `).join("");o.insertAdjacentHTML("beforeend",r)}const c=document.querySelector(".search-form"),l=document.querySelector(".loader");c.addEventListener("submit",n=>{n.preventDefault();const o=c.elements.query.value.trim();if(!o){s.error({title:"Error",message:"Please enter a search term."});return}l.style.display="block",g(o).then(r=>{r.length===0?s.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):(y(r),new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh())}).catch(r=>{s.error({title:"Error",message:"Something went wrong. Please try again."})}).finally(()=>{l.style.display="none"})});
//# sourceMappingURL=index.js.map
