function operation_matrix(){
	
};

operation_matrix.prototype.mul = function(m1, m2){
	var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
};

function matrix3x3(){
	this.m3x3 = new Array(3);
	
	for(var i = 0; i < 3; i++){
		this.m3x3[i] = new Array(3);
	}
	
	for(var x = 0; x < 3; x++){
		for(var y = 0; y < 3; y++){
			if(x == y)
				this.m3x3[x][y] = 1;
			else
				this.m3x3[x][y] = 0;
		}
	}
	console.log(this.m3x3);
};

matrix3x3.prototype.mul = function(m){
	return operation_matrix.prototype.mul(this.m3x3, m.m3x3);
};

function matrix4x4(){
	this.m4x4 = new Array(4);
	
	for(var i = 0; i < 4; i++){
		this.m4x4[i] = new Array(4);
	}
	
	for(var x = 0; x < 4; x++){
		for(var y = 0; y < 4; y++){
			if(x == y)
				this.m4x4[x][y] = 1;
			else
				this.m4x4[x][y] = 0;
		}
	}
	console.log(this.m4x4);
};

matrix4x4.prototype.mul = function(m){
	return operation_matrix.prototype.mul(this.m4x4, m.m4x4);
};