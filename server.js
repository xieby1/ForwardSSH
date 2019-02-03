const net = require('net');
const NAT_PORT = 1002;
const HOST_PORT = 1001;
let counter = -1;
const clients = {};
let control;
// For control
net.createServer(function (c) {
    if(!control)
        control = c;
    else
    {
        let client = clients[counter];
        client.on('data', function (data) {
            c.write(data);
        });
        c.on("data", function (data) {
            client.write(data);
        });
    }
    console.log('destination from ' + c.remoteAddress + ':' + c.remotePort + ' connected!');

    c.on('end', function () {
        control = null;
        console.log('destination from ' + c.remoteAddress + ':' + c.remotePort + ' disconnected');
    });
}).listen(HOST_PORT);

net.createServer(function (c) {
    clients[++counter] = c;
    console.log('new session:'+counter +' from ' + c.remoteAddress + ':' + c.remotePort + '');
    control.write('NEW');
    c.on('end', function () {
        console.log('session'+counter +' from ' + c.remoteAddress + ':' + c.remotePort + ' ended');
    });

}).listen(NAT_PORT);

console.log('server is running');

function refreshConnection()
{
    if(control && connectionFromClient) {
        control.on('data', function (data) {
            connectionFromClient.write(data);
        });
        connectionFromClient.on('data', function (data) {
            control.write(data);
        });
        console.log('first connection succeed!');
        ifFirstConnectForClient = false;
    }
}



