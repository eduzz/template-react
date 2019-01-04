import { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import authService from 'services/auth';

import Toast from '../Toast';

interface IProps {
  passIfNull?: boolean;
  inverse?: boolean;
}

interface IState {
  canAccess: boolean;
  verified?: boolean;
}

export default class PermissionHide extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { canAccess: false, verified: false };
  }

  componentDidMount() {
    authService.canAccess().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(canAccess => {
      this.setState({ canAccess, verified: true });
    }, err => Toast.error(err));
  }

  render() {
    const { canAccess, verified } = this.state;
    const { inverse } = this.props;

    if (!verified) {
      return null;
    }

    if (inverse && !canAccess) {
      return this.props.children;
    }

    if (inverse || !canAccess) {
      return null;
    }

    return this.props.children;
  }
}