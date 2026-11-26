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

  // other sections: key elements only. Stats bar and newsletter stay static.
  // sf = soft fade, sl = slide in from the side (text from left, images from right)
  var FADE='.show .eb, .show .hx .l, .show .art, .hum .art, .hum .eb, .hum .hx .l, .ts .art, .ts .eb';
  var SLIDE='.bv .eb, .bv .hx .l, .piece, .thumb, .pr .pcard, .pr .eb, .pr .hx .l, .roles img, .cm .eb, .cm .hx .l, .cm .strip';
  var IMG='.piece, .thumb, .pcard, .roles img, .strip, .art';
  var items=[].slice.call(home.querySelectorAll(FADE+','+SLIDE));
  var groups=new Map();
  items.forEach(function(el){
    var g=el.closest('.hb, .vc, .show, .pod, .roles, .hum, .cm, .ts')||home;
    var i=groups.get(g)||0; groups.set(g,i+1);
    if(el.matches(SLIDE)){el.classList.add('sl', el.matches(IMG)?'from-r':'from-l')}
    else el.classList.add('sf');
    el.style.setProperty('--i',i);
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
  // let the browser paint the hidden letters first, otherwise they appear all at once
  void hero.offsetWidth;
  setTimeout(function(){hero.classList.add('go')},120);
  requestAnimationFrame(function(){requestAnimationFrame(check)});
})();
