'use client';

import React from 'react';
import Image from 'next/image';

// Import local assets
import berkeleyImage from '@/assets/2a1713375a9fcca98c14854fdc073ad10a805252.png';
import stanfordImage from '@/assets/2fbb4b5b6b7e4ebcd6932f03130b9b1bccdebe66.png';
import mitImage from '@/assets/3dc78f8a3d9b00e068bbcb60f94bcd32e92c9278.png';
import caltechImage from '@/assets/5cab0d37d2daa52367d3e617b9fab9c2c9d9a064.png';

const RoadmapPage = () => {
  const roadmaps = [
    {
      id: 1,
      university: 'University of California, Berkeley',
      progress: 67,
      pendingTasks: '2 tasks pending this week',
      image: berkeleyImage
    },
    {
      id: 2,
      university: 'Stanford University',
      progress: 40,
      pendingTasks: '3 tasks pending this week',
      image: stanfordImage
    },
    {
      id: 3,
      university: 'MIT',
      progress: 43,
      pendingTasks: '1 task pending this week',
      image: mitImage
    },
    {
      id: 4,
      university: 'Caltech',
      progress: 25,
      pendingTasks: '4 tasks pending this week',
      image: caltechImage
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
      <div className="space-y-4">
        {roadmaps.map((roadmap) => (
          <div key={roadmap.id} className="bg-[#161B22] rounded-xl p-4 flex gap-4">
            {/* 1:1 Image on the left */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={roadmap.image}
                alt={roadmap.university}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 96px, 128px"
                priority
              />
            </div>
            
            {/* Content on the right */}
            <div className="flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="text-white text-base sm:text-lg font-medium">{roadmap.university}</h3>
                <p className="text-[#9CA3AF] text-sm mt-0.5">You have {roadmap.pendingTasks}</p>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-[#9CA3AF]">Progress</span>
                  <span className="text-[#E5E7EB] font-medium">{roadmap.progress}%</span>
                </div>
                <div className="w-full bg-[#2D3748] rounded-full h-1.5 sm:h-2 mb-3">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${roadmap.progress}%` }}
                  ></div>
                </div>
                
                <button className="w-full bg-[#1F6FEB] hover:bg-blue-600 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors">
                  View Roadmap
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
