(function(){
'use strict';

/* ---------- данные меню (блюда из макета заказчика) ---------- */
var SOUPS=[
  {n:'Борщ с говядиной',k:'borsch',c:'#B5301F',c2:'#D4533A'},
  {n:'Суп куриный с лапшой',k:'noodle',c:'#EFC862',c2:'#F7DC8E'},
  {n:'Щи из свежей капусты',k:'shchi',c:'#C6D683',c2:'#DDE8A8'},
  {n:'Суп-пюре из тыквы',k:'puree',c:'#EE9A3A',c2:'#F5B565'}
];
var MAINS=[
  {n:'Куриные котлеты с пюре',k:'cutlet'},
  {n:'Рыба запечённая с овощами',k:'fish'},
  {n:'Говядина с грибами',k:'beef'},
  {n:'Курица в сливочном соусе',k:'chicken'}
];
var SIDES=[
  {n:'Рис отварной',k:'rice'},
  {n:'Гречка с грибами',k:'buckwheat'},
  {n:'Картофель фри',k:'fries'},
  {n:'Овощи на гриле',k:'veg'}
];
var SALADS=[
  {n:'Салат «Греческий»',k:'greek'},
  {n:'Салат «Цезарь» с курицей',k:'caesar'},
  {n:'Салат «Оливье» с курицей',k:'olivier'},
  {n:'Салат с тунцом',k:'tuna'}
];
var DRINKS=[
  {n:'Компот из сухофруктов',k:'compote',c:'#C98B3C'},
  {n:'Кисель ягодный',k:'kisel',c:'#A8284A'},
  {n:'Чай с лимоном',k:'tea',c:'#B8741F'},
  {n:'Морс клюквенный',k:'mors',c:'#C42E3F'}
];
/* на каждый день: суп, горячее, гарнир, салат, напиток */
var WEEK=[[0,0,0,0,0],[1,1,3,1,1],[2,2,1,2,2],[3,3,0,3,3],[2,0,2,1,2],[1,3,1,2,1],[3,2,3,3,3]];
var DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

/* ---------- рисование ---------- */
function rng(seed){var s=((seed*2654435761)>>>0)||1;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function n(v){return Math.round(v*10)/10;}
function circ(x,y,r,fill,extra){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="'+n(r)+'" fill="'+fill+'"'+(extra||'')+'/>';}
function ell(x,y,rx,ry,fill,rot,extra){return '<ellipse cx="'+n(x)+'" cy="'+n(y)+'" rx="'+n(rx)+'" ry="'+n(ry)+'" fill="'+fill+'"'+(rot?' transform="rotate('+n(rot)+' '+n(x)+' '+n(y)+')"':'')+(extra||'')+'/>';}
function box(x,y,w,h,rx,fill,rot,extra){return '<rect x="'+n(x-w/2)+'" y="'+n(y-h/2)+'" width="'+n(w)+'" height="'+n(h)+'" rx="'+n(rx)+'" fill="'+fill+'"'+(rot?' transform="rotate('+n(rot)+' '+n(x)+' '+n(y)+')"':'')+(extra||'')+'/>';}

function dill(x,y,rot,s){
  return '<g transform="translate('+n(x)+' '+n(y)+') rotate('+rot+') scale('+(s||1)+')">'+
    '<path d="M0 0H22" stroke="#3E7A3C" stroke-width="2" fill="none"/><g fill="#5FA14B">'+
    '<ellipse cx="6" cy="-4" rx="5" ry="2" transform="rotate(-30 6 -4)"/>'+
    '<ellipse cx="6" cy="4" rx="5" ry="2" transform="rotate(30 6 4)"/>'+
    '<ellipse cx="14" cy="-4" rx="5" ry="2" transform="rotate(-30 14 -4)"/>'+
    '<ellipse cx="14" cy="4" rx="5" ry="2" transform="rotate(30 14 4)"/>'+
    '<ellipse cx="23" cy="0" rx="5" ry="2"/></g></g>';
}
function plate(cx,cy,R,inner){
  return circ(cx+5,cy+8,R,'#6A2F0B',' opacity=".38"')+
    circ(cx,cy,R,'#FFFDF8')+
    circ(cx,cy,R*.9,'none',' stroke="#E6DFCB" stroke-width="2"')+
    circ(cx,cy,R*.7,'#F6F0E1')+inner;
}

function soup(cx,cy,R,d,seed){
  var r=rng(seed),L=R*.6,g='',i,a,rr,x,y;
  g+=circ(cx,cy,L,d.c)+circ(cx,cy,L*.7,d.c2,' opacity=".5"');
  g+='<path d="M'+n(cx-L*.72)+' '+n(cy-L*.2)+'A'+n(L*.75)+' '+n(L*.75)+' 0 0 1 '+n(cx-L*.1)+' '+n(cy-L*.75)+'" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".5"/>';
  if(d.k==='borsch'){
    for(i=0;i<5;i++){a=r()*6.28;rr=L*(.3+r()*.45);x=cx+Math.cos(a)*rr;y=cy+Math.sin(a)*rr;g+=box(x,y,14,10,4,'#6B2F1B',r()*90);}
    g+=circ(cx-L*.02,cy+L*.02,L*.24,'#FFFBEF')+circ(cx+L*.02,cy-L*.01,L*.1,'#F1E4C6');
    g+=dill(cx+L*.12,cy-L*.34,-35,.85)+dill(cx-L*.55,cy+L*.3,160,.75);
  }else if(d.k==='noodle'){
    for(i=0;i<9;i++){a=r()*6.28;rr=L*(.1+r()*.6);x=cx+Math.cos(a)*rr;y=cy+Math.sin(a)*rr;
      g+='<path d="M'+n(x-10)+' '+n(y)+'q5 -8 10 0t10 0" stroke="#FBEBB4" stroke-width="3" fill="none" stroke-linecap="round" transform="rotate('+n(r()*180)+' '+n(x)+' '+n(y)+')"/>';}
    for(i=0;i<4;i++){a=r()*6.28;rr=L*(.2+r()*.55);g+=circ(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,4.5,'#E8832E');}
    g+=dill(cx-L*.1,cy+L*.2,-20,.8);
  }else if(d.k==='shchi'){
    for(i=0;i<9;i++){a=r()*6.28;rr=L*(.1+r()*.65);x=cx+Math.cos(a)*rr;y=cy+Math.sin(a)*rr;
      g+='<path d="M'+n(x)+' '+n(y)+'q8 -6 14 2q-6 8 -14 -2z" fill="#86B148" opacity=".92"/>';}
    for(i=0;i<3;i++){a=r()*6.28;rr=L*(.25+r()*.45);g+=box(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,12,12,3,'#F3E7B8',r()*60);}
    g+=circ(cx+L*.05,cy,L*.16,'#FFFBEF')+dill(cx-L*.4,cy+L*.25,150,.8);
  }else{
    g+='<path d="M'+n(cx-L*.45)+' '+n(cy)+'q'+n(L*.22)+' '+n(-L*.3)+' '+n(L*.45)+' 0t'+n(L*.45)+' 0" stroke="#FFF6E2" stroke-width="5" fill="none" stroke-linecap="round"/>';
    for(i=0;i<5;i++){a=i*1.256+.4;g+=ell(cx+Math.cos(a)*L*.42,cy+Math.sin(a)*L*.42+L*.22,4,2.2,'#F8E7BE',a*57);}
    g+=dill(cx+L*.2,cy+L*.4,-160,.7);
  }
  return g;
}

function mainDish(cx,cy,R,d,seed){
  var r=rng(seed),k=R*.7,g='',i;
  if(d.k==='cutlet'){
    g+=circ(cx-k*.3,cy+k*.22,k*.4,'#F5E5B6')+circ(cx-k*.55,cy+k*.04,k*.26,'#F5E5B6')+circ(cx-k*.1,cy+k*.5,k*.24,'#F5E5B6');
    g+=circ(cx-k*.3,cy+k*.16,k*.1,'#F4C542');
    g+=ell(cx+k*.3,cy-k*.2,k*.5,k*.3,'#8E4F22',-28)+ell(cx+k*.3,cy-k*.22,k*.42,k*.23,'#B7733A',-28);
    g+=ell(cx+k*.05,cy-k*.48,k*.34,k*.2,'#8E4F22',12)+ell(cx+k*.05,cy-k*.5,k*.27,k*.14,'#B7733A',12);
    g+=dill(cx+k*.05,cy+k*.58,-20,.9);
  }else if(d.k==='fish'){
    g+='<g transform="rotate(-22 '+n(cx)+' '+n(cy)+')">'+box(cx,cy,k*1.24,k*.5,k*.22,'#E9A06A');
    for(i=0;i<4;i++){g+='<path d="M'+n(cx-k*.42+i*k*.28)+' '+n(cy-k*.18)+'l'+n(k*.1)+' '+n(k*.36)+'" stroke="#B96A38" stroke-width="3" stroke-linecap="round"/>';}
    g+='</g>';
    g+=circ(cx+k*.45,cy+k*.42,k*.2,'#F5D54E',' stroke="#E2B52C" stroke-width="2"');
    g+='<path d="M'+n(cx+k*.45)+' '+n(cy+k*.22)+'v'+n(k*.4)+'M'+n(cx+k*.25)+' '+n(cy+k*.42)+'h'+n(k*.4)+'" stroke="#E2B52C" stroke-width="1.6"/>';
    g+=circ(cx-k*.5,cy+k*.42,k*.12,'#D9402B')+circ(cx-k*.25,cy+k*.55,k*.1,'#D9402B');
    g+='<path d="M'+n(cx-k*.55)+' '+n(cy-k*.5)+'q'+n(k*.3)+' '+n(-k*.1)+' '+n(k*.5)+' '+n(k*.05)+'M'+n(cx-k*.5)+' '+n(cy-k*.38)+'q'+n(k*.3)+' '+n(-k*.1)+' '+n(k*.5)+' '+n(k*.05)+'" stroke="#5C9C3C" stroke-width="4" stroke-linecap="round" fill="none"/>';
  }else if(d.k==='beef'){
    g+=circ(cx,cy,k*.58,'#5E3015',' opacity=".85"');
    g+=ell(cx-k*.12,cy-k*.18,k*.4,k*.2,'#8A4524',-18,' stroke="#6E3319" stroke-width="3"');
    g+=ell(cx+k*.12,cy+k*.02,k*.4,k*.2,'#9A5530',-10,' stroke="#6E3319" stroke-width="3"');
    g+=ell(cx-k*.05,cy+k*.22,k*.4,k*.19,'#A8643B',-24,' stroke="#6E3319" stroke-width="3"');
    for(i=0;i<3;i++){var mx=cx-k*.6+i*k*.55,my=cy+k*.55-(i%2)*k*.12;g+=ell(mx,my,k*.15,k*.1,'#EBDBBA',20)+box(mx,my+k*.1,k*.07,k*.1,2,'#E2CFA6');}
    g+=circ(cx+k*.5,cy-k*.4,3,'#4E8A3A')+circ(cx+k*.4,cy-k*.5,2.4,'#4E8A3A')+circ(cx-k*.5,cy-k*.4,2.6,'#4E8A3A');
  }else{
    g+=circ(cx,cy+k*.04,k*.62,'#FFF1CF')+circ(cx,cy+k*.04,k*.62,'none',' stroke="#F0DDB0" stroke-width="2"');
    g+=ell(cx-k*.02,cy-k*.02,k*.42,k*.26,'#C98F2E',14)+ell(cx-k*.04,cy-k*.07,k*.36,k*.19,'#E3A94A',14);
    g+=ell(cx+k*.28,cy+k*.12,k*.2,k*.12,'#C98F2E',14)+ell(cx+k*.27,cy+k*.09,k*.16,k*.08,'#E3A94A',14);
    for(i=0;i<6;i++){g+=ell(cx-k*.5+r()*k,cy-k*.5+r()*k*1.1,3.6,1.8,'#5FA14B',r()*180);}
    for(i=0;i<4;i++){g+=circ(cx-k*.45+r()*k*.9,cy+k*.3+r()*k*.3,1.4,'#3A2B2B');}
  }
  return g;
}

function sideDish(cx,cy,R,d,seed){
  var r=rng(seed),k=R*.62,g='',i,a,rr,x,y;
  if(d.k==='rice'){
    g+=circ(cx,cy,k*.95,'#FBF8EE');
    for(i=0;i<46;i++){a=r()*6.28;rr=Math.sqrt(r())*k*.88;x=cx+Math.cos(a)*rr;y=cy+Math.sin(a)*rr;g+=ell(x,y,4.2,1.9,'#fff',r()*180,' stroke="#E2DCC7" stroke-width=".8"');}
    g+=dill(cx+k*.08,cy-k*.2,-15,.62);
  }else if(d.k==='buckwheat'){
    g+=circ(cx,cy,k*.95,'#8A5A33');
    for(i=0;i<46;i++){a=r()*6.28;rr=Math.sqrt(r())*k*.9;g+=circ(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,2.3,r()>.5?'#5E3A1C':'#B07C48');}
    for(i=0;i<3;i++){g+=ell(cx-k*.4+i*k*.4,cy+k*.18-(i%2)*k*.5,8,5,'#EBDBBA',i*40);}
    g+=dill(cx+k*.1,cy+k*.5,-150,.6);
  }else if(d.k==='fries'){
    for(i=0;i<9;i++){g+=box(cx-k*.3+r()*k*.6,cy-k*.25+r()*k*.4,8,k*1.15,2.5,'#F2C34F',-50+r()*100,' stroke="#D9A530" stroke-width="1"');}
    g+=circ(cx+k*.45,cy+k*.5,k*.17,'#C93B2B');
  }else{
    g+=box(cx-k*.3,cy-k*.15,k*.7,k*.3,10,'#D93B2B',-20)+box(cx+k*.2,cy+k*.18,k*.7,k*.3,10,'#F2B632',15);
    g+=circ(cx+k*.25,cy-k*.35,k*.2,'#6F9E3E')+circ(cx+k*.25,cy-k*.35,k*.11,'#A9C972');
    g+=circ(cx-k*.4,cy+k*.4,k*.18,'#6F9E3E')+circ(cx-k*.4,cy+k*.4,k*.1,'#A9C972');
    g+=ell(cx-k*.05,cy+k*.5,k*.2,k*.1,'#5B3C6B',-30);
    g+='<path d="M'+n(cx-k*.55)+' '+n(cy-k*.05)+'l'+n(k*.3)+' '+n(-k*.18)+'M'+n(cx+k*.0)+' '+n(cy+k*.18)+'l'+n(k*.4)+' '+n(k*.12)+'" stroke="#7A2A12" stroke-width="2" stroke-linecap="round"/>';
  }
  return g;
}

function saladBowl(cx,cy,R,d,seed){
  var r=rng(seed),g='',i,a,rr,x,y;
  g+=circ(cx+4,cy+7,R,'#6A2F0B',' opacity=".38"')+circ(cx,cy,R,'#FFFDF8')+circ(cx,cy,R*.86,'#EEF2DF',' stroke="#E0DAC6" stroke-width="2"');
  function pos(f){a=r()*6.28;rr=Math.sqrt(r())*R*f;x=cx+Math.cos(a)*rr;y=cy+Math.sin(a)*rr;}
  if(d.k==='greek'){
    for(i=0;i<5;i++){pos(.6);g+=circ(x,y,9,'#D9402B')+circ(x,y,4.5,'#EE7A5E');}
    for(i=0;i<4;i++){pos(.6);g+=circ(x,y,8,'#7FB05A',' stroke="#4E8A3A" stroke-width="2"')+circ(x,y,3,'#CFE6B0');}
    for(i=0;i<4;i++){pos(.6);g+=box(x,y,12,12,3,'#fff',r()*80,' stroke="#E2DCC7"');}
    for(i=0;i<4;i++){pos(.62);g+=circ(x,y,4.6,'#3A2B3A');}
    for(i=0;i<2;i++){pos(.55);g+=circ(x,y,7,'none',' stroke="#B76AA6" stroke-width="2"');}
  }else if(d.k==='caesar'){
    for(i=0;i<7;i++){pos(.55);g+=ell(x,y,13,7,i%2?'#7DB352':'#A8D07A',r()*180);}
    for(i=0;i<5;i++){pos(.6);g+=box(x,y,10,10,2,'#E8B85A',r()*80);}
    for(i=0;i<3;i++){pos(.5);g+=ell(x,y,10,6,'#F0D9A4',r()*180,' stroke="#D6B574"');}
    for(i=0;i<4;i++){pos(.6);g+='<path d="M'+n(x-6)+' '+n(y)+'q6 -6 12 0" stroke="#FFF5D6" stroke-width="3" fill="none" stroke-linecap="round"/>';}
  }else if(d.k==='olivier'){
    g+=circ(cx,cy,R*.62,'#F6EBC8');
    for(i=0;i<16;i++){pos(.6);g+=circ(x,y,2.6,'#6DAE45');}
    for(i=0;i<9;i++){pos(.6);g+=box(x,y,6,6,1.5,'#EE8A2C',r()*90);}
    for(i=0;i<6;i++){pos(.6);g+=box(x,y,6,6,1.5,'#9BBF55',r()*90);}
    g+=dill(cx-R*.1,cy-R*.05,-20,.7)+circ(cx+R*.18,cy+R*.1,R*.12,'#FFFBEF');
  }else{
    for(i=0;i<6;i++){pos(.55);g+=ell(x,y,13,7,i%2?'#7DB352':'#A8D07A',r()*180);}
    for(i=0;i<5;i++){pos(.55);g+=box(x,y,13,10,3,'#E9C9A6',r()*80,' stroke="#C9A27A" stroke-width="1.5"');}
    for(i=0;i<9;i++){pos(.62);g+=circ(x,y,2.4,'#F4C93A');}
    for(i=0;i<3;i++){pos(.6);g+=circ(x,y,7,'#8FBF5E',' stroke="#5E9440" stroke-width="2"');}
    pos(.45);g+=ell(x,y,9,6,'#fff',20,' stroke="#E2DCC7"')+circ(x,y,3,'#F4C93A');
  }
  return g;
}

function drinkGlass(cx,cy,R,d,seed){
  var r=rng(seed),g='',i,a;
  g+=circ(cx+4,cy+6,R,'#6A2F0B',' opacity=".36"')+circ(cx,cy,R,'#EAF4F6',' stroke="#CFE2E8" stroke-width="3"');
  g+=circ(cx,cy,R*.82,d.c)+circ(cx,cy,R*.82,'none',' stroke="rgba(0,0,0,.18)" stroke-width="3"');
  g+='<path d="M'+n(cx-R*.6)+' '+n(cy-R*.1)+'A'+n(R*.6)+' '+n(R*.6)+' 0 0 1 '+n(cx-R*.1)+' '+n(cy-R*.6)+'" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".55"/>';
  if(d.k==='tea'){
    g+=circ(cx+R*.2,cy+R*.1,R*.42,'#F7DE63',' stroke="#E9C23A" stroke-width="2"');
    g+='<path d="M'+n(cx+R*.2)+' '+n(cy-R*.32)+'v'+n(R*.84)+'M'+n(cx-R*.22)+' '+n(cy+R*.1)+'h'+n(R*.84)+'" stroke="#E9C23A" stroke-width="1.6"/>';
  }else if(d.k==='compote'){
    for(i=0;i<5;i++){a=i*1.26+.3;g+=circ(cx+Math.cos(a)*R*.42,cy+Math.sin(a)*R*.42,4.4,i%2?'#7A2E2E':'#E8A23A');}
  }else if(d.k==='mors'){
    for(i=0;i<4;i++){a=i*1.6+.5;g+=circ(cx+Math.cos(a)*R*.46,cy+Math.sin(a)*R*.46,3.6,'#E4475A');}
  }
  return g;
}

function bread(x,y){
  return '<g transform="translate('+x+' '+y+')"><g transform="rotate(8 37 31)">'+
    '<rect x="4" y="8" width="74" height="62" rx="22" fill="#6A2F0B" opacity=".34"/>'+
    '<rect width="74" height="62" rx="22" fill="#B87433"/>'+
    '<rect x="7" y="7" width="60" height="48" rx="16" fill="#F4DEAA"/>'+
    '<circle cx="26" cy="26" r="2" fill="#E8C682"/><circle cx="46" cy="36" r="2" fill="#E8C682"/><circle cx="38" cy="18" r="1.6" fill="#E8C682"/></g></g>';
}
function cutlery(x,y){
  var st=' fill="#E3E8EA" stroke="#B3BCC0" stroke-width="2"';
  return '<g transform="translate('+x+' '+y+')">'+
    '<rect x="-4" y="14" width="8" height="104" rx="4"'+st+'/><ellipse cx="0" cy="0" rx="14" ry="21"'+st+'/></g>'+
    '<g transform="translate('+(x+44)+' '+(y-8)+')">'+
    '<rect x="-4" y="22" width="8" height="104" rx="4"'+st+'/><rect x="-15" y="-18" width="30" height="46" rx="8"'+st+'/>'+
    '<path d="M-8 -18V6M0 -18V6M8 -18V6" stroke="#DB8236" stroke-width="3.4" stroke-linecap="round"/></g>';
}

function tray(day){
  var w=WEEK[day],seed=day*97+11,t;
  t='<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  t+='<rect x="10" y="14" width="628" height="424" rx="48" fill="#4A1F05" opacity=".28"/>';
  t+='<rect x="2" y="2" width="628" height="424" rx="48" fill="#CF6F28"/>';
  t+='<rect x="18" y="18" width="596" height="392" rx="34" fill="#DB8236" stroke="#B85A1B" stroke-width="3"/>';
  t+=plate(150,150,98,soup(150,150,98,SOUPS[w[0]],seed+1));
  t+=plate(400,170,118,mainDish(400,170,118,MAINS[w[1]],seed+2));
  t+=plate(150,336,62,sideDish(150,336,62,SIDES[w[2]],seed+3));
  t+=saladBowl(330,356,58,SALADS[w[3]],seed+4);
  t+=drinkGlass(512,345,40,DRINKS[w[4]],seed+5);
  t+=bread(534,40);
  t+=cutlery(548,172);
  return t+'</svg>';
}

function pot(){
  var s='<svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  s+=circ(246,214,150,'#04160F',' opacity=".35"');
  s+=box(76,192,48,28,14,'#AEB8BA')+box(404,192,48,28,14,'#AEB8BA');
  s+=circ(240,200,150,'#D8DFE0')+circ(240,200,134,'none',' stroke="#AEB8BA" stroke-width="4"');
  s+=circ(240,200,124,'#8E9A9D')+circ(240,200,114,'#EFB43F')+circ(240,200,84,'#F6CB65',' opacity=".7"');
  var r=rng(7),i,a,rr;
  for(i=0;i<9;i++){a=r()*6.28;rr=20+r()*80;s+='<path d="M'+n(240+Math.cos(a)*rr-10)+' '+n(200+Math.sin(a)*rr)+'q5 -8 10 0t10 0" stroke="#FBEBB4" stroke-width="3.4" fill="none" stroke-linecap="round" transform="rotate('+n(r()*180)+' '+n(240+Math.cos(a)*rr)+' '+n(200+Math.sin(a)*rr)+')"/>';}
  for(i=0;i<7;i++){a=r()*6.28;rr=20+r()*85;s+=circ(240+Math.cos(a)*rr,200+Math.sin(a)*rr,6,'#E8832E')+circ(240+Math.cos(a)*rr,200+Math.sin(a)*rr,2.4,'#F6A95A');}
  s+=dill(200,160,-30,1.1)+dill(280,250,150,1)+dill(160,250,40,.9);
  s+='<path d="M352 150L452 66" stroke="#B3BCC0" stroke-width="12" stroke-linecap="round"/><path d="M352 150L452 66" stroke="#E3E8EA" stroke-width="7" stroke-linecap="round"/>';
  s+=circ(330,168,38,'#B3BCC0')+circ(330,168,32,'#E3E8EA')+circ(330,168,25,'#EFB43F');
  s+='<path d="M312 156a22 22 0 0 1 16 -12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>';
  return s+'</svg>';
}

/* ---------- сборка страницы ---------- */
var heroTray=document.getElementById('heroTray'),weekTray=document.getElementById('weekTray');
var daysEl=document.getElementById('days'),dishesEl=document.getElementById('dishes');
heroTray.innerHTML=tray(0);
document.getElementById('potArt').innerHTML=pot();

var now=new Date(),todayIdx=(now.getDay()+6)%7,monday=new Date(now);
monday.setDate(now.getDate()-todayIdx);
function pad(v){return v<10?'0'+v:''+v;}

var tabs=[];
DAYS.forEach(function(name,i){
  var dt=new Date(monday);dt.setDate(monday.getDate()+i);
  var b=document.createElement('button');
  b.type='button';b.className='day';b.setAttribute('role','tab');
  b.innerHTML=name+'<small>'+pad(dt.getDate())+'.'+pad(dt.getMonth()+1)+'</small>';
  b.addEventListener('click',function(){show(i,true);});
  b.addEventListener('keydown',function(e){
    var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
    if(k){e.preventDefault();var j=(i+k+7)%7;show(j,true);tabs[j].focus();}
  });
  daysEl.appendChild(b);tabs.push(b);
});

function show(i,animate){
  var w=WEEK[i];
  tabs.forEach(function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');b.tabIndex=j===i?0:-1;});
  weekTray.innerHTML=tray(i);
  dishesEl.innerHTML=
    '<div><dt>Первое</dt><dd>'+SOUPS[w[0]].n+'</dd></div>'+
    '<div><dt>Горячее</dt><dd>'+MAINS[w[1]].n+'</dd></div>'+
    '<div><dt>Гарнир</dt><dd>'+SIDES[w[2]].n+'</dd></div>'+
    '<div><dt>Салат</dt><dd>'+SALADS[w[3]].n+'</dd></div>'+
    '<div><dt>Напиток</dt><dd>'+DRINKS[w[4]].n+'</dd></div>';
  if(animate){
    [weekTray,dishesEl].forEach(function(el){el.classList.remove('fade-in');void el.offsetWidth;el.classList.add('fade-in');});
  }
}
show(todayIdx,false);

/* ---------- окно заявки, подсказки, меню на телефоне ---------- */
var dlg=document.getElementById('lead'),form=document.getElementById('leadForm');
function openLead(){dlg.classList.remove('sent');form.reset();if(dlg.showModal){dlg.showModal();}else{dlg.setAttribute('open','');}}
document.querySelectorAll('[data-open-lead]').forEach(function(b){b.addEventListener('click',openLead);});
dlg.querySelector('[data-close]').addEventListener('click',function(){dlg.close();});
dlg.addEventListener('click',function(e){if(e.target===dlg){dlg.close();}});
form.addEventListener('submit',function(e){
  e.preventDefault();
  var name=form.elements.name,phone=form.elements.phone;
  if(!name.value.trim()){name.focus();return;}
  if(phone.value.replace(/\D/g,'').length<10){phone.focus();return;}
  dlg.classList.add('sent');
});

var toast=document.getElementById('toast'),tt;
function say(msg){toast.textContent=msg;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on');},2800);}
document.querySelectorAll('[data-soon]').forEach(function(a){
  a.addEventListener('click',function(e){
    e.preventDefault();
    say('«'+a.getAttribute('data-soon')+'» – в этом демо пока не собрано.');
    document.querySelector('.bar').classList.remove('open');
  });
});

var bar=document.querySelector('.bar'),burger=document.querySelector('.burger');
burger.addEventListener('click',function(){
  var o=bar.classList.toggle('open');
  burger.setAttribute('aria-expanded',o?'true':'false');
});
document.querySelectorAll('#nav a[href^="#"]:not([data-soon])').forEach(function(a){
  a.addEventListener('click',function(){bar.classList.remove('open');burger.setAttribute('aria-expanded','false');});
});
})();
