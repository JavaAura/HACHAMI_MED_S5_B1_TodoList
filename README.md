# ToDoist Application

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Architecture](#architecture)
- [Usage](#usage)
- [Installation](#installation)
- [Development Guidelines](#development-guidelines)
- [Bonus Features](#bonus-features)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

The ToDoist application is a customizable and efficient task management tool designed for a single user. The application allows users to create, modify, and delete tasks and categories, search for tasks in real-time, and view an interactive statistics dashboard. The interface is intuitive and responsive, catering to both desktop and mobile devices.

---

## Features

### Task Management
- **Create, Modify, and Delete Tasks**
  - Each task includes:
    - Title
    - Optional Description
    - Due Date and Time (European format)
    - Priority Level (High, Medium, Low)
    - Completion Status (Completed, In Progress, Not Started)

### Category Management
- **Create, Modify, and Delete Categories**
  - Examples: Work, Personal, Shopping, etc.
- Tasks are assigned to a single category.

### Real-Time Search
- Search tasks by title or description with validation upon submission.

### Statistics Dashboard
- Displays:
  - Percentage of completed tasks
  - Percentage of pending tasks
  - Number of overdue tasks



---

## Technical Requirements

- **Frontend Framework**: Angular 17
- **Styling**: SCSS ,TailwindCSS
- **Data Persistence**: JSON via `localStorage`
- **Libraries/Tools**:
  -  `Chart.js` for interactive statistics.

---

## Architecture

- **Components**: Modular structure for task list, add/edit forms, and dashboard.
- **Modules**: Organized codebase.
- **Services**: Facilitate communication between components.
- **Routing**: Navigate between views.
- **Form Handling**: Manage task add/edit forms.
- **Observables**: Handle real-time data streams and updates.
- **Data Binding**: Synchronize data with the interface.
- **Pipes**: Format dates and apply filters.

---

## Usage

1. **Task Management**: Add, update, and delete tasks with detailed information.
2. **Category Management**: Create custom categories and assign tasks.
3. **Search**: Use the search bar to quickly find tasks by title or description.
4. **Statistics Dashboard**: Monitor progress and overdue tasks interactively.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JavaAura/HACHAMI_MED_S5_B1_TodoList.git
   cd todoist
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   ng serve
   ```
4. Access the application at `http://localhost:4200`.

---

## Development Guidelines

1. **Branching**: Use feature branches for new implementations.
2. **Coding Standards**:
   - Follow Angular best practices.
   - Ensure modular and reusable components.
3. **Testing**:
   - Write unit tests for components and services.
   - Use `Karma` and `Jasmine` for testing.
4. **Documentation**: Add comments and update the README as needed.

---

---

## Future Enhancements

- Implement multi-user support.
- Add support for recurring tasks.
- Integrate authentication using Firebase or another backend service.
- Enable cloud data storage for cross-device synchronization.

---

## Authors

Developed by Mohamed Hachami

---
