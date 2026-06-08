'use client';

import { useState } from 'react';
import SignatureGenerator from './SignatureGenerator';
import NDAModal from './NDAModal';

interface FormData {
  name: string;
  email: string;
  company: string;
  purpose: string;
  citizenship: string;
  ndaAgreed: boolean;
}

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'India',
  'China',
  'Japan',
  'South Korea',
  'Singapore',
  'Brazil',
  'Mexico',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Ireland',
  'Spain',
  'Italy',
  'Belgium',
  'Austria',
  'Poland',
  'Czech Republic',
  'Hungary',
  'Romania',
  'Portugal',
  'Greece',
  'Turkey',
  'Israel',
  'United Arab Emirates',
  'Saudi Arabia',
  'South Africa',
  'New Zealand',
  'Other',
];

const PURPOSES = [
  'Business Meeting',
  'Interview',
  'Partner Discussion',
  'Investor Meeting',
  'Consulting',
  'Training',
  'Other',
];

export default function SignInForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    purpose: '',
    citizenship: '',
    ndaAgreed: false,
  });

  const [signature, setSignature] = useState<string>('');
  const [showNDAModal, setShowNDAModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNDAAgree = () => {
    setFormData(prev => ({ ...prev, ndaAgreed: true }));
    setShowNDAModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validation
    if (!formData.name || !formData.email || !formData.company || !formData.purpose || !formData.citizenship) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    if (!formData.ndaAgreed) {
      setErrorMessage('Please agree to the NDA');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    if (!signature) {
      setErrorMessage('Please generate your signature');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          signature,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        purpose: '',
        citizenship: '',
        ndaAgreed: false,
      });
      setSignature('');
    } catch (error) {
      setErrorMessage('Failed to submit. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Office Sign In</h1>
            <p className="text-gray-600">ORNN AI INC - Visitor Registration</p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Thank you for signing in!</p>
              <p className="text-green-600 text-sm mt-1">Your information has been recorded.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your company name"
                required
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of Visit *
              </label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="">Select purpose</option>
                {PURPOSES.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="citizenship" className="block text-sm font-medium text-gray-700 mb-2">
                Country of Citizenship *
              </label>
              <select
                id="citizenship"
                name="citizenship"
                value={formData.citizenship}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="">Select country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature *
              </label>
              <SignatureGenerator
                name={formData.name}
                onSignatureGenerated={setSignature}
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="nda"
                checked={formData.ndaAgreed}
                onChange={(e) => {
                  if (e.target.checked) {
                    setShowNDAModal(true);
                  } else {
                    setFormData(prev => ({ ...prev, ndaAgreed: false }));
                  }
                }}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="nda" className="ml-3 block text-sm text-gray-700">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowNDAModal(true)}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Non-Disclosure Agreement
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Sign In'}
            </button>
          </form>
        </div>

        <NDAModal
          isOpen={showNDAModal}
          onClose={() => setShowNDAModal(false)}
          onAgree={handleNDAAgree}
        />
      </div>
    </div>
  );
}