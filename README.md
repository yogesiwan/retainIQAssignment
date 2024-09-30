Here's the updated README file based on your inputs:

---

# Frontend Developer Assignment: UI Implementation

This project implements a user interface (UI) resembling a table structure, where each row represents a state and each column represents a design variant. Users can dynamically add/remove states (rows), add/remove design variants (columns), reorder rows using drag-and-drop, and (optionally) insert designs into specific variant columns.

**Live Demo**: [View the project on Vercel](https://retain-iq-assignment-eight.vercel.app/)

## Features

- **Add/Delete States**: Dynamically add and remove rows (states) in the table.
- **Add/Delete Variant Columns**: Dynamically add and remove variant columns in the table.
- **Row Reordering**: Reorder rows using drag-and-drop functionality (powered by [Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)).
- **Design Insertion (Optional)**: Option to insert a design into a specific variant column.
- **Scrollable Variant Columns**: When the number of variants exceeds four, a horizontal scroll is enabled.
- **Custom Alert Box**: A custom alert box appears upon state addition, with a green check icon.

## Technologies Used

- **Frontend Framework**: [React.js](https://reactjs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Drag and Drop**: [Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for drag-and-drop functionality.

## Installation and Setup

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
- **Git**: Git should be installed on your system.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yogesiwan/retainIQAssignment.git
   cd retainIQAssignment
   ```

2. **Install Dependencies**:

   Ensure you're in the project directory and run:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   Run the following command to start the development server:

   ```bash
   npm run dev
   ```

4. **Open the App**:

   Open your browser and visit:

   ```
   http://localhost:5173
   ```

   The app will now be running locally on your machine.

## Project Structure

```
/src
  /components    # React components (Table, StateRow, VariantColumn, etc.)
  /assets        # Static files (icons, images)
  App.jsx        # Main component
  index.jsx      # Entry point
```

## Usage

After running the app, you can:

- Add new states (rows) by clicking the "Add State" button.
- Add or remove variant columns for each state.
- Reorder rows by dragging and dropping them into different positions using the drag-and-drop functionality powered by Beautiful DnD.
- Optionally, insert design images into specific variant columns.

## Deployment

The project is deployed on Vercel and can be viewed live at:  
[https://retain-iq-assignment-eight.vercel.app/](https://retain-iq-assignment-eight.vercel.app/)

## Screenshots

_Add relevant screenshots or GIFs of the application (optional)._

---

Feel free to update the GitHub repository link in the **Clone the Repository** section with your username if needed!
