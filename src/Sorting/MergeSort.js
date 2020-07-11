



function merge(left, right) {
    let resultList = [];
    var i = 0;
    var j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            resultList.push(left[i]);
            ++i;
        } else {
            resultList.push(right[j]);
            ++j;
        }
    }
    while(i < left.length) {
        resultList.push(left[i]);
        ++i;
    }
    while(j < right.length) {
        resultList.push(right[j]);
        ++j;
    }
    return resultList;
}

export function mergeSort(arr) {
    if(arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

    