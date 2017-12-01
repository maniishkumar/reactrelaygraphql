import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

let app = express();
app.use(express.static('public'));


(async () => {
    try {
        let db = await MongoClient.connect(process.env.MONGO_URL);
        let schema = Schema(db);

        app.use('/graphql', GraphQLHTTP({
            schema,
            graphiql: true
        }));

        app.listen(3001, () => console.log('Listening on port 3001'));

        // Generate schema.json
        let json = await graphql(schema, introspectionQuery);
        fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
            if (err) throw err;

            console.log("JSON schema created");
        });
    } catch(e) {
        console.log(e);
    }
})();

/*MongoClient.connect(process.env.MONGO_URL, (err, database) => {
    if (err) throw err;

    db = database;
    app.use('/graphql', GraphQLHTTP({
        schema: schema(db),
        graphiql: true
    }));

    app.listen(3002, () => console.log('Listening on port 3002'));
});*/
