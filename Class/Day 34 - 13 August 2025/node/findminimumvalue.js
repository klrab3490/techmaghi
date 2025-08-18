
let array=[ 5, 3, 8, 1, 4 ];

function findMinimumValue(arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

console.log("Minimum value:", findMinimumValue(array));
