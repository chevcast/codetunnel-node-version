var setupHelpers = require('./helperFunctions.js');

exports.description = 'Displays a welcome message.';

exports.invoke = function (options, shell) {
    setupHelpers(shell);
    shell.type("Well hello there! My name is Alex Ford.");
    shell.type("I'd just like to say...");
    shell.log();
    shell.log('&nbsp;/$$      /$$           /$$                                            ');
    shell.log('| $$  /$ | $$          | $$                                            ');
    shell.log('| $$ /$$$| $$  /$$$$$$ | $$  /$$$$$$$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$ ');
    shell.log('| $$/$$ $$ $$ /$$__  $$| $$ /$$_____/ /$$__  $$| $$_  $$_  $$ /$$__  $$');
    shell.log('| $$$$_  $$$$| $$$$$$$$| $$| $$      | $$  \\ $$| $$ \\ $$ \\ $$| $$$$$$$$');
    shell.log('| $$$/ \\  $$$| $$_____/| $$| $$      | $$  | $$| $$ | $$ | $$| $$_____/');
    shell.log('| $$/   \\  $$|  $$$$$$$| $$|  $$$$$$$|  $$$$$$/| $$ | $$ | $$|  $$$$$$$');
    shell.log('|__/     \\__/ \\_______/|__/ \\_______/ \\______/ |__/ |__/ |__/ \\_______/');
    shell.log();
    shell.type('...to my interactive résumé! (work in progress)');
    shell.log();
    shell.type("Type 'intro' to get started or 'help' if you've been here before.", 0, 0, 1000);
};