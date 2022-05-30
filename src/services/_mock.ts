import IUser from '@/interfaces/models/user';

const data = new Array(10).fill('a').map(
  (_, index) =>
    ({
      id: index + 1,
      name: `User ${index}`,
      email: `user-${1}@eduzz.com`,
      roles: []
    } as IUser)
);

const requests: any = {
  GET: {
    '/user': {
      total: data.length,
      result: data
    }
  },
  POST: {
    '/auth/login': {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWwucHJhZG9AZWR1enouY29tIiwibmFtZSI6IkRhbmllbCBQcmFkbyJ9.yOzeX8ZvzYMwZCvW3HbHfKsaHPvSVXiUT977dSnirHk'
    },
    '/auth/create': null,
    '/auth/send-reset': null,
    '/auth/reset-password': null,
    '/auth/change-password': null
  }
};

export default function getMockValue(method: string, url: string) {
  return new Promise<{ data: any }>(resolve => {
    setTimeout(() => resolve({ data: requests[method][url] }), 1000 + 2000 * Math.random());
  });
}
