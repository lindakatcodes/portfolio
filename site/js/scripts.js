// Load in projects once page is ready
document.addEventListener('DOMContentLoaded', () => results);

// address for projects/certificates
const dataURL = `http://localhost:8080/assets/data/datafile.json`;
const onlineURL = `https://version6.lindakat.com/assets/data/datafile.json`;

// Save the project & certificate sections from the HTML
const projectDiv = document.querySelector('.project-section');
const certDiv = document.querySelector('.certs');

/* Grab data from the datafile and display on site */
const results = fetch(dataURL)
  .then(res => res.json())
  .then(res => {
    // First - projects
    const projects = res.projects;
    projects.forEach(project => {
      const pblock = document.createElement('div');
      pblock.className = 'project-block';

      const pname = document.createElement('h4');
      pname.innerHTML = project.name;
      pname.className = 'project-name';
      pblock.append(pname);
      
      /* For images: */
      // First, grab the image data from datafile & store it
      const pImages = project.image;    
            
      // Next, make a var for the image block as a whole
      const pimgs = document.createElement('div');
      pimgs.className = 'project-images';
      
      // if there's more than 1 image, add a special class name for styling purposes
      if (pImages.length > 1) {
        pimgs.classList.add('multi-img');
      }

      // Then, build the img tag, with srcset and alt text included
      pImages.forEach(image => {
        const thisImg = document.createElement('img');
        thisImg.srcset = `
        ${image[0]} 420w,
        ${image[1]} 800w,
        ${image[2]}`;
        thisImg.src = image[2];
        thisImg.alt = project.altText;
        thisImg.sizes = `(max-width: 420px) 90vw, (max-width: 800px) 50vw, 40vw`;
        pimgs.append(thisImg);
      })
      
      // Finally, add the image block to the pblock
      pblock.append(pimgs);

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

    // Then - certificates
    const certs = res.certificates;
    certs.forEach(cert => {
      const cFig = document.createElement('figure');
      cFig.className = 'cert-block';

      const cImg = document.createElement('img');
      cImg.srcset = `
      ${cert.cert[0]} 420w,
      ${cert.cert[1]} 800w,
      ${cert.cert[2]}`;
      cImg.src = cert.cert[2];
      cImg.alt = `Certificate earned for completion of ${cert.class} course`;
      cImg.sizes = `(max-width: 420px) 90vw, (max-width: 800px) 50vw, 40vw`;
      cFig.append(cImg);
      
      const cCaption = document.createElement('figcaption');
      cCaption.innerText = cert.class;
      cCaption.className = 'cert-caption';

      cFig.append(cCaption);

      certDiv.append(cFig);
      })
  });
