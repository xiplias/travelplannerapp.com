/*	jquery.item-suggest 1.0 - 2009-01-16 -- by ddunlop.com
 *	based on Peter Vulgaris's (www.vulgarisoip.com) jquery.suggest
 */

(function($) {
	$.suggest = function(input, options) {
		var t = this;
		t.input = input;
		t.options = options;
		t.$input = $(input).attr("autocomplete", "off");
		t.$results = $(document.createElement("ul"));
		t.currentItem = -1;
		t.items = false;

		t.timeout = false;	// hold timeout ID for suggestion results to appear
		t.prevLength = 0;	// last recorded length of $input.val()
		t.cache = [];		// cache MRU list
		t.cacheSize = 0;	// size of cache in chars (bytes?)

		t.$results.addClass(t.options.resultsClass).appendTo('body');

		t.resetPosition();
		$(window)
			.load(function() { t.resetPosition() })		// just in case user is changing size of page while loading
			.resize(function() { t.resetPosition() });

		t.$input.blur(function() {
			setTimeout(function() {
				t.hideResults();
			}, 200);
		});

		// help IE users if possible
		try {
			t.$results.bgiframe();
		} catch(e) { }

		// I really hate browser detection, but I don\'t see any other way
		if ($.browser.mozilla)
			t.$input.keypress(function(e) { t.processKey(e); });	// onkeypress repeats arrow keys in Mozilla/Opera
		else
			t.$input.keydown(function(e) { t.processKey(e); });	// onkeydown repeats arrow keys in IE/Safari

	}

$.extend($.suggest.prototype, {
	addMatchClass:function(txt,q) {
		return txt.replace(new RegExp(q, 'ig'), '<span class="'+this.options.matchClass+'">$&</span>');
	},
	resetPosition:function() {
		var offset = this.$input.offset();
		this.$results.css({
			top: (offset.top + this.input.offsetHeight) + 'px',
			left: offset.left + 'px'
		});
	},
	processKey:function(e) {
		// handling up/down/escape requires results to be visible
		// handling enter/tab requires that AND a result to be selected
		if ((/27$|38$|40$/.test(e.keyCode) && this.$results.is(':visible')) ||
			(/^13$|^9$/.test(e.keyCode) && this.currentItem>=0)) {

			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();

			e.cancelBubble = true;
			e.returnValue = false;

			switch(e.keyCode) {
				case 38: // up
					this.selectItem(this.currentItem-1);
					break;
				case 40: // down
					this.selectItem(this.currentItem+1);
					break;
				case 9:  // tab
				case 13: // return
					this.selectCurrentItem();
					break;
				case 27: //	escape
					this.hideResults();
					break;

			}
		} else if (this.$input.val().length != this.prevLength) {
			var t=this;
			if (t.timeout)
				clearTimeout(t.timeout);
			t.timeout = setTimeout(function() { t.suggest() }, t.options.delay);
			t.prevLength = t.$input.val().length;
		}
	},
	suggest:function() {
		var q = $.trim(this.$input.val());

		if (q.length >= this.options.minchars) {
			cached = this.checkCache(q);

			if (cached) {
				this.items = cached['items'];
				this.displayItems(q);
			} else {
				var t = this;
				$.get(t.options.source, {q: q}, function(txt) {
					t.hideResults();

					t.items = t.options.createItems?t.options.createItems.call(this,txt):txt.split(t.options.delimiter);

					t.displayItems(q);
					t.addToCache(q, txt.length);
				});
			}
		} else {
			this.hideResults();
		}
	},
	checkCache:function(q) {
		for (var i = 0; i < this.cache.length; i++)
			if (this.cache[i]['q'] == q) {
				this.cache.unshift(this.cache.splice(i, 1)[0]); // add to front to implement LRU
				return this.cache[0];
			}
		return false;
	},
	addToCache:function(q, size) {
		while (this.cache.length && (this.cacheSize + size > this.options.maxCacheSize)) {
			var cached = this.cache.pop();
			this.cacheSize -= cached['size'];
		}

		this.cache.push({
			q:q,
			size:size,
			items:this.items
			});
		this.cacheSize += size;
	},
	displayItems:function(q) {
		var t = this;
		if (!t.items) return;

		var html = '';
		for (var i = 0; i < t.items.length; i++) {
			var item = t.options.formatItem?t.options.formatItem.call(t,t.items[i],q):t.formatItem(t.items[i],q);
			if(!item) t.items.splice(i,1); // remove false items
			else html+=item;
		}

		if (!t.items.length) {
			t.hideResults();
			return;
		}

		t.$results.html(html).show().children()
			.mouseover(function() {
				var $items = t.$results.children();
				for(var i=0;i<$items.length;i++) if($items[i]==this) break;
				t.selectItem(i);
			})
			.click(function(e) {
				t.selectCurrentItem();
				return false;
			});
	},
	formatItem:function(txt,q) {
		txt=$.trim(txt);
		if(txt) return '<li>'+this.addMatchClass(txt,q)+'</li>';
		return false;
	},
	hideResults:function() {
		this.$results.hide();
		this.currentItem=-1;
	},
	selectItem:function(i) {
		if(i<0) i=this.items.length-1;
		if(i>=this.items.length) i=0;
		this.currentItem=i;
		this.$results.children().removeClass(this.options.selectClass).eq(i).addClass(this.options.selectClass);
	},
	selectCurrentItem:function() {
		if (this.currentItem>=0) {
			var item = this.currentItem;
			this.$input.val(this.options.selectItemText?this.options.selectItemText.call(this,this.items[item]):this.$results.children().eq(item).text());
			this.hideResults();

			if (this.options.onSelect)
				this.options.onSelect.call(this.$input[0],this.items[item]);
		}
	}
});



	$.fn.suggest = function(source, options) {
		if (!source) return;

		options = $.extend({
			delay:100,
			resultsClass:'ac_results',
			selectClass:'ac_over',
			matchClass:'ac_match',
			minchars:2,
			delimiter:'\n',
			createItems:false,
			formatItem:false,
			selectItemText:false,
			onSelect:false,
			maxCacheSize:65536
		},options);
		options.source = source;

		this.each(function() {
			new $.suggest(this, options);
		});

		return this;
	};
})(jQuery);