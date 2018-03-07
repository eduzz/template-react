import React from 'react';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';
import Icon from 'components/Icon';
import styles from './styles.css';

class ButtonExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1'
    }
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${
            this.state.color.b
          }, ${this.state.color.a})`
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer'
        },
        popover: {
          position: 'absolute',
          zIndex: '2'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });

    return (
      <div>
        <div
          className="input-color"
          style={styles.swatch}
          onClick={this.handleClick}
        >
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <ChromePicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const CoursePersonalization = ({ data }) => (
  <div className={styles.component}>
    <div className="form-section">
      <h3 className="form-section-title">Personalizações</h3>
      <div className="row">
        <div className="s12 m4 col">
          <div className="form-block">
            <h3 className="form-block-title">Card do Curso</h3>
            <p className="input-description">
              Essa foto será utilizada na miniatura do curso que aparecerá nas
              telas principais de acesso
            </p>
            <label className="input-label">Tamanho sugerido: 170x220</label>
            <a className="input-img card-img">
              <Icon name="paper" />
              <span>Alterar Logo</span>
            </a>
          </div>
        </div>
        <div className="s12 m4 col">
          <div className="form-block">
            <h3 className="form-block-title">Logo do Cabeçalho</h3>
            <p className="input-description">
              Esse logo aparecerá no cabeçalho do curso:
            </p>
            <label className="input-label">Tamanho sugerido: 220x60</label>
            <a className="input-img header-logo horizontal">
              <Icon name="paper" />
              <span>Alterar Logo</span>
            </a>
          </div>
        </div>

        <div className="s12 m4 col">
          <div className="form-block">
            <h3 className="form-block-title">Cor Primária</h3>
            <p className="input-description">
              Essa cor será utilizada em grande parte do elementos visuais do
              curso
            </p>
            <ButtonExample />
          </div>

          <div className="form-block">
            <h3 className="form-block-title">Cor Destaque</h3>
            <p className="input-description">
              Personalize a cor de ação, ela será utilizada em botões e links,
              elementos que chamam atenção do aluno
            </p>
            <ButtonExample />
          </div>
        </div>
      </div>
    </div>
    <div className="form-section">
      <div className="row">
        <div className="s12 m12 col">
          <h3 className="form-section-title">Personalizações de Login</h3>
        </div>
        <div className="s12 m4 col">
          <div className="form-block">
            <h3 className="form-block-title">Logo do Formulário</h3>
            <p className="input-description">
              Essa imagem será utilizada no topo do formulario
            </p>
            <label className="input-label">Tamanho sugerido: 170x170</label>
            <a className="input-img login-logo">
              <Icon name="paper" />
              <span>Alterar Logo</span>
            </a>
          </div>
        </div>

        <div className="s12 m4 col">
          <div className="form-block">
            <h3 className="form-block-title">Cor do Plano de Fundo</h3>
            <p className="input-description">
              Essa cor será utilizada no fundo da tela de login. Caso utilize
              uma imagem, a imagem irá sobrepor a cor
            </p>
            <ButtonExample />
          </div>
        </div>

        <div className="s12 m4 col">
          <div className="form-block">
            <h3 className="form-block-title">Imagem de Fundo</h3>
            <p className="input-description">
              Personalize o plano de fundo da tela de login, procure utilzar
              fotos de boa qualidade
            </p>
            <label className="input-label">Tamanho sugerido: 1920x1080</label>
            <a className="input-img header-logo ">
              <Icon name="paper" />
              <span>Alterar Logo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CoursePersonalization;
