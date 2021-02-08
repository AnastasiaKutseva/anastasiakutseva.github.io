export default class View {

    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'greem',
        '6': 'purple',
        '7': 'red'
    };
    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfildBorderWidth = 4;
        this.playfildX = this.playfildBorderWidth;
        this.playfildY = this.playfildBorderWidth;
        this.playfildWidth = this.width * 2 / 3;
        this.playfildHeight = this.height;
        this.playfildInnerWidth = this.playfildWidth - this.playfildBorderWidth * 2;
        this.playfildInnerHeight = this.playfildHeight - this.playfildBorderWidth * 2;

        this.blockWidth = this.playfildInnerWidth / columns;
        this.blockHeight = this.playfildInnerHeight / rows;

        this.panelX = this.playfildWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }

    renderMainScreen(state){
        this.clearScreen();
        this.renderPlayfild(state);
        this.renderPanel(state);
    }
   
    renderStartScreen(){
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
        }
        renderResumeScreen(){
            this.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
            this.context.fillRect(0, 0, this.width, this.height);

            this.context.fillStyle = 'white';
            this.context.font = '18px "Press Start 2P"';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);
            this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);
            }

            renderEndScreen({score}){
                this.clearScreen();
    
                this.context.fillStyle = 'white';
                this.context.font = '18px "Press Start 2P"';
                this.context.textAlign = 'center';
                this.context.textBaseline = 'middle';
                this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
                this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
                this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 48);   
            }
            clearScreen() {
                this.context.clearRect(0, 0, this.width, this.height);
            }
    renderPlayfild({playfild}) {
        for (let y = 0; y < playfild.length; y++) {
            for (let x = 0; x < playfild[y].length; x++) {
                const block = playfild[y][x];

                if (block) {

                    this.renderBlock(
                       this.playfildX + (x * this.blockWidth), 
                       this.playfildY + (y * this.blockHeight), 
                        this.blockHeight, 
                        this.blockWidth, 
                        View.colors[block]
                    );
                }
            }
        }
        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfildBorderWidth;
        this.context.strokeRect(0, 0, this.playfildWidth, this.playfildInnerHeight);
    }
    renderPanel({ level, score, lines, nextPiece}){
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
        this.context.fillText('Next:', this.panelX, this.panelY + 98);

        for(let y = 0; y < nextPiece.blocks.length; y++){
            for(let x = 0; x < nextPiece.blocks[y].length; x++){
                const block = nextPiece.blocks[y][x];
                // console.log(block);
                if(block){
                    this.renderBlock(
                      this.panelX + (x * this.blockWidth * 0.5),
                        this.panelY + 100 + (y * this.blockHeight * 0.5),
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        View.colors[block]
                    );
                }
            }
        }
    }
    renderBlock(x, y, width, height, colors) {
        this.context.fillStyle = colors;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height)
    }
}