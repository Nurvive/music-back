"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TrackController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var TrackController = /** @class */ (function () {
    function TrackController(trackService) {
        this.trackService = trackService;
    }
    TrackController.prototype.create = function (file, dto) {
        console.log(file);
        return this.trackService.create(dto);
    };
    TrackController.prototype.getAll = function () {
        return this.trackService.getAll();
    };
    TrackController.prototype.getOne = function (id) {
        return this.trackService.getOne(id);
    };
    TrackController.prototype["delete"] = function (id) {
        return this.trackService["delete"](id);
    };
    TrackController.prototype.addGenre = function (dto) {
        return this.trackService.addGenre(dto);
    };
    TrackController.prototype.createGenre = function (dto) {
        return this.trackService.createGenre(dto);
    };
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio')),
        __param(0, (0, common_1.UploadedFile)()),
        __param(1, (0, common_1.Body)())
    ], TrackController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], TrackController.prototype, "getAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], TrackController.prototype, "getOne");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], TrackController.prototype, "delete");
    __decorate([
        (0, common_1.Post)('addGenre'),
        __param(0, (0, common_1.Body)())
    ], TrackController.prototype, "addGenre");
    __decorate([
        (0, common_1.Post)('genre'),
        __param(0, (0, common_1.Body)())
    ], TrackController.prototype, "createGenre");
    TrackController = __decorate([
        (0, common_1.Controller)('tracks')
    ], TrackController);
    return TrackController;
}());
exports.TrackController = TrackController;
