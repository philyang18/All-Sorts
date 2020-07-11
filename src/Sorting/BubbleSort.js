import {swap} from './Swap';

export function bubbleSort(arr) {
    var i;
    var last = arr.length - 1;
    var sorted = false;
    while(!sorted) {
        sorted = true;
        for(i = 0; i < last; ++i) {
            if(arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                sorted = false;
            }
        }
        --last;
    }
    return arr;
}