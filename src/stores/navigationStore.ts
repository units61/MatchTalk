import {create} from 'zustand';

export type ScreenName =
  | 'home'
  | 'friends'
  | 'profile'
  | 'settings'
  | 'room'
  | 'notifications'
  | 'invite'
  | 'matching'
  | 'editProfile'
  | 'changeEmail'
  | 'changePassword';

export type NavigationParams = Record<string, any>;

interface NavigationStackItem {
  screen: ScreenName;
  params?: NavigationParams;
}

// Screen to URL mapping
const screenToUrl = (screen: ScreenName, params?: NavigationParams): string => {
  switch (screen) {
    case 'home':
      return '/home';
    case 'friends':
      return '/friends';
    case 'profile':
      return '/profile';
    case 'settings':
      return '/settings';
    case 'room':
      return params?.roomId ? `/room/${params.roomId}` : '/home';
    case 'matching':
      return '/matching';
    case 'invite':
      return params?.roomId ? `/invite/${params.roomId}` : '/home';
    case 'notifications':
      return '/notifications';
    case 'editProfile':
      return '/settings/edit-profile';
    case 'changeEmail':
      return '/settings/change-email';
    case 'changePassword':
      return '/settings/change-password';
    case 'login':
      return '/login';
    case 'register':
      return '/register';
    default:
      return '/home';
  }
};

interface NavigationState {
  stack: NavigationStackItem[];
  modal: NavigationStackItem | null;
  routerNavigate: ((path: string | number) => void) | null;

  // Actions
  setRouterNavigate: (navigate: (path: string | number) => void) => void;
  navigate: (screen: ScreenName, params?: NavigationParams) => void;
  goBack: () => void;
  replace: (screen: ScreenName, params?: NavigationParams) => void;
  reset: () => void;
  openModal: (screen: ScreenName, params?: NavigationParams) => void;
  closeModal: () => void;
  getCurrentScreen: () => ScreenName;
  getCurrentParams: () => NavigationParams | undefined;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  stack: [{screen: 'home'}],
  modal: null,
  routerNavigate: null,

  setRouterNavigate: (navigate: (path: string | number) => void) => {
    set({routerNavigate: navigate});
  },

  navigate: (screen: ScreenName, params?: NavigationParams) => {
    const url = screenToUrl(screen, params);
    const state = get();
    
    // Update internal stack
    set({
      stack: [...state.stack, {screen, params}],
    });
    
    // Update URL using React Router
    if (state.routerNavigate) {
      state.routerNavigate(url);
    }
  },

  goBack: () => {
    const state = get();
    if (state.stack.length > 1) {
      // Update internal stack
      set({
        stack: state.stack.slice(0, -1),
      });
      
      // Navigate back using React Router
      if (state.routerNavigate) {
        state.routerNavigate(-1);
      }
    }
  },

  replace: (screen: ScreenName, params?: NavigationParams) => {
    const url = screenToUrl(screen, params);
    const state = get();
    
    // Update internal stack
    if (state.stack.length > 0) {
      set({
        stack: [...state.stack.slice(0, -1), {screen, params}],
      });
    } else {
      set({
        stack: [{screen, params}],
      });
    }
    
    // Replace URL using React Router
    if (state.routerNavigate) {
      state.routerNavigate(url);
    }
  },

  reset: () => {
    set({
      stack: [{screen: 'home'}],
      modal: null,
    });
  },

  openModal: (screen: ScreenName, params?: NavigationParams) => {
    set({
      modal: {screen, params},
    });
  },

  closeModal: () => {
    set({
      modal: null,
    });
  },

  getCurrentScreen: () => {
    const state = get();
    const stack = state.stack;
    return stack[stack.length - 1]?.screen || 'home';
  },

  getCurrentParams: () => {
    const state = get();
    const stack = state.stack;
    return stack[stack.length - 1]?.params;
  },
}));





