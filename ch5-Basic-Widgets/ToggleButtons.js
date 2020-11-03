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
        
        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        const toggle1 = new Gtk.ToggleButton.newWithMnemonic('_Deactivate the other one!');
        const toggle2 = new Gtk.ToggleButton.newWithMnemonic('_No! Deactivate that one!');
        toggle1.on('toggled', () => this.onButtonToggled(toggle1, toggle2));
        toggle2.on('toggled', () => this.onButtonToggled(toggle2, toggle1));
        vbox.packStart(toggle1, true, true, 1);
        vbox.packStart(toggle2, true, true, 1);
        this.add(vbox);
    }

    onButtonToggled(self, other) {
        other.setSensitive(!self.active);
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
                title: 'Toggle Buttons',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
