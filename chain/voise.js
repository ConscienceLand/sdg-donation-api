let erc20 = require('./erc20.js');

let contract = '0x83eea00d838f92dec4d1475697b9f4d3537b56e3';

module.exports={
    addressTransactions:(address,from)=>erc20.addressTransactions(address,from, contract)
};
