# Task Management

A modern, feature-rich task management application built with React 19, TypeScript, and Vite. Organize your tasks efficiently with support for multiple lists, starred tasks, themes, real-time notifications, and more.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Architecture](#-architecture)
- [API Integration](#-api-integration)
- [State Management](#-state-management)
- [Styling](#-styling)
- [Real-time Features](#-real-time-features)

## ✨ Features

### Core Functionality

- **Task Management**: Create, read, update, and delete tasks with detailed descriptions
- **Multiple Lists**: Organize tasks into customizable lists/tabs
- **Starred Tasks**: Quick access to important tasks
- **Task Filtering**: View all tasks or filter by starred status
- **Deadline Management**: Set due dates and times for tasks

### User Experience

- **Dark/Light Theme**: Toggle between dark and light color modes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Optimistic UI**: Instant feedback for user actions
- **Smooth Animations**: Fluid transitions powered by Framer Motion
- **Toast Notifications**: Non-intrusive feedback for actions and errors

### Authentication & Security

- **User Registration**: Sign up with email verification (OTP)
- **Secure Login**: Authentication with JWT tokens
- **Session Management**: Automatic token refresh
- **Protected Routes**: Secure access to authenticated areas

### Real-time Features

- **Deadline Reminders**: Socket.io powered notifications when tasks are due
- **Push Notifications**: Firebase Cloud Messaging integration

## 🛠 Tech Stack

| Category               | Technology                                 |
| ---------------------- | ------------------------------------------ |
| **Framework**          | React 19                                   |
| **Language**           | TypeScript                                 |
| **Build Tool**         | Vite 7                                     |
| **Styling**            | Tailwind CSS 4, Styled Components, Emotion |
| **State Management**   | Zustand                                    |
| **Routing**            | React Router DOM 7                         |
| **HTTP Client**        | Axios                                      |
| **Animations**         | Framer Motion                              |
| **Real-time**          | Socket.io-client                           |
| **Push Notifications** | Firebase Cloud Messaging                   |
| **Date Handling**      | date-fns, dayjs                            |
| **UI Components**      | MUI (Material UI)                          |
| **Icons**              | Lucide React, Material Icons               |
| **Form Handling**      | Custom hooks                               |
| **Code Quality**       | ESLint, Prettier                           |

## 📁 Project Structure

```
task-management/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, SVGs
│   ├── components/        # React components
│   │   ├── Auth/          # Authentication components
│   │   │   ├── Login/     # Login form and info
│   │   │   ├── Otp/       # OTP verification
│   │   │   └── SignUp/    # Registration form
│   │   ├── layout/        # Layout components
│   │   │   ├── Header/    # App header
│   │   │   └── Navbar/    # Navigation bar with tabs
│   │   ├── specific/      # Specific feature components
│   │   ├── TaskContent/   # Task display components
│   │   └── ui/            # Reusable UI components
│   │       ├── Button/    # Custom buttons
│   │       ├── DateTime/  # Date/time pickers
│   │       ├── Loading/   # Loading spinners
│   │       ├── Modal/     # Modal dialogs
│   │       └── Notification/ # Toast notifications
│   ├── context/           # React context providers
│   ├── errors/            # Error handling utilities
│   ├── hooks/             # Custom React hooks
│   │   ├── AuthState/     # Authentication hooks
│   │   ├── DefaultPageState/ # Main page hooks
│   │   ├── DetailTaskState/  # Task detail hooks
│   │   └── NewTaskState/  # New task form hooks
│   ├── pages/             # Page components
│   ├── routes/            # Routing configuration
│   ├── services/          # API and external services
│   │   ├── api.ts         # Axios instance with interceptors
│   │   ├── authService.ts # Authentication API
│   │   ├── firebase/      # Firebase configuration
│   │   ├── socket/        # Socket.io configuration
│   │   └── tasksService.ts # Tasks API
│   ├── stores/            # Zustand stores
│   │   ├── useTaskStore.ts  # Task state management
│   │   ├── useTabStore.ts   # Tab/List state management
│   │   └── useUserStore.ts  # User state management
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── .env.example           # Environment variables template
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.js         # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API server (required for full functionality)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd task-management
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env
    ```

4. **Configure environment variables** (see [Environment Variables](#-environment-variables))

5. **Start development server**

    ```bash
    npm run dev
    ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key
```

## 📜 Available Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start development server  |
| `npm run build`        | Build for production      |
| `npm run preview`      | Preview production build  |
| `npm run lint`         | Run ESLint                |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |

## 🏗 Architecture

### Component Hierarchy

```
App
├── AuthRoutes (unauthenticated routes)
│   ├── AuthPage (login/signup)
│   └── VerifyOTPPage
└── AppRoutes (authenticated routes)
    ├── DefaultPage
    │   ├── Header
    │   ├── Navbar
    │   │   └── NavbarButton
    │   ├── TaskContent
    │   │   ├── ListTask
    │   │   └── TaskContentValue
    │   └── Modals
    │       ├── ModalNewTask
    │       └── ModalTaskTitle
    └── DetailTask
```

### State Management Pattern

The application uses **Zustand** for global state management with three main stores:

```typescript
// User Store - Authentication state
useUserStore: {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  checkUserLogged: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

// Tab Store - Lists/tabs state
useTabsStore: {
  tabs: ITab[] | null;
  tab: ITab | null;
  currentTabId: string;
  setTabs: () => Promise<void>;
  optimisticAddTab: (tab: ITab) => void;
  // ...
}

// Task Store - Tasks state
useTaskStore: {
  tasks: ITask[] | null;
  task: ITask | null;
  loadTask: (tabId: string) => Promise<void>;
  optimisticToggleChecked: (id: string) => void;
  // ...
}
```

### Custom Hooks Architecture

The application follows a custom hooks pattern for separating concerns:

- **useDefaultPage**: Main page composition hook
- **useDetailTask**: Task detail page hook
- **useLogin/useRegister**: Authentication hooks
- **useTheme**: Theme toggle hook
- **useToast**: Notification system hook

## 🌐 API Integration

### Axios Configuration

The API layer is configured with:

- **Base URL**: Configured via `VITE_API_URL`
- **Authentication**: JWT Bearer token from localStorage
- **Token Refresh**: Automatic refresh on 401 responses
- **Error Handling**: Centralized error interception

```typescript
// API Interceptors
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        // Automatic token refresh on 401
        if (error.response.status === 401 && !originalRequest._retry) {
            const response = await api.get('/auth/refresh');
            localStorage.setItem('accessToken', response.data.accessToken);
            return api(originalRequest);
        }
    }
);
```

### API Services

| Service              | Methods                                                           | Description          |
| -------------------- | ----------------------------------------------------------------- | -------------------- |
| `authService.ts`     | loginUser, logoutUser, getLoggedUser, signUpUser                  | User authentication  |
| `tasksService.ts`    | addTask, updateTask, getTaskById, getTasksByTabId, deleteTaskById | Task CRUD operations |
| `taskTabsService.ts` | getTabs, createTab, deleteTab                                     | List/tab management  |

## 🎨 Styling

### Tailwind CSS 4

The project uses Tailwind CSS 4 with custom theme configuration:

```css
@theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-primary: var(--primary);
    --color-secondary: var(--secondary);
    --color-accent-button: var(--accent-button);
    /* ... */
}
```

### Dark Mode Support

CSS custom properties define both light and dark theme colors:

```css
:root {
    /* Light theme */
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
}

.dark {
    /* Dark theme */
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
}
```

### Custom Animations

```css
@theme inline {
    --animate-float: float 3s ease-in-out infinite;

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
}
```

## ⚡ Real-time Features

### Socket.io Integration

The application connects to a Socket.io server for real-time notifications:

```typescript
// socket.ts
export const socket = io('http://localhost:3000', {
    transports: ['websocket'],
    autoConnect: true,
    reconnectionAttempts: 5,
});

// Deadline reminder listener
socket.on('deadline-reminder', (data) => {
    alert(`⏰ ${data.title} Now ${new Date(data.deadline).toLocaleString()}`);
});
```

### Firebase Push Notifications

Firebase Cloud Messaging integration for push notifications:

```typescript
// Get and send notification token
const getTokenNotification = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        const token = await getToken(messaging, {
            vapidKey: VITE_FIREBASE_VAPID_KEY,
        });
        await addNotificationToken(token);
    }
};
```

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Adaptive navigation (collapsible navbar)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Auto Token Refresh**: Seamless session management
- **Protected Routes**: Authentication guards
- **API Error Handling**: Centralized error management
- **XSS Prevention**: React's built-in escaping
- **CORS Configuration**: Proper cross-origin settings

## 🧪 Code Quality

### ESLint Configuration

The project uses ESLint with:

- TypeScript support
- React hooks rules
- Import sorting
- Prettier integration

### Prettier Formatting

Automatic code formatting with:

- Tailwind CSS plugin
- Consistent quote styles
- Trailing commas
- Print width configuration

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase](https://firebase.google.com/)
- [Socket.io](https://socket.io/)
