document.addEventListener("DOMContentLoaded",()=>results);const dataURL="http://localhost:8080/assets/data/datafile.json",projectDiv=document.querySelector(".project-div"),results=fetch(dataURL).then(e=>e.json()).then(e=>{e.projects.forEach(e=>{const t=document.createElement("div");t.className="project-block";const n=e.image,c=document.createElement("div");if(c.className="project-images",1===n.length){const t=document.createElement("img");t.src=n[0],t.alt=e.altText,c.append(t)}else n.length>1&&n.forEach(t=>{const n=document.createElement("img");n.src=t,n.alt=e.altText,c.append(n)});t.append(c);const a=document.createElement("h4");a.innerHTML=e.name,a.className="project-name",t.append(a);const o=document.createElement("p");o.innerHTML=e.description,o.className="project-desc",t.append(o);const s=document.createElement("p");if(s.innerHTML=e.tech,s.className="project-tech",t.append(s),""!==e.siteLink){const n=document.createElement("a");n.href=e.siteLink,n.innerHTML="View Project",n.className="project-site",t.append(n)}const r=document.createElement("a");r.href=e.codeLink,r.innerHTML="View the Code",r.className="project-code",t.append(r),projectDiv.append(t)})});
//# sourceMappingURL=scripts.js.map