# EarthquakeInsight – Earthquake Analytics Dashboard

## Overview
QuakeInsight is an interactive data visualization dashboard that combines a dynamic data table with a scatter plot for exploring earthquake data.

The application focuses on usability, performance, and clear data relationships through synchronized interactions between UI components.

---

## Features

- Interactive data table displaying earthquake records  
- Scatter plot visualization with selectable X and Y axes  
- Two-way interaction:
  - Clicking a table row highlights the corresponding chart point  
  - Clicking a chart point highlights and scrolls to the table row  
- Axis-based highlighting in the table for improved clarity  
- Smooth scrolling to selected rows  
- Responsive and clean UI layout  

---

## Tech Stack

- **React** – Component-based UI development  
- **TypeScript** – Type safety and maintainability  
- **Vite** – Fast development and build tool  
- **Recharts** – Data visualization (scatter plot)  
- **PapaParse** – CSV parsing  

---

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/nithishpatel04/Earthquake-Analytics.git
cd Earthquake-Analytics
npm install
npm run dev
