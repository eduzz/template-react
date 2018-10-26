import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@react-form-fields/material-ui/components/Select';
import { IForm } from '../../..';
import Avatar from '@material-ui/core/Avatar';
import { CDN_URL } from 'settings';
import authorService from 'services/author';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  classes?: any;
  form: IForm;
}

interface IState {
  authors: any;
  error: any;
  orderBy: string;
  orderDirection: string;
}

@WithStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  content: {
    marginTop: 8,
    display: 'flex',
  },
  select: {
    width: 300,
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    marginRight: 16,
  },
  menuItemContent: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
  },
  menuItemLabel: {
    cursor: 'pointer',
  },
  progressContainer: {
    paddingTop: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorLabel: {
    color: '#f44336',
  },
}))
export default class Author extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      authors: [],
      error: null,
      orderBy: 'title',
      orderDirection: 'asc'
    };
  }

  componentDidMount() {
    const { orderBy, orderDirection } = this.state;

    this.setState({
      error: null,
    });

    authorService.getAuthors(orderBy, orderDirection).pipe(
      rxjsOperators.logError(),
      rxjsOperators.loader(),
      rxjsOperators.bindComponent(this),
    ).subscribe((authors: any) => {
      this.setState({ authors });
    }, (error: any) => this.setState({ error }));
  }

  render() {
    const { classes, form } = this.props;
    const { authors, error } = this.state;

    return (
      <FormControl fullWidth>
        <label className={classes.title}>
          Autor
        </label>
        <Grid container className={classes.content}>
          <Grid xs={12} item>
            <div className={classes.selectContainer}>
              <Select
                className={classes.select}
                value={form.model.author.id}
                onChange={form.updateModel((model, v) => model.author = { ...model.author, id: v })}
                validation='required'
              >
                <MenuItem value=''>
                  <div className={classes.menuItemContent}>
                    <Avatar alt='' className={classes.avatar}>A</Avatar>
                    <label className={classes.menuItemLabel}>Selecione um autor</label>
                  </div>
                </MenuItem>
                {authors.map((author: any, index: number) =>
                  <MenuItem
                    key={index}
                    value={author.id}
                  >
                    <div className={classes.menuItemContent}>
                      {author.avatar ?
                        <Avatar alt='' src={CDN_URL + author.avatar} className={classes.avatar} />
                        :
                        <Avatar alt='' className={classes.avatar}>{author.name.substring(0, 1).toUpperCase()}</Avatar>
                      }
                      <label className={classes.menuItemLabel}>{author.name}</label>
                    </div>
                  </MenuItem>
                )}
                {error &&
                  <MenuItem className={classes.errorContainer}>
                    <label className={classes.errorLabel}>
                      Ops... Algo errado não está certo ;(
                    </label>
                  </MenuItem>
                }
              </Select>
            </div>
          </Grid>
        </Grid>
      </FormControl>
    );
  }
}