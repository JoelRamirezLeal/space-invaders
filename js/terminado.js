var Terminado = {
    preload:function(){

    },
    create: function(){
        juego.stage.backgroundColor="#990000";
        if(confirm("¿Desea reiniciar el juego?")){
            juego.state.start('Juego');
        }
    },
    update: function(){
        
    }
};