const app = require('./app');
const bookRoute = require('./routes/books');
const admin = require('firebase-admin');
var account = require('../libros-fantsticos-firebase-adminsdk-yc2xp-9a72fb90d5.json');
admin.initializeApp({
    credential: admin.credential.cert(account)
});

const db = admin.firestore();

app.listen(app.get('port'));

app.get('/', bookRoute);
app.get('/add-book', (req, res) => {
    const newBook = {
        nombre: req.query.nombre,
        autor: req.query.autor,
        img: req.query.img,
        sinopsis: req.query.sinopsis
    };
    db.collection('libros').add(newBook);
    res.send({ result: "Succesful" });
})
app.get('/get-book', (req, res) =>
{
    
});

console.log("Server on port: ", app.get('port'));
