namespace OPENSets.Tests {
  describe('MainGameManagementServiceTests', () => {
    let mainGameService: Services.MainGameManagementService;
    let gameState: Helpers.GameState = Helpers.GameState.getInstance();
    let statisticsService: Services.StatisticsService = Services.StatisticsService.getInstance();
    let treshold: number = 6;

    beforeEach(() => {
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

    it('iterationFinished_whenGameIsFinished_shouldCallUpdateAndEndStatistics', () => {
      // Arrange
      let wrongTries = 2;
      spyOn(statisticsService, 'updateGame').and.callFake(() => { });
      spyOn(statisticsService, 'endGame').and.callFake(() => { });
      spyOn(mainGameService, 'isGameFinished').and.callFake(() => {
        return true;
      });
      spyOn(mainGameService, 'getTries').and.callFake(() => {
        return wrongTries;
      });

      // Act
      mainGameService.iterationFinished();

      // Assert
      expect(statisticsService.updateGame).toHaveBeenCalledWith(wrongTries);
      expect(statisticsService.endGame).toHaveBeenCalled();
    });
  });
}
