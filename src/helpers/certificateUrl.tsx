import { REACT_APP_CERTIFICATE_URL } from 'settings';

export default function getCertificatePreviewUrl(certificateId: number, placeholders: any) {
  const data = btoa(JSON.stringify({
    i: certificateId,
    p: placeholders,
    c: new Date()
  }));

  return `${REACT_APP_CERTIFICATE_URL}/download/preview/${data}`;
}