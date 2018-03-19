import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cleanCourse, fetchCourse, updateCourse, createCourse, changeCourseField } from 'actionCreators/course';
import { cleanModules } from 'actionCreators/modules';
import Tabs, { Tab } from 'material-ui/Tabs';
import BasicInfo from './BasicInfo';
import Advanced from './Advanced';
import Personalization from './Personalization';
import Certificates from './Certificates';
import ModulesLessons from './ModulesLessons';
import FloatButton from './FloatButton';
import { Redirect } from 'react-router-dom';
import { FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import Loading from 'components/Loading';
import Icon from 'components/Icon';
import TextField from 'material-ui/TextField';

const styles = require('./styles.css');

function TabContainer(props: any) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

interface IProps {
  course: any;
  match: any;
  cleanCourse: any;
  fetchCourse: any;
  updateCourse: any;
  createCourse: any;
  changeCourseField: any;
  cleanModules: any;
}

interface IState {
  tabIndex: number;
}

class Course extends Component<IProps, IState> {
  private courseID: number | string;

  constructor(props: IProps) {
    super(props);

    this.state = {
      tabIndex: 0,
    };

    this.courseID = null;
  }

  componentWillUnmount() {
    this.props.cleanCourse();
    this.props.cleanModules();
  }

  componentDidMount() {
    if (this.courseID && this.courseID !== 'new') {
      this.props.fetchCourse(this.courseID);
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.props.course.id) {
      this.props.updateCourse(this.props.course);
    } else {
      this.props.createCourse(this.props.course);
    }
  }

  render() {
    this.courseID = this.props.match.params.courseID;

    if (this.props.course.isDeleted) {
      this.props.cleanCourse();
      return <Redirect to='/producer' />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <section className={styles.component}>
          <div className='container'>
            {this.courseID &&
              this.courseID !== 'new' && (
                <Loading
                  active={!this.props.course.id}
                  absolutePosition={true}
                />
              )}

            <div className='course-header row'>
              <div className='col s9'>
                <TextField
                  label='Nome do Curso/Programa'
                  className='bigger'
                  value={this.props.course.title}
                  onChange={(e: any) =>
                    this.props.changeCourseField('title', e.target.value)
                  }
                  fullWidth
                  required
                />
              </div>
              <div className='col s3'>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(this.props.course.published)}
                      onChange={() =>
                        this.props.changeCourseField(
                          'published',
                          !this.props.course.published
                        )
                      }
                    />
                  }
                  label='Publicado'
                />
              </div>
            </div>
            <Tabs
              value={this.state.tabIndex}
              onChange={(event: any, value: number) => this.setState({ tabIndex: value })}
              className='tab'
            >
              <Tab label='Informações Básicas' icon={<Icon name='package' />} />
              <Tab label='Módulos e Aulas' icon={<Icon name='paper' />} />
              <Tab label='Configurações Avançadas' icon={<Icon name='gears' />} />
              <Tab label='Personalizações' icon={<Icon name='color-pallete' />} />
              <Tab label='Certificados' icon={<Icon name='paper' />} />
            </Tabs>

            {this.state.tabIndex === 0 && <TabContainer> <BasicInfo courseID={this.courseID} /> </TabContainer>}
            {this.state.tabIndex === 1 && <TabContainer> <ModulesLessons courseID={this.courseID} /> </TabContainer>}
            {this.state.tabIndex === 2 && <TabContainer> <Advanced course={this.props.course} /> </TabContainer>}
            {this.state.tabIndex === 3 && <TabContainer> <Personalization /> </TabContainer>}
            {this.state.tabIndex === 4 && <TabContainer>  <Certificates /> </TabContainer>}

            <FloatButton />
          </div>
        </section>
      </form>
    );
  }
}

const mapStateToProps = (state: any) => ({
  course: state.course
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ cleanCourse, fetchCourse, updateCourse, createCourse, changeCourseField, cleanModules }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
