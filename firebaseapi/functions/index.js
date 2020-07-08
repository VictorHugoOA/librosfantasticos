const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp();

let transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: 
    {
        user: 'victoralvarez.vhoa@gmail.com',
        pass: 'reckxzgmpfxrijgr'
    }
});


const db = admin.firestore();

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
                if(doc.data().nombre.indexOf(req.query.nombre) !== -1 && i < limitSize)
                {
                    val.push({id: doc.id, autor: doc.data().autor, img: doc.data().img, nombre: doc.data().nombre, sinopsis: doc.data().sinopsis});
                    i++;
                }
            })
            res.send(val);
            return;
        }).catch()
    }
    else if(req.query.autor)
    {
        let i = 0;
        query = books.get().then(snapshot => {
            snapshot.forEach( doc => {
                if(doc.data().autor.indexOf(req.query.autor) !== -1 && i < limitSize)
                {
                    val.push({id: doc.id, autor: doc.data().autor, img: doc.data().img, nombre: doc.data().nombre, sinopsis: doc.data().sinopsis});
                    i++;
                }
            })
            res.send(val);
            return;
        }).catch()
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
            res.send(val);
            return;
        }).catch()
    }
});

app.get('/get-qr', (req, res) =>
{
    let book = db.collection('libros').doc(req.query.uid);
    let result = null;
    let query = book.get().then(doc=>
        {
            result = {nombre: doc.get('nombre'), autor: doc.get('autor'), sinopsis: doc.get('sinopsis')};
            res.send({msg: `${req.query.uid}: ${result.nombre}, ${result.autor}.`});
            return;
        }).catch();
})

app.get('/get-days', (req, res) =>
{
    let days = db.collection('dias');
    var val = new Array();
    let query = days.get().then((snapshot) =>
        {
            var i = 0;
            var getLimit = snapshot._size - 10;
            snapshot.forEach((el) =>
            {
                    var strDia = '';
                    var strMes = '';
                    if(el.get('dia') < 10)
                        strDia = '0' + el.get('dia');
                    else
                        strDia = el.get('dia');

                    if(el.get('mes') < 10)
                        strMes = '0' + el.get('mes');
                    else
                        strMes = el.get('mes');

                    val.push({uid: strDia + strMes + el.get('ano'), dia: el.get('dia'), mes: el.get('mes'), ano: el.get('ano'), prestamos: el.get('prestamos')})
                    console.log(`${el.get('ano')}${el.get('mes')}${el.get('dia')}`);
            })
            val.sort((a, b) => {
                return parseInt(`${a.ano}${a.mes}${a.dia}`) - parseInt(`${b.ano}${b.mes}${b.dia}`);
            })
            while(val.length > 10)
                val.pop();
            console.log(snapshot._size);
            res.json(val)
            return;
        }).catch();
})

app.post('/send-email', (req, res)=>
{
    var mailOptions = {
        from: `${req.body.from}`,
        to: 'victoralvarez.vhoa@gmail.com, floresstiker99@gmail.com',
        subject: `Comentarios acerca de la pagina: ${req.body.from}`,
        text: `${req.body.msg} --Atte ${req.body.user}. email:${req.body.from}`
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

exports.widgets = functions.https.onRequest(app);