'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data for mentors
const MOCK_MENTORS = {
  harvard: [
    {
      id: 1,
      name: 'Alex Johnson',
      major: 'Computer Science',
      year: 'Senior',
      university: 'Harvard University',
      image: '/placeholder-avatar.jpg',
      bio: 'CS major with focus on AI and Machine Learning. Happy to help with college applications!',
      gpa: '3.9/4.0',
      sat: '1580',
      extracurriculars: ['President of CS Club', 'Research Assistant', 'Varsity Tennis']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      major: 'Economics',
      year: 'Junior',
      university: 'Harvard University',
      image: '/placeholder-avatar.jpg',
      bio: 'Economics major with interest in public policy. Can help with essay writing and interview prep.',
      gpa: '3.95/4.0',
      sat: '1560',
      extracurriculars: ['Harvard Political Review', 'Debate Team', 'Model UN']
    }
  ],
  mit: [
    {
      id: 3,
      name: 'Michael Rodriguez',
      major: 'Mechanical Engineering',
      year: 'Sophomore',
      university: 'Massachusetts Institute of Technology',
      image: '/placeholder-avatar.jpg',
      bio: 'Passionate about robotics and renewable energy. Can share tips on STEM applications.',
      gpa: '5.0/5.0',
      sat: '1600',
      extracurriculars: ['Robotics Team', 'Solar Car Team', 'Tutor']
    },
    {
      id: 4,
      name: 'Priya Patel',
      major: 'Bioengineering',
      year: 'Senior',
      university: 'Massachusetts Institute of Technology',
      image: '/placeholder-avatar.jpg',
      bio: 'Pre-med student with research experience. Happy to help with STEM applications and interviews.',
      gpa: '4.8/5.0',
      sat: '1590',
      extracurriculars: ['Research Lab', 'HackMIT', 'Dance Team']
    }
  ],
  stanford: [
    {
      id: 5,
      name: 'Ryan Kim',
      major: 'Computer Science',
      year: 'Junior',
      university: 'Stanford University',
      image: '/placeholder-avatar.jpg',
      bio: 'CS major with startup experience. Can help with tech interviews and college essays.',
      gpa: '3.98/4.0',
      sat: '1570',
      extracurriculars: ['Stanford CS+Social Good', 'Hackathon Organizer', 'Tennis Club']
    },
    {
      id: 6,
      name: 'Emily Zhang',
      major: 'Human Biology',
      year: 'Senior',
      university: 'Stanford University',
      image: '/placeholder-avatar.jpg',
      bio: 'Pre-med student passionate about global health. Can help with pre-med applications and interviews.',
      gpa: '4.0/4.0',
      sat: '1550',
      extracurriculars: ['Stanford Pre-Med Society', 'Hospital Volunteer', 'Research Assistant']
    }
  ]
};

type Mentor = typeof MOCK_MENTORS.harvard[0];

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);
    
    // Simple search logic - checks if query matches any university keywords
    const query = searchQuery.toLowerCase();
    let results: Mentor[] = [];
    
    if (query.includes('harvard')) {
      results = [...results, ...MOCK_MENTORS.harvard];
    }
    if (query.includes('mit') || query.includes('massachusetts')) {
      results = [...results, ...MOCK_MENTORS.mit];
    }
    if (query.includes('stanford')) {
      results = [...results, ...MOCK_MENTORS.stanford];
    }
    
    setFilteredMentors(results);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Mentors</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by university (e.g., Harvard, MIT, Stanford)"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Results */}
        <div>
          {hasSearched && (
            <h2 className="text-2xl font-semibold mb-6">
              {filteredMentors.length > 0 
                ? `Found ${filteredMentors.length} mentors` 
                : 'No mentors found. Try searching for "Harvard", "MIT", or "Stanford"'}
            </h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div key={mentor.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-colors">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4">
                      <Image 
                        src={mentor.image} 
                        alt={mentor.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{mentor.name}</h3>
                      <p className="text-blue-400">{mentor.university}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-300">
                    <p><span className="font-medium text-white">Major:</span> {mentor.major}</p>
                    <p><span className="font-medium text-white">Year:</span> {mentor.year}</p>
                    <p><span className="font-medium text-white">GPA:</span> {mentor.gpa}</p>
                    <p><span className="font-medium text-white">SAT:</span> {mentor.sat}</p>
                    
                    <div>
                      <p className="font-medium text-white mb-1">Extracurriculars:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {mentor.extracurriculars.map((activity, idx) => (
                          <li key={idx} className="text-gray-400">{activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="pt-2 border-t border-gray-800 mt-4">{mentor.bio}</p>
                  </div>
                </div>
                <div className="bg-gray-800 px-6 py-3">
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                    Message {mentor.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
