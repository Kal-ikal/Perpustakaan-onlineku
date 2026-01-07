import usersData from '@/data/users.json';
import booksData from '@/data/books.json';
import categoriesData from '@/data/categories.json';
import loansData from '@/data/loans.json';

// --- DATA DUMMY (Memory) ---
let users = [...usersData];
let books = [...booksData];
let categories = [...categoriesData];
let loans = [...loansData];

// --- HELPER ---
export const generateId = () => Math.random().toString(36).substr(2, 9);
export const generateMemberNumber = () => "LIB" + Math.floor(1000 + Math.random() * 9000);

// --- USER ---
export const getUserByEmail = (email) => users.find(u => u.email === email);
export const addUser = (userData) => {
  const newUser = { id: generateId(), memberNumber: generateMemberNumber(), role: 'member', ...userData };
  users.push(newUser);
  return newUser;
};

// --- BOOKS ---
export const getBooksWithCategory = () => {
  return books.map(b => ({
    ...b,
    categoryName: categories.find(c => c.id === b.categoryId)?.name || 'Umum'
  }));
};
export const updateBook = (id, data) => {
  const idx = books.findIndex(b => b.id === id);
  if (idx !== -1) books[idx] = { ...books[idx], ...data };
  return books[idx];
};

// --- LOANS ---
export const getActiveLoansByUserId = (userId) => {
  return loans.filter(l => l.userId === userId && l.status === 'borrowed')
    .map(l => ({...l, bookTitle: books.find(b => b.id === l.bookId)?.title }));
};
export const addLoan = (data) => {
  const newLoan = { id: generateId(), ...data, status: 'borrowed' };
  loans.push(newLoan);
  return newLoan;
};
export const hasActiveLoans = (bookId) => loans.some(l => l.bookId === bookId && l.status === 'borrowed');

// --- CATEGORIES ---
export const getCategoryById = (id) => categories.find(c => c.id === id);
export const categoryHasBooks = (catId) => books.some(b => b.categoryId === catId);