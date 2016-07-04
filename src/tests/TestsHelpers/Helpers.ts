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
          },
          {
            "id": 3,
            "itemOne": "paint-pallet",
            "itemTwo": "paint-brush"
          },
          {
            "id": 4,
            "itemOne": "pencil",
            "itemTwo": "sharpener"
          },
          {
            "id": 5,
            "itemOne": "cloud",
            "itemTwo": "umbrella"
          }
         ]`;

      return JSON.parse(pairsJson);
    }

    public static createAnimationsForTesting(): Array<Models.Animation> {

      let animationsJson: string = `[
        {
          "name": "basket",
          "frames": [1, 2, 3],
          "frameRate": 1
        },
        {
          "name": "monkey",
          "frames": [1, 2, 3],
          "frameRate": 1
        }
      ]`;

      return JSON.parse(animationsJson);
    }
  }
}
