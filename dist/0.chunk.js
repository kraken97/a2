webpackJsonp([0],{

/***/ 1228:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var about_routing_1 = __webpack_require__(1230);
var about_component_1 = __webpack_require__(1229);
var AboutModule = (function () {
    function AboutModule() {
    }
    AboutModule.prototype.ngOnInit = function () {
    };
    AboutModule = __decorate([
        core_1.NgModule({
            imports: [
                about_routing_1.AboutRoutingModule
            ],
            exports: [],
            declarations: [about_component_1.AboutComponent],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], AboutModule);
    return AboutModule;
}());
exports.AboutModule = AboutModule;


/***/ },

/***/ 1229:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () { };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'about',
            template: 'hellof'
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;


/***/ },

/***/ 1230:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(48);
var about_component_1 = __webpack_require__(1229);
var routes = [
    { path: '', component: about_component_1.AboutComponent },
];
var AboutRoutingModule = (function () {
    function AboutRoutingModule() {
    }
    AboutRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        }), 
        __metadata('design:paramtypes', [])
    ], AboutRoutingModule);
    return AboutRoutingModule;
}());
exports.AboutRoutingModule = AboutRoutingModule;


/***/ }

});
//# sourceMappingURL=0.chunk.js.map