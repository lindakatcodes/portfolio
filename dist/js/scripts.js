document.addEventListener("DOMContentLoaded",()=>results);const dataURL="http://localhost:8080/assets/data/datafile.json",projectDiv=document.querySelector(".project-div"),results=fetch(dataURL).then(e=>e.json()).then(e=>{e.projects.forEach(e=>{const t=document.createElement("div");t.className="project-block";const n=e.image,c=document.createElement("div");if(c.className="project-images",1===n.length){const t=document.createElement("img");t.src=n[0],t.alt=e.altText,c.append(t)}else n.length>1&&n.forEach(t=>{const n=document.createElement("img");n.src=t,n.alt=e.altText,c.append(n)});t.append(c);const a=document.createElement("h4");a.innerHTML=e.name,a.className="project-name",t.append(a);const o=document.createElement("p");o.innerHTML=e.description,o.className="project-desc",t.append(o);const s=document.createElement("p");s.innerHTML=e.tech,s.className="project-tech",t.append(s);const r=document.createElement("div");if(r.className="project-links",""!==e.siteLink){const t=document.createElement("a");t.href=e.siteLink,t.innerHTML="View Project",t.className="project-site",r.append(t)}const d=document.createElement("a");d.href=e.codeLink,d.innerHTML="View the Code",d.className="project-code",r.append(d),t.append(r),projectDiv.append(t)})});
//# sourceMappingURL=scripts.js.map