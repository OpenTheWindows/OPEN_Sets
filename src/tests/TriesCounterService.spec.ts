describe('TriesCounterServiceTests', () => {
  let counter;

  beforeEach(() => {
    counter = new OPENSets.Services.TriesCounterService();
  });

  it('givenCounterService_whenNoWrongTriesAreMade_shouldBeFalsy', () => {
    // Arrange
    let gameState = OPENSets.Helpers.GameState.getInstance();
    gameState.wrongTriesTreshold = 6;

    // Act
    let result = counter.isThresholdPassed();

    // Assert
    expect(result).toBeFalsy();
  });

  it('givenCounterService_whenNoSixTriesAreMade_shouldBeTruthy', () => {
    // Arrange
    let gameState = OPENSets.Helpers.GameState.getInstance();
    gameState.wrongTriesTreshold = 6;

    for (let i = 0; i < 5; i++) {
      counter.isThresholdPassed();
    }

    // Act
    let result = counter.isThresholdPassed();

    // Assert
    expect(result).toBeTruthy();
  });
});
