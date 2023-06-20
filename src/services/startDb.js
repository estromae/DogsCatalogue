import db from "./SqLiteDatabase"

// executeSql(
//     sqlStatement: string,
//     args?: (number | string | null)[],
//     callback?: SQLStatementCallback,
//     errorCallback?: SQLStatementErrorCallback
//   ): void;

const userSqlCreateTable = "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, level INTEGER, password TEXT);"
const dogSqlCreateTable = "CREATE TABLE IF NOT EXISTS dog (id INTEGER PRIMARY KEY AUTOINCREMENT, breed TEXT, origin TEXT, infoUrl TEXT, imgUrl TEXT);"

function dropTable(tableName) {
    return new Promise((resolve, reject) => {
        try {
            db.transaction( tx => {
                tx.executeSql(`DROP TABLE ${tableName}`,
                    null,
                    (transactionCurrent, resultSet) => {
                        resolve()
                    },
                    (transactionCurrent, error) => {
                        reject()
                    })
            }),
            //error in transaction
            (error) => console.log(error),
            () => console.log("success transaction dropTable")
        } catch (ex) {
            console.log("Erro ao excluir tabela: " + ex)
        }
    })
}

function userCreateTable() {
    return new Promise((resolve, reject) => {
        console.log("Criar tabela...")
        try {
            db.transaction( tx => {
                tx.executeSql(userSqlCreateTable, 
                null,
                (transactionCurrent, resultSet) => {
                    resolve()
                    userCreate("admin", "admin@admin.com", 1, "admin")
                    userCreate("comum", "comum@comum.com", 2, "comum")
                },
                (transactionCurrent, error) => {
                    console.log(reject)
                    console.log(error)
                    reject()
                })
            }),
            //error in transaction
            (error) => console.log(error),
            () => console.log("success transaction tableCreate")
        } catch (ex) {
            console.log("Erro ao criar tabela: " + ex)
        }
    })
}

function dogCreateTable() {
    return new Promise((resolve, reject) => {
        console.log("Criar tabela...")
        try {
            db.transaction( tx => {
                tx.executeSql(dogSqlCreateTable, 
                null,
                (transactionCurrent, resultSet) => {
                    resolve()
                },
                (transactionCurrent, error) => {
                    console.log(reject)
                    console.log(error)
                    reject()
                })
            }),
            //error in transaction
            (error) => console.log(error),
            () => console.log("success transaction tableCreate")
        } catch (ex) {
            console.log("Erro ao criar tabela: " + ex)
        }
    })
}

function userCreate(name, email, level, pass) {
    return new Promise((resolve, reject) => {
        console.log("Adicionar registro na tabela...")
        try {
            db.transaction( tx => {
                tx.executeSql(
                    "INSERT INTO user (name, email, level, password) values (?, ?, ?, ?);", 
                    [name, email, level, pass],
                    (transactionCurrent, resultSet) => {
                        resolve()
                    },
                    (transactionCurrent, error) => {
                        console.log(error)
                        reject()
                    }   
                )
            }),
            //error in transaction
            (error) => console.log(error),
            () => console.log("success transaction create")
        } catch (ex) {
            console.log("Erro ao adicionar registro: " + ex)
        }
    })
}

function remove(id) {
    try {
        db.transaction(tx => { 
            tx.executeSql("DELETE FROM dog WHERE id = ?", 
            [id],
            (transaction, resultSet) => {},
            (transaction, error) => console.log(error)
        )
    })
    } catch (ex) {
        console.log("Erro ao remover registro: " + ex)
        
    }
}

export { userCreateTable, dogCreateTable, remove, dropTable }