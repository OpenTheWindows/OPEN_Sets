namespace OPENSets.Tests {
  describe('TriesCounterServiceTests', () => {
    let counter: Services.TriesCounterService;
    let treshold: number = 6;

    beforeEach(() => {
      counter = new Services.TriesCounterService();
    });

    it('isThresholdPassed_whenNoWrongTriesAreMade_shouldBeFalsy', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();

      // Act
      let result: boolean = counter.isThresholdPassed(treshold);

      // Assert
      expect(result).toBeFalsy();
    });

    it('isThresholdPassed_whenNoSixTriesAreMade_shouldBeTruthy', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();

      for (let i: number = 0; i < treshold - 1; i++) {
        counter.isThresholdPassed(treshold);
      }

      // Act
      let result: boolean = counter.isThresholdPassed(treshold);

      // Assert
      expect(result).toBeTruthy();
    });
  });
}
