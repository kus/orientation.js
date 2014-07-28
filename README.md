#orientation.js

orientation.js tries to normalize all the current interfaces on mobile devices across iOS and Android giving you the mobiles orientation in 3d space with a simple api.

# Axis
![X Y Z Axis](https://raw.github.com/kus/orientation.js/master/axis.jpg "X Y Z Axis")

## Tested
 - iPhone 7.0
 - Android 4.3

## Installation
Copy js/orientation.js into your projects js folder and include it:

	<script src="js/orientation.js"></script>

## Usage

At the bottom of your document after the including of orientation.js add the following.

	<script>
		window.deviceOrientation.onUpdate(function(o){
			// o.orientation
			// o.x o.y o.z
		});
	</script>

## Copyright

Copyright (c) 2014 Blake Kus [blakek.us](http://blakek.us)

This plugin is dual licenced under MIT and GPL Version 2 licences.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.