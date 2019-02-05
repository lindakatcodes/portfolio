
document.addEventListener('DOMContentLoaded', () => results);

const dataURL = `http://localhost:8080/assets/data/datafile.json`;

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
      // Then, if there's only one image, create a single tag and set the src, then add to image block
      if (pImages.length === 1) {
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
      }
      
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

      if (project.siteLink !== "") {
        const psitelink = document.createElement('a');
        psitelink.href = project.siteLink;
        psitelink.innerHTML = 'View Project';
        psitelink.className = 'project-site';
        pblock.append(psitelink);
      }

      const pcodelink = document.createElement('a');
      pcodelink.href = project.codeLink;
      pcodelink.innerHTML = 'View the Code';
      pcodelink.className = 'project-code';
      pblock.append(pcodelink);

      projectDiv.append(pblock);
    })
  });