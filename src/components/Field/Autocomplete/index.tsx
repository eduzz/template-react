import { IconButton, InputAdornment } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { WithStyles } from 'decorators/withStyles';
import CloseIcon from 'mdi-react/CloseIcon';
import React from 'react';
import Autosuggest, {
  ChangeEvent,
  RenderSuggestionParams,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';

import Input from './Input';
import SuggestionsContainer from './SuggestionsContainer';

interface IState {
  term: string;
  suggestions: IProps['options'][0][];
}

interface IProps {
  label?: string;
  placeholder?: string;
  classes?: any;
  value: any;
  error?: string;
  submitted?: boolean;
  disabled?: boolean;
  options: { value: any, label: string }[];
  onChange: (value: any) => void;
}

@WithStyles(theme => ({
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 50
  },
  suggestionsContainerOpenWithLabel: {
    top: 65
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  adornment: {
    marginRight: -15
  }
}))
export default class IntegrationAutosuggest extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { term: '', suggestions: [] };
  }

  static getDerivedStateFromProps({ options, value }: IProps, currentState: IState) {
    const term: string = (options.find(o => o.value === value) || { label: null }).label;
    return { ...currentState, term };
  }

  getSuggestionValue(suggestion: IProps['options'][0]) {
    return suggestion.label;
  }

  handleChange(event: React.FormEvent<any>, params?: ChangeEvent) {
    this.setState({ term: params.newValue });
  }

  handleBlur() {
    const { value, options } = this.props;
    const term: string = (options.find(o => o.value === value) || { label: null }).label;

    this.setState({ term });
  }

  handleSelected(event: React.FormEvent<any>, data: SuggestionSelectedEventData<IProps['options'][0]>) {
    this.props.onChange(data.suggestion.value);
  }

  handleSuggestionsFetchRequested({ value }: SuggestionsFetchRequestedParams) {
    const suggestions = this.props.options
      .filter(o => o.label.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);

    this.setState({ suggestions });
  }

  handleSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  handleClearValue() {
    this.props.onChange(null);
  }

  render() {
    const { term, suggestions } = this.state;
    const { classes, placeholder, disabled, label } = this.props;

    return (
      <Autosuggest
        suggestions={suggestions}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: `${classes.suggestionsContainerOpen} ${label ? classes.suggestionsContainerOpenWithLabel : ''}`,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={Input}
        renderSuggestionsContainer={SuggestionsContainer}
        shouldRenderSuggestions={() => true}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.getSuggestionValue.bind(this)}
        renderSuggestion={this.renderSuggestion.bind(this)}
        onSuggestionSelected={this.handleSelected.bind(this)}
        inputProps={{
          ...this.props,
          classes,
          placeholder: placeholder || 'Pesquisar...',
          value: term || '',
          onBlur: this.handleBlur.bind(this),
          onChange: this.handleChange.bind(this),
          endAdornment: (!term ? null :
            <InputAdornment position='end' onClick={this.handleClearValue.bind(this)}>
              <IconButton disabled={disabled} className={classes.adornment}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }

  renderSuggestion(suggestion: IProps['options'][0], { query, isHighlighted }: RenderSuggestionParams) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component='div'>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
                <strong key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              );
          })}
        </div>
      </MenuItem>
    );
  }
}