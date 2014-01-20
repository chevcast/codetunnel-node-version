(function ($) {

	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	$(document).bind('initialize', function (e) {
		if (!e.firstLoad) return;

		var $content = $('#content'),
		  $loading = $('<div>')
			.css({
				//marginLeft: '45%',
				padding: '10px',
				textAlign: 'center',
				fontStyle: 'italic',
				display: 'none',
				clear: 'both'
			})
			.text('LOADING')
			.insertAfter($content);

        $content.find('code').addClass('prettyprint');
        prettyPrint();

		window.addEventListener('popstate', function (e) {
			if (e.state)
				getPageContent(e.state.url);
			else
				history.replaceState({
					url: document.location.href
				}, document.title, document.location.href);
		});

		function getPageContent(url) {
			if ($(document).data('loading'))
				return;

			$(document).data('loading', true);
			$loading.fadeIn('fast');
			$content.slideUp('fast', function () {
				$content.data('intervalId', loadingAnimation($loading));
				$.get(url).done(displayPageContent).error(function (data) {
					displayPageContent(JSON.parse(data.responseText));
				});
			});
		}

		function postFormContent(url, method, formData) {
			if ($(document).data('loading'))
				return;

			$(document).data('loading', true);
			$loading.fadeIn('fast');
			$content.slideUp('fast', function () {
				$content.data('intervalId', loadingAnimation($loading));
				$.ajax({
					url: url,
					type: method,
					data: formData
				}).done(displayPageContent).error(function (data) {
					displayPageContent(JSON.parse(data.responseText));
				});
			});
		}

		function displayPageContent(data) {
			if (data.url.split('/').pop() !== document.location.href.split('/').pop())
				history.pushState({ url: data.url }, data.url, data.url);

			$loading.fadeOut('fast', function () {
				$(document).data('loading', false);
				clearInterval($content.data('intervalId'));
				document.title = data.title;
				$content.html(data.view);
                $content.find('code').addClass('prettyprint');
                prettyPrint();
				$content.slideDown('fast', function () {
					$(document).trigger('initialize');
				});
			});
		}

		$(document).on('click', 'a.hijax', function (e) {
			e.preventDefault();
			var url = $(this).attr('href');
			getPageContent(url);
		});

		$(document).on('submit', 'form.hijax', function (e) {
			e.preventDefault();
			var $form = $(this),
				url = $form.attr('action'),
				method = $form.attr('method');
			postFormContent(url, method, $form.serializeObject());
		});
	});

	function loadingAnimation($elem) {
		var count = 0;
		return setInterval(function () {
			$elem.text('LOADING');
			for (var index = 0; index <= count; index++) {
				$elem.prepend('.');
				$elem.append('.');
			}
			count++;
			if (count >= 15) count = 0;
		}, 75);
	}

})(jQuery);