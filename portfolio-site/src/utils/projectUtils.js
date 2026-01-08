// Utility function for project expansion
export const handleProjectToggle = (
  projectId,
  expandedProject,
  setExpandedProject
) => {
  if (expandedProject === projectId) {
    setExpandedProject(null);
  } else {
    setExpandedProject(projectId);
  }
};

// Generate workflow path coordinates
export const generatePathCoordinates = (stepsCount) => {
  const coordinates = [];
  const stepWidth = 360 / (stepsCount - 1);

  for (let i = 0; i < stepsCount; i++) {
    const x = 20 + i * stepWidth;
    const y = i % 2 === 0 ? 40 : 70;
    coordinates.push({ x, y });
  }

  return coordinates;
};

// Generate SVG path string
export const generatePathString = (coordinates) => {
  if (coordinates.length < 2) return "";

  let path = `M ${coordinates[0].x},${coordinates[0].y} `;

  for (let i = 1; i < coordinates.length; i++) {
    if (i % 2 === 1) {
      // Create curve for odd indices
      const controlX =
        coordinates[i - 1].x + (coordinates[i].x - coordinates[i - 1].x) / 2;
      const controlY = coordinates[i - 1].y - 30;
      path += `Q ${controlX},${controlY} ${coordinates[i].x},${coordinates[i].y} `;
    } else {
      // Smooth curve for even indices
      path += `T ${coordinates[i].x},${coordinates[i].y} `;
    }
  }

  return path;
};
