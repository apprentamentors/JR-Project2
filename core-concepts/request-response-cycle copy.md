I## Flow of information -- Request/Response  Cycle HTTP

The response request cycle is not that complicated. It may seem complicated because there are multiple tools being used in the cycle. I will walk you through the request and response cycle in my most recent program that I created.

It starts with the client making a request to the server. The client makes a request to the server. The server receives that request, does some logic and returns a response. 

Through that short process there are a few things that request goes through to while it goes to the server. I'll explain how this process is integrated with node, express and mongodb.

Node is a javascript runtime used to execute code outside of the browser. Node is simply used to execute code outside of the browser. Express is a library that uses the nodejs runtime. It is known as a helper module that has helper methods to deal with HTTP trafic easier. Mongodb is NoSQL database program that uses JSON like documents with schemas. 

Here is a diagram that illustrates the process.

![Imgur](https://i.imgur.com/MjKsTOJ.png)

As you can see. The client makes a request to our node server. From there express is used to handle the http request. Express will direct it to the correct route handler and it will handle some logic. After that the route handler will send some data to mongodb if there is anything that needs to be store. Then mongodb will send some data back up to our node server and node will send back a response.

