const SortLib = {
    _logStats: function(methodName, comparisons, swaps, sparseFound) {
        console.log(`--- ${methodName} ---`);
        console.log(`Порівнянь: ${comparisons}, Обмінів/Переміщень: ${swaps}`);
        if (sparseFound) {
            console.warn("Повідомлення: У масиві виявлено undefined-елементи!");
        }
    },

    _prepareArray: function(arr) {
        let sparseFound = false;
        let cleanArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                sparseFound = true;
            } else {
                cleanArr.push(arr[i]);
            }
        }
        return { cleanArr, sparseFound };
    },

    bubbleSort: function(inputArray, ascending = true) {
        let { cleanArr, sparseFound } = this._prepareArray(inputArray);
        let comparisons = 0, swaps = 0;
        let n = cleanArr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                let condition = ascending ? cleanArr[j] > cleanArr[j + 1] : cleanArr[j] < cleanArr[j + 1];
                if (condition) {
                    [cleanArr[j], cleanArr[j + 1]] = [cleanArr[j + 1], cleanArr[j]];
                    swaps++;
                }
            }
        }
        this._logStats("Сортування обміном", comparisons, swaps, sparseFound);
        return cleanArr;
    },

    selectionSort: function(inputArray, ascending = true) {
        let { cleanArr, sparseFound } = this._prepareArray(inputArray);
        let comparisons = 0, swaps = 0;
        let n = cleanArr.length;

        for (let i = 0; i < n - 1; i++) {
            let minMaxIdx = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++;
                let condition = ascending ? cleanArr[j] < cleanArr[minMaxIdx] : cleanArr[j] > cleanArr[minMaxIdx];
                if (condition) minMaxIdx = j;
            }
            if (minMaxIdx !== i) {
                [cleanArr[i], cleanArr[minMaxIdx]] = [cleanArr[minMaxIdx], cleanArr[i]];
                swaps++;
            }
        }
        this._logStats("Сортування мінімальних елементів", comparisons, swaps, sparseFound);
        return cleanArr;
    },

    insertionSort: function(inputArray, ascending = true) {
        let { cleanArr, sparseFound } = this._prepareArray(inputArray);
        let comparisons = 0, swaps = 0;
        let n = cleanArr.length;

        for (let i = 1; i < n; i++) {
            let key = cleanArr[i];
            let j = i - 1;
            while (j >= 0) {
                comparisons++;
                let condition = ascending ? cleanArr[j] > key : cleanArr[j] < key;
                if (condition) {
                    cleanArr[j + 1] = cleanArr[j];
                    swaps++;
                    j--;
                } else break;
            }
            cleanArr[j + 1] = key;
        }
        this._logStats("Сортування вставками", comparisons, swaps, sparseFound);
        return cleanArr;
    },

    // 4. Метод Шелла (Shell Sort)
    shellSort: function(inputArray, ascending = true) {
        let { cleanArr, sparseFound } = this._prepareArray(inputArray);
        let comparisons = 0, swaps = 0;
        let n = cleanArr.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = cleanArr[i];
                let j = i;
                while (j >= gap) {
                    comparisons++;
                    let condition = ascending ? cleanArr[j - gap] > temp : cleanArr[j - gap] < temp;
                    if (condition) {
                        cleanArr[j] = cleanArr[j - gap];
                        swaps++;
                        j -= gap;
                    } else break;
                }
                cleanArr[j] = temp;
            }
        }
        this._logStats("Сортування Шелла", comparisons, swaps, sparseFound);
        return cleanArr;
    },

    // 5. Метод Хоара (Quick Sort)
    quickSort: function(inputArray, ascending = true) {
        let { cleanArr, sparseFound } = this._prepareArray(inputArray);
        let comparisons = 0, swaps = 0;

        const partition = (arr, low, high) => {
            let pivot = arr[Math.floor((high + low) / 2)];
            let i = low, j = high;
            while (i <= j) {
                if (ascending) {
                    while (arr[i] < pivot) { comparisons++; i++; }
                    while (arr[j] > pivot) { comparisons++; j--; }
                } else {
                    while (arr[i] > pivot) { comparisons++; i++; }
                    while (arr[j] < pivot) { comparisons++; j--; }
                }
                comparisons++; // для фінального порівняння циклу
                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swaps++;
                    i++; j--;
                }
            }
            return i;
        };

        const sort = (arr, low, high) => {
            let index = partition(arr, low, high);
            if (low < index - 1) sort(arr, low, index - 1);
            if (index < high) sort(arr, index, high);
        };

        if (cleanArr.length > 0) sort(cleanArr, 0, cleanArr.length - 1);
        this._logStats("Сортування Хоара (Швидке)", comparisons, swaps, sparseFound);
        return cleanArr;
    }
};
