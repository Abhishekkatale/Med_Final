import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '@shared/schema';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient'); // Use string literal instead of enum access
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Helper function to validate role
  const isValidRole = (value: string): value is UserRole => {
    return UserRole.options.includes(value as UserRole);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    if (isValidRole(selectedRole)) {
      setRole(selectedRole);
      setError(null); // Clear any previous role-related errors
    } else {
      setError('Invalid role selected');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // Comprehensive validation
    if (!username?.trim()) {
      setError("Username is required.");
      setIsLoading(false);
      return;
    }

    if (!password?.trim()) {
      setError("Password is required.");
      setIsLoading(false);
      return;
    }

    if (!name?.trim()) {
      setError("Full name is required.");
      setIsLoading(false);
      return;
    }

    if (!role || !isValidRole(role)) {
      setError("Please select a valid role.");
      setIsLoading(false);
      return;
    }

    // Additional validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
          role,
          name: name.trim(),
          title: "",
          organization: "",
          specialty: "",
          location: "",
          initials: ""
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Signup failed: ${response.status}`);
      }
      
      // Validate response data
      if (!data.token || !data.user) {
        throw new Error('Invalid response from server');
      }
      
      // Show success message
      setSuccess("Registration successful! Redirecting to dashboard...");
      
      // Call signup with validated data
      await signup(data.token, data.user);
      
      // Delay navigation to show success message
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
      
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Choose a username (min 3 characters)"
              minLength={3}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter password (min 6 characters)"
              minLength={6}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              required
              disabled={isLoading}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {UserRole.options.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md flex items-center animate-fade-in">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center animate-fade-in">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium transition-colors">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;