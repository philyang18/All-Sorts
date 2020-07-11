import React from 'react';
import './App.css';
import {mergeSort} from './Sorting/MergeSort';
import {heapSort} from './Sorting/HeapSort';
import {quickSort} from './Sorting/QuickSort';
import {insertionSort} from './Sorting/InsertionSort';
import {bubbleSort} from './Sorting/BubbleSort';
import {selectionSort} from './Sorting/SelectionSort';
import DiscreteSlider from './Slider';

class SortingPage extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        originalList: Array.apply(null, Array(1000)).map(function () { return Math.floor((Math.random() * 400) + 1); }),
        list: [],
        sorted: false,
        updateList: false,
        updateHistory: false,
        showInfo: false,
        history: [],
        counter: 0,
        colors: ["blue", "black", "grey", "purple"],
        colorIndex: 0,
        elements: 1000,
        decreasingNumOrder: true,
        ascendingMethodOrder: undefined,
        ascendingTimeOrder: undefined
      };
  }
  componentDidMount = () => {
    this.setState({list: [...this.state.originalList]});
  }
  componentDidUpdate = () => {
    if(this.state.history.length === 0 && this.state.counter > 0) {
      this.setState({counter: 0});
    }
    if(this.state.updateList) {
      this.setState({updateList: false, list: [...this.state.originalList]});
    }
    if(this.state.updateHistory) {
      if(this.state.decreasingNumOrder !== undefined) {
        this.sortByNum();
      } else if(this.state.ascendingMethodOrder !== undefined) {
        this.sortByMethod();
      } else if(this.state.ascendingTimeOrder !== undefined) {
        this.sortByTime();
      } else {
        this.setState({updateHistory: false});
      }
    }
  }

  sortByNum = () => {
    let list = [...this.state.history];
    if(!this.state.decreasingNumOrder) {
      list = list.sort((a, b) => a.count - b.count);
    } else {
      list = list.sort((a, b) => b.count - a.count);
    }
    this.setState({
      history: list,
      updateHistory: false
    });
  }

  sortByMethod = () => {
    let list = [...this.state.history];
    if(this.state.ascendingMethodOrder) {
      list = list.sort(function(a, b) { return a.type < b.type ? -1 : a.type > b.type ? 1 : 0 });
    } else {
      list = list.sort(function(a, b) { return a.type > b.type ? -1 : a.type < b.type ? 1 : 0});
    }
    this.setState({
      history: list,
      updateHistory: false
    });
  }

  sortByTime = () => {
    let list = [...this.state.history];
    if(this.state.ascendingTimeOrder) {
      list = list.sort((a, b) => a.time - b.time);
    } else {
      list = list.sort((a, b) => b.time - a.time);
    }
    this.setState({
      history: list,
      updateHistory: false
    });
  }

  mergeSort = () => {
    let start = performance.now();
    let newList = mergeSort(this.state.list);
    let end = performance.now();
    this.setState(prevState => ({
      history: [...prevState.history, {count: this.state.counter + 1,type: "merge sort", time: end-start}],
      counter: prevState.counter + 1,
      list: newList,
      sorted: true,
      updateHistory: true
    }));
  }
  heapSort = () => {
    let start = performance.now();
    let newList = heapSort(this.state.list);
    let end = performance.now();
    this.setState(prevState => ({
      history: [...prevState.history, {count: this.state.counter + 1,type: "heap sort", time: end-start}],
      counter: prevState.counter + 1,
      list: newList,
      sorted: true,
      updateHistory: true
    }));
  }
  quickSort = () => {
    let start = performance.now();
    let newList = quickSort(this.state.list);
    let end = performance.now();
    this.setState(prevState => ({
      history: [...prevState.history, {count: this.state.counter + 1,type: "quick sort", time: end-start}],
      counter: prevState.counter + 1,
      list: newList,
      sorted: true,
      updateHistory: true
    }));
  }

  insertionSort = () => {
    let start = performance.now();
    let newList = insertionSort(this.state.list);
    let end = performance.now();
    this.setState(prevState => ({
      history: [...prevState.history, {count: this.state.counter + 1,type: "insertion sort", time: end-start}],
      counter: prevState.counter + 1,
      list: newList,
      sorted: true,
      updateHistory: true
    }));
  }

  bubbleSort = () => {
    let start = performance.now();
    let newList = bubbleSort(this.state.list);
    let end = performance.now();
    this.setState(prevState => ({
      history: [...prevState.history, {count: this.state.counter + 1,type: "bubble sort", time: end-start}],
      counter: prevState.counter + 1,
      list: newList,
      sorted: true,
      updateHistory: true
    }));
  }

  selectionSort = () => {
    let start = performance.now();
    let newList = selectionSort(this.state.list);
    let end = performance.now();
    this.setState(prevState => ({
      history: [...prevState.history, {count: this.state.counter + 1,type: "selection sort", time: end-start}],
      counter: prevState.counter + 1,
      list: newList,
      sorted: true,
      updateHistory: true
    }));
  }

  changeColor = () => {
    this.setState(prevState => ({
      colorIndex: (prevState.colorIndex + 1) % this.state.colors.length
    }));
  }
  reset = event => {
    event.preventDefault();
    console.log(event);
    this.setState({showInfo: false, sorted: false, list: [...this.state.originalList]});
  }
  newOrder = () => {
    this.setState({showInfo: false, updateList: true, sorted: false, originalList: Array.apply(null, Array(this.state.elements)).map(function () { return Math.floor((Math.random() * 400) + 1); }) });
  }

  displayInfo = () => {
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
  onChange = (value) => 
  { 
    this.setState({sorted: false, elements: value, updateList: true, originalList: Array.apply(null, Array(value)).map(function () { return Math.floor((Math.random() * 400) + 1); })});
  }
  toggleNumOrder = () => {
    this.setState({updateHistory: true, decreasingNumOrder: !this.state.decreasingNumOrder, ascendingMethodOrder: undefined, ascendingTimeOrder: undefined});
    this.componentDidUpdate();
  }
  toggleMethodOrder = () => {
    this.setState({updateHistory: true, ascendingMethodOrder: !this.state.ascendingMethodOrder, decreasingNumOrder: undefined, ascendingTimeOrder: undefined})
  }
  toggleTimeOrder = () => {
    this.setState({updateHistory: true, ascendingTimeOrder: !this.state.ascendingTimeOrder, ascendingMethodOrder: undefined, decreasingNumOrder: undefined})
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
              <div id="sort-demo" className="row">
                  <div id="bar-container" onClick={this.changeColor}>
                      {this.state.list.map(value => {
                        let width = 1000/this.state.elements;
                        return (
                            <p style={{width: `${width}px`, height: value, backgroundColor:`${this.state.colors[this.state.colorIndex]}`, display: "inline-block"}}/>
                        );
                      })}
                  </div>
              </div>
              <div id="bar-slider" className="row col-12">
                <DiscreteSlider value={this.state.elements} onChange={this.onChange}/>
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
                    {this.state.decreasingNumOrder === undefined ?
                      <th onClick={this.toggleNumOrder} className="unselectable">#</th> :
                      <th onClick={this.toggleNumOrder} className="unselectable"># <i  className={this.state.decreasingNumOrder ? "icon-caret-down" : "icon-caret-up"}></i></th>
                    }
                    {this.state.ascendingMethodOrder === undefined ?
                      <th onClick={this.toggleMethodOrder} className="unselectable">Sorting Algorithm</th> :
                      <th onClick={this.toggleMethodOrder} className="unselectable">Sorting Algorithm <i className={this.state.ascendingMethodOrder ? "icon-caret-up" : "icon-caret-down"}/></th>
                    }
                    {this.state.ascendingTimeOrder === undefined ?
                      <th onClick={this.toggleTimeOrder} className="unselectable">Time [milliseconds]</th> :
                      <th onClick={this.toggleTimeOrder} className="unselectable">Time [milliseconds] <i className={this.state.ascendingTimeOrder ? "icon-caret-up" : "icon-caret-down"}/></th>
                    }
                    <th id="clear-history-btn" className="unselectable" onClick={this.clearHistory}>Clear All</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.history.map( curr => {
                    return (
                      <tr>
                        <td><b>{curr.count}</b></td>
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

export default SortingPage;
