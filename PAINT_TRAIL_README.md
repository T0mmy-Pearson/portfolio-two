# Paint Trail Effect

The "Artist" button in the Hero section now activates a paint trail effect instead of showing floating project cards.

## How it works:

1. Click the "Artist" button in the hero section
2. Your cursor changes to a paintbrush icon
3. Move your mouse around to leave colorful paint trails
4. Paint trails fade out automatically over 10 seconds
5. Colors change randomly as you paint
6. Press **ESC** to exit paint mode

## Features:

- **Custom paintbrush cursor**: SVG-based cursor that looks like a paintbrush
- **Dynamic paint trails**: Colorful dots that follow your mouse movement
- **Color variation**: Random colors from a predefined palette
- **Automatic cleanup**: Old paint trails fade out and are removed for performance
- **Easy exit**: Press ESC key to return to normal cursor mode
- **Performance optimized**: Limits the number of active paint trails

## Technical Implementation:

- `PaintTrailEffect.tsx`: Main component handling the paint trail logic
- Mouse movement tracking with `mousemove` event listener
- Custom cursor using CSS `cursor` property with SVG data URI
- React state management for paint trails array
- Automatic cleanup with `setInterval` for fade out effect
- Keyboard event handling for ESC key to exit paint mode

The paint trail effect provides an interactive artistic experience while maintaining good performance and user experience.
