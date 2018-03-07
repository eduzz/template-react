import React, { Component } from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';
class Upsells extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.active = this.active.bind(this);
  }
  active() {
    this.setState({ opened: !this.state.opened });
  }
  render() {
    return (
      <section className={styles.component}>
        <div className="container">
          <section className="upsells-grid">
            <div className="item">
              <div className="image">
                <img
                  src="http://www.revistacobertura.com.br/site-2017/wp-content/uploads/2017/05/curso-1.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <div>
                  <h3 className="title">
                    Titulo do Upsell com texto longo pra ver se quebra
                  </h3>
                  <p>5 Conexões</p>
                </div>
                <button className="settings" onClick={this.active}>
                  <Icon name="tree-dots" />
                </button>
              </div>
              <div className={this.state.opened ? 'actions active' : 'actions'}>
                <button>
                  <Icon name="edit" />
                  <span>Editar</span>
                </button>
                <button>
                  <Icon name="clone" />
                  <span>Clonar</span>
                </button>
                <button>
                  <Icon name="delete" />
                  <span>Deletar</span>
                </button>
              </div>
            </div>

            <div className="item">
              <div className="image">
                <img
                  src="http://valor-digital.com/EDER/wp-content/uploads/2017/07/Slide4.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <div>
                  <h3 className="title">
                    Titulo do Upsell com texto longo pra ver se quebra
                  </h3>
                  <p>5 Conexões</p>
                </div>
                <button className="settings" onClick={this.active}>
                  <Icon name="tree-dots" />
                </button>
              </div>
              <div className={this.state.opened ? 'actions active' : 'actions'}>
                <button>
                  <Icon name="edit" />
                  <span>Editar</span>
                </button>
                <button>
                  <Icon name="clone" />
                  <span>Clonar</span>
                </button>
                <button>
                  <Icon name="delete" />
                  <span>Deletar</span>
                </button>
              </div>
            </div>
            <div className="item">
              <div className="image">
                <img
                  src="http://1.bp.blogspot.com/-znv7SvN2oAI/Vo0kNKT7wsI/AAAAAAAAAYw/CL0Kxd9ZNng/s640/Publicidade%2Be%2BPropaganda%2BFortaleza.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <div>
                  <h3 className="title">
                    Titulo do Upsell com texto longo pra ver se quebra
                  </h3>
                  <p>5 Conexões</p>
                </div>
                <button className="settings" onClick={this.active}>
                  <Icon name="tree-dots" />
                </button>
              </div>
              <div className={this.state.opened ? 'actions active' : 'actions'}>
                <button>
                  <Icon name="edit" />
                  <span>Editar</span>
                </button>
                <button>
                  <Icon name="clone" />
                  <span>Clonar</span>
                </button>
                <button>
                  <Icon name="delete" />
                  <span>Deletar</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default Upsells;
