# DesignVersionControl

This script provides automatic version control for Adobe Illustrator files by creating timestamped backups whenever you save your work. It also maintains copies of all linked assets to ensure complete project versioning.

## Features

- **Automatic Backups**: Creates timestamped copies of your Illustrator files on each save
- **Linked Assets Preservation**: Backs up all linked images and external files
- **Cross-Platform**: Works on both macOS and Windows
- **Simple Installation**: Easy to set up with no configuration needed

## Installation Guide

### Method 1: Startup Scripts Folder (Recommended)

1. Locate your Adobe Illustrator Startup Scripts folder:
   - **Windows**: `C:\Program Files\Adobe\Adobe Illustrator [Version]\Presets\en_US\Scripts\Startup Scripts\`
   - **macOS**: `/Applications/Adobe Illustrator [Version]/Presets/en_US/Scripts/Startup Scripts/`

2. Copy the `IllustratorVersionControl.jsx` file to this folder.

3. Restart Adobe Illustrator. The script will automatically load and run each time you start Illustrator.

### Method 2: Run Manually After Installation

1. In Adobe Illustrator, go to **File > Scripts > Other Script...**
2. Navigate to and select the `IllustratorVersionControl.jsx` file
3. The script will now be installed and will run automatically on document saves

### Method 3: Create a Custom Action (Alternative)

If the automatic event listener doesn't work in your version of Illustrator:

1. Open Adobe Illustrator
2. Open the Actions panel (Window > Actions)
3. Create a new Action Set by clicking the folder icon
4. Create a new Action within that set
5. Click "Record" and then go to File > Scripts > Other Script...
6. Select the `IllustratorVersionControl.jsx` file
7. Stop recording
8. Assign a keyboard shortcut to this action (Edit > Keyboard Shortcuts)
9. Run this action after saving your file

## Usage Notes

- The script creates a `/backups/` folder in the same directory as your Illustrator file
- Each backup is saved with a timestamp: `filename_YYYY-MM-DD_HH-MM.ai`
- Linked assets are stored in `/backups/linked-assets/TIMESTAMP/`
- The script only runs on files that have been saved at least once

## Platform-Specific Notes

### Windows Users

- If you receive security errors, right-click the script file, select Properties, and unblock it
- Some Windows security settings may prevent the script from creating folders. If this happens, try running Illustrator as Administrator

### macOS Users

- If you encounter permission issues, ensure Adobe Illustrator has full disk access in System Preferences > Security & Privacy > Privacy > Full Disk Access
- If you're using macOS Catalina or later, you may need to grant additional permissions the first time you run the script

## Troubleshooting

- **Script doesn't run on save**: Ensure you've installed it in the correct Startup Scripts folder
- **Cannot create folders**: Check file permissions in the directory where your Illustrator file is saved
- **Script runs slowly**: Large linked files may take time to copy. Consider using Method 3 for manual control

## Performance Considerations

This script is designed to be lightweight, but backup operations do require some processing time. The impact on save time depends on:

- Number and size of linked assets
- Your computer's disk speed
- Current disk activity

For very large projects with many linked high-resolution images, you may notice a slight delay during the save process.

## License

This script is provided as-is under the MIT License. Feel free to modify it to suit your needs.