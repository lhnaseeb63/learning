const http = require('http');

const todos = [
  { id: 1, text: 'Todo One' },
  { id: 2, text: 'Todo Two' },
  { id: 3, text: 'Todo Three' },
];

const server = http.createServer((req, res) => {
  //   console.log(req);
  //   console.log(req.method);
  //   const { headers, url, method } = req;
  //   console.log(headers, url, method);
  res.setHeader('Content-type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
  //   res.write('<h1>hello</h1>');
  //   res.write('<h2>hello again;)</h2>');

  // if we are sending one thing we don't need to use res.write()
  res.end(
    JSON.stringify({
      success: true,
      data: todos,
    })
  );
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
