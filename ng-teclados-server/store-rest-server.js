var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Teclado = /** @class */ (function () {
    function Teclado(id, title, price, description, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
    }
    return Teclado;
}());
var teclados = [
    new Teclado(1, "First Keyboard", 24.99, "Cheap mechanical keyboard.", "https://www.pcgamesn.com/wp-content/uploads/2018/07/Best-compact-gaming-keyboard-runner-up-Wooting-One-Analogue-Keyboard.png"),
    new Teclado(2, "Second Keyboard", 100.99, "Top tier keyboard", "https://cdn.mos.cms.futurecdn.net/gV598KV2biGiEUgQZSfiY.jpg"),
    new Teclado(3, "Third Keyboard", 64.99, "Good looking keyboard", "https://www.discoazul.com/uploads/media/images/teclado-gaming-thunder-x3-tk15-12.jpg"),
    new Teclado(4, "Fourth Keyboard", 29.99, "Very cheap very good buy it!", "https://www.miro.es/media/catalog/product/cache/1/image/3c227666daff9c2151d9f326ee64fd4f/i/m/image_9b89c96e4b18375906b9729fc63defb6_1584763637.jpg")
];
function getTeclados() {
    return teclados;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/teclados', bodyParser.json(), function (req, res) {
    var tNew = new Teclado(teclados.length + 1, req.body.title, req.body.price, req.body.description, req.body.image);
    teclados.push(tNew);
    res.status(200).send({
        id: tNew.id,
        title: tNew.title,
        price: tNew.price,
        description: tNew.description,
        images: tNew.image
    });
});
app.get('/', function (req, res) {
    res.send('The URL of teclados is http://localhost:8000/teclados');
});
app.get('/teclados', function (req, res) {
    res.json(getTeclados());
});
function getTecladosById(tecladoId) {
    var t;
    t = teclados.find(function (p) { return p.id == tecladoId; });
    return t;
}
app.get('/teclados/:id', function (req, res) {
    res.json(getTecladosById(parseInt(req.params.id)));
});
function updateTecladosById(req, tecladoId) {
    var t;
    t = teclados.find(function (t) { return t.id == tecladoId; });
    var index = teclados.indexOf(t);
    t.title = req.body.title,
        t.price = req.body.price,
        t.description = req.body.description,
        t.image = req.body.image;
    teclados[index] = t;
    return t;
}
app.put('/teclados/:id', function (req, res) {
    res.json(updateTecladosById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteTecladosById(tecladoId) {
    var t;
    t = teclados.find(function (t) { return t.id == tecladoId; });
    var index = teclados.indexOf(t);
    delete teclados[index];
    return t;
}
app["delete"]('/teclados/:id', function (req, res) {
    res.json(deleteTecladosById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
