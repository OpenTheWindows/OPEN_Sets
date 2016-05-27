module OPENSets.Helpers {
    export class Helpers {
        public static shuffleArray<T>(elements : Array<T>) : Array<T> {
            let newArray = new Array<T>(elements.length); 
            var j, x, i;
            for (i = elements.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = elements[i - 1];
                newArray[i - 1] = elements[j];
                newArray[j] = x;
            }
            return newArray;
        }
    }
}