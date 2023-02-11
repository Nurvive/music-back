"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenreSchema = exports.Genre = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Genre = /** @class */ (function () {
    function Genre() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], Genre.prototype, "name");
    Genre = __decorate([
        (0, mongoose_1.Schema)()
    ], Genre);
    return Genre;
}());
exports.Genre = Genre;
exports.GenreSchema = mongoose_1.SchemaFactory.createForClass(Genre);
