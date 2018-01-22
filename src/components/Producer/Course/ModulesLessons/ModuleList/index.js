import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
// import Collapsible, { Header, Content } from 'components/Collapsible';
import LessonCardList from './LessonCardList';
import { Button } from 'components/Modal';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class ModuleList extends Component {
    componentDidMount() {
        this.props.getModules(this.props.courseID);
    }

    render() {
        return (
            <div>
                {this.props.modules.map((module, key) =>
                    <Card
                        key={module.id}
                        onExpandChange={() => this.props.getModuleLessons(module.id, module.lessons || [])}
                    >
                        <CardHeader
                            title={module.title}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            {/* <Button className='button affirmative waves-effect waves-light' target='modal-module-edit'>
                                <span>Editar Módulo</span>
                            </Button>

                            <Button className='button affirmative waves-effect waves-light' target='modal-lesson-edit'>
                                <span>Nova Aula</span>
                            </Button>

                            <Button className='button affirmative waves-effect waves-light' target='modal-lesson-import'>
                                <span>Importar Aulas</span>
                            </Button> */}

                            <LessonCardList lessons={ module.lessons || [] } />
                        </CardText>
                    </Card>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modules: state.modules,
});

const mapDispatchToProps = dispatch => ({
    getModules(courseID) {
        dispatch(actions.getModules(courseID));
    },
    getModuleLessons(moduleID, lessons) {
        if(!lessons.length) {
            dispatch(actions.getModuleLessons(moduleID));
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
