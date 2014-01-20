var images = [
    '/images/hypnotoad.gif'
];
$(images).each(function () {
	$('<img/>')[0].src = this;
});