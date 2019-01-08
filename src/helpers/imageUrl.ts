import defaultImage from 'assets/images/default-image.png';
import { CDN_URL } from 'settings';

export default function imageUrl(image: string | { base64: string }): string {
  if (!image) return defaultImage;
  if (typeof image === 'string') return `${CDN_URL}/${image}`;
  return image.base64;
}