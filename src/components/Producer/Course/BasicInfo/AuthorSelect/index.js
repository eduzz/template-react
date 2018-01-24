import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Select, { Option } from 'components/Select';
import Collapsible, { Header, Content } from 'components/Collapsible';
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

	render() {
		return (
            <div className={styles.component}>
                <Select floatlabel='Autores' value={this.props.selected.id}>
                    <Option key='' value=''>
                        Selecione um author...
                    </Option>
                    {this.props.authors.map((author, key) =>
                        <Option key={author.id} value={author.id}>
                            {author.name}
                        </Option>
                    )}
                </Select>
                <Collapsible className='add-author card-lessons'>
                    <Header className='header card-lessons-header'>
                        <span>Adicionar Author</span>
                    </Header>
                    <Content className='card-lessons-wrapper'>
                        <div>
                            <Input
                                onChange={e =>
                                    this.setState({newAuthorName: e.target.value})
                                }
                                floatlabel='Nome do Author'
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
