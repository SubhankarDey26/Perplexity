# Perplexity Frontend Architecture

This frontend follows a **4-Layer Architecture Model** for scalability and maintainability.

## 📋 Architecture Overview

```
UI (Presentation)
    ↓
Hooks (Orchestration)
    ↓
State (Memory)
    ↓
API (Backend Communication)
```

### Layer Breakdown

#### 1. **UI Layer** (`src/layers/ui/components/`)
- **Purpose**: Presentation and reusable UI components
- **Responsibility**: Render UI elements, handle user interactions
- **Components**:
  - `Button.jsx` - Reusable button component
  - `Input.jsx` - Form input component
  - `Sidebar.jsx` - Left navigation sidebar
  - `MessageInput.jsx` - Chat message input area
  - `ChatMessage.jsx` - Individual message display
  - `Header.jsx` - Top header component
  - `FormGroup.jsx` - Form field wrapper

#### 2. **Hooks Layer** (`src/layers/hooks/`)
- **Purpose**: Custom hooks for component logic orchestration
- **Responsibility**: Manage component logic, data fetching hooks
- **Future**: Will contain hooks like `useAuth()`, `useChat()`, `useFetch()`

#### 3. **State Layer** (`src/layers/state/`)
- **Purpose**: Global state management (Context API / Redux)
- **Responsibility**: Store and manage application state
- **Future**: Will contain context providers, reducers, and global state logic

#### 4. **API Layer** (`src/layers/api/`)
- **Purpose**: Backend communication and API calls
- **Responsibility**: Handle all HTTP requests to the backend
- **Future**: Will contain API client instances and service functions

## 📁 Project Structure

```
src/
├── layers/
│   ├── ui/
│   │   └── components/          # Reusable UI components
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Sidebar.jsx
│   │       ├── MessageInput.jsx
│   │       ├── ChatMessage.jsx
│   │       ├── Header.jsx
│   │       ├── FormGroup.jsx
│   │       └── index.js
│   ├── hooks/                   # Custom hooks layer
│   ├── state/                   # State management layer
│   └── api/                     # API communication layer
├── pages/
│   ├── LoginPage.jsx            # Login page
│   ├── RegisterPage.jsx         # Register page
│   ├── DashboardPage.jsx        # Main dashboard/chat page
│   └── index.js
├── styles/
│   ├── variables.scss           # SCSS variables and theme
│   ├── global.scss              # Global styles
│   ├── components/              # Component-specific styles
│   │   ├── button.scss
│   │   ├── input.scss
│   │   ├── sidebar.scss
│   │   ├── messageInput.scss
│   │   ├── chatMessage.scss
│   │   ├── header.scss
│   │   └── formGroup.scss
│   └── pages/                   # Page-specific styles
│       ├── loginPage.scss
│       ├── registerPage.scss
│       └── dashboardPage.scss
├── App.jsx                      # Main app with routing
└── main.jsx                     # Entry point
```

## 🎨 Design System

### Color Palette (Dark Theme)
- **Primary**: `#4f46e5` (Indigo)
- **Primary Dark**: `#4338ca`
- **Secondary**: `#10b981` (Green)
- **Danger**: `#ef4444` (Red)
- **Background Dark**: `#0f172a`
- **Background Darker**: `#0a0f1f`
- **Text Light**: `#e5e7eb`
- **Border**: `#1e293b`

### Spacing Scale
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build
```

## 📖 Pages

### 1. **Login Page** (`/login`)
- Email and password form
- Link to register page
- Styled with SCSS

### 2. **Register Page** (`/register`)
- Username, email, password fields
- Password confirmation
- Link to login page

### 3. **Dashboard Page** (`/dashboard`)
- Main chat interface
- Sidebar with recent chats
- Message input area
- Chat message display

## 🔄 Data Flow

```
User Interaction (UI)
    ↓
Component Event Handler (Hooks)
    ↓
State Update (State Layer)
    ↓
API Call (API Layer)
    ↓
Response Back to State
    ↓
Component Re-render (UI)
```

## 🎯 Next Steps

1. **Add Logic**: Implement authentication logic in hooks layer
2. **API Integration**: Add API calls in the API layer
3. **State Management**: Set up Context API/Redux in state layer
4. **Form Validation**: Add validation logic to form submissions
5. **Error Handling**: Implement error boundaries and error handling
6. **Responsive Design**: Test and refine mobile responsiveness

## 📝 Notes

- No business logic is implemented yet - UI only
- All pages are placeholder pages ready for logic integration
- SCSS is used for styling with variables for consistency
- React Router is configured for page navigation
