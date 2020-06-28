const app = require('./app');
const bookRoute = require('./routes/books');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors');
var account = require('../libros-fantsticos-firebase-adminsdk-yc2xp-9a72fb90d5.json');
admin.initializeApp({
    credential: admin.credential.cert(account)
});

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    secureConnection: false,
    secure: false,
    auth: 
    {
        user: '231da8589ee2ee',
        pass: '642a7ac4fc3430'
    }
});


const db = admin.firestore();

app.listen(app.get('port'));
app.get('/', bookRoute);

app.post('/add-book', (req, res) => {
    const newBook = {
        nombre: req.post.nombre,
        autor: req.post.autor,
        img: req.post.img,
        sinopsis: req.post.sinopsis
    };
    db.collection('libros').add(newBook);
    res.send({ result: "Succesful" });
})

app.get('/get-book', (req, res) =>
{
    let books = db.collection('libros');
    let val = new Array();
    let query = null;
    let limitSize = 10000000000;
    if(req.query.limit)
    {
        limitSize = parseInt(req.query.limit);
    }
    if(req.query.nombre)
    {
        let i = 0;
        query = books.get().then(snapshot => {
            snapshot.forEach( doc => {
                if(doc.data().nombre.indexOf(req.query.nombre) != -1 && i < limitSize)
                {
                    val.push({id: doc.id, autor: doc.data().autor, img: doc.data().img, nombre: doc.data().nombre, sinopsis: doc.data().sinopsis});
                    i++;
                }
            })
        })
    }
    else if(req.query.autor)
    {
        let i = 0;
        query = books.get().then(snapshot => {
            snapshot.forEach( doc => {
                if(doc.data().autor.indexOf(req.query.autor) != -1 && i < limitSize)
                {
                    val.push({id: doc.id, autor: doc.data().autor, img: doc.data().img, nombre: doc.data().nombre, sinopsis: doc.data().sinopsis});
                    i++;
                }
            })
        })
    }
    else{
        let i = 0;
        query = books.get().then(snapshot => {
            snapshot.forEach( doc => {
                if(i < limitSize)
                {
                    val.push({id: doc.id, autor: doc.data().autor, img: doc.data().img, nombre: doc.data().nombre, sinopsis: doc.data().sinopsis});
                    i++;
                }
            })
        })
    }
    query.finally(()=>
    {
        res.send(val);
    })
});

app.post('/send-email', (req, res)=>
{
    var mailOptions = {
        from: `${req.body.from}`,
        to: 'victoralvarez.vhoa@gmail.com',
        subject: 'Comentarios acerca de la pagina',
        text: `${req.body.msg} --Atte ${req.body.user}`
    }

    transport.sendMail(mailOptions, (error, info) =>
    {
        if(error)
        {
            console.log(error);
            res.status('404').send(error);
        }
        else
        {
            console.log('Email sent: ' + info.response);
            res.json('Email sent: ' + info.response);
        }
    })

});

console.log("Server on port: ", app.get('port'));
