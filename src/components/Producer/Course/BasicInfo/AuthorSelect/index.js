import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { SelectField, MenuItem } from 'material-ui';
import Input from 'components/Input';
import styles from './styles.css';

class AuthorSelect extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        this.props.getAuthors();
    }

    componentWillUnmount() {
        this.props.cleanAuthors();
    }

	render() {
		return (
            <div className={styles.component}>
                <div className='input-field'>
                    <SelectField
                        {...this.props}
                        floatingLabelText='Autores'
                        style={{width: '100%'}}
                    >
                        {this.props.authors.map(author =>
                            <MenuItem
                                key={author.id}
                                value={author.id}
                                primaryText={author.name}
                            />
                        )}
                    </SelectField>
                </div>

                <Card
                    className='card-lessons'
                >
                    <CardTitle
                        actAsExpander={true}
                        showExpandableButton={true}
                    >
                        <span style={{ display: 'flex', justifyContent: 'center' }}>Adicionar Author</span>
                    </CardTitle>
                    <CardText className='card-lessons-wrapper' expandable={true}>
                        <Input
                            onChange={e => {
                                this.setState({
                                    newAuthorName: e.target.value
                                });
                            }}
                            floatlabel='Nome do Author'
                        />
                        <a
                            onClick={() => {
                                this.props.addAuthor(this.state.newAuthorName);
                            }}
                            className='button affirmative waves-effect waves-light'
                        >
                            <span>Adicionar</span>
                        </a>
                    </CardText>
                </Card>
            </div>
		);
	}
}

const mapStateToProps = state => ({
    authors: state.authors,
});

const mapDispatchToProps = dispatch => ({
    getAuthors() {
        dispatch(actions.getAuthors());
    },
    cleanAuthors() {
        dispatch(actions.cleanAuthors());
    },
    addAuthor(name) {
        dispatch(actions.addAuthor(name));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSelect);
