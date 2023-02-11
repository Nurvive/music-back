"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrackModule = void 0;
var common_1 = require("@nestjs/common");
var track_service_1 = require("./track.service");
var track_controller_1 = require("./track.controller");
var mongoose_1 = require("@nestjs/mongoose");
var track_schema_1 = require("./schemas/track.schema");
var genre_schema_1 = require("./schemas/genre.schema");
var TrackModule = /** @class */ (function () {
    function TrackModule() {
    }
    TrackModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: track_schema_1.Track.name, schema: track_schema_1.TrackSchema }]),
                mongoose_1.MongooseModule.forFeature([{ name: genre_schema_1.Genre.name, schema: genre_schema_1.GenreSchema }]),
            ],
            providers: [track_service_1.TrackService],
            controllers: [track_controller_1.TrackController]
        })
    ], TrackModule);
    return TrackModule;
}());
exports.TrackModule = TrackModule;
