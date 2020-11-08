const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');
const Pango = gi.require('Pango', '3.0');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        this.setBorderWidth(10);

        const label = new Gtk.Label({label: 'Look at the font!'});
        const font = Pango.fontDescriptionFromString('Sans Bold 12');
        label.modifyFont(font);
        const button = new Gtk.FontButton.newWithFont('Sans Bold 12');
        button.setTitle('Choose a Font');
        button.on('font-set', () => this.onFontChanged(button, label));
        
        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        vbox.packStart(button, false, false, 0);
        vbox.packStart(label, false, false, 0);
        this.add(vbox);
    }

    onFontChanged(button, label) {
        const font = button.getFont();
        const desc = Pango.fontDescriptionFromString(font);
        const buffer = `Font: ${font}`;
        label.setText(buffer);
        label.modifyFont(desc);
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
                title: 'Font Button',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
