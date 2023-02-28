import React from 'react';
import SelectSearch from 'react-select-search';


export const CustomSelect = ({ options, value, multiple, onChange, darkMode, isEditable }) => {
  const t = (_v, d) => d;

  function renderValue(valueProps) {
    if (!isEditable) {
      const stringifyValue = String(valueProps.value);
      const arrayOfValueProps = stringifyValue.includes(',') ? stringifyValue.split(', ') : stringifyValue.split(' ');
      return arrayOfValueProps.map((value, index) => (
        <span key={index} className="badge bg-blue-lt p-2 mx-1">
          {value}
        </span>
      ));
    }
    if (valueProps) {
      const stringifyValue = String(valueProps.value);
      const arrayOfValueProps = stringifyValue.includes(',') ? stringifyValue.split(', ') : stringifyValue.split(' ');
      return arrayOfValueProps.map((value, index) => (
        <span key={index} {...valueProps} className="badge bg-blue-lt p-2 mx-1">
          {value}
        </span>
      ));
    }
  }

  return (
    <div className="custom-select">
      <SelectSearch
        options={options}
        printOptions="on-focus"
        value={value}
        renderValue={renderValue}
        search={false}
        onChange={onChange}
        multiple={multiple}
        placeholder={t('globals.select', 'Select') + '...'}
        className={`${darkMode ? 'select-search-dark' : 'select-search'}`}
      />
    </div>
  );
};