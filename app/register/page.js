'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Library, User, Mail, Lock } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';
import { register } from '@/lib/auth'; // <--- Import dari sini

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password tidak sama!');
      return;
    }

    setLoading(true);

    try {
      // --- PERUBAHAN UTAMA DI SINI ---
      // Panggil fungsi register() lokal, bukan fetch API
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      toast.success('Registrasi berhasil! Silakan login.');
      router.push('/login');
    } catch (error) {
      toast.error(error.message || 'Gagal mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <Library className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Buat Akun Baru
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Nama Lengkap"
              name="name"
              icon={<User className="w-5 h-5" />}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
              icon={<Lock className="w-5 h-5" />}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" fullWidth loading={loading}>
            Daftar
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Sudah punya akun? </span>
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Masuk disini
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
