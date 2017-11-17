import React from 'react';
import Icon from '../components/Icon';
import Upsell from '../components/Upsell';
import Invite from '../components/Invite';
import UpsellTable from '../components/UpsellTable';
import InviteTable from '../components/InviteTable';
import CourseNews from '../components/CourseNews';
import CourseNewsTable from '../components/CourseNewsTable';
import { Modal, Content as ModalContent, Footer, Button } from '../components/Modal';
import { Collapsible, Header, Content as CollapsibleContent } from './Collapsible';

const Marketing = () => (    
    <div className="container">        
        <div className="form-section">
            <div className="row">
                
                <Collapsible className='card-lessons' id='upsell-collapsible'>
                    <Header className='card-lessons-header' active>
                        <h3 className='card-lessons-title'>UPSELL</h3>
                        <div className='card-lessons-resume'>
                            <span>Configure seu upsell</span>
                        </div>                
                    </Header>
                    <CollapsibleContent className='card-lessons-wrapper'>
                        <div className="container">
                            <div className="form-section">
                                <div className="row">
                                    <Button className='button affirmative waves-effect waves-light' target='upsell-modal'>
                                        <Icon name='paper' />
                                        <span>Adicionar Upsell</span>
                                    </Button>
                                </div>
                                <div className='row'>
                                    <div className='col l12'>
                                        <UpsellTable />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>


                <Collapsible className='card-lessons' id='convites-collapsible'>
                    <Header className='card-lessons-header' active>
                        <h3 className='card-lessons-title'>CONVITES</h3>
                        <div className='card-lessons-resume'>
                            <span>Envie um convite para um aluno</span>
                        </div>
                    </Header>
                    <CollapsibleContent className='card-lessons-wrapper'>
                        <div className="container">
                            <div className="form-section">
                                <div className="row">
                                    <Button className='button affirmative waves-effect waves-light' target='modal-convites'>
                                        <Icon name='paper' />
                                        <span>Adicionar Convites</span>
                                    </Button>
                                </div>
                                <div className='row'>
                                    <div className='col l12'>
                                        <InviteTable />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>


                <Collapsible className='card-lessons' id='course-news-collapsible'>
                    <Header className='card-lessons-header' active>
                        <h3 className='card-lessons-title'>Novidades</h3>
                        <div className='card-lessons-resume'>
                            <span>Compartilhe suas novidades com seus alunos</span>
                        </div>
                    </Header>
                    <CollapsibleContent className='card-lessons-wrapper'>
                        <div className="container">
                            <div className="form-section">
                                <div className="row">
                                    <Button className='button affirmative waves-effect waves-light' target='modal-novidades'>
                                        <Icon name='paper' />
                                        <span>Adicionar Novidades</span>
                                    </Button>
                                </div>
                                <div className='row'>
                                    <div className='col l12'>
                                        <CourseNewsTable />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
        
        <div className="form-section">
            <Modal id='upsell-modal' fixedFooter>
                <ModalContent>
                    <Upsell />
                </ModalContent>
                <Footer>
                    <a id="save-upsell" className="modal-action modal-close waves-effect waves-green btn-flat">Salvar</a>
                    <a id="cancel-upsell" className="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>

                </Footer>    
            </Modal>
            <Modal id='modal-convites' fixedFooter>
                <ModalContent>
                    <Invite />
                </ModalContent>
                <Footer>
                    <a id="save-invite" className="modal-action modal-close waves-effect waves-green btn-flat">Salvar</a>
                    <a id="cancel-invite" className="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
                </Footer>
            </Modal>
                
            <Modal id='modal-novidades' fixedFooter>
                <ModalContent>
                    <CourseNews />
                </ModalContent>
                <Footer>
                    <a className="modal-action modal-close waves-effect waves-green btn-flat">Salvar</a>
                    <a className="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
                </Footer>
            </Modal>
        </div>
    </div>
);

export default Marketing;