import React, { useState, useEffect, useRef } from "react";
import SriLankaDistrictMap, { districts } from "../SrilankaDistrictMap/index";
import SectionCard from "./components/SectionCard";
import "./demo.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Import icons from react-icons
import {
  FiMoon,
  FiSun,
  FiInfo,
  FiCode,
  FiSettings,
  FiMap,
  FiZap,
  FiHeart,
  FiCheck,
  FiChevronDown,
  FiGlobe,
} from "react-icons/fi";

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [highlightColor, setHighlightColor] = useState("#4361ee");
  const [defaultColor, setDefaultColor] = useState("#e8f0fe");
  const [strokeColor, setStrokeColor] = useState("#333333");
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(500);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
  const [activeTab, setActiveTab] = useState("demo");
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [hoverColor, setHoverColor] = useState("#ffcc00");
  const [strokeWidth, setStrokeWidth] = useState(0.1);

  const tooltipRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Dark mode implementation
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--light-bg", "#1a1a2e");
      root.style.setProperty("--card-bg", "#16213e");
      root.style.setProperty("--text-color", "#e6e6e6");
      root.style.setProperty("--text-light", "#b0b0b0");
    } else {
      root.style.setProperty("--light-bg", "#f8f9fa");
      root.style.setProperty("--card-bg", "#ffffff");
      root.style.setProperty("--text-color", "#2b2d42");
      root.style.setProperty("--text-light", "#6c757d");
    }
  }, [isDarkMode]);

  // Simulate map loading with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoading(false);

      // Add a slight delay before triggering animations
      setTimeout(() => {
        setAnimationCompleted(true);
      }, 300);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add scroll animation effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const handleDistrictHover = (district, event) => {
    if (district) {
      setTooltip({
        visible: true,
        content: district.charAt(0).toUpperCase() + district.slice(1),
        x: event.clientX,
        y: event.clientY,
      });
    } else {
      setTooltip({ ...tooltip, visible: false });
    }
  };

  // Update tooltip position when mouse moves
  useEffect(() => {
    if (tooltip.visible && tooltipRef.current) {
      tooltipRef.current.style.left = `${tooltip.x + 10}px`;
      tooltipRef.current.style.top = `${tooltip.y - 30}px`;
    }
  }, [tooltip]);

  // Demo section content
  const renderDemoSection = () => (
    <SectionCard
      title={
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Interactive Map Demo</span>
          <span className="badge bg-light text-primary d-flex align-items-center">
            <FiChevronDown className="me-1" /> Click to Interact
          </span>
        </div>
      }
    >
      <div className="row">
        <div className="col-lg-7 mb-4 mb-lg-0 d-flex justify-content-center align-items-center">
          <div
            className="map-container position-relative d-flex justify-content-center"
            ref={mapContainerRef}
          >
            {isMapLoading && (
              <div className="map-loading">
                <div className="spinner"></div>
              </div>
            )}
            <div
              className={`text-center ${
                animationCompleted ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <SriLankaDistrictMap
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
                onDistrictHover={handleDistrictHover}
                onDistrictLeave={() =>
                  setTooltip({ ...tooltip, visible: false })
                }
                width={width}
                height={height}
                highlightColor={highlightColor}
                mapbackgroundcolor={defaultColor}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                mapRegionClassName={`${
                  selectedDistrict ? "selected-district-pulse" : ""
                }`}
                hoverColor={hoverColor}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          {/* Controls panel */}
          <div
            className={`card control-panel h-100 ${
              animationCompleted ? "animate-fade-in-delay-1" : "opacity-0"
            }`}
          >
            <div className="card-body p-4">
              <h3 className="h5 mb-4 d-flex align-items-center">
                <FiSettings className="me-2" />
                Customize Map
              </h3>

              {/* All the controls */}
              <div className="mb-4">
                <label htmlFor="district-select" className="form-label">
                  Select a district:
                </label>
                <select
                  id="district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a district</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district.charAt(0).toUpperCase() + district.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="highlight-color"
                  className="form-label d-flex justify-content-between"
                >
                  <span>Highlight Color:</span>
                  <span className="text-muted">{highlightColor}</span>
                </label>
                <input
                  id="highlight-color"
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                  className="form-control form-control-color w-100"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="default-color"
                  className="form-label d-flex justify-content-between"
                >
                  <span>Map Background Color:</span>
                  <span className="text-muted">{defaultColor}</span>
                </label>
                <input
                  id="default-color"
                  type="color"
                  value={defaultColor}
                  onChange={(e) => setDefaultColor(e.target.value)}
                  className="form-control form-control-color w-100"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="stroke-color"
                  className="form-label d-flex justify-content-between"
                >
                  <span>Stroke Color:</span>
                  <span className="text-muted">{strokeColor}</span>
                </label>
                <input
                  id="stroke-color"
                  type="color"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="form-control form-control-color w-100"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="stroke-width"
                  className="form-label d-flex justify-content-between"
                >
                  <span>Stroke Width:</span>
                  <span className="badge bg-light text-primary">
                    {strokeWidth}
                  </span>
                </label>
                <input
                  id="stroke-width"
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                  className="form-range"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hover-color"
                  className="form-label d-flex justify-content-between"
                >
                  <span>Hover Color:</span>
                  <span className="text-muted">{hoverColor}</span>
                </label>
                <input
                  id="hover-color"
                  type="color"
                  value={hoverColor}
                  onChange={(e) => setHoverColor(e.target.value)}
                  className="form-control form-control-color w-100"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="map-width"
                  className="form-label d-flex justify-content-between"
                >
                  <span>Map Width:</span>
                  <span className="badge bg-light text-primary">{width}px</span>
                </label>
                <input
                  id="map-width"
                  type="range"
                  min="150"
                  max="500"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="form-range"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="map-height"
                  className="form-label d-flex justify-content-between"
                >
                  <span>Map Height:</span>
                  <span className="badge bg-light text-primary">
                    {height}px
                  </span>
                </label>
                <input
                  id="map-height"
                  type="range"
                  min="300"
                  max="700"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="form-range"
                />
              </div>

              {selectedDistrict && (
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: `${highlightColor}20`,
                    borderLeft: `4px solid ${highlightColor}`,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <FiInfo
                      className="me-2"
                      style={{ color: highlightColor }}
                    />
                    <span className="fw-bold">Selected:</span>
                    <span
                      className="badge ms-2"
                      style={{
                        backgroundColor: highlightColor,
                        color: "white",
                      }}
                    >
                      {selectedDistrict.charAt(0).toUpperCase() +
                        selectedDistrict.slice(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );

  // Examples section content
  const renderExamplesSection = () => (
    <SectionCard title="Map Styling Examples">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 examples-grid">
        {/* Classic Style */}
        <div className="col animate-on-scroll">
          <div className="card h-100 text-center">
            <div className="card-header bg-light">
              <h3 className="h5 mb-0">Classic Style</h3>
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <SriLankaDistrictMap
                selectedDistrict="colombo"
                width={180}
                height={360}
                interactive={false}
                highlightColor="#4361ee"
                hoverColor="#a3b8ff"
                strokeWidth={0.2}
              />
              <div className="mt-3">
                <span className="badge bg-primary">Default Theme</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nature Theme */}
        <div className="col animate-on-scroll">
          <div className="card h-100 text-center">
            <div className="card-header bg-light">
              <h3 className="h5 mb-0">Nature Theme</h3>
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <SriLankaDistrictMap
                selectedDistrict="galle"
                width={180}
                height={360}
                highlightColor="#2a9d8f"
                mapbackgroundcolor="#e9f5db"
                strokeColor="#264653"
                hoverColor="#83c5be"
                strokeWidth={0.15}
                interactive={false}
              />
              <div className="mt-3">
                <span className="badge" style={{ backgroundColor: "#2a9d8f" }}>
                  Eco Friendly
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Design */}
        <div className="col animate-on-scroll">
          <div className="card h-100 text-center">
            <div className="card-header bg-light">
              <h3 className="h5 mb-0">Modern Design</h3>
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <SriLankaDistrictMap
                selectedDistrict="kandy"
                width={180}
                height={360}
                highlightColor="#f72585"
                mapbackgroundcolor="#f8f9fa"
                strokeColor="#3a0ca3"
                hoverColor="#ffb3d9"
                strokeWidth={0.25}
                interactive={false}
              />
              <div className="mt-3">
                <span className="badge" style={{ backgroundColor: "#f72585" }}>
                  Contemporary
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );

  // Usage section content
  const renderUsageSection = () => (
    <SectionCard title="Usage Instructions">
      <div className="alert alert-info mb-4">
        <div className="d-flex">
          <FiInfo className="me-2 mt-1" />
          <div>
            <strong>Installation:</strong>
            <code className="ms-2">npm install sri-lanka-map</code> or{" "}
            <code>yarn add sri-lanka-map</code>
          </div>
        </div>
      </div>

      <div className="mb-4 animate-on-scroll">
        <h4 className="h5 mb-3">Basic Usage:</h4>
        <pre className="code-block">
          <code>
            {`import SriLankaDistrictMap from 'sri-lanka-map';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  
  return (
    <SriLankaDistrictMap 
      selectedDistrict={selectedDistrict}
      onDistrictChange={setSelectedDistrict}
    />
  );
}`}
          </code>
        </pre>
      </div>

      <div className="mb-4 animate-on-scroll">
        <h4 className="h5 mb-3">Advanced Configuration:</h4>
        <pre className="code-block">
          <code>
            {`import SriLankaDistrictMap, { districts } from 'sri-lanka-map';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState('colombo');
  
  const handleDistrictHover = (district, event) => {
    console.log('Hovering over:', district);
  }
  
  return (
    <SriLankaDistrictMap 
      selectedDistrict={selectedDistrict}
      onDistrictChange={setSelectedDistrict}
      onDistrictHover={handleDistrictHover}
      width={250}
      height={500}
      highlightColor="#4361ee"
      mapbackgroundcolor="#e8f0fe"
      strokeColor="#333333"
      strokeWidth={0.15}
      hoverColor="#D4E6F1"
      interactive={true}
      className="my-custom-map"
    />
  );
}`}
          </code>
        </pre>
      </div>

      <div className="mb-4 animate-on-scroll">
        <h4 className="h5 mb-3">Available Props:</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>selectedDistrict</code>
                </td>
                <td>string</td>
                <td>''</td>
                <td>Currently selected district name</td>
              </tr>
              <tr>
                <td>
                  <code>onDistrictChange</code>
                </td>
                <td>function</td>
                <td>undefined</td>
                <td>Callback when district is clicked</td>
              </tr>
              <tr>
                <td>
                  <code>onDistrictHover</code>
                </td>
                <td>function</td>
                <td>undefined</td>
                <td>Callback when district is hovered</td>
              </tr>
              <tr>
                <td>
                  <code>width</code>
                </td>
                <td>number</td>
                <td>250</td>
                <td>Width of the map in pixels</td>
              </tr>
              <tr>
                <td>
                  <code>height</code>
                </td>
                <td>number</td>
                <td>500</td>
                <td>Height of the map in pixels</td>
              </tr>
              <tr>
                <td>
                  <code>highlightColor</code>
                </td>
                <td>string</td>
                <td>#fff</td>
                <td>Color for selected district</td>
              </tr>
              <tr>
                <td>
                  <code>mapbackgroundcolor</code>
                </td>
                <td>string</td>
                <td>#B9CFDE</td>
                <td>Default color for districts</td>
              </tr>
              <tr>
                <td>
                  <code>hoverColor</code>
                </td>
                <td>string</td>
                <td>#D4E6F1</td>
                <td>Color for district on hover</td>
              </tr>
              <tr>
                <td>
                  <code>strokeColor</code>
                </td>
                <td>string</td>
                <td>#000</td>
                <td>Color for district borders</td>
              </tr>
              <tr>
                <td>
                  <code>strokeWidth</code>
                </td>
                <td>number</td>
                <td>0.1</td>
                <td>Width of district borders</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );

  return (
    <div
      className={`container-fluid py-5 ${
        isDarkMode ? "bg-dark text-light" : "bg-light"
      }`}
    >
      {/* Header Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10 col-lg-8 text-center">
          <div className="demo-header">
            <h1 className="display-4 mb-3">
              <FiGlobe className="me-2" /> Sri Lanka District Map
            </h1>
            <p className="lead">
              An interactive, customizable React component for visualizing Sri
              Lankan districts
            </p>

            <div className="d-flex justify-content-center gap-2 mt-4">
              <span className="badge bg-primary d-flex align-items-center">
                <FiZap className="me-1" /> Interactive
              </span>
              <span className="badge bg-success d-flex align-items-center">
                <FiHeart className="me-1" /> Customizable
              </span>
              <span className="badge bg-info d-flex align-items-center">
                <FiCheck className="me-1" /> Responsive
              </span>
            </div>
          </div>

          <div className="nav nav-pills justify-content-center mb-4">
            <button
              className={`btn ${
                activeTab === "demo" ? "btn-primary" : "btn-outline-primary"
              } mx-2 d-flex align-items-center`}
              onClick={() => setActiveTab("demo")}
            >
              <FiMap className="me-2" /> Interactive Demo
            </button>
            <button
              className={`btn ${
                activeTab === "examples" ? "btn-primary" : "btn-outline-primary"
              } mx-2 d-flex align-items-center`}
              onClick={() => setActiveTab("examples")}
            >
              <FiSettings className="me-2" /> Style Examples
            </button>
            <button
              className={`btn ${
                activeTab === "usage" ? "btn-primary" : "btn-outline-primary"
              } mx-2 d-flex align-items-center`}
              onClick={() => setActiveTab("usage")}
            >
              <FiCode className="me-2" /> Usage Guide
            </button>
          </div>
        </div>
      </div>

      {/* Render appropriate section based on active tab */}
      {activeTab === "demo" && renderDemoSection()}
      {activeTab === "examples" && renderExamplesSection()}
      {activeTab === "usage" && renderUsageSection()}

      {/* Dark Mode Toggle */}
      <button
        className="mode-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>
    </div>
  );
}

export default App;
