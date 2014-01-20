module.exports = function(shell) {
    shell.type = function (text, speed, delayBefore, delayAfter) {
        shell.log(text, {
            coolTypeOptions: {
                typeSpeed: typeof speed !== 'undefined' ? speed : 35,
                delayBeforeType: typeof delayBefore !== 'undefined' ? delayBefore : 1000,
                delayAfterType: typeof delayAfter !== 'undefined' ? delayAfter : 1000
            }
        });
    };
};