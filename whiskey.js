const container=document.querySelector('.container');
let img_width=220;

function createImgs(){
    for(let i=1;i<=6;i++){
        let src='basespirits/whiskey/'+i+'.jpg';
        let img=document.createElement('img');
        img.src=src;
        img.width=img_width;
        img.onload=setPositions;
        container.appendChild(img);
    }
}

createImgs();

function cal(){
    let container_width=container.clientWidth;
    let columns=Math.floor(container_width/img_width);
    let space_number=columns+1;
    let left_space=container_width-columns*img_width;
    let space=left_space/space_number;
    return {
        space: space,
        columns: columns
    };
}
function setPositions(){
    let info=cal();
    let next_tops=new Array(info.columns);
    next_tops.fill(0);
    for(let i=0;i<container.children.length;i++){
        let img=container.children[i];
        let min_top=Math.min.apply(null,next_tops);
        img.style.top=min_top+'px';
        let index=next_tops.indexOf(min_top); 
        next_tops[index]+=img.height+info.space;
        let left=(index+1)*info.space+index*img_width;
        img.style.left=left+'px';
    }
    let max=Math.max.apply(null,next_tops);
    container.style.height=max+'px';
}

let timer=null;
window.onresize=function(){
    if(timer){
        clearTimeout(timer);
    }
    timer=setTimeout(setPositions,100);
}