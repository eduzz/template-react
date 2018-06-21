import { CircularProgress } from '@material-ui/core';
import DropdownMenu, { IOption } from 'components/DropdownMenu';
import ErrorMessageIcon from 'components/ErrorMessageIcon';
import React, { Fragment, PureComponent } from 'react';

export interface IListItemState {
  loading: boolean;
  error?: any;
}

export default abstract class ListItemComponent<P = {}, S extends IListItemState = IListItemState> extends PureComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      loading: false,
      error: null
    } as any;
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