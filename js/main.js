 //定义一个数组   
 var nums = new Array();
 var nums2=new Array();
 var score=0;

 //开始新游戏
 $(function () {
     newgame();
 })

 //当网页准备好时初始化背景网格
 function newgame() {
     // 初始化 
     init();

     // 在空余的表格中随机生成2个随机数
     createnewnumber();
     createnewnumber();
 }

 //初始化双层16个单元格
 function init() {
     $(".over").hide();
     for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
             var cell = $("#gridcell-" + i + "-" + j);
             cell.css("top", getpostcelli(i, j));
             cell.css("left", getpostcellj(i, j));
         }
     }


     //初始化数组
     for (var i = 0; i < 4; i++) {
         nums[i] = new Array();
         for (var j = 0; j < 4; j++) {
             nums[i][j] = 0;

         }
     }

     //动态创建上层单元格并初始化
     updateview();
     score=0;
	 updateScore(score);
 }

 //更新上层16格视图
 function updateview() {
    $('.numbercell').remove();

     for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
             $("#backgroundcell").append('<div class="numbercell" id="numbercell-' + i + '-' + j + '"></div>');
             var cell2 = $("#numbercell-" + i + "-" + j);
             if (nums[i][j] == 0) {
                 cell2.css("width", "0px");
                 cell2.css("height", "0px");
                 cell2.css("top", getpostcelli(i, j)+50);
                 cell2.css("left", getpostcellj(i, j)+50);
                 cell2.text(nums[i][j]);
             } else {
                 cell2.css("width", "100px");
                 cell2.css("height", "100px");
                 cell2.css("top", getpostcelli(i, j));
                 cell2.css("left", getpostcellj(i, j));
                 cell2.css("background-color", cell2bgc(nums[i][j]));
                 cell2.css("color", cell2fontbgc(nums[i][j]));
                 cell2.text(nums[i][j]);
             }
         }
     }
 }

 
 //  判断有没有空余的表格可以用于随机生成2个随机数
 function createnewnumber() {
     if (nospace()) {
         return;
     }

     // 在剩余的空格内随机选定一个位置
     var count = 0;
     var temp = new Array();
     for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
             if (nums[i][j] == 0) {
                 temp[count] = i * 4 + j;
                 count++;
             }
         }
     }
     var post = Math.floor(Math.random() * count);
     var xi = Math.floor(temp[post] / 4);
     var yj = Math.floor(temp[post] % 4);

     var randnumber = nums[xi][yj];

     //  获得随机数
     if (Math.random() > 0.5) {
         randnumber = 4
     } else {
         randnumber = 2;
     }


     //  通过动画显示随机数
     nums[xi][yj] = randnumber;
     byanimationaddnumber(xi, yj, randnumber);
 }

 // 获取键盘上下左右按键的响应
 $(document).keydown(function (e) {
     switch (e.keyCode) {
         // 键盘左边 
         case 37:
             if (cantoleft(nums)) {
                 movetoleft();
                 setTimeout(createnewnumber,200);
                 setTimeout(isGameOver,500);
             }
             break;
             //  键盘上边
         case 38:
             if (cantoup(nums)) {
                 movetoup();
                 setTimeout(createnewnumber,200);
                 setTimeout(isGameOver,500);
             }
             break;
             // 键盘右边
         case 39:
             if (cantoright(nums)) {
                 movetoright();
                 setTimeout(createnewnumber,200);
                 setTimeout(isGameOver,500);
             }
             break;
             // 键盘下面
         case 40:
             if (cantodown(nums)) {
                 movetodown();
                 setTimeout(createnewnumber,200);
                 setTimeout(isGameOver,500);
             }
             break;
         default:
             break;
     }
 });

 //  向左移动具体操作
 //     1.向左移动
 //     2.落地点没有数字，并且中间路径上有阻挡
 //     3.落地点有数字但是和本身的数字是一样的，移到到适当位置并把2个数字相加
 function movetoleft() {
     for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
             if (nums[i][j] != 0) {
                 for (var k = 0; k < j; k++) {
                     if (nums[i][k] == 0 && nointermediateval1(i, k, j, nums)) {
                         //  进行移动的操作
                         movebyanimation(i, j, i, k);
                         nums[i][k] = nums[i][j];
                         nums[i][j] = 0;
                         break;
                     }else if(nums[i][k]==nums[i][j]&&nointermediateval1(i,k,j,nums))
                     {
                        movebyanimation(i,j,i,k);
                        nums[i][k]+=nums[i][j];
                        nums[i][j]=0;
                        score+=nums[i][k];
                        updateScore(score);
                     }
                 }
             }
         }

     }
     setTimeout(updateview, 600);
 }

 //  向右移动具体操作
 //     1.向右移动
 //     2.落地点没有数字，并且中间路径上有阻挡
 //     3.落地点有数字但是和本身的数字是一样的，移到到适当位置并把2个数字相加
 function movetoright() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (nums[i][k] == 0 && nointermediateval2(i, k, j, nums)) {
                        //  进行移动的操作
                        movebyanimation(i, j, i, k);
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    }else if(nums[i][k]==nums[i][j]&&nointermediateval2(i,k,j,nums))
                    {
                       movebyanimation(i,j,i,k);
                       nums[i][k]+=nums[i][j];
                       nums[i][j]=0;
                    }
                }
            }
        }

    }
    setTimeout(updateview, 600);
}

//  向上移动具体操作
 //     1.向上移动
 //     2.落地点没有数字，并且中间路径上有阻挡
 //     3.落地点有数字但是和本身的数字是一样的，移到到适当位置并把2个数字相加
 function movetoup() {
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (nums[k][j] == 0 && nointermediateval3(j, k, i, nums)) {
                        //  进行移动的操作
                        movebyanimation(i, j, k, j);
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    }else if(nums[k][j]==nums[i][j]&&nointermediateval3(j,k,i,nums))
                    {
                       movebyanimation(i,j,i,k);
                       nums[k][j]+=nums[i][j];
                       nums[i][j]=0;
                       score+=nums[k][j];
                       updateScore(score);
                    }
                }
            }
        }

    }
    setTimeout(updateview, 600);
}

//  向上移动具体操作
 //     1.向上移动
 //     2.落地点没有数字，并且中间路径上有阻挡
 //     3.落地点有数字但是和本身的数字是一样的，移到到适当位置并把2个数字相加
 function movetodown() {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >=0 ; i--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (nums[k][j] == 0 && nointermediateval4(j, i, k, nums)) {
                        //  进行移动的操作
                        movebyanimation(i, j, k, j);
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    }else if(nums[k][j]==nums[i][j]&&nointermediateval4(j,i,k,nums))
                    {
                       movebyanimation(i,j,k,j);
                       nums[k][j]+=nums[i][j];
                       nums[i][j]=0;
                       score+=nums[k][j];
                       updateScore(score);
                    }
                }
            }
        }

    }
    setTimeout(updateview, 600);
}

