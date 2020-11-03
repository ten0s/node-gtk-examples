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

        const check1 = new Gtk.CheckButton({label: 'I am the main option.'});
        const check2 = new Gtk.CheckButton({label: 'I rely on the other guy.'});
        check2.setSensitive(false);
        check1.on('toggled', () => this.onButtonChecked(check1, check2));
        const close = new Gtk.Button.newWithMnemonic('_Close');
        close.on('clicked', () => this.onButtonCloseClicked());
        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        vbox.packStart(check1, false, true, 0);
        vbox.packStart(check2, false, true, 0);
        vbox.packStart(close, false, true, 0);
        this.add(vbox);
    }

    onButtonChecked(self, other) {
        other.setSensitive(self.active);
    }

    onButtonCloseClicked() {
        this.destroy()
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
                title: 'Check Buttons',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
