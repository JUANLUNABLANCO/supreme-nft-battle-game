# Conceptos Basico

## node instalation

npm install --save phaser@3.x.x
or
npm install --save phaser

---index.html-----

<script src="../../node_modules/phaser/dist/phaser.js"></script>

## dimensions screeen

---css style ---
canvas {
width: 100%;
height: 100vh;
}

---- center gameScene ------
let center_width = this.sys.gme.config.width/2;
let center_height = this.sys.gme.config.height/2;

# Scene Basic

export class Game extends Phaser.Scene {
constructor() {
super({ key: 'game' });
}

    init() {
        // inicializacion de variables
    }
    preload () {
        // acrga de archivos imagenes, mp3, etc
    }
    create () {
        // construye la escena
    }
    update () {
        // se actualiza en cada frame
    }

}

## cualquier elemento que necesitemos que no escape de la escena

    this.<elemento>.setCollideWorldBounds(true);
    this.physics.world.setBoundsCollision(true, true, true, false); // rebotes en las paredes izda, arriba, //// derecha, abajo
    this.<elemento>.setBounce(1); // que rebote con las paredes externas de la escena
    // valor entre 0 y 1
    this.<elemento>.setVelocity(100, 10) // añadir velocidad a un objeto
    // algo de aleatoriedad a la velocidad
    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if (Phaser.Math.Between(0, 10) > 5) {
       velocity = 0 - velocity;
    }
    this.ball.setVelocity(velocity, 10);
    // colisiones y metodos
    this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this); // objeto1, objeto2, callback, condiciones de choque, escena o mundo

## resize canvas

function resize() {
const canvas = document.querySelector("canvas");
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowRatio = windowWidth / windowHeight;
const gameRatio = config.width / config.height;
if ( windowRatio < gameRatio ){
canvas.style.width = windowWidth + 'px';
canvas.style.height = (windowWidth / gameRatio) + 'px';
} else {
canvas.style.width = (windowHeight \* gameRatio) + 'px';
canvas.style.height = windowWidth + 'px';
}
}

## temporizador

// ejecutar esta línea con el tiempo que necesites antes de llamar a temporizador
this.tiempo = 10;
this.temporizador();
temporizador() {
--this.tiempo;
this.tiempoTXT.setText(this.tiempo);
if ( this.tiempo === 0){
alert ("tiempo agotado");
} esle {
this.time.delayedCall(1000, this.temporizador, [], this);
}
}

## BOOTLOADER

// es una clase que se usa para cargar todas la imagenes y luego se llam dentro del preload
// de la misma clase a la escena que necesitemos iniciar como primera.

