const net = require('net');
const HOST_IP = '39.107.224.34';
const HOST_PORT = 1001;
const LOCAL_SSH_PORT = 22;
const RECONNECT_TIME_MS = 5000;
const options = {host: HOST_IP, port: HOST_PORT};
let counter = -1;
let server = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function reconnect () {
    await sleep(RECONNECT_TIME_MS);
    console.log('reconnecting');
    control.connect({host: HOST_IP, port: HOST_PORT});
}

// device in local network first active request to host
const control = net.connect(options);
control.setEncoding('utf8')
control.on('connect', function () {
    console.log('local port ' + control.localPort + ' connect to host!');
});
control.on('data', function (data) {
    if(data=='NEW')
    {
        // server[++counter] = net.connect(options);
        console.log('new session: ' + ++counter);
        let ssh = net.connect({host: 'localhost', port: LOCAL_SSH_PORT});
        let s = net.connect(options);
        ssh.on("data", function (data) {
            s.write(data);
        });
        s.on("data", function (data) {
            ssh.write(data);
        });
    }
});
control.on('end', function () {
    console.log('server disconnected');
    reconnect();
});
control.on('error',  reconnect);

// let firstLocalSSH = net.connect({host: 'localhost', port: LOCAL_SSH_PORT});
// firstLocalSSH.on('data', function (data) {
//     control.write(data);
// });





// const proxy = net.createServer(function (c) {
//     let localSSH = net.connect({host: 'localhost', port: LOCAL_SSH_PORT});
//     c.on('data', function (data) {
//         localSSH.write(data);
//     });
//     localSSH.on('data', function (data) {
//         c.write(data);
//     })
// }).listen(control.localPort);
