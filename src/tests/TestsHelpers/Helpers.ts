module OPENSets.TestsHelpers {
  export class Helpers {
    public static createPairsForTesting(): Array<Models.Pair> {

      let pairsJson: string = `[
          {
            "id": 0,
            "itemOne": "chair",
            "itemTwo": "table"
          },
          {
            "id": 1,
            "itemOne": "shoes",
            "itemTwo": "socks"
          },
          {
            "id": 2,
            "itemOne": "hammer",
            "itemTwo": "nail"
          }
         ]`;

      return JSON.parse(pairsJson);
    }
  }
}
