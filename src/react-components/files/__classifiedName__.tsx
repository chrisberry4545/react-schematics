import React, { SFC } from 'react';
<%= scssImport %>
import {
  <%= propInterfaceName %>
} from './<%= classifiedName %>.interface';

export const <%= classifiedName %>: SFC<<%= propInterfaceName %>> = ({
}) => (
  <div><%= classifiedName %></div>
);
