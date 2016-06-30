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

    it('getRandomGameModel_shouldResetCounterAndReturnGameModel', () => {
      // Arrange
      spyOn(gameState, 'getPair').and.callFake(() => {
        return TestsHelpers.Helpers.createPairsForTesting()[0];
      });
      spyOn(gameState, 'getPairs').and.callFake(() => {
        return TestsHelpers.Helpers.createPairsForTesting();
      });

      // Act
      let gameModel: Models.GameModel = mainGameService.getRandomGameModel();

      // Assert
      expect(gameModel).toBeDefined();
      expect(mainGameService.getTries()).toBe(0);
    });
  });
}
