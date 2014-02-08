exports.description = "Simple echo command that takes an optional iteration count.";

exports.options = {
    iterations: {
        aliases: 'i',
        default: 1,
        description: "The number of times to echo back the provided message."
    },
    message: {
        noName: true,
        required: true,
        description: "The message to be echoed back to the user."
    }
};

exports.invoke = function (shell, options) {
    for (var count = 0; count < options.iterations; count++) {
        shell.log(options.message);
    }
};
