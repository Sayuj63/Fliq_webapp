'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import img1 from '@/assets/2a1713375a9fcca98c14854fdc073ad10a805252.png';
import img2 from '@/assets/2fbb4b5b6b7e4ebcd6932f03130b9b1bccdebe66.png';
import img3 from '@/assets/3dc78f8a3d9b00e068bbcb60f94bcd32e92c9278.png';
import img4 from '@/assets/5cab0d37d2daa52367d3e617b9fab9c2c9d9a064.png';
import img5 from '@/assets/5f203298d21c4788fba205e61bb15150404e9ff1.png';
import img6 from '@/assets/9e24bba92d104000b2e71b54dd33cdfbf4e74f64.png';
import img7 from '@/assets/15e8c072342a1f86e06085867dfc358cae89603b.png';
import img8 from '@/assets/17afe8c57fd1b602077d3670792d16954af82ef9.png';
import img9 from '@/assets/046f7fe75e81028a8f550d4c8f4cfb0c5e4591a0.png';
import img10 from '@/assets/58d8a1d515905c641a09177df9b1c1a954148527.png';
import img11 from '@/assets/8587da520180c9ed1e49351b5cd9677985ff7c33.png';
import img12 from '@/assets/94413b103be211631ff406e6f61b4152645184d8.png';
import img13 from '@/assets/94860fa800aa16fb125c2de62558ce725563dc63.png';
import img14 from '@/assets/a39ff6bdb907bb9957de9efcaf1902000f13738f.png';
import img15 from '@/assets/a646f05734bc96f19ffc15873c38c3f703775c51.png';
import img16 from '@/assets/a08467303043ca27c7e6ac6a7c5b0f1307daab2a.png';
import img17 from '@/assets/bdbb9676753e328ef1befec6eb046ddc3d61972d.png';
import img18 from '@/assets/c6a609c02ef177687e656f21d599d3df4f8b848a.png';
import img19 from '@/assets/d1f56b5a3fe755f0e52ed16a637ddb730bcbf8cf.png';
import img20 from '@/assets/e35182ebac86c6b580d8a093bea2dd0e01dac4e6.png';

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
];


interface CollegeCardProps {
  name: string;
  rank: string;
  match: string;
  isPremium?: boolean;
  imageUrl: StaticImageData;
}

interface CollegeInfoCardProps {
  name: string;
  match: string;
  type: 'Target' | 'Safety' | 'Reach';
  imageUrl: StaticImageData;
}

const CollegeInfoCard: React.FC<CollegeInfoCardProps> = ({ name, match, type, imageUrl }) => (
  <div className="flex flex-col w-56 flex-shrink-0">
    {/* Image */}
    <div className="bg-gray-700 rounded-lg h-28 mb-2 overflow-hidden flex items-center justify-center">
      <Image src={imageUrl} alt={name} className="object-cover w-full h-full" width={224} height={112} />
    </div>
    <h3 className="text-white font-medium text-sm truncate">{name}</h3>
    <p className="text-gray-400 text-xs">
      Match: {match}, <span className={type === 'Target' ? 'text-yellow-400' : type === 'Safety' ? 'text-green-400' : 'text-red-400'}>{type}</span>
    </p>
  </div>
);

