import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import type ReactAutosuggest from 'react-autosuggest';

interface AutocompleteProps extends ReactAutosuggest.InputProps {
  options: string[];
}

export default function Autocomplete({
  options,
  value,
  ...props
}: AutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();

    if (value.length === 0) {
      return [];
    }

    return options.filter((val) => val.toLowerCase().includes(inputValue));
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={() => setSuggestions(getSuggestions(value))}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      inputProps={{ value, ...props }}
    />
  );
}
