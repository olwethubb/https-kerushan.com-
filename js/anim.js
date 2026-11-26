/* Homepage animations:
   - hero headline builds letter by letter, rest of hero fades in after it
   - key elements in the other sections fade in softly as they scroll into view */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var home=document.getElementById('p-home'); if(!home)return;
  document.documentElement.classList.add('anim');

  // hero: split headline into letters, stagger the rest after it
  var hero=home.querySelector('.hero');
  var n=0;
  hero.querySelectorAll('.hx .l').forEach(function(l){
    var f=document.createDocumentFragment();
    l.textContent.split('').forEach(function(ch){
      var s=document.createElement('span');s.className='ch';s.textContent=ch;
      if(ch===' ')s.style.whiteSpace='pre';
      s.style.setProperty('--c',n++);f.appendChild(s);
    });
    l.textContent='';l.appendChild(f);
  });
  hero.style.setProperty('--letters',n);
  hero.querySelectorAll('.eb, .lede, .ctas, .hero-art img').forEach(function(el){el.classList.add('fx')});

  // other sections: headings, eyebrows, main images and stats only
  var KEY='.stats > div, .bv .eb, .bv .hx .l, .piece, .thumb, .show .eb, .show .hx .l, .show .art, .pr .pcard, .pr .eb, .pr .hx .l, .roles img, .hum .art, .hum .eb, .hum .hx .l, .cm .eb, .cm .hx .l, .cm .strip, .nl .hx, .ts .art, .ts .eb';
  var items=[].slice.call(home.querySelectorAll(KEY));
  var groups=new Map();
  items.forEach(function(el){
    var g=el.closest('.stats, .hb, .vc, .show, .pod, .roles, .hum, .cm, .nl, .ts')||home;
    var i=groups.get(g)||0; groups.set(g,i+1);
    el.classList.add('sf'); el.style.setProperty('--i',i);
  });

  // reveal on scroll (position check: works for every element type)
  var pending=items, busy=false;
  function check(){
    var lim=innerHeight*0.9;
    pending=pending.filter(function(el){
      var r=el.getBoundingClientRect();
      if(r.top<lim){el.classList.add('in');return false}
      return true;
    });
    busy=false;
    if(!pending.length){removeEventListener('scroll',req);removeEventListener('resize',req)}
  }
  function req(){if(!busy){busy=true;requestAnimationFrame(check)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
  requestAnimationFrame(function(){hero.classList.add('go');requestAnimationFrame(check)});
})();
