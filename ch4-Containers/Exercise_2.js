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
        this.setSizeRequest(250, 200);

        const notebook = new Gtk.Notebook();
        notebook.setShowTabs(false);

        for (let i = 0; i < 4; i++) {
            const label = new Gtk.Label({label: 'Tab'});
            const button = new Gtk.Button.newWithMnemonic('_Next Tab');
            button.on('clicked', () => this.onNotebookButtonClicked(notebook));
            
            const expander = new Gtk.Expander({label: `You Are Viewing Tab ${i + 1}`});
            expander.setExpanded(true);
            expander.add(button);

            notebook.appendPage(expander, label);
            expander.setBorderWidth(10);
        }

        const buttonbox = new Gtk.ButtonBox(Gtk.Orientation.HORIZONTAL);
        const buttonPrev = new Gtk.Button({label: 'Previous Page'});
        buttonPrev.on('clicked', () => this.onButtonPrevClicked(notebook));
        const buttonClose = new Gtk.Button({label: 'Close'});
        buttonClose.on('clicked', () => this.onButtonCloseClicked());
        buttonbox.packEnd(buttonPrev, false, false, 5);
        buttonbox.packEnd(buttonClose, false, false, 5);

        const paned = new Gtk.Paned.new(Gtk.Orientation.VERTICAL);
        paned.pack1(notebook, true, false);
        paned.pack2(buttonbox, true, false);

        this.add(paned);
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
                title: 'Notebook',
            });
            this.window.showAll();
        }
    }
}

const app = new App();
app.run();
