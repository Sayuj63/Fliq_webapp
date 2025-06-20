'use client';

import React from 'react';
import Link from 'next/link';

interface CollegeCardProps {
  name: string;
  rank: string;
  match: string;
  isPremium?: boolean;
}

interface CollegeInfoCardProps {
  name: string;
  match: string;
  type: 'Target' | 'Safety' | 'Reach';
}

const CollegeInfoCard: React.FC<CollegeInfoCardProps> = ({ name, match, type }) => (
  <div className="flex flex-col w-56 flex-shrink-0">
    {/* Image Placeholder */}
    <div className="bg-gray-700 rounded-lg h-28 mb-2 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
    </div>
    <h3 className="text-white font-medium text-sm truncate">{name}</h3>
    <p className="text-gray-400 text-xs">
      Match: {match}, <span className={type === 'Target' ? 'text-yellow-400' : type === 'Safety' ? 'text-green-400' : 'text-red-400'}>{type}</span>
    </p>
  </div>
);

const CollegeCard: React.FC<CollegeCardProps> = ({ name, rank, match, isPremium = false }) => (
  <div className="bg-[#1e2125] rounded-xl p-4 w-64 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    {/* Image Placeholder */}
    <div className="bg-gray-700 rounded-lg h-32 mb-3 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
    </div>
    
    <h3 className="text-white font-medium text-base truncate">{name}</h3>
    <div className="flex justify-between items-center mt-1">
      <p className="text-gray-400 text-sm">{rank}</p>
      <p className="text-blue-400 text-sm font-medium">Match: {match}</p>
    </div>
    <button className="mt-3 w-full bg-[#293039] hover:bg-[#334155] text-white py-2.5 rounded-full text-sm font-medium transition-colors">
      View Roadmap
    </button>
  </div>
);

const HomePage: React.FC = () => {
  console.log('HomePage component rendered');
  const recommendedColleges = [
    { name: 'Stanford University', rank: 'QS Ranking: 5', match: '95%' },
    { name: 'Harvard University', rank: 'QS Ranking: 4', match: '92%' },
    { name: 'MIT', rank: 'QS Ranking: 1', match: '90%' },
    { name: 'Caltech', rank: 'QS Ranking: 2', match: '88%' },
    { name: 'University of Oxford', rank: 'QS Ranking: 3', match: '85%' },
    { name: 'ETH Zurich', rank: 'QS Ranking: 7', match: '82%' },
    { name: 'University of Cambridge', rank: 'QS Ranking: 6', match: '80%' },
    { name: 'Imperial College London', rank: 'QS Ranking: 8', match: '78%' },
    { name: 'UCL', rank: 'QS Ranking: 9', match: '75%' },
    { name: 'University of Chicago', rank: 'QS Ranking: 10', match: '72%' },
  ];

  const targetSafetyColleges: Array<{name: string, match: string, type: 'Target' | 'Safety' | 'Reach'}> = [
    { name: 'University of California, Berkeley', match: '98%', type: 'Safety' },
    { name: 'University of Michigan', match: '92%', type: 'Target' },
    { name: 'University of Texas at Austin', match: '95%', type: 'Safety' },
    { name: 'University of Washington', match: '90%', type: 'Target' },
    { name: 'University of Illinois at Urbana-Champaign', match: '93%', type: 'Safety' },
  ];

  const reachColleges: Array<{name: string, match: string, type: 'Target' | 'Safety' | 'Reach'}> = [
    { name: 'University of Texas at Austin', match: '88%', type: 'Reach' },
    { name: 'University of Illinois at Urbana-Champaign', match: '82%', type: 'Reach' },
    { name: 'Georgia Institute of Technology', match: '85%', type: 'Reach' },
    { name: 'Cornell University', match: '78%', type: 'Reach' },
    { name: 'Duke University', match: '80%', type: 'Reach' },
    { name: 'Northwestern University', match: '75%', type: 'Reach' },
    { name: 'Johns Hopkins University', match: '72%', type: 'Reach' },
    { name: 'Brown University', match: '70%', type: 'Reach' },
    { name: 'Dartmouth College', match: '68%', type: 'Reach' },
    { name: 'Vanderbilt University', match: '65%', type: 'Reach' },
  ];

  const moreColleges = [
    'Purdue University',
    'University of Wisconsin-Madison',
    'Pennsylvania State University',
    'Ohio State University',
    'University of Florida',
    'University of Washington',
    'University of North Carolina',
    'University of Southern California',
    'New York University',
    'Boston University'
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
    

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recommended Colleges */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Recommended Colleges</h2>
            <button className="text-blue-400 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="relative">
            <div className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide">
              {recommendedColleges.map((college, index) => (
                <div key={index} className="flex-shrink-0">
                  <CollegeCard {...college} />
                </div>
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-[#0d1117] pointer-events-none"></div>
          </div>
        </section>

        {/* Target & Safety Schools */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Target & Safety Schools</h2>
            <button className="text-blue-400 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="relative">
            <div className="flex space-x-8 pb-4 overflow-x-auto scrollbar-hide px-4">
              {targetSafetyColleges.map((college, index) => (
                <CollegeInfoCard key={index} {...college} />
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-[#0d1117] pointer-events-none"></div>
          </div>
        </section>

        {/* Unlock Reach Colleges */}
        <section className="mb-8 p-6 border border-white/20 rounded-[2%] ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white text-xl font-medium">Want to unlock Reach Colleges?</h3>
              <p className="text-gray-300">Try EduPath+</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap">
              Learn More
            </button>
          </div>
        </section>

        {/* Explore More Colleges */}
        <section className="mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Explore More Colleges</h2>
              <button className="text-blue-400 text-sm font-medium hover:underline">
                View All
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <select className="bg-[#1e2125] text-white text-xs rounded-full px-4 py-1.5 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-8">
                <option value="">Country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
              </select>
              
              <select className="bg-[#1e2125] text-white text-xs rounded-full px-4 py-1.5 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-8">
                <option value="">Major</option>
                <option value="cs">Computer Science</option>
                <option value="eng">Engineering</option>
              </select>
              
              <select className="bg-[#1e2125] text-white text-xs rounded-full px-4 py-1.5 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-8">
                <option value="">Ranking</option>
                <option value="top50">Top 50</option>
                <option value="top100">Top 100</option>
              </select>
              
              <select className="bg-[#1e2125] text-white text-xs rounded-full px-4 py-1.5 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-8">
                <option value="">Budget</option>
                <option value="lt20k">Under $20k</option>
                <option value="20k-40k">$20k - $40k</option>
              </select>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6 px-4">
            {moreColleges.map((college, index) => (
              <div key={index} className="flex flex-col w-full flex-shrink-0">
                <div className="bg-gray-700 rounded-lg h-28 mb-2 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-medium text-sm text-center">{college}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
