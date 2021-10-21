const requests = {
  GET: {},
  POST: {
    '/login': {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWwucHJhZG9AZWR1enouY29tIiwiZmlyc3ROYW1lIjoiRGFuaWVsIiwibGFzdE5hbWUiOiJQcmFkbyJ9.MaVt7dCdGyaicE8KPawFKT_Uflrgoz-ivTgcBa34tIU'
    },
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
