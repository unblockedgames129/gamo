import http from 'node:http';
import fetch from 'node-fetch'; // How we are actually proxying the assets
import kuler from 'kuler'; // Console colors

console.log(`
██████╗ ██╗   ██╗███████╗███████╗██╗   ██╗
██╔══██╗██║   ██║██╔════╝██╔════╝╚██╗ ██╔╝
██████╔╝██║   ██║█████╗  █████╗   ╚████╔╝ 
██╔══██╗██║   ██║██╔══╝  ██╔══╝    ╚██╔╝  
██████╔╝╚██████╔╝██║     ██║        ██║   
╚═════╝  ╚═════╝ ╚═╝     ╚═╝        ╚═╝                                          
`);

const server = http.createServer();
const url = "https://unblockedgames129.github.io";
const PORT = process.env.PORT || 8080;

server.on('request', async (req, res) => {
    const asset = await fetch(url + req.url); // Get the asset from the website
    const body = new Buffer.from(await asset.arrayBuffer()); // Get the buffer of the asset
    res.writeHead(asset.status, { "Content-Type": asset.headers.get("content-type").split(";")[0] }); // Send the HTTP status code set the MIME type
    res.end(body); // Write the asset to the response
});

server.on('listening', () => {
  console.log(kuler(`Server has been started! Listening on port ${PORT}`, "#00ff00"));
});

// Here we start the proxy
server.listen({ port: PORT })
