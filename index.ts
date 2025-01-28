import * as http from 'node:http'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

type RouteHandlerType = (req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>

interface RoutesMap {
  GET: {
    [key: string]: RouteHandlerType
  }
  POST: {
    [key: string]: RouteHandlerType
  }
  PUT: {
    [key: string]: RouteHandlerType
  }
  DELETE: {
    [key: string]: RouteHandlerType
  }
}

class Expresso {
  private routes:RoutesMap
  private server: http.Server

  constructor() {
    this.server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });
    this.routes = {
          GET: {},
          POST: {},
          PUT: {},
          DELETE: {}
        };
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const path = req.url
    const method = req.method

    const routeHandler = this.routes[method as Methods][path as string];
    if (routeHandler) {
      routeHandler(req, res);
    } else {
      res.statusCode = 404;
      res.end('Route not found');
    }
  }

  public get(path: string, handler: RouteHandlerType): void {
    this.routes['GET'][path] = handler
  }

  public listen(port: number) {
    this.server.listen(port);
    console.log(`Server running on: localhost:${port}`);
  }
}

const app = new Expresso();

app.get('/tasks', (req, res) => {
  res.end(JSON.stringify('Handle route from handler'));
});

app.listen(3003);
