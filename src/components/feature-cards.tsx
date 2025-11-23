import type { LucideIcon } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  bgColor?: string;
}

interface FeatureCardsProps {
  features: Feature[];
  className?: string;
}

export function FeatureCards({ features, className }: FeatureCardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className || ''}`}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card key={index}>
            <CardHeader>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.bgColor || 'bg-blue-100'}`}
              >
                <Icon className={`h-6 w-6 ${feature.iconColor || 'text-blue-600'}`} />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
