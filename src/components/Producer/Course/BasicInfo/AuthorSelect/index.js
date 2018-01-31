import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Select, { Option } from 'components/Select';
import Collapsible, { Header, Content } from 'components/Collapsible'; // FIXME
import { SelectField, MenuItem, TextField } from 'material-ui';
import styles from './styles.css';

class AuthorSelect extends Component {
    constructor() {
        super();

        this.state = {};
    }

	componentDidMount() {
        this.props.getAuthors();
	}

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected.id) {
            this.setState({
                value: nextProps.selected.id,
            });
        }
    }

    handleChange = (event, index, value) => {
        this.setState({
            value,
        });
    }

	render() {
		return (
            <div className={styles.component}>
                <div className='input-field'>
                    <SelectField
                        floatingLabelText='Autores'
                        defaultValue={this.props.selected.id}
                        value={this.state.value}
                        onChange={this.handleChange}
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

                {/* FIXME */}

                <Collapsible className='add-author card-lessons'>
                    <Header className='header card-lessons-header'>
                        <span>Adicionar Author</span>
                    </Header>
                    <Content className='card-lessons-wrapper'>
                        <div>
                            <TextField
                                onChange={e =>
                                    this.setState({newAuthorName: e.target.value})
                                }
                                floatingLabelText='Nome do Author'
                            />
                            <a
                                onClick={() =>
                                    this.props.addAuthor(this.state.newAuthorName)
                                }
                                className='button affirmative waves-effect waves-light'
                            >
                                <span>Adicionar</span>
                            </a>
                        </div>
                    </Content>
                </Collapsible>
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
    addAuthor(name) {
        dispatch(actions.addAuthor(name));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSelect);
