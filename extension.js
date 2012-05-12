const left = 0;
const right = 2;
const middle = 1;
const St = imports.gi.St;
const Lang = imports.lang;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;
const Tweener = imports.ui.tweener;
const MessageTray = imports.ui.messageTray;



/* EDIT THESE VALUES ################################################################## */

const CORNER_TL = false; // true, false
const CORNER_TR = false; // true, false
const CORNER_BL = false; // true, false
const CORNER_BR = true; // true, false

const HOVER_ANIMATION = true; // true, false

const SYSTEM_TRAY_HOT_CORNER = right; // left, right, middle

const TL_COMMAND = false;
const TR_COMMAND = false; // gnome-terminal.desktop
const BL_COMMAND = false; // 'firefox.desktop' 
const BR_COMMAND = false; // 'gnome-system-monitor.desktop'

/* NO MORE TO EDIT! ################################################################### */










let corner = [];

function toggleOverview(node) {

	if ( HOVER_ANIMATION ) {
		Tweener.addTween(node.ui, {
			opacity: 255,
			time: 0.5,
			transition: 'easeOutQuad',
			onComplete: function () {
				Tweener.addTween( node.ui, {
					opacity: 0,
					time: 0.5,
					transition: 'easeOutQuad'
				});
			}
		});
	}

	if (node.custom_command === false) {
		Main.overview.toggle();
	} else {
		let app = Shell.AppSystem.get_default().lookup_app(node.custom_command);// 'gnome-system-monitor.desktop'
		app.open_new_window(-1);
	}
	
}

function init() {
    // button = new St.Bin({ style_class: 'panel-button', reactive: true, can_focus: true, x_fill: true, y_fill: false, track_hover: true });
		corner[0] = {};
		corner[1] = {};
		corner[2] = {};
		corner[3] = {};

		corner[0].custom_command = TL_COMMAND;
		corner[1].custom_command = TR_COMMAND;
		corner[2].custom_command = BL_COMMAND;
		corner[3].custom_command = BR_COMMAND;
		
    corner[0].ui = new St.Bin({ style_class: 'corner', reactive: true, can_focus: true, x_fill: true, y_fill: false, track_hover: true });
    corner[1].ui = new St.Bin({ style_class: 'corner', reactive: true, can_focus: true, x_fill: true, y_fill: false, track_hover: true });
    corner[2].ui = new St.Bin({ style_class: 'corner', reactive: true, can_focus: true, x_fill: true, y_fill: false, track_hover: true });
    corner[3].ui = new St.Bin({ style_class: 'corner', reactive: true, can_focus: true, x_fill: true, y_fill: false, track_hover: true });

		// let text2 = new St.Label({ style_class: 'helloworld-label2', text: "Hello, world!" });

    // button.set_child( text2 );
    
		
		Main.uiGroup.add_actor( corner[0].ui );
		Main.uiGroup.add_actor( corner[1].ui );
		Main.uiGroup.add_actor( corner[2].ui );
		Main.uiGroup.add_actor( corner[3].ui );
    
		corner[0].ui.opacity = 0;
		corner[1].ui.opacity = 0;
		corner[2].ui.opacity = 0;
		corner[3].ui.opacity = 0;


    let monitor = Main.layoutManager.primaryMonitor;

    corner[0].ui.set_position(-10, -10);
    corner[1].ui.set_position(monitor.width - corner[1].ui.width + 10, - 10);
    corner[2].ui.set_position(0 - 10, monitor.height - corner[2].ui.height + 10);
    corner[3].ui.set_position(monitor.width - corner[3].ui.width + 10, monitor.height - corner[3].ui.height + 10);


    // button.connect( 'enter-event', function () { Main.overview.toggle(); });
		if ( CORNER_TL )
    	corner[0].ui.connect( 'enter-event', function () { toggleOverview( corner[0] ) });

		if ( CORNER_TR )
    	corner[1].ui.connect( 'enter-event', function () { toggleOverview( corner[1] ) });

		if ( CORNER_BR )
    	corner[2].ui.connect( 'enter-event', function () { toggleOverview( corner[2] ) });

		if ( CORNER_BL )
    	corner[3].ui.connect( 'enter-event', function () { toggleOverview( corner[3] ) });

	
}

function enable() {
    // Main.panel._rightBox.insert_child_at_index(button, 100);
  Main.messageTray._hideTray = Lang.bind(Main.messageTray, function() {
    this._tween(this.actor, '_trayState', MessageTray.State.HIDDEN, { y: -1 });
  });

	Main.panel._activitiesButton._hotCorner._corner.hide();

  Main.messageTray._summaryBin.x_align = SYSTEM_TRAY_HOT_CORNER;
  Main.messageTray._hideTray();

}

function disable() {
    // Main.panel._rightBox.remove_child(button);
    Main.uiGroup.remove_actor( corner[0].ui );
    Main.uiGroup.remove_actor( corner[1].ui );
    Main.uiGroup.remove_actor( corner[2].ui );
    Main.uiGroup.remove_actor( corner[3].ui );
		Main.panel._activitiesButton._hotCorner._corner.show();

  	Main.messageTray._summaryBin.x_align = right;
}


