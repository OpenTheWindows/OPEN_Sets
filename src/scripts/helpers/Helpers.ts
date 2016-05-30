module OPENSets.Helpers {
    export class Helpers {
        public static shuffleArray<T>(elements : Array<T>) : Array<T> {
            let newArray = elements; 
            var j, x, i;
            for (i = newArray.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = newArray[i - 1];
                newArray[i - 1] = newArray[j];
                newArray[j] = x;
            }
            return newArray;
        }
    }
}