import React, { Component } from 'react';
import SwitchWithInput from '../SwitchWithInput';
export default class AdminLessonEditChats extends Component{  	
  	render(){
    	return (
			<div className="row">
				<div className="col m12 m12">

					<h3 className="form-section-title">Chats</h3>
					<p className="check-description">Habilite os Chats que estarão disponíveis nesta aula.</p>
					
					<div className="row">
						<SwitchWithInput title="Zopim Chat" id="chat-item-1" classParent="col m6 s6" placeholder="Exemplo: 2L8cq1ySdutGk1YExujfz1C2axL3UxOZ" />
						<SwitchWithInput title="Jivo Chat" id="chat-item-2" classParent="col m6 s6" placeholder="Exemplo: 74C20jXxyd" />
					</div>
					<div className="row">
						<SwitchWithInput title="Tawk.to Chat" id="chat-item-3" classParent="col m6 s6" placeholder="Exemplo: 74a70a7666272e0cd0306c32" />
						<SwitchWithInput title="Zendesk Chat" id="chat-item-4" classParent="col m6 s6" placeholder="Exemplo: abcde.zendesk.com" />
					</div>
					<div className="row">
						<SwitchWithInput title="Live Chat" id="chat-item-5" classParent="col m6 s6" placeholder="Exemplo: 4534867" />
						<SwitchWithInput title="Chatroll Chat" id="chat-item-6" classParent="col m6 s6" placeholder="Exemplo: W05QLK2qipj" />	
					</div>
					
				</div>
			</div>
		)
	}
}