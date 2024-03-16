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
let scorePlayerBlack=0;
let scorePlayerWhite=0;
let player=2;
let playerWaiting=1;
let actiuni=0;
let i1;
let j1;
let i2;
let j2;
let i3;
let j3;
let type;
let lungime;
let imin;
let imax;
const board = document.getElementById('board');
function updateCellColor(i, j) {
    let cell = board.children[i * 20 + j]; 
    cell.className = 'cell'; 
    switch (tabla[i][j]) {
        case 0: 
            cell.classList.add('light-grey'); 
            break;
        case 1: 
            cell.classList.add('white'); 
            break;
        case 2: 
            cell.classList.add('black'); 
            break;
    }
}
for (let i = 0; i < tabla.length; i++) {
    for (let j = 0; j < tabla[i].length; j++) {
        let cell;
        switch (tabla[i][j]) {
            case 0: 
                cell = document.createElement('button');
                cell.classList.add('cell', 'light-grey'); 
                break;
            case 1: 
                cell = document.createElement('button');
                cell.classList.add('cell', 'white'); 
                break;
            case 2: 
                cell = document.createElement('button');
                cell.classList.add('cell', 'black'); 
                break;
            case 3: 
                cell = document.createElement('div');  
                cell.classList.add('cell', 'dark-grey'); 
                break;
        }
        if (cell.tagName === 'BUTTON') {
            cell.addEventListener('click', function() {
                if(actiuni==0)
                {
                    if(tabla[i][j]==player)
                    {
                        i1=i;
                        j1=j;
                        actiuni++;
                    }
                }
                if(actiuni==1)
                {
                    if(tabla[i][j]==0)
                    {
                        if(((i==i1-1||i==i1+1)&&(j==j1-1||j==j1+1))||(i==i1&&(j==j1-2||j==j1+2)))
                            {
                                tabla[i][j]=player;
                                tabla[i1][j1]=0;
                                updateCellColor(i, j); 
                                updateCellColor(i1, j1);
                                aux=player;
                                player=playerWaiting;
                                playerWaiting=aux;
                                actiuni=0;
                            }
                        else
                            {
                                actiuni=0;
                            }
                    }
                    else if(tabla[i][j]==player)
                    {
                        if(((i==i1-1||i==i1+1)&&(j==j1-1||j==j1+1))||(i==i1&&(j==j1+2||j==j1-2)))
                        {
                            i2=i;
                            j2=j;
                            actiuni++;
                            lungime=2;
                            if(i==i1)
                            {
                                type=1;
                            }
                            else if((i=i1-1&&j==j1+1)||(i==i1+1&&j==j1-1))
                            {
                                type=2;
                            }
                            else
                            {
                                type=3;
                            }
                        }
                        else if(((i==i1-2||i==i1+2)&&(j==j1-2||j==j1+2))||(i==i1&&(j==j1+4||j==j1-4)))
                        {
                            i3=i;
                            j3=j;
                            i2=(i1+i3)/2;
                            j2=(j1+j3)/2;
                            lungime=3;
                            actiuni++;
                            if(i==i1)
                            {
                                type=1;
                            }
                            else if((i=i1-1&&j==j1+1)||(i==i1+1&&j==j1-1))
                            {
                                type=2;
                            }
                            else
                            {
                                type=3;
                            }
                        }
                    }
                    else
                    {
                        actiuni=0;
                    }   
                }
                if(actiuni==2)
                {
                    if(lungime==2)
                    {
                        if(i1>=i2)
                        {
                            imax=i1;
                            imin=i2;
                        }
                        else
                        {
                            imax=i2;
                            imin=i1;
                        }
                        if(j1>=j2)
                        {
                            jmax=j1;
                            jmin=j2;
                        }
                        else
                        {
                            jmax=j2;
                            jmin=j1;
                        }
                    }
                    else
                    {
                        if(i1>=i3)
                        {
                            imax=i1;
                            imin=i3;
                        }
                        else
                        {
                            imax=i3;
                            imin=i1;
                        }
                        if(j1>=j3)
                        {
                            jmax=j1;
                            jmin=j3;
                        }
                        else
                        {
                            jmax=j3;
                            jmin=j1;
                        }
                    }
                    if(type==1)
                    {
                        if(i==imax-1)
                        {
                            if(j==jmin-1)
                            {
                                if(lungime==2)
                                {
                                    if((tabla[i1-1][j1-1]==0)&&(tabla[i2-1][j2-1]==0))
                                    {
                                        tabla[i1-1][j1-1]=player;
                                        tabla[i2-1][j2-1]=player;
                                        updateCellColor(i1-1, j1-1);
                                        updateCellColor(i2-1, j2-1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                                if(lungime==3)
                                {
                                    if((tabla[i1-1][j1-1]==0)&&(tabla[i2-1][j2-1]==0)&&(tabla[i3-1][j3-1]==0))
                                    {
                                        tabla[i1-1][j1-1]=player;
                                        tabla[i2-1][j2-1]=player;
                                        tabla[i3-1][j3-1]=player;
                                        updateCellColor(i1-1, j1-1);
                                        updateCellColor(i2-1, j2-1);
                                        updateCellColor(i3-1, j3-1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        tabla[i3][j3]=0;
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        updateCellColor(i3, j3);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                            }
                            else if(j==jmax+1)
                            {
                                if(lungime==2)
                                {
                                    if((tabla[i1-1][j1+1]==0)&&(tabla[i2-1][j2+1]==0))
                                    {
                                        tabla[i1-1][j1+1]=player;
                                        tabla[i2-1][j2+1]=player;
                                        updateCellColor(i1-1, j1+1);
                                        updateCellColor(i2-1, j2+1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                                if(lungime==3)
                                {
                                    if((tabla[i1-1][j1+1]==0)&&(tabla[i2-1][j2+1]==0)&&(tabla[i3-1][j3+1]==0))
                                    {
                                        tabla[i1-1][j1+1]=player;
                                        tabla[i2-1][j2+1]=player;
                                        tabla[i3-1][j3+1]=player;
                                        updateCellColor(i1-1, j1+1);
                                        updateCellColor(i2-1, j2+1);
                                        updateCellColor(i3-1, j3+1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        tabla[i3][j3]=0;
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        updateCellColor(i3, j3);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                            }
                            else
                            {
                                actiuni=0;
                            }
                        }
                        else if(i==imax+1)
                        {
                            if(j==jmin-1)
                            {
                                if(lungime==2)
                                {
                                    if((tabla[i1+1][j1-1]==0)&&(tabla[i2+1][j2-1]==0))
                                    {
                                        tabla[i1+1][j1-1]=player;
                                        tabla[i2+1][j2-1]=player;
                                        updateCellColor(i1+1, j1-1);
                                        updateCellColor(i2+1, j2-1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                                if(lungime==3)
                                {
                                    if((tabla[i1+1][j1-1]==0)&&(tabla[i2+1][j2-1]==0)&&(tabla[i3+1][j3-1]==0))
                                    {
                                        tabla[i1+1][j1-1]=player;
                                        tabla[i2+1][j2-1]=player;
                                        tabla[i3+1][j3-1]=player;
                                        updateCellColor(i1+1, j1-1);
                                        updateCellColor(i2+1, j2-1);
                                        updateCellColor(i3+1, j3-1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        tabla[i3][j3]=0;
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        updateCellColor(i3, j3);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                            }
                            else if(j==jmax+1)
                            {
                                if(lungime==2)
                                {
                                    if((tabla[i1+1][j1+1]==0)&&(tabla[i2+1][j2+1]==0))
                                    {
                                        tabla[i1+1][j1+1]=player;
                                        tabla[i2+1][j2+1]=player;
                                        updateCellColor(i1+1, j1+1);
                                        updateCellColor(i2+1, j2+1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                                if(lungime==3)
                                {
                                    if((tabla[i1+1][j1+1]==0)&&(tabla[i2+1][j2+1]==0)&&(tabla[i3+1][j3+1]==0))
                                    {
                                        tabla[i1+1][j1+1]=player;
                                        tabla[i2+1][j2+1]=player;
                                        tabla[i3+1][j3+1]=player;
                                        updateCellColor(i1+1, j1+1);
                                        updateCellColor(i2+1, j2+1);
                                        updateCellColor(i3+1, j3+1);
                                        tabla[i1][j1]=0;
                                        tabla[i2][j2]=0
                                        tabla[i3][j3]=0;
                                        updateCellColor(i1, j1);
                                        updateCellColor(i2, j2);
                                        updateCellColor(i3, j3);
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                            }
                            else
                            {
                                actiuni=0;
                            }
                        }
                        else if(i==imax)
                        {
                            if(j==jmin-2)
                            {
                                if(tabla[imax][jmin-2]==0)
                                {
                                    tabla[imax][jmin-2]=player;
                                    tabla[imax][jmax]=0;
                                    updateCellColor(imax,jmin-2);
                                    updateCellColor(imax,jmax);
                                    actiuni=0;
                                    aux=player;
                                    player=playerWaiting;
                                    playerWaiting=aux;
                                }
                                else if(tabla[imax][jmin-2]==playerWaiting)
                                {
                                    canPush=true;
                                    index=2;
                                    while((jmin-(index+2)>=1)&&(tabla[imax][jmin-(index+2)]!=0&&tabla[imax][jmin-(index+2)]!=3))
                                    {
                                        console.log("a")
                                        index=index+2;
                                        if(tabla[imax][jmin-index]==player)
                                        {
                                            canPush=false;
                                            break;
                                        }
                                    }
                                    if(index/2>=lungime)
                                    {
                                        canPush=false;
                                    }
                                    if(canPush)
                                    {
                                        tabla[imax][jmin-2]=player;
                                        tabla[imax][jmax]=0;
                                        updateCellColor(imax,jmin-2);
                                        updateCellColor(imax,jmax);
                                        if((jmin-(index+2)>=1)&&(tabla[imax][jmin-index-2]==0))
                                        {
                                            tabla[imax][jmin-index-2]=playerWaiting;
                                            updateCellColor(imax,jmin-index-2);
                                        }
                                        else
                                        {
                                            if(player==2)
                                            {
                                                scorePlayerBlack++;
                                            }
                                            else
                                            {
                                                scorePlayerWhite++;
                                            }
                                        }
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                            }
                            else if(j==jmax+2)
                            {
                                if(tabla[imax][jmax+2]==0)
                                {
                                    tabla[imax][jmax+2]=player;
                                    tabla[imax][jmin]=0;
                                    updateCellColor(imax,jmax+2);
                                    updateCellColor(imax,jmin);
                                    actiuni=0;
                                    aux=player;
                                    player=playerWaiting;
                                    playerWaiting=aux;
                                }
                                else if(tabla[imax][jmax+2]==playerWaiting)
                                {
                                    canPush=true;
                                    index=2;
                                    while((jmax+index+2<=17)&&(tabla[imax][jmax+(index+2)]!=0&&tabla[imax][jmax+(index+2)]!=3))
                                    {
                                        index=index+2;
                                        if(tabla[imax][jmax+index]==player)
                                        {
                                            canPush=false;
                                            break;
                                        }
                                    }
                                    if(index/2>=lungime)
                                    {
                                        canPush=false;
                                    }
                                    if(canPush)
                                    {
                                        tabla[imax][jmax+2]=player;
                                        tabla[imax][jmin]=0;
                                        updateCellColor(imax,jmax+2);
                                        updateCellColor(imax,jmin);
                                        if((jmax+index+2<=17)&&(tabla[imax][jmax+index+2]==0))
                                        {
                                            tabla[imax][jmax+index+2]=playerWaiting;
                                            updateCellColor(imax,jmax+index+2);
                                        }
                                        else
                                        {
                                            if(player==2)
                                            {
                                                scorePlayerBlack++;
                                            }
                                            else
                                            {
                                                scorePlayerWhite++;
                                            }
                                        }
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                            }
                            
                        }
                        else
                        {
                            actiuni=0;
                        }
                    }
                    else if(type==2)
                    {
                        if(i==imin-1)
                        {
                            if(j==jmax+1)
                            {
                                if(tabla[imin-1][jmax+1]==0)
                                {
                                    tabla[imin-1][jmax+1]=player;
                                    tabla[imax][jmin]=0;
                                    updateCellColor(imin-1,jmax+1);
                                    updateCellColor(imax,jmin);
                                    actiuni=0;
                                    aux=player;
                                    player=playerWaiting;
                                    playerWaiting=aux;
                                }
                                else if(tabla[imin-1][jmax+1]==playerWaiting)
                                {
                                    canPush=true;
                                    index=1;
                                    while(tabla[imin-(index+1)][jmax+(index+1)]!=0&&tabla[imin-(index+1)][jmax+(index+1)]!=3)
                                    {
                                        index++;
                                        if(tabla[imin-index][jmax+index]==player)
                                        {
                                            canPush=false;
                                            break;
                                        }
                                    }
                                    if(index>=lungime)
                                    {
                                        canPush=false;
                                    }
                                    if(canPush)
                                    {
                                        tabla[imin-1][jmax+1]=player;
                                        tabla[imax][jmin]=0;
                                        updateCellColor(imin-1,jmax+1);
                                        updateCellColor(imax,jmin);
                                        if(tabla[imin-index-1][jmax+index+1]==0)
                                        {
                                            tabla[imin-index-1][jmax+index+1]=playerWaiting;
                                            updateCellColor(imin-index-1,jmax+index+1);
                                        }
                                        else
                                        {
                                            if(player==2)
                                            {
                                                scorePlayerBlack++;
                                            }
                                            else
                                            {
                                                scorePlayerWhite++;
                                            }
                                        }
                                        actiuni=0;
                                        aux=player;
                                        player=playerWaiting;
                                        playerWaiting=aux;
                                    }
                                }
                            }
                        }
                        else
                        {
                            actiuni=0;
                        }
                    }
                }
            }); 
        }
        board.appendChild(cell);
    }
    board.appendChild(document.createElement('br'));
}
