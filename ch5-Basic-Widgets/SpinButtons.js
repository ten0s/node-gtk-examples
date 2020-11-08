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
        this.setSizeRequest(180, 100);

        const adj1 = new Gtk.Adjustment({
            lower: 0.0,
            upper: 10.0,
            step_increment: 1.0,
        });
        const spin1 = new Gtk.SpinButton({
            adjustment: adj1,
            digits: 0
        });
        spin1.setValue(5);
        
        const adj2 = new Gtk.Adjustment({
            lower: 0.0,
            upper: 1.0,
        });
        const spin2 = new Gtk.SpinButton();
        spin2.setAdjustment(adj2);
        spin2.setIncrements(0.1, 0.0);
        spin2.setDigits(1);
        spin2.setValue(0.5);
        
        const spin3 = new Gtk.SpinButton.newWithRange(1.0, 5.0, 1.0);

        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        
        vbox.packStart(spin1, false, false, 5);
        vbox.packStart(spin2, false, false, 5);
        vbox.packStart(spin3, false, false, 5);
        this.add(vbox);
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
                title: 'Spin Buttons',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
