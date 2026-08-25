import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image01 from '../../../assets/Studify_Image/Main Registration Container/Section - Left Side_ Informative/Learner focused.png';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState<'email' | 'reset'>('email');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return alert('Please enter your email address.');
    }

    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      setIsLoading(false);
      setMessage('If an account exists for this email, we have sent reset instructions.');
      setCurrentStep('reset');
    }, 700);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return alert('Please enter and confirm your new password.');
    }

    if (newPassword !== confirmPassword) {
      return alert('Passwords do not match.');
    }

    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Your password has been updated successfully.');
      setNewPassword('');
      setConfirmPassword('');
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute left-16 top-24 size-64 rounded-full bg-sky-700/10 blur-3xl" />
        <div className="absolute bottom-24 right-32 size-96 rounded-full bg-emerald-800/10 blur-3xl" />
      </div>

      <div className="flex max-w-4xl flex-1 items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="relative hidden min-h-[650px] flex-1 flex-col items-start justify-end overflow-hidden bg-gradient-to-br from-blue-600 to-sky-800 p-12 md:flex">
          <div
            className="pointer-events-none absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20"
            style={{ backgroundImage: `url(${Image01})` }}
          />

          <div className="z-10">
            <h3 className="mb-2 font-['Inter'] text-3xl font-bold text-white">Studify</h3>
            <p className="font-['Inter'] text-sm text-sky-100">
              Achieving professional fluency through AI-powered immersion and structured roadmaps.
            </p>
          </div>
        </div>

        <form
          onSubmit={currentStep === 'email' ? handleEmailSubmit : handleResetSubmit}
          className="flex flex-1 flex-col items-start justify-center gap-6 p-12"
        >
          <div className="flex flex-col items-start gap-2 self-stretch">
            <h2 className="font-['Inter'] text-2xl font-bold text-gray-900" style={{ color: '#151C27' }}>
              {currentStep === 'email' ? 'Forgot Password' : 'Create New Password'}
            </h2>
            <p className="font-['Inter'] text-sm text-gray-500">
              {currentStep === 'email'
                ? 'Enter your email and we will send you a link to reset your password.'
                : 'Set a new password for your account in a separate reset step.'}
            </p>
          </div>

          {currentStep === 'email' ? (
            <div className="flex w-full flex-col items-start gap-4 self-stretch">
              <div className="flex w-full flex-col gap-1.5 self-stretch">
                <label className="font-['Inter'] text-xs font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-transparent px-3.5 py-2.5 text-sm text-gray-900 focus:border-sky-700 focus:outline-none"
                  disabled={isLoading}
                  required
                />
              </div>

              {message && (
                <p className="w-full text-center text-xs font-medium text-emerald-600">{message}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg bg-sky-700 px-4 py-3 shadow-sm transition-colors hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="font-['Inter'] text-sm font-semibold text-white">
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex w-full flex-col items-start gap-4 self-stretch">
              <div className="flex w-full flex-col gap-1.5 self-stretch">
                <label className="font-['Inter'] text-xs font-semibold text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-transparent px-3.5 py-2.5 text-sm text-gray-900 focus:border-sky-700 focus:outline-none"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="flex w-full flex-col gap-1.5 self-stretch">
                <label className="font-['Inter'] text-xs font-semibold text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-transparent px-3.5 py-2.5 text-sm text-gray-900 focus:border-sky-700 focus:outline-none"
                  disabled={isLoading}
                  required
                />
              </div>

              {message && (
                <p className="w-full text-center text-xs font-medium text-emerald-600">{message}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg bg-sky-700 px-4 py-3 shadow-sm transition-colors hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="font-['Inter'] text-sm font-semibold text-white">
                  {isLoading ? 'Updating...' : 'Update Password'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep('email');
                  setMessage('');
                }}
                className="w-full text-center text-sm font-semibold text-sky-700 hover:underline"
              >
                Back
              </button>
            </div>
          )}

          <div className="w-full pt-2 text-center">
            <span className="font-['Inter'] text-sm font-normal text-gray-700">Remember your password? </span>
            <span
              onClick={() => navigate('/login')}
              className="cursor-pointer font-['Inter'] text-sm font-semibold text-sky-700 hover:underline"
            >
              Sign In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
