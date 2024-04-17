import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

interface AutocompleteProps extends React.HTMLAttributes<HTMLInputElement> {
  options: string[];
  value: string;
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
      onSuggestionsFetchRequested={() =>
        setSuggestions(getSuggestions(props.value))
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      inputProps={{ value, ...props }}
    />
  );
}
