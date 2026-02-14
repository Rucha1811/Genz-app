-- Seed some example careers for the career threat detector
INSERT INTO public.careers (title, description, risk_score, growth_trend, salary_range, required_skills, future_outlook)
VALUES
  (
    'AI/ML Engineer',
    'Build and train machine learning models for real-world applications',
    'Low',
    'Very High',
    '$120k-$250k+',
    ARRAY['Python', 'ML Libraries', 'Statistics', 'Cloud Computing'],
    'Rapidly growing with high demand across industries'
  ),
  (
    'Cybersecurity Specialist',
    'Protect systems and data from digital attacks',
    'Low',
    'Very High',
    '$90k-$180k+',
    ARRAY['Network Security', 'Coding', 'System Administration', 'Problem Solving'],
    'Critical and constantly expanding as threats grow'
  ),
  (
    'UX/UI Designer',
    'Create beautiful and functional digital experiences',
    'Medium',
    'High',
    '$70k-$140k+',
    ARRAY['Design Tools', 'User Research', 'Prototyping', 'Communication'],
    'Growing but facing competition from AI design tools'
  ),
  (
    'Data Analyst',
    'Extract insights from data to drive business decisions',
    'Low',
    'Very High',
    '$65k-$130k+',
    ARRAY['SQL', 'Excel', 'Visualization Tools', 'Statistics'],
    'Explosive demand as companies become data-driven'
  ),
  (
    'Content Creator/Influencer',
    'Create and share content across digital platforms',
    'High',
    'Medium',
    '$30k-$500k+ (highly variable)',
    ARRAY['Video Production', 'Storytelling', 'Marketing', 'Platform Knowledge'],
    'Competitive, saturated market with algorithm dependency'
  ),
  (
    'Biotech/Biomedical Engineer',
    'Develop medical devices and biotechnology solutions',
    'Low',
    'Very High',
    '$80k-$160k+',
    ARRAY['Biology', 'Engineering', 'Research', 'Lab Techniques'],
    'Growing as healthcare innovation accelerates'
  );
