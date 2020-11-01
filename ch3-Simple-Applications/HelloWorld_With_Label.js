const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        this.setSizeRequest(200, 100);
        
        const label = new Gtk.Label({
            label: 'Hello World!',
            selectable: true,
        });
        /*
        const label = new Gtk.Label();
        label.setLabel('Hello World!');
        label.setSelectable(true);
        */
        
        this.add(label);
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
                title: 'Main Window',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
