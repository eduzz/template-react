import { IUpsell } from 'interfaces/models/upsell';
import React from 'react';

export interface IUpsellFormContext {
  model?: Partial<IUpsell>;
  updateModel?: (handler: (model: Partial<IUpsell>, value: any) => void) => any;
  isFormValid?: boolean;
  flowStep?: number;
  updateFlowStep?: (flowStep: number) => void;
  setUpdateHeight?: (f: () => void) => void;
  updateHeight?: () => void;
}

export const UpsellFormContext: React.Context<IUpsellFormContext> = React.createContext({});