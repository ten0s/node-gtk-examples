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
        
        const question = new Gtk.Label({label: `What is the password for ${process.env['USER']}?`});
        const label = new Gtk.Label({label: 'Password:'});
        const passwd = new Gtk.Entry();
        passwd.setVisibility(false);
        // This is how to set a different invisible char, but defaut char is prettier
        //passwd.setInvisibleChar('*'.charCodeAt());

        const hbox = new Gtk.Box({
            orientation: Gtk.Orientation.HORIZONTAL,
            spacing: 0
        });
        hbox.packStart(label, false, false, 5);
        hbox.packStart(passwd, false, false, 5);
        
        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        vbox.packStart(question, false, false, 0);
        vbox.packStart(hbox, false, false, 0);
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
                title: 'Password',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
