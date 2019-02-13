document.addEventListener("DOMContentLoaded",()=>results);const dataURL="http://localhost:8080/assets/data/datafile.json",projectDiv=document.querySelector(".project-section"),certDiv=document.querySelector(".certs"),results=fetch(dataURL).then(e=>e.json()).then(e=>{e.projects.forEach(e=>{const t=document.createElement("div");t.className="project-block";const c=document.createElement("h4");c.innerHTML=e.name,c.className="project-name",t.append(c);const n=e.image,a=document.createElement("div");a.className="project-images",n.length>1&&a.classList.add("multi-img"),n.forEach(t=>{const c=document.createElement("img");c.srcset=`\n        ${t[0]} 420w,\n        ${t[1]} 800w,\n        ${t[2]}`,c.src=t[2],c.alt=e.altText,c.sizes="(max-width: 420px) 90vw, (max-width: 800px) 50vw, 40vw",a.append(c)}),t.append(a);const s=document.createElement("p");s.innerHTML=e.description,s.className="project-desc",t.append(s);const o=document.createElement("p");o.innerHTML=e.tech,o.className="project-tech",t.append(o);const r=document.createElement("div");if(r.className="project-links",""!==e.siteLink){const t=document.createElement("a");t.href=e.siteLink,t.innerHTML="View Project",t.className="project-site",r.append(t)}const i=document.createElement("a");i.href=e.codeLink,i.innerHTML="View the Code",i.className="project-code",r.append(i),""!=e.siteLink&&""!=e.codeLink||r.classList.add("single-button"),t.append(r),projectDiv.append(t)}),e.certificates.forEach(e=>{const t=document.createElement("figure");t.className="cert-block";const c=document.createElement("img");c.srcset=`\n      ${e.cert[0]} 420w,\n      ${e.cert[1]} 800w,\n      ${e.cert[2]}`,c.src=e.cert[2],c.alt=`Certificate earned for completion of ${e.class} course`,c.sizes="(max-width: 420px) 90vw, (max-width: 800px) 50vw, 40vw",t.append(c);const n=document.createElement("figcaption");n.innerText=e.class,n.className="cert-caption",t.append(n),certDiv.append(t)})});
//# sourceMappingURL=scripts.js.map