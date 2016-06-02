module OPENSets.TestsHelpers {
  export class Helpers {
    public static createPairsForTesting(): Models.Pair[] {

      let pairsJson = `{
        "pairs": [
          {
            "id": 0,
            "name": "table-chair",
            "itemOne": "chair",
            "pathOne": "assets/images/chair.png",
            "itemTwo": "table",
            "pathTwo": "assets/images/table.png"
          },
          {
            "id": 1,
            "name": "shoes-socks",
            "itemOne": "shoes",
            "pathOne": "assets/images/shoes.png",
            "itemTwo": "socks",
            "pathTwo": "assets/images/socks.png"
          },
          {
            "id": 2,
            "name": "hammer-nail",
            "itemOne": "hammer",
            "pathOne": "assets/images/hammer.png",
            "itemTwo": "nail",
            "pathTwo": "assets/images/nail.png"
          }
         ]
      }`;

      let result = new Array<Models.Pair>();

      let pairsJsonParsed = JSON.parse(pairsJson);
      let newPair: Models.Pair;

      for (var item of pairsJsonParsed.pairs) {
        newPair = new Models.Pair(item.id);
        newPair.name = item.name;
        newPair.itemOne = item.itemOne;
        newPair.itemTwo = item.itemTwo;
        result.push(newPair);
      }

      return result;
    }
  }
}
