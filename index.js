const app = require('./app');
const moduleName = 'server';
app.listen(4000, ()=>{
    console.log('info', `[${moduleName}] express is listening on port 4000`);
});