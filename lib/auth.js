import usersData from '@/data/users.json';

const SESSION_KEY = 'perpustakaan_session';

export async function login(credentials) {
  // Simulasi loading
  await new Promise(resolve => setTimeout(resolve, 800));

  // Cek user dari JSON (Admin) atau LocalStorage (Member baru)
  const localUsers = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('local_users') || '[]') 
    : [];
  
  const allUsers = [...usersData, ...localUsers];
  const user = allUsers.find(u => u.email === credentials.email && u.password === credentials.password);

  if (user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      window.dispatchEvent(new Event('storage'));
    }
    return user;
  }
  throw new Error('Email atau password salah!');
}

export async function register(data) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newUser = { 
    ...data, 
    id: 'user-' + Date.now(),
    role: 'member',
    memberNumber: 'LIB' + Math.floor(1000 + Math.random() * 9000)
  };

  if (typeof window !== 'undefined') {
    const localUsers = JSON.parse(localStorage.getItem('local_users') || '[]');
    localUsers.push(newUser);
    localStorage.setItem('local_users', JSON.stringify(localUsers));
  }
  return newUser;
}

export async function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event('storage'));
  }
  return true;
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}