-- Seed audio stories for different moods
INSERT INTO public.audio_stories (title, description, mood_type, audio_url, duration_seconds)
VALUES
  (
    'Rise & Shine Energy Boost',
    'Start your day with confidence and motivation',
    'anxious',
    'https://cdn.pixabay.com/download/audio/2022/03/10/audio_d69fbc17b5.mp3',
    180
  ),
  (
    'Calm Night Meditation',
    'Gentle guided meditation to prepare for sleep',
    'stressed',
    'https://cdn.pixabay.com/download/audio/2022/03/09/audio_fe3f8b6a95.mp3',
    600
  ),
  (
    'Career Confidence Affirmation',
    'Build belief in your abilities and career potential',
    'neutral',
    'https://cdn.pixabay.com/download/audio/2022/03/10/audio_9c0deb7a9e.mp3',
    240
  ),
  (
    'Break Free - Anxiety Release',
    'Let go of worry and embrace possibility',
    'anxious',
    'https://cdn.pixabay.com/download/audio/2022/03/09/audio_7f3c8b2a1d.mp3',
    420
  ),
  (
    'Mindful Breathing Session',
    'Technique to reset your nervous system',
    'stressed',
    'https://cdn.pixabay.com/download/audio/2022/03/10/audio_2e1f5c9b4a.mp3',
    300
  ),
  (
    'Success Visualization',
    'Mental rehearsal for career achievements',
    'neutral',
    'https://cdn.pixabay.com/download/audio/2022/03/09/audio_5d2e8f3c7b.mp3',
    450
  ),
  (
    'You Are Enough',
    'Powerful affirmation for self-worth and value',
    'good',
    'https://cdn.pixabay.com/download/audio/2022/03/10/audio_8a3f5e2c1b.mp3',
    180
  ),
  (
    'Tomorrow Is Full of Possibilities',
    'Uplifting story about resilience and growth',
    'great',
    'https://cdn.pixabay.com/download/audio/2022/03/09/audio_1f4e2b8d9c.mp3',
    540
  );
