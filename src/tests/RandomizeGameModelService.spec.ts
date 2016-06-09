describe('RandomizeGameModelServiceTests', () => {
  let randomizeGameModelService : OPENSets.Services.RandomizeGameModelService;

  beforeEach(() => {
    randomizeGameModelService = new OPENSets.Services.RandomizeGameModelService();
  });

  it('givenRandomizeGameModelService_whenGameModelIsRandomized_outputShouldContainTreeDifferentOptions', () => {
    // Arrange
    let gameState = OPENSets.Helpers.GameState.getInstance();
    gameState.randomizedPairs = OPENSets.TestsHelpers.Helpers.createPairsForTesting();
    let gameModel = new OPENSets.Models.GameModel(gameState.randomizedPairs[0]);

    // Act
    let result = randomizeGameModelService.randomize(gameModel);

    // Assert
    expect(result.quest).toEqual(gameState.randomizedPairs[0]);
    expect(result.question).not.toEqual(result.rightAnswer.name);
    expect(result.question).not.toEqual(result.wrongAnswer1.name);
    expect(result.question).not.toEqual(result.wrongAnswer2.name);
    expect(result.rightAnswer.name).not.toEqual(result.wrongAnswer1.name);
    expect(result.rightAnswer.name).not.toEqual(result.wrongAnswer2.name);
    expect(result.wrongAnswer1.name).not.toEqual(result.wrongAnswer2.name);
  });
});
