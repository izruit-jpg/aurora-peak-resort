
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.14});
reveals.forEach(el=>observer.observe(el));

const nav = document.querySelector('.nav');
const toggle = document.querySelector('.mobile-toggle');
if(toggle){
  toggle.addEventListener('click',()=>nav.classList.toggle('open'));
}

const modal = document.querySelector('.modal');
if(modal){
  const title = modal.querySelector('[data-modal-title]');
  const desc = modal.querySelector('[data-modal-desc]');
  const list = modal.querySelector('[data-modal-list]');
  const img = modal.querySelector('[data-modal-img]');
  document.querySelectorAll('[data-detail]').forEach(card=>{
    card.addEventListener('click',()=>{
      const data = JSON.parse(card.dataset.detail);
      title.textContent = data.title;
      desc.textContent = data.desc;
      img.src = data.img;
      img.alt = data.title;
      list.innerHTML = '';
      (data.items || []).forEach(item=>{
        const el = document.createElement('div');
        el.textContent = '• ' + item;
        list.appendChild(el);
      });
      modal.classList.add('open');
    });
  });
  modal.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click',()=>modal.classList.remove('open')));
  modal.addEventListener('click',(e)=>{ if(e.target === modal) modal.classList.remove('open'); });
}
