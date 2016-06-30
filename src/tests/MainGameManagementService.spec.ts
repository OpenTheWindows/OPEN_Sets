namespace OPENSets.Tests {
  describe('MainGameManagementServiceTests', () => {
    let mainGameService: Services.MainGameManagementService;
    let gameState: Helpers.GameState;
    let treshold: number = 6;

    beforeEach(() => {
      gameState = Helpers.GameState.getInstance();
      gameState.setWrongTriesTreshold(treshold);
      mainGameService = new Services.MainGameManagementService();
    });

    it('getGameModelForThisIteration_shouldResetCounterAndReturnGameModel', () => {
      // Arrange
      spyOn(gameState, 'getCurrentPairAndIncrementPairsIndex').and.callFake(() => {
        return TestsHelpers.Helpers.createPairsForTesting()[0];
      });
      spyOn(gameState, 'getAllPairs').and.callFake(() => {
        return TestsHelpers.Helpers.createPairsForTesting();
      });

      // Act
      let gameModel: Models.GameModel = mainGameService.getGameModelForCurrentIteration();

      // Assert
      expect(gameModel).toBeDefined();
      expect(mainGameService.getTries()).toBe(0);
    });
  });
}
