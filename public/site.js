(function(){
  var root=document.documentElement;
  var KEY='munus-motion';
  function read(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function write(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stored=read();
  var motionOff=stored? stored==='off' : reduce;
  var btn=document.getElementById('motion-btn'), txt=document.getElementById('motion-txt');
  function applyMotion(){
    root.classList.toggle('motion-off',motionOff);
    btn.setAttribute('aria-pressed',String(motionOff));
    txt.textContent=motionOff?'play motion':'pause motion';
    if(window.__slider)window.__slider.motion(motionOff);
  }
  btn.addEventListener('click',function(){motionOff=!motionOff;write(motionOff?'off':'on');applyMotion();if(window.__syncSnakes)window.__syncSnakes();});

  /* colour mode */
  var cbtn=document.getElementById('color-btn');
  function applyColor(on){
    if(on)root.dataset.color='on';else delete root.dataset.color;
    cbtn.setAttribute('aria-pressed',String(on));
    if(window.__slider&&window.__slider.refresh)window.__slider.refresh();
  }
  cbtn.setAttribute('aria-pressed',String(root.dataset.color==='on'));
  /* colour mode wordmark: a snake of colour travelling through m-u-n-u-s, one expertise colour per pass */
  var snakes=[].slice.call(document.querySelectorAll('.bar .logo,.foot-word')).map(function(el){
    var cv=null,c,P=[],L=0,base='',raf=0,t0=0,pass=-1,dpr=1,W=0,H=0;
    var COLS=['--c-brand','--c-creative','--c-events','--c-corporate','--c-research','--c-advisory'];
    function build(){
      var cs=getComputedStyle(el),size=parseFloat(cs.fontSize),track=parseFloat(cs.letterSpacing)||0;
      var node=el.firstChild;while(node&&node.nodeType!==3)node=node.nextSibling;if(!node)return false;
      var rg=document.createRange();rg.selectNodeContents(node);var tr=rg.getBoundingClientRect(),er=el.getBoundingClientRect();
      if(!cv){cv=document.createElement('canvas');cv.className='snake';cv.setAttribute('aria-hidden','true');el.appendChild(cv);c=cv.getContext('2d')}
      var pad=size*.25;dpr=Math.min(window.devicePixelRatio||1,2);W=tr.width+pad*2;H=tr.height+pad*2;
      cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cv.style.width=W+'px';cv.style.height=H+'px';
      cv.style.left=(tr.left-er.left-pad)+'px';cv.style.top=(tr.top-er.top-pad)+'px';
      c.setTransform(dpr,0,0,dpr,0,0);c.font=cs.fontWeight+' '+size+'px '+cs.fontFamily;c.letterSpacing=track+'px';c.textBaseline='alphabetic';
      var m=c.measureText('munus'),fa=m.fontBoundingBoxAscent,fd=m.fontBoundingBoxDescent;
      var by=pad+(tr.height-(fa+fd))/2+fa;           // baseline
      var xh=c.measureText('n').actualBoundingBoxAscent,top=by-xh,w=size*.19;
      el._snake={x:pad,y:by};
      // skeleton of each letter as a polyline, sampled so we know its length
      P=[];var word='munus',x=pad;
      function seg(pts){pts.forEach(function(p){P.push(p)})}
      function line(x1,y1,x2,y2,n){var o=[];for(var i=0;i<=n;i++)o.push([x1+(x2-x1)*i/n,y1+(y2-y1)*i/n]);return o}
      function arc(cx,cy,r,a1,a2,n){var o=[];for(var i=0;i<=n;i++){var a=a1+(a2-a1)*i/n;o.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r])}return o}
      function quad(p0,p1,p2,n){var o=[];for(var i=0;i<=n;i++){var t=i/n,u=1-t;o.push([u*u*p0[0]+2*u*t*p1[0]+t*t*p2[0],u*u*p0[1]+2*u*t*p1[1]+t*t*p2[1]])}return o}
      for(var i=0;i<word.length;i++){
        var ch=word[i],adv=c.measureText(word.slice(0,i+1)).width-c.measureText(word.slice(0,i)).width;
        var gm=c.measureText(ch),l=x+gm.actualBoundingBoxLeft*-1,r=x+gm.actualBoundingBoxRight,h=by-top,L1=l+w/2,R1=r-w/2,mid=(l+r)/2;
        if(ch==='m'){var r1=(mid-L1)/2,r2=(R1-mid)/2;
          seg(line(L1,by,L1,top+w/2+r1,8));seg(arc(L1+r1,top+w/2+r1,r1,Math.PI,2*Math.PI,12));seg(line(mid,top+w/2+r1,mid,by,8));
          seg(line(mid,by,mid,top+w/2+r2,8));seg(arc(mid+r2,top+w/2+r2,r2,Math.PI,2*Math.PI,12));seg(line(R1,top+w/2+r2,R1,by,8));}
        else if(ch==='n'){var rn=(R1-L1)/2;seg(line(L1,by,L1,top+w/2+rn,8));seg(arc(L1+rn,top+w/2+rn,rn,Math.PI,2*Math.PI,14));seg(line(R1,top+w/2+rn,R1,by,8));}
        else if(ch==='u'){var ru=(R1-L1)/2;seg(line(L1,top,L1,by-w/2-ru,8));seg(arc(L1+ru,by-w/2-ru,ru,Math.PI,0,14));seg(line(R1,by-w/2-ru,R1,top,8));seg(line(R1,top,R1,by,8));}
        else if(ch==='s'){var t2=top+w/2,b2=by-w/2,my=(top+by)/2;
          seg(quad([R1,top+h*.26],[R1,t2],[mid,t2],8));seg(quad([mid,t2],[L1,t2],[L1,top+h*.28],8));seg(quad([L1,top+h*.28],[L1,my],[mid,my],8));
          seg(quad([mid,my],[R1,my],[R1,by-h*.28],8));seg(quad([R1,by-h*.28],[R1,b2],[mid,b2],8));seg(quad([mid,b2],[L1,b2],[L1,by-h*.24],8));}
        x+=adv;
      }
      for(var k=0,d=0;k<P.length;k++){if(k)d+=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);P[k][2]=d}
      L=P[P.length-1][2];c._w=w;return true;
    }
    function paint(now){
      var on=root.dataset.color==='on';
      c.clearRect(0,0,W,H);c.globalCompositeOperation='source-over';
      c.fillStyle=base;c.fillText('munus',el._snake.x,el._snake.y);
      if(now!==null){
        var RUN=2600,REST=1100,ph=(now-t0)%(RUN+REST),p=(now-t0)/(RUN+REST)|0;
        if(ph<RUN){
          var len=L*.32,head=-len*.2+(L+len*1.2)*(ph/RUN),tail=head-len;
          c.globalCompositeOperation='source-atop';c.strokeStyle=getComputedStyle(root).getPropertyValue(COLS[p%COLS.length]).trim();
          c.lineWidth=c._w*2.1;c.lineCap='round';c.lineJoin='round';c.beginPath();var started=false;
          for(var k=0;k<P.length;k++){var d=P[k][2];if(d<tail||d>head)continue;if(!started){c.moveTo(P[k][0],P[k][1]);started=true}else c.lineTo(P[k][0],P[k][1])}
          c.stroke();c.globalCompositeOperation='source-over';
        }
      }
    }
    function loop(now){paint(now);raf=requestAnimationFrame(loop)}
    return {
      start:function(){
        if(!build())return;el.classList.add('snaking');
        base=getComputedStyle(el).getPropertyValue('--light').trim()||'#F3F3F1';
        cancelAnimationFrame(raf);
        if(root.classList.contains('motion-off'))paint(null);else{t0=performance.now();raf=requestAnimationFrame(loop)}
      },
      stop:function(){cancelAnimationFrame(raf);el.classList.remove('snaking');if(cv){cv.remove();cv=null}}
    };
  });
  function syncSnakes(){snakes.forEach(function(s){root.dataset.color==='on'?s.start():s.stop()})}
  window.__syncSnakes=syncSnakes;
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(syncSnakes);
  var snt;window.addEventListener('resize',function(){clearTimeout(snt);snt=setTimeout(syncSnakes,200)});
  cbtn.addEventListener('click',function(){
    var on=root.dataset.color!=='on';
    try{localStorage.setItem('munus-color',on?'on':'off')}catch(e){}
    applyColor(on);
    syncSnakes();
  });

  /* reading bar */
  var bar=document.getElementById('progress'), head=document.querySelector('.bar'), ticking=false;
  function onScroll(){
    var max=root.scrollHeight-window.innerHeight;
    bar.style.setProperty('--p',max>0?(window.scrollY/max).toFixed(4):'0');
    head.classList.toggle('is-solid',window.scrollY>window.innerHeight*.6);
    ticking=false;
  }
  function req(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}}
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);

  /* entrances: content is visible at rest; the animation plays as it enters */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})});
    document.querySelectorAll('.io').forEach(function(el){io.observe(el)});
  }

  /* expertise accordion drives the colour card */
  var items=[].slice.call(document.querySelectorAll('.acc-item'));
  var card=document.getElementById('svc-card'), gbox=document.getElementById('svc-glyph');
  var snum=document.getElementById('svc-num');
  var sname=document.getElementById('svc-name'), scount=document.getElementById('svc-count');
  function openItem(i){
    items.forEach(function(it,k){
      var on=k===i;
      it.classList.toggle('is-open',on);
      it.querySelector('.acc-btn').setAttribute('aria-expanded',String(on));
      it.querySelector('.acc-panel').inert=!on;
    });
    card.dataset.tone=i;
    snum.textContent=(i<9?'0':'')+(i+1);
    sname.textContent=items[i].querySelector('.t').textContent;
    scount.textContent=(i+1)+' / '+items.length;
    gbox.classList.remove('pop');void gbox.offsetWidth;gbox.classList.add('pop');
  }
  items.forEach(function(it,i){it.querySelector('.acc-btn').addEventListener('click',function(){openItem(i)})});

  /* full-screen menu, opened by the round button */
  var menu=document.getElementById('menu'), mbtn=document.getElementById('menu-btn');
  function placeOrigin(){
    var r=mbtn.getBoundingClientRect();
    menu.style.setProperty('--mx',(r.left+r.width/2)+'px');
    menu.style.setProperty('--my',(r.top+r.height/2)+'px');
  }
  function setMenu(on,keep,viaKey){
    placeOrigin();
    menu.classList.toggle('is-open',on);
    menu.inert=!on;
    mbtn.classList.toggle('is-open',on);
    mbtn.setAttribute('aria-expanded',String(on));
    mbtn.setAttribute('aria-label',on?'Close menu':'Open menu');
    root.classList.toggle('menu-lock',on);
    if(window.__slider)window.__slider.hold(on);
    if(on){var f=viaKey?menu.querySelector('.menu-links a'):menu;setTimeout(function(){f.focus({preventScroll:true})},motionOff?0:450)}
    else if(!keep&&viaKey){mbtn.focus({preventScroll:true})}
  }
  mbtn.addEventListener('click',function(e){setMenu(!menu.classList.contains('is-open'),false,e.detail===0)});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false,true)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('is-open'))setMenu(false,false,true)});
  window.addEventListener('resize',placeOrigin);


  /* team badges: spring-driven swing, tilt and sheen; the pointer pushes a card, click flips it */
  (function(){
    [].slice.call(document.querySelectorAll('.badge')).forEach(function(b){
      var hang=b.querySelector('.hang'), c=b.querySelector('.card3d');
      var keys=['x','y','light','sway'];
      var cur={x:0,y:0,light:0,sway:0}, vel={x:0,y:0,light:0,sway:0}, goal={x:0,y:0,light:0,sway:0};
      var raf=0, last=0, lastX=null;
      function paint(){
        var fl=c.getAttribute('aria-pressed')==='true';
        c.style.setProperty('--rx',(-cur.y*6).toFixed(2)+'deg');
        c.style.setProperty('--ry',(cur.x*8).toFixed(2)+'deg');
        c.style.setProperty('--px',(((fl?-cur.x:cur.x)+1)*50).toFixed(1)+'%');
        c.style.setProperty('--py',((cur.y+1)*50).toFixed(1)+'%');
        c.style.setProperty('--ang',(cur.x*30).toFixed(1)+'deg');
        c.style.setProperty('--lit',cur.light.toFixed(3));
        hang.style.setProperty('--sw',cur.sway.toFixed(3)+'deg');
      }
      function step(t){
        var dt=last?Math.min(2.5,(t-last)/16.67):1, moving=false;
        last=t;
        keys.forEach(function(k){
          var sw=k==='sway', pull=goal[k]-cur[k];
          // the swing is a looser spring than the tilt, so it rocks a few times before settling
          vel[k]=(vel[k]+pull*(sw?.09:.17)*dt)*Math.pow(sw?.86:.74,dt);
          cur[k]+=vel[k]*dt;
          if(Math.abs(pull)>.002||Math.abs(vel[k])>.002)moving=true;
          else{cur[k]=goal[k];vel[k]=0}
        });
        paint();
        raf=moving?requestAnimationFrame(step):0;
      }
      function run(){if(!raf&&!motionOff){last=0;raf=requestAnimationFrame(step)}}
      function kick(v){vel.sway=Math.max(-1.2,Math.min(1.2,vel.sway+v));run()}
      function rest(){
        lastX=null;goal={x:0,y:0,light:0,sway:0};
        if(motionOff){cur={x:0,y:0,light:0,sway:0};paint()}else run();
      }
      // positive rotate swings the bottom of the card left, so a push to the right is negative
      b.addEventListener('pointerenter',function(e){
        if(e.pointerType!=='mouse'||motionOff)return;
        var r=c.getBoundingClientRect();
        kick(e.clientX<r.left+r.width/2?-1:1);
      });
      b.addEventListener('pointermove',function(e){
        if(e.pointerType!=='mouse'||motionOff)return;
        var r=c.getBoundingClientRect();
        var x=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1)), y=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));
        if(lastX!==null)vel.sway=Math.max(-1.2,Math.min(1.2,vel.sway-Math.max(-35,Math.min(35,e.clientX-lastX))*.02));
        lastX=e.clientX;
        goal={x:x,y:y,light:1,sway:x*1.2};
        run();
      });
      b.addEventListener('pointerleave',rest);
      b.addEventListener('pointercancel',rest);
      c.addEventListener('click',function(){
        var on=c.getAttribute('aria-pressed')!=='true';
        c.setAttribute('aria-pressed',String(on));
        if(!motionOff)kick(on?1.1:-1.1);
      });
    });
    function drawQR(){
      var boxes=document.querySelectorAll('[data-qr]');
      if(!window.qrcode){boxes.forEach(function(b){b.textContent='QR'});return}
      boxes.forEach(function(b){
        try{
          var q=qrcode(0,'M');
          q.addData('BEGIN:VCARD\nVERSION:3.0\nFN:Name Surname\nORG:munus\nEMAIL:name@wearemunus.co\nEND:VCARD');
          q.make();
          b.innerHTML=q.createSvgTag({cellSize:2,margin:0,scalable:true});
        }catch(err){b.textContent='QR'}
      });
    }
    drawQR();
  })();

  /* hero slider */
  (function(){
    var hero=document.getElementById('hero');
    if(!hero)return;
    var slides=[].slice.call(hero.querySelectorAll('.slide'));
    var caps=[].slice.call(hero.querySelectorAll('.cap-item'));
    var segs=[].slice.call(hero.querySelectorAll('.seg'));
    var cnt=document.getElementById('cnt');
    var DUR=7000, i=0, timer=0, hovered=false, held=false, off=false, visible=true;
    function pad(n){return (n<10?'0':'')+n}
  /* hero art: one generative black & white scene per expertise */
  var art=(function(){
    var TAU=Math.PI*2, INK='243,243,241', BG='#0A0A0A';
    /* colour mode: brand, creative, events, corporate, research, advisory (hero order) */
    var AB=1,PAL=['76,125,217','202,86,75','192,100,0','0,153,86','149,101,199','0,150,177'],FADE='rgba(10,10,10,.075)';
    /* improved Perlin noise */
    var P=new Uint8Array(512);
    (function(){var p=[],i,s=7;for(i=0;i<256;i++)p[i]=i;for(i=255;i>0;i--){s=s*16807%2147483647;var j=s%(i+1),t=p[i];p[i]=p[j];p[j]=t}for(i=0;i<512;i++)P[i]=p[i&255]})();
    function fd(t){return t*t*t*(t*(t*6-15)+10)}
    function lp(a,b,t){return a+t*(b-a)}
    function gr(h,x,y,z){h&=15;var u=h<8?x:y,v=h<4?y:(h===12||h===14?x:z);return((h&1)?-u:u)+((h&2)?-v:v)}
    function noise(x,y,z){
      var X=Math.floor(x)&255,Y=Math.floor(y)&255,Z=Math.floor(z)&255;
      x-=Math.floor(x);y-=Math.floor(y);z-=Math.floor(z);
      var u=fd(x),v=fd(y),w=fd(z),A=P[X]+Y,AA=P[A]+Z,AB=P[A+1]+Z,B=P[X+1]+Y,BA=P[B]+Z,BB=P[B+1]+Z;
      return lp(lp(lp(gr(P[AA],x,y,z),gr(P[BA],x-1,y,z),u),lp(gr(P[AB],x,y-1,z),gr(P[BB],x-1,y-1,z),u),v),
                lp(lp(gr(P[AA+1],x,y,z-1),gr(P[BA+1],x-1,y,z-1),u),lp(gr(P[AB+1],x,y-1,z-1),gr(P[BB+1],x-1,y-1,z-1),u),v),w);
    }
    function cl(v,a,b){return v<a?a:v>b?b:v}
    function ss(v){v=cl(v,0,1);return v*v*(3-2*v)}
    function ink(a){return 'rgba('+INK+','+Math.min(1,a*AB)+')'}

    var scenes=[
      /* 01 brand & marketing: particles riding one current */
      {init:function(s,W,H){
        s.n=Math.min(2400,Math.round(W*H/600));s.x=new Float32Array(s.n);s.y=new Float32Array(s.n);s.a=new Float32Array(s.n);
        for(var i=0;i<s.n;i++){s.x[i]=Math.random()*W;s.y[i]=Math.random()*H;s.a[i]=Math.random()*240}
        s.warm=90;
      },frame:function(c,s,W,H,t,k,mx,my){
        c.fillStyle=FADE;c.fillRect(0,0,W,H);
        c.strokeStyle=ink(.62);c.lineWidth=.8;c.beginPath();
        var R=200,R2=R*R;
        for(var i=0;i<s.n;i++){
          var x=s.x[i],y=s.y[i],a=noise(x*.0016,y*.0016,t*.00006)*TAU*1.4;
          var vx=Math.cos(a)*1.7*k,vy=Math.sin(a)*1.7*k,dx=x-mx,dy=y-my,d2=dx*dx+dy*dy;
          if(d2<R2){var d=Math.sqrt(d2)||1,f=(1-d/R)*4*k;vx+=dx/d*f;vy+=dy/d*f}
          c.moveTo(x,y);x+=vx;y+=vy;c.lineTo(x,y);
          if(x<0||x>W||y<0||y>H||(s.a[i]+=k)>240){x=Math.random()*W;y=Math.random()*H;s.a[i]=0}
          s.x[i]=x;s.y[i]=y;
        }
        c.stroke();
      }},
      /* 02 creative & content: a ribbon of threads, one 3D Lissajous figure drawn many times */
      {init:function(s,W,H){s.rx=0;s.ry=0},
      frame:function(c,s,W,H,t,k,mx,my){
        c.fillStyle=BG;c.fillRect(0,0,W,H);
        var cx=W*(W<700?.5:.64),cy=H*(W<700?.34:.44),A=Math.min(W,H)*(W<700?.36:.36),K=22,N=420;
        var tx=mx>-1e3?(mx/W-.5)*1.6:0,ty=mx>-1e3?(my/H-.5)*1.2:0;
        s.rx+=(tx-s.rx)*.04*k;s.ry+=(ty-s.ry)*.04*k;
        var ya=t*.00018+s.rx,xa=.35+Math.sin(t*.00011)*.25+s.ry,cy1=Math.cos(ya),sy1=Math.sin(ya),cx1=Math.cos(xa),sx1=Math.sin(xa);
        c.lineWidth=1;
        for(var m=0;m<K;m++){
          var ph=t*.00022+m*.045,q=m/(K-1);
          c.strokeStyle=ink(.12+.5*Math.sin(q*Math.PI));c.beginPath();
          for(var n=0;n<=N;n++){
            var u=n/N*TAU,x=Math.sin(3*u+ph),y=Math.sin(2*u),z=Math.sin(5*u+ph*.6)*.7;
            var x2=x*cy1+z*sy1,z2=z*cy1-x*sy1,y2=y*cx1-z2*sx1,z3=z2*cx1+y*sx1,f=1/(1.9-z3*.45);
            var px=cx+x2*A*f*1.35,py=cy+y2*A*f*1.35;
            if(n)c.lineTo(px,py);else c.moveTo(px,py);
          }
          c.stroke();
        }
      }},
      /* 03 events & experiences: ripples crossing a field of dots */
      {init:function(s,W,H){s.g=cl(W/64,16,26)},
      frame:function(c,s,W,H,t,k,mx,my){
        c.fillStyle=BG;c.fillRect(0,0,W,H);
        var g=s.g,src=[[W*(.62+.22*Math.sin(t*.00021)),H*(.4+.25*Math.cos(t*.00017))],[W*(.3+.2*Math.cos(t*.00013)),H*(.65+.2*Math.sin(t*.00023))],[W*(.85+.1*Math.sin(t*.00031)),H*(.8+.15*Math.cos(t*.00019))]];
        if(mx>-1e3)src.push([mx,my]);
        var n=src.length;
        c.fillStyle=ink(.75);c.beginPath();
        for(var y=g/2;y<H;y+=g)for(var x=g/2;x<W;x+=g){
          var v=0;
          for(var q=0;q<n;q++){var dx=x-src[q][0],dy=y-src[q][1];v+=Math.sin(Math.sqrt(dx*dx+dy*dy)*.04-t*.0024)}
          v=v/n*.5+.5;var rr=g*.44*v*v;
          if(rr>.35){c.moveTo(x+rr,y);c.arc(x,y,rr,0,TAU)}
        }
        c.fill();
      }},
      /* 04 corporate & public affairs: a drifting network of stakeholders */
      {init:function(s,W,H){
        s.n=Math.round(cl(W*H/11000,40,130));s.p=[];
        for(var i=0;i<s.n;i++)s.p.push({x:Math.random()*W,y:Math.random()*H,hub:Math.random()<.1,o:Math.random()*100});
      },frame:function(c,s,W,H,t,k,mx,my){
        c.fillStyle=BG;c.fillRect(0,0,W,H);
        var D=cl(W/8,110,190),p=s.p,n=s.n,i,j,a,b;
        for(i=0;i<n;i++){a=p[i];var an=noise(a.o,t*.00009,0)*TAU*2;a.x+=Math.cos(an)*.35*k;a.y+=Math.sin(an)*.35*k;
          if(a.x<-20)a.x=W+20;if(a.x>W+20)a.x=-20;if(a.y<-20)a.y=H+20;if(a.y>H+20)a.y=-20}
        var all=mx>-1e3?p.concat([{x:mx,y:my,me:1}]):p;
        c.lineWidth=1;
        for(i=0;i<all.length;i++)for(j=i+1;j<all.length;j++){
          a=all[i];b=all[j];var lim=(a.me||b.me)?D*1.6:D,dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;
          if(d2<lim*lim){c.strokeStyle=ink((1-Math.sqrt(d2)/lim)*((a.me||b.me)?.8:.45));c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke()}
        }
        c.fillStyle=ink(.95);c.beginPath();
        for(i=0;i<n;i++){a=p[i];var rr=a.hub?3.2:1.6;c.moveTo(a.x+rr,a.y);c.arc(a.x,a.y,rr,0,TAU)}
        c.fill();
        c.strokeStyle=ink(.5);c.beginPath();
        for(i=0;i<n;i++){a=p[i];if(!a.hub)continue;var pr=10+4*Math.sin(t*.002+a.o);c.moveTo(a.x+pr,a.y);c.arc(a.x,a.y,pr,0,TAU)}
        c.stroke();
      }},
      /* 05 intelligence & research: signal ridges rising out of the noise */
      {init:function(s,W,H){s.gap=cl(H/46,11,18)},
      frame:function(c,s,W,H,t,k,mx,my){
        c.fillStyle=BG;c.fillRect(0,0,W,H);
        var gap=s.gap,rows=Math.ceil(H/gap)+8,step=5,cx=W*.64,sp=W*.2;
        c.lineWidth=1.1;c.strokeStyle=ink(.85);c.fillStyle=BG;
        for(var j=0;j<rows;j++){
          var y0=(j-6)*gap;c.beginPath();c.moveTo(-10,y0);
          for(var x=-10;x<=W+10;x+=step){
            var e=Math.exp(-Math.pow((x-cx)/sp,2));
            if(mx>-1e3){var e2=Math.exp(-Math.pow((x-mx)/90,2)-Math.pow((y0-my)/160,2));e+=e2*.9}
            var h=Math.max(0,noise(x*.007,j*.3,t*.00022)*1.6+.35)*e*gap*7+noise(x*.03,j,t*.0004)*2;
            c.lineTo(x,y0-h);
          }
          c.lineTo(W+10,H+10);c.lineTo(-10,H+10);c.closePath();c.fill();c.stroke();
        }
      }},
      /* 06 advisory: a field of needles finding one direction */
      {init:function(s,W,H){s.g=cl(W/46,22,34);s.ax=W*.6;s.ay=H*.45},
      frame:function(c,s,W,H,t,k,mx,my){
        c.fillStyle=BG;c.fillRect(0,0,W,H);
        var tx=mx>-1e3?mx:W*(.62+.2*Math.sin(t*.00023)),ty=mx>-1e3?my:H*(.45+.22*Math.sin(t*.00031+1));
        s.ax+=(tx-s.ax)*.05*k;s.ay+=(ty-s.ay)*.05*k;
        var g=s.g,ax=s.ax,ay=s.ay,F=Math.max(W,H)*.45;
        c.lineWidth=1.3;c.lineCap='round';
        for(var y=g/2;y<H;y+=g)for(var x=g/2;x<W;x+=g){
          var dx=ax-x,dy=ay-y,d=Math.sqrt(dx*dx+dy*dy),q=Math.exp(-d/F);
          var an=Math.atan2(dy,dx)+noise(x*.004,y*.004,t*.00015)*1.4*(1-q),l=g*.42*(.3+.7*q);
          c.strokeStyle=ink(.18+.75*q);c.beginPath();
          c.moveTo(x-Math.cos(an)*l,y-Math.sin(an)*l);c.lineTo(x+Math.cos(an)*l,y+Math.sin(an)*l);c.stroke();
        }
        c.lineWidth=1;
        for(var i=0;i<3;i++){var ph=((t*.00025+i/3)%1),rr=20+ph*Math.min(W,H)*.45;c.strokeStyle=ink((1-ph)*.5);c.beginPath();c.arc(ax,ay,rr,0,TAU);c.stroke()}
      }}
    ];

    var cv=slides.map(function(s){return s.querySelector('canvas')}),st=cv.map(function(){return{}});
    var cur=-1,prev=-1,prevEnd=0,run=false,raf=0,last=0,t=0,mx=-1e4,my=-1e4,W=0,H=0,dpr=1;
    function theme(k){
      var on=document.documentElement.dataset.color==='on';
      AB=on?1.45:1;INK=on?PAL[k]:'243,243,241';BG=on?'#F4F3EF':'#0A0A0A';FADE=on?'rgba(244,243,239,.075)':'rgba(10,10,10,.075)';
    }
    function ready(k){
      var c=cv[k],w=Math.round(W*dpr),h=Math.round(H*dpr);
      if(c.width===w&&c.height===h&&st[k].ok)return;
      c.width=w;c.height=h;var x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.fillStyle=BG;x.fillRect(0,0,W,H);
      st[k]={ok:1};scenes[k].init(st[k],W,H);
    }
    function draw(k,step){theme(k);ready(k);var x=cv[k].getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);scenes[k].frame(x,st[k],W,H,t,step,mx,my)}
    function tick(now){
      var k=Math.min(now-last,50)/16.67;last=now;t+=k*16.67;
      draw(cur,k);
      if(prev>=0){if(now<prevEnd)draw(prev,k);else{cv[prev].width=cv[prev].height=0;st[prev]={};prev=-1}}
      raf=run?requestAnimationFrame(tick):0;
    }
    function still(k){var n=st[k].warm||1;for(var i=0;i<(k===0?90:1);i++){t+=16.67;draw(k,1)}}
    function size(){W=hero.clientWidth;H=hero.clientHeight;dpr=Math.min(window.devicePixelRatio||1,W<700?2:1.5);
      cv.forEach(function(c,k){if(c.width){st[k]={};if(k===cur){if(!run)still(k)}else{c.width=c.height=0}}})}
    var rt=0;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(size,150)});
    if(window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches){
      hero.addEventListener('pointermove',function(e){var b=hero.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top});
      hero.addEventListener('pointerleave',function(){mx=my=-1e4});
    }
    size();
    var api=function(k,on){
      if(k!==cur){if(cur>=0){if(prev>=0&&prev!==k){cv[prev].width=cv[prev].height=0;st[prev]={}}prev=cur;prevEnd=performance.now()+1300}cur=k}
      if(prev===cur)prev=-1;
      run=on;cancelAnimationFrame(raf);raf=0;
      if(on){last=performance.now();raf=requestAnimationFrame(tick)}else{still(k);if(prev>=0){cv[prev].width=cv[prev].height=0;st[prev]={};prev=-1}}
    };
    /* after a theme change, repaint every canvas from scratch on the new background */
    api.reset=function(){st=cv.map(function(){return{}})};
    return api;
  })();
    function playOnly(k){art(k,!off&&visible)}
    function schedule(){
      clearTimeout(timer);
      var paused=off||hovered||held||!visible;
      hero.classList.toggle('is-paused',paused);
      if(!paused)timer=setTimeout(function(){go(i+1)},DUR);
    }
    function go(k){
      k=(k+slides.length)%slides.length;
      slides.forEach(function(s,j){s.classList.toggle('is-on',j===k)});
      caps.forEach(function(c,j){c.classList.toggle('is-on',j===k)});
      segs.forEach(function(sg,j){
        sg.classList.remove('is-on');
        sg.classList.toggle('done',j<k);
        sg.setAttribute('aria-current',j===k?'true':'false');
      });
      void hero.offsetWidth;
      segs[k].classList.add('is-on');
      cnt.textContent=pad(k+1);
      i=k; playOnly(k); schedule();
    }
    document.getElementById('prev').addEventListener('click',function(){go(i-1)});
    document.getElementById('next').addEventListener('click',function(){go(i+1)});
    segs.forEach(function(sg,j){sg.addEventListener('click',function(){go(j)})});
    hero.querySelector('.hero-foot').addEventListener('pointerenter',function(){hovered=true;schedule()});
    hero.querySelector('.hero-foot').addEventListener('pointerleave',function(){hovered=false;go(i)});
    hero.addEventListener('keydown',function(e){
      if(e.target.closest('.menu'))return;
      if(e.key==='ArrowRight'){go(i+1)}else if(e.key==='ArrowLeft'){go(i-1)}
    });
    var x0=null;
    hero.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')x0=e.clientX});
    hero.addEventListener('pointerup',function(e){if(x0===null)return;var dx=e.clientX-x0;x0=null;if(Math.abs(dx)>50)go(dx<0?i+1:i-1)});
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){visible=es[0].isIntersecting;playOnly(i);schedule()},{threshold:.15}).observe(hero);
    }
    window.__slider={
      motion:function(v){off=v;playOnly(i);schedule()},
      refresh:function(){art.reset();playOnly(i)},
      hold:function(v){held=v;schedule()}
    };
    go(0);
  })();

  /* pointer extras, only where there is a real pointer */
  var fine=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(fine){
    document.querySelectorAll('.magnet').forEach(function(el){
      el.addEventListener('pointermove',function(e){
        if(motionOff)return;
        var r=el.getBoundingClientRect();
        el.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.3).toFixed(1)+'px)';
      });
      el.addEventListener('pointerleave',function(){el.style.transform=''});
    });
  }

  applyMotion();
  onScroll();
})();
