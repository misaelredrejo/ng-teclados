var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Teclado {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public description: string,
    public image: string
  ) { }
}

const teclados: Teclado[] = [
  new Teclado(
    1,
    "First Keyboard",
    24.99,
    "Cheap mechanical keyboard.",
    "https://www.pcgamesn.com/wp-content/uploads/2018/07/Best-compact-gaming-keyboard-runner-up-Wooting-One-Analogue-Keyboard.png"
  ),
  new Teclado(
    2,
    "Second Keyboard",
    100.99,
    "Top tier keyboard",
    "https://cdn.mos.cms.futurecdn.net/gV598KV2biGiEUgQZSfiY.jpg"
  ),
  new Teclado(
    3,
    "Third Keyboard",
    64.99,
    "Good looking keyboard",
    "https://www.discoazul.com/uploads/media/images/teclado-gaming-thunder-x3-tk15-12.jpg"
  ),
  new Teclado(
    4,
    "Fourth Keyboard",
    29.99,
    "Very cheap very good buy it!",
    "https://www.miro.es/media/catalog/product/cache/1/image/3c227666daff9c2151d9f326ee64fd4f/i/m/image_9b89c96e4b18375906b9729fc63defb6_1584763637.jpg"
  )
]





function getTeclados(): any[] {
  return teclados;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/teclados', bodyParser.json(), (req: any, res: any) => {

  let tNew = new Teclado(
    teclados.length + 1,
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.image
  );
  teclados.push(tNew);
  res.status(200).send({ 
    id: tNew.id,
    title: tNew.title,
    price: tNew.price,
    description: tNew.description,
    images: tNew.image
   });
 
})

app.get('/', (req: any, res: any) => {
  res.send('The URL of teclados is http://localhost:8000/teclados');
});

app.get('/teclados', (req: any, res: any) => {
  res.json(getTeclados());
});


function getTecladosById(tecladoId: number): any {
  let t: any;
  t = teclados.find(p => p.id == tecladoId);
  return t;
}

app.get('/teclados/:id', (req: any, res: any) => {
  res.json(getTecladosById(parseInt(req.params.id)));
});



function updateTecladosById(req:any, tecladoId: number): any {
  let t: any;
  t = teclados.find(t => t.id == tecladoId);
  let index = teclados.indexOf(t);

  t.title =  req.body.title,
  t.price =  req.body.price,
  t.description =  req.body.description,
  t.image =  req.body.image
  
  teclados[index] = t;
  return t;
}

app.put('/teclados/:id', function (req:any, res:any) {
  res.json(updateTecladosById(req, parseInt(req.params.id)));
  res.send('Got a UPDATE request at /user');
});


function deleteTecladosById(tecladoId: number): any {
  let t: any;
  t = teclados.find(t => t.id == tecladoId);
  let index = teclados.indexOf(t);
  delete teclados[index];
  return t;
}

app.delete('/teclados/:id', function (req:any, res:any) {
  res.json(deleteTecladosById(parseInt(req.params.id)));
  res.send('Got a DELETE request at /user');
});



const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});




