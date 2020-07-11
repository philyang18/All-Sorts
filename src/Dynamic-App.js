import React from 'react';
import './App.css';
// import {mergeSort} from './Sorting/MergeSort';
// import {heapSort} from './Sorting/HeapSort';
// import {quickSort} from './Sorting/QuickSort';
// import {insertionSort} from './Sorting/InsertionSort';
// import {bubbleSort} from './Sorting/BubbleSort';
// import {selectionSort} from './Sorting/SelectionSort';
import DiscreteSlider from './Slider';

class App extends React.Component {

  constructor(props) {
    super(props);
    
      this.state = {
        originalList: [],
        list: [],
        sorted: false,
        updateList: false,
        showInfo: false,
        history: [],
        counter: 0,
        colors: ["blue", "red", "green", "skyblue"],
        colorIndex: 0,
        width: 0,
        height: 0,
        elements: 1000
      };
  }
  componentDidMount = () => {
    
    this.updateWindowDimensions();
    this.setState({list: [...this.state.originalList]});
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentDidUpdate = () => {
    if(this.state.history.length === 0 && this.state.counter > 0) {
      this.setState({counter: 0});
    }
    if(this.state.updateList) {
      this.setState({updateList: false, list: [...this.state.originalList]});
    }
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    // if(window.innerWidth > 0 && window.innerWidth < 768) {

    // }
    this.setState({ originalList: Array.apply(null, Array(Math.round(window.innerWidth*.85)).map(function () { return Math.floor((Math.random() * 400) + 1); })), width: Math.floor(window.innerHeight* .85), height: Math.floor(window.innerHeight *.5), elements: window.innerWidth*.85});
    console.log(window.innerWidth );
  }
  

  changeColor = event => {
    event.preventDefault();
    this.setState(prevState => ({
      colorIndex: (prevState.colorIndex + 1) % this.state.colors.length
    }));
  }
  reset = event => {
    event.preventDefault();
    console.log(event);
    this.setState({showInfo: false, sorted: false, list: [...this.state.originalList]});
  }
  newOrder = event => {
    event.preventDefault();
    this.setState({showInfo: false, updateList: true, sorted: false, originalList: Array.apply(null, Array(this.state.elements)).map(function () { return Math.floor((Math.random() * this.state.height) + 1); }) });
  }

  displayInfo = event => {
    event.preventDefault();
    this.setState({showInfo: true});
  }

  clearHistory = () => {
    this.setState({history: [], counter: 0});
  }

  handleDelete = (count) => {
    this.setState({history: this.state.history.filter(function(curr) { 
      return curr.count !== count;
    })});
  }
  onChange = (event, value) => 
  { 
    console.log(value);
    this.setState({elements: value, updateList: true, originalList: Array.apply(null, Array(Math.floor(value))).map(function () { return Math.floor((Math.random() * 400) + 1); })});
  }
  render() {
    return (
      <div>
        <div id="screen-error">
          <h1 className="text-danger">Please enlarger your browser or use a wider screen.</h1>
        </div>
        <div id="app-container">
          <div className="container">
              <h1>All Sorts</h1>
              <div id="sort-demo" style={{width: `${this.state.width}px`, height: `${this.state.height}px`}} className="row">
                  <div id="bar-container" onClick={this.changeColor}>
                      {this.state.list.map(value => {
                        var width = this.state.width/this.state.elements;
                        return (
                            <p style={{width: `${width}px`, height: value, backgroundColor:`${this.state.colors[this.state.colorIndex]}`, display: "inline-block"}}/>
                        );
                      })}
                  </div>
              </div>
              <div id="bar-slider" className="row col-12">
                <DiscreteSlider value={this.state.elements} max={this.state.width} onChange={this.onChange}/>
              </div>
              <div id="button-container" className="row">
                {this.state.sorted ?
                  <div>
                    <p className="btn-secondary unselectable" onClick={this.reset}>reset order</p> 
                    <p className="btn-secondary unselectable" onClick={this.newOrder}>new order</p>
                    <p className="btn-secondary unselectable" onClick={this.displayInfo}>info</p>
                  </div>:
                  <div>
                    <p className="btn-primary unselectable" onClick={this.mergeSort}>merge sort</p>
                    <p className="btn-primary unselectable" onClick={this.heapSort}>heap sort</p>
                    <p className="btn-primary unselectable" onClick={this.quickSort}>quick sort</p>
                    <p className="btn-primary unselectable" onClick={this.insertionSort}>insertion sort</p>
                    <p className="btn-primary unselectable" onClick={this.bubbleSort}>bubble sort</p>
                    <p className="btn-primary unselectable" onClick={this.selectionSort}>selection sort</p>
                  </div>
                }
              </div>
              
              {this.state.showInfo ? 
                <div style={{textAlign: "center"}}><div>Click "reset order" to reuse the same inital order or click "new order" to generate a new set of elements.</div><div>Click the graph to change colors.</div></div>: <div/> 
              }
              
              <table id="history-table" className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sorting Algorithm</th>
                    <th>Time [milliseconds]</th>
                    <th id="clear-history-btn" onClick={this.clearHistory}>Clear All</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.history.map( curr => {
                    return (
                      <tr>
                        <th>{curr.count}</th>
                        <td>{curr.type}</td>
                        <td>{curr.time}</td>
                        <td className="text-danger delete-btn" onClick={() => {this.handleDelete(curr.count)}}>delete</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// mergeSort = event => {
//   event.preventDefault();
//   var start = performance.now();
//   let newList = mergeSort(this.state.list);
//   var end = performance.now();
//   this.setState(prevState => ({
//     history: [{count: this.state.counter + 1,type: "merge sort", time: end-start}, ...prevState.history],
//     counter: prevState.counter + 1,
//     list: newList,
//     sorted: true
//   }));
// }
// heapSort = event => {
//   event.preventDefault();
//   var start = performance.now();
//   let newList = heapSort(this.state.list);
//   var end = performance.now();
//   this.setState(prevState => ({
//     history: [{count: this.state.counter + 1,type: "heap sort", time: end-start}, ...prevState.history],
//     counter: prevState.counter + 1,
//     list: newList,
//     sorted: true
//   }));
// }
// quickSort = event => {
//   event.preventDefault();
//   var start = performance.now();
//   let newList = quickSort(this.state.list);
//   var end = performance.now();
//   this.setState(prevState => ({
//     history: [{count: this.state.counter + 1,type: "quick sort", time: end-start}, ...prevState.history],
//     counter: prevState.counter + 1,
//     list: newList,
//     sorted: true
//   }));
// }

// insertionSort = event => {
//   event.preventDefault();
//   var start = performance.now();
//   let newList = insertionSort(this.state.list);
//   var end = performance.now();
//   this.setState(prevState => ({
//     history: [{count: this.state.counter + 1,type: "insertion sort", time: end-start}, ...prevState.history],
//     counter: prevState.counter + 1,
//     list: newList,
//     sorted: true
//   }));
// }

// bubbleSort = event => {
//   event.preventDefault();
//   var start = performance.now();
//   let newList = bubbleSort(this.state.list);
//   var end = performance.now();
//   this.setState(prevState => ({
//     history: [{count: this.state.counter + 1,type: "bubble sort", time: end-start}, ...prevState.history],
//     counter: prevState.counter + 1,
//     list: newList,
//     sorted: true
//   }));
// }

// selectionSort = event => {
//   event.preventDefault();
//   var start = performance.now();
//   let newList = selectionSort(this.state.list);
//   var end = performance.now();
//   this.setState(prevState => ({
//     history: [{count: this.state.counter + 1,type: "selection sort", time: end-start}, ...prevState.history],
//     counter: prevState.counter + 1,
//     list: newList,
//     sorted: true
//   }));
// }