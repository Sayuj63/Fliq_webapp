'use client';

import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Scholarship = {
  id: number;
  title: string;
  amount: string;
  deadline: string;
  isEligible: boolean;
};

const ScholarshipsPage = () => {
  const [activeTab, setActiveTab] = React.useState('matched');
  const [showEligibleOnly, setShowEligibleOnly] = React.useState(true);

  const scholarships: Scholarship[] = [
    {
      id: 1,
      title: 'Academic Excellence Scholarship',
      amount: '$5,000',
      deadline: '2024-08-15',
      isEligible: true,
    },
    {
      id: 2,
      title: 'Community Leadership Award',
      amount: '$2,500',
      deadline: '2024-09-01',
      isEligible: true,
    },
    {
      id: 3,
      title: 'STEM Innovation Grant',
      amount: '$3,000',
      deadline: '2024-08-20',
      isEligible: true,
    },
    {
      id: 4,
      title: 'Arts and Creativity Fund',
      amount: '$1,500',
      deadline: '2024-08-25',
      isEligible: true,
    },
    {
      id: 5,
      title: 'Global Studies Scholarship',
      amount: '$4,000',
      deadline: '2024-09-10',
      isEligible: true,
    },
    {
      id: 6,
      title: 'Future Leaders Program',
      amount: '$3,500',
      deadline: '2024-08-18',
      isEligible: true,
    },
    {
      id: 7,
      title: 'Healthcare Pioneers Grant',
      amount: '$2,000',
      deadline: '2024-08-22',
      isEligible: true,
    },
    {
      id: 8,
      title: 'Environmental Sustainability Award',
      amount: '$4,500',
      deadline: '2024-09-05',
      isEligible: true,
    },
    {
      id: 9,
      title: 'Business Innovation Scholarship',
      amount: '$1,000',
      deadline: '2024-08-28',
      isEligible: true,
    },
    {
      id: 10,
      title: 'Technology Advancement Fund',
      amount: '$5,500',
      deadline: '2024-09-15',
      isEligible: true,
    }
  ];

  const filteredScholarships = showEligibleOnly
    ? scholarships.filter((s) => s.isEligible)
    : scholarships;

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Scholarships</h1>
        <p className="text-[#9CA3AF] text-sm">
          Explore and manage financial aid opportunities
        </p>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-[#1F2937] mb-6">
        {[
          { id: 'matched', label: 'Matched Scholarships' },
          { id: 'browse', label: 'Browse All' },
          { id: 'saved', label: 'Saved Applications' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? 'text-white border-b-2 border-[#3B82F6]'
                : 'text-[#9CA3AF]'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-[#E5E7EB] mr-2">Filters</span>
          {['Merit-based/Need-based', 'Country', 'Program Level'].map((filter) => (
            <button
              key={filter}
              className="flex items-center bg-[#1F2937] text-[#E5E7EB] text-sm px-4 py-2 rounded-full"
            >
              {filter}
              <FiChevronDown className="ml-1" />
            </button>
          ))}
        </div>
        
        <label className="flex items-center gap-2 text-sm text-[#E5E7EB] cursor-pointer">
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              checked={showEligibleOnly}
              onChange={() => setShowEligibleOnly(!showEligibleOnly)}
              className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <span className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${
              showEligibleOnly ? 'bg-blue-500' : 'bg-gray-400'
            }`}></span>
          </div>
          Show only eligible scholarships
        </label>
      </div>

      {/* Scholarship List */}
      <div className="space-y-6">
        {filteredScholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="bg-[#161B22] p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h3 className="font-bold text-white">{scholarship.title}</h3>
              <p className="text-sm text-[#9CA3AF]">
                Amount: {scholarship.amount} | Deadline: {scholarship.deadline}
              </p>
            </div>
            <button className="bg-[#1F2937] text-white text-sm px-5 py-2 rounded-full whitespace-nowrap">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipsPage;
