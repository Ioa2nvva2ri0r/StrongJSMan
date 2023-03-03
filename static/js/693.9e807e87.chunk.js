"use strict";(self.webpackChunkstrong_js_man=self.webpackChunkstrong_js_man||[]).push([[693],{4478:function(e,i,n){n.d(i,{Z:function(){return c}});var t=n(2791),a=n(8185),o="title_main__UXULm",c=function(e){var i=e.level,n=e.cssClass,c=e.content;return t.createElement("h".concat(i),{className:(0,a.qL)(o,"active-borderColor-1",n),dangerouslySetInnerHTML:{__html:'<span class="active-color-effect"><i class="active-background-3 active-borderColor-1"></i>'.concat(c,"</span>")}})}},8371:function(e,i,n){n.r(i),n.d(i,{default:function(){return g}});var t=n(1413),a=n(2791),o=n(6132),c=n(4478),s=n(3433),l=n(8185),d=n(3898),r={list:"education_list__DoZnw",diploma__list:"education_diploma__list__gMO5L",item:"education_item__FTvM-","animation-ul15mdu":"education_animation-ul15mdu__+pF76",item__line:"education_item__line__QqPv0","item__line-indicator":"education_item__line-indicator__ftMXr",content:"education_content__6bImZ",video:"education_video__UTdXX","video-1":"education_video-1__LeOmK",title:"education_title__ld6HK",desc:"education_desc__OzsZP",desc__last:"education_desc__last__iHb0n",desc__speciality:"education_desc__speciality__KfRzh",diploma:"education_diploma__5pP5v",diploma__item:"education_diploma__item__sC6sf"},u={item:l.qL.apply(void 0,[r.item].concat((0,s.Z)((0,d.H)("borderColor-1","gradient","boxShadow-1")))),desc:function(e){return(0,l.qL)(r.desc,e&&r.desc__last,"active-color-1")},speciality:(0,l.qL)(r.desc__speciality,"active-textShadow-1"),video:function(e){return(0,l.qL)(r.video,r["video-".concat(e+1)])},link:l.qL.apply(void 0,[r.diploma].concat((0,s.Z)((0,d.H)("color-1","background-focus")))),line:(0,l.qL)(r.item__line,"active-background-1"),indicator:l.qL.apply(void 0,[r["item__line-indicator"]].concat((0,s.Z)((0,d.H)("borderColor-1","background-2")))),diplomaItem:(0,l.qL)(r.diploma__item,"active-color-1")},_=n(184),m=function(e){var i=e.specialization,n=e.speciality;return(0,_.jsxs)("p",{className:u.desc(!1),children:[i,(0,_.jsx)("br",{}),(0,_.jsxs)("strong",{className:u.speciality,children:["\xab",n,"\xbb"]})]})},p=function(e){var i=e.start,n=e.ending,t=e.diplomas,c=(0,a.useContext)(o.l).lang;return(0,_.jsxs)("p",{className:u.desc(t),children:[(0,_.jsxs)("strong",{children:[c.bool?"\u0413\u043e\u0434 \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f":"Year of admission",":"," ",(0,_.jsx)("time",{dateTime:String(i),children:i})]}),(0,_.jsx)("br",{}),(0,_.jsxs)("strong",{children:[c.bool?"\u0413\u043e\u0434 \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f":"Year of ending",":"," ",(0,_.jsx)("time",{dateTime:String(n),children:n})]})]})},v=function(e){var i=e.diplomas;return(0,_.jsx)("ul",{className:r.diploma__list,children:i.map((function(e,i){return(0,_.jsx)("li",{className:u.diplomaItem,children:(0,_.jsx)("a",(0,t.Z)((0,t.Z)({className:u.link},e),{},{target:"blank",children:e.name}))},"education-diploma-".concat(i+1))}))})},f=n(4925),x=["index"],j=function(e){var i=e.index,n=(0,f.Z)(e,x);return(0,_.jsx)("video",(0,t.Z)((0,t.Z)({className:u.video(i)},n),{},{muted:!0,loop:!0}))},b=n(637),h=function(){var e=(0,a.useContext)(o.l),i=e.screenWidth,n=e.lang,s=e.data,l=i<=1138,d=function(e,i){var n,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"play",a=null===(n=e.currentTarget.children)||void 0===n?void 0:n.namedItem(i);return"pause"===t?a.pause():a.play()},f=function(e){return(0,_.jsx)(c.Z,{level:2,cssClass:r.title,content:e})};return(0,_.jsx)("ul",{className:r.list,children:s.map((function(e){return(0,t.Z)((0,t.Z)({},e),{},{video:b.R.education[e.name],diplomas:b.B.education.diplomas[e.name]})})).map((function(e,i){return(0,_.jsxs)("li",{className:u.item,style:{animationDuration:"".concat(((i+2)/2).toFixed(1),"s")},children:[(0,_.jsxs)("div",{className:r.content,onMouseOver:function(i){return e.video&&d(i,e.name,"play")},onMouseOut:function(i){return e.video&&d(i,e.name,"pause")},children:[f(n.bool?"\u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0443\u0447\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u0435":"Educational institution"),(0,_.jsx)("p",{className:u.desc(!1),children:e.institution[n.code]}),f(n.bool?"\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f":"Specialization"),(0,_.jsx)(m,{specialization:e.specialization[n.code],speciality:e.speciality[n.code]}),f(n.bool?"\u041f\u0435\u0440\u0438\u043e\u0434 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f":"Period of study"),(0,_.jsx)(p,{start:e.start,ending:e.ending,diplomas:!e.diplomas}),e.diplomas&&(0,_.jsxs)(_.Fragment,{children:[f(n.bool?"\u0414\u0438\u043f\u043b\u043e\u043c / \u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442":"Diploma / Certificate"),(0,_.jsx)(v,{diplomas:e.diplomas})]}),(0,_.jsx)(j,(0,t.Z)({index:i,id:e.name},e.video))]}),!l&&(0,_.jsx)("span",{className:u.line,children:(0,_.jsx)("span",{className:u.indicator})})]},"education-".concat(i+1))}))})},g=a.memo(h)},4925:function(e,i,n){function t(e,i){if(null==e)return{};var n,t,a=function(e,i){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||(a[n]=e[n]);return a}(e,i);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.d(i,{Z:function(){return t}})}}]);
//# sourceMappingURL=693.9e807e87.chunk.js.map