const CollegeCard: React.FC<CollegeCardProps> = ({ name, rank, match, imageUrl }) => (
  <div className="w-64 flex-shrink-0 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    {/* Image */}
    <div className="h-32 w-full bg-gray-700 flex items-center justify-center text-gray-400">
      <Image src={imageUrl} alt={name} className="object-cover w-full h-full" width={256} height={128} />
    </div>
    {/* Box only around text and button */}
    <div className="bg-[#1e2125] p-4">
      <h3 className="text-white font-medium text-base truncate">{name}</h3>
      <div className="flex justify-between items-center mt-1">
        <p className="text-gray-400 text-sm">{rank}</p>
        <p className="text-blue-400 text-sm font-medium">Match: {match}</p>
      </div>
      <button className="mt-3 w-full bg-[#293039] hover:bg-[#334155] text-white py-2.5 rounded-full text-sm font-medium transition-colors">
        View Roadmap
      </button>
    </div>
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
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">Smart matches</h2>
              <div className="relative group">
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="How these matches are built"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <h3 className="font-bold text-white mb-2">How These Matches Are Built</h3>
                  <p className="text-gray-300">
                    We use your GPA, intended major, financial preferences, and 40+ personal signals to generate a ranked match list using verified admit data from real universities and 5,000+ successful applications. These aren't guesses — they're strategy-backed insights.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              Backed by 5,000+ successful applications and real admit data — Fliq builds your list using verified university insights, not just random rankings.
            </p>
          </div>
          <div className="relative">
            <div className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide">
              {recommendedColleges.map((college, index) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <div key={index} className="flex-shrink-0">
      <CollegeCard {...college} imageUrl={randomImage} />
    </div>
  );
})}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-[#0d1117] pointer-events-none"></div>
          </div>
        </section>

        {/* Target & Safety Schools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Target & Safety Schools</h2>
          <div className="relative">
            <div className="flex space-x-8 pb-4 overflow-x-auto scrollbar-hide px-4">
              {targetSafetyColleges.map((college, index) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <CollegeInfoCard key={index} {...college} imageUrl={randomImage} />
  );
})}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-[#0d1117] pointer-events-none"></div>
          </div>
        </section>

        {/* Reach Colleges (Premium) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Reach Colleges (Premium)</h2>
          <div className="flex flex-row flex-nowrap gap-6 w-full overflow-x-auto scrollbar-hide pb-2" style={{WebkitOverflowScrolling: 'touch'}}>
            {[
              {
                name: 'University of Illinois at Urbana-Champaign',
                match: '70%',
                type: 'Reach',
              },
              {
                name: 'Georgia Institute of Technology',
                match: '65%',
                type: 'Reach',
              },
              {
                name: 'Purdue University',
                match: '60%',
                type: 'Reach',
              },
              {
                name: 'University of California, Los Angeles',
                match: '68%',
                type: 'Reach',
              },
              {
                name: 'University of Michigan',
                match: '66%',
                type: 'Reach',
              },
            ].map((college) => {
              const randomImage = images[Math.floor(Math.random() * images.length)];
              return (
                <div
                  key={college.name}
                  className="bg-[#1e2125] flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[280px] max-w-[340px] w-full rounded-[24px]"
                  style={{height: '220px', borderRadius: '24px'}}>
                  <div className="w-full overflow-hidden rounded-t-[24px]" style={{height: '100px'}}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="relative w-full h-full" style={{height: '100px'}}>
                        <Image
                          src={randomImage}
                          alt={college.name}
                          className="object-cover w-full h-full filter blur-[3px]"
                          fill
                          style={{objectFit: 'cover', borderTopLeftRadius: '24px', borderTopRightRadius: '24px'}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between" style={{borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px'}}>
                    <h3 className="text-white font-medium text-base mb-2 truncate">{college.name}</h3>
                    <div className="flex justify-between items-center mt-auto">
                      <p className="text-gray-400 text-sm">Match: {college.match}</p>
                      <span className="text-red-400 text-xs font-semibold">{college.type}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Explore More Colleges */}
        <section className="mb-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white mb-4">Explore More Colleges</h2>
            
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
            {moreColleges.map((college, index) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <div key={index} className="flex flex-col w-full flex-shrink-0">
      <div className="bg-gray-700 rounded-lg h-28 mb-2 overflow-hidden flex items-center justify-center">
        <Image src={randomImage} alt={college} className="object-cover w-full h-full" width={224} height={112} />
      </div>
      <h3 className="text-white font-medium text-sm text-center">{college}</h3>
    </div>
  );
})}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
