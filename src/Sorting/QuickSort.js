import {swap} from './Swap';

function partition(arr, low, high) {
    let pivot = arr[high]; 
    var i = low - 1; 

	for (var j = low; j < high; j++) 
	{ 
		if (arr[j] < pivot) 
		{ 
			i++; 
			swap(arr, i, j);
		} 
	} 

    swap(arr, i+1, high);
	return i+1; 
}

function sort(arr, start, end) {
    if(start < end) {
        let part = partition(arr, start, end);
        sort(arr, start, part - 1);
        sort(arr, part + 1, end);
    }
}
export function quickSort(arr) {
    sort(arr, 0, arr.length - 1);
    return arr;
}