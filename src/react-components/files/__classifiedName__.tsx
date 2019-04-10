import React from 'react';
<%= scssImport %>
import {
  <%= propInterfaceName %>
} from './<%= classifiedName %>.interface';

export const <%= classifiedName %> = ({}: <%= propInterfaceName %>) => (
  <div><%= classifiedName %></div>
);
