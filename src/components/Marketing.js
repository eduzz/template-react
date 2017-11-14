import React, { Component } from 'react';
import Icon from '../components/Icon';
import Upsell from '../components/Upsell';
import UpsellTable from '../components/UpsellTable';
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
        </div>
    </div>    
);

export default Marketing;