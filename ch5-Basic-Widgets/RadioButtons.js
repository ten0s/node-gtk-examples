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

        const radio1 = new Gtk.RadioButton.newWithLabel(null, 'I want to be clicked!');
        const radio2 = new Gtk.RadioButton.newWithLabelFromWidget(radio1, 'Click me instead!');
        const radio3 = new Gtk.RadioButton.newWithLabelFromWidget(radio1, 'No! Click me!');
        const radio4 = new Gtk.RadioButton.newWithLabelFromWidget(radio1, 'No! Click me instead!');
        radio1.on('toggled', () => this.onButtonToggled(radio1));
        radio2.on('toggled', () => this.onButtonToggled(radio2));
        radio3.on('toggled', () => this.onButtonToggled(radio3));
        radio4.on('toggled', () => this.onButtonToggled(radio4));
        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        vbox.packStart(radio1, false, false, 0);
        vbox.packStart(radio2, false, false, 0);
        vbox.packStart(radio3, false, false, 0);
        vbox.packStart(radio4, false, false, 0);
        this.add(vbox);
    }

    onButtonToggled(self) {
        if (self.active) {
            console.log(self.getLabel());
        }
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
                title: 'Radio Buttons',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
