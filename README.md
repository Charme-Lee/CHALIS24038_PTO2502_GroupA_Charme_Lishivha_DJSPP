# 🎧 Final Podcast App 🎯

A polished, production-ready React podcast platform with global audio playback, favourites, themes, routing, and rich UI enhancements.
The Dynamic Podcast App is a modern, responsive podcast platform built with React.
Users can explore podcasts, view seasons and episodes, play audio with a persistent global player, save favourites, toggle themes, and enjoy a smooth and engaging browsing experience.

## 🌟 Live Demo

✅ Live App [Vercel](https://podcastapp-three.vercel.app/)
The app deploys automatically on push via Vercel and supports full SPA routing.

## 🚀 Features

🔊 Global Audio Player

- Fixed bottom global audio player

- Continues playback across page navigation

- Play, pause, seek, progress tracking

- Reload confirmation prompt while audio is playing

- Built using HTML5 Audio API + React Context

- State persists until page refresh

- Smooth UI transitions

## ❤️ Favourites System

Favourites are persisted with localStorage and support:

- ✅ Add/remove favourite episodes
- ✅ Favourites page
- ✅ Show the show title, season, and date/time added
- ✅ Visual heart icon feedback
- ✅ Group favourites by show
- ✅ Sorting options:

  - A–Z/ Z–A

  - Newest / Oldest by date added

## 🎠 Recommended Shows Carousel

- Horizontally scrollable carousel

- Swipe navigation

- Arrow navigation

- Looped scrolling

- Displays show image, title, and genres

- Clicking a show navigates to its detail page

- Built with lightweight carousel handling

## 🌗 Theme Toggle (Light/Dark Mode)

- Dark/light theme switcher

- Saved in localStorage

- Entire app updates instantly

- Uses CSS Modules with theme-aware variables

- Sun/moon icon changes dynamically

- Accessible color contrast

## 🔍 Podcast Browsing

Filterable and searchable list of shows

- Sort by categories

- Clear preview cards

- Genre tags

- Pagination support

## 📺 Show & Episode Views

- Show title, description, genres

- Total seasons and total episodes

- Sort and view episodes per season

- Click to play episodes

- Progress indicator in audio player

<!-- ## 🌟 Optional Features

Stretch goal implementation status:

Feature Status
Playback progress saving optional (completed/partial/not implemented)
Mark finished episodes optional
Reset playback history optional

Update this table to reflect what you completed. -->

## 🛠️ Technologies Used

- React (component-based UI)

- React Router (SPA routing)

- Context API (global audio + theme + favourites)

- HTML5 Audio API

- CSS Modules

- JavaScript ES6+

- Node.js + npm

- Vercel for

## 📦 Project Structure

```

src/
│── components/
│ ├── AudioPlayer/
│ ├── Carousel/
│ ├── PodcastCard/
│ ├── ThemeToggle/
│── context/
│ ├── AudioContext.js
│ ├── ThemeContext.js
│ ├── FavouritesContext.js
│── pages/
│ ├── Home.jsx
│ ├── ShowDetail.jsx
│ ├── Favourites.jsx
│── data/
│── hooks/
│── styles/
│── App.jsx
│── main.jsx

```

<!-- ## 🔌 API -->

## ⚙️ Setup Instructions

- ✅ Prerequisites

  - Node.js 14+

  - Git

  - A browser

  - Code editor (VS Code recommended)

- ✅ Install and Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Charme-Lee/CHALIS24038_PTO2502_GroupA_Charme_Lishivha_DJSPP.git

# 2. Navigate into the project
cd project
```

```bash
# 3. Install dependencies:
npm install
```

```bash
# 4. Run development server:
npm run dev
```

## 🌐 Deployment

This app is deployed via Vercel using automatic builds from the GitHub repository.

- ✅ SPA Routing Support

  - To ensure routes like /show/1 work directly, Vercel is configured with:

    - vercel.json:{"rewrites": [{ "source": "/(.*)", "destination": "/" }]}

- ✅ Metadata & Favicon

  - Added custom favicon in /public

- OpenGraph and social preview metadata configured

  - Tools used: metatags.io

## 💡 Usage Instructions

### Add to Favourites

- Open an episode or show

- Click the heart icon

- Heart turns red

- Visit the Favourites page to view items

### Browse Episodes

- Home page shows all shows

- Search and filter available

- Click to open show details

- Toggle season

- Play episodes

### Audio Player

- Appears when first episode is played

- Play/pause/seek controls

- Continues playing between pages

- Shows progress

- Warns on reload while playing

### Theme Toggle

- Click sun/moon icon

- Dark/light mode persists across sessions
