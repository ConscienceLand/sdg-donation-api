let chain = require('../chain/voise.js');

chain.addressTransactions([
        // '0x6654caC79b2aA255Ebd70aC4914bCACD502450BF',
        '0x2984581eCE53A4390d1F568673cf693139C97049',
        '0x2984581eCE53A4390d1F568673cf693139C97049',
        '0x2984581eCE53A4390d1F568673cf693139C97049',
        '0x2984581eCE53A4390d1F568673cf693139C97049',
        '0x2984581eCE53A4390d1F568673cf693139C97049',
    ])
    .then(console.log)
    .catch(console.error);
