var Services;
(function (Services) {
    var MyService = (function () {
        function MyService(a, b) {
            this.a = a;
            this.b = b;
        }
        MyService.prototype.add = function () {
            if (this.a < 10) {
                this.a = 10;
            }
            return this.a + this.b;
        };
        MyService.prototype.multiply = function () {
            return this.a * this.b;
        };
        return MyService;
    }());
    Services.MyService = MyService;
})(Services || (Services = {}));

//# sourceMappingURL=MyService.js.map
