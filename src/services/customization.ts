import { ICustomization } from 'interfaces/models/customization';
import RxOp from 'rxjs-operators';

import apiService from './api';

class CustomizationService {

  public get() {
    return apiService.get<ICustomization>(`/producer/config`).pipe(
      RxOp.map(response => response.data || {})
    );
  }

  public save(model: ICustomization) {
    return apiService.post(`/producer/config`, model);
  }
}

const customizationService = new CustomizationService();
export default customizationService;