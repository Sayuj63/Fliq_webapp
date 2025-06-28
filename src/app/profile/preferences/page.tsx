'use client';

import { useState } from 'react';

type GradeLevel = 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
type GPAScale = '4.0' | '10.0' | 'IB' | 'Other';
type Curriculum = 'CBSE' | 'IB' | 'IGCSE' | 'A-Levels' | 'AP' | 'Local';
type CampusSetting = 'Urban' | 'Suburban' | 'Rural' | 'No preference';
type ClassSize = 'Small (<5K)' | 'Medium (5K-15K)' | 'Large (>15K)';
type AchievementLevel = 'School' | 'State' | 'National' | 'International';
type ApplicationRound = 'Regular' | 'Early Action' | 'Early Decision' | 'Rolling';

export default function PreferencesPage() {
  // Academic Profile
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('Grade 12');
  const [gpa, setGPA] = useState('');
  const [gpaScale, setGPAScale] = useState<GPAScale>('4.0');
  const [curriculum, setCurriculum] = useState<Curriculum>('CBSE');
  const [showTestScores, setShowTestScores] = useState(false);
  const [satScore, setSATScore] = useState('');
  const [actScore, setACTScore] = useState('');
  const [toeflScore, setTOEFLScore] = useState('');
  const [ieltsScore, setIELTSScore] = useState('');
  const [intendedMajor, setIntendedMajor] = useState('');
  const [backupMajor, setBackupMajor] = useState('');
  
  // Geography
  const [preferredCountries, setPreferredCountries] = useState<string[]>([]);
  const [campusSetting, setCampusSetting] = useState<CampusSetting>('No preference');
  const [classSize, setClassSize] = useState<ClassSize>('Medium (5K-15K)');
  
  // Finances
  const [incomeBracket, setIncomeBracket] = useState('');
  const [maxBudget, setMaxBudget] = useState(50000);
  const [needsFinancialAid, setNeedsFinancialAid] = useState(false);
  const [needsFullFunding, setNeedsFullFunding] = useState(false);
  
  // Extracurriculars
  const [activities, setActivities] = useState<string[]>(['', '', '']);
  const [achievementLevel, setAchievementLevel] = useState<AchievementLevel>('School');
  const [hasLeadershipRoles, setHasLeadershipRoles] = useState(false);
  
  // Application Plan
  const [applicationYear, setApplicationYear] = useState('2025');
  const [earlyDecision, setEarlyDecision] = useState<'Yes' | 'No' | 'Not sure'>('Not sure');
  const [dreamUniversities, setDreamUniversities] = useState<string[]>([]);
  const [deadlines, setDeadlines] = useState<ApplicationRound[]>([]);
  const [newUniversity, setNewUniversity] = useState('');

  const handleAddUniversity = () => {
    if (newUniversity.trim() && !dreamUniversities.includes(newUniversity.trim())) {
      setDreamUniversities([...dreamUniversities, newUniversity.trim()]);
      setNewUniversity('');
    }
  };

  const removeUniversity = (university: string) => {
    setDreamUniversities(dreamUniversities.filter(u => u !== university));
  };

  const toggleDeadline = (deadline: ApplicationRound) => {
    if (deadlines.includes(deadline)) {
      setDeadlines(deadlines.filter(d => d !== deadline));
    } else {
      setDeadlines([...deadlines, deadline]);
    }
  };

  const toggleCountry = (country: string) => {
    if (preferredCountries.includes(country)) {
      setPreferredCountries(preferredCountries.filter(c => c !== country));
    } else {
      setPreferredCountries([...preferredCountries, country]);
    }
  };

  const handleActivityChange = (index: number, value: string) => {
    const newActivities = [...activities];
    newActivities[index] = value;
    setActivities(newActivities);
  };

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Singapore'];
  const majors = [
    'Computer Science', 'Business Administration', 'Mechanical Engineering', 'Biology',
    'Psychology', 'Economics', 'Political Science', 'Electrical Engineering'
  ];
  const incomeBrackets = [
    'Less than $30,000',
    '$30,000 - $50,000',
    '$50,001 - $80,000',
    '$80,001 - $120,000',
    '$120,001 - $200,000',
    'More than $200,000',
    'Prefer not to say'
  ];

  return (
    <div className="space-y-8">
      {/* Academic Profile */}
      <Section title="Academic Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Current Grade Level</Label>
            <Select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}>
              {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </Select>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Label>GPA</Label>
              <Input 
                type="number" 
                value={gpa} 
                onChange={(e) => setGPA(e.target.value)}
                min="0"
                step="0.1"
                placeholder="Enter GPA"
              />
            </div>
            <div className="w-32">
              <Label>Scale</Label>
              <Select value={gpaScale} onChange={(e) => setGPAScale(e.target.value as GPAScale)}>
                <option value="4.0">4.0</option>
                <option value="10.0">10.0</option>
                <option value="IB">IB</option>
                <option value="Other">Other</option>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Curriculum</Label>
            <Select value={curriculum} onChange={(e) => setCurriculum(e.target.value as Curriculum)}>
              {['CBSE', 'IB', 'IGCSE', 'A-Levels', 'AP', 'Local'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <Label>Test Scores (Optional)</Label>
              <button 
                type="button" 
                onClick={() => setShowTestScores(!showTestScores)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                {showTestScores ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showTestScores && (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-900 rounded-lg">
                <div>
                  <Label>SAT Score</Label>
                  <Input 
                    type="number" 
                    value={satScore}
                    onChange={(e) => setSATScore(e.target.value)}
                    placeholder="400-1600"
                    min="400"
                    max="1600"
                  />
                </div>
                <div>
                  <Label>ACT Score</Label>
                  <Input 
                    type="number" 
                    value={actScore}
                    onChange={(e) => setACTScore(e.target.value)}
                    placeholder="1-36"
                    min="1"
                    max="36"
                  />
                </div>
                <div>
                  <Label>TOEFL Score</Label>
                  <Input 
                    type="number" 
                    value={toeflScore}
                    onChange={(e) => setTOEFLScore(e.target.value)}
                    placeholder="0-120"
                    min="0"
                    max="120"
                  />
                </div>
                <div>
                  <Label>IELTS Score</Label>
                  <Input 
                    type="number" 
                    value={ieltsScore}
                    onChange={(e) => setIELTSScore(e.target.value)}
                    placeholder="0-9"
                    min="0"
                    max="9"
                    step="0.5"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Label>Intended Major (Primary)</Label>
            <Input 
              type="text" 
              value={intendedMajor}
              onChange={(e) => setIntendedMajor(e.target.value)}
              list="majors-list"
              placeholder="Search majors..."
            />
            <datalist id="majors-list">
              {majors.map(major => (
                <option key={major} value={major} />
              ))}
            </datalist>
          </div>
          
          <div>
            <Label>Backup Major (Optional)</Label>
            <Input 
              type="text" 
              value={backupMajor}
              onChange={(e) => setBackupMajor(e.target.value)}
              list="majors-list"
              placeholder="Search backup majors..."
            />
          </div>
        </div>
      </Section>
      
      {/* Geography */}
      <Section title="Geography">
        <div className="space-y-6">
          <div>
            <Label>Preferred Countries</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {countries.map(country => (
                <button
                  key={country}
                  type="button"
                  onClick={() => toggleCountry(country)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    preferredCountries.includes(country)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Preferred Campus Setting</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(['Urban', 'Suburban', 'Rural', 'No preference'] as CampusSetting[]).map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCampusSetting(option)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      campusSetting === option
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Class Size Preference</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Small (<5K)', 'Medium (5K-15K)', 'Large (>15K)'].map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setClassSize(size as ClassSize)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      classSize === size
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Finances */}
      <Section title="Finances">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Family Income Bracket</Label>
            <Select 
              value={incomeBracket}
              onChange={(e) => setIncomeBracket(e.target.value)}
            >
              <option value="">Select income bracket</option>
              {incomeBrackets.map(bracket => (
                <option key={bracket} value={bracket}>{bracket}</option>
              ))}
            </Select>
          </div>
          
          <div>
            <div className="flex justify-between">
              <Label>Max Yearly Budget: ${maxBudget.toLocaleString()}</Label>
              <span className="text-sm text-gray-400">${maxBudget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$1K</span>
              <span>$50K</span>
              <span>$100K+</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="needsFinancialAid"
                checked={needsFinancialAid}
                onChange={(e) => setNeedsFinancialAid(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500"
              />
              <label htmlFor="needsFinancialAid" className="ml-2 text-sm font-medium">
                Need Financial Aid?
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="needsFullFunding"
                checked={needsFullFunding}
                onChange={(e) => setNeedsFullFunding(e.target.checked)}
                disabled={!needsFinancialAid}
                className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 disabled:opacity-50"
              />
              <label 
                htmlFor="needsFullFunding" 
                className={`ml-2 text-sm font-medium ${!needsFinancialAid ? 'text-gray-500' : ''}`}
              >
                Need Full Funding?
              </label>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Extracurriculars */}
      <Section title="Extracurriculars">
        <div className="space-y-6">
          <div>
            <Label>Top 3 Activities</Label>
            <div className="mt-2 space-y-3">
              {[0, 1, 2].map((index) => (
                <Input
                  key={index}
                  value={activities[index] || ''}
                  onChange={(e) => handleActivityChange(index, e.target.value)}
                  placeholder={`Activity ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Highest Achievement Level</Label>
              <Select 
                value={achievementLevel}
                onChange={(e) => setAchievementLevel(e.target.value as AchievementLevel)}
              >
                {['School', 'State', 'National', 'International'].map(level => (
                  <option key={level} value={level}>{level} Level</option>
                ))}
              </Select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasLeadershipRoles"
                checked={hasLeadershipRoles}
                onChange={(e) => setHasLeadershipRoles(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500"
              />
              <label htmlFor="hasLeadershipRoles" className="ml-2 text-sm font-medium">
                Has Leadership Roles
              </label>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Application Plan */}
      <Section title="Application Plan">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Application Year</Label>
              <Select 
                value={applicationYear}
                onChange={(e) => setApplicationYear(e.target.value)}
              >
                {Array.from({length: 10}, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </Select>
            </div>
            
            <div>
              <Label>Planning Early Decision / Early Action?</Label>
              <div className="mt-2 flex space-x-4">
                {(['Yes', 'No', 'Not sure'] as const).map(option => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`early-${option}`}
                      name="early-decision"
                      checked={earlyDecision === option}
                      onChange={() => setEarlyDecision(option)}
                      className="h-4 w-4 text-blue-600 border-gray-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`early-${option}`} className="ml-2 text-sm font-medium">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Label>Top Dream Universities (Optional)</Label>
            <div className="mt-2 flex gap-2">
              <Input 
                type="text"
                value={newUniversity}
                onChange={(e) => setNewUniversity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUniversity())}
                placeholder="Search universities..."
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleAddUniversity}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            
            {dreamUniversities.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {dreamUniversities.map(university => (
                  <div key={university} className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    {university}
                    <button
                      type="button"
                      onClick={() => removeUniversity(university)}
                      className="ml-2 text-gray-300 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <Label>Deadlines You Care About</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(['Regular', 'Early Action', 'Early Decision', 'Rolling'] as ApplicationRound[]).map(deadline => (
                <button
                  key={deadline}
                  type="button"
                  onClick={() => toggleDeadline(deadline)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    deadlines.includes(deadline)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  }`}
                >
                  {deadline}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>
      
      <div className="flex justify-end pt-6">
        <button
          type="button"
          className="px-6 py-2 border border-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-3"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

// Reusable components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label 
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-300 mb-1"
    >
      {children}
    </label>
  );
}

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`block w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
}

function Select({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`block w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