preload(){
...
this.load.on('complete', () => {
this.scene.start('Main');
});
create(){
this.scene.add("sceneX", new SceneX); // se añade la escena dinámicamente una encima de la otra
// manager scene
this.scene.bringToTop('sceneX'); // encima de todas
this.scene.bringToBack('sceneX'); // debajo de todas
this.scene.moveUp(this); // un paso arriba
this.scene.moveDown('sceneX'); // un paso abajo
this.scene.moveAbove('otherScene'); // encima de esa
this.scene.moveBelow('otherScene'); // debajo de esa

this.scene.start("sceneY"); // se inicia la escena y la anterior desaparece
}

## cargar una escena en segundo plano

this.scene.launch('otraEscena');
antes de hacer un this.scene.start('otra'); debes cerrar la anterior con this.scene.stop('otraEscena')

## cargar otra escena y pasarle datos

this.scene.start('nameScene', {player1: 1, player2: 3});

init(data){
let player1Selected = data.player1;
let player2Selected = data.player2;
}

# data / eventos

//https://phaser.io/examples/v3/category/components

preload ()
{
this.load.image('gem', 'assets/sprites/gem.png');
}

    create ()
    {
        var gem = this.add.image(300, 300, 'gem');

        //  Store some data about this Gem:
        gem.setDataEnabled();

        gem.data.set('name', 'Red Gem Stone');
        gem.data.set('level', 2);
        gem.data.set('gold', 150);
        gem.data.set('owner', 'Link');

        gem.data.setvalue('gold', 200); // ahora gold vale 200
        gem.data.remove('monedas'); // borrará
        gem.data.getAll(); // obtiene todos los datos guardados en gem

        //  Display it
        const text = this.add.text(350, 250, '', { font: '16px Courier', fill: '#00ff00' });
        text.setText([
            'Name: ' + gem.data.get('name'),  // obtener data
            'Level: ' + gem.data.get('level'),
            'Value: ' + gem.data.get('gold') + ' gold',
            'Owner: ' + gem.data.get('owner')
        ]);
    }

## eventos

// eventos entre escenas
// registrar un evento 1º
this.registry.events.on('cambio', (puntos)=>{
console.log(puntos); // 3400
});
// emitir un evento 2º, puede ser desde otra escena porque this.registry es una variable global de Phaser
this.registry.events.emit('cambio', 3400);

// set('algo' // variable global de pHASER
this.registry.set('points', 0);
this.puntos = 0;

this.input.on('pointerdown', ()=>{
this.puntos++;
this.registry.set('points', this.puntos)
});

this.registry.events.on('changedata', (parent, key, data)=>{
// ... donde key será 'points' y data será this.puntos
});

# cargar sprites

funtion preload() {
this.load.spritessheet('<nombre>', '<path/to/sprites/file.png>,
{frameWidth: 32, frameHeight: 48});
}

player = this.physics.add.sprite(100, 450, 'dude'); // obtiene el sprite y lo carga en un cuerpo con física

player.setBounce(0.2); // rebota al caer un poco
player.setCollideWorldBounds(true); // no sale de los limites del juego

this.anims.create({
key: 'left',
frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
frameRate: 10,
repeat: -1
}); // si pulsamos la tecla left de los cursores hará esta animación

this.anims.create({
key: 'turn',
frames: [ { key: 'dude', frame: 4 } ],
frameRate: 20
});

this.anims.create({
key: 'right',
frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
frameRate: 10,
repeat: -1 // se repetirá indefiniadmente al llegar al final de los frames
});

## crear plataformas

var platforms;

function create ()
{
...
platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

}

## tileSprites repetición de sprites

// we have an element about 30x30 px
let platform = this.add.tileSprite(x, y, 3* 30, 1* 30 , element); // repetición 3 bloques horizontales
this.physics.add.existing(platform, true); // static = true

// sprites with anims 5 frames
this.player = this.add.sprite(x, y, element, 3); // 4º frame del sprite
this.physics.add.existing(this.player, false) // static = false --> dinamyc gravity affect

# carga de archivos mp3, bitmaps fonts

//https://phaser.io/examples/v3/category/audio

## sonidos

var config = {
type: Phaser.AUTO,
parent: 'phaser-example',
width: 800,
height: 600,
pixelArt: true,
// importante desactivar otros sonidos de la web
audio: {
disableWebAudio: true
},
scene: [ SceneA, SceneB, SceneC ]
};

preload () {
this.load.audio('jungle', [
'assets/audio/jungle.ogg',
'assets/audio/jungle.mp3'
]);
}
create () {
var jungle = this.sound.add('jungle', {loop: true});

        jungle.play({
            loop: true
        });  // jungle.stop() // jungle.pause() // jungle.resume()

}
jungle.play();
jungle.pause();
jungle.resume();
jungle.stop();

jungle.pauseOnBlur = false; // si cambiamos de contexto, perdemos el foco del juego por defecto la música se pausa

this.sound.stopAll(); // apra todos los sonidos que s eestén ejecutando
this.sound.pauseAll();
this.sound.resumeAll();

jungle.rate = 1.1; // velocidad
jungle.detune += 100; // tono
jungle.mute = true // se muta
jungle.volume += .1; // sube volumen Mozzila n ofunciona a volume
jungle.seek = 3 // salta a ese segundo
this.tweens.add({
targets: jungle,
volume: 0,
ease: 'Power1',
duration: 2000
}) // hace un fadeOut de 2 s del audio

// control del sonido
if(this.sound.locked) // locked sound
{
text.setText('Tap to unlock\nand play music');

    this.sound.once('unlocked', function (soundManager)
    {
        setupSceneInput.call(this, text, jungle);

    }, this);

}
else
{
setupSceneInput.call(this, text, jungle);
}

## audioSprites

ver video tutorial https://www.youtube.com/watch?v=mHSu2orMTVA&list=PLL_H5w4KA8dP9pPayzYxHCD4IQ80nkfY9&index=19

enlace a la app que convierte varios audios en un solo audioSprite

https://gammafp.github.io/audio-sprite-gamma

----- spriteSound.json -----
{
spritemap: {
sound01: {
start: 0,
end: 1.954,
loop: false
},
sound02: {
start: 2,
end: 2.540,
loop: false
},
sound01: {
start: 3,
end: 3.154,
loop: false
}
}
}
----sceneX.js-----
preload(){
this.load.audioSprite('sfx', 'spriteAudioGame.json', ['spriteAudioGame.ogg']);
}
create(){
this.sound.playAudioSprite('sfx', 'sound01');
}

## fonts bitmap

preload () {
this.load.bitmapFont('atari-classic', 'assets/fonts/bitmap/atari-classic.png', 'assets/fonts/bitmap/atari-classic.xml');
}
create() {
var text = this.add.bitmapText(400, 100, 'atari-classic', '', 30).setOrigin(0.5);
}

# añadir textos

init() {
var score = 0;
var scoreText;
}
create() {
scoreText = this.add.text(16, 16, 'score: 0',
{
fontFamily: 'pixelArt' // porviene desde el css ver custom.css
fontSize: '32px',
fill: '#000',
backgrounColor: '#fff',
align: 'center',
pading: {
top: 0,
bottom: 10,
left: 5,
right:0
}});
}
// propiedades modificables y de gameObject
scoreText.setbackgroundColor('#f0f');
scoreText.flipX = true;
scoreText.alpha(.5);
scoreText.x = 300;

// ahora collectStar() quedará así
function collectStar (player, star)
{
star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

// otra forma de crear texto
const configText = {
x: 100,
y: 100,
text: 'Hola Mundo',
style: {
...
}
const etxto = this.make.text(configText);
texto.setBackgroundColor
}}

# añadir enemigos bombas

create() {
bombs = this.physics.add.group();

this.physics.add.collider(bombs, platforms);

this.physics.add.collider(player, bombs, hitBomb, null, this);
}
function hitBomb (player, bomb)
{
this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn'); // quieto

    gameOver = true;

}

... algunas modificaciones para las bombas
function collectStar (player, star)
{
star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) // si las ha recogido todas
    {
        stars.children.iterate(function (child) { // las volverá a lanzar

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb'); // lanza 16 bombas al lado opuesto del player
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }

}

# fondos animados

this.bg = this.add.tileSprite(posX, posY, tamX, tamY, 'fondo').setScrollFactor(0);
this.bg.tilePositionX = time\* 0.1;

# física de objetos

this.physics.add.image(posicionX, posicionY, 'objetoX');

objetoX.body.setGravityY(300)

la propiedad body tiene un montón de métodos ...setGravity() es uno de ellos

## detectar colisiones entre dos objetos

// add physics
this.physics.existing(player, true);

// other way
this.physics.add.image(posicionX, posicionY, elemento);

// statico
platform.body.inmovable= true; // no se mueve aunque choque con otro

// one method
this.physics.add.collider(player, platforms); //detectará choques si ambos son movibles el primero puede desplazar al segundo

// second method
this.physics.add.collider(player, platforms, callback, this);

## colisiones avanzadas

physics: {
default: 'matter', // sistema de precision de colisiones
...
this.cursors = this.input.keyboard.createCursorKeys();
update(){
this.player.thrust(-0.001) // añadir velocidad
if(this.cursors.left.isDown) this.player.setAngularVelocity(-0.065); // velocidad angular en matter
}

## Physiscs editor

www.codeandweb.com/physicseditor
editor de areas de colision poligonales para matter.
generará un json con la data correspondiente a la colisión
preload(){
this.load.json('paredes', 'img/muros.json'); // contendrá todas las definiciones de pardes de la escena: ladoizquierdo, ladoderecho, astronauta, saturno,...
create(){
const paredes = this.cache.json.get('paredes');
const ladoizquierdo = this.matter.add.sprite(0,0. 'ladoizquierdo', null, {shape: paredes.ladoizquierdo});
const ladoderecho = this.matter.add.sprite(0,0. 'ladoderecho', null, {shape: paredes.ladoiderecho});
const astronauta = this.matter.add.sprite(0,0. 'astronauta', null, {shape: paredes.astronauta});

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /054"

## Areas definidas

// definir el area de la meta, para detectar vueltas en una carrera
const objeto = this.matter.add.rectangle(coordX, coordY, width, height, {
isSensor: true, // objeto colisiona lo atraviesa si o no
marker: 1,

// un propiedad nuestra para poner varias areas de control, así evitamos trampas, cada jugador tendrá su propia propiedad marker=1, al atravesar un area, se comprueba si el marker dela area y del juagdor son iguales, si lo son se aumentará el marker del jugaor en ++, cuando llega al valor necesario para vuelta aumentará su número de vueltas en 1 y pondrá su marker en 1.

angle: -Math.PI/4 // angulo del rectangulo 45º antihorario desde las 9 horas hacia las 6h
}); // si queremos ver el area definida en el juego debemos poner debug: true en configuración
matter: {
debug: true,
}
... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /055-056"

# origenes, rotaciones, movimientos

## origen

element.setorigin(0,0); // poner el centro del objeto en su esquina superior izda.

## flip element

element.flipX = true; // girar en el eje x
element.flipY = true; // girar en el eje y

## rotations

element.angle = 45; // rotar 45 º a la derecha
element.setAngle(45);
element.rotation = Math.PI / 4; // 45º usando radianes
element.setRotation(Math.PI / 4)

## movimientos

update(){// se ejecuta 60 veces por segundo
this.element.angle += 1; // gira un grado por segundo
this.element.x += 1; // avanza en el eje x, 1
}

## tweens (interpolaciones)

let tween1 = this.tweens.add({
targets: this.logo,
duration: 1000, // ms
props:{
x: {
value: 300,
duration: 2000
},
y: {
value: 200,
duration: 1000
}
}
repeat: 2,
delay: 1000, // espera al inicio
hold: 1000, // espera al final del yoyo
repeatDelay: 1000, // espera cuando finalice todo
yoyo: true,
ease: 'Power1',
onStart: ()=> console.log(),
onYoyo:
onComplete:
onRepeat:

});
tween1.pause(); // lo pausa
tween1.resume(); // lo despausa

## linea de tiempo en interpoalciones

para encadenar animaciones necesitamos la linea de tiempo

// 1ª forma ###############
let timeline = this.tweens.createTimeLine();
timeline.add({
targets: this.elementToAnim,
x: 400,
duration: 1000
});
timeline.add({
targets: this.elementToAnim,
y: 300,
duration: 500
});
timeline.add({
targets: this.elementToAnim,
x: 60,
duration: 100
});
timeline.add({
targets: this.elementToAnim,
y: 60,
duration: 500
});
timeline.play();

// 2ª forma ###############
let timeline = this.tweens.timeLine({
targets: this.elemento, // o [array de elementos]
duration: 2000, // por cada tween // totalDuration : 2000 en total
loop: -1, // infinite
tweens: [{
x:400,
duration: 2000 // independiente
ease: 'lineal',
yoyo: -1 // volverá hacia atrás
},
{
y:300
offset: 500 // al medio segundo se empezara a ejecutar esta animacion
},{x:60},{y:60}]
});

# display elements in screen

// https://phaser.io/examples/v3/category/display

## align items in screen static elements

//https://labs.phaser.io/edit.html?src=src/display/align/in%20bottom%20center.js&v=3.55.2
preload ()
{
this.load.image('pic', 'assets/pics/barbarian-loading.png');
this.load.image('block', 'assets/sprites/block.png');
}

    create ()
    {
        const pic = this.add.image(0, 0, 'pic');
        const block = this.add.image(0, 0, 'block');

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(pic, this.add.zone(400, 300, 800, 600));

        //  Center the sprite to the picture
        Phaser.Display.Align.In.BottomCenter(block, pic); // BottomLeft, BottomRight, Center, LeftCenter, RightCenter, TopCenter
    }

## static

elemnet.body.allowGarvity = false;

## blend modes //https://phaser.io/examples/v3/category/display/blend-modes

### sistema de particulas en movimiento //https://labs.phaser.io/edit.html?src=src/display/blend%20modes/difference.js&v=3.55.2

constructor ()
{
super();
this.sprites = []; // aquí o en init
}

    preload ()
    {
        this.load.image('bg', 'assets/skies/space1.png'); // parte de abajo
        this.load.image('particle', 'assets/particles/yellow.png');  // particulas
        this.load.image('logo', 'assets/sprites/phaser2.png');
    }

    create ()
    {
        this.add.image(400, 300, 'bg');

        //  Create the particles
        for (var i = 0; i < 300; i++)
        {
            const x = Phaser.Math.Between(-64, 800);
            const y = Phaser.Math.Between(-64, 600);

            const image = this.add.image(x, y, 'particle');

            // image.setBlendMode(Phaser.BlendModes.OVERLAY);
            image.setBlendMode(Phaser.BlendModes.ADD);

            this.sprites.push({ s: image, r: 2 + Math.random() * 2 }); // velocidad de desplazamiento
        }

        this.add.image(400, 300, 'logo').setBlendMode(Phaser.BlendModes.DIFFERENCE);
    }

    update ()
    {
        for (var i = 0; i < this.sprites.length; i++)
        {
            const sprite = this.sprites[i].s;
            sprite.y -= this.sprites[i].r;
            if (sprite.y < -256)
            {
                sprite.y = 700;
            }
        }
    }

}

# grupos y containers

## grupos simples

// 1ª forma
let moneda = this.add.sprite(x, y, 'monedas');
let grupo = this.add.group();
grupo.add(moneda);

// 2ª forma
let grupo = this.add.group();
grupo.create(x, y, 'monedas');

// 3ª forma
let grupo = this.physics.add.group(
// or this.physics.add.staticGroup // le añade cuerpo pero n ogravedad
{
key: 'monedas',
repeat: 5, // creará cinco monedas en ese punto
setXY: {
x: 150,
y, 150,
stepX: 50 // aumentará 50 a cada moneda
}
}
);
grupo.create(x, y, 'monedas');

grupo.playAnimation('moneda'); // se animaran todos los elementos

// iterar sobre los elementos
grupo.getChildren().map((x)=>{
x.setScale(2); // escalará todas la monedas
});
o
grupo.children.iterate((x)=>{
x.setScale(2); // escalará todas la monedas
x.body.setAllowGravity(fasle); // quitarle la gravedad, dejalo como grupo normal no estatico
});

// añadir animaciones al grupo
this.tweens.add({
targets: grupo.getChildren(),
y: 100,
yoyo: true,
repeat: -1,
duration: 600
ease: 'Power1'
})

## grupos con física

stars = this.physics.add.group({
key: 'star', // la textura de esta imagen precargada en preload
repeat: 11, // obtendremos 12 elementos el original y sus 11 copias
setXY: { x: 12, y: 0, stepX: 70 } // posiciona wn [12,0] , [82,0], [152,0], ...
});

stars.children.iterate(function (child) {
child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
});
this.physics.add.collider(stars, platforms); // para que se paren en las plataformas
this.physics.add.overlap(player, stars, collectStar, null, this); // comprueba si colisiona con el
// personaje si es así, ejecutará la fucnión collectStart
function collectStar (player, star)
{
star.disableBody(true, true);
... // añadir puntos, comprobar que no están todas o si
}

## contenedores

los contenedores agrupan objetos ya sean imagenes o texto o lo que sea todo dentro del contenedor se comporta como un solo objeto, le podemos añadir un tween de animación y todo se animará en conjunto

si escalamos el contendor todo se escalará, etc.

this.load.image(...);
...
create(){
this.score = this.add.image(x, y, name);

this.scoreContainer = this.add.container(0, -300);

this.scoreContainer.add([this.score, elemento2, elemento3]);

this.tweens.add({
targets: contenedor,
y:0
})

}

## grupos de plataformas y colisiones con el player

this.platforms = this.add.group();

let ground = this.add.sprite(x, y, 'ground');
this.phisics.add.existing(ground, true);
this.platforms.add(ground);

let ground2 = this.add.sprite(x2, y2, 'ground');
this.phisics.add.existing(ground2, true);
this.platforms.add(ground2);

this.physics.add.collider(this.player, this.platforms);

...

## crear grupos de objetos // mira MENUS

this.items = this.add.group({
key: 'button1',
setXY:{
x: 100,
y: 20
},
key: 'button2',
setXY:{
x: 100,
y: 20
}
});

# cursors and space bar

## mover objetos y animarlos con los cursores

create() {
cursors = this.input.keyboard.createCursorKeys();
}
update () {
if (cursors.left.isDown)
{
player.setVelocityX(-160);
player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
player.setVelocityX(160);
player.anims.play('right', true);
}
else
{
player.setVelocityX(0);
player.anims.play('turn');
}
if (cursors.up.isDown && player.body.touching.down)
{
player.setVelocityY(-330);
}
}

## spacebar

this.cursors = this.input.keyboard.createCursorKeys();
// this.spaceBar = this.input.keyboard.addKey(Phaser.keyCode.BACKSPACE);
this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // este funciona
this.spaceBar.on('down', () => {
this.orla.setVelocityX(0); // this.orla.body.setVelocityX(0) ,en algunos casos puede ser así.
this.rapperSelected.play({ loop: false });
console.log('space bar pulsada');
let posXOrla = this.orla.x;
let rapperSelected;
if (posXOrla < 540) {
rapperSelected = 1;
} else if (posXOrla < 900) {
rapperSelected = 2;
} else if (posXOrla < 1240) {
rapperSelected = 3;
} else {
rapperSelected = 4;
}
this.selectPlayers(rapperSelected);
});

## consideraciones de controles

// rightbtn, leftbtn, son imagenes o sprites interactivos
rigthbtn.on('pointerdown', function(){
this.scene.player.setData('direccionHorizontal, 1); // setData inserta una propiedad desconocida para phaser en el objeto
});
leftbtn.on('pointerdown', function(){
this.scene.player.setData('direccionHorizontal, -1);
});
rigthbtn.on('pointerup', function(){
this.scene.player.setData('direccionHorizontal, 0); // setData inserta una propiedad desconocida para phaser en el objeto
});
leftbtn.on('pointerup', function(){
this.scene.player.setData('direccionHorizontal, 0);
});
// tendremos que controlar el setData de direccionHorizontal en el update

# Inputs

// https://phaser.io/examples/v3/category/input

## Cursors //https://phaser.io/examples/v3/category/input/cursors

### custom cursor //https://phaser.io/examples/v3/view/input/cursors/custom-cursor

function create ()
{
this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');

    var sprite = this.add.sprite(400, 300, 'eye').setInteractive({ cursor: 'url(assets/input/cursors/pen.cur), pointer' });

    sprite.on('pointerover', function (event) {

        this.setTint(0xff0000);

    });

    sprite.on('pointerout', function (event) {

        this.clearTint();

    });

}

## otra forma de detectar teclas por veentos directos

this.input.keyboard.on('keydown', (event)=>{
if(event.keycode === 32){
this.saltar();
}
});

// detectar click en pantalla
this.input.on('pointerdown', ()=> this.saltar());

saltar() {
this.player.setVelocity(-200)
this.player.play('saltar');
}
// volver a la anterior animación desde create()
this.player.on('animationComplete', this.checkAnimationComplete, this);
// dentro de checkAnimationComplete haremos las comprobaciones, algo como esto
checkAnimationComplete(animation, frame, sprite) {
if(animation.key === 'saltar'){
this.player.play('volar');
}
}

## sistema de records //https://phaser.io/examples/v3/view/input/keyboard/enter-name

function preload()
{
this.load.image('block', 'assets/input/block.png'); // el cuadradito de seleccion del caracter
this.load.image('rub', 'assets/input/rub.png'); // letras rub finales
this.load.image('end', 'assets/input/end.png'); // letras end finales
this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
// el font bitmap
}

function create ()
{
var chars = [
[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
[ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
[ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
];
var cursor = { x: 0, y: 0 };
var name = '';

    var input = this.add.bitmapText(130, 50, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);

    input.setInteractive();

    var rub = this.add.image(input.x + 430, input.y + 148, 'rub');
    var end = this.add.image(input.x + 482, input.y + 148, 'end');

    var block = this.add.image(input.x - 10, input.y - 2, 'block').setOrigin(0);

    var legend = this.add.bitmapText(80, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);

    this.add.bitmapText(80, 310, 'arcade', '1ST   50000    ').setTint(0xff0000);
    this.add.bitmapText(80, 360, 'arcade', '2ND   40000    ICE').setTint(0xff8200);
    this.add.bitmapText(80, 410, 'arcade', '3RD   30000    GOS').setTint(0xffff00);
    this.add.bitmapText(80, 460, 'arcade', '4TH   20000    HRE').setTint(0x00ff00);
    this.add.bitmapText(80, 510, 'arcade', '5TH   10000    ETE').setTint(0x00bfff);

    var playerText = this.add.bitmapText(560, 310, 'arcade', name).setTint(0xff0000);

    this.input.keyboard.on('keyup', function (event) {

        if (event.keyCode === 37)
        {
            //  left
            if (cursor.x > 0)
            {
                cursor.x--;
                block.x -= 52;
            }
        }
        else if (event.keyCode === 39)
        {
            //  right
            if (cursor.x < 9)
            {
                cursor.x++;
                block.x += 52;
            }
        }
        else if (event.keyCode === 38)
        {
            //  up
            if (cursor.y > 0)
            {
                cursor.y--;
                block.y -= 64;
            }
        }
        else if (event.keyCode === 40)
        {
            //  down
            if (cursor.y < 2)
            {
                cursor.y++;
                block.y += 64;
            }
        }
        else if (event.keyCode === 13 || event.keyCode === 32)
        {
            //  Enter or Space
            if (cursor.x === 9 && cursor.y === 2 && name.length > 0)
            {
                //  Submit
            }
            else if (cursor.x === 8 && cursor.y === 2 && name.length > 0)
            {
                //  Rub
                name = name.substr(0, name.length - 1);

                playerText.text = name;
            }
            else if (name.length < 3)
            {
                //  Add
                name = name.concat(chars[cursor.y][cursor.x]);

                playerText.text = name;
            }
        }

    });

    input.on('pointermove', function (pointer, x, y) {

        var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
        var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
        var char = chars[cy][cx];

        cursor.x = cx;
        cursor.y = cy;

        block.x = input.x - 10 + (cx * 52);
        block.y = input.y - 2 + (cy * 64);

    }, this);

    input.on('pointerup', function (pointer, x, y) {

        var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
        var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
        var char = chars[cy][cx];

        cursor.x = cx;
        cursor.y = cy;

        block.x = input.x - 10 + (cx * 52);
        block.y = input.y - 2 + (cy * 64);

        if (char === '<' && name.length > 0)
        {
            //  Rub
            name = name.substr(0, name.length - 1);

            playerText.text = name;
        }
        else if (char === '>' && name.length > 0)
        {
            //  Submit
        }
        else if (name.length < 3)
        {
            //  Add
            name = name.concat(char);

            playerText.text = name;
        }

    }, this);

}

## drag objects // https://phaser.io/examples/v3/view/input/dragging/drag-with-multiple-scenes

    create: function ()
    {
        var image = this.add.sprite(200, 300, 'eye').setInteractive();
        this.input.setDraggable(image);

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff0000);
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.clearTint();
        });
    }

## pointer up mouse //https://phaser.io/examples/v3/view/input/game-object/on-up-event

function create ()
{
var sprite = this.add.sprite(400, 300, 'eye').setInteractive();

    sprite.on('pointerup', function (pointer) {

        this.setTint(Math.random() * 16000000);

    });

}

## keyboards //https://phaser.io/examples/v3/category/input/keyboard

### add key

create() {
keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);

keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

# MENUS

## Crear un objeto interactivo

var button1 = this.add.sprite(400, 300, 'button').setInteractive();
var button2 = this.add.sprite(400, 400, 'button').setInteractive();
button1.on('pointerup', function (pointer) {
// acciones boton 1
});
button2.on('pointerup', function (pointer) {
// acciones boton 2
});

}

## crear grupos de objetos

this.items = this.addgroup({
key: 'button1',
setXY:{
x: 100,
y: 20
},
key: 'button2',
setXY:{
x: 100,
y: 40
}
});
this.items.setDepth(1); // ponerlo encima de los demás, que por defecto están en 0

## controlar interacción WAY1

this.items[0].on('pointerup', function (pointer) { // I THINK, THIS IS THE WAY ???
// acciones boton 1
});

## controlar interaccion WAY2

Phaser.Actions.Call(this.items.getChildren(), function(item){
// make item interactive
item.setInteractive();
// añadir evento del pointer mouse
item.on('pointerdown), function(pointer){
console.log('you clicked ' + item.texture.key);
}
}, this);

# ANIMATIONS

## animaciones con spritessheet

this.load.spritesheet('misil', 'img/misil_anim.png', {
frameWidht: 96,
frameHeight: 96
}); // ancho y alto de cada frame dentro de la animación
this.add.sprite(posX, posY, 'misil');

this.anim.create({
key: 'explosionAnim',
frames: this.anims.generateFrameNumbers('explosion, {start: 0, end. 4}),
frameRate: 7
});

misil.on('pointerdown', ()=> this.misilBloqueado(misil));

misilBloqueado(m){
m.disableBody();
m.play("explosionAnim");
}

## control del sentido y flip

const sentidovelocidad = x >= 0 ? 1 : -1; // positiva 1 negativa -1
if(sentidoVelocidad == 1){
obj.flipX = true;
}

## MODULO ANIMACION

videotutorial Phaser de gammafp --> https://www.youtube.com/watch?v=mY1nzvYsWOY&list=PLL_H5w4KA8dP9pPayzYxHCD4IQ80nkfY9&index=11

sprite sheet: conjunto de animaciones de un personaje, es una sola imagen png con
diferentes imagenes más pequeñas, que pueden pertenecer a una animación o varias de un mismo personaje,
deben ser del mismo tamaño cada subimagen, y le diremos aphaser, donde empieza una animación, el tamaño y donde termina.
preload(){
this.load.spritesheet('nombreSprite', './assets/images/sprites/nombreSprite.png',
{frameWidth: 16, frameHeight: 32})
}
create(){
this.animName = this.add.sprite(100, 100, 'nombreSprite'); // (posX, posY, nombre de Sprite)
this.anims.create({
key: 'key_anim',
frames: this.anims.generateFrameNumbers('nombreSprite', {
start: 1,
end: 8
repeat: -1, // infinito o controlado por codigo
frameRate: 24 // por defecto
})
});
// ejecutar la animacion
this.animName.anims.play('key_anim');
}

## atlas json (texture-packer app)

hay otra forma de indicar por donde cortar los sprite sheet utilizando atlas ,en formato json
tiene un formato parecido a este:
{
"frames": [{
filename: "evil_tomato_0.png",
frame: {
x: 0,
y: 0,
w: 16,
h: 32
},
anchor:{
x: 1,
y: 1
}
},
{
filename: "evil_tomato_1.png",
frame: {
x: 0,
y: 32,
w: 16,
h: 32
}
...
},
]
}
y secarga dentro del archivo de la escena phaser así:
preload(){
...
this.load.atlas('evil_tomato', './assets/evil_tomato.png', './assets/evil-tomato.json' );
y al crear la animacion se carga por:
this.anims.create({
...
frames: this.anims.generateFramesNames('evil_tomato' ...)
})
}
// video tutorial Phaser lammdafp: https://www.youtube.com/watch?v=mY1nzvYsWOY&list=PLL_H5w4KA8dP9pPayzYxHCD4IQ80nkfY9&index=11

## animaciones solo json

hay una tercera forma de crear animaciones usando solo json:
{
anims: [{
key: "tomato_atlas_walk",
type: frames,
repeat: -1,
.... ver videotutorial: https://www.youtube.com/watch?v=mY1nzvYsWOY&list=PLL_H5w4KA8dP9pPayzYxHCD4IQ80nkfY9&index=11
}]
}
y se carga desde cache
preload(){this.load.json('evil_tomato_anim', './assets/evil_tomato_anim.json');}

create(){
this.dataAnim = this.cache.json.get('evil_tomato_anim');
this.tomato.anims.play('tomato_atlas_walk);
}

# PUBLICACION PHONE GUP MOVILES

1. darse de alta en phonegup co ntu cuenta de adobe
2. hacer .zip del proyecto build, sol el src
3. index.html directamente en el raiz
4. obtener código qr de la aplicación y publicarlo en redes sociales
5. xml archivo de configuración

# Herramientas

## tiled images editor de escenas

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /065/066"

## herramienta para desarrolladores

> npm install -g phaser3-cli-gamma // escafolding y cli

> pg --new nombreProyecto // crea el scafolding del proyecto

> pg --scene Nuevaescena // crea una nueva escena

## tener las recomendaciones de Phaser para los objetos y clases

hemos ido al repo de Phaser https://github.com/photonstorm/phaser/blob/master/types/phaser.d.ts y descargad el archivo phaser.d.ts y metido en la carpeta def, dentro del ./src/
luego creado el archivo jsconfig.json con un objeto vacío {}

eso es todo

# Clases y componentes

## clasess genericas

class Player extends Phaser.Physiscs.Arcade.Sprite {
constructor(scene, x, y)
super(scene, x, y 'player);
scene.physics.systems.displayList.add(this); // añadir esta clase a la display list de la escena que lo use
scene.physics.systems.updateList.add(this);
scene.physics.world.enableBody(this, 0);
}

import { PLayer } from '/clsses/Player.js';
export class Battle extends Phaser.Scene {
// this.player = this.physics.add.sprite(...)
this.player = new PLayer(this, playerFromTiled[0].x, playerFromTiled[o].y); // nueva forma a partir de una clase
}

## Herencia

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /082

## gameObjects

// los gameObjects son clases especiales de Pahser que se pueden cargar en archivos independientes
/gameObjects/Palas.js
------ palas.js ------
class Palas extends Phaser.GameObjects.Sprite {
constructor(scene, x, y, type){
super(scene, x, y, type);
scene.add.existing(this); // lo renderiza en la escena
scene.physics.world.enable(this); // le añade físicas a estos gameObjects
... // puedes configurar tu objeto genéricamente en este archivo

}
export default Palas;
}
---sceneX.js -----
import Palas from '../gameObjects/palas.js';
class SceneX extends Pahser.Scene {
...
create() {
...

<!-- this.izquierda = this.add.image(x, y, "palaizquierda"); // forma antigua sin gameObjects -->

this.palaIzda = new Palas(this, x, y, "palaizquierda"); // con gameObjects
}
}

# AVANZADO

## Carga de Layers

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /067/068

## Bounding Box

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /068/069

## Camara seguimiento

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /074

## Camara limite de movimientos

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /089

## Enemigo inteligente

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /077/078

## Paths

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /082/083

## Estados de un objeto

... saber más, ver: "APRENDER DESARROLLO DE VIDEOJUEGOS PARA MOVILES Y WEB CON PHASER.JS /084/085/086/087

## intro ocn objetos y movimientos de camara

https://www.youtube.com/watch?v=mTZ5KM9dnBk&list=PLL_H5w4KA8dP9pPayzYxHCD4IQ80nkfY9&index=25
https://www.youtube.com/watch?v=hlkXrru9274&list=PLL_H5w4KA8dP9pPayzYxHCD4IQ80nkfY9&index=26
