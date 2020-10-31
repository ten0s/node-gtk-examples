const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');
const util = require('util');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);
        // returning 'true' prevents default behavior
        this.on('delete-event', () => false);
    }
}

class App extends Gtk.Application {
    constructor(args) {
        super({
            application_id: 'org.example.myapp',
            ...args
        });
        this.window = null;
        this.on('startup', () => console.log('startup'));
        this.on('activate', this.onActivate);
        this.on('shutdown', () => console.log('shutdown'));
    }

    onActivate() {
        console.log('activate');
        if (!this.window) {
            this.window = new AppWindow({
                //application: this,
                title: 'Main Window',
                resizable: false,
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
