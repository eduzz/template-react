import { API_ENDPOINT, CERTIFICATE_URL, IS_DEVELOPMENT } from 'settings';

export default function getCertificatePreviewUrl(certificateId: number, placeholders: any) {
  const data = btoa(JSON.stringify({
    i: certificateId,
    p: placeholders,
    c: new Date()
  }));

  if (IS_DEVELOPMENT) {
    return `${API_ENDPOINT}/learner/certificate/preview/${data}`;
  }

  return `${CERTIFICATE_URL}/download/preview/${data}`;
}