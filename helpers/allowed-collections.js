
const allowedCollections = async ( collection = '', collections = [] ) => {
    if ( !collections.includes(collection) ){
        throw new Error(`The collection ${ collection } is not allowed, ${ collections }`)
    }
}

module.exports = {
    allowedCollections,
}