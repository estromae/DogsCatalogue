import db from "../SqLiteDatabase"

async function listUsers() {
    let users = []
    return new Promise((resolve, reject) => {
        try {
            console.log("Consultar lista de usuários...")
            db.transaction( tx => {
                tx.executeSql("SELECT * FROM user", 
                null,
                (transactionCurrent, resultSet) => {
                    const { rows } = resultSet
                    users = rows
                    resolve(users)
                },
                (transactionCurrent, error) => reject(error))
            },
            //error in transaction
            (error) => console.log(error),
            () => console.log("success transaction listUsers"))
        } catch (ex) {
            console.log("Erro ao consultar lista: " + ex)
        }
    })
}

export { listUsers }