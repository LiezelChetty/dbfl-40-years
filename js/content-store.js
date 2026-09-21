const DBFL_DEFAULT_CONTENT = {
  pages: [
    {
      id: 'page-about', slug: 'about-us', status: 'published', title: 'About Us', eyebrow: 'Get to know DBFL',
      intro: 'DBFL is a fully Irish-owned consulting engineering practice working across property, infrastructure, transportation, environmental and energy sectors.',
      body: '<h2>Engineering Sustainable Futures</h2><p>We bring planning, engineering design and project delivery together to create resilient and sustainable solutions. Close relationships with clients and communities guide how we work.</p><h2>The DBFL difference</h2><p>Our culture combines hands-on personal service with technical expertise. Leadership remains involved in project delivery, while our teams continue to develop their skills, technology and sector knowledge.</p><h2>Our people</h2><p>More than 200 people contribute their experience across Dublin, Waterford, Cork and Galway. Collaboration, inclusivity and continuous learning remain central to the practice.</p>', updated: '2026-09-21'
    },
    {
      id: 'page-services', slug: 'what-we-do', status: 'published', title: 'What We Do', eyebrow: 'The DBFL Way',
      intro: 'Multidisciplinary engineering services across the built and natural environment.',
      body: '<h2>Structural engineering</h2><p>Innovative structural solutions for public buildings, commercial spaces, residential developments and complex heritage projects.</p><h2>Civil and infrastructure</h2><p>Infrastructure that supports communities, including roads, active travel, flood relief, public health infrastructure, ports, logistics and energy projects.</p><h2>Transportation</h2><p>Transport planning, modelling and sustainable mobility strategies informed by data, GIS and close collaboration with clients and stakeholders.</p>', updated: '2026-09-21'
    }
  ],
  news: [
    {id:'news-40-years',title:'DBFL prepares to celebrate 40 years',category:'Featured',date:'2026-09-21',excerpt:'A new digital anniversary experience brings together the people, projects and milestones that shaped DBFL.',body:'DBFL is preparing to mark four decades of engineering, collaboration and progress. The anniversary experience will share verified milestones, archive photography and stories from across the practice.',image:'assets/images/founders-1987.png',status:'published'},
    {id:'news-national',title:'One firm across four locations',category:'News',date:'2026-09-18',excerpt:'DBFL’s national footprint connects teams in Dublin, Waterford, Cork and Galway.',body:'The four-office network helps DBFL remain close to clients and projects across Ireland while working as one connected practice.',image:'assets/images/ireland-offices-map.svg',status:'published'}
  ],
  media: []
};

function dbflLoadContent(){
  try { return JSON.parse(localStorage.getItem('dbfl-demo-content')) || structuredClone(DBFL_DEFAULT_CONTENT); }
  catch { return structuredClone(DBFL_DEFAULT_CONTENT); }
}
function dbflSaveContent(content){ localStorage.setItem('dbfl-demo-content', JSON.stringify(content)); }
function dbflResetContent(){ localStorage.removeItem('dbfl-demo-content'); return dbflLoadContent(); }
function dbflEscape(value=''){ return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
window.DBFLContent={load:dbflLoadContent,save:dbflSaveContent,reset:dbflResetContent,escape:dbflEscape};
