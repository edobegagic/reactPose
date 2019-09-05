import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import posed from 'react-native-pose';
import { onCameraDidChangeTrackingState } from 'expo/build/AR';

// 1. rotate auto
const GridItem = posed.View({
  RIGHT: { rotate: '45deg' },
  LEFT: { rotate: '-45deg' }
});

// 2. rotate manual
const AnotherItem = posed.View({
  RIGHT: { rotate: '45deg' },
  LEFT: { rotate: '-45deg' }
});

// 3. draggable
const config = {
  draggable: true
};
const DraggableItem = posed.View(config);

export default class App extends React.Component {
  animationInterval = null;
  constructor() {
    super();
    this.state = {
      position: 'RIGHT',
      position2: 'RIGHT'
    };
  }

  componentDidMount() {
    this.animationInterval = setInterval(() => {
      this.setState(prevState => ({
        position: prevState.position === 'RIGHT' ? 'LEFT' : 'RIGHT'
      }));
    }, 2000);
  }

  promjenaStanja = () => {
    this.setState(prevState => ({
      position2: prevState.position2 === 'RIGHT' ? 'LEFT' : 'RIGHT'
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <GridItem pose={this.state.position} style={styles.grid} />
        <AnotherItem pose={this.state.position2} style={styles.grid2}>
          <Button title='press me' onPress={() => this.promjenaStanja()} />
        </AnotherItem>
        <View style={{ height: 50 }}></View>

        <DraggableItem style={styles.drag}>
          <Text style={{ color: 'lightyellow', fontSize: 18 }}>drag me</Text>
        </DraggableItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  grid: {
    height: 200,
    width: 10,
    backgroundColor: 'lightblue',
    borderColor: 'steelblue',
    borderWidth: 3
  },
  grid2: {
    height: 80,
    width: 80,
    backgroundColor: 'lightcoral',
    borderColor: 'steelblue',
    borderWidth: 3
  },
  drag: {
    height: 110,
    width: 110,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'darkorange',
    borderRadius: 15
  }
});
