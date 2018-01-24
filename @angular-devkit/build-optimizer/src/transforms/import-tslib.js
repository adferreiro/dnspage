"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ts = require("typescript");
function testImportTslib(content) {
    const regex = /var (__extends|__decorate|__metadata|__param) = \(.*\r?\n(    .*\r?\n)*\};/;
    // This transform introduces import/require() calls, but this won't work properly on libraries
    // built with Webpack. These libraries use __webpack_require__() calls instead, which will break
    // with a new import that wasn't part of it's original module list.
    // We ignore this transform for such libraries.
    const webpackRequireRegex = /__webpack_require__/;
    return regex.test(content) && !webpackRequireRegex.test(content);
}
exports.testImportTslib = testImportTslib;
function getImportTslibTransformer() {
    return (context) => {
        const transformer = (sf) => {
            // Check if module has CJS exports. If so, use 'require()' instead of 'import'.
            const useRequire = /exports.\S+\s*=/.test(sf.getText());
            const visitor = (node) => {
                // Check if node is a TS helper declaration.
                if (isTsHelper(node)) {
                    // Replace node with import for that helper.
                    return ts.visitEachChild(createTslibImport(node, useRequire), visitor, context);
                }
                // Otherwise return node as is.
                return ts.visitEachChild(node, visitor, context);
            };
            return ts.visitNode(sf, visitor);
        };
        return transformer;
    };
}
exports.getImportTslibTransformer = getImportTslibTransformer;
function createTslibImport(node, useRequire = false) {
    const name = getVariableStatementName(node);
    if (!name) {
        return node;
    }
    if (useRequire) {
        // Use `var __helper = /*@__PURE__*/ require("tslib").__helper`.
        const requireCall = ts.createCall(ts.createIdentifier('require'), undefined, [ts.createLiteral('tslib')]);
        const pureRequireCall = ts.addSyntheticLeadingComment(requireCall, ts.SyntaxKind.MultiLineCommentTrivia, '@__PURE__', false);
        const helperAccess = ts.createPropertyAccess(pureRequireCall, name);
        const variableDeclaration = ts.createVariableDeclaration(name, undefined, helperAccess);
        const variableStatement = ts.createVariableStatement(undefined, [variableDeclaration]);
        return variableStatement;
    }
    else {
        // Use `import { __helper } from "tslib"`.
        const namedImports = ts.createNamedImports([ts.createImportSpecifier(undefined, ts.createIdentifier(name))]);
        // typescript@2.4 is needed for a fix to the function parameter types of ts.createImportClause.
        // https://github.com/Microsoft/TypeScript/pull/15999
        // Hiding it from lint until we upgrade.
        // tslint:disable-next-line:no-any
        const importClause = ts.createImportClause(undefined, namedImports);
        const newNode = ts.createImportDeclaration(undefined, undefined, importClause, ts.createLiteral('tslib'));
        return newNode;
    }
}
function isTsHelper(node) {
    if (node.kind !== ts.SyntaxKind.VariableStatement) {
        return false;
    }
    const varStmt = node;
    if (varStmt.declarationList.declarations.length > 1) {
        return false;
    }
    const varDecl = varStmt.declarationList.declarations[0];
    if (varDecl.name.kind !== ts.SyntaxKind.Identifier) {
        return false;
    }
    const name = getVariableStatementName(node);
    if (!name) {
        return false;
    }
    // TODO: there are more helpers than these, should we replace them all?
    const tsHelpers = [
        '__extends',
        '__decorate',
        '__metadata',
        '__param',
    ];
    if (tsHelpers.indexOf(name) === -1) {
        return false;
    }
    // TODO: maybe add a few more checks, like checking the first part of the assignment.
    return true;
}
function getVariableStatementName(node) {
    const varStmt = node;
    if (varStmt.declarationList.declarations.length > 1) {
        return null;
    }
    const varDecl = varStmt.declarationList.declarations[0];
    if (varDecl.name.kind !== ts.SyntaxKind.Identifier) {
        return null;
    }
    const name = varDecl.name.text;
    // node.getText() on a name that starts with two underscores will return three instead.
    return name.replace(/^___/, '__');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRzbGliLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9oYW5zbC9Tb3VyY2VzL2hhbnNsL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX29wdGltaXplci9zcmMvdHJhbnNmb3Jtcy9pbXBvcnQtdHNsaWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCxpQ0FBaUM7QUFHakMseUJBQWdDLE9BQWU7SUFDN0MsTUFBTSxLQUFLLEdBQUcsNEVBQTRFLENBQUM7SUFFM0YsOEZBQThGO0lBQzlGLGdHQUFnRztJQUNoRyxtRUFBbUU7SUFDbkUsK0NBQStDO0lBQy9DLE1BQU0sbUJBQW1CLEdBQUcscUJBQXFCLENBQUM7SUFFbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQVZELDBDQVVDO0FBRUQ7SUFDRSxNQUFNLENBQUMsQ0FBQyxPQUFpQztRQUV2QyxNQUFNLFdBQVcsR0FBa0MsQ0FBQyxFQUFpQjtZQUVuRSwrRUFBK0U7WUFDL0UsTUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRXhELE1BQU0sT0FBTyxHQUFlLENBQUMsSUFBYTtnQkFFeEMsNENBQTRDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQiw0Q0FBNEM7b0JBQzVDLE1BQU0sQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2xGLENBQUM7Z0JBRUQsK0JBQStCO2dCQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMs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QUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RJbXBvcnRUc2xpYihjb250ZW50OiBzdHJpbmcpIHtcbiAgY29uc3QgcmVnZXggPSAvdmFyIChfX2V4dGVuZHN8X19kZWNvcmF0ZXxfX21ldGFkYXRhfF9fcGFyYW0pID0gXFwoLipcXHI/XFxuKCAgICAuKlxccj9cXG4pKlxcfTsvO1xuXG4gIC8vIFRoaXMgdHJhbnNmb3JtIGludHJvZHVjZXMgaW1wb3J0L3JlcXVpcmUoKSBjYWxscywgYnV0IHRoaXMgd29uJ3Qgd29yayBwcm9wZXJseSBvbiBsaWJyYXJpZXNcbiAgLy8gYnVpbHQgd2l0aCBXZWJwYWNrLiBUaGVzZSBsaWJyYXJpZXMgdXNlIF9fd2VicGFja19yZXF1aXJlX18oKSBjYWxscyBpbnN0ZWFkLCB3aGljaCB3aWxsIGJyZWFrXG4gIC8vIHdpdGggYSBuZXcgaW1wb3J0IHRoYXQgd2Fzbid0IHBhcnQgb2YgaXQncyBvcmlnaW5hbCBtb2R1bGUgbGlzdC5cbiAgLy8gV2UgaWdub3JlIHRoaXMgdHJhbnNmb3JtIGZvciBzdWNoIGxpYnJhcmllcy5cbiAgY29uc3Qgd2VicGFja1JlcXVpcmVSZWdleCA9IC9fX3dlYnBhY2tfcmVxdWlyZV9fLztcblxuICByZXR1cm4gcmVnZXgudGVzdChjb250ZW50KSAmJiAhd2VicGFja1JlcXVpcmVSZWdleC50ZXN0KGNvbnRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1wb3J0VHNsaWJUcmFuc2Zvcm1lcigpOiB0cy5UcmFuc2Zvcm1lckZhY3Rvcnk8dHMuU291cmNlRmlsZT4ge1xuICByZXR1cm4gKGNvbnRleHQ6IHRzLlRyYW5zZm9ybWF0aW9uQ29udGV4dCk6IHRzLlRyYW5zZm9ybWVyPHRzLlNvdXJjZUZpbGU+ID0+IHtcblxuICAgIGNvbnN0IHRyYW5zZm9ybWVyOiB0cy5UcmFuc2Zvcm1lcjx0cy5Tb3VyY2VGaWxlPiA9IChzZjogdHMuU291cmNlRmlsZSkgPT4ge1xuXG4gICAgICAvLyBDaGVjayBpZiBtb2R1bGUgaGFzIENKUyBleHBvcnRzLiBJZiBzbywgdXNlICdyZXF1aXJlKCknIGluc3RlYWQgb2YgJ2ltcG9ydCcuXG4gICAgICBjb25zdCB1c2VSZXF1aXJlID0gL2V4cG9ydHMuXFxTK1xccyo9Ly50ZXN0KHNmLmdldFRleHQoKSk7XG5cbiAgICAgIGNvbnN0IHZpc2l0b3I6IHRzLlZpc2l0b3IgPSAobm9kZTogdHMuTm9kZSk6IHRzLk5vZGUgPT4ge1xuXG4gICAgICAgIC8vIENoZWNrIGlmIG5vZGUgaXMgYSBUUyBoZWxwZXIgZGVjbGFyYXRpb24uXG4gICAgICAgIGlmIChpc1RzSGVscGVyKG5vZGUpKSB7XG4gICAgICAgICAgLy8gUmVwbGFjZSBub2RlIHdpdGggaW1wb3J0IGZvciB0aGF0IGhlbHBlci5cbiAgICAgICAgICByZXR1cm4gdHMudmlzaXRFYWNoQ2hpbGQoY3JlYXRlVHNsaWJJbXBvcnQobm9kZSwgdXNlUmVxdWlyZSksIHZpc2l0b3IsIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJldHVybiBub2RlIGFzIGlzLlxuICAgICAgICByZXR1cm4gdHMudmlzaXRFYWNoQ2hpbGQobm9kZSwgdmlzaXRvciwgY29udGV4dCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdHMudmlzaXROb2RlKHNmLCB2aXNpdG9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVyO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUc2xpYkltcG9ydChub2RlOiB0cy5Ob2RlLCB1c2VSZXF1aXJlID0gZmFsc2UpOiB0cy5Ob2RlIHtcbiAgY29uc3QgbmFtZSA9IGdldFZhcmlhYmxlU3RhdGVtZW50TmFtZShub2RlKTtcblxuICBpZiAoIW5hbWUpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGlmICh1c2VSZXF1aXJlKSB7XG4gICAgLy8gVXNlIGB2YXIgX19oZWxwZXIgPSAvKkBfX1BVUkVfXyovIHJlcXVpcmUoXCJ0c2xpYlwiKS5fX2hlbHBlcmAuXG4gICAgY29uc3QgcmVxdWlyZUNhbGwgPSB0cy5jcmVhdGVDYWxsKHRzLmNyZWF0ZUlkZW50aWZpZXIoJ3JlcXVpcmUnKSwgdW5kZWZpbmVkLFxuICAgICAgW3RzLmNyZWF0ZUxpdGVyYWwoJ3RzbGliJyldKTtcbiAgICBjb25zdCBwdXJlUmVxdWlyZUNhbGwgPSB0cy5hZGRTeW50aGV0aWNMZWFkaW5nQ29tbWVudChcbiAgICAgIHJlcXVpcmVDYWxsLCB0cy5TeW50YXhLaW5kLk11bHRpTGluZUNvbW1lbnRUcml2aWEsICdAX19QVVJFX18nLCBmYWxzZSk7XG4gICAgY29uc3QgaGVscGVyQWNjZXNzID0gdHMuY3JlYXRlUHJvcGVydHlBY2Nlc3MocHVyZVJlcXVpcmVDYWxsLCBuYW1lKTtcbiAgICBjb25zdCB2YXJpYWJsZURlY2xhcmF0aW9uID0gdHMuY3JlYXRlVmFyaWFibGVEZWNsYXJhdGlvbihuYW1lLCB1bmRlZmluZWQsIGhlbHBlckFjY2Vzcyk7XG4gICAgY29uc3QgdmFyaWFibGVTdGF0ZW1lbnQgPSB0cy5jcmVhdGVWYXJpYWJsZVN0YXRlbWVudCh1bmRlZmluZWQsIFt2YXJpYWJsZURlY2xhcmF0aW9uXSk7XG5cbiAgICByZXR1cm4gdmFyaWFibGVTdGF0ZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gVXNlIGBpbXBvcnQgeyBfX2hlbHBlciB9IGZyb20gXCJ0c2xpYlwiYC5cbiAgICBjb25zdCBuYW1lZEltcG9ydHMgPSB0cy5jcmVhdGVOYW1lZEltcG9ydHMoW3RzLmNyZWF0ZUltcG9ydFNwZWNpZmllcih1bmRlZmluZWQsXG4gICAgICB0cy5jcmVhdGVJZGVudGlmaWVyKG5hbWUpKV0pO1xuICAgIC8vIHR5cGVzY3JpcHRAMi40IGlzIG5lZWRlZCBmb3IgYSBmaXggdG8gdGhlIGZ1bmN0aW9uIHBhcmFtZXRlciB0eXBlcyBvZiB0cy5jcmVhdGVJbXBvcnRDbGF1c2UuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L3B1bGwvMTU5OTlcbiAgICAvLyBIaWRpbmcgaXQgZnJvbSBsaW50IHVudGlsIHdlIHVwZ3JhZGUuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIGNvbnN0IGltcG9ydENsYXVzZSA9ICh0cy5jcmVhdGVJbXBvcnRDbGF1c2UgYXMgYW55KSh1bmRlZmluZWQsIG5hbWVkSW1wb3J0cyk7XG4gICAgY29uc3QgbmV3Tm9kZSA9IHRzLmNyZWF0ZUltcG9ydERlY2xhcmF0aW9uKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBpbXBvcnRDbGF1c2UsXG4gICAgICB0cy5jcmVhdGVMaXRlcmFsKCd0c2xpYicpKTtcblxuICAgIHJldHVybiBuZXdOb2RlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVHNIZWxwZXIobm9kZTogdHMuTm9kZSk6IGJvb2xlYW4ge1xuICBpZiAobm9kZS5raW5kICE9PSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlU3RhdGVtZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHZhclN0bXQgPSBub2RlIGFzIHRzLlZhcmlhYmxlU3RhdGVtZW50O1xuICBpZiAodmFyU3RtdC5kZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdmFyRGVjbCA9IHZhclN0bXQuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9uc1swXTtcbiAgaWYgKHZhckRlY2wubmFtZS5raW5kICE9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBuYW1lID0gZ2V0VmFyaWFibGVTdGF0ZW1lbnROYW1lKG5vZGUpO1xuXG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRPRE86IHRoZXJlIGFyZSBtb3JlIGhlbHBlcnMgdGhhbiB0aGVzZSwgc2hvdWxkIHdlIHJlcGxhY2UgdGhlbSBhbGw/XG4gIGNvbnN0IHRzSGVscGVycyA9IFtcbiAgICAnX19leHRlbmRzJyxcbiAgICAnX19kZWNvcmF0ZScsXG4gICAgJ19fbWV0YWRhdGEnLFxuICAgICdfX3BhcmFtJyxcbiAgXTtcblxuICBpZiAodHNIZWxwZXJzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVE9ETzogbWF5YmUgYWRkIGEgZmV3IG1vcmUgY2hlY2tzLCBsaWtlIGNoZWNraW5nIHRoZSBmaXJzdCBwYXJ0IG9mIHRoZSBhc3NpZ25tZW50LlxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRWYXJpYWJsZVN0YXRlbWVudE5hbWUobm9kZTogdHMuTm9kZSkge1xuICBjb25zdCB2YXJTdG10ID0gbm9kZSBhcyB0cy5WYXJpYWJsZVN0YXRlbWVudDtcbiAgaWYgKHZhclN0bXQuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgdmFyRGVjbCA9IHZhclN0bXQuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9uc1swXTtcbiAgaWYgKHZhckRlY2wubmFtZS5raW5kICE9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSAodmFyRGVjbC5uYW1lIGFzIHRzLklkZW50aWZpZXIpLnRleHQ7XG5cbiAgLy8gbm9kZS5nZXRUZXh0KCkgb24gYSBuYW1lIHRoYXQgc3RhcnRzIHdpdGggdHdvIHVuZGVyc2NvcmVzIHdpbGwgcmV0dXJuIHRocmVlIGluc3RlYWQuXG4gIHJldHVybiBuYW1lLnJlcGxhY2UoL15fX18vLCAnX18nKTtcbn1cbiJdfQ==