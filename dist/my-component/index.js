"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const initViewFileContents = ({ name, propInterfaceName }) => `
import React from 'react';
import './${name}.scss';
import {
  ${propInterfaceName}
} from './${name}.interface';

export const ${name} = ({}: ${propInterfaceName}) => (
  <div>${name}</div>
);

`;
const initConnectorFileContents = ({ name, propInputInterfaceName, propDispatchInterfaceName }) => `
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
const initInterfaceFileContents = ({ name, propInputInterfaceName, propDispatchInterfaceName }) => `
export interface ${propInputInterfaceName} {}

export interface ${propDispatchInterfaceName} {}

export interface ${name}Props
  extends ${propInputInterfaceName}, ${propDispatchInterfaceName} {}

`;
function myComponent(options) {
    return (tree, _context) => {
        const name = strings_1.classify(options.name || 'hello');
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
exports.myComponent = myComponent;
//# sourceMappingURL=index.js.map