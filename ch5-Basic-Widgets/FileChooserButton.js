const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        this.setBorderWidth(10);
        this.setSizeRequest(240, -1);

        const label = new Gtk.Label({label: ''});
        
        const chooser1 = new Gtk.FileChooserButton({
            title: 'Choose a Folder.',
            action: Gtk.FileChooserAction.SELECT_FOLDER
        });
        chooser1.setCurrentFolder(this.homedir());
        chooser1.on('selection-changed', () => this.onFolderChanged(chooser1, chooser2));
        
        const chooser2 = new Gtk.FileChooserButton({
            title: 'Choose a File.',
            action: Gtk.FileChooserAction.OPEN
        });
        chooser2.on('selection-changed', () => this.onFileChanged(chooser2, label));
        chooser2.setCurrentFolder(this.homedir());        

        const filter1 = new Gtk.FileFilter();
        filter1.setName('Image Files');
        filter1.addPattern('*.png');
        filter1.addPattern('*.jpg');
        filter1.addPattern('*.gif');
        
        const filter2 = new Gtk.FileFilter();
        filter2.setName('All Files');
        filter2.addPattern('*');
        
        chooser2.addFilter(filter1);
        chooser2.addFilter(filter2);

        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        vbox.packStart(chooser1, false, false, 0);
        vbox.packStart(chooser2, false, false, 0);
        vbox.packStart(label, false, false, 0);
        this.add(vbox);
    }

    onFolderChanged(chooser1, chooser2) {
        const folder = chooser1.getFilename();
        chooser2.setCurrentFolder(folder);
    }

    onFileChanged(chooser2, label) {
        const file = chooser2.getFilename();
        label.setText(file);
    }

    homedir() {
        return require('os').homedir();
    }
}

class App extends Gtk.Application {
    constructor(args) {
        super({
            application_id: 'org.example.myapp',
            ...args
        });
        this.window = null;
        this.on('activate', this.onActivate);
    }

    onActivate() {
        if (!this.window) {
            this.window = new AppWindow({
                title: 'File Chooser Button',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
