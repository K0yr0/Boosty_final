
## Project info

**URL**: https://lovable.dev/projects/22bd6551-defc-4c2a-a733-47115489e1bf

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


## 2025 hackathon project

Boosty: The Ultimate University Learning Platform (Now with Weekly Quizzes & Smart Project Matching)

Project Overview Boosty is an all-in-one academic ecosystem that:

📊 Gives Professors Real-Time Class Understanding (Lecture Pulse)

✍️ Automatically Organizes Study Materials (AI Notes)

🤫 Keeps Students Focused & Accountable (Silent Study Squads)

🎯 Assesses Weekly Progress (Auto-Generated Quizzes)

👥 Creates Perfect Project Teams (Smart Matching)

Target Users: Students, Professors, Study Groups Platforms: Mobile (iOS/Android) + Desktop (Windows/macOS)

Detailed Feature Breakdown

1.⁠ ⁠Lecture Pulse – Real-Time Class Feedback Problem Solved: Professors often don’t know students are struggling until exams.

How It Works:

During lectures, students tap:

😕 (Confused) / 🤔 (Unsure) / 🎯 (Got It!)

Professors see a live heatmap overlaid on slides:

python #Sample confusion alert if confusion_percentage > 60%: alert_professor("Slide 12: 68% students confused") Post-lecture: "Top 3 Questions" are published for review.

Unique Tech:

Optional IoT buttons (Bluetooth) for tactile feedback.

Firebase Realtime DB for instant updates.

2.⁠ ⁠Automated Lecture Notes & AI Highlights Problem Solved: Students waste time organizing messy notes.

How It Works:

Records lectures → AI (Whisper + GPT-4) generates:

Summaries

Flashcards

Key concept tags

Auto-tags confusing sections using Lecture Pulse data.

Example Output:

[Week 5: Recursion]
⚠️ Confusion Peak (72% students): Base cases
✅ Strong Understanding: Recursive calls

3.⁠ ⁠Silent Study Squads Problem Solved: Group chats become distracting.

How It Works:

Students join focus squads for their course.

No chatting—just:

Live progress bars ("3/5 working")

Pomodoro battles (compete in 25-min sprints)

Unlock group rewards (e.g., meme packs).

Tech: WebSockets for real-time sync.

4.⁠ ⁠Weekly Pop-Up Quizzes(NEW) Problem Solved: No way to measure weekly progress.

How It Works:

Every Friday, 10-question quiz on that week’s topics.

Questions prioritize high-confusion areas from Lecture Pulse.

Instant grading + explanations.

Professor Insights:

json "quizzes/CS101/week5": { "avg_score": 68%, "weakest_topic": "Pointers (52% accuracy)" }

5.⁠ ⁠Smart Project Matching (NEW) Problem Solved: Mismatched group members in team projects.

How It Works:

Groups students by quiz performance brackets:

A (85-100%) | B (70-84%) | C (50-69%) | etc.

Suggests 3 ideal partners based on:

Similar skill level

Complementary strengths

Same class group (e.g., AI01)

Example Match:

[ Kayra (AI01) - 85% ]
→ Suggested: Irmak (AI03, 90%)
• Both strong in algorithms
• Different class groups → encourages networking
Technical Architecture Frontend Mobile: Flutter (iOS/Android)

Desktop: Electron (Windows/macOS)

Backend Realtime DB: Firebase

AI Services: OpenAI API + Custom Python NLP

Analytics: Pandas/Matplotlib

Special Hardware IoT Buttons: Raspberry Pi + BLE for tactile feedback

Why This Stands Out ✅ Closes the Loop

Confusion detected → Better notes → Quiz focus → Perfect teams

✅ Balances Social + Academic

Silent squads for focus

Matching for collaboration

✅ Hardware/Software Blend

Physical buttons for engagement

AI for personalized learning

Next Steps MVP Priorities:

Lecture Pulse + Quiz system (core analytics)

Basic matching algorithm

Demo Flow:

Show real-time lecture feedback → Quiz results → Team suggestions

Potential Expansions:

AR textbook annotations

Alumni mentorship matching

Final Pitch "EduSync Pro is like if Google Docs, Duolingo, and LinkedIn had a baby—designed purely to help universities teach better and students learn smarter."
