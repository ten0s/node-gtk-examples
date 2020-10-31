const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        const fixed = new Gtk.Fixed();
        const button1 = new Gtk.Button({label: 'Pixel by pixel ...'});
        const button2 = new Gtk.Button({label: 'you choose my fate.'});
        button1.on('clicked', () => this.onButtonClicked());
        button2.on('clicked', () => this.onButtonClicked());
        fixed.put(button1, 0, 0);
        fixed.put(button2, 22, 35);
        this.add(fixed);
    }

    onButtonClicked() {
        this.destroy();
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
