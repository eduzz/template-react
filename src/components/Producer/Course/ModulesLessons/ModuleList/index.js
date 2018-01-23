import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import LessonCardList from './LessonCardList';
import { Button } from 'components/Modal';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Loading from 'components/Loading';

class ModuleList extends Component {
    componentDidMount() {
        this.props.getModules(this.props.courseID);
    }

    render() {
        return (
            <div>
                <Loading data={this.props.modules} />

                {this.props.modules.map((module, key) =>
                    <Card
                        key={module.id}
                        onExpandChange={() => this.props.getModuleLessons(module.id, module.lessons || [])}
                        className='card-lessons'
                    >
                        <CardHeader
                            title={module.title}
                            subtitle={
                                <div className='card-lessons-resume'>
                    				<span>Duração do curso</span>
                    				<span>Número de Aulas</span>
                    			</div>
                            }
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText className='card-lessons-wrapper' expandable={true}>
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
