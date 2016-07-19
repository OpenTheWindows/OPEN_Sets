namespace OPENSets.Tests {
  describe("StatisticsServiceTests", function () {
    var request, response;
    var success, error, complete;
    var client, onreadystatechange;
    var fakeGlobal, mockAjax;
    let instance = Services.StatisticsService.getInstance();
    let guid = "5d8b71e3-1b46-fb69-c49e-f50e561ba505";

    beforeEach(() => {
      var fakeXMLHttpRequest = jasmine.createSpy('realFakeXMLHttpRequest');
      fakeGlobal = {
        XMLHttpRequest: fakeXMLHttpRequest,
        DOMParser: window['DOMParser'],
        ActiveXObject: window['ActiveXObject']
      };
      mockAjax = new MockAjax(fakeGlobal);
      mockAjax.install();
      client = new fakeGlobal.XMLHttpRequest();
    });

    it("startGame_whenAvailableHTTP_shouldSetGuid", () => {
      // Arrange
      spyOn(instance, 'createXMLHttpRequest').and.callFake(() => { return client; });
      spyOn(instance, 'setGuid').and.callThrough();

      // Act
      instance.startGame();

      request = mockAjax.requests.mostRecent();
      response = { status: 200, contentType: "text/html", responseText: guid };
      request.respondWith(response);

      // Assert
      expect(request.url).toEqual('http://localhost:3000/api/gameStarted/Sets');
      expect(instance.setGuid).toHaveBeenCalledWith(guid);
    });

    it("endGame_whenAvailableHTTP_shouldResetGuid", () => {
      // Arrange
      spyOn(instance, 'createXMLHttpRequest').and.callFake(() => { return client; });
      spyOn(instance, 'setGuid').and.callThrough();

      // Act
      instance.endGame();

      request = mockAjax.requests.mostRecent();
      response = { status: 200, contentType: "text/html", responseText: true };
      request.respondWith(response);

      // Assert
      expect(request.url).toEqual('http://localhost:3000/api/gameEnded/' + guid);
      expect(instance.setGuid).toHaveBeenCalledWith(undefined);
    });

    it("updateGame_whenAvailableHTTP_shouldPassTheMissesToApi", () => {
      // Arrange
      let misses = 1;
      spyOn(instance, 'createXMLHttpRequest').and.callFake(() => { return client; });
      instance.setGuid(guid);

      // Act
      instance.updateGame(misses);

      request = mockAjax.requests.mostRecent();
      response = { status: 200, contentType: "text/html", responseText: true };
      request.respondWith(response);

      // Assert
      expect(request.url).toEqual('http://localhost:3000/api/gameUpdate/?guid=' + guid + '&misses=' + misses);
    });
  });
}
