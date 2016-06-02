describe('TriesCounterServiceTests', () => {
  let counter;

  beforeEach(() => {
    counter = new OPENSets.Services.TriesCounterService();
  });

  it('givenCounterService_whenNoWrongTriesAreMade_shouldBeFalsy', () => {
    // Arrange
    let gameState = OPENSets.Helpers.GameState.getInstance();
    let treshold: number = 6;
    gameState.wrongTriesTreshold = treshold;

    // Act
    let result = counter.isThresholdPassed();

    // Assert
    expect(result).toBeFalsy();
  });

  it('givenCounterService_whenNoSixTriesAreMade_shouldBeTruthy', () => {
    // Arrange
    let gameState = OPENSets.Helpers.GameState.getInstance();
    let treshold: number = 6;
    gameState.wrongTriesTreshold = treshold;

    for (let i = 0; i < treshold - 1; i++) {
      counter.isThresholdPassed();
    }

    // Act
    let result = counter.isThresholdPassed();

    // Assert
    expect(result).toBeTruthy();
  });
});
