const slides = [...document.querySelectorAll('.slide')];
const tabs = [...document.querySelectorAll('.hero-tab')];
const dots = [...document.querySelectorAll('.dot')];
let current = 0;
let timer;

function showSlide(index){
  current = (index + slides.length) % slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));
  tabs.forEach((tab,i)=>tab.classList.toggle('is-active',i===current));
  dots.forEach((dot,i)=>dot.classList.toggle('is-active',i===current));
  resetTimer();
}
function resetTimer(){ clearInterval(timer); timer=setInterval(()=>showSlide(current+1),6500); }
document.getElementById('prevSlide').addEventListener('click',()=>showSlide(current-1));
document.getElementById('nextSlide').addEventListener('click',()=>showSlide(current+1));
[...tabs,...dots].forEach(btn=>btn.addEventListener('click',()=>showSlide(Number(btn.dataset.go))));
resetTimer();

const header=document.getElementById('siteHeader');
window.addEventListener('scroll',()=>header.classList.toggle('is-scrolled',window.scrollY>40));

const menuToggle=document.getElementById('menuToggle');
const mobileNav=document.getElementById('mobileNav');
menuToggle.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded',String(open));
});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('is-visible')});
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Interactive anniversary timeline
const timelineData = {
  pre1987: {
    displayYear: 'Pre-1987',
    kicker: 'Before DBFL',
    title: 'The practice that came before',
    text: 'Paddy Darling, Ronald Battye, Paul Forde and Jim Lawler were junior partners in Stanislaus Kenny & Partners from the early 1980s.',
    archive: 'Major work included the £40 million Wheatfield works and prison contract, one of the country’s largest projects at the time.',
    image: 'assets/images/office-merrion-square.jpg',
    imageLabel: 'The story starts before 1987'
  },
  1987: {
    displayYear: '1987',
    kicker: 'Where it all began',
    title: 'DBFL is founded',
    text: 'Paddy Darling, Ronald Battye, Paul Forde and Jim Lawler established a new practice after the partners of Stanislaus Kenny & Partners chose to separate.',
    archive: 'The first office occupied a rented floor at 55 Merrion Square. Money was tight, and the founders had to knock on doors to win work.',
    image: 'assets/images/founders-1987.jpg',
    imageLabel: 'The four founders'
  },
  1997: {
    displayYear: '1997',
    kicker: 'Broadening the practice',
    title: 'From housing to prominent projects',
    text: 'DBFL’s portfolio expanded beyond its early housing work into larger residential, civic and cultural projects.',
    archive: 'Projects from this chapter include Alto Vetro, the Criminal Courts of Justice and the National Concert Hall.',
    image: 'assets/images/project-alto-vetro.jpg',
    imageLabel: 'Alto Vetro'
  },
  2008: {
    displayYear: '2008',
    kicker: 'Challenging times',
    title: 'Resilience through a difficult market',
    text: 'The construction crash reshaped the Irish market. DBFL came through a severe downturn and began a gradual recovery from 2014.',
    archive: 'The experience influenced the next phase of the business, with greater diversification and a stronger public sector base.',
    image: 'assets/images/office-herbert-house.jpg',
    imageLabel: 'A resilient practice'
  },
  2014: {
    displayYear: '2014',
    kicker: 'Sustainable, targeted growth',
    title: 'A broader, more balanced practice',
    text: 'DBFL developed its Civil, Structural, Transportation and Energy services while building a respected transport team.',
    archive: 'Public sector projects grew to represent approximately 30–40% of turnover, supported by relationships with major clients.',
    image: 'assets/images/office-ormond-house.jpg',
    imageLabel: 'Ormond House'
  },
  2024: {
    displayYear: '2024',
    kicker: 'A national footprint',
    title: 'One firm across four locations',
    text: 'The opening of the Galway office completed a national presence that began in Dublin and expanded to Waterford in 2008 and Cork in 2019.',
    archive: 'Dublin 1987. Waterford 2008. Cork 2019. Galway 2024.',
    image: 'assets/images/ireland-offices-map.svg',
    imageLabel: 'Four offices across Ireland'
  },
  2026: {
    displayYear: '2026',
    kicker: 'Built on hard work',
    title: 'Made stronger by great people',
    text: 'DBFL grew from four founders with limited resources into one of Ireland’s leading consulting engineering practices.',
    archive: 'The company has grown. The principles of accessible leadership, technical responsibility and close client relationships remain.',
    image: 'assets/images/hero-brand-launch.jpg',
    imageLabel: 'The people behind DBFL'
  }
};

const yearButtons = [...document.querySelectorAll('.timeline-year')];
const timelineYears = document.querySelector('.timeline-years');
const timelinePanel = document.getElementById('timelinePanel');

function updateTimeline(year, focusPanel = false){
  const data = timelineData[year];
  if(!data || !timelinePanel) return;
  const index = yearButtons.findIndex(btn => btn.dataset.year === String(year));
  timelinePanel.classList.add('is-changing');
  setTimeout(() => {
    document.getElementById('timelinePanelYear').textContent = data.displayYear || year;
    document.getElementById('timelineKicker').textContent = data.kicker;
    document.getElementById('timelineTitle').textContent = data.title;
    document.getElementById('timelineText').textContent = data.text;
    document.getElementById('timelineArchive').textContent = data.archive;
    document.getElementById('timelineImageLabel').textContent = data.imageLabel || 'DBFL archive';
    document.getElementById('timelineImage').style.backgroundImage = `linear-gradient(145deg,rgba(241,90,36,.18),rgba(255,255,255,.04)),url('${data.image}')`;
    yearButtons.forEach((btn,i)=>{
      const active = i === index;
      btn.classList.toggle('is-active',active);
      btn.setAttribute('aria-selected',String(active));
    });
    timelineYears.dataset.index = String(index);
    timelinePanel.classList.remove('is-changing');
    if(focusPanel) timelinePanel.focus({preventScroll:true});
  },220);
}

yearButtons.forEach((btn,index)=>{
  btn.addEventListener('click',()=>updateTimeline(btn.dataset.year));
  btn.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    let next=index;
    if(event.key==='ArrowRight') next=(index+1)%yearButtons.length;
    if(event.key==='ArrowLeft') next=(index-1+yearButtons.length)%yearButtons.length;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=yearButtons.length-1;
    yearButtons[next].focus();
    updateTimeline(yearButtons[next].dataset.year);
  });
});

// Animate the office journey when it enters the viewport.
const officeItems = [...document.querySelectorAll('.office-milestones li')];
const officeJourney = document.querySelector('.office-journey');
if (officeJourney && officeItems.length) {
  let officeTimer;
  const officeObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting) || officeTimer) return;
    let activeOffice = 0;
    officeTimer = setInterval(() => {
      officeItems.forEach((item, index) => item.classList.toggle('is-active', index === activeOffice));
      activeOffice = (activeOffice + 1) % officeItems.length;
    }, 1200);
  }, { threshold: .35 });
  officeObserver.observe(officeJourney);
}
