# JetCoders jQuery Simplebox
Fast, light, mobile-friendly popup and modal plugin.

## Browser support
The script was tested in the following browsers:

 - Internet Explorer 7+
 - Firefox
 - Chrome
 - Safari
 - Opera
 - Android 4+
 - iOS7+

## Usage
The script requires jQuery 1.7+ to work properly. To add script in your page simply attach file - <code>jquery.simplebox.js</code>:

```html
<script src="js/jquery.js"></script>
<script src="js/jquery.simplebox.js"></script>
```

For start you need create HTML for modal and put it in to the end of `<body>`:

```html
<div class="modal" id="modal01">
	<span class="close">close</span>
	<p>Some text</p>
</div>
```

Then create link with modal ID and `class="simplebox"`:

```html
<a class="simplebox" href="#modal01">Open modal01</a> 

<button class="simplebox" type="button" data-href="#modal02">Open modal02</button>
```

Next step is create simple CSS for modal:

```css
.modal{
	width:500px;
	padding:30px 20px;
	border: 1px solid #000;
	position:absolute;
	background:#fff;
	left:-9999px;
	top:-9999px;
	z-index:1000;
}
```

When the page is loaded all you have to do is simply call function:

```js
$(function() {
	$('.simplebox').simplebox();
});
```

or, if you want open modal without link:

```js
$(function() {
	$.simplebox('#modal01');
});
```

## Setting Options
There are two ways of specifying options:

```js
$('.simplebox').simplebox({
	duration: 300,
	linkClose: '.close, .btn-close'
});
```

or

```js
$.simplebox('#modal01', {
	duration: 300,
	linkClose: '.close, .btn-close'
});
```

## Options
The most commonly used options are listed below.

<table>
	<thead>
		<tr>
			<th>Option</th>
			<th>Description</th>
			<th>Data Type</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>duration</code></td>
			<td>Duration in milliseconds</td>
			<td>Number</td>
			<td><code>300</code></td>
		</tr>
		<tr>
			<td><code>linkClose</code></td>
			<td>Specify class which will be added to close button</td>
			<td>String</td>
			<td><code>".close, .btn-close"</code></td>
		</tr>
		<tr>
			<td><code>disableClass</code></td>
			<td>Specify class which will be added to form submit buttons</td>
			<td>String</td>
			<td><code>"disabled"</code></td>
		</tr>
		<tr>
			<td><code>overlay</code></td>
			<td>Options for overlay (set <code>false</code> if overlay don't need)</td>
			<td>Object or Boolean</td>
			<td>Overlay options are listed [below](https://github.com/JetCoders/simplebox#overlay-options)</td>
		</tr>
		<tr>
			<td><code>positionFrom</code></td>
			<td>Set modal position from HTML element (example: <code>"#block"</code>)</td>
			<td>String or Boolean</td>
			<td><code>false</code></td>
		</tr>
	</tbody>
</table>

### Overlay options

<table>
	<thead>
		<tr>
			<th>Overlay option</th>
			<th>Description</th>
			<th>Data Type</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>box</code></td>
			<td>Specify class which will be added to overlay block</td>
			<td>String</td>
			<td><code>"simplebox-overlay"</code></td>
		</tr>
		<tr>
			<td><code>color</code></td>
			<td>Background color for overlay</td>
			<td>String</td>
			<td><code>"black"</code></td>
		</tr>
		<tr>
			<td><code>closeClick</code></td>
			<td>Enable this option to close modal when you click on overlay</td>
			<td>Boolean</td>
			<td><code>true</code></td>
		</tr>
		<tr>
			<td><code>opacity</code></td>
			<td>Set CSS opacity to overlay</td>
			<td>Number</td>
			<td><code>0.3</code></td>
		</tr>
	</tbody>
</table>

## Methods

<table>
	<thead>
		<tr>
			<th>Method</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>$.simplebox.close()</code></td>
			<td>
				This method is a global and will close any opened simplebox
			</td>
		</tr>
	</tbody>
</table>

## Events

<table>
	<thead>
		<tr>
			<th>Event</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>onOpen: function(obj){...}</code></td>
			<td>This event start befor simplebox is open</td>
		</tr>
		<tr>
			<td><code>afterOpen: function(obj){...}</code></td>
			<td>This event start after simplebox is open</td>
		</tr>
		<tr>
			<td><code>onClose: function(obj){...}</code></td>
			<td>This event start befor simplebox is close</td>
		</tr>
		<tr>
			<td><code>afterClose: function(obj){...}</code></td>
			<td>This event start after simplebox is close</td>
		</tr>
	</tbody>
</table>

## License

This script is licensed under the [MIT License](LICENSE.txt).

Copyright 2015-2016 [JetCoders.com](http://jetcoders.com/contact)
