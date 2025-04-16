/**
 * Illustrator Automatic Version Control Script
 * 
 * This script automatically creates timestamped backups of Illustrator files and their linked assets
 * when a document is saved. It runs as a save event listener to provide version control
 * functionality without manual intervention.
 * 
 * @author Claude
 * @version 1.0
 * @compatibility Adobe Illustrator 2020 and above
 * @platform Windows & macOS
 */

// Global variables
var mainBackupFolder = "backups";
var linkedAssetsFolder = "linked-assets";

/**
 * Main function that runs when document is saved
 */
function onDocumentSave() {
    try {
        if (!app.activeDocument) {
            return; // No active document
        }
        
        // Get current document information
        var currentDoc = app.activeDocument;
        var docPath = currentDoc.path;
        var docName = currentDoc.name.replace(/\.ai$/i, "");
        
        // Create backup directory if it doesn't exist
        var backupDir = createBackupDirectory(docPath);
        if (!backupDir) return;
        
        // Generate timestamped filename
        var timestamp = getCurrentTimestamp();
        var backupFilename = docName + "_" + timestamp + ".ai";
        var backupFilePath = new File(backupDir + "/" + backupFilename);
        
        // Save a copy of the current document to the backup folder
        currentDoc.saveAs(backupFilePath);
        
        // Handle linked assets
        backupLinkedAssets(currentDoc, backupDir, timestamp);
        
        // Log success message
        $.writeln("Backup created: " + backupFilename);
        
    } catch (error) {
        alert("Backup Error: " + error);
    }
}

/**
 * Creates the backup directory structure if it doesn't exist
 * @param {Folder} docPath - Path of the current document
 * @return {Folder} - The backup directory or null if failed
 */
function createBackupDirectory(docPath) {
    if (!docPath) {
        alert("Please save your document before creating a backup.");
        return null;
    }
    
    // Create main backup directory
    var backupDir = new Folder(docPath + "/" + mainBackupFolder);
    if (!backupDir.exists) {
        if (!backupDir.create()) {
            alert("Failed to create backup directory.");
            return null;
        }
    }
    
    // Create linked assets subdirectory
    var linkedAssetsDir = new Folder(backupDir + "/" + linkedAssetsFolder);
    if (!linkedAssetsDir.exists) {
        linkedAssetsDir.create();
    }
    
    return backupDir;
}

/**
 * Generates a timestamp string in the format YYYY-MM-DD_HH-MM
 * @return {String} - Formatted timestamp
 */
function getCurrentTimestamp() {
    var now = new Date();
    
    var year = now.getFullYear();
    var month = padZero(now.getMonth() + 1);
    var day = padZero(now.getDate());
    var hours = padZero(now.getHours());
    var minutes = padZero(now.getMinutes());
    
    return year + "-" + month + "-" + day + "_" + hours + "-" + minutes;
}

/**
 * Pads a number with leading zero if less than 10
 * @param {Number} num - Number to pad
 * @return {String} - Padded number string
 */
function padZero(num) {
    return (num < 10) ? "0" + num : num.toString();
}

/**
 * Backs up all linked assets in the document
 * @param {Document} doc - The active document
 * @param {Folder} backupDir - The backup directory
 * @param {String} timestamp - Current timestamp
 */
function backupLinkedAssets(doc, backupDir, timestamp) {
    try {
        // Create a timestamped subfolder for this backup's linked assets
        var assetsDirPath = backupDir + "/" + linkedAssetsFolder + "/" + timestamp;
        var assetsDir = new Folder(assetsDirPath);
        
        if (!assetsDir.exists) {
            assetsDir.create();
        }
        
        if (doc.placedItems && doc.placedItems.length > 0) {
            for (var i = 0; i < doc.placedItems.length; i++) {
                var placedItem = doc.placedItems[i];
                if (placedItem.file) {
                    // Get the file of the placed item
                    var sourceFile = placedItem.file;
                    
                    // Create the destination file
                    var fileName = sourceFile.name;
                    var destFile = new File(assetsDir + "/" + fileName);
                    
                    // Copy the file
                    sourceFile.copy(destFile);
                }
            }
            $.writeln("Linked assets backed up: " + doc.placedItems.length + " files");
        }
    } catch (e) {
        $.writeln("Error backing up linked assets: " + e);
    }
}

/**
 * Set up event listeners for document save
 */
function setupEventListeners() {
    try {
        // Check if we can use ExtendScript event listeners
        if (app.addEventListener) {
            app.addEventListener('afterSaveDocument', onDocumentSave);
            $.writeln("Event listener for afterSaveDocument registered.");
        } else {
            alert("This version of Illustrator doesn't support event listeners.\n" +
                  "Please run this script manually after saving or use the alternative setup in the README.");
        }
    } catch (e) {
        alert("Error setting up event listeners: " + e);
    }
}

// Initialize the script
setupEventListeners();

// Add this for manual execution as well
if (app.documents.length > 0) {
    onDocumentSave();
}