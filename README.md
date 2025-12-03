# React + Vite + TypeScript Boilerplate

A modern, production-ready React boilerplate built with Vite, TypeScript, and Tailwind CSS. This template includes everything you need to kickstart your next React project with best practices, beautiful UI components, and a robust development setup.

## 🎉 Features

### Core Technologies

- **React 18** - A JavaScript library for building user interfaces
- **Vite** - Next-generation frontend build tool for blazing-fast development
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Beautifully designed, accessible components built with Radix UI

### State Management & Data Fetching

- **Zustand** - Lightweight state management solution
- **TanStack Query (React Query)** - Powerful data synchronization for React
- **Axios** - Promise-based HTTP client

### Routing & Navigation

- **React Router v6** - Declarative routing for React applications
- **Private Routes** - Protected route implementation
- **Lazy Loading** - Code splitting for optimal performance

### Forms & Validation

- **Formik** - Build forms without tears
- **Yup** - JavaScript schema validation
- **Custom Formik Fields** - Pre-built form components (Input, Select, Checkbox, Radio, Switch, DateTimePicker)

### Internationalization

- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **Multi-language Support** - English (en) and Vietnamese (vi) included

### UI Components

- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library
- **Toast Notifications** - react-toastify integration
- **Date & Time Pickers** - Custom date-time picker components
- **Loading States** - Skeleton and loading components

### Developer Experience

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting with Tailwind CSS plugin
- **Husky** - Git hooks for quality assurance
- **Path Aliases** - Clean imports with `@/` alias
- **Error Boundaries** - Graceful error handling
- **TypeScript Strict Mode** - Type safety out of the box

### Additional Features

- **Theme Provider** - Light/dark theme support (ready for extension)
- **Sidebar Provider** - Responsive sidebar management
- **Authentication Provider** - Authentication state management
- **Custom Hooks** - Reusable hooks for common patterns
- **Helper Utilities** - Common helper functions
- **HTTP Service** - Centralized API service layer

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- **Node.js** (version 16 or above)
- **pnpm** (recommended) or **yarn** or **npm** (package manager)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd react-boider-plate-ts-1
```

### 2. Install dependencies

Using pnpm (recommended):

```bash
pnpm install
```

Or using yarn:

```bash
yarn install
```

Or using npm:

```bash
npm install
```

### 3. Start the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📜 Available Scripts

- `pnpm dev` - Starts the development server with hot module replacement
- `pnpm build` - Builds the production-ready code for deployment
- `pnpm lint` - Runs ESLint to analyze and lint the code
- `pnpm preview` - Starts the Vite development server in preview mode to test the production build

## 📁 Project Structure

```
src/
├── @types/              # TypeScript type definitions
├── assets/              # Static assets (images, icons, etc.)
├── components/          # Reusable React components
│   ├── commonIcons/     # Icon components
│   ├── customFieldsFormik/  # Formik form field components
│   ├── dialogs/         # Dialog/modal components
│   ├── Examples/        # Example components
│   ├── Footer/          # Footer component
│   ├── Navbar/          # Navigation bar component
│   ├── Sidebar/         # Sidebar component
│   └── ui/              # shadcn/ui components
├── consts/              # Constants and configuration
├── helpers/             # Helper utility functions
├── HOCs/                # Higher-Order Components
├── hooks/               # Custom React hooks
├── i18n/                # Internationalization configuration and translations
│   ├── en/              # English translations
│   └── vi/              # Vietnamese translations
├── interfaces/          # TypeScript interfaces
├── layouts/             # Layout components
├── lib/                 # Library utilities
├── modules/              # Feature modules
├── pages/               # Page components
├── providers/           # Context providers
├── services/            # API service layer
├── stores/              # Zustand stores
└── styles/              # Global styles
```

## 🎨 UI Components

This boilerplate includes a comprehensive set of UI components from shadcn/ui:

- Accordion, Alert, Alert Dialog, Avatar, Badge
- Button, Calendar, Card, Checkbox, Collapsible
- Command, Context Menu, Dialog, Drawer, Dropdown Menu
- Hover Card, Input, Label, Loading, Menubar
- Navigation Menu, Popover, Progress, Radio Group
- Scroll Area, Select, Separator, Sheet, Skeleton
- Slider, Switch, Table, Tabs, Textarea
- Toast, Toggle, Tooltip

All components are fully typed and customizable.

## 🌐 Internationalization

The project supports multiple languages out of the box:

- **English (en)** - Default language
- **Vietnamese (vi)** - Additional language

To add more languages:

1. Create a new folder in `src/i18n/` (e.g., `fr/`)
2. Add translation files (e.g., `shared.json`)
3. Update `src/i18n/config.ts` to include the new language

## 🔐 Authentication

The boilerplate includes:

- Authentication provider for managing auth state
- Private route protection
- Login, Forgot Password, and Change Password pages
- Role-based access control (HOC: `withCheckRole`)

## 📝 Form Handling

Pre-built Formik field components are available:

- `InputField` - Text input
- `SelectField` - Dropdown select
- `CheckBoxField` - Checkbox input
- `RadioField` - Radio button group
- `SwitchBoxField` - Toggle switch
- `DateTimePickerField` - Date and time picker

All fields are integrated with Yup validation.

## 🛠️ Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

- `@/` - Points to `src/`

Example:

```typescript
import Button from "@/components/ui/button";
import { useStores } from "@/stores/useStores";
```

### Tailwind CSS

Tailwind is configured with:

- Custom color scheme
- CSS variables for theming
- Animation utilities
- Custom utilities

### Vite

Vite is configured with:

- React plugin
- Path alias resolution
- Optimized build settings

## 📦 Key Dependencies

### Core

- `react` & `react-dom` - React library
- `react-router-dom` - Routing
- `typescript` - Type safety

### UI & Styling

- `tailwindcss` - CSS framework
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icons
- `class-variance-authority` - Component variants

### State & Data

- `zustand` - State management
- `@tanstack/react-query` - Data fetching
- `axios` - HTTP client

### Forms

- `formik` - Form management
- `yup` - Validation

### Utilities

- `date-fns` - Date manipulation
- `lodash` - Utility functions
- `moment` - Date/time handling
- `query-string` - URL query parsing

## 🔧 Development Tips

1. **Adding New Routes**: Update `src/App.tsx` with your new routes
2. **Adding Components**: Use the shadcn/ui CLI or manually add to `src/components/ui/`
3. **API Calls**: Use the `httpService` in `src/services/httpService.ts`
4. **State Management**: Create stores in `src/stores/` using Zustand
5. **Custom Hooks**: Add reusable hooks in `src/hooks/`

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Happy Coding! 🚀**
