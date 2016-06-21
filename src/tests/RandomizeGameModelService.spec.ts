namespace OPENSets.Tests {
  describe('RandomizeGameModelServiceTests', () => {
    let randomizeGameModelService: Services.RandomizeGameModelService;

    beforeEach(() => {
      randomizeGameModelService = new Services.RandomizeGameModelService();
    });

    it('givenRandomizeGameModelService_whenGameModelIsRandomized_outputShouldContainTreeDifferentOptions', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();
      gameState.pairs = TestsHelpers.Helpers.createPairsForTesting();
      let gameModel: Models.GameModel = new Models.GameModel(gameState.pairs[0]);

      // Act
      let result: Models.GameModel = randomizeGameModelService.randomize(gameModel);

      // Assert
      expect(result.pair).toEqual(gameState.pairs[0]);
      expect(result.givenPairItem).not.toEqual(result.rightOption.name);
      expect(result.givenPairItem).not.toEqual(result.wrongOption1.name);
      expect(result.givenPairItem).not.toEqual(result.wrongOption2.name);
      expect(result.rightOption.name).not.toEqual(result.wrongOption1.name);
      expect(result.rightOption.name).not.toEqual(result.wrongOption2.name);
      expect(result.wrongOption1.name).not.toEqual(result.wrongOption2.name);
    });
  });
}
