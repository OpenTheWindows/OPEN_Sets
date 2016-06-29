namespace OPENSets.Tests {
  describe('TriesCounterServiceTests', () => {
    let counter: Services.TriesCounterService;
    let treshold: number = 6;

    beforeEach(() => {
      counter = new Services.TriesCounterService(treshold);
    });

    it('givenCounterService_whenNoWrongTriesAreMade_shouldBeFalsy', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();

      // Act
      let result: boolean = counter.isThresholdPassed();

      // Assert
      expect(result).toBeFalsy();
    });

    it('givenCounterService_whenNoSixTriesAreMade_shouldBeTruthy', () => {
      // Arrange
      let gameState: Helpers.GameState = Helpers.GameState.getInstance();

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
