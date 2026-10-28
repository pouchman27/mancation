/* Mancation navigation. Content, picks and scoring stay in their own pages. */
(() => {
  const sections = [['games','The Games'],['records','Records'],['career','Career'],['totals','Totals'],['competitions','Competitions'],['picks','Weekly Picks'],['predictions','Predictions']];
  const isArchive = !!document.getElementById('tab-games');
  const style = document.createElement('style');
  style.textContent = `
    nav.mancation-nav{position:sticky;top:0;z-index:100;display:block;padding:0;background:rgba(6,14,28,.98);border-bottom:1px solid #1d3a63;backdrop-filter:blur(8px);font-family:'Libre Franklin',system-ui,sans-serif}
    .mancation-nav .nav-bar{max-width:960px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 18px}
    .mancation-nav .nav-current{color:#e4ecf7;font-size:14px;font-weight:600;letter-spacing:.02em}
    .mancation-nav button.nav-toggle{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:10px 14px;border:1px solid #3b6194;border-radius:7px;background:#0c1a30;color:#e4ecf7;font:600 14px 'Libre Franklin',system-ui,sans-serif;letter-spacing:0;cursor:pointer}
    .mancation-nav .nav-icon{font-size:22px;line-height:1;width:22px;text-align:center}
    .mancation-nav .nav-items{max-width:960px;margin:auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:0 18px 14px}
    .mancation-nav .nav-items[hidden]{display:none!important}
    .mancation-nav .nav-items a,.mancation-nav .nav-items button{box-sizing:border-box;display:flex;align-items:center;min-height:48px;margin:0;padding:12px 14px;border:1px solid transparent;border-radius:7px;background:#0c1a30;color:#b3c4df;font:600 14px 'Libre Franklin',system-ui,sans-serif;letter-spacing:0;text-decoration:none;text-align:left;cursor:pointer}
    .mancation-nav .nav-items .active,.mancation-nav .nav-items [aria-current=page]{background:#18355e;border-color:#6ea8ff;color:#f0f5ff}
    .mancation-nav .nav-items a:hover,.mancation-nav .nav-items button:hover{background:#18355e;color:#f0f5ff}
    .mancation-nav :focus-visible{outline:3px solid #6ea8ff;outline-offset:3px}
    @media(max-width:600px){.mancation-nav .nav-items{grid-template-columns:1fr 1fr}.mancation-nav .nav-bar{padding:8px 18px}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}}
  `;
  document.head.append(style);
  const nav = isArchive ? document.querySelector('nav.tabs') : document.createElement('nav');
  if (!nav) return;
  nav.classList.add('mancation-nav');
  nav.setAttribute('aria-label','Mancation sections');
  const items=document.createElement('div');items.className='nav-items';items.id='mancation-menu';
  if(isArchive){while(nav.firstChild)items.append(nav.firstChild);}
  else{
    for(const [id,label] of sections){const a=document.createElement('a');a.textContent=label;a.href=id==='picks'?'picks.html':'./#'+id;if(id==='picks')a.setAttribute('aria-current','page');items.append(a);}
    document.querySelector('header').after(nav);
  }
  const bar=document.createElement('div');bar.className='nav-bar';
  const current=document.createElement('span');current.className='nav-current';current.textContent=isArchive?'The Games':'Weekly Picks';
  const toggle=document.createElement('button');toggle.type='button';toggle.className='nav-toggle';toggle.setAttribute('aria-controls',items.id);toggle.setAttribute('aria-expanded','false');
  toggle.innerHTML='<span class="nav-icon" aria-hidden="true">☰</span><span>Menu</span>';
  bar.append(current,toggle);nav.append(bar,items);items.hidden=true;
  function close(focus=false){items.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.querySelector('.nav-icon').textContent='☰';if(focus)toggle.focus();}
  toggle.addEventListener('click',()=>{const open=items.hidden;items.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.nav-icon').textContent=open?'×':'☰';});
  nav.addEventListener('keydown',event=>{if(event.key==='Escape'&&!items.hidden){event.preventDefault();close(true);}});
  document.addEventListener('click',event=>{if(!nav.contains(event.target))close();});
  items.addEventListener('click',event=>{if(event.target.closest('button,a'))close(true);});
  if(isArchive){
    const original=window.showTab;
    window.showTab=function(id){if(!sections.some(s=>s[0]===id&&id!=='picks'))return;original(id);current.textContent=sections.find(s=>s[0]===id)[1];for(const [key] of sections){const button=document.getElementById('tab-'+key);if(button){if(key===id)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');}}close();};
    const fromHash=()=>{const id=location.hash.slice(1);if(sections.some(s=>s[0]===id&&id!=='picks'))window.showTab(id);};
    fromHash();window.addEventListener('hashchange',fromHash);
    const initial=items.querySelector('button.active');if(initial)initial.setAttribute('aria-current','page');
  }
})();
