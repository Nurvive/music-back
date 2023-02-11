"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var track_module_1 = require("./track/track.module");
var mongoose_1 = require("@nestjs/mongoose");
var album_controller_1 = require("./album/album.controller");
var album_service_1 = require("./album/album.service");
var album_module_1 = require("./album/album.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forRoot('mongodb+srv://Nurvive:80afenon@cluster0.smakqvv.mongodb.net/?retryWrites=true&w=majority'),
                track_module_1.TrackModule,
                album_module_1.AlbumModule,
            ],
            controllers: [album_controller_1.AlbumController],
            providers: [album_service_1.AlbumService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
