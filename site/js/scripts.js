// Load in projects once page is ready
document.addEventListener('DOMContentLoaded', () => results);

// address for projects/certificates
const dataURL = `http://localhost:8080/assets/data/datafile.json`;

/* Build Project HTMl & Add to Site */
const projectDiv = document.querySelector('.project-div');

const results = fetch(dataURL)
  .then(res => res.json())
  .then(res => {
    const projects = res.projects;
    projects.forEach(project => {
      const pblock = document.createElement('div');
      pblock.className = 'project-block';
      
      /* For images: */
      // First, grab the image data from datafile & store it
      const pImages = project.image;       
      // Next, make a var for the image block as a whole
      const pimgs = document.createElement('div');
      pimgs.className = 'project-images';
      
      // Then, build the img tag, with srcset and alt text included
      pImages.forEach(image => {
        const thisImg = document.createElement('img');
        console.log(image);
        thisImg.srcset = `
        ${image[0]} 420w,
        ${image[1]} 800w,
        ${image[2]}`;
        thisImg.src = image[2];
        thisImg.alt = project.altText;
        pimgs.append(thisImg);
      })
      
      
      // Then, if there's only one image, create a single tag and set the src, then add to image block
      /* if (pImages.length === 1) {
        const pimg = document.createElement('img');
        pimg.src = pImages[0];
        pimg.alt = project.altText;
        pimgs.append(pimg);
      } else if (pImages.length > 1) {
        // If there's multiple, create a tag for each one - add each to the image block
        pImages.forEach(image => {
          const thisImg = document.createElement('img');
          thisImg.src = image;
          thisImg.alt = project.altText;
          pimgs.append(thisImg);
        }); 
      } */
      
      // Finally, add the image block to the pblock
      pblock.append(pimgs);

      const pname = document.createElement('h4');
      pname.innerHTML = project.name;
      pname.className = 'project-name';
      pblock.append(pname);

      const pdesc = document.createElement('p');
      pdesc.innerHTML = project.description;
      pdesc.className = 'project-desc';
      pblock.append(pdesc);

      const ptech = document.createElement('p');
      ptech.innerHTML = project.tech;
      ptech.className = 'project-tech';
      pblock.append(ptech);

      const plinks = document.createElement('div');
      plinks.className = 'project-links';

      if (project.siteLink !== "") {
        const psitelink = document.createElement('a');
        psitelink.href = project.siteLink;
        psitelink.innerHTML = 'View Project';
        psitelink.className = 'project-site';
        plinks.append(psitelink);
      }

      const pcodelink = document.createElement('a');
      pcodelink.href = project.codeLink;
      pcodelink.innerHTML = 'View the Code';
      pcodelink.className = 'project-code';
      plinks.append(pcodelink);

      if (project.siteLink == "" || project.codeLink == "") {
        plinks.classList.add("single-button");
      }

      pblock.append(plinks);

      projectDiv.append(pblock);
    })
  });