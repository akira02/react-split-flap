# React Split Flap Demo

This demo showcases the React Split Flap Display component with various use cases including real-time clocks, counters, text carousels, and Japanese train station displays.

## Development with Hot Reload

For seamless development experience with live updates when you modify the main package:

### Method 1: Automatic Watch & Publish (Recommended)

1. **Terminal 1 - Start package watch mode:**

   ```bash
   # In the root directory (react-split-flap)
   yarn dev:watch
   ```

   This will:

   - Watch for changes in the source code
   - Automatically rebuild the package
   - Push updates to yalc (which updates the demo)

2. **Terminal 2 - Start demo with hot reload:**
   ```bash
   # In the demo directory
   cd demo
   yarn dev:hot
   ```

Now when you edit the source files in `../src/`, the changes will automatically:

1. Trigger a rebuild of the package
2. Push the update to yalc
3. Hot reload in the demo app

### Method 2: Manual Publishing

If you prefer manual control:

1. Start the demo: `yarn dev`
2. After making changes to the main package, run: `yarn yalc:publish` in the root directory
3. The demo will automatically hot reload with your changes

## Available Scripts

- `yarn dev` - Start the development server
- `yarn dev:hot` - Start with forced recompilation (useful for cache issues)
- `yarn build` - Build for production
- `yarn preview` - Preview the production build

## Features Demonstrated

- **Real-time Clock**: Updates every second showing hours, minutes, and seconds
- **Number Counter**: Auto-incrementing counter demonstrating numeric transitions
- **Text Carousel**: Rotating through different city names
- **Airport Codes**: Three-letter airport code transitions
- **Temperature Display**: Simulated temperature changes with degree symbol
- **Japanese Train Stations**: JR Yamanote Line station names in Japanese

## Customization

The demo shows various configurations:

- Different sizes (large, medium)
- Different themes (dark, light)
- Different character sets (numbers, alphanumeric)
- Different timing settings
- Custom styling and layouts
