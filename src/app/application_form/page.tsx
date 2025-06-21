'use client';
import { useState, FormEvent, ChangeEvent } from 'react';



interface FormData {
  email: string;
  name: string;
  dob: string;
  // Add other form fields as needed
}

export default function ApplicationFormPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    dob: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with email:', formData.email);
    if (formData.email) {
      // Here you would handle the form submission, e.g., send data to an API.
    } else {
      console.error('No email provided');
    }
  };

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  return (
    <div className="w-full min-h-screen bg-[#121417] text-white">
      <div className="w-full px-4">
        <div className="mb-8">
          <p className="text-sm uppercase text-gray-400 mb-2">Step {step} of 4</p>
          <div className="w-full bg-gray-800 h-1 rounded">
            <div
              className="bg-white h-full rounded transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <form className="space-y-6 max-w-3xl mx-auto py-12">
            <h2 className="text-2xl font-bold text-center mb-8">Let&apos;s get to know you</h2>
            
            <div className="space-y-6">
              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Date of Birth (DOB)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="w-1/3 bg-[#1a1d21] p-3 rounded-lg border border-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM"
                      maxLength={2}
                    />
                    <input 
                      type="text" 
                      className="w-1/3 bg-[#1a1d21] p-3 rounded-lg border border-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="DD"
                      maxLength={2}
                    />
                    <input 
                      type="text" 
                      className="w-1/3 bg-[#1a1d21] p-3 rounded-lg border border-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="YYYY"
                      maxLength={4}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Current Grade Level */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Current Grade Level</label>
                  <select 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                  >
                    <option value="">Select grade level</option>
                    <option>9th Grade</option>
                    <option>10th Grade</option>
                    <option>11th Grade</option>
                    <option>12th Grade</option>
                    <option>College Freshman</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* High School Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">High School Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="Enter your high school name"
                  />
                </div>

                {/* High School Location - City */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">High School Location - City</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="Enter city"
                  />
                </div>

                {/* Curriculum */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Curriculum</label>
                  <select 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                  >
                    <option value="">Select curriculum</option>
                    <option>American</option>
                    <option>British</option>
                    <option>IB (International Baccalaureate)</option>
                    <option>IGCSE</option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* GPA */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">GPA (Unweighted)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="4.0" 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="0.0 - 4.0"
                  />
                </div>

                {/* GPA Scale */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">GPA Scale</label>
                  <select 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                  >
                    <option value="">Select GPA scale</option>
                    <option>4.0 scale</option>
                    <option>5.0 scale</option>
                    <option>100-point scale</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* GPA by Grade Level */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">9th Grade GPA</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="9th Grade GPA"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">10th Grade GPA</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="10th Grade GPA"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">11th Grade GPA</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                    placeholder="11th Grade GPA"
                  />
                </div>

                {/* Standardized Test Scores */}
                <div className="space-y-2 col-span-full">
                  <h3 className="text-lg font-semibold mt-4 mb-2">Standardized Test Scores</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">SAT Score (out of 1600)</label>
                      <input 
                        type="number" 
                        min="400" 
                        max="1600"
                        className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                        placeholder="SAT Score"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">ACT Score (out of 36)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="36"
                        className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                        placeholder="ACT Score"
                      />
                    </div>
                  </div>
                </div>

                {/* Future Test Plans */}
                <div className="space-y-2 col-span-full">
                  <h3 className="text-lg font-semibold mt-4 mb-2">Future Test Plans</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
                      <span>SAT</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
                      <span>ACT</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
                      <span>TOEFL/IELTS (for international students)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
                      <span>SAT Subject Tests</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
                      <span>AP Exams</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <button 
                  type="button" 
                  className="px-6 py-2 text-gray-300 hover:text-white"
                  disabled
                >
                  Back
                </button>
                <button
                  onClick={next}
                  type="button"
                  className="bg-white text-gray-900 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">What are your preferences?</h2>
            
            {/* College Size */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">College Size</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Small (Under 5,000)', value: 'small' },
                  { label: 'Medium (5,000-15,000)', value: 'medium' },
                  { label: 'Large (Over 15,000)', value: 'large' }
                ].map((item) => (
                  <button 
                    key={item.value}
                    type="button" 
                    className="w-full text-left p-4 rounded-lg border border-gray-700 hover:border-white transition-colors text-white bg-[#1a1d21]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* College Setting */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">College Setting</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Urban', 'Suburban', 'Rural'].map((setting) => (
                  <button 
                    key={setting}
                    type="button" 
                    className="w-full text-left p-4 rounded-lg border border-gray-700 hover:border-white transition-colors text-white bg-[#1a1d21]"
                  >
                    {setting}
                  </button>
                ))}
              </div>
            </div>


            {/* College Characteristics */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">College Characteristics</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Strong academics',
                  'Vibrant campus life',
                  'Research opportunities',
                  'Internship programs',
                  'Diverse student body'
                ].map((characteristic) => (
                  <div key={characteristic} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`char-${characteristic.toLowerCase().replace(/\s+/g, '-')}`}
                      className="h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor={`char-${characteristic.toLowerCase().replace(/\s+/g, '-')}`} className="ml-2 text-sm text-gray-300">
                      {characteristic}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Country/Region */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">Country/Region</label>
              <select 
                className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
              >
                <option value="">Select country/region</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>Australia</option>
              </select>
            </div>

            {/* Extracurricular Interests */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Extracurricular Interests</label>
              <input 
                type="text" 
                className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                placeholder="e.g., Robotics, Debate, Sports"
              />
            </div>

            {/* Hobbies */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Hobbies</label>
              <input 
                type="text" 
                className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                placeholder="e.g., Reading, Coding, Photography"
              />
            </div>

            {/* Financial Aid */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">Financial Aid</label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input type="radio" name="financial-aid" className="h-4 w-4 border-gray-600 text-blue-500 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-300">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="financial-aid" className="h-4 w-4 border-gray-600 text-blue-500 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-300">No</span>
                </label>
              </div>
            </div>

            {/* Income Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">Income Range</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Under $50,000',
                  '$50,000-$100,000',
                  '$100,000-$200,000',
                  'Over $200,000'
                ].map((range) => (
                  <div key={range} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`income-${range.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$|^-+/g, '')}`}
                      name="income-range"
                      className="h-4 w-4 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`income-${range.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$|^-+/g, '')}`} 
                      className="ml-2 text-sm text-gray-300"
                    >
                      {range}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Budget (per year)</label>
              <input 
                type="text" 
                className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                placeholder="e.g., $30,000"
              />
            </div>

            {/* Target Universities */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Target Universities</label>
              <input 
                type="text" 
                className="w-full bg-[#1a1d21] p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                placeholder="e.g., MIT, Stanford, Harvard"
              />
            </div>

            <div className="flex justify-between pt-6">
              <button 
                onClick={back} 
                type="button" 
                className="bg-white text-gray-900 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <button 
                onClick={next} 
                type="button" 
                className="bg-white text-gray-900 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Tell us about your leadership and involvement</h2>
            
            {/* Activities Section */}
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Activities</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Activity Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Student Council, Debate Club"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Role</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., President"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Duration (months)</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Hours per week</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Jobs/Internships Section */}
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Jobs/Internships</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Job/Internship Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Software Developer Intern"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Company</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Duration (months)</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 3"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Hours per week</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteer Work Section */}
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Volunteer Work</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Organization</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Local Food Bank"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Role</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Volunteer Coordinator"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Duration (months)</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Hours per week</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Awards/Honors Section */}
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Awards/Honors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Award/Honor</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., National Merit Scholar"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Issuing Organization</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., National Merit Scholarship Corporation"
                  />
                </div>
              </div>
            </div>

            {/* Independent Research Section */}
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Independent Research</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Research Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Effects of Climate Change on Local Ecosystems"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Mentor/Institution</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Dr. Smith, University of State"
                  />
                </div>
              </div>
            </div>

            {/* Special Skills/Talents Section */}
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Special Skills/Talents</h3>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Skill/Talent</label>
                <input 
                  type="text" 
                  className="w-full bg-[#121417] p-3 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Fluent in Spanish, Advanced Python Programming"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button 
                onClick={back} 
                type="button" 
                className="bg-white text-gray-900 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <button 
                onClick={next} 
                type="button" 
                className="bg-white text-gray-900 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Review and Submit</h2>
            <p className="text-gray-400 mb-4">All steps completed. Please review and submit your application.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left bg-[#1a1d21] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white">{formData.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date of Birth</p>
                    <p className="text-white">{formData.dob || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button 
                  type="button"
                  onClick={back} 
                  className="bg-white text-gray-900 hover:bg-gray-200 px-6 py-2 rounded font-medium"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded font-medium"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
