(()=>{"use strict";const t=class{constructor(t){this.name=t,this.ships=[],this.gameboard=new class{constructor(){this.board=this.#t(),this.missed=[],this.ships=[]}#t(){let t=[];for(let e=0;e<10;e++){let e=[];for(let t=0;t<10;t++)e.push({isHit:!1,hasShip:!1});t.push(e)}return t}placeShip(t,e,a,r){if(this.#e(e,a,t,r)){const o=[];for(let d=0;d<t;d++)"hori"===r&&(o.push([e+d,a]),this.board[a][e+d].hasShip=!0),"vert"===r&&(o.push([e,a+d]),this.board[a+d][e].hasShip=!0);const d=new class{constructor(t,e){this.name=t,this.location=e,this.hits=[]}hit(t){this.hits.push(t)}isSunk(){return this.location.sort().toString()===this.hits.sort().toString()}}("ship",o);return this.ships.push(d),d}return"Not a valid spot"}recieveAttack(t,e){if(this.board[e][t].hasShip){let a;for(let r=0;r<this.ships.length;r++)this.#a(this.ships[r].location,[t,e])&&(a=this.ships[r]);return a.hit([t,e]),this.board[e][t].isHit=!0,a.isSunk(),a.hits}return this.missed.push([t,e]),this.board[e][t].isHit=!0,this.missed}allShipsSunk(){let t=!0;return this.ships.forEach((e=>{e.isSunk()||(t=!1)})),t}#e(t,e,a,r){let o=!0;for(let d=0;d<a;d++)"hori"===r&&(0<=t+d&&t+d<10&&0<=e&&e<10?this.ships.forEach((a=>{this.#a(a.location,[t+d,e])&&(o=!1)})):o=!1),"vert"===r&&(0<=t&&t<10&&0<=e+d&&e+d<10?this.ships.forEach((a=>{this.#a(a.location,[t,e+d])&&(o=!1)})):o=!1);return o}#a(t,e){const a=JSON.stringify(e);return t.some((function(t){return JSON.stringify(t)===a}))}}}attack(t,e,a){if(a.board[e][t].isHit)return"You already shot there";a.recieveAttack(t,e)}autoAttack(t){const e=Math.round(9*Math.random()),a=Math.round(9*Math.random());return!t.board[a][e].isHit&&(t.recieveAttack(e,a),[e,a])}},e=()=>Math.floor(10*Math.random()),a=t=>{const e=document.createElement("div");e.classList.add("miss"),t.appendChild(e)},r=t=>{const e=document.createElement("div");e.classList.add("hit"),t.appendChild(e)},o=t=>t.location[0][0]===t.location[1][0]?"vert":"hori",d=function(){const d=new t("user"),u=[s,l,c,i,n];u.forEach((t=>{d.gameboard.placeShip(t[3],t[0],t[1],t[2]),((t,e)=>{const a=t.location[0][0],r=t.location[0][1],d=o(t),s=document.querySelector(`.userCell[data-x="${a}"][data-y="${r}"]`),l=document.createElement("img");"vert"===d&&l.classList.add("vertical"),l.classList.add("playerShip"),0===e&&(l.classList.add("carrier"),l.src="./resources/carrier.png"),1===e&&(l.classList.add("battleship"),l.src="./resources/battleship.png"),2===e&&(l.classList.add("cruiser"),l.src="./resources/cruiser.png"),3===e&&(l.classList.add("submarine"),l.src="./resources/submarine.png"),4===e&&(l.classList.add("destroyer"),l.src="./resources/destroyer.png"),s.appendChild(l)})(d.gameboard.ships.slice(-1)[0],u.indexOf(t))}));const m=new t("AI");let h=5;for(;5!==m.gameboard.ships.length;){const t=e(),a=e(),r=0===Math.round(Math.random())?"hori":"vert";1===m.gameboard.ships.length&&(h=4),2===m.gameboard.ships.length&&(h=3),3===m.gameboard.ships.length&&(h=3),4===m.gameboard.ships.length&&(h=2),m.gameboard.placeShip(h,t,a,r)}document.querySelectorAll(".oppCell").forEach((t=>{t.addEventListener("click",(()=>{if(t.firstChild)return;const e=parseInt(t.getAttribute("data-x")),o=parseInt(t.getAttribute("data-y")),s=m.gameboard.missed.length;d.attack(e,o,m.gameboard),s<m.gameboard.missed.length?a(t):r(t);const l=d.gameboard.missed.length;let c=m.autoAttack(d.gameboard);for(;!c;)c=m.autoAttack(d.gameboard);const i=document.querySelector(`.userCell[data-x="${c[0]}"][data-y="${c[1]}"]`);l<d.gameboard.missed.length?a(i):r(i)}))}))};let s,l,c,i,n,u="hori",m=1;function h(t){if(6===m)return;const e=parseInt(t.getAttribute("data-x")),a=parseInt(t.getAttribute("data-y"));let r=document.querySelector(`.modalCell[data-x="${e+1}"][data-y="${a}"]`),o=document.querySelector(`.modalCell[data-x="${e+2}"][data-y="${a}"]`),d=document.querySelector(`.modalCell[data-x="${e+3}"][data-y="${a}"]`),s=document.querySelector(`.modalCell[data-x="${e+4}"][data-y="${a}"]`);"vert"===u&&(r=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+1}"]`),o=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+2}"]`),d=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+3}"]`),s=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+4}"]`));let l=[t,r,o,d,s];l=p(l);let c=!0,i=!1;l.forEach((t=>{t?t.classList.contains("occupied")&&(i=!0):c=!1})),c?(i&&t.classList.remove("placeError"),l.forEach((t=>{t.classList.remove("placeHover")})),t.firstChild&&t.classList.remove("alreadyPlacedError")):t.classList.remove("placeError")}function p(t){return 1===m?t:2===m?t.slice(0,4):3===m||4==m?t.slice(0,3):5===m?t.slice(0,2):void 0}document.querySelectorAll(".board").forEach((t=>{for(let e=0;e<10;e++){let a=document.createElement("div");for(let r=0;r<10;r++){let o=document.createElement("div");o.classList.add("cell"),t.classList.contains("opponent")&&o.classList.add("oppCell"),t.classList.contains("player")&&o.classList.add("userCell"),t.classList.contains("modalBoard")&&o.classList.add("modalCell"),o.dataset.x=r,o.dataset.y=e,a.appendChild(o)}a.classList.add("row"),t.appendChild(a)}})),(()=>{document.querySelectorAll(".modalCell").forEach((t=>{t.addEventListener("mouseenter",(()=>function(t){if(6===m)return;if(t.firstChild)return void t.classList.add("alreadyPlacedError");const e=parseInt(t.getAttribute("data-x")),a=parseInt(t.getAttribute("data-y"));let r=document.querySelector(`.modalCell[data-x="${e+1}"][data-y="${a}"]`),o=document.querySelector(`.modalCell[data-x="${e+2}"][data-y="${a}"]`),d=document.querySelector(`.modalCell[data-x="${e+3}"][data-y="${a}"]`),s=document.querySelector(`.modalCell[data-x="${e+4}"][data-y="${a}"]`);"vert"===u&&(r=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+1}"]`),o=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+2}"]`),d=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+3}"]`),s=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+4}"]`));let l=[t,r,o,d,s];l=p(l);let c=!0;l.forEach((t=>{t?t.classList.contains("occupied")&&(c=!1):c=!1})),c?l.forEach((t=>{t.classList.add("placeHover")})):t.classList.add("placeError")}(t))),t.addEventListener("mouseleave",(()=>h(t))),t.addEventListener("click",(()=>function(t){if(1===m){const e=parseInt(t.getAttribute("data-x")),a=parseInt(t.getAttribute("data-y"));let r=document.querySelector(`.modalCell[data-x="${e+1}"][data-y="${a}"]`),o=document.querySelector(`.modalCell[data-x="${e+2}"][data-y="${a}"]`),d=document.querySelector(`.modalCell[data-x="${e+3}"][data-y="${a}"]`),l=document.querySelector(`.modalCell[data-x="${e+4}"][data-y="${a}"]`);if("vert"===u&&(r=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+1}"]`),o=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+2}"]`),d=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+3}"]`),l=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+4}"]`)),!(r&&o&&d&&l))return;const c=[t,r,o,d,l];let i=!1;if(c.forEach((t=>{t.classList.contains("occupied")&&(i=!0)})),i)return;const n=document.createElement("img");return n.classList.add("carrier"),"vert"===u&&n.classList.add("vertical"),n.src="./resources/carrier.png",t.appendChild(n),c.forEach((t=>{t.classList.add("occupied")})),h(t),m++,document.querySelector(".modalTitle").textContent="PLACE YOUR BATTLESHIP",void(s=[e,a,u,5])}if(2===m){const e=parseInt(t.getAttribute("data-x")),a=parseInt(t.getAttribute("data-y"));let r=document.querySelector(`.modalCell[data-x="${e+1}"][data-y="${a}"]`),o=document.querySelector(`.modalCell[data-x="${e+2}"][data-y="${a}"]`),d=document.querySelector(`.modalCell[data-x="${e+3}"][data-y="${a}"]`);if("vert"===u&&(r=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+1}"]`),o=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+2}"]`),d=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+3}"]`)),!r||!o||!d)return;const s=[t,r,o,d];let c=!1;if(s.forEach((t=>{t.classList.contains("occupied")&&(c=!0)})),c)return;const i=document.createElement("img");return i.classList.add("battleship"),"vert"===u&&i.classList.add("vertical"),i.src="./resources/battleship.png",t.appendChild(i),s.forEach((t=>{t.classList.add("occupied")})),h(t),m++,document.querySelector(".modalTitle").textContent="PLACE YOUR CRUISER",void(l=[e,a,u,4])}if(3===m){const e=parseInt(t.getAttribute("data-x")),a=parseInt(t.getAttribute("data-y"));let r=document.querySelector(`.modalCell[data-x="${e+1}"][data-y="${a}"]`),o=document.querySelector(`.modalCell[data-x="${e+2}"][data-y="${a}"]`);if("vert"===u&&(r=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+1}"]`),o=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+2}"]`)),!r||!o)return;const d=[t,r,o];let s=!1;if(d.forEach((t=>{t.classList.contains("occupied")&&(s=!0)})),s)return;const l=document.createElement("img");return l.classList.add("cruiser"),"vert"===u&&l.classList.add("vertical"),l.src="./resources/cruiser.png",t.appendChild(l),d.forEach((t=>{t.classList.add("occupied")})),h(t),m++,document.querySelector(".modalTitle").textContent="PLACE YOUR SUBMARINE",void(c=[e,a,u,3])}if(4===m){const e=parseInt(t.getAttribute("data-x")),a=parseInt(t.getAttribute("data-y"));let r=document.querySelector(`.modalCell[data-x="${e+1}"][data-y="${a}"]`),o=document.querySelector(`.modalCell[data-x="${e+2}"][data-y="${a}"]`);if("vert"===u&&(r=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+1}"]`),o=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+2}"]`)),!r||!o)return;const d=[t,r,o];let s=!1;if(d.forEach((t=>{t.classList.contains("occupied")&&(s=!0)})),s)return;const l=document.createElement("img");return l.classList.add("submarine"),"vert"===u&&l.classList.add("vertical"),l.src="./resources/submarine.png",t.appendChild(l),d.forEach((t=>{t.classList.add("occupied")})),h(t),m++,document.querySelector(".modalTitle").textContent="PLACE YOUR DESTROYER",void(i=[e,a,u,3])}if(5===m){const e=parseInt(t.getAttribute("data-x")),a=parseInt(t.getAttribute("data-y"));let r=document.querySelector(`.modalCell[data-x="${e+1}"][data-y="${a}"]`);if("vert"===u&&(r=document.querySelector(`.modalCell[data-x="${e}"][data-y="${a+1}"]`)),!r)return;const o=[t,r];let s=!1;if(o.forEach((t=>{t.classList.contains("occupied")&&(s=!0)})),s)return;const l=document.createElement("img");l.classList.add("destroyer"),"vert"===u&&l.classList.add("vertical"),l.src="./resources/destroyer.png",t.appendChild(l),o.forEach((t=>{t.classList.add("occupied")})),h(t),m++,n=[e,a,u,2],document.querySelector(".placeModal").style.display="none",d()}}(t)))}));const t=document.querySelector(".changeAxis");t.addEventListener("click",(()=>{"X"===t.textContent.charAt(6)?(t.textContent="AXIS: Y",u="vert"):(t.textContent="AXIS: X",u="hori")}))})()})();