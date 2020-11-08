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
        this.setSizeRequest(250, -1);

        const scaleInt = new Gtk.Scale.newWithRange(
            Gtk.Orientation.HORIZONTAL, 0.0, 10.0, 1.0);
        scaleInt.setDigits(0);
        scaleInt.setValuePos(Gtk.PositionType.RIGHT);
        
        const scaleFloat = new Gtk.Scale.newWithRange(
            Gtk.Orientation.HORIZONTAL, 0.0, 1.0, 0.1);
        scaleFloat.setDigits(1);
        scaleFloat.setValuePos(Gtk.PositionType.LEFT);
        
        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        vbox.packStart(scaleInt, false, false, 5);
        vbox.packStart(scaleFloat, false, false, 5);
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
                title: 'Scales',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
