##	Algorithm Efficiency Big O URL look up

In my URL shortener project. I created a service that takes a URL and if the URL is valid it will return back a shortened version of that URL. The shortened URL is a 4 digit number.

The algorithm I had for it was inefficient because everytime someone entered a url to have shortened my program would have to do a look up through the whole database to make sure it would not return the client a duplicate shortened URL.

The way I made it more efficient was by creating two collections. Collection one would store all the created the shortened URLS. Collection two would just store the most recent created URL. There are 3 operations that happen for collection two. 

1. First the operation is the look up on collection 2. This look up is very fast because there is always only 1 document in that collection since it is the most recent.
2. Next is to add 1 to the shortened URL number.
3. Last is to insert it back into collection 2

After that there will be 1 operation in collection 1. The operation is to add the newest created shortened URL to collection 1.




