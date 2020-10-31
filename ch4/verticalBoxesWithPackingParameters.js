const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');

gi.startLoop();
Gtk.init();

const names = ['Andrew', 'Joe', 'Samantha', 'Jonathan'];

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0,
        });
        for (const name of names) {
            const button = new Gtk.Button({label: name});
            vbox.packEnd(button, false, false, 5);
            button.on('clicked', () => this.onButtonClicked());
            button.setRelief(Gtk.ReliefStyle.NORMAL);
        }
        this.setBorderWidth(10);
        this.setSizeRequest(200, -1);
        this.add(vbox);
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
                title: 'Boxes',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
