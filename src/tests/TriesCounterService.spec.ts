namespace OPENSets.Tests {
  describe('TriesCounterServiceTests', () => {
    let counter: Services.TriesCounterService;

    beforeEach(() => {
      counter = new Services.TriesCounterService();
    });

    it('givenCounterService_whenNoWrongTriesAreMade_shouldBeFalsy', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();
      let treshold: number = 6;
      gameState.wrongTriesTreshold = treshold;

      // Act
      let result: boolean = counter.isThresholdPassed();

      // Assert
      expect(result).toBeFalsy();
    });

    it('givenCounterService_whenNoSixTriesAreMade_shouldBeTruthy', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();
      let treshold: number = 6;
      gameState.wrongTriesTreshold = treshold;

      for (let i: number = 0; i < treshold - 1; i++) {
        counter.isThresholdPassed();
      }

      // Act
      let result: boolean = counter.isThresholdPassed();

      // Assert
      expect(result).toBeTruthy();
    });
  });
}
