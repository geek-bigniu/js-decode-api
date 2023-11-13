const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

// 混淆的代码
const code = `var a=console.log(d),b=e(a);`;

// 解析代码为AST
const ast = parser.parse(code);

// 函数花指令
traverse(ast, {
	CallExpression(path){
		// console.log(path)
		var functionName =path.scope.generateUidIdentifier('functionName');
		var a = t.identifier('a');
		var b = t.identifier('b');
		var c = t.identifier('c');
		var call = t.FunctionDeclaration(functionName, [a,b], t.BlockStatement([t.ReturnStatement(t.CallExpression(a, [b]))]));
		ast.program.body.unshift(call);
		path.replaceWith(t.CallExpression(functionName, [t.identifier(path.node.callee.name),t.identifier(path.node.arguments[0].name)]));
		path.skip();
	}
});

// 生成转换后的代码
const output = generate(ast, {}, code);
console.log(output.code);
