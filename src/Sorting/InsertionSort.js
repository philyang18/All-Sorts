
export function insertionSort(arr) {

    var currVal;
    var hole; 
    for(var i = 1; i < arr.length; ++i) {
        currVal = arr[i];
        hole = i;
        while(hole > 0 && arr[hole - 1] > currVal) {
            arr[hole] = arr[hole-1];
            --hole;
        }
        arr[hole] = currVal;
    }
    return arr;
}