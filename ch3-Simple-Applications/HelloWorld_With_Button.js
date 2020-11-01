const gi = require('node-gtk');
const Gtk = gi.require('Gtk', '3.0');

gi.startLoop();
Gtk.init();

class AppWindow extends Gtk.ApplicationWindow {
    constructor(args) {
        super(args);
        this.on('show', Gtk.main);
        this.on('destroy', Gtk.mainQuit);

        this.setBorderWidth(25);
        this.setSizeRequest(200, 100);
        
        const button = new Gtk.Button.newWithMnemonic('_Close');
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
                title: 'Main Window',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
