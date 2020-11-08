const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');
const Gdk = gi.require('Gdk', '3.0');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        this.setBorderWidth(10);

        const rgba = new Gdk.RGBA({red: 0, green: 0.33, blue: 0.66, alpha: 1.0});
        const button = new Gtk.ColorButton.newWithRgba(rgba);
        button.setTitle('Select a Color!');

        const label = new Gtk.Label({label: 'Look at my color!'});
        label.overrideColor(Gtk.StateType.NORMAL, rgba);

        button.on('color-set', () => this.onColorChanged(button, label));
        
        const hbox = new Gtk.Box({
            orientation: Gtk.Orientation.HORIZONTAL,
            spacing: 0
        });
        hbox.packStart(button, false, false, 5);
        hbox.packStart(label, false, false, 5);
        this.add(hbox);
    }

    onColorChanged(button, label) {
        const rgba = button.getRgba();
        label.overrideColor(Gtk.StateType.NORMAL, rgba);
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
                title: 'Color Button',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
