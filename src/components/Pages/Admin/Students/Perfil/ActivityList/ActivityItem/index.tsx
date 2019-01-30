import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/esm/format';
import { IStudentActivity } from 'interfaces/models/student';
import React, { PureComponent } from 'react';

interface IProps {
  activity: IStudentActivity;
}

export default class CourseItem extends PureComponent<IProps> {
  render() {
    const { activity } = this.props;

    return (
      <TableRow>
        <TableCell>
          {format(activity.date, 'dd/MM/YYYY')} - {format(activity.date, 'HH:mm')}
        </TableCell>
        <TableCell>
          <Typography variant='subtitle2' color='inherit'>{activity.data.message}</Typography>
        </TableCell>
      </TableRow>
    );
  }
}