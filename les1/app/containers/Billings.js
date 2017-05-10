import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Slider,
  TextInput,
  ListView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { add_new_bill } from '../action_creators/billings';
import { set_input_value } from '../action_creators/inputs';
import { isObjectEmpty } from '../utils/objects';

let amountInput,
    priceInput,
    dataSource;
const screen = 'BillingsScreen';
const fieldNames = ["BillingsScreen-price", "BillingsScreen-amount"];

class BillingsScreen extends Component {
// const BillingsScreen = (state) => {
  constructor(props) {
    super(props);
    
    if(props.inputs === undefined) {
      amountInput = {value: 0};
      priceInput = "";
    } else {
      priceInput = isObjectEmpty(props.inputs["BillingsScreen-price"]) !== true ? props.inputs["BillingsScreen-price"]["value"] : "";
      amountInput = isObjectEmpty(props.inputs["BillingsScreen-amount"]) !== true ? props.inputs["BillingsScreen-amount"] : {value: 0};
    }
  }

  render() {
    priceInput = isObjectEmpty(this.props.inputs["BillingsScreen-price"]) !== true ? this.props.inputs["BillingsScreen-price"]["value"] : "";
    amountInput = isObjectEmpty(this.props.inputs["BillingsScreen-amount"]) !== true ? this.props.inputs["BillingsScreen-amount"] : {value: 0};

    if(Object.keys(this.props.billings).length !== 0) {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      dataSource = ds.cloneWithRows(this.props.billings)
    }

    // billings
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hoeveel personen. {`\n`}
          {`${amountInput['value']}`}
        </Text>
        <Slider
          {...amountInput} style={styles.slider} step={1} maximumValue={10} minimumValue={1}
          onValueChange={(value) => this.props.set_input_value(screen, 'amount', value)} />
        
        <Text style={styles.welcome}>
          Price
        </Text>
        <TextInput key={12}
          style={styles.inputs}
          onChangeText={(value) => this.props.set_input_value(screen, 'price', value)}
          value={priceInput} 
        />

        <Button
          onPress={() => this.props.add_new_bill(priceInput, amountInput['value'])}
          title="Submit bill"
          color="#841584"
        />

        {Object.keys(this.props.billings).length !== 0 ? (
          <ListView
            style={styles.container}
            dataSource={dataSource}
            renderRow={(data) => <Text>{data.amount}</Text>}
          />
        ) : []}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputs: {
    height: 40, 
    color: '#c0392b', 
    borderColor: 'gray', 
    borderWidth: 1,
    width: 250,
    alignSelf: 'center',
  },
  slider: {
    height: 20,
    margin: 10,
    width: 200,
    alignSelf: 'center',
  },
});

const mapDispatchToProps = {
  add_new_bill,
  set_input_value
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    inputs: state.inputs,
    billings: state.billings
  }
}

BillingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingsScreen)

export default BillingsScreen;