document.addEventListener("DOMContentLoaded",()=>results);const dataURL="http://localhost:8080/assets/data/datafile.json",projectDiv=document.querySelector(".project-div"),results=fetch(dataURL).then(e=>e.json()).then(e=>{e.projects.forEach(e=>{const t=document.createElement("div");t.className="project-block";const n=e.image,c=document.createElement("div");c.className="project-images",n.forEach(t=>{const n=document.createElement("img");console.log(t),n.srcset=`\n        ${t[0]} 420w,\n        ${t[1]} 800w,\n        ${t[2]}`,n.src=t[2],n.alt=e.altText,c.append(n)}),t.append(c);const a=document.createElement("h4");a.innerHTML=e.name,a.className="project-name",t.append(a);const s=document.createElement("p");s.innerHTML=e.description,s.className="project-desc",t.append(s);const o=document.createElement("p");o.innerHTML=e.tech,o.className="project-tech",t.append(o);const d=document.createElement("div");if(d.className="project-links",""!==e.siteLink){const t=document.createElement("a");t.href=e.siteLink,t.innerHTML="View Project",t.className="project-site",d.append(t)}const r=document.createElement("a");r.href=e.codeLink,r.innerHTML="View the Code",r.className="project-code",d.append(r),""!=e.siteLink&&""!=e.codeLink||d.classList.add("single-button"),t.append(d),projectDiv.append(t)})});
//# sourceMappingURL=scripts.js.map