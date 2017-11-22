import React from 'react';
import SideMenuOption from './SideMenuOption';

const SideMenuOptionList = () => (
    <div className="block side-menu">
        <nav>
            <ul>
                <SideMenuOption
                    data={{
                        title: 'Biblioteca',
                        icon: 'facebook',
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Minha Vitrine',
                        icon: 'showcase',
                    }}
                >
                    <SideMenuOption
                        data={{
                            title: 'Pacotes/Assinaturas',
                            icon: 'package',
                        }}
                    />
                    <SideMenuOption
                        data={{
                            title: 'Cursos',
                            icon: 'play-rounded',
                        }}
                    />
               
                </SideMenuOption>
                <SideMenuOption
                    data={{
                        title: 'Comentários',
                        icon: 'chat-rounded',
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Alunos',
                        icon: 'students',
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Comunicação',
                        icon: 'mailbox',
                    }}
                >
                    <SideMenuOption
                        data={{
                            title: 'Convites',
                            icon: 'airplane',
                        }}
                    />
                    <SideMenuOption
                        data={{
                            title: 'Novidades',
                            icon: 'paper',
                        }}
                    />
                </SideMenuOption>
            </ul>
        </nav>
    </div>
);

export default SideMenuOptionList;
