# react-native-marker-image

[![npm package](https://img.shields.io/npm/v/react-native-marker-image.svg)](https://www.npmjs.com/package/react-native-marker-image)
![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg)
![MIT License](https://img.shields.io/npm/l/react-native-marker-image.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Merge marker and marker into one for Android and IOS!

## HOW TO INSTALL ?

```javascript
npm i --save react-native-marker-image
```

## HOW TO USE ?

```javascript
import ImageMarker from "react-native-marker-image";

function MyComponent() {
	return (
		<View>
			<ImageMarker
				image={require("./assets/garage.jpeg")}
				markerImage={require("./assets/marker.png")}
				markerSize={50}
				onChange={data => console.log(data)}
			/>
		</View>
	);
}
```

### Result

![Simulator Screen Shot](simulator-screen-shot.png)

## Reference

## Props

### `image`

The image source (either a remote URL or a local file resource).

| Type | Required |
| ---- | -------- |
| ImageSourcePropType | Yes       |

---

### `markerImage`

The marker image source (either a remote URL or a local file resource).

| Type | Required |
| ---- | -------- |
| ImageSourcePropType | Yes       |

---

### `markerSize`

The marker image size.

| Type | Required |
| ---- | -------- |
| number | Yes       |

---

### `onChange`

Invoked when the marker position changed.

| Type | Required |
| ---- | -------- |
| function | Yes       |

## LICENSE

MIT
