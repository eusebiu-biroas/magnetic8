# Magnetic8

A keyboard-centric vector drawing application with an infinite canvas, inspired by Vim motions. Magnetic8 introduces a unique magnetic force concept that allows shapes to naturally group together, making complex drawings intuitive and organized.

## Demonstration

[![Magnetic8 Demo](https://img.youtube.com/vi/p0L7HbCBW-Q/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE "Magnetic8 Demo")

Watch our demonstration video to see Magnetic8 in action:
- Quick overview of the magnetic grouping system
- Real-time demonstration of keyboard controls
- Example workflow of creating complex diagrams
- Showcasing different modes and transformations
- Tips and tricks for efficient usage

*Note: For more video tutorials and examples, visit our [YouTube Channel](https://youtube.com/magnetic8)*

## Core Concepts

### Magnetic Force
The fundamental principle behind Magnetic8 is the magnetic force that creates natural grouping between shapes. When shapes are placed near each other, they automatically form cohesive groups while maintaining their individual properties.

### Keyboard-First Design
Every action in Magnetic8 is optimized for keyboard control, eliminating the need for constant mouse interaction. The controls are inspired by Vim's efficient motion system, making it incredibly fast for power users.

## Navigation Modes

### CAMERA Mode (Default)
Navigate through the infinite canvas using familiar Vim-like motions:
- `H` - Move camera left
- `L` - Move camera right
- `J` - Move camera down
- `K` - Move camera up
- `N` - Zoom out
- `M` - Zoom in

### INSERT Mode
Enter INSERT mode by pressing `I`. This mode allows you to create various shapes:
- `A` - Draw Rectangle
- `B` - Draw Circle
- `D` - Draw Line
- `F` - Add Text
  Press `ESC` to return to default mode

### FIND Mode
Activated by pressing `F`, this mode enables quick selection of shapes:
- Each shape displays a keyboard hint
- Type the displayed hint to select the corresponding shape
- Press `ESC` to cancel selection

### TRANSFORM Mode
After selecting a shape, various transformation modes become available:

#### Translation Mode (Default)
- Active immediately after selection
- Use `H`, `J`, `K`, `L` to move the selected shape
- Hold `SHIFT` for fine-tuned movement

#### Scale Mode
- Press `S` to enter scale mode
- `H`, `L` - Adjust width
- `J`, `K` - Adjust height
- Hold `SHIFT` to maintain aspect ratio

#### Rotation Mode
- Press `R` to enter rotation mode
- `H`, `L` - Rotate counterclockwise/clockwise
- Hold `SHIFT` for fine-tuned rotation

## Tips & Shortcuts

### Global Shortcuts
- `ESC` - Return to default mode
- `CTRL + Z` - Undo
- `CTRL + SHIFT + Z` - Redo
- `CTRL + S` - Save current drawing
- `CTRL + O` - Open existing drawing

### Selection Shortcuts
- `G` - Group selected shapes
- `U` - Ungroup shapes
- `DELETE` - Remove selected shape
- `CTRL + C` - Copy selected shape
- `CTRL + V` - Paste copied shape

## Installation

```bash
npm install magnetic8
# or
yarn add magnetic8
```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to Magnetic8.

## License

Magnetic8 is released under the MIT License. See the [LICENSE](LICENSE) file for more details.