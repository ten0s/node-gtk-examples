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
        this.setSizeRequest(230, 100);
        
        const button = new Gtk.Button();
        const hbox = new Gtk.Box({
            orientation: Gtk.Orientation.HORIZONTAL,
            spacing: 0
        });
        const iconTheme = Gtk.IconTheme.getDefault();
        const icon = iconTheme.loadIcon('window-close', -1, Gtk.IconLookupFlags.FORCE_SIZE);
        const image = new Gtk.Image.newFromPixbuf(icon);
        hbox.add(image);
        const label = new Gtk.Label.newWithMnemonic('_Close');
        hbox.add(label);
        hbox.setHomogeneous(true);
        button.add(hbox);
        button.on('clicked', () => this.onButtonClicked());
        button.setRelief(Gtk.ReliefStyle.NORMAL);
        this.add(button);
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
                title: 'Look-alike Stock Item',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
