(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{183:function(t,e,n){var content=n(306);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("5891193d",content,!0,{sourceMap:!1})},305:function(t,e,n){"use strict";var o=n(183);n.n(o).a},306:function(t,e,n){(e=n(21)(!1)).push([t.i,'*[data-v-23c315ee],[data-v-23c315ee]:after,[data-v-23c315ee]:before{margin:0;box-sizing:border-box;text-decoration:none;list-style:none}html[data-v-23c315ee] ::-webkit-scrollbar{display:none;-webkit-appearance:none}html *[data-v-23c315ee]{font-family:Georgia,"ＭＳ 明朝";font-weight:400}html h1[data-v-23c315ee]{font-size:7vmin}html h2[data-v-23c315ee]{font-size:6.5vmin}html h3[data-v-23c315ee]{font-size:5.5vmin}html p[data-v-23c315ee]{font-size:5vmin}html a[data-v-23c315ee]{font-size:4.5vmin}html small[data-v-23c315ee]{font-size:3vmin}body[data-v-23c315ee]{background:linear-gradient(90deg,#0cf,#fff,#0af)}.page[data-v-23c315ee]{width:100%}.page-enter[data-v-23c315ee]{opacity:0}.page-enter-active[data-v-23c315ee]{transition:opacity 1s}#main[data-v-23c315ee]{height:100vh;display:flex;align-items:center;justify-content:space-evenly;flex-direction:column}#main button[data-v-23c315ee],#main div[data-v-23c315ee],#main p[data-v-23c315ee]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media screen and (orientation:portrait){#main[data-v-23c315ee]{height:100vh;margin:auto}}#main ul[data-v-23c315ee]{padding:0;list-style:none;display:flex}#main ul li[data-v-23c315ee]{width:10vw;height:10vw;margin:.5vw;display:flex;justify-content:center;align-items:center;background:#fff;border:.5px solid #000;border-radius:2vw}#main ul li div[data-v-23c315ee]{font-size:5vw}#main ul li p[data-v-23c315ee]{font-size:3vw}@media screen and (orientation:portrait){#main ul li[data-v-23c315ee]{width:20vw;height:20vh;margin:1vh}#main ul li div[data-v-23c315ee]{font-size:7vw}#main ul li p[data-v-23c315ee]{font-size:8vw}}#main .p1[data-v-23c315ee]{color:#000}#main .p2[data-v-23c315ee]{color:red;transform:rotate(180deg)}#main .serve[data-v-23c315ee]{justify-content:center;margin:auto}#main .serve button[data-v-23c315ee]{width:90vw}@media screen and (orientation:portrait){#main .serve button[data-v-23c315ee]{height:12vh;font-size:6vw}}#main .invisible[data-v-23c315ee]{opacity:0}#status[data-v-23c315ee]{display:none}',""]),t.exports=e},320:function(t,e,n){"use strict";n.r(e);n(81),n(64),n(65);var o=n(78);function r(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var l=n(83);function c(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||r(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var d=n(106),v=n(107);function h(t){for(var e,n=(e=t,Object(d.a)(e)||r(e)||Object(l.a)(e)||Object(v.a)()).slice(0),i=n.length-1;i>=0;i--){var o=Math.floor(Math.random()*(i+1)),c=[n[o],n[i]];n[i]=c[0],n[o]=c[1]}return n}var m={data:function(){return{mode_lists:[],mode:"",status:"",mountain:{p1:[],p2:[]},field:{p1:"♠♣",p2:"♥♦"},turn:!0}},created:function(){this.mode_lists=[["CPU","CPUと対戦"],["local","ローカル対人"]],this.mode="local",this.status="ゲームを開始してください";for(var i=1;i<=13;i++)this.mountain.p1.push("♠"+i),this.mountain.p1.push("♣"+i),this.mountain.p2.push("♥"+i),this.mountain.p2.push("♦"+i);this.mountain.p1=h(this.mountain.p1),this.mountain.p2=h(this.mountain.p2)},computed:{p1_hand:function(){for(var t=[],i=1;i<=4;i++)null!=this.mountain.p1[i-1]&&t.push(this.mountain.p1[i-1]);return t},p2_hand:function(){for(var t=[],i=1;i<=4;i++)null!=this.mountain.p2[i-1]&&t.push(this.mountain.p2[i-1]);return t},p1_mountain:function(){return this.mountain.p1.slice(3,-1)},p2_mountain:function(){return this.mountain.p2.slice(3,-1)},judge_can_serve:function(){var t=parseInt(this.field.p1.replace(/[^0-9]/g,"")),e=parseInt(this.field.p2.replace(/[^0-9]/g,"")),n=[t-1,t+1,e-1,e+1];n.includes(14)&&(n[n.indexOf(14)]=1),n.includes(0)&&(n[n.indexOf(0)]=13);var o,r,l=this.p1_hand.concat(this.p2_hand),d=[];for(var v in l)d.push(parseInt(l[v].replace(/[^0-9]/g,"")));return r=d,!([].concat(c(o=n),c(r)).filter((function(t){return o.includes(t)&&r.includes(t)})).length>0)}},methods:{serve:function(){this.mountain.p1.length>4?this.field.p1=this.mountain.p1.splice(4,1)[0]:this.field.p1=this.mountain.p1.splice(Math.random(4),1)[0],this.mountain.p2.length>4?this.field.p2=this.mountain.p2.splice(4,1)[0]:this.field.p2=this.mountain.p2.splice(Math.random(4),1)[0],this.turn=!this.turn},serve_p1:function(){this.turn&&this.judge_can_serve&&this.serve()},serve_p2:function(){!this.turn&&this.judge_can_serve&&this.serve()},select_one:function(t){var e=parseInt(t.replace(/[^0-9]/g,"")),n=parseInt(this.field.p1.replace(/[^0-9]/g,"")),o=parseInt(this.field.p2.replace(/[^0-9]/g,"")),r=[];r.push(e-1,e+1),r.includes(14)&&(r[r.indexOf(14)]=1),r.includes(0)&&(r[r.indexOf(0)]=13),r.includes(n)&&r.includes(o)?0==Math.random(2)?this.field.p1=t:this.field.p2=t:r.includes(n)?this.field.p1=t:r.includes(o)&&(this.field.p2=t),(r.includes(n)||r.includes(o))&&(this.mountain.p1.includes(t)?this.mountain.p1.length>4?(this.mountain.p1.splice(this.mountain.p1.indexOf(t),1,this.mountain.p1[4]),this.mountain.p1.splice(4,1)):this.mountain.p1.splice(this.mountain.p1.indexOf(t),1):this.mountain.p2.length>4?(this.mountain.p2.splice(this.mountain.p2.indexOf(t),1,this.mountain.p2[4]),this.mountain.p2.splice(4,1)):this.mountain.p2.splice(this.mountain.p2.indexOf(t),1))},add_class:function(t){return["♥","♦"].includes(t[0])?"p2":"p1"}}},f=(n(305),n(7)),component=Object(f.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"Speed"}},[n("div",{attrs:{id:"main"}},[n("div",{staticClass:"serve p2",class:{invisible:t.turn||!t.judge_can_serve}},[n("button",{on:{click:function(e){return t.serve_p2()}}},[t._v("バトルゾーンに出す。")])]),t._v(" "),n("div",[n("ul",t._l(t.p2_hand,(function(e,o){return n("li",{key:o,staticClass:"p2",on:{click:function(n){return t.select_one(e)}}},[n("div",[t._v(t._s(e))])])})),0),t._v(" "),n("ul",[n("li",[n("div",[n("p",{staticClass:"p1"},[t._v("残り")]),t._v(" "),n("p",{staticClass:"p1"},[t._v(t._s(t.p1_mountain.length)+"枚")])])]),t._v(" "),n("li",{class:t.add_class(t.field.p1)},[n("div",[n("p",{staticStyle:{transform:"rotateZ(180deg)"}},[t._v(t._s(t.field.p1))]),t._v(" "),n("p",[t._v(t._s(t.field.p1))])])]),t._v(" "),n("li",{class:t.add_class(t.field.p2)},[n("div",[n("p",{staticStyle:{transform:"rotateZ(180deg)"}},[t._v(t._s(t.field.p2))]),t._v(" "),n("p",[t._v(t._s(t.field.p2))])])]),t._v(" "),n("li",[n("div",[n("p",{staticClass:"p2"},[t._v("残り")]),t._v(" "),n("p",{staticClass:"p2"},[t._v(t._s(t.p2_mountain.length)+"枚")])])])]),t._v(" "),n("ul",t._l(t.p1_hand,(function(e,o){return n("li",{key:o,staticClass:"p1",on:{click:function(n){return t.select_one(e)}}},[n("div",[t._v(t._s(e))])])})),0)]),t._v(" "),n("div",{staticClass:"serve p1",class:{invisible:!t.turn||!t.judge_can_serve}},[n("button",{on:{click:function(e){return t.serve_p1()}}},[t._v("バトルゾーンに出す。")])])]),t._v(" "),n("div",{attrs:{id:"status"}},[n("ul",[n("li",[t._v(t._s(t.status))]),t._v(" "),n("li",[t._v("p1山札"+t._s(t.mountain.p1.slice(4)))]),t._v(" "),n("li",[t._v("p2山札"+t._s(t.mountain.p2.slice(4)))]),t._v(" "),n("li",[t._v("p1手札"+t._s(t.p1_hand))]),t._v(" "),n("li",[t._v("p2手札"+t._s(t.p2_hand))]),t._v(" "),n("li",[t._v("p1バトルゾーン"+t._s(t.field.p1))]),t._v(" "),n("li",[t._v("p2バトルゾーン"+t._s(t.field.p2))])])])])}),[],!1,null,"23c315ee",null);e.default=component.exports}}]);