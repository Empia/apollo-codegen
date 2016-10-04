import {
  join,
  wrap,
} from '../utilities/printing';

export function classDeclaration(generator, { name, modifiers, superClass, adoptedProtocols = [], properties }, closure) {
  generator.printNewlineIfNeeded();
  generator.printNewline();
  generator.print(wrap('', join(modifiers, ' '), ' '));
  generator.print(`class ${ name }`);
  generator.print(wrap(': ', join([superClass, ...adoptedProtocols], ', ')));
  generator.pushScope({ typeName: name });
  generator.withinBlock(closure);
  generator.popScope();
}

export function interfaceDeclaration(generator, { name, properties }, closure) {
  generator.printNewlineIfNeeded();
  generator.printNewline();
  generator.print(`export interface ${ name }`);
  generator.pushScope({ typeName: name });
  generator.withinBlock(closure);
  generator.popScope();
}

export function structDeclaration(generator, { name, adoptedProtocols = [] }, closure) {
  generator.printNewlineIfNeeded();
  generator.printOnNewline(`${name}:`);
  generator.withinBlock(closure);
  generator.popScope();
}

export function interfacePropertyDeclaration(generator, { name, typeName }) {
  generator.printOnNewline(`${name}: ${typeName};`);
}

export function propertyDeclaration(generator, { name, typeName }) {
  generator.printOnNewline(`${name}: ${typeName},`);
}


export function propertyDeclarations(generator, properties) {
  properties.forEach(property => propertyDeclaration(generator, property));
}

export function protocolDeclaration(generator, { name, adoptedProtocols, properties }, closure) {
  generator.printNewlineIfNeeded();
  generator.printOnNewline(`public protocol ${name}`, wrap(': ', join(adoptedProtocols, ', ')));
  generator.pushScope({ typeName: name });
  generator.withinBlock(closure);
  generator.popScope();
}

export function protocolPropertyDeclaration(generator, { name, typeName }) {
  generator.printOnNewline(`var ${name}: ${typeName} { get }`);
}

export function protocolPropertyDeclarations(generator, properties) {
  properties.forEach(property => protocolPropertyDeclaration(generator, property));
}