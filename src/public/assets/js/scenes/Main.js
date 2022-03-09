export class Main extends Phaser.Scene {
	constructor() {
		super({ key: 'Main' });
	}
	init() {
		// variables here
		var landscape;
	}
	resize() {
		// resize window
		const canvas = document.querySelector('canvas');
		const html = document.querySelector('html');
		const WindowWidth = window.innerWidth;
		const WindowHeight = window.innerHeight;
		canvas.style.width = WindowWidth + 'px';
		canvas.style.height = WindowHeight + 'px';
		html.style.overflow = 'hidden';
		console.log('resized window');
	}
	// orientation() {
	// 	// orientation

	// 	if (screen.orientation.type.match(/\w+/)[0] === 'landscape') {
	// 		// es un evento que funciona alrevés de lo esperado
	// 		alert('Please considere changue orientation to Landscape: ');
	// 		landscape.setVisible(true);
	// 	} else if (screen.orientation.type.match(/\w+/)[0] === 'portrait') {
	// 		// alert('Landscape');
	// 	}
	// 	// this.orientationvalue = screen.orientation.type.match(/\w+/)[0];
	// }
	preload() {
		// ########## resize and orientation
		this.resize();
		window.addEventListener('resize', this.resize);
		// this.orientation();
		// screen.orientation.addEventListener('change', this.orientation);
		// ########## load images
		this.load.image('background', '/assets/images/background_1920x1080.jpg');
		// this.load.image('gameover', '/assets/images/gameover_1920x1080.jpg');
		this.load.image('platform', '/assets/images/platform_1920x28.png');
		// this.load.image('deckCards', '/assets/images/deckCards.png');
		this.load.image('card1', '/assets/images/cards/1.png');
		this.load.image('card2', '/assets/images/cards/2.png');
		this.load.image('card3', '/assets/images/cards/3.png');
		this.load.image('card4', '/assets/images/cards/4.png');
		this.load.image('orla', '/assets/images/cards/orla.png');
		// this.load.image('navbarControls1', '/assets/images/elements/navbar_controls1.png');

		// this.load.audio('orlaMove', '/assets/sounds/orlaMove.mp3');
		this.load.audio('rapperSelected', '/assets/sounds/rapperSelected.mp3');
		this.load.audio('ambientMusic', '/assets/mp3/supreme_base01.mp3');

		this.load.image('landscapeWarning', '/assets/images/elements/landscape_warning.png');
	}

	create() {
		// sounds
		// this.orlaMove = this.sound.add('orlaMove');
		this.rapperSelected = this.sound.add('rapperSelected');
		this.ambientMusic = this.sound.add('ambientMusic');
		this.ambientMusic.play();
		this.ambientMusic.pauseOnBlur = false; // no se pausa cuando pierde el foco, no me funciona

		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);

		// ############## orientation
		// landscape = this.add.image(0, 0, 'landscapeWarning');
		// landscape.setVisible(false);
		// screen.orientation.addEventListener('change', this.orientation);

		// añadir plataforma con física y colisiones, pero sin gravedad e inamovible
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.platform.body.allowGravity = false;

		// añadir cartas con física y colisiones, gravedad y movimiento
		this.card1 = this.physics.add.image(400, 100, 'card1');
		this.card1.setBounce(0.2);
		// this.card1.body.allowGravity = false;
		this.card2 = this.physics.add.image(750, 100, 'card2');
		this.card2.setBounce(0.3);
		// this.card2.body.allowGravity = false;
		this.card3 = this.physics.add.image(1100, 100, 'card3');
		this.card3.setBounce(0.2);
		// this.card1.body.allowGravity = false;
		this.card4 = this.physics.add.image(1450, 100, 'card4');
		this.card4.setBounce(0.5);

		this.orla = this.add.image(400, 100, 'orla').setVisible(false);

		// fisica colisiones
		this.physics.add.collider(this.card1, this.platform); // ahora chocaran
		this.physics.add.collider(this.card2, this.platform); // ahora chocaran
		this.physics.add.collider(this.card3, this.platform); // ahora chocaran
		this.physics.add.collider(this.card4, this.platform); // ahora chocaran
		// this.physics.add.collider(this.orla, this.platform); // ahora chocaran
		// colisiones con metodos
		// this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
		// platformImpact() {
		// 	// emite un sonido
		// }
		// this.navbarControls1 = this.add.image(0, 0, 'navbarControls1');
		// Phaser.Display.Align.In.TopCenter(this.navbarControls1, this.background);
		// textos escena
		this.textsMaker();

		/* controls */
		this.input.on(
			'pointerup',
			function (pointer) {
				let orlaX;
				console.log('down');
				if (pointer.y >= 280 && pointer.y <= 700) {
					console.log(pointer.y);
					if (pointer.x >= 240 && pointer.x <= 540) {
						// cryptoalonzo
						orlaX = 400;
						this.orla.setPosition(orlaX, 498).setVisible(true);
						this.selectPlayers(1);
					} else if (pointer.x >= 600 && pointer.x <= 900) {
						// cryptoalrima
						orlaX = 750;
						this.orla.setPosition(orlaX, 498).setVisible(true);
						this.selectPlayers(2);
					} else if (pointer.x >= 940 && pointer.x <= 1240) {
						// cryptogazo
						orlaX = 1100;
						this.orla.setPosition(orlaX, 498).setVisible(true);
						this.selectPlayers(3);
					} else if (pointer.x >= 1300 && pointer.x <= 1600) {
						// cryptoBIGFLO_OLI
						orlaX = 1450;
						this.orla.setPosition(orlaX, 498).setVisible(true);
						this.selectPlayers(4);
					}
				}
			},
			this
		);
	}
	update() {}

	textsMaker() {
		this.p1XpText = this.add.text(320, 200, 'SELECT PLAYER PLEASE', {
			fontSize: '60px',
			fill: '#fff',
			fontFamily: 'Public Pixel, arial, sans-serif',
		});
	}
	selectPlayers(rapperSelected) {
		this.ambientMusic.stop();
		this.rapperSelected.play({ loop: false });
		console.log(rapperSelected);
		this.player1 = rapperSelected;
		this.player2 = Phaser.Math.Between(1, 4);
		// cargar la escena, pasarle el dato player1selected ...
		this.scene.start('Battle', { player1: this.player1, player2: this.player2 });
	}

	resizeHardMode() {
		// falla el this.game.config la segunda vez
		// metodo bien definido
		console.log('RESIZED');
		var canvas = document.querySelector('canvas');
		console.log('CONFIG: ', this.game.config);
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var windowRatio = windowWidth / windowHeight;
		var gameRatio = this.game.config.width / this.game.config.height;
		console.log('GAMERATIO: ', gameRatio * Math.random());
		if (windowRatio < gameRatio) {
			canvas.style.width = windowWidth + 'px';
			canvas.style.height = windowWidth / gameRatio + 'px';
		} else {
			canvas.style.width = windowHeight * gameRatio + 'px';
			canvas.style.height = windowHeight + 'px';
		}
	}
}
