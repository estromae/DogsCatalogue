import db from "../SqLiteDatabase"

const dogSqlList = "SELECT * FROM dog"
const dogSqlCreate = "INSERT INTO dog (breed, origin, infoUrl, imgUrl) values (?, ?, ?, ?);"
const dogSqlUpdate = "UPDATE dog SET breed=?, origin=?, infoUrl=?, imgUrl=? WHERE id = ?"
const dogSqlRemove = "DELETE FROM dog WHERE id = ?"

async function dogsList() {
    let dogs = []
    return new Promise((resolve, reject) => {
        try {
            console.log("Consultar lista de cachorros...")
            db.transaction( tx => {
                tx.executeSql(dogSqlList, 
                null,
                (transactionCurrent, resultSet) => {
                    const { rows } = resultSet
                    dogs = rows
                    resolve(dogs)
                },
                (transactionCurrent, error) => reject(error))
            },
            //error in transaction
            (error) => console.log(error),
            () => console.log("success transaction dogsList"))
        } catch (ex) {
            console.log("Erro ao consultar lista: " + ex)
        }
    })
}

//////////// User ////////////
async function dogUpdate(dog) {
    return new Promise((resolve, reject) => {
        try {
            db.transaction(tx => { 
                tx.executeSql(dogSqlUpdate, 
                    [dog.breed, dog.origin, dog.url, dog.img, dog.id],
                    (transaction, resultSet) => {
                        console.log(resultSet)
                        resolve()
                    },
                    (transaction, error) => {
                        console.log(error)
                        reject()
                    }
            )
        })
        } catch (ex) {
            console.log("Erro ao remover registro: " + ex)
            
        }
    })
}


//////////// Admin ////////////
async function dogCreate(dog) {
    return new Promise((resolve, reject) => {
        console.log("Adicionar registro na tabela...")
        try {
            db.transaction( tx => {
                tx.executeSql(dogSqlCreate, 
                    [dog.breed, dog.origin, dog.url, dog.img],
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

async function dogRemove(id) {
    return new Promise((resolve, reject) => {
        try {
            db.transaction(tx => { 
                tx.executeSql(dogSqlRemove, 
                    [id],
                    (transaction, resultSet) => {
                        resolve()
                    },
                    (transaction, error) => {
                        reject()
                        console.log(error)
                    }
            )
        })
        } catch (ex) {
            console.log("Erro ao remover registro: " + ex)  
        }
    })

}

export { dogsList, dogCreate, dogUpdate, dogRemove }