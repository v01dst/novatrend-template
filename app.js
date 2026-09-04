/* NovaTrend interactions: catalog render, carousel, countdown, cart, wishlist */
var P = [
{id:"hoodie",name:"Essential Hoodie",price:59.99,old:79.99,badge:"-20%",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",stars:"★★★★★",rev:2314},
{id:"airmax",name:"Air Max 270",price:129.99,old:0,badge:"New",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",stars:"★★★★★",rev:1892},
{id:"headphones",name:"Wireless Headphones",price:89.99,old:119.99,badge:"-25%",img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",stars:"★★★★☆",rev:3401},
{id:"watch",name:"Smart Watch Series 9",price:199.99,old:0,badge:"New",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",stars:"★★★★★",rev:987},
{id:"bottle",name:"Stainless Steel Bottle",price:24.99,old:0,badge:"",img:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",stars:"★★★★☆",rev:5620},
{id:"sunglasses",name:"Aviator Sunglasses",price:39.99,old:59.99,badge:"-33%",img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",stars:"★★★★☆",rev:743}
];
var BEST = [
{id:"hoodie",name:"Classic Hoodie",price:59.99,desc:"Our best-selling heavyweight fleece hoodie. Brushed inside, structured outside — the one you'll reach for daily.",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop",stars:"★★★★★",rev:"12.4k"},
{id:"airmax",name:"Air Max 270",price:129.99,desc:"Nike's biggest heel Air unit yet delivers unrivaled, all-day comfort with a street-ready silhouette.",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop",stars:"★★★★★",rev:"8.1k"},
{id:"sony",name:"Sony WH-1000XM5",price:349.99,desc:"Industry-leading noise canceling, crystal-clear calls and 30-hour battery. The headphone benchmark.",img:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=500&auto=format&fit=crop",stars:"★★★★★",rev:"5.6k"}
];
var byId = function(id){for(var i=0;i<P.length;i++)if(P[i].id===id)return P[i];for(var j=0;j<BEST.length;j++)if(BEST[j].id===id)return BEST[j];return null};
function card(p){var old=p.old?'<span class="price old">$'+p.old+'</span>':"";
var badge=p.badge?'<span class="badge'+(p.badge==="New"?" dark":"")+'">'+p.badge+'</span>':"";
return '<div class="pcard"><a class="pimg" href="#"><img src="'+p.img+'" alt="'+p.name+'" loading="lazy">'+badge+'</a><button class="heart" data-w="'+p.id+'">♡</button><div class="pbody"><b>'+p.name+'</b><div class="prow"><span class="price">$'+p.price+'</span>'+old+'</div><div class="prow"><span class="stars">'+p.stars+'</span><span class="rcount">('+p.rev+')</span></div><div class="pfoot"><span class="rcount">Free shipping</span><button class="add" data-add="'+p.id+'">👜</button></div></div></div>'}
document.getElementById("car").innerHTML = P.map(card).join("");
document.getElementById("bestrow").innerHTML = BEST.map(function(p){
return '<div class="best"><img src="'+p.img+'" alt="'+p.name+'" loading="lazy"><div><span class="bbadge">★ Bestseller</span><h3>'+p.name+'</h3><div class="prow"><span class="price">$'+p.price+'</span><span class="stars">'+p.stars+'</span><span class="rcount">('+p.rev+')</span></div><p class="desc">'+p.desc+'</p><button class="quick" data-add="'+p.id+'">Quick Add +</button></div></div>'}).join("");
/* carousel arrows */
var car=document.getElementById("car");
document.getElementById("prev").onclick=function(){car.scrollBy({left:-300,behavior:"smooth"})};
document.getElementById("next").onclick=function(){car.scrollBy({left:300,behavior:"smooth"})};
/* countdown */
var END=Date.now()+((2*24+15)*3600+45*60+30)*1000;
function pad(n){return(n<10?"0":"")+n}
setInterval(function(){var s=Math.max(0,Math.floor((END-Date.now())/1000));
document.getElementById("cd").textContent=pad(Math.floor(s/86400));
document.getElementById("ch").textContent=pad(Math.floor(s%86400/3600));
document.getElementById("cm").textContent=pad(Math.floor(s%3600/60));
document.getElementById("cs").textContent=pad(s%60)},1000);
/* wishlist */
var wished={};
document.addEventListener("click",function(e){var h=e.target.closest?e.target.closest("[data-w]"):null;if(!h)return;
var id=h.dataset.w;if(wished[id]){delete wished[id];h.classList.remove("liked")}else{wished[id]=1;h.classList.add("liked")}
var n=Object.keys(wished).length,el=document.getElementById("wishn");el.hidden=!n;el.textContent=n});
/* cart */
var cart=[{id:"airmax",qty:1},{id:"hoodie",qty:1}];
function renderCart(){var box=document.getElementById("ditems");box.innerHTML="";var sub=0,n=0;
cart.forEach(function(i){var p=byId(i.id);sub+=p.price*i.qty;n+=i.qty;
var d=document.createElement("div");d.className="ditem";
d.innerHTML='<img src="'+p.img+'"><div style="flex:1"><b style="font-size:13.5px">'+p.name+'</b><div style="font-size:12px;color:#777">Qty '+i.qty+'</div></div><b>$'+(p.price*i.qty).toFixed(2)+'</b>';
box.appendChild(d)});
document.getElementById("dn").textContent=n;
document.getElementById("bagcount").textContent=n;
document.getElementById("dsub").textContent="$"+sub.toFixed(2)}
document.addEventListener("click",function(e){var b=e.target.closest?e.target.closest("[data-add]"):null;if(!b)return;e.preventDefault();
var id=b.dataset.add,f=cart.filter(function(i){return i.id===id})[0];
if(f)f.qty++;else cart.push({id:id,qty:1});renderCart();openDrawer()});
function openDrawer(){document.getElementById("drawer").classList.add("open")}
document.getElementById("bagbtn").onclick=openDrawer;
document.getElementById("dx").onclick=function(){document.getElementById("drawer").classList.remove("open")};
document.getElementById("scrim").onclick=function(){document.getElementById("drawer").classList.remove("open")};
renderCart();
/* mobile menu */
document.getElementById("burger").onclick=function(){document.getElementById("links").classList.toggle("open")};
