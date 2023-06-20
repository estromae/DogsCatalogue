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

// {"id":1,"breed":"Akbash","origin":"Turkey","url":"https://en.wikipedia.org/wiki/Akbash","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Akba%C5%9F_cinsi_k%C3%B6pek.jpg/220px-Akba%C5%9F_cinsi_k%C3%B6pek.jpg",
// "meta":{"height":{"dogs":"60-85 cm (24-33 in): 7","bitches":"50-75 cm (20-30 in): 7"},
//     "weight":{"dogs":"45-65 kg (99-143 lb): 7","bitches":"35-55 kg (77-121 lb): 7"},
//     "coat":"double coat: 90","img_src_set":{"1.5x":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Akba%C5%9F_cinsi_k%C3%B6pek.jpg/330px-Akba%C5%9F_cinsi_k%C3%B6pek.jpg","2x":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Akba%C5%9F_cinsi_k%C3%B6pek.jpg/440px-Akba%C5%9F_cinsi_k%C3%B6pek.jpg"},"life_span":"Not available",
//     "other_names":"Akbaş Çoban Köpeği",
//     "common_nicknames":"Not available",
//     "colour":"white: 90",
//     "litter_size":"Not available",
//     "notes":"recognised by the Ministry of Agriculture and Rural Affairs of Turkey",
//     "breed_status":"Not available",
//     "foundation_stock":"Not available"}},


//////////// User ////////////
async function dogUpdate(dog) {
    console.log("Em services id: " + dog.id)
    console.log("Em services: " + dog.breed)
    console.log("Em services : " + dog.origin)
    console.log("Em services : " + dog.url)
    console.log("Em services : " + dog.img)
    return new Promise((resolve, reject) => {
        try {
            db.transaction(tx => { 
                tx.executeSql("UPDATE dog SET breed=?, origin=?, infoUrl=?, imgUrl=? WHERE id = ?", 
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
    console.log("Em services id: " + dog.id)
    console.log("Em services " + dog.breed)
    console.log("Em services : " + dog.origin)
    console.log("Em services : " + dog.url)
    console.log("Em services : " + dog.img)
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