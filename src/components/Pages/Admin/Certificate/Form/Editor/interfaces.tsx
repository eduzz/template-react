export interface IEditorContext {
  image: string;
  items: IEditorItem[];
  selectedItem: number;
  select: (selectedItem: number) => void;
  dismiss: () => void;
  modify: (item: IEditorItem) => void;
  getCurrentConfig: <T extends keyof IEditorItem>(key: T) => IEditorItem[T];
  add: () => void;
  remove: () => void;
  setPlacement: (placement: IEditorItem['placement']) => void;
  setImage: (image: string) => void;
}

export interface IEditorItem {
  id?: number;
  text: string;
  display: string;
  justifyContent: string;
  alignItems: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  placement: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}