var nave;
var balas;
var tiempo_entre_balas=400;
var tiempo=0;
var malos;
var timer; //tiempo con el que sale los malos
var puntos;
var txt_puntos;
var vidas;
var txt_vidas;
var Juego={
    preload:function(){
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('malo', 'img/malo.png');
        juego.load.image('nave', 'img/nave.png');
        juego.load.image('laser', 'img/laser.png');
    },
    create: function(){
        juego.add.tileSprite(0,0,400,540,'bg');
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        nave = juego.add.sprite(juego.width/2, 490, 'nave');
        nave.anchor.setTo(0.5);
        juego.physics.arcade.enable(nave);

        balas=juego.add.group();
        balas.enableBody=true;
        balas.setBodyType=Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 0.5);
        balas.setAll('checkWorldBounds', true);
        balas.setAll('outOfBoundsKill', true);

        malos=juego.add.group();
        malos.enableBody=true;
        malos.setBodyType=Phaser.Physics.ARCADE;
        malos.createMultiple(20, 'malo');
        malos.setAll('anchor.x', 0.5);
        malos.setAll('anchor.y', 0.5);
        malos.setAll('checkWorldBounds', true);
        malos.setAll('outOfBoundsKill', true);

        timer = juego.time.events.loop(2000, this.crear_enemigo, this);

        puntos=0;
        juego.add.text(20, 20, "Puntos", {font:"14px Arial", fill:"#fff"});
        txt_puntos=juego.add.text(80, 20, "0", {font:"14px Arial", fill:"#fff"});

        vidas=3;
        juego.add.text(310, 20, "Vidas", {font:"14px Arial", fill:"#fff"});
        txt_vidas=juego.add.text(370, 20, "3", {font:"14px Arial", fill:"#fff"});
    },
    update: function(){
        //El sprite lo rota para que apunte hacia donde el cursor
        nave.rotation = juego.physics.arcade.angleToPointer(nave)+Math.PI/2;
        if(juego.input.activePointer.isDown){
            this.disparar();
        }
        juego.physics.arcade.overlap(balas, malos, this.colision, null, this);

        malos.forEachAlive(function(m){
            if(m.position.y>520 && m.position.y<521){
                vidas--;
                txt_vidas.text=vidas;
                m.kill();
            }
        });
        if(vidas==0){
            juego.state.start("Terminado");
        }
    },
    disparar: function(){
        if(juego.time.now>tiempo && balas.countDead()>0){
            tiempo=juego.time.now+tiempo_entre_balas;
            var bala=balas.getFirstDead();
            bala.anchor.setTo(0.5);
            bala.reset(nave.x, nave.y);
            bala.rotation=juego.physics.arcade.angleToPointer(bala)+Math.PI/2;
            juego.physics.arcade.moveToPointer(bala, 200);
        }
    },
    crear_enemigo : function(){
        var enem = malos.getFirstDead();
        var num=Math.floor(Math.random()*10)+1;
        enem.reset(num*39, 0);
        enem.anchor.setTo(0.5);
        enem.body.velocity.y=100;
        enem.checkWorldBounds=true;
        enem.outOfBoundsKill=true;
    },
    colision: function(b, m){
        b.kill();
        m.kill();
        puntos++;
        txt_puntos.text=puntos;
    }
};