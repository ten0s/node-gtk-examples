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

        const eventbox = new Gtk.EventBox();
        const label = new Gtk.Label({label: 'Double-Click Me!'});
        eventbox.setAboveChild(false);
        eventbox.on('button-press-event', (event) => this.onButtonPressed(eventbox, event, label));
        eventbox.add(label);
        this.add(eventbox);
        eventbox.setEvents(Gdk.EventMask.BUTTON_PRESS_MASK);
        eventbox.realize();

        this.setBorderWidth(10);
        this.setSizeRequest(200, 50);
    }

    onButtonPressed(eventbox, event, label) {
        // NB: Identifier can't have first digit
        if (event.type === Gdk.EventType['2BUTTON_PRESS']) {
            const text = label.getText();
            if (text[0] === 'D') {
                label.setText('I Was Double-Clicked!');
            } else {
                label.setText('Double-Click Me Again!');
            }
        }
        return false;
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
                title: 'GtkLabel Events',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
