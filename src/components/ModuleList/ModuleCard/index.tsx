import React, { Component } from 'react';
import Card, { CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import LessonCardList from './LessonCardList';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Options from './Options';

const styles = require('./styles.css');

interface IProps {
  title: string;
  onExpandChange: any;
  onCancel: any;
  id: any;
  onEdit: any;
  onSave: any;
  onDelete: any;
  lessons: Array<any>;
  editable?: boolean;
  courseID: string | number;
  type: string;
  totalLessons: any;
}

interface IState {
  isEditing: boolean;
  title: string;
  isExpanded: boolean;
}

class ModuleCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isEditing: false,
      title: '',
      isExpanded: false,
    };
  }

  componentWillMount() {
    this.setState({
      isEditing: !this.props.title,
      title: this.props.title
    });
  }

  handleTitleChange = (e: any) => {
    this.setState({
      title: e.target.value
    });
  }

  handleCancel = () => {
    this.setState({
      isEditing: false
    });

    this.props.onCancel();
  }

  handleSave = () => {
    this.setState({
      isEditing: false
    });

    if (this.props.id) {
      this.props.onEdit(this.state.title);
    } else {
      this.props.onSave(this.state.title);
    }
  }

  handleEdit = () => {
    this.setState({
      isEditing: true
    });
  }

  handleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });

    this.props.onExpandChange(!this.state.isExpanded);
  }

  render() {
    return (
      <div className={styles.component}>
        <Card
          className='card-lessons'
        >
          <CardActions>
            <div className='card-actions-form'>
              {this.state.isEditing ? (
                <div className='row'>
                  <div className='col s9'>
                    <TextField
                      label='Nome do módulo'
                      autoFocus
                      onChange={this.handleTitleChange}
                      value={this.state.title}
                      fullWidth
                    />
                  </div>
                  <div className='col s3 actions'>
                    <a
                      onClick={this.handleCancel}
                      style={{ cursor: 'pointer' }}
                    >
                      Cancelar
                    </a>
                    <a
                      onClick={this.handleSave}
                      style={{ cursor: 'pointer' }}
                    >
                      Salvar
                    </a>
                  </div>
                </div>
              ) : (
                  <span>
                    {this.state.title}
                  </span>
                )}
              {this.props.type !== 'simple' &&
                <div className='card-lessons-resume'>
                  {this.props.totalLessons <= 0 && <span>Nenhuma aula</span>}
                  {this.props.totalLessons === 1 && <span>1 Aula</span>}
                  {this.props.totalLessons > 1 && <span>{this.props.totalLessons} Aulas</span>}
                </div>
              }
            </div>

            {this.props.editable && !this.state.isEditing &&
              <Options
                onEdit={this.handleEdit}
                onDelete={this.props.onDelete}
              />
            }

            <IconButton
              onClick={this.handleExpand}
              className={`expand-icon ${this.state.isExpanded && 'expanded'}`}
              aria-expanded={this.state.isExpanded}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.isExpanded} timeout='auto' unmountOnExit>
            <LessonCardList type={this.props.type} courseID={this.props.courseID} editable={this.props.editable} lessons={this.props.lessons || []} />
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default ModuleCard;