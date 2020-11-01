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
        this.setSizeRequest(225, 150);

        const hpaned = new Gtk.Paned(Gtk.Orientation.HORIZONTAL);
        const button1 = new Gtk.Button({label: 'Resize'});
        const button2 = new Gtk.Button({label: 'Me!'});
        button1.on('clicked', () => this.onButtonClicked());
        button2.on('clicked', () => this.onButtonClicked());
        hpaned.add1(button1);
        hpaned.add2(button2);
        hpaned.setPosition(100);
        this.add(hpaned);
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
                title: 'Panes',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
