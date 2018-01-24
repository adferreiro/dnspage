"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const fs = require("fs");
const path_1 = require("path");
class NodeJsHost {
    constructor(_root) {
        this._root = _root;
    }
    listDirectory(path) {
        return fs.readdirSync(this.join(this._root, path));
    }
    isDirectory(path) {
        return fs.statSync(this.join(this._root, path)).isDirectory();
    }
    readFile(path) {
        return fs.readFileSync(this.join(this._root, path));
    }
    join(path1, path2) {
        return path_1.join(path1, path2);
    }
}
exports.NodeJsHost = NodeJsHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1ob3N0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9oYW5zbC9Tb3VyY2VzL2hhbnNsL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3RyZWUvbm9kZS1ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gseUJBQXlCO0FBQ3pCLCtCQUE0QjtBQUk1QjtJQUNFLFlBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUVyQyxhQUFhLENBQUMsSUFBWTtRQUN4QixNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQVk7UUFDdEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFZO1FBQ25CLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYSxFQUFFLEtBQWE7UUFDL0IsTUFBTSxDQUFDLFdBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBaEJELGdDQWdCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IEZpbGVTeXN0ZW1UcmVlSG9zdCB9IGZyb20gJy4vZmlsZXN5c3RlbSc7XG5cblxuZXhwb3J0IGNsYXNzIE5vZGVKc0hvc3QgaW1wbGVtZW50cyBGaWxlU3lzdGVtVHJlZUhvc3Qge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb290OiBzdHJpbmcpIHt9XG5cbiAgbGlzdERpcmVjdG9yeShwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZnMucmVhZGRpclN5bmModGhpcy5qb2luKHRoaXMuX3Jvb3QsIHBhdGgpKTtcbiAgfVxuICBpc0RpcmVjdG9yeShwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZnMuc3RhdFN5bmModGhpcy5qb2luKHRoaXMuX3Jvb3QsIHBhdGgpKS5pc0RpcmVjdG9yeSgpO1xuICB9XG4gIHJlYWRGaWxlKHBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmModGhpcy5qb2luKHRoaXMuX3Jvb3QsIHBhdGgpKTtcbiAgfVxuXG4gIGpvaW4ocGF0aDE6IHN0cmluZywgcGF0aDI6IHN0cmluZykge1xuICAgIHJldHVybiBqb2luKHBhdGgxLCBwYXRoMik7XG4gIH1cbn1cbiJdfQ==