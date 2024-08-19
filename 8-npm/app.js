const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('arifin@gmail.co'));
// console.log(validator.isMobilePhone('01023456789', 'id-ID'));
// console.log(validator.isNumeric('0102s'));


console.log(chalk.italic.bgBlue('halo word'));
const pesan =chalk`Lorem ipsum dolor sit, {bgGreen.blue.bold amet} consectetur {bgBlue adipisicing elit. Ipsum,} fuga.`
console.log(pesan)