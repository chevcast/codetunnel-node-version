(function ($) {

    $(document).bind('initialize', function (e) {
        if (!e.firstLoad) return;

        var colorIndex = 3,
          delay = 30,
          items = [
              { cssClass: 'color', element: '#console, #console input' },
              { element: 'body', cssClass: 'bodyColor' },
              { element: '#banner, hr', cssClass: 'borderColor' },
              { element: 'a', cssClass: 'linkColor' },
              { element: '.translucentFrame', cssClass: 'containerColor' },
              { element: '.button', cssClass: 'buttonColor' },
              { element: 'input, textarea', cssClass: 'inputColor' }
          ];

        if (e.debug) {
            $debug = $('<div>').css({
                padding: 10,
                position: 'absolute',
                top: 0,
                left: 0
            })
            .appendTo('body');
        }

        function changeColors() {
            items.forEach(function (item) {
                $(item.element).removeClass(item.cssClass + colorIndex);
            });

            if (e.debug) $debug.text('colorIndex: ' + colorIndex);

            //colorIndex = Math.floor(Math.random()*23);
            colorIndex++;
            if (colorIndex > 24)
                colorIndex = 0;

            items.forEach(function (item) {
                $(item.element).addClass(item.cssClass + colorIndex);
            });
        }

        setInterval(changeColors, delay * 1000);
    });

})(jQuery);
