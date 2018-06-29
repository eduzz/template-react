import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Toolbar from 'components/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { FieldCheckbox } from 'material-ui-form-fields';
import FieldText from 'material-ui-form-fields/components/Text';
import ValidationContext from 'material-ui-form-fields/components/ValidationContext';
import React, { FormEvent, Fragment } from 'react';

interface IState extends IStateForm<{
  title: string;
  courses: Array<{ title: string, image: string, category: string, id: number, selected?: boolean }>
}> {
  selected: number[];
}

interface IProps {
  classes?: any;
  newSelected: any;
}

@WithStyles(theme => ({
  packageTitle: {
    marginBottom: theme.spacing.unit * 3,
  },
  coursesTable: {
    marginBottom: theme.spacing.unit * 3,
  },
  courseItem: {
    borderBottom: '1px solid #cecece',
    padding: theme.spacing.unit,
    ['&:hover']: {
      backgroundColor: '#dedede',
    }
  },
  courseImage: {
    width: 50,
    height: 50,
    objectFit: 'cover',
  },
  tableLabel: {
    fontSize: theme.typography.fontSize * 1.2,
    fontWeight: 'bold',
  },
  courseCheckCell: {
    width: 50,
  },
  courseImageCell: {
    width: 80,
  },
  courseCodCell: {
    width: 50,
  }
}))

export default class PackageNewPage extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      selected: [],
      model: {
        ...this.state.model,
        courses: [{
          id: 12322,
          title: 'Aprenda a operar na bolsa de valores',
          image: '//app.nutror.com/file/Uploads/60610/aprenda_bolsa_identificacao.png',
          category: 'Contabilidade e Economia',
        },
        {
          id: 23423,
          title: 'Academia 360 Estudo de caso Aprenda Piano',
          image: '//app.nutror.com/file/Uploads/8460/estudos-de-caso/200x200_aprenda_piano.jpg',
          category: 'Marketing Digital',

        },
        {
          id: 33244,
          title: 'Academia 360 Estudo de caso ATOM SA',
          image: '//app.nutror.com/file/Uploads/8460/estudos-de-caso/200x200_ATOM_SA.jpg',
          category: 'Marketing Digital',
        },
        {
          id: 42367,
          title: 'Guitar Tracks by Ozielzinho',
          image: '//app.nutror.com/file/Uploads/990/GuitarTracks/IdentificaoDoCurso.jpg',
          category: 'Musica',
        }]
      }
    };
  }

  onSubmit = (event: FormEvent<any>) => {
    event.preventDefault();

    if (!this.isFormValid()) return;

    //save
  }

  handleClick = (courseId: number) => {
    let { selected } = this.state;

    console.log(courseId);

    if (selected.some(id => id === courseId)) {
      selected = selected.filter(id => id === courseId);
    } else {
      selected.push(courseId);
    }

    this.setState({ selected });
  }

  render() {
    const { model } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Novo Pacote' />
        <form onSubmit={this.onSubmit} noValidate>
          <ValidationContext ref={this.bindValidationContext.bind(this)}>
            <FieldText
              label='Titulo do Pacote'
              value={model.title}
              validation='required|min:3'
              onChange={this.updateModel((m, v) => m.title = v)}
              className={classes.packageTitle}
            />
            <Typography className={classes.tableLabel}>Selecione os cursos:</Typography>
            <Card>
              <Table className={classes.coursesTable}>
                <TableHead>
                  <TableRow className={classes.courseItem}>
                    <TableCell className={classes.courseCheckCell}></TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Código</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell className={classes.courseTitleCell}>Nome do Curso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(model.courses || []).map(course =>
                    <TableRow onClick={this.updateModel(() => course.selected = !course.selected)} key={course.id}>
                      <TableCell className={classes.courseCheckCell}>
                        <FieldCheckbox
                          label={null}
                          value={null}
                          checked={course.selected}
                          onChange={this.updateModel((m, v) => course.selected = v)}
                        />
                      </TableCell>
                      <TableCell className={classes.courseImageCell}><img className={classes.courseImage} src={course.image} /></TableCell>
                      <TableCell className={classes.courseCodCell}>{course.id}</TableCell>
                      <TableCell className={classes.courseCategoryCell}>{course.category}</TableCell>
                      <TableCell className={classes.courseTitleCell}>{course.title}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
            <Button color='secondary' variant='raised'>Salvar</Button>
          </ValidationContext>
        </form>
      </Fragment >
    );

  }
}