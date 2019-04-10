import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith,
  MergeStrategy,
  chain,
  filter
} from '@angular-devkit/schematics';

import { normalize, strings } from '@angular-devkit/core';
import { join } from 'path';

export interface IOptions {
  name: string;
  path: string;
  connected: string;
  scss: string;
  isScssIncluded: boolean;
  isConnected?: boolean;
  scssImport?: string;
  classifiedName?: string;
  connectorName?: string;
  propInterfaceName?: string;
  propInputInterfaceName?: string;
  propDispatchInterfaceName?: string;
}

export function setupOptions(options: IOptions): IOptions {
  const classifiedName = strings.classify(options.name || 'test');
  const isConnected = options.connected === 'true';
  const isScssIncluded = options.scss === 'true';

  return {
    ...options,
    classifiedName,
    connectorName:
      options.connectorName || `${classifiedName}Connector`,
    isConnected,
    isScssIncluded,
    propInterfaceName:
      options.propInterfaceName || `I${classifiedName}Props`,
    propInputInterfaceName:
      options.propInputInterfaceName || `I${classifiedName}InputProps`,
    propDispatchInterfaceName:
      options.propDispatchInterfaceName || `I${classifiedName}DispatchProps`,
    scssImport:
      isScssIncluded ? `import './${classifiedName}.scss';` : ''
  };
}

export function addToParentBarrelIndex(options: IOptions): Rule {
  return (host: Tree) => {
    const indexPath = join(options.path, 'index.ts');
    if (host.exists(indexPath)) {
      const text = host.read(indexPath);
      const sourceText = text!.toString('utf-8');
      const recorder = host.beginUpdate(indexPath);
      const importString =
        `'./${options.classifiedName}/${options.classifiedName}${
          options.isConnected
            ? '.connector' : ''
        }';`;
      const textToInsert = `\n`
        + `export * from `
        + importString
        + `\n`;
      recorder.insertRight(sourceText.length, textToInsert);
      host.commitUpdate(recorder);
    } else {
      console.warn(
        'WARNING: No index.ts file found in the parent directory.',
        'Skipping adding an export to this file.',
        '\n.........'
      );
    }
    return host;
  }
};

export function reactComponents(options: IOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const updatedOptions = setupOptions(options);

    const movePath =
      normalize(updatedOptions.path + '/' + updatedOptions.classifiedName);

    const templateSource = apply(url('./files'), [
      filter((path) => (
        updatedOptions.isConnected || !path.includes('.connector.ts')
      )),
      filter((path) => (
        updatedOptions.isScssIncluded || !path.includes('.scss')
      )),
      template({
        ...updatedOptions
      }),
      move(movePath)
    ]);

    const rule = chain([
      addToParentBarrelIndex(updatedOptions),
      mergeWith(templateSource, MergeStrategy.Default)
    ]);
    return rule(tree, _context);
  };
}
