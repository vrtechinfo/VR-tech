-- Add job_listings table
CREATE TABLE IF NOT EXISTS job_listings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  work_type TEXT NOT NULL, -- e.g., Remote, Hybrid, Onsite
  job_type TEXT NOT NULL, -- e.g., Full-time, Part-time, Contract
  location TEXT NOT NULL, 
  experience TEXT NOT NULL, -- e.g., 2-4 Yrs
  description TEXT NOT NULL,
  responsibilities JSONB NOT NULL, -- Array of responsibilities stored as JSON
  requirements JSONB NOT NULL, -- Array of requirements stored as JSON
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample data for job listings
INSERT INTO job_listings (
  title, 
  department, 
  work_type, 
  job_type, 
  location, 
  experience, 
  description, 
  responsibilities, 
  requirements,
  is_active
) VALUES 
(
  'Frontend Developer', 
  'Engineering', 
  'Remote', 
  'Full-time', 
  'Hyderabad', 
  '2-4 Yrs', 
  'We''re looking for a skilled Frontend Developer to join our engineering team. You''ll be responsible for implementing visual elements and user interactions that users see and interact with in our web applications.',
  '["Develop new user-facing features using React.js", "Build reusable components and front-end libraries for future use", "Translate designs and wireframes into high-quality code", "Optimize components for maximum performance across devices and browsers", "Collaborate with back-end developers and web designers to improve usability"]', 
  '["Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model", "Thorough understanding of React.js and its core principles", "Experience with popular React.js workflows (such as Flux or Redux)", "Familiarity with newer specifications of ECMAScript", "Experience with data structure libraries (e.g., Immutable.js)", "Knowledge of isomorphic React is a plus"]',
  true
),
(
  'UI/UX Designer', 
  'Design', 
  'Hybrid', 
  'Full-time', 
  'Hyderabad', 
  '3-5 Yrs', 
  'We are seeking a talented UI/UX Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills, and be able to translate high-level requirements into interaction flows and artifacts.',
  '["Collaborate with product management and engineering to define and implement innovative solutions for product direction, visuals and experience", "Execute all visual design stages from concept to final hand-off to engineering", "Create wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas", "Present and defend designs and key milestone deliverables to peers and executive level stakeholders", "Conduct user research and evaluate user feedback"]', 
  '["Proven UI/UX design experience for digital products or services", "Strong portfolio of design work demonstrating a clean aesthetic and innovative solutions", "Proficiency in standard design tools (Sketch, Figma, Adobe XD)", "Solid experience in creating wireframes, prototypes, storyboards, user flows", "Knowledge of HTML, CSS, and JavaScript for rapid prototyping is a plus", "Excellent communication skills with a good command over English"]',
  true
);
