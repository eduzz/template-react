import { CircularProgress, TableCell, TableRow } from '@material-ui/core';
import Alert from 'components/Alert';
import DropdownMenu from 'components/DropdownMenu';
import ErrorMessageIcon from 'components/ErrorMessageIcon';
import AppRouter, { RouterContext } from 'components/Router';
import { ICourse } from 'interfaces/course';
import { DeleteIcon, EditIcon } from 'mdi-react';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { cleanCourseDeleteError, requestCourseDelete } from 'store/actionCreators/course';

interface IProps {
  course: ICourse;
}

interface IPropsFromConnect {
  requestCourseDelete?: typeof requestCourseDelete;
  cleanCourseDeleteError?: typeof cleanCourseDeleteError;
}

class ListItem extends React.PureComponent<IProps & IPropsFromConnect> {
  getRouter: () => AppRouter;

  edit() {
    const { course } = this.props;
    this.getRouter().navigate(`/course/${course.id}/edit`);
  }

  async delete() {
    const { course } = this.props;

    const ok = await Alert.confirm(`Deseja excluir o curso ${course.title}?`);
    if (!ok) return;

    this.props.requestCourseDelete(course);
  }

  render(): JSX.Element {
    const { course, cleanCourseDeleteError } = this.props;

    return (
      <Fragment>
        <RouterContext.Consumer>
          {getRouter => (this.getRouter = getRouter) && null}
        </RouterContext.Consumer>

        <TableRow>
          <TableCell>{course.title}</TableCell>
          <TableCell>{course.category.name}</TableCell>
          <TableCell>
            {course.isFetching && <CircularProgress color='secondary' size={20} />}
            {!course.isFetching && course.error &&
              <ErrorMessageIcon error={course.error} onDismiss={() => cleanCourseDeleteError(course)} />
            }
            {!course.isFetching && !course.error &&
              <DropdownMenu options={[{
                text: 'Editar',
                icon: EditIcon,
                handler: () => this.edit()
              }, {
                text: 'Excluir',
                icon: DeleteIcon,
                handler: () => this.delete()
              }]} />
            }
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: IProps) => {
  return {};
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  requestCourseDelete,
  cleanCourseDeleteError
})(ListItem);