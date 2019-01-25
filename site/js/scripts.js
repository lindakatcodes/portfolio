
document.addEventListener('DOMContentLoaded', () => results);

const dataURL = `http://localhost:8080/assets/data/datafile.json`;

const dataDiv = document.querySelector('.datadiv');

const results = fetch(dataURL)
  .then(res => res.json())
  .then(res => {
    const projects = res.projects;
    projects.forEach(project => {
      const pblock = document.createElement('div');
      
      const pname = document.createElement('h3');
      pname.innerHTML = project.name;
      pblock.append(pname);

      const pdesc = document.createElement('p');
      pdesc.innerHTML = project.description;
      pblock.append(pdesc);

      const pimg = document.createElement('img');
      pimg.src = project.image;
      pimg.alt = project.altText;
      pblock.append(pimg);

      const plink = document.createElement('a');
      plink.href = project.link;
      plink.innerHTML = 'View Project';
      pblock.append(plink);

      dataDiv.append(pblock);
    })
  });