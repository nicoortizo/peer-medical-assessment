const app = require('./app');
const config = require('./config/config');
app.listen(config.port, () => {
    console.log('server is up on port ' + config.port);
})