var mysql = require('mysql'),
    config = require('../config/db.js');

var pool;

exports.connect = connect;
exports.get_pool = get_pool;
exports.get = exports.get_pool;
exports.selectcount = selectcount;
exports.insert = insert;
exports.select = select;
exports.query = query;
exports.pquery = pquery;
exports.get_connection = get_connection;

function insert(table, data, connection) {
    return new Promise((resolve, reject) => {
        get_connection(connection)
            .then((conn) => {
                conn.query('INSERT INTO ?? SET ?', [table, data], (err, result) => {
                    if (!connection)
                        conn.release();
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

function connect(callback) {
    pool = mysql.createPool(config);
    callback();
};

function get_pool() {
    return pool;
};

function get_connection(connection) {
    return new Promise((resolve, reject) => {
        if (connection) {
            resolve(connection);
        } else {
            var conn = get_pool().getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(conn);
                }
            });
        }
    });
};

function pquery(conn,query,params,release_connection){
    return new Promise((resolve,reject)=>{
        conn.query(query,params,(err,result)=>{
            if(release_connection)
                conn.release();
            if(err)
                reject(Error(err));
            else
                resolve(result);
        });
    });
}

function select(query, params, connection) {
    return new Promise((resolve, reject) => {
        get_connection(connection)
            .then((conn) => {
                conn.query(query, params,
                    (err, result) => {
                        conn.release();
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else
                            resolve(result);
                    });

            });
    });
}

function query(query, params, connection) {
    return new Promise((resolve, reject) => {
        get_connection(connection)
            .then((conn) => {
                conn.query(query, params,
                    (err, result) => {
                        if (!connection)
                            conn.release();
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else
                            resolve(result);
                    });

            });
    });
}


function selectcount(query, params, connection) {
    return new Promise((resolve, reject) => {
        get_connection(connection)
            .then((conn) => {
                conn.query(query, params,
                    (err, result) => {
                        if (err) {
                            if (!connection)
                                conn.release();
                            reject(err);
                        } else {
                            conn.query('SELECT FOUND_ROWS() as count;', (err, res) => {
                                if (err) {
                                    if (!connection)
                                        conn.release();
                                    reject(err);
                                } else {
                                    if (!connection)
                                        conn.release();
                                    resolve({
                                        "data": result,
                                        "count": res[0].count
                                    });
                                }
                            });
                        }
                    });

            });
    });
};
