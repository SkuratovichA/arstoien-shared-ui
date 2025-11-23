import { useState } from 'react';
import { Car } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface ImageGalleryImage {
  id: string;
  url: string;
  caption?: string | null;
  isPrimary?: boolean;
}

interface ImageGalleryProps {
  images: ImageGalleryImage[];
  title: string;
  t: (key: string) => string;
  fallbackIcon?: React.ReactNode;
}

export function ImageGallery({ images, title, t, fallbackIcon }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const primaryImage = images?.find((img) => img.isPrimary) || images?.[0];
  const displayImage = selectedImage || primaryImage?.url;

  if (!images || images.length === 0) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="aspect-video bg-muted flex items-center justify-center">
            {fallbackIcon || <Car className="h-16 w-16 text-muted-foreground" />}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div>
          {/* Main Image */}
          <div className="relative aspect-video bg-muted">
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            {primaryImage?.isPrimary && !selectedImage && (
              <Badge className="absolute top-4 right-4">{t('Primary')}</Badge>
            )}
          </div>

          {/* Thumbnail Grid */}
          {images.length > 1 && (
            <div className="grid grid-cols-6 gap-2 p-4">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image.url)}
                  className={`relative aspect-video bg-muted rounded overflow-hidden border-2 transition-all ${
                    (selectedImage || primaryImage?.url) === image.url
                      ? 'border-primary'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  aria-label={image.caption || t('Vehicle image')}
                >
                  <img
                    src={image.url}
                    alt={image.caption || t('Vehicle image')}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
