export class Win extends Phaser.Scene {
	constructor() {
		super({ key: 'Win' });
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
	init(data) {
		this.player1 = data.player1;
		this.player1Xp = data.player1Xp;
	}
	preload() {
		console.log('WIN PLAYER 1');
		this.resize();
		window.addEventListener('resize', this.resize);
		this.sound.stopAll();
	}
	create() {
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.gameoverImage = this.add.image(960, 540, 'win');

		this.soundWin = this.sound.add('soundWin');
		this.soundWin.play();

		this.winMusic = this.sound.add('winMusic');
		setTimeout(() => {
			this.winMusic.play();
		}, 12000);

		this.platform.body.allowGravity = false;
		this.playCard1 = this.physics.add.image(1100, 100, `playCharacter1_${this.player1}`);
		this.playCard1.setBounce(0.4);
		this.physics.add.collider(this.playCard1, this.platform);
		this.textsMaker();
	}
	textsMaker() {
		this.p2XpText = this.add.text(1050, 730, `CryptoXP: ${this.player1Xp}`, {
			fontSize: '20px',
			fill: '#fff',
			fontFamily: 'verdana, arial, sans-serif',
		});
	}
}
