import React, { useState } from "react";
import { svgPaths } from "./districtData";
import "./map.css";

export default function SriLankaDistrictMap({
  // Core functionality
  selectedDistrict = null,
  onDistrictChange = null,

  // Appearance
  width = 100,
  height = 250,
  highlightColor = "#fff",
  mapbackgroundcolor = "#B9CFDE",
  strokeColor = "#000",
  strokeWidth = 0.1,

  // Interactive options
  interactive = true,

  // Custom styling
  mapClassName = "sl-district-map",
  activeClassName = "active-path",
  mapRegionClassName = "map-region",

  // New customization options
  hoverColor = "#D4E6F1",
}) {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  const handleDistrictClick = (district) => {
    if (!interactive) return;
    if (onDistrictChange) {
      onDistrictChange(district);
    }
  };

  const handleDistrictHover = (district) => {
    if (!interactive) return;
    setHoveredDistrict(district);
  };

  const handleDistrictLeave = () => {
    if (!interactive) return;
    setHoveredDistrict(null);
  };

  return (
    <div className={mapClassName} style={{ width: "100%", height: "auto" }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 25 60`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {Object.entries(svgPaths).map(([district, paths]) =>
            paths.map((d, i) => (
              <React.Fragment key={district + i}>
                <path
                  d={d}
                  fill={
                    district === selectedDistrict
                      ? highlightColor
                      : district === hoveredDistrict
                      ? hoverColor
                      : mapbackgroundcolor
                  }
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className={
                    mapRegionClassName +
                    (district === selectedDistrict
                      ? ` ${activeClassName}`
                      : "") +
                    (district === hoveredDistrict ? " hovered" : "")
                  }
                  onClick={() => handleDistrictClick(district)}
                  onMouseEnter={() => handleDistrictHover(district)}
                  onMouseLeave={() => handleDistrictLeave(district)}
                  style={interactive ? { cursor: "pointer" } : {}}
                />
              </React.Fragment>
            ))
          )}
        </g>
      </svg>
    </div>
  );
}
