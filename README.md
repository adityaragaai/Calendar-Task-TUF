# Interactive Wall Calendar Component

A polished, interactive React component inspired by physical wall calendars. Built with React, TypeScript, and Framer Motion for the Frontend Engineering Challenge.

## ✨ Features

- **Wall Calendar Aesthetic**: Faithfully recreates the look of a physical wall calendar with spiral binding and high-quality imagery.
- **Dynamic Themes**: Every month features a unique high-resolution hero image and a coordinated color palette.
- **Smart Date Selection**: select start and end dates with clear visual indicators for the range.
- **Integrated Monthly Memos**: Each month has its own dedicated notes area for general memos.
- **3D Page Flip Animation**: Smooth transition effects when navigating between months using Framer Motion.
- **Fully Responsive**: Adapts seamlessly from desktop layouts to mobile-optimized stacked views.
- **Today Highlight**: Instant visual tracking of the current date with a subtle pulse animation.

## 🛠️ Tech Stack

- **Framework**: React (with TypeScript)
- **Styling**: Vanilla CSS (Modern CSS variables)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## 🏗️ Project Structure

- `src/components/InteractiveCalendar.tsx`: The core functional component.
- `src/index.css`: Modern, modular CSS for all styling and animations.
- `src/types/`: TypeScript interfaces and definitions.

## 📝 Design Choices

- **Geometric Overlays**: Used custom SVG paths with gradients to create a modern "wave" effect that bridges the hero image and the calendar grid.
- **Refined Typography**: Utilizes the 'Outfit' font family for a premium, contemporary feel.
- **Minimalist Controls**: Simplified navigation controls to prioritize the calendar's visual impact.
