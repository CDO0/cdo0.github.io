import preload_page from "/src/js/preload_page.js";
import menu from "/src/js/menu.js";
import main_scene from "/src/js/main_scene.js";
import next_level from"/src/js/next_level.js";



// configuration générale du jeu

const config = {
  type: Phaser.AUTO,
  input :{
		activePointers:3,
	  },
  scale:{
    mode: Phaser.Scale.FIT,
    //parent:"game",
  width: 1030, // largeur en pixels
  height: 650, // hauteur en pixels
  autoCenter: Phaser.Scale.CENTER_BOTH,
  
  },
  render:{ // phaser cherche à rendre plus "smooth", on ne veut pas cela en pixel art
    pixelArt: true
  },
  
  
  physics: {
    // définition des parametres physiques
    default: "arcade", 
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 300 // gravité verticale : acceleration des corps en pixels par seconde
      },
      //debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [preload_page, menu, main_scene, next_level] 
};

// création et lancement du jeu
const game = new Phaser.Game(config);
game.scene.start("preload_page");


