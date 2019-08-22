import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";

const WIN_WIDTH = Dimensions.get("window").width;

export default class MarkerImage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: {
				width: 0,
				height: 0
			},
			markerPosition: {
				x: 0,
				y: 0
			},
			height: 0
		};
	}

	componentDidMount() {
		this._onImageLoaded();
	}

	_getImageSize(source) {
		return new Promise((resolve, reject) => {
			if (source.uri) {
				return Image.getSize(
					source.uri,
					(width, height) => {
						resolve({ width, height });
					},
					err => {
						reject(err);
					}
				);
			}
			const size = Image.resolveAssetSource(source);
			resolve(size);
		});
	}

	_onImageLoaded() {
		this._getImageSize(this.props.image).then(({ width, height }) => {
			const containerHeight = height / (width / WIN_WIDTH);

			this.setState({
				image: { width, height },
				markerPosition: {
					x: WIN_WIDTH / 2,
					y: containerHeight / 2
				},
				height: containerHeight
			});
		});
	}

	_locationY(y) {
		if (y < 0) return 0;
		if (y >= this.state.height) return this.state.height;
		return y;
	}

	_handlePress(e) {
		this.setState(
			{
				markerPosition: {
					x: e.nativeEvent.locationX.toFixed(2),
					y: this._locationY(e.nativeEvent.locationY.toFixed(2))
				}
			},
			() => {
				const dimensions = this._getDimensions();

				this.props.onChange(dimensions);
			}
		);
	}

	_getDimensions() {
		const imageSize = {
			width: WIN_WIDTH,
			height: this.state.height
		};

		const scale = {
			x: this.state.image.width / imageSize.width,
			y: this.state.image.height / imageSize.height
		};

		const originMarkerPosition = {
			x: (this.state.markerPosition.x * scale.x).toFixed(2),
			y: (this.state.markerPosition.y * scale.y).toFixed(2)
		};

		const dimensions = {
			image: {
				...imageSize,
				marker: this.state.markerPosition
			},
			originImage: {
				...this.state.image,
				marker: originMarkerPosition
			}
		};

		return dimensions;
	}

	render() {
		return (
			<View style={{ ...styles.imageContainer, height: this.state.height }}>
				<Image
					source={this.props.image}
					style={styles.image}
					resizeMode="cover"
				/>

				<Image
					source={this.props.markerImage}
					style={{
						...styles.marker,
						width: this.props.markerSize,
						height: this.props.markerSize,
						top: this.state.markerPosition.y - this.props.markerSize,
						left: this.state.markerPosition.x - this.props.markerSize / 2
					}}
					resizeMode="contain"
				/>

				<View
					onStartShouldSetResponder={e => true}
					onResponderGrant={e => this._handlePress(e)}
					onResponderMove={e => this._handlePress(e)}
					style={styles.safeZone}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	imageContainer: {
		position: "relative",
		width: "100%"
	},
	image: {
		width: "100%",
		height: "100%"
	},
	marker: {
		position: "absolute"
	},
	safeZone: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1
	}
});
