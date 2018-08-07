import { CircularProgress } from '@material-ui/core';
import DropdownMenu, { IOption } from 'components/Shared/DropdownMenu';
import ErrorMessageIcon from 'components/Shared/ErrorMessageIcon';
import React, { Fragment, PureComponent } from 'react';

export interface IStateListItem {
  loading: boolean;
  error?: any;
}

export default abstract class ListItemComponent<P = {}, S extends IStateListItem = IStateListItem> extends PureComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      loading: false,
      error: null
    } as Readonly<S>;
  }

  handleDismisError = () => {
    this.setState({ error: null });
  }

  renderSideMenu = (options: IOption[]) => {
    const { loading, error } = this.state;

    return (
      <Fragment>
        {loading && <CircularProgress color='secondary' size={20} />}
        {!loading && error &&
          <ErrorMessageIcon error={error} onDismiss={this.handleDismisError} />
        }
        {!loading && !error &&
          <DropdownMenu options={options} />
        }
      </Fragment>
    );
  }
}