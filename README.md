# Magnetic8

A keyboard-centric drawing application with an infinite canvas, inspired by Vim motions and Vimium.

🌐 **[Try Magnetic8 Online](http://magnetic8.com.s3-website.eu-central-1.amazonaws.com/)**

## Demonstration

[![Magnetic8 Demo](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE "Magnetic8 Demo")

Watch the demonstration video to see Magnetic8 in action:
- Real-time demonstration of keyboard controls
- Showcasing different modes and transformations
- Quick overview of the magnetic grouping system


## Core Concepts

### Magnetic Force
The fundamental principle behind Magnetic8 is the magnetic force that creates grouping between shapes. When shapes are magnetized with other shapes, they form cohesive groups while maintaining their individual properties.

### Keyboard-First Design
Every action in Magnetic8 is optimized for keyboard control, eliminating the need for constant mouse interaction. The controls are inspired by Vim's efficient motion system, making it incredibly fast for power users.

### Infinite Canvas and Bookmark feature
There is no limit how far you can go in any direction. For making sure you are not getting lost, Magnetic8 offers a Bookmark system.

# Application modes

## STANDARD mode (Default)

### CAMERA controls
Navigate through the infinite canvas using familiar Vim-like motions:
- <kbd>H</kbd> - Move camera left
- <kbd>L</kbd> - Move camera right
- <kbd>J</kbd> - Move camera down
- <kbd>K</kbd> - Move camera up
- <kbd>N</kbd> - Zoom out
- <kbd>M</kbd> - Zoom in

### INSERT Mode
Enter INSERT mode by pressing <kbd>I</kbd>. This mode allows you to create various shapes:
- <kbd>A</kbd> - Rectangle
- <kbd>B</kbd> - Circle
- <kbd>D</kbd> - Line
- <kbd>F</kbd> - Text
- <kbd>F</kbd> - Arrow
- <kbd>J</kbd> - Triangle
- <kbd>K</kbd> - Checkmark
- <kbd>L</kbd> - Image

  Press <kbd>ESC</kbd> to return to default mode

### FIND Mode
Activated by pressing <kbd>F</kbd>, this mode enables quick selection of shapes:
- Each shape displays a keyboard hint
- Type the displayed hint to select the corresponding shape
- Press <kbd>ESC</kbd> to cancel selection

### TRANSFORM Mode
After selecting a shape, various transformation modes become available:

#### Translation Mode (Default)
- Active immediately after selection
- Use <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> to move the selected shape
- Hold <kbd>SHIFT</kbd> for [TODO]
#### Scale Mode
- Press <kbd>S</kbd> to enter scale mode
- <kbd>H</kbd>, <kbd>L</kbd> - Adjust width in the right direction
- <kbd>J</kbd>, <kbd>K</kbd> - Adjust height in the down direction
- Hold <kbd>SHIFT</kbd> to invert the scale direction

#### Rotation Mode
- Press <kbd>R</kbd> to enter rotation mode
- <kbd>H</kbd>, <kbd>L</kbd> - Rotate counterclockwise/clockwise

### Magnetic Mode
After selecting a shape, activate magnetic mode by pressing <kbd>M</kbd>:

- Use <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> to attract other shapes using the magnetic force, the magnetized shape will change the position to be near the parent shape [TODO]
- use <kbd>M</kbd> again to magnetize other shapes without changing their position
- use [TODO] to demagnetize 

### Color Mode
[TODO]

### Border Mode 
[TODO]

### Rename Mode
[TODO]

### Save Mode
[TODO]

### Load Mode
[TODO]

### Bookmark mode
[TODO]

## Tips & Shortcuts

### Global Shortcuts
- <kbd>ESC</kbd> - Return to default mode
- [TODO]

### Magnetic Shortcuts
- [TODO] 

## License

Magnetic8 is released under the [TODO] License. See the [LICENSE](LICENSE) file for more details.