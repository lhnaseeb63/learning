const http = require('http');

const todos = [
  { id: 1, text: 'Todo One' },
  { id: 2, text: 'Todo Two' },
  { id: 3, text: 'Todo Three' },
];

const server = http.createServer((req, res) => {
  /*
     res.statusCode = 404;
     console.log(req);
     console.log(req.method);
     const { headers, url, method } = req;
     console.log(headers, url, method);
     //Can access key-value header pair easily
  // console.log(req.headers.authorization);
  */
  const { method, url } = req;
  //In HTTP we have to listen for an event to get req body info we want
  //then concatenate what's in the buffer to a variable
  let body = [];

  //404 by default because if the user goes to a route that we don't want them to we want it to not be found
  let status = 404;
  const response = {
    success: false,
    data: null,
    error: null,
  };

  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      //this is where we actually have access to the body data
      body = Buffer.concat(body).toString();

      //can test to see what the method and url are and change status and response based on that
      if (method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === 'POST' && url === '/todos') {
        //submit ID and the Text through Postman
        const { id, text } = JSON.parse(body); //need the body to be a json

        if (!id || !text) {
          status = 400; //bad request. User didnt send either the id or the text
          response.error = 'Missing field';
        } else {
          todos.push({ id, text });
          status = 201; //we have successfully created something
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, {
        'Content-type': 'application/json',
        'X-Powered-By': 'Node.js',
      });

      res.end(JSON.stringify(response));
    });
});

/* 
  res.setHeader('Content-type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
    res.write('<h1>hello</h1>');
    res.write('<h2>hello again;)</h2>');
    */

// if we are sending one thing we don't need to use res.write()

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
