export const getImageSrc = (image?: string) => {
  if (!image) return '';

  // URL מלא (http / https)
  if (image.startsWith('http')) {
    return image;
  }

  // תמונות חדשות מהשרת (uploads)
  if (image.includes('/uploads/')) {
    return `http://localhost:3001${image}`;
  }

  // תמונות ישנות – public/images
  if (image.startsWith('/images/')) {
    return image;
  }

  // שם קובץ בלבד (png / jpg / webp / כל סיומת)
  return `/images/${image}`;
};
