import CircularProgress from '@material-ui/core/CircularProgress';
import DropdownMenu, { IOption } from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
import ErrorMessageIcon from 'components/Shared/ErrorMessageIcon';
import React, { Fragment, PureComponent } from 'react';

export interface IStateListItem {
  loading: boolean;
  error?: any;
}

export default abstract class ListItemComponent<
  P = {},
  S extends IStateListItem = IStateListItem
> extends PureComponent<P, S> {
  styleProgress = { padding: 12 };

  constructor(props: P) {
    super(props);
    this.state = {
      loading: false,
      error: null
    } as Readonly<S>;
  }

  handleDismisError = () => {
    this.setState({ error: null });
  };

  renderSideMenu = (options: IOption[]) => {
    const { loading, error } = this.state;

    return (
      <Fragment>
        {loading && (
          <div style={this.styleProgress}>
            <CircularProgress color='secondary' size={20} />
          </div>
        )}
        {!loading && error && <ErrorMessageIcon error={error} onDismiss={this.handleDismisError} />}
        {!loading && !error && (
          <DropdownMenu>
            {options.map(o => (
              <OptionItem key={o.text} {...o} />
            ))}
          </DropdownMenu>
        )}
      </Fragment>
    );
  };
}
