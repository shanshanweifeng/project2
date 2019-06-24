//循环到top的高低
function getpostcelli(i, j) {
    return 20 + 120 * i;
}

//循环到left的宽度
function getpostcellj(i, j) {
    return 20 + 120 * j;
}

// 表格与数字对应的背景颜色
function cell2bgc(num) {
    switch (num) {
        case 0:
            return "transparent";
            break;
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
}

// 表格与数字对应的数字背景颜色
function  cell2fontbgc(num) {
    if (num<=4 && num>0) {
        return '#776e65'
    }
    else if(num=0){
        return 'transparent'
    }else{
        return '#fff'
    }
  }

//   判断是否没有空间
function nospace() {
     for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
             if (nums[i][j]==0) {
                 return false;
             }
         }  
   }
   return true;
  }

// 判断是否可以往左移动，不包括移动几个
function cantoleft(nums) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (nums[i][j]!=0) {
                if (nums[i][j-1]==0 || nums[i][j-1]==nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;    
  }

  // 判断是否可以往右移动，不包括移动几个,查看有没有空的表格
  function cantoright(nums) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (nums[i][j]!=0) {
                if (nums[i][j+1]==0 || nums[i][j+1]==nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;    
  }

   // 判断是否可以往上移动，不包括移动几个,查看有没有空的表格
   function cantoup(nums) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j]!=0) {
                if (nums[i-1][j]==0 || nums[i-1][j]==nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;    
  }

  function cantodown(nums) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j]!=0) {
                if (nums[i+1][j]==0 || nums[i+1][j]==nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;    
  }
// 判断中间表格中是否存在值，其中w是判断表格的列标
// 在main.js中，k是第一个循环，在nums[i][k]也就是common.js中的nums[row][w]到现存的需要被移动的表格数字之间的表格，需要被循环遍历，查看有没有阻挡，因为第一个已经被查过了

// 向左判断
function nointermediateval1(row,col1,col2,nums){
    for (var w = col1+1; w < col2; w++) {
        if (nums[row][w]!==0) {
            return false;
        }
    }
    return true;
}

// 向右判断
function nointermediateval2(row,col1,col2,nums){
    for (var w = col1-1; w > col2; w--) {
        if (nums[row][w]!==0) {
            return false;
        }
    }
    return true;
}

// 向上判断
function nointermediateval3(col,row1,row2,nums){
    for (var w = row1+1; w < row2; w++) {
        if (nums[w][col]!==0) {
            return false;
        }
    }
    return true;
}

// 向下判断
function nointermediateval4(col,row1,row2,nums){
    for (var w = row2-1; w > row1; w--) {
        if (nums[w][col]!==0) {
            return false;
        }
    }
    return true;
}

//更新分数
function updateScore(score){
	$('.score').text(score);
}

//判断是否不能移动
function noMove(nums){
	if(cantoleft(nums) || cantoright(nums) || cantoup(nums) || cantodown(nums)){
		return false;
	}
	return true;
}

//判断游戏是否结束，两个条件：1.没有空单元格  2.不能移动
function isGameOver(){
	if(nospace(nums) && noMove(nums)){
		$(".over").show();
	}
}
