describe('TriesCounterServiceTests', () => {
  let counter;

  beforeEach(() => {
    counter = new OPENSets.Services.TriesCounterService();
  });

  it('givenCounterService_whenNoWrongTriesAreMade_shouldBeFalsy', () => {
    // Act
    let result = counter.isThresholdPassed();

    // Assert
    expect(result).toBeFalsy();
  });

  it('givenCounterService_whenNoSixTriesAreMade_shouldBeTruthy', () => {
    // Arrange
    for (let i = 0; i < 5; i++) {
      counter.isThresholdPassed();
    }

    // Act
    let result = counter.isThresholdPassed();

    // Assert
    expect(result).toBeTruthy();
  });
});
