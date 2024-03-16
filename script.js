//0-spatii libere, 1-bile albe, 2-bile negre, 3-spatii interzise si spatii pierzatoare.
const tabla= new Array(11).fill().map(()=>new Array(19).fill(3));
for(i=1;i<=9;i++)
{   
    if(i<=5)
    {
        for(j=6-i;j<=12+i;j=j+2)
        {
            if(i<=2)
                tabla[i][j]=1;
            else
                tabla[i][j]=0;
        }
    }
    else
    {
        for(j=i-4;j<=22-i;j=j+2)
        {
            if(i>=8)
                tabla[i][j]=2;
            else
                tabla[i][j]=0;
        }
    }
    tabla[3][7]=1;
    tabla[3][9]=1;
    tabla[3][11]=1;
    tabla[7][7]=2;
    tabla[7][9]=2;
    tabla[7][11]=2;
}
console.log(tabla);

const board = document.getElementById('board');
for (let i = 0; i < tabla.length; i++) {
    for (let j = 0; j < tabla[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        switch (tabla[i][j]) {
            case 0: cell.classList.add('blue'); break;
            case 1: cell.classList.add('white'); break;
            case 2: cell.classList.add('black'); break;
            case 3: cell.classList.add('red'); break;
        }
        board.appendChild(cell);
    }
    board.appendChild(document.createElement('br'));
}
