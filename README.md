## aframe-bricks

[![Version](http://img.shields.io/npm/v/aframe-bricks.svg?style=flat-square)](https://npmjs.org/package/aframe-bricks)
[![License](http://img.shields.io/npm/l/aframe-bricks.svg?style=flat-square)](https://npmjs.org/package/aframe-bricks)

A component for loading L-Draw parts and models.

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-bricks@1.0.0/dist/aframe-bricks.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity bricks="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-bricks
```

Then require and use.

```js
require('aframe');
require('aframe-bricks');
```
