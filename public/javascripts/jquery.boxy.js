jQuery.fn.boxy=function(a){a=a||{};return this.each(function(){var b=this.nodeName.toLowerCase(),c=this;if(b=="a")jQuery(this).click(function(){var d=Boxy.linkedTo(this),f=this.getAttribute("href"),e=jQuery.extend({actuator:this,title:this.title},a);if(f.match(/(&|\?)boxy\.modal/))e.modal=true;if(d)d.show();else if(f.indexOf("#")>=0){d=jQuery(f.substr(f.indexOf("#")));f=d.clone(true);d.remove();e.unloadOnHide=false;new Boxy(f,e)}else if(f.match(/\.(jpe?g|png|gif|bmp)($|\?)/i)){e.unloadOnHide=true;
Boxy.loadImage(this.href,e)}else{if(!e.cache)e.unloadOnHide=true;Boxy.load(this.href,e)}return false});else b=="form"&&jQuery(this).bind("submit.boxy",function(){Boxy.confirm(a.message||"Please confirm:",function(){jQuery(c).unbind("submit.boxy").submit()});return false})})};
function Boxy(a,b){this.boxy=jQuery(Boxy.WRAPPER);jQuery.data(this.boxy[0],"boxy",this);this.visible=false;this.options=jQuery.extend({},Boxy.DEFAULTS,b||{});if(this.options.modal)this.options=jQuery.extend(this.options,{center:true,draggable:false});this.options.actuator&&jQuery.data(this.options.actuator,"active.boxy",this);this.setContent(a||"<div></div>");this._setupTitleBar();this.boxy.css("display","none").appendTo(document.body);this.toTop();if(this.options.fixed)if(Boxy.IE6)this.options.fixed=
false;else this.boxy.addClass("fixed");this.options.center&&Boxy._u(this.options.x,this.options.y)?this.center():this.moveTo(Boxy._u(this.options.x)?Boxy.DEFAULT_X:this.options.x,Boxy._u(this.options.y)?Boxy.DEFAULT_Y:this.options.y);this.options.show&&this.show()}Boxy.EF=function(){};
jQuery.extend(Boxy,{WRAPPER:"<table cellspacing='0' cellpadding='0' border='0' class='boxy-wrapper'><tr><td class='boxy-top-left'></td><td class='boxy-top'></td><td class='boxy-top-right'></td></tr><tr><td class='boxy-left'></td><td class='boxy-inner'></td><td class='boxy-right'></td></tr><tr><td class='boxy-bottom-left'></td><td class='boxy-bottom'></td><td class='boxy-bottom-right'></td></tr></table>",DEFAULTS:{title:null,closeable:true,draggable:true,clone:false,actuator:null,center:true,show:true,
modal:false,fixed:true,closeText:"[close]",unloadOnHide:false,clickToFront:false,behaviours:Boxy.EF,afterDrop:Boxy.EF,afterShow:Boxy.EF,afterHide:Boxy.EF,beforeUnload:Boxy.EF,hideFade:false,hideShrink:"vertical"},IE6:jQuery.browser.msie&&jQuery.browser.version<7,DEFAULT_X:50,DEFAULT_Y:50,MODAL_OPACITY:0.7,zIndex:1337,dragConfigured:false,resizeConfigured:false,dragging:null,load:function(a,b){b=b||{};var c={url:a,type:"GET",dataType:"html",cache:false,success:function(d){d=jQuery(d);if(b.filter)d=
jQuery(b.filter,d);new Boxy(d,b)}};jQuery.each(["type","cache"],function(){if(this in b){c[this]=b[this];delete b[this]}});jQuery.ajax(c)},loadImage:function(a,b){var c=new Image;c.onload=function(){new Boxy($('<div class="boxy-image-wrapper"/>').append(this),b)};c.src=a},get:function(a){a=jQuery(a).parents(".boxy-wrapper");return a.length?jQuery.data(a[0],"boxy"):null},linkedTo:function(a){return jQuery.data(a,"active.boxy")},alert:function(a,b,c){return Boxy.ask(a,["OK"],b,c)},confirm:function(a,
b,c){return Boxy.ask(a,["OK","Cancel"],function(d){d=="OK"&&b()},c)},ask:function(a,b,c,d){d=jQuery.extend({modal:true,closeable:false},d||{},{show:true,unloadOnHide:true});a=jQuery("<div></div>").append(jQuery('<div class="question"></div>').html(a));var f=jQuery('<form class="answers"></form>');f.html(jQuery.map(Boxy._values(b),function(e){return"<input type='button' value='"+e+"' />"}).join(" "));jQuery("input[type=button]",f).click(function(){var e=this;Boxy.get(this).hide(function(){c&&jQuery.each(b,
function(g,h){if(h==e.value){c(b instanceof Array?h:g);return false}})})});a.append(f);new Boxy(a,d)},isModalVisible:function(){return jQuery(".boxy-modal-blackout").length>0},_u:function(){for(var a=0;a<arguments.length;a++)if(typeof arguments[a]!="undefined")return false;return true},_values:function(a){if(a instanceof Array)return a;var b=[];for(var c in a)b.push(a[c]);return b},_handleResize:function(){jQuery(".boxy-modal-blackout").css("display","none").css(Boxy._cssForOverlay()).css("display",
"block")},_handleDrag:function(a){var b;if(b=Boxy.dragging)b[0].boxy.css({left:a.pageX-b[1],top:a.pageY-b[2]})},_nextZ:function(){return Boxy.zIndex++},_viewport:function(){var a=document.documentElement,b=document.body,c=window;return jQuery.extend(jQuery.browser.msie?{left:b.scrollLeft||a.scrollLeft,top:b.scrollTop||a.scrollTop}:{left:c.pageXOffset,top:c.pageYOffset},!Boxy._u(c.innerWidth)?{width:c.innerWidth,height:c.innerHeight}:!Boxy._u(a)&&!Boxy._u(a.clientWidth)&&a.clientWidth!=0?{width:a.clientWidth,
height:a.clientHeight}:{width:b.clientWidth,height:b.clientHeight})},_setupModalResizing:function(){if(!Boxy.resizeConfigured){var a=jQuery(window).resize(Boxy._handleResize);Boxy.IE6&&a.scroll(Boxy._handleResize);Boxy.resizeConfigured=true}},_cssForOverlay:function(){return Boxy.IE6?Boxy._viewport():{width:"100%",height:jQuery(document).height()}}});
Boxy.prototype={estimateSize:function(){this.boxy.css({visibility:"hidden",display:"block"});var a=this.getSize();this.boxy.css("display","none").css("visibility","visible");return a},getSize:function(){return[this.boxy.width(),this.boxy.height()]},getContentSize:function(){var a=this.getContent();return[a.width(),a.height()]},getPosition:function(){var a=this.boxy[0];return[a.offsetLeft,a.offsetTop]},getCenter:function(){var a=this.getPosition(),b=this.getSize();return[Math.floor(a[0]+b[0]/2),Math.floor(a[1]+
b[1]/2)]},getInner:function(){return jQuery(".boxy-inner",this.boxy)},getContent:function(){return jQuery(".boxy-content",this.boxy)},setContent:function(a){a=jQuery(a).css({display:"block"}).addClass("boxy-content");if(this.options.clone)a=a.clone(true);this.getContent().remove();this.getInner().append(a);this._setupDefaultBehaviours(a);this.options.behaviours.call(this,a);return this},moveTo:function(a,b){this.moveToX(a).moveToY(b);return this},moveToX:function(a){typeof a=="number"?this.boxy.css({left:a}):
this.centerX();return this},moveToY:function(a){typeof a=="number"?this.boxy.css({top:a}):this.centerY();return this},centerAt:function(a,b){var c=this[this.visible?"getSize":"estimateSize"]();typeof a=="number"&&this.moveToX(a-c[0]/2);typeof b=="number"&&this.moveToY(b-c[1]/2);return this},centerAtX:function(a){return this.centerAt(a,null)},centerAtY:function(a){return this.centerAt(null,a)},center:function(a){var b=Boxy._viewport(),c=this.options.fixed?[0,0]:[b.left,b.top];if(!a||a=="x")this.centerAt(c[0]+
b.width/2,null);if(!a||a=="y")this.centerAt(null,c[1]+b.height/2);return this},centerX:function(){return this.center("x")},centerY:function(){return this.center("y")},resize:function(a,b,c){if(this.visible){a=this._getBoundsForResize(a,b);this.boxy.css({left:a[0],top:a[1]});this.getContent().css({width:a[2],height:a[3]});c&&c(this);return this}},tween:function(a,b,c){if(this.visible){a=this._getBoundsForResize(a,b);var d=this;this.boxy.stop().animate({left:a[0],top:a[1]});this.getContent().stop().animate({width:a[2],
height:a[3]},function(){c&&c(d)});return this}},isVisible:function(){return this.visible},show:function(){if(!this.visible){if(this.options.modal){var a=this;Boxy._setupModalResizing();this.modalBlackout=jQuery('<div class="boxy-modal-blackout"></div>').css(jQuery.extend(Boxy._cssForOverlay(),{zIndex:Boxy._nextZ(),opacity:Boxy.MODAL_OPACITY})).appendTo(document.body);this.toTop();this.options.closeable&&jQuery(document.body).bind("keypress.boxy",function(b){b=b.which||b.keyCode;if(b==27){a.hide();
jQuery(document.body).unbind("keypress.boxy")}})}this.getInner().stop().css({width:"",height:""});this.boxy.stop().css({opacity:1}).show();this.visible=true;this.boxy.find(".close:first").focus();this._fire("afterShow");return this}},hide:function(a){if(this.visible){var b=this;if(this.options.modal){jQuery(document.body).unbind("keypress.boxy");this.modalBlackout.animate({opacity:0},function(){jQuery(this).remove()})}var c={boxy:{},inner:{}},d=0,f=function(){b.boxy.css({display:"none"});b.visible=
false;b._fire("afterHide");a&&a(b);b.options.unloadOnHide&&b.unload()};if(this.options.hideShrink){var e=this.getInner(),g=this.options.hideShrink,h=this.getPosition();d|=1;if(g===true||g=="vertical"){c.inner.height=0;c.boxy.top=h[1]+e.height()/2}if(g===true||g=="horizontal"){c.inner.width=0;c.boxy.left=h[0]+e.width()/2}}if(this.options.hideFade){d|=2;c.boxy.opacity=0}if(d){d&1&&e.stop().animate(c.inner,300);this.boxy.stop().animate(c.boxy,300,f)}else f();return this}},toggle:function(){this[this.visible?
"hide":"show"]();return this},hideAndUnload:function(a){this.options.unloadOnHide=true;this.hide(a);return this},unload:function(){this._fire("beforeUnload");this.boxy.remove();this.options.actuator&&jQuery.data(this.options.actuator,"active.boxy",false)},toTop:function(){this.boxy.css({zIndex:Boxy._nextZ()});return this},getTitle:function(){return jQuery("> .title-bar h2",this.getInner()).html()},setTitle:function(a){jQuery("> .title-bar h2",this.getInner()).html(a);return this},_getBoundsForResize:function(a,
b){var c=this.getContentSize();c=[a-c[0],b-c[1]];var d=this.getPosition();return[Math.max(d[0]-c[0]/2,0),Math.max(d[1]-c[1]/2,0),a,b]},_setupTitleBar:function(){if(this.options.title){var a=this,b=jQuery("<div class='title-bar'></div>").html("<h2>"+this.options.title+"</h2>");this.options.closeable&&b.append(jQuery("<a href='#' class='close'></a>").html(this.options.closeText));if(this.options.draggable){b[0].onselectstart=function(){return false};b[0].unselectable="on";b[0].style.MozUserSelect="none";
if(!Boxy.dragConfigured){jQuery(document).mousemove(Boxy._handleDrag);Boxy.dragConfigured=true}b.mousedown(function(c){a.toTop();Boxy.dragging=[a,c.pageX-a.boxy[0].offsetLeft,c.pageY-a.boxy[0].offsetTop];jQuery(this).addClass("dragging")}).mouseup(function(){jQuery(this).removeClass("dragging");Boxy.dragging=null;a._fire("afterDrop")})}this.getInner().prepend(b);this._setupDefaultBehaviours(b)}},_setupDefaultBehaviours:function(a){var b=this;this.options.clickToFront&&a.click(function(){b.toTop()});
jQuery(".close",a).click(function(){b.hide();return false}).mousedown(function(c){c.stopPropagation()})},_fire:function(a){this.options[a].call(this)}};