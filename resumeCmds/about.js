var extend = require('extend');

exports.description = "Information about my interactive résumé application.";

exports.invoke = function (options, shell) {
    shell.clearDisplay();
    var log = function (text, options) {
        options = extend(options, { dontType: true });
        shell.log(text, options);
    };
    log('This interactive résumé application was written as a way to show off a node module that I created known as "shotgun".');
    log();
    log('Shotgun allows developers to create a simple command-style interface without having to worry about mundane and complicated tasks like parsing user input to execute the proper commands and organize arguments into an easily accessible object. Shotgun enables the developer to simply start writing the logic for their command modules, which plug into the shotgun framework seamlessly.');
    log('A great example of this is this résumé application. Each command listed in the "help" is a separate command module.')
    log();
    log('For more information about my shotgun module see: <a href="https://npmjs.org/package/shotgun">https://npmjs.org/package/shotgun</a>', { dontType: true });
    log();
    log('I am proud of Shotgun by itself, but if the developer intends to use it in the browser as you are seeing now, there is a fair amount of legwork to get that running.');
    log('To make this easier I created a second module called "shotgun-client". This module uses the popular socket.io module in the background to communicate between the browser and the server in realtime.');
    log('My shotgun-client module requires one line of code on the server and a single reference in the client in order to use shotgun from within the browser.');
    log();
    log('While this solves the issue of sending user input across the wire to shotgun running on the server and vice versa, there is still the issue of creating all the elments in the browser for the user to supply input, the response information to be displayed, etc.');
    log('Fortunately shotgun-client also comes with a JQuery plugin. This plugin only requires one line of code in the browser to create the interface you are currently using.');
    log();
    log('The shotgun-client script reference includes a reference to another JQuery plugin I wrote called "jquery.coolType". This plugin allows text to be typed out character by character in the browser, giving the interface a hollywood hi-tech feel. CoolType includes a lot of options as well as some hooks that allow you to tap into its functionality, this is what allows us to play a sound when the characters are typing and stop the sound when they are finished. Sounds are played using the SoundManager2 JavaScript library.');
    log();
    log('For more information about shotgun-client see: <a href="https://npmjs.org/package/shotgun-client">https://npmjs.org/package/shotgun-client</a>', { dontType: true });
    log('For more information about jquery.coolType see: <a href="https://github.com/Chevex/jquery.coolType">https://github.com/Chevex/jquery.coolType</a>', { dontType: true });
    log();
    log("My policy when I write a node.js module is that the module will do one job and it will do it well. I don't like modules that try to do everything under the sun and require hours of reading documentation to understand half of what the module is capable of. I like fast agile modules that solve a single problem; they are both easier to test and easier to understand. I want the developer to have freedom when writing code so my modules will always try to solve a single problem and then quickly get out of the way.");
};