const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        const grid = new Gtk.Grid();
        const label1 = new Gtk.Label({label: 'Enter the following information ...'});
        const label2 = new Gtk.Label({label: 'Name: '});
        const entry = new Gtk.Entry();
        grid.attach(label1, 0, 0, 2, 1);
        grid.attach(label2, 0, 1, 1, 1);
        grid.attach(entry, 1, 1, 1, 1);
        grid.setRowSpacing(5);
        grid.setColumnSpacing(5);
        this.add(grid);
        
        this.setBorderWidth(10);
        this.setSizeRequest(150, 100);
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
                title: 'Tables',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
