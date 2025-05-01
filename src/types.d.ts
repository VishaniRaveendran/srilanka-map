declare module "sri-lanka-map" {
  export interface SriLankaDistrictMapProps {
    // Core functionality
    selectedDistrict?: string | null;
    onDistrictChange?: ((district: string) => void) | null;

    // Appearance
    width?: number;
    height?: number;
    highlightColor?: string;
    defaultColor?: string;

    // Interactive options
    interactive?: boolean;

    // Custom styling
    mapClassName?: string;
    activeClassName?: string;
    mapRegionClassName?: string;
  }

  export const districts: string[];

  export default function SriLankaDistrictMap(
    props: SriLankaDistrictMapProps
  ): JSX.Element;
}
