import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Input from 'components/Input';
import LessonCardList from './LessonCardList';
import { IconMenu, IconButton, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import styles from './styles.css';

class ModuleCard extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillMount() {
        this.setState({
            isEditing: !this.props.title,
            title: this.props.title,
        });
    }

    render() {
        return (
            <div className={styles.component}>
                <Card
                    onExpandChange={this.props.onExpandChange}
                    className='card-lessons'
                >
                    <CardTitle
                        actAsExpander={false}
                        showExpandableButton={true}
                    >
                        <div>
                            {
                                this.state.isEditing ?
                                    <div className='row'>
                                        <div className='col s6'>
                                            <Input
                                                floatlabel='Nome do módulo'
                                                autoFocus
                                                onChange={(e) => {
                                                    this.setState({
                                                        title: e.target.value,
                                                    });
                                                }}
                                                defaultValue={this.state.title}
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </div>
                                        <div className='col s6 actions'>
                                            <a
                                                onClick={() => {
                                                    this.setState({
                                                        isEditing: false,
                                                    });
                                                    this.props.onCancel();
                                                }}
                                                style={{cursor: 'pointer'}}
                                            >
                                                Cancelar
                                            </a>
                                            <a
                                                onClick={() => {
                                                    this.setState({
                                                        isEditing: false,
                                                    });

                                                    if(this.props.newModule) {
                                                        this.props.onEdit(this.state.title);
                                                    } else {
                                                        this.props.onSave(this.state.title);
                                                    }
                                                }}
                                                style={{cursor: 'pointer'}}
                                            >
                                                Salvar
                                            </a>
                                        </div>
                                    </div>
                                :
                                    <span>
                                        {this.state.title}
                                        <IconMenu
                                          iconButtonElement={
                                              <IconButton>
                                                  <MoreVertIcon />
                                              </IconButton>
                                          }
                                          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                          targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        >
                                            <MenuItem
                                                primaryText="Editar"
                                                onClick={() => {
                                                    this.setState({
                                                        isEditing: true,
                                                    });
                                                }}
                                            />
                                            <MenuItem
                                                primaryText="Excluir"
                                                onClick={this.props.onDelete}
                                            />
                                        </IconMenu>
                                    </span>
                            }
                            <div className='card-lessons-resume'>
                                <span>Duração Total: 12Hrs</span>
                                <span>12 Aulas</span>
                            </div>
                        </div>
                    </CardTitle>
                    <CardText className='card-lessons-wrapper' expandable={true}>
                        <LessonCardList lessons={ this.props.lessons || [] } />
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default ModuleCard;
