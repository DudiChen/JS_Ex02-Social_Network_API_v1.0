const fs = require('fs');

const DB_NAMES_DIC = {
    users: "user_data.txt",
    messages: "messages.txt",
    posts: "posts.txt"
}

const saveData = (db_name, data) => {
    if(!(db_name in DB_NAMES_DIC)) {
        throw "database name not found";
    }

    console.log(`writing to database ${db_name}`);
    console.log(`writing to file ${DB_NAMES_DIC[db_name]}`);

    fs.appendFile(DB_NAMES_DIC[db_name], `${JSON.stringify(data)},\n`, (err) => {
        if(err) {
            throw err;
        }

        console.log("data saved");
    })
}

exports.saveData = saveData;
exports.dbNames = DB_NAMES_DIC;