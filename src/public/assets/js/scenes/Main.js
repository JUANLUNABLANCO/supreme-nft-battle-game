export class Main extends Phaser.Scene {
	constructor() {
		super({ key: 'Main' });
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
		this.load.image('playButton', '/assets/images/elements/playButton.png');
		document.getElementById('containerCSS').style.display = 'block';
		document.getElementById('preloader').style.display = 'none';
	}
	create() {
		this.mainMusic = this.sound.add('mainMusic');
		this.mainMusic.play({ loop: true });
		this.mainMusic.pauseOnBlur = false;
		// background
		this.mainBackground = this.add.image(0, 0, 'mainBackground');
		this.mainBackground.setOrigin(0, 0);

		// button
		const playButton = this.add
			.sprite(966, 485, 'playButton')
			.setInteractive()
			.on('pointerdown', () => playButton.setScale(1.1))
			.on('pointerup', () => {
				playButton.setScale(1);
				this.mainMusic.stop();
				this.scene.start('SelectPlayer');
				document.getElementById('containerCSS').style.display = 'none';
				// habrá que darle visualización cuando se cargue esta pantalla al inicio
			});
	}
}
