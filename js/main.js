(function(){
  var pages=['home','show','articles','resources','about','coffee','book'];
  var mnav=document.getElementById('mnav'), burger=document.querySelector('.burger');
  function closeMenu(){mnav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open menu');document.body.classList.remove('menu-open')}
  function show(){
    var h=(location.hash||'#home').slice(1);
    if(h==='buy'){h='book';}
    if(pages.indexOf(h)<0){ var el=document.getElementById(h); if(el){ return; } h='home'; }
    document.querySelectorAll('.page').forEach(function(p){p.classList.toggle('on',p.dataset.page===h)});
    document.querySelectorAll('.nav a, .mnav a').forEach(function(a){var on=a.getAttribute('href')==='#'+h;a.classList.toggle('on',on);if(on){a.setAttribute('aria-current','page')}else{a.removeAttribute('aria-current')}});
    closeMenu();
    if(location.hash==='#buy'){ setTimeout(function(){document.getElementById('buy').scrollIntoView()},50); }
    else { window.scrollTo(0,0); }
    document.body.classList.toggle('at-home',h==='home');
    document.title=(h==='home'?'Kerushan.com':'Kerushan.com — '+h.charAt(0).toUpperCase()+h.slice(1));
  }
  window.addEventListener('hashchange',show); show();
  function onScroll(){document.body.classList.toggle('scrolled',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  burger.addEventListener('click',function(){var o=mnav.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.classList.toggle('menu-open',o)});

  function setInert(sl,on){sl.setAttribute('aria-hidden',String(!on));sl.querySelectorAll('a,button').forEach(function(el){if(on){el.removeAttribute('tabindex')}else{el.setAttribute('tabindex','-1')}})}

  // home book carousel (manual only)
  var hb=document.getElementById('hb'); if(hb&&hb.querySelector('.dots')){
    var hsl=hb.querySelectorAll('.hb-slide'), hdots=hb.querySelector('.dots'), hi=0;
    hsl.forEach(function(sl,k){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show book '+(k+1));b.onclick=function(){hgo(k)};hdots.appendChild(b)});
    function hgo(k){
      hi=Math.max(0,Math.min(hsl.length-1,k));
      hsl.forEach(function(sl,n){var on=n===hi;sl.classList.toggle('on',on);setInert(sl,on)});
      hdots.querySelectorAll('button').forEach(function(b,n){b.classList.toggle('on',n===hi);if(n===hi){b.setAttribute('aria-current','true')}else{b.removeAttribute('aria-current')}});
      
    }
    hb.querySelectorAll('.ring').forEach(function(a){a.onclick=function(){hgo(hi+Number(a.dataset.dir))}});
    hgo(0);
  }
  // book carousel (book page)
  var bk=document.getElementById('bk'); if(bk&&bk.querySelector('.dots')){
    var bsl=bk.querySelectorAll('.bk-slide'), bdots=bk.querySelector('.dots'), bi=0;
    bsl.forEach(function(_,k){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show book '+(k+1));b.onclick=function(){bgo(k)};bdots.appendChild(b)});
    function bgo(k){bi=(k+bsl.length)%bsl.length;bsl.forEach(function(sl,n){var on=n===bi;sl.classList.toggle('on',on);setInert(sl,on)});bdots.querySelectorAll('button').forEach(function(b,n){b.classList.toggle('on',n===bi);if(n===bi){b.setAttribute('aria-current','true')}else{b.removeAttribute('aria-current')}})}
    bk.querySelectorAll('.ring').forEach(function(a){a.onclick=function(){bgo(bi+Number(a.dataset.dir))}});
    bgo(0);
  }
  // testimonials slider (starts on the quote shown in the concept)
  var t=document.getElementById('tst'); if(t){
    var figs=t.querySelectorAll('figure'), dots=t.querySelector('.dots'), i=0;
    figs.forEach(function(f,k){
      var n=f.querySelector('blockquote').textContent.length;
      if(n>380){f.classList.add('long')}else if(n>250){f.classList.add('mid')}
      var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Testimonial '+(k+1)+' of '+figs.length);b.onclick=function(){go(k)};dots.appendChild(b)});
    var qw=t.querySelector('.qwrap');function go(k){var h0=qw.offsetHeight;i=(k+figs.length)%figs.length;figs.forEach(function(f,n){f.classList.toggle('on',n===i);f.setAttribute('aria-hidden',String(n!==i))});dots.querySelectorAll('button').forEach(function(b,n){b.classList.toggle('on',n===i);if(n===i){b.setAttribute('aria-current','true')}else{b.removeAttribute('aria-current')}});
      // smoothly resize to the new quote
      qw.style.height='auto';var h1=qw.offsetHeight;
      if(h0&&h0!==h1){qw.style.height=h0+'px';void qw.offsetHeight;qw.style.height=h1+'px';clearTimeout(qw._t);qw._t=setTimeout(function(){qw.style.height='auto'},450)}else{qw.style.height='auto'}
    }
    t.querySelectorAll('.ring').forEach(function(a){a.onclick=function(){go(i+Number(a.dataset.dir))}});
    go(3);
  }
})();
