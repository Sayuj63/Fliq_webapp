'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Profile', href: '/profile' },
  { name: 'Preferences', href: '/profile/preferences' },
  { name: 'Calendar', href: '/profile/calendar' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfilePage() {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();
  
  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If user is not signed in, redirect to sign-in page
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h2>
          <a 
            href="/sign-in" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    name: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    bio: 'I own a computer.',
    portfolioLinks: ['']
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addPortfolioLink = () => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, '']
    }));
  };

  const updatePortfolioLink = (index: number, value: string) => {
    const newLinks = [...formData.portfolioLinks];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      portfolioLinks: newLinks
    }));
  };

  const removePortfolioLink = (index: number) => {
    const newLinks = formData.portfolioLinks.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      portfolioLinks: newLinks.length ? newLinks : ['']
    }));
  };

  return (

        <div className="mt-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            {/* Sidebar */}
            <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        isActive
                          ? 'bg-gray-900 text-blue-400 hover:bg-gray-800 hover:text-blue-400'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                        'group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Main content */}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              <section aria-labelledby="profile-section">
                <div className="shadow-lg sm:overflow-hidden sm:rounded-xl border border-gray-800">
                  <div className="bg-gray-900 py-6 px-4 sm:p-8 rounded-xl">
                    <h2 id="profile-section" className="text-xl font-semibold text-white">Profile</h2>
                    
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      {/* Username */}
                      <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                          Username
                        </label>
                        <div className="flex rounded-lg overflow-hidden shadow-sm">
                          <span className="inline-flex items-center px-4 py-3 bg-gray-800 border border-r-0 border-gray-700 text-gray-300 text-sm">
                            fliq.com/
                          </span>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="block w-full min-w-0 flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-3 text-sm rounded-r-lg transition duration-200"
                            placeholder="yourusername"
                          />
                        </div>
                      </div>

                      {/* Name */}
                      <div className="sm:col-span-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="Your full name"
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
                        </p>
                      </div>

                      {/* Email */}
                      <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="mt-1">
                          <select
                            id="email"
                            name="email"
                            className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            value={formData.email}
                            onChange={(e) => handleInputChange(e as any)}
                          >
                            <option className="bg-gray-800">{formData.email}</option>
                          </select>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                          Select a verified email to display
                        </p>
                        <p className="text-sm text-gray-400">
                          You can manage verified email addresses in your email settings.
                        </p>
                      </div>

                      {/* Bio */}
                      <div className="sm:col-span-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                          Bio
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                          Tell us who the real you. What you're building, chasing, failing at, proud of. We'll use it to find schools that actually fit you.
                        </p>
                      </div>

                      {/* Portfolio Links */}
                      <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-300">
                          Drop Your Internet Footprint (Yes, All of It)
                        </label>
                        <p className="mt-1 text-sm text-gray-400 mb-4">
                          Worked on stuff? add your portfolio links
                        </p>
                        
                        <div className="mt-4 space-y-4">
                          {formData.portfolioLinks.map((link, index) => (
                            <div key={index} className="flex space-x-2">
                              <input
                                type="text"
                                value={link}
                                onChange={(e) => updatePortfolioLink(index, e.target.value)}
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="https://yourportfolio.com"
                              />
                              {formData.portfolioLinks.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removePortfolioLink(index)}
                                  className="ml-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                          
                          <div>
                            <button
                              type="button"
                              onClick={addPortfolioLink}
                              className="inline-flex items-center px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 border border-gray-700"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Add URL
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-6 py-3 bg-transparent border-2 border-gray-700 text-white rounded-lg font-medium hover:bg-gray-800/50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-blue-500/20"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
  );
}
