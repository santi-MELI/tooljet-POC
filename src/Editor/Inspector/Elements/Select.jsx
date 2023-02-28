import React from 'react';
import { ToolTip } from './Components/ToolTip';
import SelectSearch, { fuzzySearch } from 'react-select-search';


export const Select = ({ param, definition, onChange, paramType, componentMeta }) => {
  const paramMeta = componentMeta[paramType][param.name];
  const displayName = paramMeta.displayName || param.name;
  const options = paramMeta.options;
  const value = definition ? definition.value : '';
  const t = (_v, d) => d;

  return (
    <div className="field mb-3">
      <ToolTip label={displayName} meta={paramMeta} />
      <SelectSearch
        options={options}
        value={value}
        search={true}
        onChange={(newVal) => onChange(param, 'value', newVal, paramType)}
        filterOptions={fuzzySearch}
        placeholder={t('globals.select', 'Select') + '...'}
      />
    </div>
  );
};
