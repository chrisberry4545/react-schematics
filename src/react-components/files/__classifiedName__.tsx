import React, { FC } from 'react';
<%= scssImport %>
import {
  <%= propInterfaceName %>
} from './<%= classifiedName %>.interface';

export const <%= classifiedName %>: FC<<%= propInterfaceName %>> = ({
}) => (
  <div><%= classifiedName %></div>
);
