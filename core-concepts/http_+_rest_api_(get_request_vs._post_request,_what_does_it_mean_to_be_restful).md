# HTTP + REST API (GET request vs. POST request, what does it mean to be RESTful)

REST stands for Representational state transfer. It is an architectural style for networked hypermedia applications. It is mainly used for web services. If it is used for web services then that would make it a RESTful service. REST does not depend on any protocol but the majority of RESTful services use HTTP as its protocol.

### HTTP Request

There are five characteristics to an HTTP request. It is the `verb` `URI`,`HTTP Version`, `Request Header`,`Request Body`.

I'll just touch on the `verb` part. There are four methods for an http request. They are `GET`, `POST`, `PUT`, `DELETE` and `OPTIONS`. I'll touch on GET and POST. A GET request is basically when the client makes a request to the server and the server returns back the data the client asked for. A POST request is when the client post some data to the server. The server takes that data and stores it in the database. 

## REST

There are some important features of REST. Here are some of them.

* Representation
* Messages
* URI's
* Uniform interface
* Stateless
* Links between resources
* Caching

### Representation


Representation stands for the representation or access to the resources. Resource is basically an object of data. An example is if your accessing a library catalog site, the resource for that site would be the books.
The resource can be represented in to different formats. The two main formats are XML and JSON. 

Here is an example of a person resource in json.

```
{
	id: '23'
	name: 'Bob',
	age: '33',
	country: 'USA'
}

```

### Messages

Messages are can be thought of when the client talks to the server and the server replies with a response. When the server replies with a response it sends back the desired data but it also sends back metadata.

### URI's

URI stands for Uniform Resource Identifier and it is the resource that you are trying to access. An example URI is `http://www.dogsite.com/dogs`. This would be the URI for a GET request to the resource dogs.

### Stateless

A RESTful service is  stateless. Any request that is sent by the client should only contain the state it needs to carry out the request. This is done because HTTP is a stateless protocol by design as well. 

A strong quality of being stateless is when a request is sent to multiple servers due to a server being down. Since this request is stateless then the  server can still carry out the request without having to remember previous state from another server. This type of stateless communication would allow the servers to break down because the request can be redeployed without any issues due to it being stateless.

A weak quality for this would be if a http request contains state. This means that the server would have to remember a previous request that was sent in order to carry out the service. This could be problematic because of the fact that servers could break down. If there are multiple servers being used then there would be a problem because another server that recieves a request that isnt stateless would need to remember previous request from another server.

Here is an example of a stateless request and a stateful request.


```

Request 1: http://myservice.com/Person/1

Request 2: http://myservice.com/NextPerson


```

In the request 1 example, the server has all the state it needs to send back a response because it is asking for the `Person` resource and it is asking for a specific person. To do that I provided a number which would act as an ID

In the request 2 example, the server doesn't have all the state it needs to send back a response. It is asking for NextPerson but this request is assuming the server has state from a previous request and that may not be the case because this request could be done on a different server. Therefore the server does not have all the state it needs to carry out the service.

### Caching 

Caching is the concept of storing previously accessed information. Instead of doing a search into a large storage, the cach already has the data set out for you to grab without having to go through and searching for it again.

### Links to Resources

A resource can contain a link to another resource. You can think of a web page. A web page has links to other pages in the site. A resource represented in json can have multiple resources. Lets think of say we have a person resource along with a class resource.

```
{
	person: [
		{
			name: 'Bob',
			classes: {},{},{}
		}
		{
			name: 'Jack',
			classes: {},{},{}
		}
	]
}


```

### Example

Here is an example of a restful service. I created a shortened url service that will take a valid url and return a json response with a shortened url that will redirect to the original url.

I will show you the HTTP get request for accessing the redirect URL.

```

app.get('/:redirectUrl', function(req, res){
    Url.findOne({ "shortenedUrl": req.params.redirectUrl}, function(err, doc){
        console.log(doc);

        if(doc == null){
            res.json({"error": "This url is not on the database"});
        }
        else{
            res.redirect(doc.originalUrl);
        }

    })
});

```