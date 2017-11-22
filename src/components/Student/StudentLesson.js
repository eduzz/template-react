import React, { Component } from 'react';
import { Collapsible, Header, Content } from 'components/Collapsible';
import Icon from 'components/Icon';


class StudentLesson extends Component {
	constructor() {
		super();

		this.state = {
			isHidden: false,
		};
	}

	render() {
		return (
			<section className="lesson-page template-black">
				<aside className={`side-nav course-nav ${this.state.isHidden ? 'hidden' : ''}`}>
					<div className="container">
						<div className="course-block course-data" onClick={ () => this.setState({
								isHidden: !this.state.isHidden,
							})}>
							<a className="toggle-nav" onClick={ () => this.setState({
								isHidden: !this.state.isHidden,
							})}>
								<div>
									<span></span>
									<span></span>
								</div>
							</a>
							<label className="course-category">Marketing e Vendas</label>
							<h2 className="course-title">Primeira Venda</h2>
							<div className="course-progress">
		                      <label>Progresso: 20%</label>
		                      <div className="progress-bar">
		                        <span style={{'width':'40%'}}></span>
		                      </div>
		                    </div>
						</div>
						<div className="course-block course-actions">
							<a className="button">
										<Icon name='home' />
								<span>Inicio</span>
							</a>
							<a className="button">
										<Icon name='video' />
								<span>Tela do Curso</span>
							</a>
						</div>

						<div className="modules-block">
							<Collapsible className='card-lessons'>
				        		<Header className='card-lessons-header'>
				        			<h3 className='card-lessons-title'>Modulo 01</h3>

				        		</Header>

				        		<Content className='card-lessons-wrapper'>
				                    <a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo</h3>
											<Icon name='play' />
										</div>
									</a>
				        		</Content>
			        		</Collapsible>
			        		<Collapsible className='card-lessons'>
				        		<Header className='card-lessons-header'>
				        			<h3 className='card-lessons-title'>Modulo 02</h3>

				        		</Header>

				        		<Content className='card-lessons-wrapper'>
				                    <a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo de como domar um dragao from hell</h3>
											<Icon name='replay' />
										</div>
									</a>
									<a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo</h3>
											<Icon name='play' />
										</div>
									</a>
									<a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo</h3>
											<Icon name='play' />
										</div>
									</a>
									<a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo</h3>
											<Icon name='play' />
										</div>
									</a>
				        		</Content>
			        		</Collapsible>
							<Collapsible className='card-lessons'>
				        		<Header className='card-lessons-header'>
				        			<h3 className='card-lessons-title'>Modulo 02</h3>

				        		</Header>

				        		<Content className='card-lessons-wrapper'>
				                    <a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo de como domar um dragao from hell</h3>
											<Icon name='replay' />
										</div>
									</a>
									<a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo</h3>
											<Icon name='play' />
										</div>
									</a>
									<a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo</h3>
											<Icon name='play' />
										</div>
									</a>
									<a className='card-lesson-block'>
										<div className='card-lesson-content'>
											<h3 className="lesson-title">Aula interna do modulo</h3>
											<Icon name='play' />
										</div>
									</a>
				        		</Content>
			        		</Collapsible>
						</div>
					</div>
				</aside>
				<article className={`lesson-container ${this.state.isHidden ? 'hidden' : ''}`}>
					<header className="lesson-header">
						<a className="button">
							<Icon name='home' />
							<span>Anterior</span>
						</a>
						<h1 className="lesson-title">Como ordenhar filhotes de ornitorrinco</h1>
						<a className="button">
							<Icon name='home' />
							<span>Próxima</span>
						</a>
					</header>
					<div className="lesson-content">
						<iframe title="lesson" src="https://www.youtube.com/embed/DDGhKS6bSAE" frameborder="0" allowfullscreen></iframe>
					</div>
					<div className="lesson-actions">
						<div className="share-bar">
							<label>Compartilhe</label>
							<div className="social-buttons">
								<a className="button facebook">
									<Icon name='facebook' />
								</a>
								<a className="button linkedin">
									<Icon name='linkedin' />
								</a>
								<a className="button twitter">
									<Icon name='twitter' />
								</a>

							</div>
						</div>
						<div className="rating">
							<label>Avalie essa aula</label>
						</div>
					</div>
					<div className="lesson-description">
						<div className="container">
							<div className="row">
								<div className="col s12 m8 l9">
									<p>
										Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl
									</p>
									<p>
										Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Aenean aliquam molestie leo, vitae iaculis nisl Praesent lacinia ultrices consectetur. Sed non ipsum felis.
									</p>
									<p>
										Copo furadis é disculpa de bebadis, arcu quam euismod magna. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. In elementis mé pra quem é amistosis quis leo. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.
									</p>
									<p>
										Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros eta. Si num tem leite então bota uma pinga aí cumpadi!
									</p>
									<p>
										Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Aenean aliquam molestie leo, vitae iaculis nisl. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.
									</p>
									<p>
										Copo furadis é disculpa de bebadis, arcu quam euismod magna. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. In elementis mé pra quem é amistosis quis leo. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.
									</p>
								</div>
								<div className="col s12 m4 l3">
								  <div className="upsell-card">
					                <img src="https://cdn.pixabay.com/photo/2014/07/27/13/49/tree-402953__340.jpg" alt="" className="upsell-img" />
					                <div className="content">
					                  <h3 className="upsell-name">
					                    Curso de Engenharia
					                  </h3>
					                  <p className="upsell-description">Este curso de engenharia contempla todas as matérias necessarias para se tornar um bom engenheiro</p>
					                  <a className="button affirmative">
					                    <span>Comprar</span></a>
					                </div>
					              </div>
								</div>
							</div>
						</div>
					</div>
					<div className="comments form-section">
						<div className="container">
							<div className="row">
								<div className="col s12">
									<div className="form-block">
										<h3 className="form-block-title">Deixe seu comentário</h3>
										<div className="comment-form">
											<div className="container">
												<div className="current-user-photo">
													<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
												</div>
												<div className="input-field">
													<textarea></textarea>
												</div>

											</div>
											<a className="button comment-button"><span>Comentar</span></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="comment">
								<div className="container">
									<div className="user-photo">
										<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
									</div>
									<div className="content">
										<h4 className="user-name">Charlie Sheen</h4> <span className="comment-published-time">8 Horas atrás</span>
										<p className="comment-text">
											Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
										</p>
										<div className="comment-user-actions">
											<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
											<div className="comment-form">
												<div className="container">
													<div className="current-user-photo">
														<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
													</div>
													<div className="input-field">
														<textarea></textarea>
													</div>

												</div>
												<a className="button comment-button"><span>Comentar</span></a>
											</div>
										</div>

									</div>
									<div className="comment-admin-action">x</div>

								</div>

								<div className="answers">
									<div className="comment">
										<div className="container">
											<div className="user-photo">
												<img src="https://www.thewrap.com/wp-content/uploads/2017/06/CameronDiaz.jpg" alt=""/>
											</div>
											<div className="content">
												<h4 className="user-name">Cameron Diaz</h4> <span className="comment-published-time">8 Horas atrás</span>
												<p className="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div className="comment-user-actions">
													<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
												</div>

											</div>
											<div className="comment-admin-action">x</div>
										</div>
									</div>
									<div className="comment">
										<div className="container">
											<div className="user-photo">
												<img src="https://static.cineclick.com.br/sites/adm/uploads/banco_imagens/76/940x0_1509114727.jpg" alt=""/>
											</div>
											<div className="content">
												<h4 className="user-name">Megan Fox</h4> <span className="comment-published-time">8 Horas atrás</span>
												<p className="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div className="comment-user-actions">
													<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
												</div>

											</div>
											<div className="comment-admin-action">x</div>
										</div>
									</div>
									<div className="comment">
										<div className="container">
											<div className="user-photo">
												<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
											</div>
											<div className="content">
												<h4 className="user-name">Charlie Sheen</h4> <span className="comment-published-time">8 Horas atrás</span>
												<p className="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div className="comment-user-actions">
													<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
												</div>

											</div>
											<div className="comment-admin-action">x</div>
										</div>
									</div>
								</div>
							</div>
							<div className="comment">
								<div className="container">
									<div className="user-photo">
										<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
									</div>
									<div className="content">
										<h4 className="user-name">Charlie Sheen</h4> <span className="comment-published-time">8 Horas atrás</span>
										<p className="comment-text">
											Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
										</p>
										<div className="comment-user-actions">
											<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
										</div>

									</div>
									<div className="comment-admin-actions">x</div>
								</div>
								<div className="answers">
									<div className="comment">
										<div className="container">
											<div className="user-photo">
												<img src="https://www.thewrap.com/wp-content/uploads/2017/06/CameronDiaz.jpg" alt=""/>
											</div>
											<div className="content">
												<h4 className="user-name">Cameron Diaz</h4> <span className="comment-published-time">8 Horas atrás</span>
												<p className="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div className="comment-user-actions">
													<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
												</div>

											</div>
											<div className="comment-admin-actions">x</div>
										</div>
									</div>
									<div className="comment">
										<div className="container">
											<div className="user-photo">
												<img src="https://static.cineclick.com.br/sites/adm/uploads/banco_imagens/76/940x0_1509114727.jpg" alt=""/>
											</div>
											<div className="content">
												<h4 className="user-name">Megan Fox</h4> <span className="comment-published-time">8 Horas atrás</span>
												<p className="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div className="comment-user-actions">
													<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
												</div>

											</div>
											<div className="comment-admin-actions">x</div>
										</div>
									</div>
									<div className="comment">
										<div className="container">
											<div className="user-photo">
												<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
											</div>
											<div className="content">
												<h4 className="user-name">Charlie Sheen</h4> <span className="comment-published-time">8 Horas atrás</span>
												<p className="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div className="comment-user-actions">
													<a className="action-link">Responder</a> <a className="action-link">Curtir</a>
												</div>

											</div>
											<div className="comment-admin-actions">x</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</article>
			</section>
		);
	}
}
export default StudentLesson;
