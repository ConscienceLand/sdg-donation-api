let requestify = require('requestify');

let service={
    addressTransactions: getAddressTransactions
};

function getAddressTransactions(addresses, from){
    return requestify.get('https://api.blockcypher.com/v1/eth/main/addrs/'+addresses.join(';')+'?limit=2000&after='+from)
        .then((results)=>results.getBody().map((result)=>result.txrefs?result.txrefs.map(parseTx):[]));
}

function parseTx(transaction){
    return {
        hash: transaction.tx_hash,
        quantity: transaction.value*10e-16,
        date: transaction.confirmed,
        double_spend: transaction.double_spend
    };
}

module.exports=service;
