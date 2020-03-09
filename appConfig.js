var developmentDatabase = {
    postgres: {
    host: 'ec2-52-73-247-67.compute-1.amazonaws.com',
    port: 5432,
    database: 'd7sc36rs0ol9m1',
    user: 'julrilmguguggt',
    password: '3d4cbdc114f6c74adb76d2f657a702bdc042bdff26955e73329d0e6703499821',
    ssl:"require"
    }
    }
    
    var connectionString = "postgressql://julrilmguguggt:3d4cbdc114f6c74adb76d2f657a702bdc042bdff26955e73329d0e6703499821@ec2-52-73-247-67.compute-1.amazonaws.com:5432/d7sc36rs0ol9m1?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
    