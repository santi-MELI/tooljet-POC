import React from 'react';
import DynamicForm from '@/_components/DynamicForm';
import RunjsSchema from './Runjs.schema.json';
import TooljetDbSchema from '../../QueryManager/QueryEditors/TooljetDatabase/manifest.json';
import RunpySchema from './Runpy.schema.json';

export const DataBaseSources = [];
export const ApiSources = [];
export const CloudStorageSources = [];
export const OtherSources = [RunjsSchema.source, RunpySchema.source, TooljetDbSchema.source];
export const DataSourceTypes = [...DataBaseSources, ...ApiSources, ...CloudStorageSources, ...OtherSources];

export const SourceComponents = [];

export const SourceComponent = (props) => <DynamicForm schema={props.dataSourceSchema} {...props} />;
