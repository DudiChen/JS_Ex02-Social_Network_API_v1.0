const fs = require('fs');

const DB_NAMES_DIC = {
    users: "users.txt",
    messages: "messages.txt",
    posts: "posts.txt"
}

const saveData = (db_name, newData) => {
    if(!(db_name in DB_NAMES_DIC)) {
        throw "database name not found";
    }

    let dataArr = getData(db_name);
    let id = dataArr.length === 0 ? 1 : dataArr[dataArr.length - 1].id + 1
    dataArr.push({id: id ,...newData});
    
    fs.writeFile(DB_NAMES_DIC[db_name], JSON.stringify(dataArr), (err) => {
        if(err) {
            throw err;
        }

        console.log("data saved");
    })

    return id;
}

const getData = (db_name) => {
    if(!(db_name in DB_NAMES_DIC)) {
        throw "database name not found";
    }

    let dataArr = null;
    try {
        const jsonString = fs.readFileSync(`./${DB_NAMES_DIC[db_name]}`);
        dataArr = JSON.parse(jsonString);
    } catch(err) {
        console.log(err)
        return
    }

    return dataArr;
}

const deleteData = (db_name, id) => {
    if(!(db_name in DB_NAMES_DIC)) {
        throw "database name not found";
    }

    let dataArr = getData(db_name);
    for( var i = 0; i < dataArr.length; i++){ 
                                   
        if ( dataArr[i].id === id) { 
            dataArr.splice(i, 1); 
        }
    }

    fs.writeFile(DB_NAMES_DIC[db_name], JSON.stringify(dataArr), (err) => {
        if(err) {
            throw err;
        }

        console.log("data saved");
    })
    
}

const updateData = (db_name, id, key, value) => {
    let dataArr = getData(db_name);

    dataArr.filter(data => data.id === id).forEach(data => { data[key] = value});

    fs.writeFile(DB_NAMES_DIC[db_name], JSON.stringify(dataArr), (err) => {
        if(err) {
            throw err;
        }

        console.log("data saved");
    })
}

exports.dbNames = DB_NAMES_DIC;
exports.saveData = saveData;
exports.getData = getData;
exports.deleteData = deleteData;
exports.updateData = updateData;