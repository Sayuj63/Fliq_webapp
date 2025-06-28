'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RightColumnVisualsProps {
  essay: string;
  loading: boolean;
}

const RightColumnVisuals = ({ essay, loading }: RightColumnVisualsProps) => {
  const [scores, setScores] = useState<{[key: string]: number} | null>(null);
  const [impressions, setImpressions] = useState<string[]>([]);
  
  // Fetch real analysis when essay changes
  useEffect(() => {
    let isMounted = true;
    
    const analyzeEssay = async () => {
      if (!essay.trim() || loading) return;
      
      try {
        console.log('Sending essay for analysis...');
        const response = await fetch('/api/essay-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ essay }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to analyze essay');
        }

        const responseData = await response.json();
        console.log('Received analysis:', responseData);
        
        if (!isMounted) return;
        
        if (!responseData.success) {
          console.log('Using fallback scores from API');
          // Use the default scores provided by the API
          const { defaultScores } = responseData;
          setScores({
            'Curiosity': defaultScores.Curiosity,
            'Drive': defaultScores.Drive,
            'Voice': defaultScores.Voice,
            'Alignment': defaultScores.Alignment
          });
          setImpressions(defaultScores.impressions);
          return;
        }
        
        // Ensure we have valid scores (0-100)
        const validatedScores = {
          'Curiosity': Math.min(100, Math.max(0, responseData.Curiosity || 50)),
          'Drive': Math.min(100, Math.max(0, responseData.Drive || 50)),
          'Voice': Math.min(100, Math.max(0, responseData.Voice || 50)),
          'Alignment': Math.min(100, Math.max(0, responseData.Alignment || 50))
        };
        
        // Use provided impressions or fallback to default
        const essayImpressions = Array.isArray(responseData.impressions) && responseData.impressions.length > 0
          ? responseData.impressions.slice(0, 6) // Limit to 6 impressions max
          : [
              'Resilient Journey',
              'Leadership Potential',
              'Creative Thinker',
              'Strong Work Ethic',
              'Empathetic Leader',
              'Innovative Mindset'
            ];
        
        setScores(validatedScores);
        setImpressions(essayImpressions);
      } catch (error) {
        console.error('Error analyzing essay:', error);
        if (!isMounted) return;
        
        // Fallback to neutral scores if API fails
        setScores({
          'Curiosity': 50,
          'Drive': 50,
          'Voice': 50,
          'Alignment': 50
        });
        
        // Show error state in the UI
        setImpressions(['Analyzing your essay... Please try again in a moment.']);
        
        // Log the error for debugging
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
      }
    };
    
    // Add debounce to prevent too many API calls
    const timer = setTimeout(analyzeEssay, 1000);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [essay, loading]);
  
  if (loading || !scores) {
    return (
      <div className="space-y-8">
        <div className="bg-black border border-white/10 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Analyzing your essay</h3>
          <p className="text-sm text-white/60">This may take a moment...</p>
          <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full animate-pulse"
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Get the scores data
  const scoresData = scores ? Object.entries(scores) : [];
  const maxScore = Math.max(...Object.values(scores || {}), 1); // Ensure at least 1 to avoid division by zero
  
  // Debug log
  console.log('Scores data:', scores);
  console.log('Max score:', maxScore);

  return (
    <div className="space-y-8">
      {/* Header Box */}
      <div className="bg-black border border-white/10 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium">Essay Analysis Results</h3>
      </div>

      {/* Vertical Bar Graph */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-1">Scores Breakdown</h3>
          <p className="text-xs text-white/60">Visual representation of your essay's performance</p>
        </div>
        
        <div className="relative w-full" style={{ height: '280px' }}>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div> {/* X-axis line */}
          <div className="flex items-end justify-between h-full px-6 gap-8">
            {scoresData.map(([category, score]) => {
              const heightPercentage = Math.min(100, Math.max(1, (score / maxScore) * 100)); // Ensure height is between 1-100%
              
              return (
                <div key={category} className="flex flex-col items-center h-full" style={{ width: '60px' }}>
                  <div className="relative w-10 h-full">
                    <div className="absolute bottom-0 left-0 right-0 bg-white/5 rounded-t-sm" style={{ height: '100%' }}></div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ 
                        height: `${heightPercentage}%`,
                        opacity: 1
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.16, 0.77, 0.47, 0.97],
                        delay: 0.2
                      }}
                      className="absolute bottom-0 left-0 right-0 bg-[#0D80F2] rounded-t-sm"
                      style={{
                        boxShadow: '0 -2px 10px rgba(13, 128, 242, 0.3)'
                      }}
                    />
                  </div>
                  <div className="mt-4 text-xs text-center w-full">
                    <div className="font-medium text-white/80">{category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Impressions Section */}
      <div>
        <h3 className="text-sm font-medium mb-4">Key Impressions</h3>
        <div className="grid grid-cols-2 gap-3">
          {impressions.map((impression, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/10 rounded-lg p-3 text-center text-sm bg-white/5"
            >
              {impression}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Benchmark Section */}
      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center justify-between text-sm mb-1">
          <span>More essays like yours gaining traction this week</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-xs text-white/40">Benchmarked against essays from last 180 days</p>
      </div>
      
      {/* Resources Section */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <h3 className="text-sm font-medium">Resources that you might find helpful</h3>
        
        {[
          {
            title: 'Coursework On Kaggle',
            description: 'Thank you for the project update. It looks great! I\'ve gone through the report and the progress is impressive. The team has done a fantastic job and I appreciate the hard work.',
            tag: 'To Increase: Academic Motivation'
          },
          {
            title: 'Learn German',
            description: 'Thank you for the project update. It looks great! I\'ve gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work...',
            tag: 'To Increase: School Fit'
          },
          {
            title: 'Coursework On Kaggle',
            description: 'Thank you for the project update. It looks great! I\'ve gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work...',
            tag: 'To Increase: Academic Motivation'
          }
        ].map((resource, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium">{resource.title}</h4>
              <button className="text-xs text-blue-400 hover:underline flex items-center">
                Know More
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-white/60 mb-2 line-clamp-2">{resource.description}</p>
            <span className="inline-block px-2 py-0.5 bg-white/5 rounded text-xs text-white/60">
              {resource.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RightColumnVisuals;
