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
        this.setSizeRequest(200, 100);

        const expander = new Gtk.Expander.newWithMnemonic('Click _Me For More!');
        const label = new Gtk.Label({label: 'Hide me or show me,\nthat is your choice.'});
        expander.add(label);
        expander.setExpanded(true);
        this.add(expander);
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
                title: 'Show & Hide',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
