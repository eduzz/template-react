import React, { Component } from 'react';
import { Collapsible, Header, Content } from './Collapsible';
import LessonCardList from './LessonCardList';
import Icon from './Icon';


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
							<a href="" className="button">
										<Icon name='home' />
								<span>Inicio</span>
							</a>
							<a href="" className="button">
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
					<header class="lesson-header">
						<a href="" class="button">
							<Icon name='home' />
							<span>Anterior</span>
						</a>
						<h1 class="lesson-title">Como ordenhar filhotes de ornitorrinco</h1>
						<a href="" class="button">
							<Icon name='home' />
							<span>Próxima</span>
						</a>
					</header>
					<div class="lesson-content">
						<iframe src="https://www.youtube.com/embed/DDGhKS6bSAE" frameborder="0" allowfullscreen></iframe>
					</div>
					<div class="lesson-actions">
						<div class="share-bar">
							<label>Compartilhe</label>
							<div class="social-buttons">
								<a class="button facebook">
									<Icon name='facebook' />
								</a>
								<a class="button linkedin">
									<Icon name='linkedin' />
								</a>
								<a class="button twitter">
									<Icon name='twitter' />
								</a>
								
							</div>
						</div>
						<div class="rating">
							<label>Avalie essa aula</label>
						</div>
					</div>
					<div class="lesson-description">
						<div class="container">
							<div class="row">
								<div class="col s12 m8 l9">
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
								<div class="col s12 m4 l3">
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
					<div class="comments form-section">
						<div class="container">
							<div class="row">
								<div class="col s12">
									<div class="form-block">
										<h3 class="form-block-title">Deixe seu comentário</h3>
										<div class="comment-form">
											<div class="container">
												<div class="current-user-photo">
													<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
												</div>
												<div class="input-field">
													<textarea></textarea>
												</div>
												
											</div>
											<a href="#" class="button comment-button"><span>Comentar</span></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="container">
							<div class="comment">
								<div class="container">
									<div class="user-photo">
										<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
									</div>
									<div class="content">
										<h4 class="user-name">Charlie Sheen</h4> <span class="comment-published-time">8 Horas atrás</span>
										<p class="comment-text">
											Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
										</p>
										<div class="comment-user-actions">
											<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
											<div class="comment-form">
												<div class="container">
													<div class="current-user-photo">
														<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
													</div>
													<div class="input-field">
														<textarea></textarea>
													</div>
													
												</div>
												<a href="#" class="button comment-button"><span>Comentar</span></a>
											</div>
										</div>
										
									</div>
									<div class="comment-admin-action">x</div>

								</div> 

								<div class="answers">
									<div class="comment">
										<div class="container">
											<div class="user-photo">
												<img src="https://www.thewrap.com/wp-content/uploads/2017/06/CameronDiaz.jpg" alt=""/>
											</div>
											<div class="content">
												<h4 class="user-name">Cameron Diaz</h4> <span class="comment-published-time">8 Horas atrás</span>
												<p class="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div class="comment-user-actions">
													<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
												</div>
												
											</div>
											<div class="comment-admin-action">x</div>
										</div>
									</div>
									<div class="comment">
										<div class="container">
											<div class="user-photo">
												<img src="https://static.cineclick.com.br/sites/adm/uploads/banco_imagens/76/940x0_1509114727.jpg" alt=""/>
											</div>
											<div class="content">
												<h4 class="user-name">Megan Fox</h4> <span class="comment-published-time">8 Horas atrás</span>
												<p class="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div class="comment-user-actions">
													<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
												</div>
												
											</div>
											<div class="comment-admin-action">x</div>
										</div>
									</div>
									<div class="comment">
										<div class="container">
											<div class="user-photo">
												<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
											</div>
											<div class="content">
												<h4 class="user-name">Charlie Sheen</h4> <span class="comment-published-time">8 Horas atrás</span>
												<p class="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div class="comment-user-actions">
													<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
												</div>
												
											</div>
											<div class="comment-admin-action">x</div>
										</div>
									</div>
								</div>
							</div>
							<div class="comment">
								<div class="container">
									<div class="user-photo">
										<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
									</div>
									<div class="content">
										<h4 class="user-name">Charlie Sheen</h4> <span class="comment-published-time">8 Horas atrás</span>
										<p class="comment-text">
											Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
										</p>
										<div class="comment-user-actions">
											<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
										</div>
										
									</div>
									<div class="comment-admin-actions">x</div>
								</div> 
								<div class="answers">
									<div class="comment">
										<div class="container">
											<div class="user-photo">
												<img src="https://www.thewrap.com/wp-content/uploads/2017/06/CameronDiaz.jpg" alt=""/>
											</div>
											<div class="content">
												<h4 class="user-name">Cameron Diaz</h4> <span class="comment-published-time">8 Horas atrás</span>
												<p class="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div class="comment-user-actions">
													<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
												</div>
												
											</div>
											<div class="comment-admin-actions">x</div>
										</div>
									</div>
									<div class="comment">
										<div class="container">
											<div class="user-photo">
												<img src="https://static.cineclick.com.br/sites/adm/uploads/banco_imagens/76/940x0_1509114727.jpg" alt=""/>
											</div>
											<div class="content">
												<h4 class="user-name">Megan Fox</h4> <span class="comment-published-time">8 Horas atrás</span>
												<p class="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div class="comment-user-actions">
													<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
												</div>
												
											</div>
											<div class="comment-admin-actions">x</div>
										</div>
									</div>
									<div class="comment">
										<div class="container">
											<div class="user-photo">
												<img src="https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg" alt=""/>
											</div>
											<div class="content">
												<h4 class="user-name">Charlie Sheen</h4> <span class="comment-published-time">8 Horas atrás</span>
												<p class="comment-text">
													Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!
												</p>
												<div class="comment-user-actions">
													<a href="" class="action-link">Responder</a> <a href="" class="action-link">Curtir</a>
												</div>
												
											</div>
											<div class="comment-admin-actions">x</div>
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