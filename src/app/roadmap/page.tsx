'use client';

import React from 'react';
import Image from 'next/image';

const RoadmapPage = () => {
  const roadmaps = [
    {
      id: 1,
      university: 'University of California, Berkeley',
      progress: 67,
      pendingTasks: '2 tasks pending this week',
      image: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      university: 'Stanford University',
      progress: 40,
      pendingTasks: '3 tasks pending this week',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      university: 'MIT',
      progress: 43,
      pendingTasks: '1 task pending this week',
      image: 'https://images.unsplash.com/photo-1523050853548-5f4b7a2e2f6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      university: 'Caltech',
      progress: 25,
      pendingTasks: '4 tasks pending this week',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#EDEDED] p-4 sm:p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">My Roadmaps</h1>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1F2937] hover:bg-[#374151] text-[#E5E7EB] rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap">
          <span className="text-base">+</span>
          <span>Add new university</span>
        </button>
      </div>

      {/* Filters - Horizontal scroll on mobile */}
      <div className="mb-6 pb-2 -mx-2 sm:mx-0 overflow-x-auto">
        <div className="flex gap-2 min-w-max px-2 sm:px-0">
          <div className="relative min-w-[120px]">
            <select className="appearance-none bg-[#1F2937] text-[#E5E7EB] rounded-full pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full">
              <option>Deadline</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="relative min-w-[100px]">
            <select className="appearance-none bg-[#1F2937] text-[#E5E7EB] rounded-full pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full">
              <option>Status</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="relative min-w-[120px]">
            <select className="appearance-none bg-[#1F2937] text-[#E5E7EB] rounded-full pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full">
              <option>University</option>
              <option>UC Berkeley</option>
              <option>Stanford</option>
              <option>MIT</option>
              <option>Caltech</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Cards */}
      <div className="space-y-4 sm:space-y-6">
        {roadmaps.map((roadmap) => (
          <div key={roadmap.id} className="bg-[#161B22] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1 order-2 sm:order-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#9CA3AF] block">Roadmap</span>
                  <h3 className="text-white text-base sm:text-lg font-semibold mt-0.5 line-clamp-2">{roadmap.university}</h3>
                </div>
                {/* University logo/image on mobile */}
                <div className="sm:hidden w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={roadmap.image}
                    alt={roadmap.university}
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              <p className="text-[#9CA3AF] text-sm mt-2">You have {roadmap.pendingTasks}</p>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-[#9CA3AF]">Progress</span>
                  <span className="text-[#E5E7EB] font-medium">{roadmap.progress}%</span>
                </div>
                <div className="w-full bg-[#2D3748] rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${roadmap.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <button className="mt-4 w-full sm:w-auto bg-[#1F6FEB] hover:bg-blue-600 text-white text-sm font-medium rounded-full px-4 py-2 transition-colors">
                View Roadmap
              </button>
            </div>
            
            {/* University logo/image on desktop */}
            <div className="hidden sm:block w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 order-1 sm:order-2">
              <Image
                src={roadmap.image}
                alt={roadmap.university}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
