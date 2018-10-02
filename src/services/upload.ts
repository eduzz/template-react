import { Observable } from 'rxjs';
import * as rxjsOperators from 'rxjs-operators';

import apiService from './api';

export class UploadService {

  public saveImage(image: Blob): Observable<{ url: string, progress: number }> {
    const data = new FormData();
    data.append('file', image, 'upload-image.png');

    return apiService.upload('/producer/upload', data).pipe(
      rxjsOperators.map(({ response, progress }) => {
        return {
          url: response ? response.data.url : null,
          progress
        };
      })
    );
  }
}

const uploadService = new UploadService();
export default uploadService;