import React from 'react';
import styles from './styles.css';

const FileUploader = () => (
    <div className={styles.component}>
        <div className="row">
            <div className="col s12">
                <div className="form-block">
                    <h3 className="form-block-title">Arquivos para download</h3>
                </div>
            </div>

            <div className="col s12">
                <div className="form-block">
                    <ul className="filesList">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18"><g fill="none" fillRule="evenodd"><path fill="#CB0606" d="M14 4.737v11.842c0 .785-.649 1.421-1.448 1.421H1.448C.648 18 0 17.364 0 16.579V1.42C0 .636.648 0 1.448 0h7.724L14 4.737z"/><path fill="#FB8D8D" d="M14 4.418V5h-3.839C9.367 5 9 4.355 9 3.56V0h.581L14 4.418z"/><path fill="#FFF" d="M10.868 9.653a1.171 1.171 0 0 0-.366-.063c-.133 0-.225.027-.275.082-.05.055-.075.152-.075.291v.267h.56v.535h-.56v2.204h-.68v-2.204h-.35v-.535h.35v-.267c0-.339.085-.584.254-.736.17-.151.425-.227.765-.227.16 0 .33.022.509.065l-.132.588zm-2.847 3.05c-.127.106-.26.19-.4.253-.141.062-.3.094-.48.094-.348 0-.614-.125-.798-.374-.185-.249-.277-.6-.277-1.055 0-.464.102-.825.304-1.083.203-.258.488-.387.855-.387.13 0 .263.027.4.08.137.053.251.12.34.202V9.081h.68v3.888h-.624v-.267zm-.056-1.713a1.091 1.091 0 0 0-.267-.172.765.765 0 0 0-.325-.074.515.515 0 0 0-.44.234c-.11.156-.166.367-.166.633 0 .263.045.469.135.619.091.15.23.224.42.224a.85.85 0 0 0 .344-.077c.117-.051.217-.114.3-.189V10.99zM5.06 12.872a1.006 1.006 0 0 1-.598.178c-.306 0-.566-.095-.782-.285V14H3v-3.77h.627v.269c.127-.108.26-.193.4-.255.139-.062.299-.093.48-.093.35 0 .615.122.798.366.182.244.274.598.274 1.063 0 .294-.045.553-.134.778a1.12 1.12 0 0 1-.385.514zm-.321-1.905a.459.459 0 0 0-.417-.223.848.848 0 0 0-.34.077 1.14 1.14 0 0 0-.302.19v1.198c.072.064.16.121.267.17a.76.76 0 0 0 .328.075.508.508 0 0 0 .441-.236c.108-.158.162-.367.162-.628 0-.266-.046-.474-.14-.623z"/></g></svg>
                            Apostila de Marketing
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18"><g fill="none" fillRule="evenodd"><path fill="#06A4CB" d="M14 4.737v11.842c0 .785-.649 1.421-1.448 1.421H1.448C.648 18 0 17.364 0 16.579V1.42C0 .636.648 0 1.448 0h7.724L14 4.737z"/><path fill="#5DDFFF" d="M14 4.418V5h-3.839C9.367 5 9 4.355 9 3.56V0h.581L14 4.418z"/><path fill="#FFF" d="M4.63 10.548V15h-.918v-.474a1.14 1.14 0 0 1-.432.381 1.297 1.297 0 0 1-.588.129c-.304 0-.571-.069-.801-.207a1.39 1.39 0 0 1-.534-.585 1.92 1.92 0 0 1-.189-.87c0-.324.062-.61.186-.858s.3-.44.528-.576c.228-.136.49-.204.786-.204.456 0 .804.17 1.044.51v-1.698h.918zm-1.143 3.495c.15-.166.225-.381.225-.645s-.075-.479-.225-.645a.745.745 0 0 0-.579-.249.752.752 0 0 0-.585.249c-.15.166-.227.381-.231.645.004.264.081.479.231.645.15.166.345.249.585.249a.745.745 0 0 0 .579-.249zm4.428-2.097c.262.136.465.328.609.576.144.248.216.536.216.864 0 .324-.072.611-.216.861s-.347.444-.609.582a1.909 1.909 0 0 1-.903.207c-.344 0-.647-.069-.909-.207a1.486 1.486 0 0 1-.609-.582 1.694 1.694 0 0 1-.216-.861c0-.328.072-.616.216-.864.144-.248.347-.44.609-.576.262-.136.565-.204.909-.204.34 0 .641.068.903.204zm-1.488.81c-.15.164-.225.378-.225.642s.075.478.225.642c.15.164.345.246.585.246a.75.75 0 0 0 .579-.246c.15-.164.225-.378.225-.642s-.075-.478-.225-.642a.75.75 0 0 0-.579-.246.756.756 0 0 0-.585.246zm4.359-.228a.737.737 0 0 0-.567.237c-.146.158-.219.367-.219.627s.072.471.216.633a.706.706 0 0 0 .552.243c.336 0 .586-.126.75-.378l.636.432a1.368 1.368 0 0 1-.573.528 1.89 1.89 0 0 1-.861.186c-.324 0-.61-.068-.858-.204a1.446 1.446 0 0 1-.579-.576 1.735 1.735 0 0 1-.207-.858c0-.328.069-.617.207-.867.138-.25.332-.444.582-.582.25-.138.539-.207.867-.207.308 0 .582.059.822.177s.432.285.576.501l-.624.45a.881.881 0 0 0-.72-.342z"/></g></svg>
                            Template de ficha de cadastro
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18"><g fill="none" fillRule="evenodd"><path fill="#8DC489" d="M14 4.737v11.842c0 .785-.649 1.421-1.448 1.421H1.448C.648 18 0 17.364 0 16.579V1.42C0 .636.648 0 1.448 0h7.724L14 4.737z"/><path fill="#AAE1A7" d="M14 4.418V5h-3.839C9.367 5 9 4.355 9 3.56V0h.581L14 4.418z"/><path fill="#FFF" d="M3.12 11.772h1.056l.594.978.63-.978h1.008l-1.026 1.572L6.48 15H5.418l-.648-1.056L4.062 15h-1.02l1.116-1.65-1.038-1.578zm3.888-1.224h.924V15h-.924v-4.452zm3.36 1.941a1.562 1.562 0 0 0-.462-.081.53.53 0 0 0-.27.06.196.196 0 0 0-.102.18c0 .088.046.156.138.204.092.048.242.102.45.162.228.068.416.135.564.201.148.066.276.164.384.294s.162.301.162.513a.87.87 0 0 1-.369.747c-.246.178-.561.267-.945.267-.264 0-.518-.039-.762-.117a1.964 1.964 0 0 1-.636-.333l.3-.624c.164.128.347.227.549.297.202.07.393.105.573.105.124 0 .223-.021.297-.063s.111-.105.111-.189c0-.092-.047-.164-.141-.216a2.357 2.357 0 0 0-.453-.168 4.583 4.583 0 0 1-.549-.192.979.979 0 0 1-.375-.291.787.787 0 0 1-.156-.507c0-.32.12-.568.36-.744.24-.176.544-.264.912-.264.22 0 .44.031.66.093.22.062.42.151.6.267l-.318.63a2.69 2.69 0 0 0-.522-.231z"/></g></svg>
                            Planilha de dados para testes (Carregando…45%) <button className="btnCancel" type="button"></button>
                        </li>
                    </ul>
                    <div className="fileProgress"><span className="f-45"></span></div>
                </div>
            </div>

            <div className="col s12">
                <div className="form-block">
                    <label className="inputSelect">
                        <span><strong>Adicione arquivos</strong> ou Arraste-os aqui</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
);

export default FileUploader;
