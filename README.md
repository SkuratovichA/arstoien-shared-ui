# @arstoien/shared-ui

Shared UI components, contexts, and utilities for Arstoien projects. Built with React, Radix UI, and Tailwind CSS.

## Installation

```bash
npm install @arstoien/shared-ui
# or
yarn add @arstoien/shared-ui
```

## Peer Dependencies

This package requires several peer dependencies. Install them with:

```bash
npm install @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-tabs @radix-ui/react-toast class-variance-authority clsx lucide-react react-hot-toast tailwind-merge tailwindcss-animate zod
```

## Usage

### Tailwind Configuration

In your `tailwind.config.js`:

```javascript
const sharedUIPreset = require('@arstoien/shared-ui/tailwind.preset');

module.exports = {
  presets: [sharedUIPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@arstoien/shared-ui/dist/**/*.js',
  ],
  // ... your other configurations
};
```

### Import Components

```tsx
import { Button, Card, Dialog, Input } from '@arstoien/shared-ui';
import { useAuth, useUser, useLocale } from '@arstoien/shared-ui';
import { cn, formatPrice } from '@arstoien/shared-ui';
```

### Apollo Client Setup

```tsx
import { apolloClient } from '@arstoien/shared-ui';

// Use the pre-configured Apollo client
```

### i18n Setup

```tsx
import { createI18n } from '@arstoien/shared-ui';

const i18n = createI18n({
  // Your i18n configuration
});
```

### Context Providers

```tsx
import { AuthProvider, LocaleProvider, ExchangeRateProvider } from '@arstoien/shared-ui';

function App() {
  return (
    <AuthProvider>
      <LocaleProvider>
        <ExchangeRateProvider>
          {/* Your app */}
        </ExchangeRateProvider>
      </LocaleProvider>
    </AuthProvider>
  );
}
```

## Features

### UI Components
- 30+ Radix UI-based components
- Fully typed with TypeScript
- Tailwind CSS styling with CSS variables
- Dark mode support
- Accessible by default

### Contexts
- **AuthContext**: Authentication state management
- **UserContext**: User data management
- **LocaleContext**: Internationalization support
- **ExchangeRateContext**: Currency conversion

### Utilities
- `cn()`: Class name merging utility
- `formatPrice()`: Price formatting
- `useDebounce()`: Debouncing hook

### Pre-configured
- Apollo Client setup with WebSocket support
- i18n factory for internationalization
- Form components integrated with react-hook-form

## Components List

### Basic Components
- Alert, AlertDialog, Avatar, Badge, Button
- Card, Checkbox, Dialog, DropdownMenu
- Form, Input, Label, Popover, Progress
- RadioGroup, ScrollArea, Select, Separator
- Sheet, Skeleton, Slider, Table, Tabs
- Textarea, Toast, Toaster

### Typography
- Heading, Text

### Custom Components
- MobileBottomNav
- MobileNotificationsSheet
- LocaleCurrencySelector
- ConvertedPrice
- PaginationControls
- ImageGallery
- FeatureCards

## License

MIT