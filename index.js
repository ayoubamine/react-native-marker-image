import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Image, Text } from "react-native";

const WIN_WIDTH = Dimensions.get("window").width;

export default class ImageMarker extends Component {
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

  _onImageLoaded(e) {
    console.log('HERE');
    
    const { width, height } = e.nativeEvent.source;
    const containerHeight = height / (width / WIN_WIDTH);

    this.setState({
      image: { width, height },
      markerPosition: {
        x: WIN_WIDTH / 2,
        y: containerHeight / 2
      },
      height: containerHeight
    });
  }

  _handlePress(e) {
    this.setState(
      {
        markerPosition: {
          x: e.nativeEvent.pageX,
          y:
            e.nativeEvent.pageY <= this.state.height
              ? e.nativeEvent.pageY
              : this.state.height
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
      x: this.state.markerPosition.x * scale.x,
      y: this.state.markerPosition.y * scale.y
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
      <View style={styles.container}>
        <View
          onStartShouldSetResponder={e => true}
          onResponderGrant={e => this._handlePress(e)}
          onResponderMove={e => this._handlePress(e)}
          style={{ ...styles.imageContainer, height: this.state.height }}
        >
          <Image
            source={this.props.image}
            onLoad={e => this._onImageLoaded(e)}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

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

        <Text style={{ fontSize: 50, margin: 50 }}>{this.state.height}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  imageContainer: {
    width: "100%"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  marker: {
    position: "absolute"
  }
});
