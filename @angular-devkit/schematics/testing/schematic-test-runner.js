"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const tools_1 = require("@angular-devkit/schematics/tools");
const Observable_1 = require("rxjs/Observable");
class SchematicTestRunner {
    constructor(_collectionName, collectionPath) {
        this._collectionName = _collectionName;
        this._engineHost = new tools_1.NodeModulesTestEngineHost();
        this._engine = new schematics_1.SchematicEngine(this._engineHost);
        this._engineHost.registerCollection(_collectionName, collectionPath);
        this._logger = new core_1.Logger('test');
        this._registry = new core_1.schema.JsonSchemaRegistry();
        this._engineHost.registerOptionsTransform((schematicDescription, opts) => {
            const schematic = schematicDescription;
            if (schematic.schema && schematic.schemaJson) {
                const schemaJson = schematic.schemaJson;
                const name = schemaJson.id || schematic.name;
                this._registry.addSchema(name, schemaJson);
                const serializer = new core_1.schema.serializers.JavascriptSerializer();
                const fn = serializer.serialize(name, this._registry);
                return fn(opts);
            }
            return opts;
        });
        this._collection = this._engine.createCollection(this._collectionName);
    }
    get logger() { return this._logger; }
    runSchematicAsync(schematicName, opts, tree) {
        const schematic = this._collection.createSchematic(schematicName);
        const host = Observable_1.Observable.of(tree || new schematics_1.VirtualTree);
        return schematic.call(opts || {}, host, { logger: this._logger });
    }
    runSchematic(schematicName, opts, tree) {
        const schematic = this._collection.createSchematic(schematicName);
        let result = null;
        const host = Observable_1.Observable.of(tree || new schematics_1.VirtualTree);
        schematic.call(opts || {}, host, { logger: this._logger })
            .subscribe(t => result = t);
        if (result === null) {
            throw new Error('Schematic is async, please use runSchematicAsync');
        }
        return result;
    }
}
exports.SchematicTestRunner = SchematicTestRunner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLXRlc3QtcnVubmVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9oYW5zbC9Tb3VyY2VzL2hhbnNsL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdGVzdGluZy9zY2hlbWF0aWMtdGVzdC1ydW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBc0Q7QUFDdEQsMkRBS29DO0FBQ3BDLDREQUcwQztBQUMxQyxnREFBNkM7QUFLN0M7SUFPRSxZQUFvQixlQUF1QixFQUFFLGNBQXNCO1FBQS9DLG9CQUFlLEdBQWYsZUFBZSxDQUFRO1FBTm5DLGdCQUFXLEdBQUcsSUFBSSxpQ0FBeUIsRUFBRSxDQUFDO1FBQzlDLFlBQU8sR0FBNEIsSUFBSSw0QkFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQU0vRSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVqRCxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixDQUFDLENBQ3hDLG9CQUF3QixFQUN4QixJQUFzQjtZQUV0QixNQUFNLFNBQVMsR0FBNEIsb0JBQStDLENBQUM7WUFFM0YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQXFDLENBQUM7Z0JBQ25FLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQU0sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDakUsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUV0RCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFckMsaUJBQWlCLENBQUMsYUFBcUIsRUFBRSxJQUF1QixFQUFFLElBQVc7UUFDM0UsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEUsTUFBTSxJQUFJLEdBQUcsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksd0JBQVcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxZQUFZLENBQUMsYUFBcUIsRUFBRSxJQUF1QixFQUFFLElBQVc7UUFDdEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbEUsSUFBSSxNQUFNLEdBQWdCLElBQUksQ0FBQztRQUMvQixNQUFNLElBQUksR0FBRyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSx3QkFBVyxDQUFDLENBQUM7UUFFcEQsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkQsU0FBUyxDQUFDLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQTFERCxrREEwREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBMb2dnZXIsIHNjaGVtYSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb24sXG4gIFNjaGVtYXRpY0VuZ2luZSxcbiAgVHJlZSxcbiAgVmlydHVhbFRyZWUsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjLFxuICBOb2RlTW9kdWxlc1Rlc3RFbmdpbmVIb3N0LFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90b29scyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYXRpY1NjaGVtYVQge31cblxuZXhwb3J0IGNsYXNzIFNjaGVtYXRpY1Rlc3RSdW5uZXIge1xuICBwcml2YXRlIF9lbmdpbmVIb3N0ID0gbmV3IE5vZGVNb2R1bGVzVGVzdEVuZ2luZUhvc3QoKTtcbiAgcHJpdmF0ZSBfZW5naW5lOiBTY2hlbWF0aWNFbmdpbmU8e30sIHt9PiA9IG5ldyBTY2hlbWF0aWNFbmdpbmUodGhpcy5fZW5naW5lSG9zdCk7XG4gIHByaXZhdGUgX2NvbGxlY3Rpb246IENvbGxlY3Rpb248e30sIHt9PjtcbiAgcHJpdmF0ZSBfbG9nZ2VyOiBMb2dnZXI7XG4gIHByaXZhdGUgX3JlZ2lzdHJ5OiBzY2hlbWEuSnNvblNjaGVtYVJlZ2lzdHJ5O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGNvbGxlY3Rpb25QYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lbmdpbmVIb3N0LnJlZ2lzdGVyQ29sbGVjdGlvbihfY29sbGVjdGlvbk5hbWUsIGNvbGxlY3Rpb25QYXRoKTtcbiAgICB0aGlzLl9sb2dnZXIgPSBuZXcgTG9nZ2VyKCd0ZXN0Jyk7XG4gICAgdGhpcy5fcmVnaXN0cnkgPSBuZXcgc2NoZW1hLkpzb25TY2hlbWFSZWdpc3RyeSgpO1xuXG4gICAgdGhpcy5fZW5naW5lSG9zdC5yZWdpc3Rlck9wdGlvbnNUcmFuc2Zvcm0oKFxuICAgICAgc2NoZW1hdGljRGVzY3JpcHRpb246IHt9LFxuICAgICAgb3B0czogU2NoZW1hdGljU2NoZW1hVCxcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYXRpYzogRmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2MgPSBzY2hlbWF0aWNEZXNjcmlwdGlvbiBhcyBGaWxlU3lzdGVtU2NoZW1hdGljRGVzYztcblxuICAgICAgaWYgKHNjaGVtYXRpYy5zY2hlbWEgJiYgc2NoZW1hdGljLnNjaGVtYUpzb24pIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hSnNvbiA9IHNjaGVtYXRpYy5zY2hlbWFKc29uIGFzIHNjaGVtYS5Kc29uU2NoZW1hT2JqZWN0O1xuICAgICAgICBjb25zdCBuYW1lID0gc2NoZW1hSnNvbi5pZCB8fCBzY2hlbWF0aWMubmFtZTtcbiAgICAgICAgdGhpcy5fcmVnaXN0cnkuYWRkU2NoZW1hKG5hbWUsIHNjaGVtYUpzb24pO1xuICAgICAgICBjb25zdCBzZXJpYWxpemVyID0gbmV3IHNjaGVtYS5zZXJpYWxpemVycy5KYXZhc2NyaXB0U2VyaWFsaXplcigpO1xuICAgICAgICBjb25zdCBmbiA9IHNlcmlhbGl6ZXIuc2VyaWFsaXplKG5hbWUsIHRoaXMuX3JlZ2lzdHJ5KTtcblxuICAgICAgICByZXR1cm4gZm4ob3B0cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcHRzO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29sbGVjdGlvbiA9IHRoaXMuX2VuZ2luZS5jcmVhdGVDb2xsZWN0aW9uKHRoaXMuX2NvbGxlY3Rpb25OYW1lKTtcbiAgfVxuXG4gIGdldCBsb2dnZXIoKSB7IHJldHVybiB0aGlzLl9sb2dnZXI7IH1cblxuICBydW5TY2hlbWF0aWNBc3luYyhzY2hlbWF0aWNOYW1lOiBzdHJpbmcsIG9wdHM/OiBTY2hlbWF0aWNTY2hlbWFULCB0cmVlPzogVHJlZSk6IE9ic2VydmFibGU8VHJlZT4ge1xuICAgIGNvbnN0IHNjaGVtYXRpYyA9IHRoaXMuX2NvbGxlY3Rpb24uY3JlYXRlU2NoZW1hdGljKHNjaGVtYXRpY05hbWUpO1xuICAgIGNvbnN0IGhvc3QgPSBPYnNlcnZhYmxlLm9mKHRyZWUgfHwgbmV3IFZpcnR1YWxUcmVlKTtcblxuICAgIHJldHVybiBzY2hlbWF0aWMuY2FsbChvcHRzIHx8IHt9LCBob3N0LCB7IGxvZ2dlcjogdGhpcy5fbG9nZ2VyIH0pO1xuICB9XG5cbiAgcnVuU2NoZW1hdGljKHNjaGVtYXRpY05hbWU6IHN0cmluZywgb3B0cz86IFNjaGVtYXRpY1NjaGVtYVQsIHRyZWU/OiBUcmVlKTogVHJlZSB7XG4gICAgY29uc3Qgc2NoZW1hdGljID0gdGhpcy5fY29sbGVjdGlvbi5jcmVhdGVTY2hlbWF0aWMoc2NoZW1hdGljTmFtZSk7XG5cbiAgICBsZXQgcmVzdWx0OiBUcmVlIHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgaG9zdCA9IE9ic2VydmFibGUub2YodHJlZSB8fCBuZXcgVmlydHVhbFRyZWUpO1xuXG4gICAgc2NoZW1hdGljLmNhbGwob3B0cyB8fCB7fSwgaG9zdCwgeyBsb2dnZXI6IHRoaXMuX2xvZ2dlciB9KVxuICAgICAgLnN1YnNjcmliZSh0ID0+IHJlc3VsdCA9IHQpO1xuXG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY2hlbWF0aWMgaXMgYXN5bmMsIHBsZWFzZSB1c2UgcnVuU2NoZW1hdGljQXN5bmMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=