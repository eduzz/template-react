import React from 'react';
import SideMenuOption from './SideMenuOption';

const SideMenuOptionList = () => (
    <div className="block side-menu">
        <nav>
            <ul>
                <SideMenuOption
                    data={{
                        title: 'Biblioteca',
                        icon: 'paper',
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Minha Vitrine',
                        icon: 'paper',
                    }}
                >
                    <SideMenuOption
                        data={{
                            title: 'Pacotes/Assinaturas',
                            icon: 'paper',
                        }}
                    />
                    <SideMenuOption
                        data={{
                            title: 'Cursos',
                            icon: 'paper',
                        }}
                    />
               
                </SideMenuOption>
                <SideMenuOption
                    data={{
                        title: 'Comentários',
                        icon: 'paper',
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Alunos',
                        icon: 'paper',
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Comunicação',
                        icon: 'paper',
                    }}
                >
                    <SideMenuOption
                        data={{
                            title: 'Convites',
                            icon: 'paper',
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
