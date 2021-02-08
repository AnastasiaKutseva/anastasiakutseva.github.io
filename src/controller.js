export default class Controller{
    constructor(game, view){
        this.game = game;
        this.view = view;
        this.isPlaing = false;
        this.intervalId = null;

       

        document.addEventListener('keydown', this.hendleKeyDown.bind(this));
        document.addEventListener('keyup', this.hendleKeyUp.bind(this));
        
        this.view.renderStartScreen();
    }
        update(){
            this.game.movePieceDown();
            this.updateView();
        }
        play(){
            this.isPlaing = true;
            this.startTimer();
            this.updateView();
        }

        pause(){
            this.isPlaing = false;
            this.stopTimer();
            this.updateView();
        }
        reset(){
            this.game.reset();
            this.play();
        }
        updateView(){
            const state = this.game.getState();


            if(state.isGameOver){
                this.view.renderEndScreen(state);
            }
            else if (!this.intervalId){
                this.view.renderResumeScreen();
            }else{
                this.view.renderMainScreen(state);
            }
        }
        startTimer(){
            const speed = 1000 - this.game.getState().level * 100;
            if(!this.intervalId){
                this.intervalId = setInterval(() => {
                    this.update();
                },speed > 0 ? speed : 100);
            }
        }
        stopTimer(){
            if(this.intervalId){
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            
        }

    hendleKeyDown(event){
        const state = this.game.getState();

        switch(event.keyCode){
            case 13: //enter
                if(state.isGameOver){
                    this.reset();
                }
                else if(this.isPlaing){
                    this.pause();
                }else{
                    this.play();
                }
                break;
            case 37: //left
                this.game.movePieceLeft();
                this.view.renderMainScreen(this.game.getState());
                break;
    
            case 38: //up
                this.game.rotatePiece();
                this.view.renderMainScreen(this.game.getState());
                break;
                
            case 39: //right
                this.game.movePieceRight();
                this.view.renderMainScreen(this.game.getState());
                break;
    
            case 40: //down
                this.stopTimer();
                this.game.movePieceDown();
                this.view.renderMainScreen(this.game.getState());
                break;  
        }
    }
    hendleKeyUp(event){
        switch(event.keyCode){
            case 40: //down
               this.startTimer();
                break;  
        } 
    }
}