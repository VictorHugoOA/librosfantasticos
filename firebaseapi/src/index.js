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
    service: 'Gmail',
    auth: 
    {
        user: 'victoralvarez.vhoa@gmail.com',
        pass: 'reckxzgmpfxrijgr'
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

app.get('/get-qr', (req, res) =>
{
    let book = db.collection('libros').doc(req.query.uid);
    let result = null;
    let query = book.get().then(doc=>
        {
            result = {nombre: doc.get('nombre'), autor: doc.get('autor'), sinopsis: doc.get('sinopsis')};
        })

    query.finally(() =>
    {
        res.send({msg: `${req.params.uid}: ${result.nombre}, ${result.autor}.`});
    })
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
                if(i >= getLimit)
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
                }
                i++
            })
            console.log(snapshot._size);
        })
    query.finally(()=> {res.json(val)})
})

app.post('/send-email', (req, res)=>
{
    var mailOptions = {
        from: `${req.body.from}`,
        to: 'victoralvarez.vhoa@gmail.com, floresstiker99@gmail.com',
        subject: `Comentarios acerca de la pagina: ${req.body.user}`,
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
