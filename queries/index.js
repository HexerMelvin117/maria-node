const mariaDB = require('mariadb')
require('dotenv').config()

const pool = mariaDB.createPool({
    host: 'localhost', 
    user: process.env.MARIADB_USER, 
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    port: 3308,
    connectionLimit: 5,
});

async function asyncFunction(id, desc) {
    let conn;
    try {
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows) //[ {val: 1}, meta: ... ]
        const res = await conn.query("INSERT INTO test_table value (?, ?)", [id, `${desc}`])
        console.log(res) // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

async function queryMytable() {
    let conn;
    let resultsArray = [];

    try {
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT * FROM test_table")
        for (i = 0; i < rows.length; i++) {
            resultsArray.push(rows[i])
        }
        console.log(resultsArray)
        return resultsArray
    } catch(err) {
        throw err;
    } finally {
        if (conn) conn.end()
    }
}

async function addToTable(id, desc) {
    let conn;
    
    try {
        conn = await pool.getConnection()
        const res = await conn.query("INSERT INTO test_table value (?, ?)", [id, desc])
        console.log(res)
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end()
    }
}

async function getOneTest(id) {
    let conn;
    
    try {
        conn = await pool.getConnection()
        const res = await conn.query("SELECT * FROM test_table WHERE test_id = ?", [id])
        console.log(res)
        return res
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end()
    }
}

async function deleteTest(id) {
    let conn;
    
    try {
        conn = await pool.getConnection()
        const res = await conn.query("DELETE FROM test_table WHERE test_id = ?", [id])
        console.log(res)
        return res
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end()
    }
}

exports.deleteTest = deleteTest
exports.getOneTest = getOneTest
exports.queryMytable = queryMytable
exports.addToTable = addToTable
exports.asyncFunction = asyncFunction