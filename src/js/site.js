;(function(){


	// handle forms page hero button
	var funnyMessages = [
		'Ouch!',
		'You like that huh!?',
		'Push it! Push it!',
		'Legend says that if you push the download button on a full moon, you will get a raise in the next 3 to 6 months... just sayin...',
		'Stop playing, get your forms done!'
	];

	$('.form-funny-button').on('click', function(e){
		e.preventDefault();
		var i = Math.floor(Math.random() * funnyMessages.length);
		alert(funnyMessages[i]);
	});


	$('.toggle-menu').on('click', function(e){
		e.preventDefault();
		var $header = $('.header-nav');

		if ($header.hasClass('open')){
			$header.removeClass('open');
		}else{
			$header.addClass('open');
		}
	});

	$('[name="coats[]"]').on('change', function(e){
		var $this = $(this),
			id = $this.attr('value');

		if ($this.is(':checked')){
			injectStylesheet(id);
			params.coats += '|' + id;
		}else{
			removeStylesheet(id);
			params.coats = params.coats.replace(id, '');
		}

		updateLinks();
	});

	function updateLinks(){
		var $el,
			queryString = '?coats=' + params.coats.replace(/\|\|+/g, '|').replace(/^\||\|$/, '');

		$('a').each(function(i, el){
			$el = $(el);
			if ($el.attr('href') && !/#/.test($el.attr('href'))){
				$el.attr('href', $el.attr('href').split('?')[0] + queryString);
			}
		});

		var coats = params.coats.split('|');
		$('[name="coats[]"]').each(function(i, el){
			if (coats.indexOf(el.value) !== -1){
				$(el).attr('checked', true).data('checkboxjs').refresh();
			}
		});
	}

	function injectStylesheet(id){
		$('head').append('<link rel="stylesheet" href="bower_components/'+id+'/src/css/'+id+'.css" id="'+id+'">');
	}

	function removeStylesheet(id){
		$('#'+id).remove();
	}

	var queryString = decodeURIComponent(window.location.search.substring(1)),
		queryPairs = queryString.split('&'),
		i = 0,
		pair,
		params = {
			coats: ''
		};

	for (i = 0; i < queryPairs.length; i++){
		pair = queryPairs[i].split('=');
		params[pair[0]] = pair[1];
	}


	if (params.coats){
		var c = params.coats.split('|');
		for (i = 0; i < c.length; i++){
			injectStylesheet(c[i]);
		}
		updateLinks();
	}

	/*Peekjs.onOpenRight(function(){
		$('.side-nav a').sequence({
			offset: 30,
			properties: {
				transform: 'none'
			}
		});
	});

	Peekjs.onCloseRight(function(){
		$('.side-nav a').removeAttr('style');
	});*/

	// allow code sample areas to scroll horizontally without peeking
	$('pre').on('touchmove', function(e){
		e.stopPropagation();
	});
})();