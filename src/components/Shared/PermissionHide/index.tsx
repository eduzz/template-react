import { enRoles } from 'interfaces/models/user';
import { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import authService from 'services/auth';

import Toast from '../Toast';

interface IProps {
  passIfNull?: boolean;
  role?: enRoles | enRoles[];
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
    const { role } = this.props;
    const roles = Array.isArray(role) ? role : role ? [role] : [];

    authService
      .canAccess(...roles)
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(
        canAccess => {
          this.setState({ canAccess, verified: true });
        },
        err => Toast.error(err)
      );
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
