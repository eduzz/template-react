import { AxiosResponse } from 'axios';

const requests: any = {
  POST: {
    '/auth/login': {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWwucHJhZG9AZWR1enouY29tIiwibmFtZSI6IkRhbmllbCBQcmFkbyJ9.yOzeX8ZvzYMwZCvW3HbHfKsaHPvSVXiUT977dSnirHk'
    }
  }
};

export default function getMockValue<T>(method: string, url: string): Promise<AxiosResponse<T>> {
  return new Promise<any>(resolve => {
    setTimeout(() => resolve({ data: requests[method][url] }), 1000 + 2000 * Math.random());
  });
}
