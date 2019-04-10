import { connect } from 'react-redux';
import {
  <%= classifiedName %>
} from './<%= classifiedName %>';

import { IState } from '../../interfaces';
import {
  <%= propInputInterfaceName %>,
  <%= propDispatchInterfaceName %>
} from './<%= classifiedName %>.interface';
import { Dispatch } from 'redux';

const mapStateToProps = (
  state: IState
): <%= propInputInterfaceName %> => ({});

const mapDispatchToProps = (
  dispatch: Dispatch
): <%= propDispatchInterfaceName %> => ({});

export const <%= connectorName %> = connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= classifiedName %>);
