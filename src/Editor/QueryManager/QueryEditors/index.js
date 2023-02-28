import React from 'react';
import DynamicForm from '@/_components/DynamicForm';

import { Restapi } from './Restapi';
import { Runjs } from './Runjs';
import { Runpy } from './Runpy';
import { Stripe } from './Stripe';
import { Openapi } from './Openapi';
import tooljetDbOperations from './TooljetDatabase/operations.json';

import { queryManagerSelectComponentStyle } from '@/_ui/Select/styles';

const computeSelectStyles = (width) => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  return queryManagerSelectComponentStyle(darkMode, width);
};

export const allSources = {
  Tooljetdb: (props) => <DynamicForm schema={tooljetDbOperations} {...props} />,
  Restapi,
  Runjs,
  Runpy,
  Stripe,
  Openapi,
};

export const source = (props) => (
  <div className="query-editor-dynamic-form-container">
    <DynamicForm schema={props.pluginSchema} {...props} computeSelectStyles={computeSelectStyles} />
  </div>
);
