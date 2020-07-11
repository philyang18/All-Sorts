import {swap} from './Swap';

function heapify(arr, n, i) {
    var largest = i;
    var left = 2*i + 1;
    var right = 2*i + 2;

    if(left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if(right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if(largest !== i) {
        swap(arr, i, largest);
        heapify(arr, n, largest);
    }
}

export function heapSort(arr) {
    var n = arr.length;
    var i;
    for(i = n/2 - 1; i >= 0; --i) {
        heapify(arr, n, i);
    }
    for(i = n - 1; i >= 0; --i) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
    return arr;
}