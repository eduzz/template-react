import { IEditorItem } from './interfaces';

export const DEFAULT_FONT = 'Arial';
export const DEFAULT_FONT_SIZE = 36;
export const CERTIFICATE_SIZE = {
  width: 3508,
  height: 2479
};

export const PLACEHOLDERS = [
  'ALUNO',
  'AUTOR',
  'DATA',
  'CURSO',
  'DURACAO'
];

export const FONTS = [
  'Arial',
  'Arial Black',
  'Allura',
  'Comic Sans MS',
  'Courier New',
  'Georgia',
  'Impact',
  'Times New Roman',
  'Trebuchet',
  'Verdana'
];

export const DEFAULT_ITEM: IEditorItem = {
  text: 'Texto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 100,
  fontFamily: 'Arial',
  color: '#000',
  placement: { x: 10, y: 20, width: 300, height: 100 },
};

export const DEFAULT_CERTIFICATE = {
  image: '/certificado_default_nutror.png',
  items: [
    {
      id: 1,
      text: '[ALUNO]',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 150,
      fontFamily: 'Allura',
      color: '#172541',
      placement: {
        x: 537.6532823454431,
        y: 1454.5838113448058,
        width: 2437.932441045252,
        height: 160.24474187380497
      }
    }
  ]
} as { image: string; items: IEditorItem[] };