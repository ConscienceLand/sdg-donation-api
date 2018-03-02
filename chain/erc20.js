let requestify = require('requestify');

let service = {
    addressTransactions: getAddressTransactions
};

function getAddressTransactions(addresses, from, token_contract) {
    return Promise.all(addresses.map((address) => getSingleAddressTransactions(address, from, token_contract)));
}

function getSingleAddressTransactions(address, from, token_contract) {
    return requestify.get('https://api.ethplorer.io/getAddressHistory/' + address + '?apiKey=freekey&type=transfer&token=' + token_contract)
        .then(results => JSON.parse(results.getBody()))
        .then(results => results.operations.map(parseTx));
}

function parseTx(transaction) {
    return {
        hash: transaction.transactionHash,
        quantity: parseInt(transaction.value) / Math.pow(10, transaction.tokenInfo.decimals),
        date: transaction.timestamp
    };
}

module.exports = service;
