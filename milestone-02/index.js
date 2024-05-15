import { readFile } from "fs/promises";
import * as http from "http";
import * as url from "url";
import Database from "./database.js";
import path from "path";

// A basic server function to implement a simple RESTful API.
async function basicServer(request, response) {
  // Parse the URL to get the pathname and the query parameters.
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if (request.method === 'OPTIONS') {
    // Handle preflight requests
    response.writeHead(200);
    response.end();
    return;
  }
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Grab the HTTP method.
  const method = request.method;

  if (method === "POST" && pathname === "/addProject") {
    console.log("POST /addProject");
    const database = await Database("tomato");
    let bod =await database.addProject(query.name)
    response.writeHead(200)
    response.body = bod
    response.end()
    
  } else if (method === "GET" && pathname === "/projects") {
    console.log("GET /projects");
    const database = await Database("tomato");
    let bod =await database.getProjects()
    response.writeHead(200)
    response.body = bod
    response.end()

  } else if (method === "DELETE" && pathname === "/removeProject") {
    console.log("DELETE /removeProject");
    const database = await Database("tomato");
    let bod = await database.deleteProject(query.name)
    response.writeHead(200)
    response.body = bod
    response.end()
    
    } else if (method === "POST" && pathname === "/addtask") {
        console.log("POST /addTask");
        const database = await Database("tomato");
        let bod =await database.addTask(query.project,query.name,query.due)
        response.writeHead(200)
        response.body = bod
        response.end()
        
      } else if (method === "GET" && pathname === "/tasks") {
        console.log("GET /tasks");
        const database = await Database("tomato");
        let bod =await database.getTasksInProject(query.project)
        response.writeHead(200)
        response.body = bod
        response.end()
    
      } else if (method === "DELETE" && pathname === "/removeTask") {
        console.log("DELETE /removeProject");
        const database = await Database("tomato");
        let bod = await database.deleteProject(query.project,query.name)
        response.writeHead(200)
        response.body = bod
        response.end()

  
  } else {

    // Helper function to read a file and send it back to the client.
    const sendIt = async (pathname, type) => {
      // The client files are found in the client directory, so we must prepend
      // the client path to the file requested. We also recognize the meaning of
      // a '/' to refer to the index.html file.
      const file = pathname === "/" ? "index.html" : pathname;
      try {
        const data = await readFile(
          path.join(
            path.dirname(url.fileURLToPath(import.meta.url)),
            "..",
            "client",
            file,
          ),
          "utf8",
        );
        response.writeHead(200, { "Content-Type": type });
        response.write(data);
      } catch (err) {
        response.statusCode = 404;
        response.write("Not found");
      }
      response.end();
    };

    // Determine the content type of the requested file (if it is a file).
    if (pathname.endsWith(".css")) {
      sendIt(pathname, "text/css");
    } else if (pathname.endsWith(".js")) {
      sendIt(pathname, "text/javascript");
    } else if (pathname.endsWith(".json")) {
      sendIt(pathname, "application/json");
    } else if (pathname.endsWith(".html")) {
      sendIt(pathname, "text/html");
    } else if (pathname.endsWith("/")) {
      sendIt(pathname, "text/html");
    } else {
      sendIt(pathname, "text/plain");
    }
  }
}

// Start the server on port 3260.
http.createServer(basicServer).listen(3260, () => {
  console.log("Server started on port 3260");
});
