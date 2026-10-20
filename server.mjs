import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.wasm':'application/wasm'};
const server=http.createServer((req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end('Not found');return}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)})}catch{res.writeHead(400).end()}});server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
