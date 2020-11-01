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
        this.setSizeRequest(250, 150);

        const vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 0
        });
        this.add(vbox);

        const notebook = new Gtk.Notebook();
        notebook.setTabPos(Gtk.PositionType.BOTTOM);
        vbox.packStart(notebook, false, false, 5);

        const label1 = new Gtk.Label({label: 'Page 1'});
        const label2 = new Gtk.Label({label: 'Page 2'});
        const label3 = new Gtk.Label({label: 'Page 3'});
        const label4 = new Gtk.Label({label: 'Page 4'});

        const button1 = new Gtk.Button({label: 'Go to Page 2'});
        button1.on('clicked', () => this.onNotebookButtonClicked(notebook));
        const button2 = new Gtk.Button({label: 'Go to Page 3'});
        button2.on('clicked', () => this.onNotebookButtonClicked(notebook));
        const button3 = new Gtk.Button({label: 'Go to Page 4'});
        button3.on('clicked', () => this.onNotebookButtonClicked(notebook));
        const button4 = new Gtk.Button({label: 'Go to Page 1'});
        button4.on('clicked', () => this.onNotebookButtonClicked(notebook));

        const page1 = notebook.appendPage(button1, label1);
        const page2 = notebook.appendPage(button2, label2);
        const page3 = notebook.appendPage(button3, label3);
        const page4 = notebook.appendPage(button4, label4);

        const buttonbox = new Gtk.ButtonBox(Gtk.Orientation.HORIZONTAL);
        vbox.packStart(buttonbox, false, false, 5);
        const buttonPrev = new Gtk.Button({label: 'Previous Page'});
        buttonPrev.on('clicked', () => this.onButtonPrevClicked(notebook));
        const buttonClose = new Gtk.Button({label: 'Close'});
        buttonClose.on('clicked', () => this.onButtonCloseClicked());
        buttonbox.packEnd(buttonPrev, false, false, 5);
        buttonbox.packEnd(buttonClose, false, false, 5);
    }

    onNotebookButtonClicked(notebook) {
        let nextpage = notebook.getCurrentPage() + 1;
        if (nextpage === 4) {
            nextpage = 0;
        }
        notebook.setCurrentPage(nextpage);
    }

    onButtonPrevClicked(notebook) {
        let nextpage = notebook.getCurrentPage() - 1;
        if (nextpage === -1) {
            nextpage = 3;
        }
        notebook.setCurrentPage(nextpage);
    }

    onButtonCloseClicked() {
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
