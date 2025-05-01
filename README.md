# Sri Lanka District Map

A customizable React component for rendering an interactive SVG map of Sri Lanka's districts.

![Sri Lanka District Map](![alt text](image.png))

## Installation

```bash
npm install sri-lanka-map
# or
yarn add sri-lanka-map
```

## Features

- Interactive district selection
- Customizable colors and styling
- Responsive design
- Hover effects
- Lightweight SVG-based rendering

## Basic Usage

```jsx
import { SriLankaDistrictMap } from "sri-lanka-map";
import "sri-lanka-map/dist/map.css";

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <div className="map-container">
      <SriLankaDistrictMap
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
      />

      {selectedDistrict && <div>Selected district: {selectedDistrict}</div>}
    </div>
  );
}
```

## Props

| Prop                 | Type     | Default             | Description                                   |
| -------------------- | -------- | ------------------- | --------------------------------------------- |
| `selectedDistrict`   | string   | `null`              | Currently selected district                   |
| `onDistrictChange`   | function | `null`              | Callback function when a district is selected |
| `width`              | number   | `100`               | Width of the map                              |
| `height`             | number   | `250`               | Height of the map                             |
| `highlightColor`     | string   | `"#fff"`            | Color of the selected district                |
| `mapbackgroundcolor` | string   | `"#B9CFDE"`         | Default color of map districts                |
| `strokeColor`        | string   | `"#000"`            | Color of district borders                     |
| `strokeWidth`        | number   | `0.1`               | Width of district borders                     |
| `interactive`        | boolean  | `true`              | Whether the map is interactive                |
| `mapClassName`       | string   | `"sl-district-map"` | CSS class for the map container               |
| `activeClassName`    | string   | `"active-path"`     | CSS class for the selected district           |
| `mapRegionClassName` | string   | `"map-region"`      | CSS class for all district regions            |
| `hoverColor`         | string   | `"#D4E6F1"`         | Color of hovered district                     |

## Advanced Usage

### Custom Styling

```jsx
<SriLankaDistrictMap
  width={300}
  height={500}
  highlightColor="#4CAF50"
  mapbackgroundcolor="#E0E0E0"
  strokeColor="#333"
  strokeWidth={0.3}
  hoverColor="#A5D6A7"
  mapClassName="custom-map"
  activeClassName="selected-district"
/>
```

### Non-interactive Map

```jsx
<SriLankaDistrictMap
  interactive={false}
  selectedDistrict="Colombo"
  highlightColor="#FF5722"
/>
```

## CSS Customization

You can further customize the map appearance using CSS:

```css
.sl-district-map {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
}

.map-region {
  transition: all 0.3s ease;
}

.map-region:hover {
  opacity: 0.9;
}

.active-path {
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
}
```

## Browser Support

Works in all modern browsers that support SVG (Chrome, Firefox, Safari, Edge).

## License

MIT © [Vishani Raveendran]
