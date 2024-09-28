# Strides Platform

**Strides** is a platform designed to help individuals and teams track their environmental efforts, specifically by measuring how much waste they collect during strides (walks or cleanup events). The platform visualizes the impact through various charts, maps, and leaderboards, empowering users to see the real-world effects of their contributions.

## Features

- **User Authentication**: Users can sign up and log in to track their individual strides.
- **Team Leaderboards**: Track and compare strides across teams to encourage collaboration and competition.
- **Geospatial Visualization**: View strides on an interactive map with Mapbox, showing the quantity and type of waste collected.
- **Admin Dashboard**: Admins can manage users, teams, and stride data.
- **Analytics**: View charts and graphs to see the breakdown of collected items over time.

## Screenshots

### Landing Page
![Landing Page](url/to/your/screenshot)

### Strides Map
![Strides Map](url/to/your/screenshot)

### Leaderboard
![Leaderboard](url/to/your/screenshot)

### Strides Table
![Strides Table](url/to/your/screenshot)

## Tech Stack

### Frontend
- **React**: UI Framework
- **Tailwind CSS**: For styling and UI design
- **React Hook Form**: For form handling and validation
- **Zod**: Schema validation
- **React Query**: For data fetching and caching
- **Mapbox GL**: For geospatial map visualization
- **Radix UI**: Accessible UI components

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Backend framework
- **PostgreSQL**: Relational database for storing user and strides data
- **JWT**: Authentication using JSON Web Tokens
- **bcrypt**: For password hashing
- **pg**: PostgreSQL client for Node.js

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running
- Mapbox API Key (for geospatial data visualization)

### Usage
Adding Strides: Users can log their strides, including the types of waste collected, distance, and time.
Viewing Strides: All collected data is displayed on a map, with the ability to filter by date, team, and location.
Managing Data: Admins can view and manage all user data, teams, and strides.

