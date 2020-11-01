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
        
        this.label = new Gtk.Label({label: 'Bunny'});
        this.add(this.label);
        
        this.on('key-press-event', () => this.onKeyPress());
    }

    onKeyPress() {
        const tmp = this.label.getText();
        this.label.setText(this.getTitle());
        this.setTitle(tmp);
        return false;
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
                title: 'Bugs',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
