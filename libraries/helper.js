let generator = require('generate-password');

let service={
    generate_random_string: generate_random_string,
    time: time
};

function time(){
    return Math.floor(new Date()/1000);
}

function generate_random_string(length, incl_uppercase) {
    if (length === undefined)
        length = 10;
    if (incl_uppercase === undefined)
        incl_uppercase = true;
    return generator.generate({
        length: length,
        numbers: true,
        uppercase: incl_uppercase,
        excludeSimilarCharacters: true
    });
};

module.exports = service;
