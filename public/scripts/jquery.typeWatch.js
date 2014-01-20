(function ($) {
	$.fn.typeWatch = function (callback, delay) {
		var $this = this;

		$this.on('keyup', function () {
			var timeoutId = $this.data('typeWatchTimeoutId');
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(callback, delay);
			$this.data('typeWatchTimeoutId', timeoutId);
		});
	};
})(jQuery);