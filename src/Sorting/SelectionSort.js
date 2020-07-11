
import {swap} from './Swap';

export function selectionSort(arr){

    let len = arr.length;
    var min;
    var minInd;
    for(var i = 0; i < len; ++i) {
        min = arr[i];
        minInd = i;
        for(var j = i; j < len; ++j) {
            if(arr[j] < min) {
                min = arr[j];
                minInd = j;
            }
        }
        swap(arr, i, minInd);
    }
    return arr;
}