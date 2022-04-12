export class SelectPlayer extends Phaser.Scene {
	constructor() {
		super({ key: 'SelectPlayer' });
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
	preload() {
		// ########## resize and orientation
		this.resize();
		window.addEventListener('resize', this.resize);
		// this.orientation();
		// screen.orientation.addEventListener('change', this.orientation);
		// ########## load images
		this.sound.stopAll();
	}

	create() {
		// sounds
		// this.orlaMove = this.sound.add('orlaMove');
		this.rapperSelected = this.sound.add('rapperSelected');
		// this.rappersFallDawn = this.sound.add('rappersFallDawn');
		// this.rappersFallDawn.play();

		this.mainMusic = this.sound.add('mainMusic');
		setTimeout(() => {
			this.mainMusic.play({ loop: true });
		}, 1000);
		this.mainMusic.pauseOnBlur = false; // no se pausa cuando pierde el foco, no me funciona

		this.selectedplayerBackground = this.add.image(0, 0, 'background');
		this.selectedplayerBackground.setOrigin(0, 0);

		// ############## orientation
		// landscape = this.add.image(0, 0, 'landscapeWarning');
		// landscape.setVisible(false);
		// screen.orientation.addEventListener('change', this.orientation);

		// añadir plataforma con física y colisiones, pero sin gravedad e inamovible
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.platform.body.allowGravity = false;

		// añadir cartas con física y colisiones, gravedad y movimiento
		this.card1 = this.physics.add.image(400, 100, 'card1');
		this.card1.setBounce(0.2).setInteractive();
		// this.card1.body.allowGravity = false;
		this.card2 = this.physics.add.image(750, 100, 'card2');
		this.card2.setBounce(0.3).setInteractive();
		// this.card2.body.allowGravity = false;
		this.card3 = this.physics.add.image(1100, 100, 'card3');
		this.card3.setBounce(0.2).setInteractive();
		// this.card1.body.allowGravity = false;
		this.card4 = this.physics.add.image(1450, 100, 'card4');
		this.card4.setBounce(0.5).setInteractive();

		this.orla = this.add.image(400, 100, 'orla').setVisible(false);

		// fisica colisiones
		this.physics.add.collider(this.card1, this.platform); // ahora chocaran
		this.physics.add.collider(this.card2, this.platform); // ahora chocaran
		this.physics.add.collider(this.card3, this.platform); // ahora chocaran
		this.physics.add.collider(this.card4, this.platform); // ahora chocaran

		// textos escena
		this.textsMaker();

		// context
		var that = this;

		/* controls */
		this.card1.on('pointerup', function (pointer) {
			that.orla.setPosition(400, 498).setVisible(true);
			that.selectPlayers(1);
		});
		this.card2.on('pointerup', function (pointer) {
			that.orla.setPosition(750, 498).setVisible(true);
			that.selectPlayers(2);
		});
		this.card3.on('pointerup', function (pointer) {
			that.orla.setPosition(1100, 498).setVisible(true);
			that.selectPlayers(3);
		});
		this.card4.on('pointerup', function (pointer) {
			that.orla.setPosition(1450, 498).setVisible(true);
			that.selectPlayers(4);
		});
	}
	// update() {}

	textsMaker() {
		this.p1XpText = this.add.text(120, 200, 'SÉLECTIONNER UN JOUEUR SVP', {
			fontSize: '60px',
			fill: '#fff',
			fontFamily: 'Public Pixel, arial, sans-serif',
		});
	}
	selectPlayers(rapperSelected) {
		// this.selectplayerMusic.stop();
		this.rapperSelected.play({ loop: false });
		console.log(rapperSelected);
		this.player1 = rapperSelected;
		this.player2 = Phaser.Math.Between(1, 4);
		// cargar la escena, pasarle el dato player1selected ...
		setTimeout(() => {
			this.scene.start('Battle', { player1: this.player1, player2: this.player2 });
		}, 1000);
	}

	// resizeHardMode() {
	// 	// falla el this.game.config la segunda vez
	// 	// metodo bien definido
	// 	console.log('RESIZED');
	// 	var canvas = document.querySelector('canvas');
	// 	console.log('CONFIG: ', this.game.config);
	// 	var windowWidth = window.innerWidth;
	// 	var windowHeight = window.innerHeight;
	// 	var windowRatio = windowWidth / windowHeight;
	// 	var gameRatio = this.game.config.width / this.game.config.height;
	// 	console.log('GAMERATIO: ', gameRatio * Math.random());
	// 	if (windowRatio < gameRatio) {
	// 		canvas.style.width = windowWidth + 'px';
	// 		canvas.style.height = windowWidth / gameRatio + 'px';
	// 	} else {
	// 		canvas.style.width = windowHeight * gameRatio + 'px';
	// 		canvas.style.height = windowHeight + 'px';
	// 	}
	// }
}
