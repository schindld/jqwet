/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * www.tbs.gc.ca/ws-nw/wet-boew/terms / www.sct.gc.ca/ws-nw/wet-boew/conditions
 */
(function(c){var a,b;a=(typeof window.pe!=="undefined"&&window.pe!==null)?window.pe:{fn:{}};b={language:(c("html").attr("lang")?(c("html").attr("lang").indexOf("en")===0?"eng":"fra"):c("meta[name='dc.language'], meta[name='dcterms.language']").attr("content")),html5:(function(){var d=false,e=/\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi;if(typeof document.namespaces!=="undefined"){d=(document.all[0].nodeType===8)?e.test(document.all[0].nodeValue):false}else{d=(document.doctype!==null)?e.test(document.doctype.publicId):false}return(d)?false:true}()),ie:c.browser.msie?c.browser.version:0,_init:function(){var h,d,j,e,g,o,m,k,l,f,n;a.add.language(a.language);a.polyfills();if(a.mobilecheck()){a.mobile=true;h='<div data-role="page" id="jqmobile-wet-boew-menubar"><div data-role="header">';h+="<h2>"+c("#cn-psnb > :header").html()+"</h2></div>";h+='<div data-role="content" data-inset="true">';h+='<p id="jqm-mb-location-text"></p>';h+="<h2>"+c("#cn-psnb").find(":header").eq(0).html()+"</h2>";h+='<div data-role="collapsible-set">';c("#cn-psnb ul.mb-menu").clone().children().children("div:first-child,h2,h3,h4,section").each(function(){var p=c(this);if(p.is("section")){p=p.children("h2,h3,h4").eq(0)}p.html(p.text());if(p.is("div")){h+='<div data-role="button" data-icon="arrow-r" data-corners="false" class="top-level'+(p.parent().is("li:first-child")?" ui-corner-top":((p.parent().is("li:last-child")?" ui-corner-bottom":"")))+'" data-theme="a">'+c(this).html()+"</div>"}else{p.parent().find("ul").attr("data-role","listview");p.parent().find(".mb-sm div > a,.mb-sm h2,.mb-sm h3,.mb-sm h4").each(function(){var q=c(this);var r=q.parent();if(r.is("div")){r.html(r.text());r.attr("data-role","button").attr("data-icon","arrow-r").attr("data-corners","false").attr("data-theme","a").addClass("top-level"+(p.parent().is("li:first-child")?" ui-corner-top":((p.parent().is("li:last-child")?" ui-corner-bottom":""))))}else{if(r.is("section")){q.html(q.text());r.html('<div data-role="collapsible" data-theme="a">'+r.html()+"</div>")}}});h+='<div data-role="collapsible" data-theme="a">'+p.parent().html()+"</div>"}});h+="</div>";if(c("#cn-left-col").length>0){d="<h2>"+c("#cn-left-col").find(":header").eq(0).html()+"</h2>";d+='<div data-role="collapsible-set">';d+=c("#cn-left-col .cn-left-col-default").html().replace(/<section>/gi,'<section><div data-role="collapsible">').replace(/<\/section>/gi,"</div></section>");d=d.replace(/<h(.*?)>\s*<a/gmi,'<h$1><a class="ui-link" data-icon="arrow-r" data-theme="b"');d=d.replace(/<ul(.*?)>/gi,'<ul data-role="listview"$1>').replace(/<\/ul>/gi,"</ul>");d=d.replace(/<div class=\"top-level\"/gmi,'<div data-role="button" data-icon="arrow-r" class="top-level"');d+="</div>";h+=d}h+="</div></div>";a.pagecontainer().append(h);c("#cn-psnb-inner").remove();c("#cn-psnb :header").wrapInner('<a href="#jqmobile-wet-boew-menubar" data-rel="dialog"></a>');j=c("#cn-search-box");e=c('<div data-role="page" id="jqmobile-wet-boew-search"></div>');e.append(c('<div data-role="header"></div>').append(j.find(":header").clone())).append(c('<div data-role="content"></div>').append(j.find("form").clone()));a.pagecontainer().append(e);j.find("form").remove();j.find(":header").wrapInner('<a href="#jqmobile-wet-boew-search" data-rel="dialog"></a>');g=c("<ul></ul>").hide().append('<li><a data-rel="dialog" data-theme="b" data-icon="search" href="'+j.find(":header a").attr("href")+'">'+j.find(":header a").text()+"</a></li>").append('<li><a data-rel="dialog" data-theme="b"  data-icon="grid" href="'+c("#cn-psnb > :header").find("a").attr("href")+'">'+c("#cn-psnb > :header").find("a").text()+"</a></li>");c("#cn-site-title").after(c('<div data-role="navbar" data-iconpos="right"></div>').append(g));o=c("#cn-sft-inner a").attr("data-theme","b");m=c('<div data-role="navbar"><ul></ul></div>');l=m.children();o.each(function(){l.append(c("<li/>").append(this))});o=c("#cn-gcft-inner a").attr("data-theme","c");k=c('<div data-role="navbar"><ul></ul></div>');l=k.children();o.each(function(){if(c(this).parents("#cn-ft-ca").length){l.append(c('<li id="cn-ft-ca"/>').append(this))}else{l.append(c("<li/>").append(this))}});c("#cn-foot").replaceWith(m.children().after(k).end());c(document).on("mobileinit",function(){c.mobile.ajaxEnabled=false;c.mobile.pushStateEnabled=false;j.remove();c("#cn-psnb :header").remove();g.show()});c(document).on("pageinit",function(){})}f=a.url(document.getElementById("progressive").src).file;n=f.substr(f.length-7)==="-min.js"?"-min":"";n=(a.ie<9&&a.ie>0?"-ie":"")+n;a.add.css(a.add.liblocation+"css/pe-ap"+n+".css")},depends:{_ind:[],is:function(d){return -1!==c.inArray(d,a.depends._ind)},put:function(d){a.depends._ind[a.depends._ind.length]=d},on:(function(){c(document).on("wet-boew-dependency-loaded",function(){var e,f;for(e=0,f=a.depends.on.length;e<f;e++){a.depends.on[e](e)}});return[]}())},mobile:false,mobilecheck:function(){return(document.documentElement.clientWidth<767&&!(c.browser.msie&&c.browser.version<9))?true:false},pagecontainer:function(){return c("#cn-body-inner-3col,#cn-body-inner-2col,#cn-body-inner-1col").add("body").eq(0)},parameter:function(d,e){return(a.html5)?e.data(d):e.attr("class").replace("/.*"+d+"-([a-z0-9_]+).*/i","$1")},resize:function(d){ResizeEvents.initialise();ResizeEvents.eventElement.bind("x-text-resize x-zoom-resize x-window-resize",function(){d()});return},url:function(e){var d;d=document.createElement("a");d.href=e;return{source:e,protocol:d.protocol.replace(":",""),host:d.hostname,port:d.port==="0"?"80":d.port,query:d.search,params:(function(){var j,h,k,g,l,f;h={};g=d.search.replace(/^\?/,"").split("&");for(l=0,f=g.length;l<f;l++){j=g[l];if(j){k=j.split("=");h[k[0]]=k[1]}}return h}()),file:d.pathname.match(/\/([^\/?#]+)$/i)?d.pathname.match(/\/([^\/?#]+)$/i)[1]:"",hash:d.hash.replace("#",""),path:d.pathname.replace(/^([^\/])/,"/$1"),relative:d.href.match(/tps?:\/\/[^\/]+(.+)/)?d.href.match(/tps?:\/\/[^\/]+(.+)/)[1]:"",segments:d.pathname.replace(/^\//,"").split("/"),removehash:function(){return this.source.replace(/#([A-Za-z0-9-_]+)/,"")}}},_execute:function(e,f){var d=(typeof e._exec!=="undefined")?e._exec:e.exec;if(typeof e.depends!=="undefined"){a.add.js(e.depends,function(){d(f)})}else{d(f)}return},cssenabled:function(){return c("link").get(0).disabled},limit:function(e){var d;d=c(e).attr("class").match(/\blimit-\d+/);if(!d){return 0}return Number(d[0].replace(/limit-/i,""))},focus:function(d){setTimeout(function(){return(typeof d.jquery!=="undefined"?d.focus():c(d).focus())},0);return d},string:{ify:(function(){return{link:function(d){return d.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_@:~%&\?\+#\/.=]+[^:\.,\)\s*$]/ig,function(e){return'<a href="'+e+'">'+((e.length>25)?e.substr(0,24)+"...":e)+"</a>"})},at:function(d){return d.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g,function(e,g,f){return g+'@<a href="http://twitter.com/'+f+'">'+f+"</a>"})},hash:function(d){return d.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g,function(e,g,f){return g+'#<a href="http://search.twitter.com/search?q=%23'+f+'">'+f+"</a>"})},clean:function(d){return this.hash(this.at(this.link(d)))}}}()),pad:function(e,d){var f;f=String(e);while(f.length<d){f="0"+f}return f}},date:{convert:function(e){if(e.constructor===Date){return e}else{if(e.constructor===Array){return new Date(e[0],e[1],e[2])}else{if(e.constructor===Number){return new Date(e)}else{if(e.constructor===String){return new Date(e)}else{if(typeof e==="object"){return new Date(e.year,e.month,e.date)}else{return NaN}}}}}},compare:function(e,d){if(isFinite(e=this.convert(e).valueOf())&&isFinite(d=this.convert(d).valueOf())){return(e>d)-(e<d)}else{return NaN}},in_range:function(f,g,e){if(isFinite(f=this.convert(f).valueOf())&&isFinite(g=this.convert(g).valueOf())&&isFinite(e=this.convert(e).valueOf())){return g<=f&&f<=e}else{return NaN}},to_iso_format:function(g,f){var e;e=this.convert(g);if(f){return e.getFullYear()+"-"+a.string.pad(e.getMonth()+1,2,"0")+"-"+a.string.pad(e.getDate(),2,"0")+" "+a.string.pad(e.getHours(),2,"0")+":"+a.string.pad(e.getMinutes(),2,"0")}else{return e.getFullYear()+"-"+a.string.pad(e.getMonth()+1,2,"0")+"-"+a.string.pad(e.getDate(),2,"0")}}},polyfills:function(){var e=a.add.liblocation,d=(function(k){var h=k.createElement("details"),g,f,j;if(typeof h.open==="undefined"){return false}f=k.body||(function(){var l=k.documentElement;g=true;return l.insertBefore(k.createElement("body"),l.firstElementChild||l.firstChild)}());h.innerHTML="<summary>a</summary>b";h.style.display="block";f.appendChild(h);j=h.offsetHeight;h.open=true;j=j!==h.offsetHeight;f.removeChild(h);if(g){f.parentNode.removeChild(f)}return j}(document));if(!window.localStorage){a.add._load(e+"polyfills/localstorage.js")}if(typeof document.createElement("progress").position==="undefined"){a.add._load(e+"polyfills/progress.js")}if(!d){a.add._load(e+"polyfills/detailsummary.js")}},add:(function(){return{head:document.head||document.getElementsByTagName("head"),liblocation:(function(){var d=document.getElementById("progressive").src;return d.substr(0,d.lastIndexOf("/")+1)}()),staged:[],_load:function(e){var d=a.add.head;if(c.inArray(e,this.staged)>-1){return this}setTimeout(function(){if(typeof d.item!=="undefined"){if(!d[0]){setTimeout(arguments.callee,25);return}d=d[0]}var f=document.createElement("script"),g=false;a.add.set(f,"async",true);f.onload=f.onreadystatechange=function(){if((f.readyState&&f.readyState!=="complete"&&f.readyState!=="loaded")||g){return false}f.onload=f.onreadystatechange=null;g=true;a.depends.put(e);c(document).trigger({type:"wet-boew-dependency-loaded",js:e})};f.src=e;if(a.ie>0&&a.ie<9){c(f).appendTo(c(d))}else{d.insertBefore(f,d.firstChild)}},0);this.staged[this.staged.length]=e;return this},set:function(f,d,e){f.setAttribute(d,e);return this},css:function(f){var e=a.add.head,d=document.createElement("link");a.add.set(d,"rel","stylesheet").set(d,"href",f);if(a.ie>0&&a.ie<9){c(d).appendTo(c(e)).attr("href",f)}else{e.insertBefore(d,e.firstChild)}return this},depends:function(g){var f=a.add.liblocation,e=c.map(g,function(d){return(/^http(s)?/i.test(d))?d:f+"dependencies/"+d+".js"});return e},language:function(e){var d=a.add.liblocation+"i18n/"+e.substring(0,2)+".js";a.add._load(d)},js:function(f,e){var d;f=a.add.depends(f);for(d=0;d<f.length;d++){if(!a.depends.is(f[d])){a.add._load(f[d])}}a.depends.on[a.depends.on.length]=function(g){var h=true;for(d=0;d<f.length;d++){if(!a.depends.is(f[d])){h=false}}if(h){a.depends.on[g]=function(){};e()}};c(document).trigger("wet-boew-dependency-loaded");return this},meta:function(e,f){var d;d=document.createElement("meta");a.add.set(d,"name",e).set(d,"content",f);a.add.head.appendChild(d);return this}}}()),dance:function(){var d,e=(typeof wet_boew_properties!=="undefined"&&wet_boew_properties!==null)?wet_boew_properties:false;if(a.mobile){c("#jqm-mb-location-text").html(c("#cn-bc").html())}c('[class^="wet-boew-"]').each(function(){var g,f;f=c(this);g=f.attr("class").replace(/^wet-boew-(\S*).*/i,"$1".toLowerCase());if(typeof a.fn[g]!=="undefined"){a._execute(a.fn[g],f)}});if(e){for(d=0;d<e.globals.length;d++){a._execute(a.fn[e.globals[d]],document)}}c("html").removeClass("no-js").addClass("gcwu");if(a.mobile){a.add._load([a.add.liblocation+"../js/jquery.mobile/jquery.mobile.min.js"])}window.onresize=function(){if(a.mobile!==a.mobilecheck()){window.location.href=a.url(window.location.href).removehash()}}}};window.pe=c.extend(true,a,b);return window.pe}(jQuery))._init();(function(b){var a=window.pe||{fn:{}};a.fn.archived={type:"plugin",_exec:function(d){if(pe.mobile){return}var c=b('<div class="archived" role="toolbar"><a class="archived-top-page" href="#archived" role="link">'+pe.dic.get("%archived-page")+"</a></div>");b(window).on("scroll",function(){if(b(this).scrollTop()>10){c.fadeIn("normal").attr("aria-hidden","false")}else{c.fadeOut("normal").attr("aria-hidden","true")}});if(b(window).scrollTop()<10||b(window).scrollTop()==="undefined"){c.fadeOut("normal").attr("aria-hidden","true")}else{c.fadeIn("normal").attr("aria-hidden","false")}pe.pagecontainer().append(c)}};window.pe=a;return a})(jQuery);(function(b){var a=window.pe||{fn:{}};a.fn.charts={type:"plugin",depends:["excanvas","flot"],_exec:function(j){var d,h,g,f,e,c;d=b(j);e=d.find(".chart-canvas");if(!e.hasClass("fixed-size")){e.height(Math.round(e.width()/1.61663))}c=b(j).find("table").eq(0);g=[];h=f=[];c.find("thead td, thead th").each(function(){return h.push(b(this).text())});c.find("tbody tr").each(function(){var k;k={label:"",data:[]};k.label=b(this).find("th").eq(0).text();b(this).find("td").each(function(l){return k.data.push([h[l+1],b(this).text()])});return g.push(k)});b.plot(e,g,{xaxis:{tickDecimals:0}})}};window.pe=a;return a})(jQuery);(function(b){var a=window.pe||{fn:{}};a.fn.mathlib={type:"plugin",support:(function(){var c=false;if(document.createElementNS){var d="http://www.w3.org/1998/Math/MathML",f=document.createElement("div");f.style.position="absolute";f.style.color="#fff";var e=f.appendChild(document.createElementNS(d,"math")).appendChild(document.createElementNS(d,"mfrac"));e.appendChild(document.createElementNS(d,"mi")).appendChild(document.createTextNode("xx"));e.appendChild(document.createElementNS(d,"mi")).appendChild(document.createTextNode("yy"));document.body.appendChild(f);c=f.offsetHeight>f.offsetWidth;f.style.display="none"}return c})(),_exec:function(c){if(pe.mobile||pe.fn.mathlib.support){return}pe.add._load("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML")}};window.pe=a;return a})(jQuery);(function(b){var a=window.pe||{fn:{}};a.fn.menubar={type:"plugin",depends:["resize","equalheights","hoverintent","outside"],_exec:function(k){var m,d,j,p,o,l,q,n,g,c,f,h,e;o=b(k);e=function(t){var s,r;s=b(t).closest("li");s.addClass("mb-active");g();r=s.find(".mb-sm");r.attr("aria-expanded","true").attr("aria-hidden","false").toggleClass("mb-sm mb-sm-open");if((Math.floor(r.offset().left+r.width())-Math.floor(j.offset().left+j.width()))>=-1){r.css("right","0px")}return};n=function(t){var s,r;e(t);s=b(t);r=s.closest("li").find(".mb-sm-open");pe.focus(r.find("a[href]:first"));return};c=function(t){var s,r;s=b(t);r=s.closest("li").removeClass("mb-active").find(".mb-sm-open");r.attr("aria-expanded","false").attr("aria-hidden","true").toggleClass("mb-sm mb-sm-open").css("right","auto");return};g=function(){d.find(".mb-sm-open").each(function(){var r;r=b(this).closest("li");return c(r)});return};q=function(){var s,r;r=d.children("li:last");s=(r.offset().top+r.outerHeight())-o.offset().top;return o.css("min-height",s)};j=o.children("div");d=j.children("ul");o.attr("role","application");d.attr("role","menubar");if(pe.cssenabled){d.find("a").attr("tabindex","-1").attr("role","menuitem");d.find("li:first a:first").removeAttr("tabindex")}pe.resize(q);o.on("focusoutside",function(){return g()});b(document).on("click",function(){o.trigger("focusoutside")});o.on("keydown focus section-next section-previous item-next item-previous close","li",function(u){var t,r,s,v;r=b(u.target);s=b.map(/\bknav-(\d+)-(\d+)-(\d+)/.exec(r.attr("class")),function(w){return parseInt(w,10)});if(u.type==="keydown"){if(!(u.ctrlKey||u.altKey||u.metaKey)){switch(u.keyCode){case 27:r.trigger("close");u.preventDefault();return false;case 37:r.trigger("section-previous");u.preventDefault();return false;case 38:r.trigger("item-previous");u.preventDefault();return false;case 39:r.trigger("section-next");u.preventDefault();return false;case 40:r.trigger("item-next");u.preventDefault();return false}}}if(u.type==="close"){pe.focus(o.find(".knav-"+s[1]+"-0-0"));setTimeout(function(){return g()},5)}if(u.type==="section-previous"){v=!!s[2]<<1|!!s[3];switch(v){case 0:case 1:t=o.find(".knav-"+(s[1]-1)+"-0-0");if(t.length>0){pe.focus(t)}else{pe.focus(o.find("ul.mb-menu > li:last").find("a:eq(0)"))}break;case 2:case 3:t=o.find(".knav-"+(s[1])+"-"+(s[2]-1)+"-0");if(t.length>0&&s[2]>1){pe.focus(t)}else{t=o.find(".knav-"+(s[1]-1)+"-0-0");if(t.length>0){pe.focus(t)}else{pe.focus(o.find("ul.mb-menu > li:last").find("a:eq(0)"))}}break}}if(u.type==="section-next"){v=!!s[2]<<1|!!s[3];switch(v){case 0:case 1:t=o.find(".knav-"+(s[1]+1)+"-0-0");if(t.length>0){pe.focus(t)}else{pe.focus(o.find(".knav-0-0-0"))}break;case 2:case 3:t=o.find(".knav-"+(s[1])+"-"+(s[2]+1)+"-0");if(t.length>0){pe.focus(t)}else{t=o.find(".knav-"+(s[1]+1)+"-0-0");if(t.length>0){pe.focus(t)}else{pe.focus(o.find(".knav-0-0-0"))}}break}}if(u.type==="item-next"){t=o.find(".knav-"+s[1]+"-"+(s[2])+"-"+(s[3]+1));if(t.length>0){pe.focus(t)}else{t=o.find(".knav-"+s[1]+"-"+(s[2]+1)+"-0");if(t.length>0){pe.focus(t)}else{pe.focus(o.find(".knav-"+s[1]+"-0-0"))}}}if(u.type==="item-previous"){t=o.find(".knav-"+s[1]+"-"+(s[2])+"-"+(s[3]-1));if(t.length>0){pe.focus(t)}else{t=o.find(".knav-"+s[1]+"-"+(s[2]-1)+"-0");if(t.length>0){pe.focus(t)}else{pe.focus(o.find(".knav-"+s[1]+"-0-0"))}}}if(u.type==="focusin"&&s[2]===0&&s[3]===0){g();if(r.find(".expandicon").length>0){e(u.target)}return}});o.find("ul.mb-menu > li").find("a:eq(0)").each(function(s,u){var t,r;r=b(u);r.addClass("knav-"+s+"-0-0");t=r.closest("li").find(".mb-sm");if(t.size()>0){r.attr("aria-haspopup","true").addClass("mb-has-sm").wrapInner('<span class="expandicon"><span class="sublink"></span></span>');t.attr("role","menu").attr("aria-expanded","false").attr("aria-hidden","true").find(":has(:header) ul").attr("role","menu");r.append('<span class="cn-invisible">'+(pe.dic.get("%sub-menu-help"))+"</span>");r.closest("li").hoverIntent(function(){return e(this)},function(){return c(this)});t.find("h4 a").each(function(v){b(this).addClass("knav-"+s+"-"+(v+1)+"-0");b(this).parent().next("ul").find("a").each(function(w){b(this).addClass("knav-"+s+"-"+(v+1)+"-"+(w+1));return});return});t.find("ul").not(function(){return(b(this).prev("h4").length?true:false)}).find("a").each(function(v){b(this).addClass("knav-"+s+"-0-"+(v+1))})}});l=b("#cn-bc, #cn-bcrumb");if(l.size()>0&&!o.hasClass("page-match-off")){p=d.children("li").find('a[href="'+window.location.pathname+'"]');if(p.size()>0){p.eq(0).addClass("nav-current")}else{h=false;m=l.find('li a:not([href^="#"])');if(m.size()>0){f=0;while(f<=m.size()){p=d.children("li").find('a[href="'+m.eq(f).attr("href")+'"]');if(p.size()>0){p.eq(0).addClass("nav-current");h=true;break}f++}}if(!h){p=d.children("li").find('a:contains("'+l.find("li:last-child").text()+'")');if(p.size()>0){p.eq(0).addClass("nav-current")}}}}q();return o}};window.pe=a;return a}(jQuery));(function(b){var a=window.pe||{fn:{}};a.fn.searchtermhighlight={type:"plugin",_exec:function(h){var f=b(h),d={termlength:pe.parameter("minlength",f)||3,passed:pe.url(document.location).param||""};var e=(typeof passed==="string")?d.passed:d.passed.terms;form=b('<form class="wet-boew-termSearch"><label for="term">'+pe.dic.get("%search-for-terms")+'</label> <input type="text" id="term" name="term" value="'+e+'" role="textbox" aria-multiline="false" />&#160;<span class="matches-found" role="status" aria-live="polite" aria-relevant="additions text"></span></form>');$elm.before(form);form.on("change keypress click","input",function(j){setTimeout(function(){var k=b(j.delegateTarget).find("input[type=text]").attr("value");var l=b(j.delegateTarget).next();if(k.length>=d.minLength){g(l);c(k,l,d)}else{g(l)}},50)});form.submit(function(){return false});$elm.bind("searchComplete",function(k,l){var j;if(l<1){j=dictionary.noMatch}else{if(l===1){j=dictionary.oneMatch}else{j=l+dictionary.multiMatch}}b(k.target).prev().find(".matches-found").text(j)});if(e.length>=d.minLength){c(e,b(this),d)}function c(k,n,j){var m=0;var k=k.replace(/^\s+|\s+$/g,"");k=k.replace(/\|+/g,"");var o=k.split(" ");if(o.length>0){var k="";for(i=0;i<o.length;i++){if(o[i].length>=j.minLength){k+=o[i]+" "}}k=k.replace(/^\s+|\s+$|\"|\(|\)/g,"")}k=k.replace(/\s+/g,"|");k="(?=([^>]*<))([\\s'])?("+k+")(?!>)";var l=n.html().replace(new RegExp(k,"gi"),function(s,r,q,p){m++;return q+'<span class="wet-boew-highlight-term">'+p+"</span>"});n.trigger("searchComplete",[m]);n.html(l);return null}function g(j){j.find("span.wet-boew-highlight-term").each(function(){var k=b(this).text();b(this).replaceWith(k)});j.prev().find(".matches-found").text("")}return this}};window.pe=a;return a})(jQuery);(function(b){var a=window.pe||{fn:{}};a.fn.tabbedinterface={type:"plugin",depends:["easytabs","equalheights"],mobile:function(h){var d,g,f,e,c;d=h.find(".tabs li > a");g=h.find(".tabs-panel").children();f=b('<div data-role="collapsible-set"/>');for(e=0;e<d.length;e++){c=b('<div data-role="collapsible" data-theme="b" data-content-theme="b"/>');c.append("<h1>"+d.eq(e).text()+"</h1>");c.append(g.eq(e).html());if(d.eq(e).parent().hasClass("default")){c.attr("data-collapsed","false")}f.append(c)}h.replaceWith(f);return h},_exec:function(n){if(pe.mobile){return a.fn.tabbedinterface.mobile(n)}var k,x,o,d,h,u,p,q,e,c,m,v,r,w,j,l,f,g,s,t;q={panelActiveClass:"active",tabActiveClass:"active",defaultTab:((n.find(".default").length)?".default":"li:first-child"),autoHeight:(n.hasClass("auto-height-none")?false:true),cycle:(n.hasClass("cycle-slow")?8000:(n.hasClass("cycle-fast")?2000:(n.hasClass("cycle")?6000:false))),carousel:(/style-carousel/i.test(n.attr("class")))?true:false,autoPlay:(n.hasClass("auto-play")?true:false),animate:(n.hasClass("animate")||n.hasClass("animate-slow")||n.hasClass("animate-fast")?true:false),animationSpeed:(n.hasClass("animate-slow")?"slow":(n.hasClass("animate-fast")?"fast":"normal"))};x=n.find(".tabs");d=x.find("li > a");o=n.find(".tabs-panel").children();k=(x.find(".default").length>0?x.find(".default"):x.find("li:first-child"));x.attr("role","tablist");x.find("li").each(function(){b(this).attr("role","presentation");return b(this).children("a").each(function(){return b(this).attr("role","tab").attr("aria-selected","false").attr("id",b(this).attr("href").substring(1)+"-link").bind("click",function(){b(this).parent().parent().children("."+q.tabActiveClass).children("a").each(function(){b(this).attr("aria-selected","false");return b("#"+b(this).attr("href").substring(1)).attr("aria-hidden","true")});b(this).attr("aria-selected","true");return b("#"+b(this).attr("href").substring(1)).attr("aria-hidden","false")})})});o.each(function(){return b(this).attr("role","tabpanel").attr("aria-hidden","true").attr("aria-labelledby",b('a[href*="#'+b(this).attr("id")+'"]').attr("id"))});k.children("a").each(function(){b(this).attr("aria-selected","true");return b("#"+b(this).attr("href").substring(1)).attr("aria-hidden","false")});x.find("li a").bind("focus",function(){return b(this).click()});x.find("li a").keyup(function(z){if(z.keyCode===13||z.keyCode===32){var y=o.filter(function(){return b(this).is("."+q.tabActiveClass)});y.attr("tabindex","0");if(z.stopPropagation){z.stopImmediatePropagation()}else{z.cancelBubble=true}return setTimeout(function(){return y.focus()},0)}});c=function(y,E,D,C){var B,z,A;B=y.filter(function(){return b(this).is("."+D.tabActiveClass)});z=y.eq((y.index(B)-1)+y.size()%y.size());if(D.animate){E.filter("."+D.panelActiveClass).removeClass(D.panelActiveClass).attr("aria-hidden","true").fadeOut(D.animationSpeed,function(){return E.filter("#"+z.attr("href").substr(1)).fadeIn(D.animationSpeed,function(){return b(this).addClass(D.panelActiveClass).attr("aria-hidden","false")})})}else{E.removeClass(D.panelActiveClass).attr("aria-hidden","true").hide();E.filter("#"+z.attr("href").substr(1)).show().addClass(D.panelActiveClass).attr("aria-hidden","false")}y.parent().removeClass(D.tabActiveClass).children().removeClass(D.tabActiveClass).filter("a").attr("aria-selected","false");z.parent().addClass(D.tabActiveClass).children().addClass(D.tabActiveClass).filter("a").attr("aria-selected","true");A=B.parent().siblings(".tabs-toggle");if(!C&&(A.length===0||A.data("state")==="stopped")){return z.focus()}};e=function(y,E,D,C){var B,z,A;B=y.filter(function(){return b(this).is("."+D.tabActiveClass)});z=y.eq((y.index(B)+1)%y.size());if(D.animate){E.filter("."+D.panelActiveClass).removeClass(D.panelActiveClass).attr("aria-hidden","true").fadeOut(D.animationSpeed,function(){return E.filter("#"+z.attr("href").substr(1)).fadeIn(D.animationSpeed,function(){return b(this).addClass(D.panelActiveClass).attr("aria-hidden","false")})})}else{E.removeClass(D.panelActiveClass).attr("aria-hidden","true").hide();E.filter("#"+z.attr("href").substr(1)).show().addClass(D.panelActiveClass).attr("aria-hidden","false")}y.parent().removeClass(D.tabActiveClass).children().removeClass(D.tabActiveClass).filter("a").attr("aria-selected","false");z.parent().addClass(D.tabActiveClass).children().addClass(D.tabActiveClass).filter("a").attr("aria-selected","true");A=B.parent().siblings(".tabs-toggle");if(!C&&(A.length===0||A.data("state")==="stopped")){return z.focus()}};w=function(){if(u.data("state")==="stopped"){e(d,o,q,true);p(d,o,q);h.removeClass(m["class"]).addClass(v["class"]).html(v.text+"<span class='cn-invisible'>"+v["hidden-text"]+"</span>").attr("aria-pressed",true);return b(".cn-invisible",h).text(v["hidden-text"])}else{if(u.data("state")==="started"){return r()}}};if(q.autoHeight){o.show();b(".tabs-panel",n).equalHeights(true)}n.easytabs(b.extend({},q,{cycle:false}));if(q.cycle){p=function(y,B,A){var z,C;z=y.filter(function(){return b(this).is("."+A.tabActiveClass)});C=z.siblings(".tabs-roller");n.find(".tabs-toggle").data("state","started");return C.show().animate({width:z.parent().width()},A.cycle-200,"linear",function(){b(this).width(0).hide();e(y,B,A,true);return n.data("interval",setTimeout(function(){return p(y,B,A)},0))})};r=function(){clearTimeout(n.data("interval"));n.find(".tabs-roller").width(0).hide().stop();n.find(".tabs-toggle").data("state","stopped");h.removeClass(v["class"]).addClass(m["class"]).html(m.text+"<span class='cn-invisible'>"+m["hidden-text"]+"</span>").attr("aria-pressed",false);return b(".cn-invisible",h).text(m["hidden-text"])};j=b("<li class='tabs-toggle'>");s={"class":"tabs-prev",text:"&nbsp;&nbsp;&nbsp;","hidden-text":pe.dic.get("%previous")};f=b("<a class='"+s["class"]+"' href='javascript:;' role='button' aria-pressed='true'>"+s.text+"<span class='cn-invisible'>"+s["hidden-text"]+"</span></a>");x.append(j.append(f));f.click(function(){c(d,o,q)});l=b("<li class='tabs-toggle'>");t={"class":"tabs-next",text:"&nbsp;&nbsp;&nbsp;","hidden-text":pe.dic.get("%next")};g=b("<a class='"+t["class"]+"' href='javascript:;' role='button' aria-pressed='true'>"+t.text+"<span class='cn-invisible'>"+t["hidden-text"]+"</span></a>");x.append(l.append(g));g.click(function(){e(d,o,q)});n.keydown(function(y){if(y.which===37||y.which===39){c(d,o,q);y.preventDefault()}});u=b("<li class='tabs-toggle'>");v={"class":"tabs-stop",text:pe.dic.get("%stop"),"hidden-text":pe.dic.get("%tab-rotation","disable")};m={"class":"tabs-start",text:pe.dic.get("%play"),"hidden-text":pe.dic.get("%tab-rotation","enable")};h=b("<a class='"+v["class"]+"' href='javascript:;' role='button' aria-pressed='true'>"+v.text+"<span class='cn-invisible'>"+v["hidden-text"]+"</span></a>");x.append(u.append(h));u.click(w).bind("keydown",function(y){if(y.keyCode===32){w();return y.preventDefault()}});x.find("li a").not(u.find("a")).click(function(){return r()});d.each(function(){var y;y=b('<div class="tabs-roller">').hide().click(function(){return b(this).siblings("a").click()}).hover(function(){return b(this).css("cursor","text")});if(b.browser.msie&&b.browser.version<8){b(".tabs-style-2 .tabs, .tabs-style-2 .tabs li").css("filter","")}return b(this).parent().append(y)});p(d,o,q);if(!q.autoPlay){r()}}n.find('a[href^="#"]').each(function(){var y,z;z=b(this).attr("href");if(z.length>1){y=b(z,o);if(y.length){return b(this).click(function(C){var A,B;A=y.parents('[role="tabpanel"]:hidden');if(A){C.preventDefault();B=A.attr("id");A.parent().siblings(".tabs").find('a[href="#'+B+'"]').click();return y.get(0).scrollIntoView(true)}})}}});return n.attr("class",n.attr("class").replace(/\bwidget-style-/,"style-"))}};window.pe=a;return a}(jQuery));(function(b){var a=window.pe||{fn:{}};a.fn.toolbar={scope:"plugin",_exec:function(d){var c=b('<div class="wet-boew-toolbar" role="toolbar"><ul><li class="toolbar-top-page"> <a href="#cn-tphp" role="link">'+pe.dic.get("%top-of-page")+"</a> </li></ul></div>");b("#cn-body-inner-3col, #cn-body-inner-2col, #cn-body-inner-1col").add("body").first().append(c);c.hide();b(window).bind("scroll",function(){if(b(this).scrollTop()>10){c.fadeIn("normal").attr("aria-hidden","false")}else{c.fadeOut("normal").attr("aria-hidden","true")}});if(b(window).scrollTop()<10||b(window).scrollTop()==="undefined"){c.fadeOut("normal").attr("aria-hidden","true")}else{c.fadeIn("normal").attr("aria-hidden","false")}}};window.pe=b.extend(true,window.pe,a);return window.pe})(jQuery);(function(b){var a=window.pe||{fn:{}};a.fn.webwidget={type:"plugin",twitter:{_parse_entries:function(d,e,j){var h,g,c,f;h=(e>0&&e<d.length?e:d.length);f=d.sort(function(l,k){return pe.date.compare(k.created_at.replace("+0000 ","")+" GMT",l.created_at.replace("+0000 ","")+" GMT")});c='<ul class="widget-content">';g=0;while(g<h){c+='<li><a class="float-left" href="http://www.twitter.com/';c+=f[g].user.name+"/status/"+f[g].user.id+'"><img class="widget-avatar" src="'+f[g].user.profile_image_url+'" /></a> ';c+=pe.string.ify.clean(f[g].text);c+=' <span class="widget-datestamp-accent">'+pe.dic.ago(f[g].created_at)+"</span></li>";g++}c+="</ul>";return j.replaceWith(c)},_json_request:function(c){if(c.toLowerCase().indexOf("!/search/")>-1){return c.replace("http://","https://").replace(/https:\/\/twitter.com\/#!\/search\/(.+$)/,function(g,f,e,d){return"http://search.twitter.com/search.json?q="+encodeURI(decodeURI(f))})}return c.replace("http://","https://").replace(/https:\/\/twitter.com\/#!\/(.+$)/i,function(g,f,e,d){return"http://twitter.com/status/user_timeline/"+encodeURI(decodeURI(f))+".json?callback=?"})},exec:function(j,e,k){var c,g,h,f,d;h=j.length-1;c=[];f=this._parse_entries;g=j.length-1;d=[];while(g>=0){b.getJSON(this._json_request(j[g]),function(m){var l;l=0;while(l<m.length){c.push(m[l]);l++}if(!h){f(c,e,k)}return h--});d.push(g--)}return d}},weather:{_parse_entries:function(d,e,f){var c;c='<ul class="widget-content">';c+='<li><a href="'+d[1].link+'">'+d[1].title+'</a><span class="widget-datestamp">['+pe.date.to_iso_format(d[1].publishedDate,true)+"]</span></li>";c+="</ul>";return f.replaceWith(c)},exec:function(j,e,k){var c,g,h,f,d;h=j.length-1;c=[];f=this._parse_entries;g=j.length-1;d=[];while(g>=0){b.getJSON(this._json_request(j[g]),function(m){var l;l=0;while(l<m.responseData.feed.entries.length){c.push(m.responseData.feed.entries[l]);l++}if(!h){f(c,e,k)}return h--});d.push(g--)}return d},_json_request:function(d,c){var e;d=d.replace(/^.*?\.gc\.ca\/([a-z]+).+\/(.*?)_[a-z]+_([ef])\.html/i,"http://www.weatheroffice.gc.ca/rss/$1/$2_$3.xml");e="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURI(decodeURI(d));if(c>0){e+="&num="+c}return e}},rss:{_parse_entries:function(d,e,j){var h,g,c,f;h=(e>0&&e<d.length?e:d.length);f=d.sort(function(l,k){return pe.date.compare(k.publishedDate,l.publishedDate)});c='<ul class="widget-content">';g=0;while(g<h){c+='<li><a href="'+f[g].link+'">'+f[g].title+'</a><span class="widget-datestamp">['+pe.date.to_iso_format(f[g].publishedDate,true)+"]</span></li>";g++}c+="</ul>";return j.replaceWith(c)},exec:function(j,e,k){var c,g,h,f,d;h=j.length-1;c=[];f=this._parse_entries;g=j.length-1;d=[];while(g>=0){b.getJSON(this._json_request(j[g]),function(m){var l;l=0;while(l<m.responseData.feed.entries.length){c.push(m.responseData.feed.entries[l]);l++}if(!h){f(c,e,k)}return h--});d.push(g--)}return d},_json_request:function(d,c){var e;e="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURI(decodeURI(d));if(c>0){e+="&num="+c}return e}},_exec:function(h,g){var f,d,c,e;f=b(h);e=pe.limit(f);c=f.find("a").map(function(){var j;j=b(this).attr("href");if(!g&&/twitter.com/i.test(j)){g="twitter"}if(!g&&/weatheroffice.gc.ca/i.test(j)){g="weather"}if(!g){g="rss"}return b(this).attr("href")});d=b('<ul class="widget-content"><li class="widget-state-loading"><img src="'+pe.add.liblocation+'/images/ajax-loader.gif" /><span class="cn-invisible">'+pe.dic.get("%loading")+"</span></li></ul>");f.find(".widget-content").replaceWith(d);b.extend({},a.fn.webwidget[g]).exec(c,e,d);return}};window.pe=a;return window.pe})(jQuery);(function(b){var a=window.pe||{fn:{}};a.fn.zebra={type:"plugin",_exec:function(f){var c,d,e;if(f.is("table")){c=(f.children("tr").add(f.children("tbody").children("tr"))).filter(function(){return b(this).children("td").length>0});c.filter(":odd").addClass("table-even");c.filter(":even").addClass("table-odd");c.on("hover focusin focusout",function(g){g.stopPropagation();b(this).toggleClass("table-hover")})}else{d=f.children("li");e=(f.parents("li").length+1)%2;d.filter(":odd").addClass(e===0?"list-odd":"list-even");d.filter(":even").addClass(e===1?"list-odd":"list-even");d.on("mouseover mouseout focusin focusout",function(g){g.stopPropagation();b(this).toggleClass("list-hover")})}}};window.pe=a;return a}(jQuery));