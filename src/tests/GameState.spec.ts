namespace OPENSets.Tests {
  describe('GameStateTests', () => {
    let gameState: Helpers.GameState;
    let pairs: Array<Models.Pair>;
    let animations: Array<Models.Animation>;

    beforeEach(() => {
      gameState = Helpers.GameState.getInstance();
      pairs = TestsHelpers.Helpers.createPairsForTesting();
    });

    it('prepareNewGame_whenPairsAndAnimationsAreSet_shouldShuffleThem', () => {
      // Arrange
      animations = TestsHelpers.Helpers.createAnimationsForTesting();
      gameState.setPairs(TestsHelpers.Helpers.createPairsForTesting());
      gameState.setAnimations(TestsHelpers.Helpers.createAnimationsForTesting());

      // Act
      gameState.prepareNewGame();

      // Assert
      expect(gameState.getAnimations()).not.toEqual(pairs);
      expect(gameState.getPairs()).not.toEqual(animations);
    });

    it('prepareNewGame_whenThereAreTwoAnimationsAndFivePairs_shouldTripleTheAnimations', () => {
      // Arrange
      animations = TestsHelpers.Helpers.createAnimationsForTesting();
      gameState.setPairs(TestsHelpers.Helpers.createPairsForTesting());
      gameState.setAnimations(animations);

      // Act
      gameState.prepareNewGame();

      // Assert
      expect(gameState.getAnimations().length).toEqual(animations.length * 3);
    });

    it('isGameFinished_whenItIsTheFirstIteration_shouldBeFalsy', () => {
      // Arrange
      gameState.setPairs(pairs);

      // Act
      let result: boolean = gameState.isGameFinished();

      // Assert
      expect(result).toBeFalsy();
    });

    it('isGameFinished_whenItIsTheLastIteration_shouldBeTruthy', () => {
      // Arrange
      gameState.setPairs(pairs);
      for (let i: number = 0; i < pairs.length; i++) {
        gameState.getPair();
      }

      // Act
      let result: boolean = gameState.isGameFinished();

      // Assert
      expect(result).toBeTruthy();
    });
  });
}
