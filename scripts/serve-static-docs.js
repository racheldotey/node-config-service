const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");
const express = require('express');


const latest = 'v1';
const port = process.env.PORT || 5555;
const url = `http://localhost:${port}`;


// open livereload high port and start to watch current directory for changes
const liveReloadServer = livereload.createServer({ port: 35729 });
liveReloadServer.watch(__dirname);

// ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


const app = express();
// monkey patch every served HTML so they know of changes
app.use(connectLiveReload());
app.use(express.static(__dirname));

const router = express.Router();
// Push users towards the latests documentation
router.get('/', (req, res) => res.redirect(latest));
// 404 page
router.get((req, res) =>
    res.status(404).send(`The requested resource could not found. Try ${url} instead.`));

app.use(router);



app.listen(port, () => console.log(`Doc server started on ${url}`));