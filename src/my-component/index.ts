import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { classify } from '@angular-devkit/core/src/utils/strings';

const initViewFileContents = ({
  name,
  propInterfaceName
}: {
  name: string,
  propInterfaceName: string
}) => `
import React from 'react';
import './${name}.scss';
import {
  ${propInterfaceName}
} from './${name}.interface';

export const ${name} = ({}: ${propInterfaceName}) => (
  <div>${name}</div>
);

`;

const initConnectorFileContents = ({
  name,
  propInputInterfaceName,
  propDispatchInterfaceName
}: {
  name: string,
  propInputInterfaceName: string,
  propDispatchInterfaceName: string
}) => `
import { connect } from 'react-redux';
import {
  ${name}
} from './${name}';

import { IState } from '../../interfaces';
import {
  ${propInputInterfaceName},
  ${propDispatchInterfaceName}
} from './${name}.interface';
import { Dispatch } from 'redux';

const mapStateToProps = (
  state: IState
): ${propInputInterfaceName} => ({});

const mapDispatchToProps = (
  dispatch: Dispatch
): ${propDispatchInterfaceName} => ({});

export const ${name}Connector = connect(
  mapStateToProps,
  mapDispatchToProps
)(${name});

`;

const initInterfaceFileContents = ({
  name,
  propInputInterfaceName,
  propDispatchInterfaceName
}: {
  name: string,
  propInputInterfaceName: string,
  propDispatchInterfaceName: string
}) => `
export interface ${propInputInterfaceName} {}

export interface ${propDispatchInterfaceName} {}

export interface ${name}Props
  extends ${propInputInterfaceName}, ${propDispatchInterfaceName} {}

`

export function myComponent(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const name = classify(options.name || 'hello');
    const propInterfaceName = `I${name}Props`;
    const propInputInterfaceName = `I${name}InputProps`;
    const propDispatchInterfaceName = `I${name}DispatchProps`;
    tree.create(`${name}.tsx`, initViewFileContents({
      name,
      propInterfaceName
    }));
    tree.create(`${name}.connector.ts`, initConnectorFileContents({
      name,
      propInputInterfaceName,
      propDispatchInterfaceName
    }));
    tree.create(`${name}.interface.ts`, initInterfaceFileContents({
      name,
      propInputInterfaceName,
      propDispatchInterfaceName
    }));
    tree.create(`${name}.scss`, '');
    return tree;
  };
}
