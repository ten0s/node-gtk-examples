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
        this.setSizeRequest(250, 100);

        const notebook = new Gtk.Notebook();
        const label1 = new Gtk.Label({label: 'Page 1'});
        const label2 = new Gtk.Label({label: 'Page 2'});
        const child1 = new Gtk.Label({label: 'Go to page 2 to find the answer.'});
        const child2 = new Gtk.Label({label: 'Go to page 1 to find the answer.'});
        notebook.appendPage(child1, label1);
        notebook.appendPage(child2, label2);

        notebook.setTabPos(Gtk.PositionType.BOTTOM);
        this.add(notebook);
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
