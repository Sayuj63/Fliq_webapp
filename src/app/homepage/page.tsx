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
  type?: 'Target' | 'Safety' | 'Reach';
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
    <div className="bg-gray-900 rounded-lg h-28 mb-2 overflow-hidden flex items-center justify-center">
      <Image src={imageUrl} alt={name} className="object-cover w-full h-full" width={224} height={112} />
    </div>
    <h3 className="text-white font-medium text-sm truncate">{name}</h3>
    <p className="text-gray-400 text-xs">
      Match: {match}, <span className={type === 'Target' ? 'text-white' : type === 'Safety' ? 'text-white' : 'text-white'}>{type}</span>
    </p>
  </div>
);

const CollegeCard: React.FC<CollegeCardProps> = ({ name, rank, match, imageUrl, type = 'Target' }) => {
  // Extract the main part of the university name (before the first comma or parenthesis)
  const displayName = name.split(',')[0].split('(')[0].trim();
  const isLongName = displayName.length > 20;
  
  return (
    <div className="w-72 flex-shrink-0 bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* College Image */}
      <div className="h-40 w-full bg-gray-900 relative overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Match Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
          <span className="text-blue-400 font-bold text-sm">{match.replace('%', '')}</span>
          <span className="text-blue-300 text-xs ml-0.5">%</span>
          <span className="text-gray-300 text-xs ml-1">match</span>
        </div>
        
        {/* Type Badge */}
        {type !== 'Safety' && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            type === 'Target' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-800/90 text-gray-300'
          }`}>
            {type}
          </div>
        )}
      </div>
      
      {/* College Info */}
      <div className="p-5">
        {/* University Name */}
        <h3 
          className={`font-bold text-white mb-2 leading-tight ${
            isLongName ? 'text-xl' : 'text-2xl'
          }`}
          style={{
            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: '1.2'
          }}
        >
          {displayName}
        </h3>
        
        {/* University Location */}
        <p className="text-gray-400 text-sm mb-4">
          {name.includes('(') ? name.split('(')[1].replace(')', '') : 'United States'}
        </p>
        
        {/* Rank and Action */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-800">
          <div className="flex items-center">
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
              {rank}
            </span>
          </div>
          
          <button 
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center group"
            aria-label="View details"
          >
            <span className="text-sm font-medium mr-1">View</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// List of top 10 colleges for the dropdown
const topColleges = [
  'Massachusetts Institute of Technology (MIT)',
  'Stanford University',
  'Harvard University',
  'California Institute of Technology (Caltech)',
  'University of Oxford',
  'ETH Zurich',
  'University of Cambridge',
  'Imperial College London',
  'University of Chicago',
  'University of Pennsylvania'
];

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState<string[]>(topColleges);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredColleges(
      topColleges.filter(college => 
        college.toLowerCase().includes(query.toLowerCase())
      )
    );
    setShowDropdown(true);
  };

  const handleCollegeSelect = (college: string) => {
    setSearchQuery(college);
    setShowDropdown(false);
    // Here you can add navigation or other actions when a college is selected
  };
  console.log('HomePage component rendered');
  const recommendedColleges = [
    { name: 'Stanford University', rank: 'QS: 5', match: '95%', type: 'Target' as const },
    { name: 'Harvard University', rank: 'QS: 4', match: '92%', type: 'Target' as const },
    { name: 'MIT', rank: 'QS: 1', match: '90%', type: 'Reach' as const },
    { name: 'Caltech', rank: 'QS: 2', match: '88%', type: 'Reach' as const },
    { name: 'University of Oxford', rank: 'QS: 3', match: '85%', type: 'Target' as const },
    { name: 'ETH Zurich', rank: 'QS: 7', match: '82%', type: 'Reach' as const },
    { name: 'University of Cambridge', rank: 'QS: 6', match: '80%', type: 'Target' as const },
    { name: 'Imperial College London', rank: 'QS: 8', match: '78%', type: 'Target' as const },
    { name: 'UCL', rank: 'QS: 9', match: '75%', type: 'Reach' as const },
    { name: 'University of Chicago', rank: 'QS: 10', match: '72%', type: 'Reach' as const },
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
    <div className="min-h-screen bg-black text-white">
      {/* Search Section */}
      <section className="py-16 px-4 flex flex-col items-center justify-center bg-black">
        <h2 className="text-3xl md:text-4xl font-light text-gray-200 mb-8 text-center">
          explore your dream college
        </h2>
        <div className="relative w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="type a college name to search"
              className="w-full bg-gray-900 text-white rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Dropdown */}
          {showDropdown && filteredColleges.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-gray-900 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-auto">
              {filteredColleges.map((college, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-800 cursor-pointer"
                  onMouseDown={() => handleCollegeSelect(college)}
                >
                  <p className="text-white">{college}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 bg-black">
        {/* Smart Matches Section */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Your Smart Matches</h2>
            <p className="text-gray-300 text-lg">
              Handpicked based on your academics, goals, and what you value most
            </p>
          </div>
          
          <div className="relative">
            <div className="flex space-x-6 pb-8 overflow-x-auto scrollbar-hide px-2">
              {recommendedColleges.map((college, index) => {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                return (
                  <div key={index} className="flex-shrink-0">
                    <CollegeCard {...college} imageUrl={randomImage} />
                  </div>
                );
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-black pointer-events-none"></div>
          </div>
        </section>

        {/* Target & Safety Schools */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Your Safe Bets & Solid Shots</h2>
            <p className="text-gray-300 text-lg">
              Balanced picks where your profile stands strong — and where admits are likely
            </p>
          </div>
          <div className="relative">
            <div className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide px-2">
              {targetSafetyColleges.map((college, index) => {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                return (
                  <div key={index} className="flex-shrink-0">
                    <CollegeInfoCard {...college} imageUrl={randomImage} />
                  </div>
                );
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-black pointer-events-none"></div>
          </div>
        </section>

        {/* Reach Colleges (Premium) */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Out of Reach? Not Anymore</h2>
            <p className="text-gray-300 text-lg">
              These schools look tough — until you see how people just like you got in.
            </p>
          </div>
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
        <section className="mb-16 w-full">
          <div className="w-full bg-black border border-gray-800 rounded-2xl p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-white">Explore fliq+</h2>
              <button className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
                Unlock Playbook
              </button>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xl text-gray-300 mb-2">
                How they got in (when no one thought they would)
              </p>
              <p className="text-gray-400 text-sm">
                Get exact steps, strategies and timelines from current admits who had a profile like yours
              </p>
            </div>
          </div>
        </section>

        {/* Explore More Colleges */}
        {/* <section className="mb-12">
          <div className="flex flex-col gap-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Just Outside Your Comfort Zone</h2>
            <p className="text-gray-300 text-lg">
            These schools said yes to students just like you
            </p>
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
        </section> */}


      </main>
    </div>
  );
};

export default HomePage;
