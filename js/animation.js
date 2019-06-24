function byanimationaddnumber(a,b,randnumber) {
    var cell2number=$("#numbercell-" + a + "-" + b);
    cell2number.css('background-color',cell2bgc(randnumber));
    cell2number.css('color',cell2fontbgc(randnumber));
    cell2number.text(randnumber);

    cell2number.animate({
        width:"100px",
        height:"100px",
        top:getpostcelli(a, b),
        left:getpostcellj(a, b)
    },300);

  }

//   表格移动动画
function  movebyanimation(fromi,fromj,toi,tok) {
    var readymovecell=$("#numbercell-" + fromi + "-" + fromj);
    readymovecell.animate({
        // width:'100px',
        // height:"100px",
        top:getpostcelli(toi, tok),
        left:getpostcellj(toi, tok)
    },300)
}