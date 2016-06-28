namespace OPENSets.Tests {
  describe('GameModelGenerationServiceTests', () => {
    let gameModelGenerationService: Services.GameModelGenerationService;

    beforeEach(() => {
      gameModelGenerationService = new Services.GameModelGenerationService();
    });

    it('generateGameModelForPair_whenPairIsGiven_shouldGenerateModelWithTreeDifferentOptions', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();
      gameState.pairs = TestsHelpers.Helpers.createPairsForTesting();
      spyOn(gameModelGenerationService, 'setRandomMainItemFromThePair').and.callThrough();
      spyOn(gameModelGenerationService, 'setRandomWrongOptions').and.callThrough();

      // Act
      let result: Models.GameModel = gameModelGenerationService.generateGameModelForPair(gameState.pairs[0]);

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
